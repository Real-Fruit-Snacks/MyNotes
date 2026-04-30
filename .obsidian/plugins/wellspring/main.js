"use strict";

const {
  ItemView,
  Menu,
  Modal,
  Notice,
  Plugin,
  PluginSettingTab,
  Setting,
  TFile,
  TFolder,
  debounce,
  normalizePath,
  requestUrl,
  setIcon,
} = require("obsidian");

// ============================================================
//  Constants
// ============================================================

const VIEW_TYPE = "wellspring-view";

const STATUS_ORDER = ["inbox", "reading", "done", "archive", "broken"];

const ALL_COLUMNS = [
  { id: "title",        label: "Title",         width: "minmax(200px, 1fr)", required: true },
  { id: "domain",       label: "Domain",        width: "180px" },
  { id: "tags",         label: "Tags",          width: "minmax(140px, 240px)" },
  { id: "status",       label: "Status",        width: "120px" },
  { id: "added",        label: "Added",         width: "80px" },
  { id: "url",          label: "URL",           width: "minmax(180px, 280px)" },
  { id: "description",  label: "Description",   width: "minmax(220px, 1fr)" },
  { id: "reading-time", label: "Reading time",  width: "100px" },
  { id: "author",       label: "Author",        width: "140px" },
];

const DEFAULT_SETTINGS = {
  folder: "Bookmarks",
  defaultSort: "added",
  defaultSortDir: "desc",
  visibleColumns: ["title", "domain", "tags", "status", "added"],
  statusIcons: {
    inbox: "inbox",
    reading: "book-open",
    done: "check",
    archive: "archive",
    broken: "alert-circle",
  },
  statusLabels: {
    inbox: "Inbox",
    reading: "Reading",
    done: "Done",
    archive: "Archive",
    broken: "Broken",
  },
  fetchMetadata: true,
  showFavicons: true,
};

// ============================================================
//  Utilities
// ============================================================

function slugify(s) {
  const out = String(s)
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
  return out || "bookmark";
}

function extractDomain(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

function parseDateMs(v) {
  if (typeof v === "number") return v;
  if (typeof v === "string") {
    const t = Date.parse(v);
    if (!isNaN(t)) return t;
  }
  return Date.now();
}

function formatAgo(ms) {
  const s = (Date.now() - ms) / 1000;
  if (s < 60) return "just now";
  if (s < 3600) return `${Math.floor(s / 60)}m`;
  if (s < 86400) return `${Math.floor(s / 3600)}h`;
  if (s < 86400 * 7) return `${Math.floor(s / 86400)}d`;
  if (s < 86400 * 30) return `${Math.floor(s / 86400 / 7)}w`;
  if (s < 86400 * 365) return `${Math.floor(s / 86400 / 30)}mo`;
  return `${Math.floor(s / 86400 / 365)}y`;
}

function readingTimeMinutes(text) {
  const words = String(text).trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

// ============================================================
//  Metadata fetcher
// ============================================================

async function fetchMetadata(url) {
  try {
    const res = await requestUrl({ url, method: "GET", throw: false });
    if (res.status < 200 || res.status >= 400 || !res.text) return null;

    const doc = new DOMParser().parseFromString(res.text, "text/html");
    const get = (sel, attr = "content") =>
      doc.querySelector(sel)?.getAttribute(attr)?.trim() ?? "";

    const title =
      get('meta[property="og:title"]') ||
      get('meta[name="twitter:title"]') ||
      doc.querySelector("title")?.textContent?.trim() ||
      "";
    const description =
      get('meta[property="og:description"]') ||
      get('meta[name="twitter:description"]') ||
      get('meta[name="description"]') ||
      "";
    const cover =
      get('meta[property="og:image"]') || get('meta[name="twitter:image"]');
    const author =
      get('meta[name="author"]') || get('meta[property="article:author"]');

    const iconHref =
      doc.querySelector('link[rel="icon"]')?.getAttribute("href") ||
      doc.querySelector('link[rel="shortcut icon"]')?.getAttribute("href") ||
      doc.querySelector('link[rel="apple-touch-icon"]')?.getAttribute("href");
    const favicon = iconHref
      ? new URL(iconHref, url).href
      : `${new URL(url).origin}/favicon.ico`;

    const bodyText = doc.body?.innerText ?? "";
    const readingTime = bodyText.length > 200 ? readingTimeMinutes(bodyText) : undefined;

    return { title, description, cover, favicon, author, readingTime };
  } catch {
    return null;
  }
}

// ============================================================
//  Add bookmark modal
// ============================================================

class AddBookmarkModal extends Modal {
  constructor(app, plugin) {
    super(app);
    this.plugin = plugin;
    this.url = "";
  }

  async onOpen() {
    const { contentEl, titleEl } = this;
    titleEl.setText("Add bookmark");
    contentEl.empty();

    try {
      const clip = await navigator.clipboard.readText();
      if (/^https?:\/\//i.test(clip)) this.url = clip;
    } catch {
      // clipboard read can fail; ignore
    }

    let urlInput;
    new Setting(contentEl)
      .setName("URL")
      .setDesc("Title, description, image, and favicon are auto-fetched.")
      .addText((t) => {
        urlInput = t.inputEl;
        t.setPlaceholder("https://…");
        t.setValue(this.url);
        t.onChange((v) => (this.url = v));
      });

    setTimeout(() => urlInput?.focus(), 30);

    const buttons = new Setting(contentEl);
    buttons.addButton((b) => b.setButtonText("Cancel").onClick(() => this.close()));
    buttons.addButton((b) =>
      b
        .setButtonText("Add")
        .setCta()
        .onClick(async () => {
          if (!/^https?:\/\//i.test(this.url)) {
            new Notice("Enter a URL starting with http(s)://");
            return;
          }
          b.setButtonText("Fetching…").setDisabled(true);
          try {
            await this.plugin.createBookmark(this.url);
            new Notice("Bookmark added");
            this.close();
            await this.plugin.activateView();
          } catch (e) {
            new Notice(`Failed: ${e.message}`);
            b.setButtonText("Add").setDisabled(false);
          }
        }),
    );

    contentEl.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.isComposing) {
        e.preventDefault();
        const addBtn = contentEl.querySelector(".mod-cta");
        addBtn?.click();
      }
    });
  }

  onClose() {
    this.contentEl.empty();
  }
}

// ============================================================
//  Settings tab
// ============================================================

class WellspringSettingTab extends PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display() {
    const { containerEl } = this;
    containerEl.empty();

    new Setting(containerEl)
      .setName("Bookmarks folder")
      .setDesc("Folder under your vault root where bookmark files are stored.")
      .addText((t) =>
        t
          .setValue(this.plugin.settings.folder)
          .setPlaceholder("Bookmarks")
          .onChange(async (v) => {
            this.plugin.settings.folder = v.trim() || "Bookmarks";
            await this.plugin.saveSettings();
          }),
      );

    new Setting(containerEl)
      .setName("Auto-fetch metadata")
      .setDesc("Fetch title, description, og:image and favicon when adding a bookmark.")
      .addToggle((t) =>
        t.setValue(this.plugin.settings.fetchMetadata).onChange(async (v) => {
          this.plugin.settings.fetchMetadata = v;
          await this.plugin.saveSettings();
        }),
      );

    new Setting(containerEl)
      .setName("Show favicons")
      .setDesc("Display the site favicon in each row.")
      .addToggle((t) =>
        t.setValue(this.plugin.settings.showFavicons !== false).onChange(async (v) => {
          this.plugin.settings.showFavicons = v;
          await this.plugin.saveSettings();
        }),
      );

    new Setting(containerEl).setName("Sort").setHeading();

    new Setting(containerEl)
      .setName("Default field")
      .addDropdown((d) => {
        d.addOption("added", "Date added");
        d.addOption("title", "Title");
        d.addOption("domain", "Domain");
        d.addOption("status", "Status");
        d.addOption("opened", "Last opened");
        d.setValue(this.plugin.settings.defaultSort).onChange(async (v) => {
          this.plugin.settings.defaultSort = v;
          await this.plugin.saveSettings();
        });
      });

    new Setting(containerEl)
      .setName("Default direction")
      .addDropdown((d) => {
        d.addOption("desc", "Newest / Z–A first");
        d.addOption("asc", "Oldest / A–Z first");
        d.setValue(this.plugin.settings.defaultSortDir).onChange(async (v) => {
          this.plugin.settings.defaultSortDir = v;
          await this.plugin.saveSettings();
        });
      });

    new Setting(containerEl).setName("Status icons").setHeading();
    containerEl.createEl("p", {
      cls: "setting-item-description",
      text: "Use any Lucide icon name. Browse names at lucide.dev/icons.",
    });

    for (const s of STATUS_ORDER) {
      new Setting(containerEl)
        .setName(this.plugin.settings.statusLabels[s])
        .addText((t) =>
          t
            .setValue(this.plugin.settings.statusIcons[s])
            .setPlaceholder(DEFAULT_SETTINGS.statusIcons[s])
            .onChange(async (v) => {
              this.plugin.settings.statusIcons[s] =
                v.trim() || DEFAULT_SETTINGS.statusIcons[s];
              await this.plugin.saveSettings();
            }),
        );
    }

    new Setting(containerEl).setName("Visible columns").setHeading();
    containerEl.createEl("p", {
      cls: "setting-item-description",
      text: "Title is always shown. Toggle the rest as you like.",
    });

    for (const c of ALL_COLUMNS) {
      const isOn = this.plugin.settings.visibleColumns.includes(c.id) || !!c.required;
      new Setting(containerEl)
        .setName(c.label)
        .setDesc(c.required ? "Always visible" : "")
        .addToggle((t) => {
          t.setValue(isOn)
            .setDisabled(!!c.required)
            .onChange(async (v) => {
              const cur = new Set(this.plugin.settings.visibleColumns);
              if (v) cur.add(c.id);
              else cur.delete(c.id);
              this.plugin.settings.visibleColumns = ALL_COLUMNS
                .filter((col) => cur.has(col.id) || col.required)
                .map((col) => col.id);
              await this.plugin.saveSettings();
            });
        });
    }
  }
}

// ============================================================
//  View
// ============================================================

class WellspringView extends ItemView {
  constructor(leaf, plugin) {
    super(leaf);
    this.plugin = plugin;
    this.renderHandle = null;
    this.state = {
      search: "",
      statusFilter: "all",
      tagFilters: new Set(),
      sortField: plugin.settings.defaultSort,
      sortDir: plugin.settings.defaultSortDir,
      expanded: new Set(),
      selected: new Set(),
      columnsOpen: false,
    };
  }

  getViewType() { return VIEW_TYPE; }
  getDisplayText() { return "Wellspring"; }
  getIcon() { return "bookmark"; }

  async onOpen() {
    this.containerEl.children[1].addClass("ws-root");
    this.render();
  }

  async onClose() {
    this.containerEl.empty();
  }

  scheduleRender() {
    if (this.renderHandle != null) return;
    this.renderHandle = window.setTimeout(() => {
      this.renderHandle = null;
      this.render();
    }, 16);
  }

  // --- data ----------------------------------------------------

  filtered() {
    const all = this.plugin.loadBookmarks();
    const { search, statusFilter, tagFilters, sortField, sortDir } = this.state;
    const q = search.trim().toLowerCase();

    let xs = all.filter((b) => {
      if (statusFilter && statusFilter !== "all" && b.status !== statusFilter) return false;
      for (const t of tagFilters) if (!b.tags.includes(t)) return false;
      if (q) {
        const hay = [b.title, b.domain, b.description, b.url, b.tags.join(" ")]
          .join(" ").toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    const dir = sortDir === "asc" ? 1 : -1;
    xs.sort((a, b) => {
      const va = a[sortField] ?? "";
      const vb = b[sortField] ?? "";
      if (sortField === "added" || sortField === "opened") {
        return ((va || 0) - (vb || 0)) * dir;
      }
      return String(va).localeCompare(String(vb)) * dir;
    });

    return xs;
  }

  allTagsByCount() {
    const m = new Map();
    for (const b of this.plugin.loadBookmarks()) {
      for (const t of b.tags) m.set(t, (m.get(t) ?? 0) + 1);
    }
    return [...m.entries()]
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count);
  }

  statusCounts() {
    const counts = { all: 0 };
    for (const s of STATUS_ORDER) counts[s] = 0;
    for (const b of this.plugin.loadBookmarks()) {
      counts.all++;
      counts[b.status]++;
    }
    return counts;
  }

  visibleColumns() {
    const wanted = new Set(this.plugin.settings.visibleColumns);
    wanted.add("title");
    return ALL_COLUMNS.filter((c) => wanted.has(c.id));
  }

  // --- render --------------------------------------------------

  render() {
    const root = this.containerEl.children[1];
    root.empty();

    const app = root.createDiv({ cls: "ws-app" });
    this.renderSidebar(app.createDiv({ cls: "ws-side" }));
    const main = app.createDiv({ cls: "ws-main" });
    this.renderHeader(main.createDiv({ cls: "ws-head" }));
    this.renderToolbar(main.createDiv({ cls: "ws-tools" }));

    const cols = this.visibleColumns();
    const showFav = this.plugin.settings.showFavicons !== false;
    const gridTemplate = `28px ${showFav ? "22px " : ""}${cols.map((c) => c.width).join(" ")} 70px 26px`;

    this.renderColHeaders(main.createDiv({ cls: "ws-col-headers" }), gridTemplate, cols, showFav);
    this.renderRows(main.createDiv({ cls: "ws-table" }), gridTemplate, cols, showFav);
  }

  renderSidebar(side) {
    const counts = this.statusCounts();
    const tags = this.allTagsByCount();
    const { settings } = this.plugin;

    const h1 = side.createEl("h3", { cls: "ws-side-h" });
    h1.createSpan({ text: "Status" });
    const gear = h1.createSpan({
      cls: "ws-side-gear",
      attr: { "aria-label": "Customize status icons" },
    });
    setIcon(gear, "settings");
    gear.addEventListener("click", () => {
      this.app.setting.open();
      this.app.setting.openTabById(this.plugin.manifest.id);
    });

    const allLink = side.createEl("a", {
      cls: "ws-side-link" + (this.state.statusFilter === "all" ? " is-active" : ""),
    });
    const allLhs = allLink.createSpan({ cls: "ws-side-lhs" });
    setIcon(allLhs.createSpan(), "list");
    allLhs.createSpan({ text: "All" });
    allLink.createSpan({ cls: "ws-side-count", text: String(counts.all) });
    allLink.addEventListener("click", (e) => {
      e.preventDefault();
      this.state.statusFilter = "all";
      this.render();
    });

    for (const s of STATUS_ORDER) {
      if (s === "broken" && counts[s] === 0) continue;
      const link = side.createEl("a", {
        cls: "ws-side-link ws-status-" + s + (this.state.statusFilter === s ? " is-active" : ""),
      });
      const lhs = link.createSpan({ cls: "ws-side-lhs" });
      setIcon(lhs.createSpan(), settings.statusIcons[s] || "circle");
      lhs.createSpan({ text: settings.statusLabels[s] });
      link.createSpan({ cls: "ws-side-count", text: String(counts[s]) });
      link.addEventListener("click", (e) => {
        e.preventDefault();
        this.state.statusFilter = s;
        this.render();
      });
    }

    if (tags.length > 0) {
      side.createEl("h3", { cls: "ws-side-h", text: "Tags" });
      for (const { tag, count } of tags) {
        const active = this.state.tagFilters.has(tag);
        const link = side.createEl("a", {
          cls: "ws-side-link" + (active ? " is-active" : ""),
        });
        const lhs = link.createSpan({ cls: "ws-side-lhs" });
        lhs.createSpan({ cls: "ws-tag-hash", text: "#" });
        lhs.createSpan({ text: tag });
        link.createSpan({ cls: "ws-side-count", text: String(count) });
        link.addEventListener("click", (e) => {
          e.preventDefault();
          if (active) this.state.tagFilters.delete(tag);
          else this.state.tagFilters.add(tag);
          this.render();
        });
      }
    }
  }

  renderHeader(head) {
    head.createEl("h1", { cls: "ws-title", text: "Bookmarks" });

    const search = head.createDiv({ cls: "ws-search" });
    setIcon(search.createSpan(), "search");
    const input = search.createEl("input", {
      type: "search",
      attr: {
        placeholder: "Search title, description, notes…",
        value: this.state.search,
      },
    });
    input.addEventListener(
      "input",
      debounce(() => {
        this.state.search = input.value;
        this.render();
      }, 120, true),
    );

    const switcher = head.createDiv({ cls: "ws-switcher" });
    const mkSw = (icon, label, active = false, disabled = false) => {
      const b = switcher.createEl("button", {
        cls: "ws-sw" + (active ? " is-active" : "") + (disabled ? " is-disabled" : ""),
        attr: {
          "aria-label": label,
          title: disabled ? `${label} (coming in v2)` : label,
        },
      });
      setIcon(b, icon);
      return b;
    };
    mkSw("list", "Compact list", true);
    mkSw("layout-grid", "Cards", false, true);
    mkSw("kanban-square", "Board", false, true);
    mkSw("folder-tree", "Tree", false, true);

    const settingsBtn = head.createEl("button", {
      cls: "ws-icon-btn",
      attr: { "aria-label": "Settings" },
    });
    setIcon(settingsBtn, "settings");
    settingsBtn.addEventListener("click", () => {
      this.app.setting.open();
      this.app.setting.openTabById(this.plugin.manifest.id);
    });

    const addBtn = head.createEl("button", {
      cls: "ws-btn",
      attr: { "aria-label": "Add bookmark" },
    });
    setIcon(addBtn.createSpan(), "plus");
    addBtn.createSpan({ text: "Add" });
    addBtn.addEventListener("click", () => new AddBookmarkModal(this.app, this.plugin).open());
  }

  renderToolbar(tools) {
    const selected = this.state.selected.size;
    if (selected > 0) {
      tools.createSpan({ cls: "ws-selected", text: `${selected} selected` });
      this.mkAction(tools, "tag", "Tag…", () => new Notice("Bulk tag UI not yet implemented"));
      this.mkAction(tools, "archive", "Archive", async () => {
        await this.bulkSetStatus("archive");
      });
      this.mkAction(tools, "trash-2", "Delete", async () => {
        if (!confirm(`Delete ${selected} bookmark(s)? This moves files to system trash.`)) return;
        await this.bulkDelete();
      });
    } else {
      const total = this.filtered().length;
      tools.createSpan({
        cls: "ws-tool-meta",
        text: `${total} bookmark${total === 1 ? "" : "s"}`,
      });
    }

    tools.createSpan({ cls: "ws-sep" });

    const sortBtn = tools.createEl("button", { cls: "ws-tool-btn" });
    sortBtn.createSpan({ text: `Sort: ${this.sortLabel()}` });
    setIcon(sortBtn.createSpan(), this.state.sortDir === "desc" ? "arrow-down" : "arrow-up");
    sortBtn.addEventListener("click", (e) => this.openSortMenu(e));

    const colBtn = tools.createEl("button", {
      cls: "ws-tool-btn ws-cols-trigger" + (this.state.columnsOpen ? " is-open" : ""),
    });
    setIcon(colBtn.createSpan(), "sliders-horizontal");
    colBtn.createSpan({ text: "Columns" });
    setIcon(colBtn.createSpan(), "chevron-down");
    colBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      this.state.columnsOpen = !this.state.columnsOpen;
      this.render();
    });

    if (this.state.columnsOpen) this.renderColumnsPopover(tools);
  }

  renderColumnsPopover(parent) {
    const pop = parent.createDiv({ cls: "ws-popover" });
    pop.createDiv({ cls: "ws-popover-h", text: "Visible columns" });

    const visible = new Set(this.plugin.settings.visibleColumns);
    visible.add("title");

    const renderToggle = (col) => {
      const on = visible.has(col.id);
      const row = pop.createDiv({
        cls: "ws-col-toggle" + (on ? " is-on" : "") + (col.required ? " is-locked" : ""),
      });
      const box = row.createSpan({ cls: "ws-checkbox" });
      if (on) setIcon(box, "check");
      row.createSpan({ cls: "ws-col-name", text: col.label });
      if (!col.required) {
        row.addEventListener("click", async () => {
          const cur = new Set(this.plugin.settings.visibleColumns);
          if (cur.has(col.id)) cur.delete(col.id);
          else cur.add(col.id);
          this.plugin.settings.visibleColumns = ALL_COLUMNS
            .filter((c) => cur.has(c.id) || c.required)
            .map((c) => c.id);
          await this.plugin.saveSettings();
        });
      }
    };

    pop.createDiv({ cls: "ws-popover-section", text: "Default" });
    for (const c of ALL_COLUMNS.slice(0, 5)) renderToggle(c);
    pop.createEl("hr");
    pop.createDiv({ cls: "ws-popover-section", text: "Optional" });
    for (const c of ALL_COLUMNS.slice(5)) renderToggle(c);

    const closeOnOutside = (e) => {
      if (!pop.contains(e.target)) {
        this.state.columnsOpen = false;
        document.removeEventListener("click", closeOnOutside);
        this.render();
      }
    };
    setTimeout(() => document.addEventListener("click", closeOnOutside), 0);
  }

  mkAction(parent, icon, label, onClick) {
    const b = parent.createEl("button", { cls: "ws-action" });
    setIcon(b.createSpan(), icon);
    b.createSpan({ text: label });
    b.addEventListener("click", onClick);
  }

  renderColHeaders(headers, gridTemplate, cols, showFav) {
    headers.style.gridTemplateColumns = gridTemplate;
    headers.createSpan();
    if (showFav) headers.createSpan();
    for (const c of cols) {
      const cell = headers.createSpan({ text: c.label });
      cell.addEventListener("click", () => {
        const sortMap = {
          title: "title",
          domain: "domain",
          added: "added",
          status: "status",
          tags: null,
          url: null,
          description: null,
          "reading-time": null,
          author: null,
        };
        const f = sortMap[c.id];
        if (!f) return;
        if (this.state.sortField === f) {
          this.state.sortDir = this.state.sortDir === "asc" ? "desc" : "asc";
        } else {
          this.state.sortField = f;
          this.state.sortDir = f === "added" ? "desc" : "asc";
        }
        this.render();
      });
    }
    headers.createSpan({ text: "" });
    headers.createSpan();
  }

  renderRows(table, gridTemplate, cols, showFav) {
    const items = this.filtered();
    if (items.length === 0) {
      table.createDiv({ cls: "ws-empty", text: "No bookmarks match your filters." });
      return;
    }
    for (const b of items) this.renderRow(table, b, gridTemplate, cols, showFav);
  }

  renderRow(table, b, gridTemplate, cols, showFav) {
    const id = b.file.path;
    const isSelected = this.state.selected.has(id);
    const isExpanded = this.state.expanded.has(id);

    const row = table.createDiv({
      cls: "ws-row" +
        (isSelected ? " is-selected" : "") +
        (isExpanded ? " is-expanded" : "") +
        (b.status === "broken" ? " is-broken" : ""),
    });
    row.style.gridTemplateColumns = gridTemplate;

    const check = row.createSpan({ cls: "ws-check" });
    if (isSelected) setIcon(check, "check");
    check.addEventListener("click", (e) => {
      e.stopPropagation();
      if (isSelected) this.state.selected.delete(id);
      else this.state.selected.add(id);
      this.render();
    });

    if (showFav) {
      const fav = row.createSpan({ cls: "ws-fav" });
      if (b.favicon) {
        const img = fav.createEl("img", { attr: { src: b.favicon, alt: "" } });
        img.addEventListener("error", () => img.remove());
      }
    }

    for (const c of cols) {
      const cell = row.createSpan({ cls: "ws-cell ws-c-" + c.id });
      this.renderCell(cell, c.id, b);
    }

    row.createSpan({ cls: "ws-ago", text: formatAgo(b.added) });

    const more = row.createSpan({ cls: "ws-more" });
    setIcon(more, isExpanded ? "chevron-down" : "more-horizontal");
    more.addEventListener("click", (e) => {
      e.stopPropagation();
      this.openRowMenu(e, b);
    });

    row.addEventListener("click", () => {
      if (isExpanded) this.state.expanded.delete(id);
      else this.state.expanded.add(id);
      this.render();
    });

    if (isExpanded) this.renderRowDetail(table, b);
  }

  renderCell(cell, id, b) {
    switch (id) {
      case "title":
        cell.createSpan({ cls: "ws-title-text", text: b.title });
        break;
      case "domain":
        cell.setText(b.domain);
        break;
      case "tags":
        for (const t of b.tags) {
          const pill = cell.createSpan({ cls: "ws-tag", text: t });
          pill.addEventListener("click", (e) => {
            e.stopPropagation();
            if (this.state.tagFilters.has(t)) this.state.tagFilters.delete(t);
            else this.state.tagFilters.add(t);
            this.render();
          });
        }
        break;
      case "status": {
        const wrap = cell.createSpan({ cls: "ws-status ws-status-" + b.status });
        setIcon(wrap.createSpan(), this.plugin.settings.statusIcons[b.status] || "circle");
        wrap.createSpan({ text: this.plugin.settings.statusLabels[b.status] });
        wrap.addEventListener("click", (e) => {
          e.stopPropagation();
          this.openStatusMenu(e, b);
        });
        break;
      }
      case "added":
        cell.setText(formatAgo(b.added));
        break;
      case "url":
        cell.createEl("a", { href: b.url, text: b.url, cls: "ws-url" });
        break;
      case "description":
        cell.setText(b.description);
        break;
      case "reading-time":
        cell.setText(b.readingTime ? `${b.readingTime} min` : "");
        break;
      case "author":
        cell.setText(b.author ?? "");
        break;
    }
  }

  renderRowDetail(table, b) {
    const detail = table.createDiv({ cls: "ws-row-detail" });

    if (b.description) {
      detail.createEl("h4", { text: "Description" });
      detail.createEl("p", { cls: "ws-detail-desc", text: b.description });
    }

    detail.createEl("h4", { text: "Notes" });
    const notesBox = detail.createDiv({ cls: "ws-detail-notes" });
    notesBox.setText("Open the bookmark file to edit notes.");

    const actions = detail.createDiv({ cls: "ws-detail-actions" });
    const mkBtn = (icon, label, onClick) => {
      const btn = actions.createEl("button");
      setIcon(btn.createSpan(), icon);
      btn.createSpan({ text: label });
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        onClick(e);
      });
      return btn;
    };
    mkBtn("external-link", "Open in browser", async () => {
      window.open(b.url, "_blank");
      await this.plugin.updateFrontmatter(b.file, (fm) => {
        fm.opened = new Date().toISOString();
      });
    });
    mkBtn("file-text", "Open note", () =>
      this.app.workspace.getLeaf("tab").openFile(b.file),
    );
    mkBtn("link", "Copy link", async () => {
      await navigator.clipboard.writeText(b.url);
      new Notice("URL copied");
    });
    mkBtn("archive", b.status === "archive" ? "Unarchive" : "Archive", async () => {
      await this.plugin.updateFrontmatter(b.file, (fm) => {
        fm.status = b.status === "archive" ? "inbox" : "archive";
      });
    });
    mkBtn("trash-2", "Delete", async () => {
      if (!confirm(`Delete "${b.title}"? Moves the file to system trash.`)) return;
      await this.app.vault.trash(b.file, true);
    });
  }

  // --- menus ---------------------------------------------------

  openStatusMenu(e, b) {
    const m = new Menu();
    const labels = this.plugin.settings.statusLabels;
    for (const s of ["inbox", "reading", "done", "archive"]) {
      m.addItem((it) =>
        it
          .setTitle(labels[s])
          .setIcon(this.plugin.settings.statusIcons[s] || "circle")
          .setChecked(b.status === s)
          .onClick(async () => {
            await this.plugin.updateFrontmatter(b.file, (fm) => {
              fm.status = s;
            });
          }),
      );
    }
    m.showAtMouseEvent(e);
  }

  openRowMenu(e, b) {
    const m = new Menu();
    m.addItem((it) =>
      it.setTitle("Open in browser").setIcon("external-link")
        .onClick(() => window.open(b.url, "_blank")),
    );
    m.addItem((it) =>
      it.setTitle("Open note").setIcon("file-text")
        .onClick(() => this.app.workspace.getLeaf("tab").openFile(b.file)),
    );
    m.addItem((it) =>
      it.setTitle("Copy link").setIcon("link").onClick(async () => {
        await navigator.clipboard.writeText(b.url);
        new Notice("URL copied");
      }),
    );
    m.addSeparator();
    m.addItem((it) =>
      it
        .setTitle(b.status === "archive" ? "Unarchive" : "Archive")
        .setIcon("archive")
        .onClick(async () => {
          await this.plugin.updateFrontmatter(b.file, (fm) => {
            fm.status = b.status === "archive" ? "inbox" : "archive";
          });
        }),
    );
    m.addItem((it) =>
      it.setTitle("Delete").setIcon("trash-2").onClick(async () => {
        if (!confirm(`Delete "${b.title}"?`)) return;
        await this.app.vault.trash(b.file, true);
      }),
    );
    m.showAtMouseEvent(e);
  }

  openSortMenu(e) {
    const m = new Menu();
    const fields = [
      { id: "added", label: "Date added" },
      { id: "title", label: "Title" },
      { id: "domain", label: "Domain" },
      { id: "status", label: "Status" },
      { id: "opened", label: "Last opened" },
    ];
    for (const f of fields) {
      m.addItem((it) =>
        it.setTitle(f.label).setChecked(this.state.sortField === f.id).onClick(() => {
          if (this.state.sortField === f.id) {
            this.state.sortDir = this.state.sortDir === "asc" ? "desc" : "asc";
          } else {
            this.state.sortField = f.id;
            this.state.sortDir = f.id === "added" || f.id === "opened" ? "desc" : "asc";
          }
          this.render();
        }),
      );
    }
    m.showAtMouseEvent(e);
  }

  sortLabel() {
    const map = {
      added: "Added",
      title: "Title",
      domain: "Domain",
      status: "Status",
      opened: "Last opened",
    };
    return map[this.state.sortField];
  }

  // --- batch ---------------------------------------------------

  async bulkSetStatus(s) {
    for (const path of this.state.selected) {
      const file = this.app.vault.getAbstractFileByPath(path);
      if (file instanceof TFile) {
        await this.plugin.updateFrontmatter(file, (fm) => {
          fm.status = s;
        });
      }
    }
    this.state.selected.clear();
    new Notice(`Moved to ${this.plugin.settings.statusLabels[s]}`);
  }

  async bulkDelete() {
    for (const path of this.state.selected) {
      const file = this.app.vault.getAbstractFileByPath(path);
      if (file instanceof TFile) await this.app.vault.trash(file, true);
    }
    this.state.selected.clear();
  }
}

// ============================================================
//  Plugin
// ============================================================

class WellspringPlugin extends Plugin {
  async onload() {
    await this.loadSettings();

    this.registerView(VIEW_TYPE, (leaf) => new WellspringView(leaf, this));

    this.addRibbonIcon("bookmark", "Open bookmarks", () => this.activateView());

    this.addCommand({
      id: "open-view",
      name: "Open bookmarks",
      callback: () => this.activateView(),
    });
    this.addCommand({
      id: "add-bookmark",
      name: "Add bookmark",
      callback: () => new AddBookmarkModal(this.app, this).open(),
    });

    this.addSettingTab(new WellspringSettingTab(this.app, this));

    const refresh = debounce(() => this.refreshViews(), 200, true);
    this.registerEvent(this.app.metadataCache.on("changed", refresh));
    this.registerEvent(this.app.vault.on("create", refresh));
    this.registerEvent(this.app.vault.on("delete", refresh));
    this.registerEvent(this.app.vault.on("rename", refresh));
  }

  async onunload() {
    // Obsidian auto-detaches view leaves; nothing to do.
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    this.settings.statusIcons = {
      ...DEFAULT_SETTINGS.statusIcons,
      ...this.settings.statusIcons,
    };
    this.settings.statusLabels = {
      ...DEFAULT_SETTINGS.statusLabels,
      ...this.settings.statusLabels,
    };
  }

  async saveSettings() {
    await this.saveData(this.settings);
    this.refreshViews();
  }

  refreshViews() {
    this.app.workspace.getLeavesOfType(VIEW_TYPE).forEach((leaf) => {
      if (leaf.view instanceof WellspringView) leaf.view.scheduleRender();
    });
  }

  async activateView() {
    const { workspace } = this.app;
    let leaf = workspace.getLeavesOfType(VIEW_TYPE)[0];
    if (!leaf) {
      leaf = workspace.getLeaf("tab");
      await leaf.setViewState({ type: VIEW_TYPE, active: true });
    }
    workspace.revealLeaf(leaf);
  }

  async ensureFolder() {
    const path = normalizePath(this.settings.folder);
    let f = this.app.vault.getAbstractFileByPath(path);
    if (!f) {
      await this.app.vault.createFolder(path);
      f = this.app.vault.getAbstractFileByPath(path);
    }
    if (!(f instanceof TFolder)) throw new Error(`"${path}" is not a folder`);
    return f;
  }

  async uniquePath(slug) {
    const base = normalizePath(`${this.settings.folder}/${slug}`);
    let path = `${base}.md`;
    let i = 1;
    while (await this.app.vault.adapter.exists(path)) {
      path = `${base}-${i++}.md`;
    }
    return path;
  }

  async createBookmark(rawUrl) {
    const url = String(rawUrl).trim();
    if (!/^https?:\/\//i.test(url)) throw new Error("URL must start with http(s)://");

    await this.ensureFolder();
    const meta = this.settings.fetchMetadata ? await fetchMetadata(url) : null;

    const title = (meta?.title || url).replace(/\s+/g, " ").trim();
    const path = await this.uniquePath(slugify(title));

    const file = await this.app.vault.create(path, "");
    await this.app.fileManager.processFrontMatter(file, (fm) => {
      fm.url = url;
      fm.title = title;
      fm.domain = extractDomain(url);
      fm.description = meta?.description ?? "";
      fm.status = "inbox";
      fm.tags = [];
      fm.added = new Date().toISOString();
      if (meta?.favicon) fm.favicon = meta.favicon;
      if (meta?.cover) fm.cover = meta.cover;
      if (meta?.author) fm.author = meta.author;
      if (meta?.readingTime) fm["reading-time"] = meta.readingTime;
    });

    return file;
  }

  async updateFrontmatter(file, mut) {
    await this.app.fileManager.processFrontMatter(file, mut);
  }

  loadBookmarks() {
    const path = normalizePath(this.settings.folder);
    const folder = this.app.vault.getAbstractFileByPath(path);
    if (!(folder instanceof TFolder)) return [];

    const result = [];
    const walk = (f) => {
      for (const child of f.children) {
        if (child instanceof TFolder) walk(child);
        else if (child instanceof TFile && child.extension === "md") {
          const fm = this.app.metadataCache.getFileCache(child)?.frontmatter;
          if (!fm?.url) continue;
          result.push({
            file: child,
            url: String(fm.url),
            title: String(fm.title || child.basename),
            domain: String(fm.domain || extractDomain(String(fm.url))),
            description: String(fm.description ?? ""),
            status: STATUS_ORDER.includes(fm.status) ? fm.status : "inbox",
            tags: Array.isArray(fm.tags) ? fm.tags.map(String) : [],
            added: parseDateMs(fm.added),
            opened: fm.opened ? parseDateMs(fm.opened) : undefined,
            favicon: fm.favicon ? String(fm.favicon) : undefined,
            cover: fm.cover ? String(fm.cover) : undefined,
            author: fm.author ? String(fm.author) : undefined,
            readingTime:
              typeof fm["reading-time"] === "number" ? fm["reading-time"] : undefined,
          });
        }
      }
    };
    walk(folder);
    return result;
  }
}

module.exports = WellspringPlugin;
