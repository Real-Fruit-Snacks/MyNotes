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
  getIconIds,
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

const LAYOUT_DEFS = [
  { id: "list",  icon: "list",          label: "Compact list" },
  { id: "cards", icon: "layout-grid",   label: "Cards" },
  { id: "board", icon: "kanban-square", label: "Board" },
  { id: "tree",  icon: "folder-tree",   label: "Tree (with preview)" },
];

const TAG_PALETTE = [
  "#ce422b", "#ec4899", "#8b5cf6", "#06b6d4", "#f59e0b",
  "#6366f1", "#7f6df2", "#84cc16", "#f97316", "#64748b",
  "#ef4444", "#a855f7", "#10b981", "#0ea5e9", "#d946ef",
];

const DEFAULT_SETTINGS = {
  folder: "Bookmarks",
  defaultSort: "added",
  defaultSortDir: "desc",
  defaultLayout: "list",
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
  tagIcons: {},                // { [tag]: lucideName }
  fetchMetadata: true,
  showFavicons: true,
  showIcons: true,             // custom icons (per-bookmark / per-tag) inline next to title
  linkCheckIntervalDays: 0,    // 0 = disabled
  lastLinkCheck: 0,
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
  try { return new URL(url).hostname.replace(/^www\./, ""); }
  catch { return ""; }
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

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function colorForTag(tag) {
  let h = 0;
  for (let i = 0; i < tag.length; i++) h = (h * 31 + tag.charCodeAt(i)) >>> 0;
  return TAG_PALETTE[h % TAG_PALETTE.length];
}

function renderHighlighted(el, text, query) {
  el.empty();
  if (!query || !text) { el.setText(text || ""); return; }
  const re = new RegExp(`(${escapeRegex(query)})`, "ig");
  const parts = String(text).split(re);
  for (const p of parts) {
    if (re.test(p) && p.toLowerCase() === query.toLowerCase()) {
      el.createEl("mark", { text: p });
      re.lastIndex = 0;
    } else if (p) {
      el.appendText(p);
    }
  }
}

// ============================================================
//  File body utilities (notes editing)
// ============================================================

const FRONTMATTER_RE = /^---\n[\s\S]*?\n---\n?/;

async function readBody(app, file) {
  const content = await app.vault.read(file);
  const m = content.match(FRONTMATTER_RE);
  return m ? content.slice(m[0].length) : content;
}

async function writeBody(app, file, newBody) {
  const content = await app.vault.read(file);
  const m = content.match(FRONTMATTER_RE);
  const prefix = m ? m[0] : "";
  const body = newBody == null ? "" : String(newBody);
  const sep = prefix && body && !prefix.endsWith("\n") ? "\n" : "";
  await app.vault.modify(file, prefix + sep + body);
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
      doc.querySelector("title")?.textContent?.trim() || "";
    const description =
      get('meta[property="og:description"]') ||
      get('meta[name="twitter:description"]') ||
      get('meta[name="description"]') || "";
    const cover =
      get('meta[property="og:image"]') ||
      get('meta[name="twitter:image"]');
    const author =
      get('meta[name="author"]') ||
      get('meta[property="article:author"]');

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

async function checkLinkAlive(url) {
  try {
    const res = await requestUrl({ url, method: "GET", throw: false });
    return res.status >= 200 && res.status < 400;
  } catch {
    return false;
  }
}

// ============================================================
//  Import / Export (Netscape Bookmarks HTML)
// ============================================================

function parseBookmarksHtml(htmlText) {
  const doc = new DOMParser().parseFromString(htmlText, "text/html");
  const out = [];
  for (const a of Array.from(doc.querySelectorAll("a"))) {
    const url = a.getAttribute("href");
    if (!url || !/^https?:\/\//i.test(url)) continue;
    const title = (a.textContent || url).trim();
    const addDateRaw = a.getAttribute("ADD_DATE") || a.getAttribute("add_date");
    const addedMs = addDateRaw ? Number(addDateRaw) * 1000 : null;
    const tagsAttr = a.getAttribute("TAGS") || a.getAttribute("tags") || "";
    const tags = tagsAttr ? tagsAttr.split(",").map((t) => t.trim()).filter(Boolean) : [];
    out.push({ url, title, addedMs, tags });
  }
  return out;
}

function buildBookmarksHtml(bookmarks) {
  const lines = [
    "<!DOCTYPE NETSCAPE-Bookmark-file-1>",
    "<META HTTP-EQUIV=\"Content-Type\" CONTENT=\"text/html; charset=UTF-8\">",
    "<TITLE>Bookmarks</TITLE>",
    "<H1>Bookmarks</H1>",
    "<DL><p>",
  ];
  for (const b of bookmarks) {
    const ts = Math.floor(b.added / 1000);
    const tags = b.tags.length ? ` TAGS="${b.tags.join(",").replace(/"/g, "&quot;")}"` : "";
    const title = (b.title || b.url).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    lines.push(`  <DT><A HREF="${b.url}" ADD_DATE="${ts}"${tags}>${title}</A>`);
  }
  lines.push("</DL><p>");
  return lines.join("\n");
}

// ============================================================
//  Icon picker modal — visual grid of all Lucide icons
// ============================================================

class IconPickerModal extends Modal {
  constructor(app, opts) {
    super(app);
    this.onPick = opts.onPick;
    this.current = opts.current || "";
    this.titleText = opts.title || "Choose an icon";
    this.allowClear = opts.allowClear !== false;
    this._observer = null;
    this._allIcons = null;
  }

  onOpen() {
    const { contentEl, titleEl, modalEl } = this;
    titleEl.setText(this.titleText);
    contentEl.empty();
    contentEl.addClass("ws-icon-picker");
    modalEl.addClass("ws-icon-picker-modal");

    // search bar
    const searchRow = contentEl.createDiv({ cls: "ws-ip-search" });
    setIcon(searchRow.createSpan({ cls: "ws-ip-search-ico" }), "search");
    const input = searchRow.createEl("input", {
      attr: { type: "search", placeholder: "Filter icons by name…" },
    });

    // toolbar (clear + count)
    const toolRow = contentEl.createDiv({ cls: "ws-ip-tools" });
    const count = toolRow.createSpan({ cls: "ws-ip-count" });
    if (this.allowClear) {
      const clearBtn = toolRow.createEl("button", { cls: "ws-ip-clear" });
      setIcon(clearBtn.createSpan(), "x");
      clearBtn.createSpan({ text: "No icon" });
      clearBtn.addEventListener("click", () => {
        this.onPick("");
        this.close();
      });
    }

    const grid = contentEl.createDiv({ cls: "ws-ip-grid" });

    // load all icon ids (lazily — once)
    try {
      this._allIcons = (typeof getIconIds === "function" ? getIconIds() : [])
        .filter((id) => typeof id === "string" && id.length > 0)
        .sort();
    } catch {
      this._allIcons = [];
    }
    if (this._allIcons.length === 0) {
      grid.createDiv({ cls: "ws-ip-empty", text: "No icons available in this Obsidian build." });
      return;
    }

    const renderGrid = (filter) => {
      // tear down previous observer
      if (this._observer) { this._observer.disconnect(); this._observer = null; }
      grid.empty();

      const q = filter.trim().toLowerCase();
      const matches = q
        ? this._allIcons.filter((id) => id.toLowerCase().includes(q))
        : this._allIcons;

      count.setText(`${matches.length} icon${matches.length === 1 ? "" : "s"}`);

      if (matches.length === 0) {
        grid.createDiv({ cls: "ws-ip-empty", text: "No icons match — try a different filter." });
        return;
      }

      // IntersectionObserver to setIcon only when visible (perf for thousands)
      this._observer = new IntersectionObserver((entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const el = e.target;
          const name = el.dataset.icon;
          const ico = el.querySelector(".ws-ip-ico");
          if (ico && name && !ico.firstElementChild) setIcon(ico, name);
          this._observer.unobserve(el);
        }
      }, { root: grid, rootMargin: "120px" });

      for (const id of matches) {
        const btn = grid.createEl("button", {
          cls: "ws-ip-item" + (id === this.current ? " is-active" : ""),
          attr: { "data-icon": id, title: id },
        });
        btn.createSpan({ cls: "ws-ip-ico" });
        btn.createSpan({ cls: "ws-ip-name", text: id });
        btn.addEventListener("click", () => {
          this.onPick(id);
          this.close();
        });
        this._observer.observe(btn);
      }
    };

    renderGrid("");
    input.addEventListener(
      "input",
      debounce(() => renderGrid(input.value), 80, true),
    );
    setTimeout(() => input.focus(), 50);
  }

  onClose() {
    if (this._observer) { this._observer.disconnect(); this._observer = null; }
    this.contentEl.empty();
  }
}

// ============================================================
//  Add bookmark modal
// ============================================================

class AddBookmarkModal extends Modal {
  constructor(app, plugin, opts = {}) {
    super(app);
    this.plugin = plugin;
    this.url = "";
    this.statusOverride = opts.status || null;
  }

  async onOpen() {
    const { contentEl, titleEl } = this;
    titleEl.setText("Add bookmark");
    contentEl.empty();

    try {
      const clip = await navigator.clipboard.readText();
      if (/^https?:\/\//i.test(clip)) this.url = clip;
    } catch {}

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
      b.setButtonText("Add").setCta().onClick(async () => {
        if (!/^https?:\/\//i.test(this.url)) {
          new Notice("Enter a URL starting with http(s)://");
          return;
        }
        b.setButtonText("Fetching…").setDisabled(true);
        try {
          const file = await this.plugin.createBookmark(this.url);
          if (this.statusOverride) {
            await this.plugin.updateFrontmatter(file, (fm) => { fm.status = this.statusOverride; });
          }
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
        contentEl.querySelector(".mod-cta")?.click();
      }
    });
  }

  onClose() { this.contentEl.empty(); }
}

// ============================================================
//  Import modal
// ============================================================

class ImportModal extends Modal {
  constructor(app, plugin) {
    super(app);
    this.plugin = plugin;
  }

  async onOpen() {
    const { contentEl, titleEl } = this;
    titleEl.setText("Import bookmarks");
    contentEl.empty();

    contentEl.createEl("p", {
      text: "Paste a Netscape-format bookmarks file (Chrome, Firefox, Safari, Pocket, Raindrop, Pinboard all export this format).",
      cls: "setting-item-description",
    });

    const ta = contentEl.createEl("textarea", { cls: "ws-import-ta" });
    ta.placeholder = "<!DOCTYPE NETSCAPE-Bookmark-file-1>...";
    ta.rows = 12;
    ta.style.width = "100%";
    ta.style.fontFamily = "var(--font-monospace)";
    ta.style.fontSize = "12px";

    const fileInput = contentEl.createEl("input", { type: "file", attr: { accept: ".html,.htm,text/html" } });
    fileInput.style.marginTop = "8px";
    fileInput.addEventListener("change", async () => {
      const f = fileInput.files?.[0];
      if (f) ta.value = await f.text();
    });

    const fetchToggle = contentEl.createDiv({ cls: "ws-import-fetch" });
    const cb = fetchToggle.createEl("input", { type: "checkbox" });
    cb.checked = false;
    cb.id = "ws-import-fetch-cb";
    fetchToggle.createEl("label", {
      text: " Auto-fetch metadata for each (slow — leave off for large imports)",
      attr: { for: "ws-import-fetch-cb" },
    });
    fetchToggle.style.marginTop = "10px";

    const status = contentEl.createDiv({ cls: "ws-import-status" });
    status.style.marginTop = "10px";
    status.style.color = "var(--text-muted)";
    status.style.fontSize = "12px";

    const btns = new Setting(contentEl);
    btns.addButton((b) => b.setButtonText("Cancel").onClick(() => this.close()));
    btns.addButton((b) =>
      b.setButtonText("Import").setCta().onClick(async () => {
        const text = ta.value.trim();
        if (!text) { new Notice("Paste bookmarks HTML or pick a file"); return; }
        const parsed = parseBookmarksHtml(text);
        if (parsed.length === 0) { new Notice("No <a href> entries found"); return; }
        b.setButtonText("Importing…").setDisabled(true);
        const wantFetch = cb.checked;
        const prevFetch = this.plugin.settings.fetchMetadata;
        this.plugin.settings.fetchMetadata = wantFetch;
        let n = 0;
        for (const p of parsed) {
          try {
            const file = await this.plugin.createBookmark(p.url, { skipFetch: !wantFetch });
            await this.plugin.updateFrontmatter(file, (fm) => {
              if (p.title) fm.title = p.title;
              if (p.tags.length) fm.tags = p.tags;
              if (p.addedMs) fm.added = new Date(p.addedMs).toISOString();
            });
            n++;
            status.setText(`Imported ${n}/${parsed.length}…`);
          } catch (e) {
            console.error("import failed", p.url, e);
          }
        }
        this.plugin.settings.fetchMetadata = prevFetch;
        await this.plugin.saveSettings();
        new Notice(`Imported ${n} bookmark${n === 1 ? "" : "s"}`);
        this.close();
      }),
    );
  }

  onClose() { this.contentEl.empty(); }
}

// ============================================================
//  Bulk tag modal
// ============================================================

class BulkTagModal extends Modal {
  constructor(app, plugin, paths) {
    super(app);
    this.plugin = plugin;
    this.paths = paths;
    this.add = "";
    this.remove = "";
  }

  async onOpen() {
    const { contentEl, titleEl } = this;
    titleEl.setText(`Tag ${this.paths.length} bookmark${this.paths.length === 1 ? "" : "s"}`);
    contentEl.empty();

    new Setting(contentEl)
      .setName("Add tags")
      .setDesc("Comma-separated. Will be added to each selected bookmark.")
      .addText((t) => t.setPlaceholder("rust, learning").onChange((v) => (this.add = v)));

    new Setting(contentEl)
      .setName("Remove tags")
      .setDesc("Comma-separated. Will be removed if present.")
      .addText((t) => t.setPlaceholder("temp").onChange((v) => (this.remove = v)));

    const btns = new Setting(contentEl);
    btns.addButton((b) => b.setButtonText("Cancel").onClick(() => this.close()));
    btns.addButton((b) =>
      b.setButtonText("Apply").setCta().onClick(async () => {
        const toAdd = this.add.split(",").map((t) => t.trim()).filter(Boolean);
        const toRm = this.remove.split(",").map((t) => t.trim()).filter(Boolean);
        if (toAdd.length === 0 && toRm.length === 0) { this.close(); return; }
        for (const path of this.paths) {
          const f = this.app.vault.getAbstractFileByPath(path);
          if (!(f instanceof TFile)) continue;
          await this.plugin.updateFrontmatter(f, (fm) => {
            const cur = new Set(Array.isArray(fm.tags) ? fm.tags.map(String) : []);
            for (const t of toAdd) cur.add(t);
            for (const t of toRm) cur.delete(t);
            fm.tags = [...cur];
          });
        }
        new Notice("Tags updated");
        this.close();
      }),
    );
  }

  onClose() { this.contentEl.empty(); }
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
      .addText((t) => t
        .setValue(this.plugin.settings.folder)
        .setPlaceholder("Bookmarks")
        .onChange(async (v) => {
          this.plugin.settings.folder = v.trim() || "Bookmarks";
          await this.plugin.saveSettings();
        }),
      );

    new Setting(containerEl)
      .setName("Default layout")
      .addDropdown((d) => {
        for (const l of LAYOUT_DEFS) d.addOption(l.id, l.label);
        d.setValue(this.plugin.settings.defaultLayout).onChange(async (v) => {
          this.plugin.settings.defaultLayout = v;
          await this.plugin.saveSettings();
        });
      });

    new Setting(containerEl)
      .setName("Auto-fetch metadata")
      .setDesc("Fetch title, description, og:image and favicon when adding a bookmark.")
      .addToggle((t) => t.setValue(this.plugin.settings.fetchMetadata).onChange(async (v) => {
        this.plugin.settings.fetchMetadata = v;
        await this.plugin.saveSettings();
      }));

    new Setting(containerEl)
      .setName("Show favicons")
      .setDesc("Display the site favicon in the leftmost column / thumbnail slot.")
      .addToggle((t) => t.setValue(this.plugin.settings.showFavicons !== false).onChange(async (v) => {
        this.plugin.settings.showFavicons = v;
        await this.plugin.saveSettings();
      }));

    new Setting(containerEl)
      .setName("Show custom icons")
      .setDesc("Show per-bookmark and per-tag icons inline next to the title.")
      .addToggle((t) => t.setValue(this.plugin.settings.showIcons !== false).onChange(async (v) => {
        this.plugin.settings.showIcons = v;
        await this.plugin.saveSettings();
      }));

    // ---- sort
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

    // ---- status icons
    new Setting(containerEl).setName("Status icons").setHeading();
    containerEl.createEl("p", {
      cls: "setting-item-description",
      text: "Use any Lucide icon name. Browse names at lucide.dev/icons.",
    });
    for (const s of STATUS_ORDER) {
      new Setting(containerEl)
        .setName(this.plugin.settings.statusLabels[s])
        .setDesc((this.plugin.settings.statusIcons[s] || "").replace(/^lucide-/, ""))
        .addButton((b) => {
          b.setIcon(this.plugin.settings.statusIcons[s] || "circle");
          b.setTooltip("Click to choose icon");
          b.onClick(() => {
            new IconPickerModal(this.app, {
              title: `Icon for ${this.plugin.settings.statusLabels[s]}`,
              current: this.plugin.settings.statusIcons[s],
              allowClear: false,
              onPick: async (name) => {
                this.plugin.settings.statusIcons[s] = name || DEFAULT_SETTINGS.statusIcons[s];
                await this.plugin.saveSettings();
                this.display();
              },
            }).open();
          });
        });
    }

    // ---- tag icons
    new Setting(containerEl).setName("Tag icons").setHeading();
    containerEl.createEl("p", {
      cls: "setting-item-description",
      text: "Map a tag to a Lucide icon. The icon shows on every row carrying that tag (per-bookmark icons override).",
    });
    const tagsSeen = new Set([
      ...Object.keys(this.plugin.settings.tagIcons),
      ...this.plugin.allTagsByCount().map((x) => x.tag),
    ]);
    const sortedTags = [...tagsSeen].sort();
    if (sortedTags.length === 0) {
      containerEl.createEl("p", {
        cls: "setting-item-description",
        text: "No tags yet — add a few bookmarks first.",
      });
    }
    for (const tag of sortedTags) {
      const cur = this.plugin.settings.tagIcons[tag] || "";
      new Setting(containerEl)
        .setName(`#${tag}`)
        .setDesc(cur ? cur.replace(/^lucide-/, "") : "No icon assigned")
        .addButton((b) => {
          b.setIcon(cur || "tag");
          b.setTooltip(cur ? "Click to change" : "Click to choose icon");
          b.onClick(() => {
            new IconPickerModal(this.app, {
              title: `Icon for #${tag}`,
              current: cur,
              allowClear: true,
              onPick: async (name) => {
                if (name) this.plugin.settings.tagIcons[tag] = name;
                else delete this.plugin.settings.tagIcons[tag];
                await this.plugin.saveSettings();
                this.display();
              },
            }).open();
          });
        });
    }

    // ---- visible columns
    new Setting(containerEl).setName("Visible columns (list view)").setHeading();
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
          t.setValue(isOn).setDisabled(!!c.required).onChange(async (v) => {
            const cur = new Set(this.plugin.settings.visibleColumns);
            if (v) cur.add(c.id); else cur.delete(c.id);
            this.plugin.settings.visibleColumns = ALL_COLUMNS
              .filter((col) => cur.has(col.id) || col.required)
              .map((col) => col.id);
            await this.plugin.saveSettings();
          });
        });
    }

    // ---- link health
    new Setting(containerEl).setName("Link health").setHeading();

    new Setting(containerEl)
      .setName("Auto-check interval (days)")
      .setDesc("0 to disable. Marks unreachable links with status: broken.")
      .addText((t) => {
        t.inputEl.type = "number";
        t.inputEl.min = "0";
        t.setValue(String(this.plugin.settings.linkCheckIntervalDays || 0))
          .onChange(async (v) => {
            const n = Math.max(0, Math.floor(Number(v) || 0));
            this.plugin.settings.linkCheckIntervalDays = n;
            await this.plugin.saveSettings();
          });
      });

    new Setting(containerEl)
      .setName("Check now")
      .setDesc("Run a one-shot link health check across all bookmarks.")
      .addButton((b) => b.setButtonText("Check all links").onClick(async () => {
        b.setButtonText("Checking…").setDisabled(true);
        const result = await this.plugin.runLinkHealthCheck(true);
        new Notice(`Checked ${result.total}, ${result.broken} broken`);
        b.setButtonText("Check all links").setDisabled(false);
      }));

    // ---- import / export
    new Setting(containerEl).setName("Import & export").setHeading();

    new Setting(containerEl)
      .setName("Import bookmarks")
      .setDesc("Paste or load a Netscape-format HTML file.")
      .addButton((b) => b.setButtonText("Open import…")
        .onClick(() => new ImportModal(this.app, this.plugin).open()));

    new Setting(containerEl)
      .setName("Export bookmarks")
      .setDesc("Download a bookmarks.html file readable by all browsers.")
      .addButton((b) => b.setButtonText("Export…")
        .onClick(() => this.plugin.exportToBrowserHtml()));
  }
}

// ============================================================
//  Shared bookmark editor (used by inline expand & preview pane & cards/board modal)
// ============================================================

function renderBookmarkEditor(host, plugin, b, view) {
  host.empty();
  host.addClass("ws-editor");

  // header row: refetch + open + favicon-or-icon preview
  const headBar = host.createDiv({ cls: "ws-editor-head" });
  const visual = headBar.createDiv({ cls: "ws-editor-visual" });
  paintBookmarkVisual(visual, plugin, b, 32);
  const headInfo = headBar.createDiv({ cls: "ws-editor-info" });
  headInfo.createDiv({ cls: "ws-editor-domain", text: b.domain });
  const ts = new Date(b.added);
  const metaParts = [`Added ${ts.toLocaleDateString()}`];
  if (b.readingTime) metaParts.push(`${b.readingTime} min read`);
  metaParts.push(plugin.settings.statusLabels[b.status] || b.status);
  headInfo.createDiv({ cls: "ws-editor-meta", text: metaParts.join(" · ") });

  // title (editable)
  field(host, "Title", (parent) => {
    const ip = parent.createEl("input", { cls: "ws-editor-input", attr: { type: "text", value: b.title } });
    ip.addEventListener("change", async () => {
      await plugin.updateFrontmatter(b.file, (fm) => { fm.title = ip.value; });
    });
  });

  // url (editable)
  field(host, "URL", (parent) => {
    const ip = parent.createEl("input", { cls: "ws-editor-input", attr: { type: "url", value: b.url } });
    ip.addEventListener("change", async () => {
      const v = ip.value.trim();
      if (!/^https?:\/\//i.test(v)) { new Notice("URL must start with http(s)://"); ip.value = b.url; return; }
      await plugin.updateFrontmatter(b.file, (fm) => {
        fm.url = v;
        fm.domain = extractDomain(v);
      });
    });
  });

  // description (editable)
  field(host, "Description", (parent) => {
    const ta = parent.createEl("textarea", { cls: "ws-editor-textarea" });
    ta.value = b.description || "";
    ta.rows = 2;
    ta.addEventListener("blur", async () => {
      await plugin.updateFrontmatter(b.file, (fm) => { fm.description = ta.value; });
    });
  });

  // status (clickable to cycle)
  field(host, "Status", (parent) => {
    const wrap = parent.createDiv({ cls: "ws-status-segments" });
    for (const s of ["inbox", "reading", "done", "archive"]) {
      const seg = wrap.createDiv({ cls: "ws-status-seg ws-status-" + s + (b.status === s ? " is-active" : "") });
      const ic = seg.createSpan();
      setIcon(ic, plugin.settings.statusIcons[s] || "circle");
      seg.createSpan({ text: plugin.settings.statusLabels[s] });
      seg.addEventListener("click", async () => {
        await plugin.updateFrontmatter(b.file, (fm) => { fm.status = s; });
      });
    }
  });

  // tags (pill editor with autocomplete)
  field(host, "Tags", (parent) => {
    const tagBox = parent.createDiv({ cls: "ws-tags-edit" });
    for (const t of b.tags) {
      const pill = tagBox.createSpan({ cls: "ws-tag-pill" });
      pill.createSpan({ text: t });
      const x = pill.createSpan({ cls: "ws-tag-x", text: "×" });
      x.addEventListener("click", async () => {
        await plugin.updateFrontmatter(b.file, (fm) => {
          fm.tags = (Array.isArray(fm.tags) ? fm.tags.map(String) : []).filter((x) => x !== t);
        });
      });
    }
    const listId = "ws-tag-list-" + b.file.path.replace(/[^\w]/g, "_");
    const addInput = tagBox.createEl("input", {
      cls: "ws-tag-input",
      attr: { placeholder: "+ tag", list: listId },
    });
    const dl = tagBox.createEl("datalist", { attr: { id: listId } });
    for (const { tag } of plugin.allTagsByCount()) dl.createEl("option", { attr: { value: tag } });
    addInput.addEventListener("keydown", async (e) => {
      if (e.key === "Enter" && addInput.value.trim()) {
        e.preventDefault();
        const v = addInput.value.trim().replace(/^#/, "");
        await plugin.updateFrontmatter(b.file, (fm) => {
          const cur = new Set(Array.isArray(fm.tags) ? fm.tags.map(String) : []);
          cur.add(v);
          fm.tags = [...cur];
        });
        addInput.value = "";
      }
    });
  });

  // custom icon
  field(host, "Custom icon", (parent) => {
    const wrap = parent.createDiv({ cls: "ws-icon-edit" });
    const preview = wrap.createSpan({ cls: "ws-icon-preview" });
    if (b.icon) setIcon(preview, b.icon);
    const btn = wrap.createEl("button", { cls: "ws-editor-btn" });
    setIcon(btn.createSpan(), b.icon ? "edit-3" : "image-plus");
    const displayIcon = b.icon ? b.icon.replace(/^lucide-/, "") : "";
    btn.createSpan({ text: b.icon ? `Change (${displayIcon})` : "Pick an icon" });
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      new IconPickerModal(plugin.app, {
        title: "Choose icon for this bookmark",
        current: b.icon || "",
        allowClear: true,
        onPick: async (name) => {
          await plugin.updateFrontmatter(b.file, (fm) => {
            if (name) fm.icon = name;
            else delete fm.icon;
          });
        },
      }).open();
    });
  });

  // notes (file body)
  field(host, "Notes", (parent) => {
    const ta = parent.createEl("textarea", { cls: "ws-editor-textarea ws-editor-notes" });
    ta.rows = 6;
    ta.placeholder = "Markdown notes — saves automatically.";
    plugin.app.vault.read(b.file).then(() => readBody(plugin.app, b.file)).then((body) => {
      ta.value = body || "";
    });
    const save = debounce(async () => {
      try { await writeBody(plugin.app, b.file, ta.value); }
      catch (e) { console.error("notes write failed", e); }
    }, 600, true);
    ta.addEventListener("input", save);
    ta.addEventListener("blur", save);
  });

  // actions row
  const actions = host.createDiv({ cls: "ws-editor-actions" });
  const mkBtn = (icon, label, onClick) => {
    const btn = actions.createEl("button", { cls: "ws-editor-btn" });
    setIcon(btn.createSpan(), icon);
    btn.createSpan({ text: label });
    btn.addEventListener("click", (e) => { e.stopPropagation(); onClick(e, btn); });
    return btn;
  };
  mkBtn("external-link", "Open in browser", async () => {
    window.open(b.url, "_blank");
    await plugin.updateFrontmatter(b.file, (fm) => { fm.opened = new Date().toISOString(); });
  });
  mkBtn("file-text", "Open note", () => plugin.app.workspace.getLeaf("tab").openFile(b.file));
  mkBtn("link", "Copy link", async () => {
    await navigator.clipboard.writeText(b.url);
    new Notice("URL copied");
  });
  mkBtn("refresh-cw", "Refetch metadata", async (_e, btn) => {
    btn.setText("Fetching…");
    const meta = await fetchMetadata(b.url);
    if (!meta) { new Notice("Fetch failed"); btn.empty(); setIcon(btn.createSpan(), "refresh-cw"); btn.createSpan({ text: " Refetch metadata" }); return; }
    await plugin.updateFrontmatter(b.file, (fm) => {
      if (meta.title) fm.title = meta.title;
      if (meta.description) fm.description = meta.description;
      if (meta.favicon) fm.favicon = meta.favicon;
      if (meta.cover) fm.cover = meta.cover;
      if (meta.author) fm.author = meta.author;
      if (meta.readingTime) fm["reading-time"] = meta.readingTime;
    });
    new Notice("Metadata refreshed");
  });
  mkBtn("activity", "Check link", async (_e, btn) => {
    btn.setText("Checking…");
    const ok = await checkLinkAlive(b.url);
    await plugin.updateFrontmatter(b.file, (fm) => {
      fm.lastChecked = new Date().toISOString();
      if (!ok) fm.status = "broken";
      else if (b.status === "broken") fm.status = "inbox";
    });
    new Notice(ok ? "Link is alive" : "Link appears broken");
  });
  mkBtn("archive", b.status === "archive" ? "Unarchive" : "Archive", async () => {
    await plugin.updateFrontmatter(b.file, (fm) => {
      fm.status = b.status === "archive" ? "inbox" : "archive";
    });
  });
  mkBtn("trash-2", "Delete", async () => {
    if (!confirm(`Delete "${b.title}"? Moves the file to system trash.`)) return;
    await plugin.app.vault.trash(b.file, true);
  });
}

function field(host, label, build) {
  const f = host.createDiv({ cls: "ws-editor-field" });
  f.createDiv({ cls: "ws-editor-label", text: label });
  build(f);
}

// Returns { name, fromTag } for the custom icon to use inline, or null
function getCustomIcon(plugin, b) {
  if (b.icon) return { name: b.icon, fromTag: null };
  for (const t of b.tags) {
    if (plugin.settings.tagIcons[t]) return { name: plugin.settings.tagIcons[t], fromTag: t };
  }
  return null;
}

// Inline icon next to a title — toggled by settings.showIcons.
// Returns true if it rendered something.
function appendInlineIcon(host, plugin, b) {
  if (plugin.settings.showIcons === false) return false;
  const cur = getCustomIcon(plugin, b);
  if (!cur) return false;
  const span = host.createSpan({ cls: "ws-inline-icon" });
  setIcon(span, cur.name);
  if (cur.fromTag) span.style.color = colorForTag(cur.fromTag);
  span.setAttribute("aria-label", cur.fromTag ? `tag: ${cur.fromTag}` : "custom icon");
  return true;
}

// Favicon-only painter — used in the dedicated favicon column / thumb slots.
function paintFavicon(host, plugin, b, sizePx) {
  host.empty();
  host.style.width = host.style.height = sizePx + "px";
  if (plugin.settings.showFavicons !== false && b.favicon) {
    host.addClass("ws-vis-fav");
    const img = host.createEl("img", { attr: { src: b.favicon, alt: "" } });
    img.addEventListener("error", () => {
      host.empty();
      host.removeClass("ws-vis-fav");
      paintFallback(host, b, sizePx);
    });
    return;
  }
  paintFallback(host, b, sizePx);
}

// Visual painter — chooses between custom icon, tag icon, favicon, or fallback
function paintBookmarkVisual(host, plugin, b, sizePx) {
  host.empty();
  host.style.width = host.style.height = sizePx + "px";

  const customIcon = b.icon;
  const tagIcon = b.tags.map((t) => plugin.settings.tagIcons[t]).find(Boolean);

  if (customIcon) {
    host.addClass("ws-vis-icon");
    setIcon(host, customIcon);
    return;
  }
  if (tagIcon) {
    host.addClass("ws-vis-icon");
    setIcon(host, tagIcon);
    if (b.tags.length) {
      host.style.color = colorForTag(b.tags.find((t) => plugin.settings.tagIcons[t]) || b.tags[0]);
    }
    return;
  }
  if (plugin.settings.showFavicons !== false && b.favicon) {
    host.addClass("ws-vis-fav");
    const img = host.createEl("img", { attr: { src: b.favicon, alt: "" } });
    img.addEventListener("error", () => {
      host.empty();
      host.removeClass("ws-vis-fav");
      paintFallback(host, b, sizePx);
    });
    return;
  }
  paintFallback(host, b, sizePx);
}

function paintFallback(host, b, sizePx) {
  host.addClass("ws-vis-fallback");
  host.style.background = b.tags.length ? colorForTag(b.tags[0]) : "var(--background-modifier-border)";
  host.style.fontSize = Math.max(8, Math.floor(sizePx * 0.55)) + "px";
  host.setText((b.title || "?").trim().charAt(0).toUpperCase());
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
      layout: plugin.settings.defaultLayout || "list",
      focusedPath: null,
      previewPath: null,        // tree layout preview
    };
  }

  getViewType() { return VIEW_TYPE; }
  getDisplayText() { return "Wellspring"; }
  getIcon() { return "bookmark"; }

  async onOpen() {
    this.containerEl.children[1].addClass("ws-root");
    this.installKeyboardHandler();
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

  installKeyboardHandler() {
    this.containerEl.addEventListener("keydown", (e) => {
      const tag = e.target?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      const items = this.filtered();
      if (items.length === 0) return;
      const curIdx = Math.max(0, items.findIndex((b) => b.file.path === this.state.focusedPath));
      const move = (delta) => {
        const next = items[(curIdx + delta + items.length) % items.length];
        this.state.focusedPath = next.file.path;
        this.render();
        this.containerEl.querySelector(".ws-row.is-focused, .ws-card.is-focused, .ws-board-card.is-focused")
          ?.scrollIntoView({ block: "nearest" });
      };
      if (e.key === "j" || e.key === "ArrowDown") { e.preventDefault(); move(1); }
      else if (e.key === "k" || e.key === "ArrowUp") { e.preventDefault(); move(-1); }
      else if (e.key === "Enter") {
        const cur = items[curIdx];
        if (cur) { e.preventDefault(); window.open(cur.url, "_blank"); }
      } else if (e.key === "e") {
        const cur = items[curIdx];
        if (cur) {
          e.preventDefault();
          if (this.state.expanded.has(cur.file.path)) this.state.expanded.delete(cur.file.path);
          else this.state.expanded.add(cur.file.path);
          this.render();
        }
      } else if (e.key === "x") {
        const cur = items[curIdx];
        if (cur) {
          e.preventDefault();
          if (this.state.selected.has(cur.file.path)) this.state.selected.delete(cur.file.path);
          else this.state.selected.add(cur.file.path);
          this.render();
        }
      } else if (e.key === "/") {
        e.preventDefault();
        this.containerEl.querySelector(".ws-search input")?.focus();
      } else if (e.key === "Escape") {
        if (this.state.selected.size > 0) {
          this.state.selected.clear();
          this.render();
        }
      }
    });
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

  allTagsByCount() { return this.plugin.allTagsByCount(); }

  statusCounts() {
    const counts = { all: 0 };
    for (const s of STATUS_ORDER) counts[s] = 0;
    for (const b of this.plugin.loadBookmarks()) {
      counts.all++;
      counts[b.status] = (counts[b.status] || 0) + 1;
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

    const app = root.createDiv({ cls: "ws-app ws-layout-" + this.state.layout });
    this.renderSidebar(app.createDiv({ cls: "ws-side" }));
    const main = app.createDiv({ cls: "ws-main" });
    this.renderHeader(main.createDiv({ cls: "ws-head" }));
    this.renderToolbar(main.createDiv({ cls: "ws-tools" }));

    const body = main.createDiv({ cls: "ws-body" });
    if (this.state.layout === "list") this.renderListLayout(body);
    else if (this.state.layout === "cards") this.renderCardsLayout(body);
    else if (this.state.layout === "board") this.renderBoardLayout(body);
    else if (this.state.layout === "tree") this.renderTreeLayout(body);
  }

  renderSidebar(side) {
    const counts = this.statusCounts();
    const tags = this.allTagsByCount();
    const { settings } = this.plugin;

    const h1 = side.createEl("h3", { cls: "ws-side-h" });
    h1.createSpan({ text: "Status" });
    const gear = h1.createSpan({ cls: "ws-side-gear", attr: { "aria-label": "Customize status icons" } });
    setIcon(gear, "settings");
    gear.addEventListener("click", () => {
      this.app.setting.open();
      this.app.setting.openTabById(this.plugin.manifest.id);
    });

    const allLink = side.createEl("a", { cls: "ws-side-link" + (this.state.statusFilter === "all" ? " is-active" : "") });
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
      link.createSpan({ cls: "ws-side-count", text: String(counts[s] || 0) });
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
        const link = side.createEl("a", { cls: "ws-side-link" + (active ? " is-active" : "") });
        const lhs = link.createSpan({ cls: "ws-side-lhs" });
        const icoName = settings.tagIcons[tag];
        if (icoName) setIcon(lhs.createSpan({ cls: "ws-tag-ico" }), icoName);
        else lhs.createSpan({ cls: "ws-tag-hash", text: "#" });
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
      attr: {
        type: "search",
        placeholder: "Search title, description, notes…  (press / to focus)",
        value: this.state.search,
      },
    });
    input.addEventListener(
      "input",
      debounce(() => { this.state.search = input.value; this.render(); }, 120, true),
    );

    const switcher = head.createDiv({ cls: "ws-switcher" });
    for (const l of LAYOUT_DEFS) {
      const b = switcher.createEl("button", {
        cls: "ws-sw" + (this.state.layout === l.id ? " is-active" : ""),
        attr: { "aria-label": l.label, title: l.label },
      });
      setIcon(b, l.icon);
      b.addEventListener("click", () => {
        this.state.layout = l.id;
        this.render();
      });
    }

    const settingsBtn = head.createEl("button", {
      cls: "ws-icon-btn",
      attr: { "aria-label": "Wellspring settings", title: "Settings" },
    });
    setIcon(settingsBtn, "settings");
    settingsBtn.addEventListener("click", () => {
      this.app.setting.open();
      this.app.setting.openTabById(this.plugin.manifest.id);
    });

    const importBtn = head.createEl("button", {
      cls: "ws-icon-btn",
      attr: { "aria-label": "Import bookmarks", title: "Import bookmarks (HTML)" },
    });
    setIcon(importBtn, "upload");
    importBtn.addEventListener("click", () => new ImportModal(this.app, this.plugin).open());

    const addBtn = head.createEl("button", { cls: "ws-btn", attr: { "aria-label": "Add bookmark" } });
    setIcon(addBtn.createSpan(), "plus");
    addBtn.createSpan({ text: "Add" });
    addBtn.addEventListener("click", () => new AddBookmarkModal(this.app, this.plugin).open());
  }

  renderToolbar(tools) {
    const selected = this.state.selected.size;
    if (selected > 0) {
      tools.createSpan({ cls: "ws-selected", text: `${selected} selected` });
      this.mkAction(tools, "tag", "Tag…", () => {
        new BulkTagModal(this.app, this.plugin, [...this.state.selected]).open();
      });
      this.mkAction(tools, "circle-dot", "Status…", (e) => this.openBulkStatusMenu(e));
      this.mkAction(tools, "archive", "Archive", async () => { await this.bulkSetStatus("archive"); });
      this.mkAction(tools, "trash-2", "Delete", async () => {
        if (!confirm(`Delete ${selected} bookmark(s)? Moves files to system trash.`)) return;
        await this.bulkDelete();
      });
      this.mkAction(tools, "x", "Clear", () => { this.state.selected.clear(); this.render(); });
    } else {
      const total = this.filtered().length;
      tools.createSpan({ cls: "ws-tool-meta", text: `${total} bookmark${total === 1 ? "" : "s"}` });
    }

    tools.createSpan({ cls: "ws-sep" });

    const sortBtn = tools.createEl("button", { cls: "ws-tool-btn" });
    sortBtn.createSpan({ text: `Sort: ${this.sortLabel()}` });
    setIcon(sortBtn.createSpan(), this.state.sortDir === "desc" ? "arrow-down" : "arrow-up");
    sortBtn.addEventListener("click", (e) => this.openSortMenu(e));

    if (this.state.layout === "list") {
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

  // --- empty state (shared) ------------------------------------

  renderEmpty(parent) {
    const all = this.plugin.loadBookmarks();
    const empty = parent.createDiv({ cls: "ws-empty" });
    if (all.length === 0) {
      empty.createDiv({ cls: "ws-empty-title", text: "No bookmarks yet." });
      empty.createDiv({
        cls: "ws-empty-sub",
        text: "Add your first one — paste a URL, or import a Netscape HTML file.",
      });
      const actions = empty.createDiv({ cls: "ws-empty-actions" });
      const addBtn = actions.createEl("button", { cls: "ws-btn" });
      setIcon(addBtn.createSpan(), "plus");
      addBtn.createSpan({ text: "Add bookmark" });
      addBtn.addEventListener("click", () => new AddBookmarkModal(this.app, this.plugin).open());
      const impBtn = actions.createEl("button", { cls: "ws-action" });
      setIcon(impBtn.createSpan(), "upload");
      impBtn.createSpan({ text: "Import…" });
      impBtn.addEventListener("click", () => new ImportModal(this.app, this.plugin).open());
    } else {
      empty.setText("No bookmarks match your filters.");
    }
  }

  // --- list layout (the original compact list) -----------------

  renderListLayout(body) {
    const cols = this.visibleColumns();
    const showFav = this.plugin.settings.showFavicons !== false;
    const gridTemplate = `28px ${showFav ? "22px " : ""}${cols.map((c) => c.width).join(" ")} 26px`;

    const headers = body.createDiv({ cls: "ws-col-headers" });
    headers.style.gridTemplateColumns = gridTemplate;
    headers.createSpan();
    if (showFav) headers.createSpan();
    for (const c of cols) {
      const cell = headers.createSpan({ text: c.label });
      cell.addEventListener("click", () => {
        const sortMap = {
          title: "title", domain: "domain", added: "added", status: "status",
          tags: null, url: null, description: null, "reading-time": null, author: null,
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
    headers.createSpan();

    const table = body.createDiv({ cls: "ws-table" });
    const items = this.filtered();
    if (items.length === 0) {
      this.renderEmpty(table);
      return;
    }
    for (const b of items) this.renderListRow(table, b, gridTemplate, cols, showFav);
  }

  renderListRow(table, b, gridTemplate, cols, showFav) {
    const id = b.file.path;
    const isSelected = this.state.selected.has(id);
    const isExpanded = this.state.expanded.has(id);
    const isFocused = this.state.focusedPath === id;

    const row = table.createDiv({
      cls: "ws-row" +
        (isSelected ? " is-selected" : "") +
        (isExpanded ? " is-expanded" : "") +
        (isFocused ? " is-focused" : "") +
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
      paintFavicon(fav, this.plugin, b, 14);
    }

    const q = this.state.search.trim();
    for (const c of cols) {
      const cell = row.createSpan({ cls: "ws-cell ws-c-" + c.id });
      this.renderCell(cell, c.id, b, q);
    }

    const more = row.createSpan({ cls: "ws-more" });
    setIcon(more, isExpanded ? "chevron-down" : "more-horizontal");
    more.addEventListener("click", (e) => {
      e.stopPropagation();
      this.openRowMenu(e, b);
    });

    row.addEventListener("click", () => {
      this.state.focusedPath = id;
      if (isExpanded) this.state.expanded.delete(id);
      else this.state.expanded.add(id);
      this.render();
    });

    if (isExpanded) {
      const detail = table.createDiv({ cls: "ws-row-detail" });
      renderBookmarkEditor(detail, this.plugin, b, this);
    }
  }

  renderCell(cell, id, b, q) {
    switch (id) {
      case "title": {
        appendInlineIcon(cell, this.plugin, b);
        const t = cell.createSpan({ cls: "ws-title-text" });
        renderHighlighted(t, b.title, q);
        break;
      }
      case "domain":
        renderHighlighted(cell, b.domain, q);
        break;
      case "tags":
        for (const t of b.tags) {
          const pill = cell.createSpan({ cls: "ws-tag" });
          const ic = this.plugin.settings.tagIcons[t];
          if (ic) {
            const i = pill.createSpan({ cls: "ws-tag-ico" });
            setIcon(i, ic);
          }
          pill.createSpan({ text: t });
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
        renderHighlighted(cell, b.description, q);
        break;
      case "reading-time":
        cell.setText(b.readingTime ? `${b.readingTime} min` : "");
        break;
      case "author":
        cell.setText(b.author ?? "");
        break;
    }
  }

  // --- cards layout --------------------------------------------

  renderCardsLayout(body) {
    const items = this.filtered();
    if (items.length === 0) {
      this.renderEmpty(body);
      return;
    }
    const grid = body.createDiv({ cls: "ws-cards" });
    for (const b of items) this.renderCard(grid, b);
  }

  renderCard(grid, b) {
    const id = b.file.path;
    const isSelected = this.state.selected.has(id);
    const isFocused = this.state.focusedPath === id;
    const isExpanded = this.state.expanded.has(id);
    const card = grid.createDiv({
      cls: "ws-card" + (isSelected ? " is-selected" : "") + (isFocused ? " is-focused" : ""),
    });

    // hero
    const hero = card.createDiv({ cls: "ws-card-hero" });
    if (b.cover) {
      hero.style.backgroundImage = `url(${JSON.stringify(b.cover)})`;
      hero.addClass("has-cover");
    } else {
      hero.style.background = `linear-gradient(135deg, ${colorForTag(b.tags[0] || b.domain)} 0%, ${colorForTag(b.tags[1] || b.tags[0] || b.title)} 100%)`;
    }
    const status = hero.createSpan({ cls: "ws-card-status ws-status-" + b.status });
    setIcon(status.createSpan(), this.plugin.settings.statusIcons[b.status] || "circle");
    status.createSpan({ text: this.plugin.settings.statusLabels[b.status] });

    const dom = hero.createDiv({ cls: "ws-card-domain" });
    const fav = dom.createSpan({ cls: "ws-card-fav" });
    paintFavicon(fav, this.plugin, b, 14);
    dom.createSpan({ text: b.domain });

    const cardBody = card.createDiv({ cls: "ws-card-body" });
    const t = cardBody.createEl("h3", { cls: "ws-card-title" });
    appendInlineIcon(t, this.plugin, b);
    const tt = t.createSpan({ cls: "ws-title-text" });
    renderHighlighted(tt, b.title, this.state.search.trim());
    if (b.description) {
      const d = cardBody.createEl("p", { cls: "ws-card-desc" });
      renderHighlighted(d, b.description, this.state.search.trim());
    }
    const meta = cardBody.createDiv({ cls: "ws-card-meta" });
    const tags = meta.createDiv({ cls: "ws-card-tags" });
    for (const tg of b.tags.slice(0, 3)) {
      const pill = tags.createSpan({ cls: "ws-tag" });
      const ic = this.plugin.settings.tagIcons[tg];
      if (ic) setIcon(pill.createSpan({ cls: "ws-tag-ico" }), ic);
      pill.createSpan({ text: tg });
    }
    meta.createSpan({ cls: "ws-card-ago", text: formatAgo(b.added) });

    // checkbox overlay
    const check = card.createSpan({ cls: "ws-card-check" + (isSelected ? " is-on" : "") });
    if (isSelected) setIcon(check, "check");
    check.addEventListener("click", (e) => {
      e.stopPropagation();
      if (isSelected) this.state.selected.delete(id);
      else this.state.selected.add(id);
      this.render();
    });

    card.addEventListener("click", () => {
      this.state.focusedPath = id;
      if (isExpanded) this.state.expanded.delete(id);
      else this.state.expanded.add(id);
      this.render();
    });
    card.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      this.openRowMenu(e, b);
    });

    if (isExpanded) {
      // span the editor full-width below the card row
      const editor = grid.createDiv({ cls: "ws-card-editor" });
      renderBookmarkEditor(editor, this.plugin, b, this);
    }
  }

  // --- board layout --------------------------------------------

  renderBoardLayout(body) {
    const items = this.filtered();
    const board = body.createDiv({ cls: "ws-board" });
    const groups = {};
    for (const s of ["inbox", "reading", "done", "archive"]) groups[s] = [];
    for (const b of items) {
      const s = b.status === "broken" ? "inbox" : b.status;
      if (groups[s]) groups[s].push(b);
    }
    for (const s of ["inbox", "reading", "done", "archive"]) {
      const col = board.createDiv({ cls: "ws-board-col ws-col-" + s });
      const head = col.createDiv({ cls: "ws-board-col-head" });
      const ico = head.createSpan({ cls: "ws-board-col-ico ws-status-" + s });
      setIcon(ico, this.plugin.settings.statusIcons[s] || "circle");
      head.createSpan({ cls: "ws-board-col-label", text: this.plugin.settings.statusLabels[s] });
      head.createSpan({ cls: "ws-board-col-count", text: String(groups[s].length) });
      const add = head.createEl("button", { cls: "ws-board-col-add", attr: { "aria-label": "Add" } });
      setIcon(add, "plus");
      add.addEventListener("click", () => {
        new AddBookmarkModal(this.app, this.plugin, { status: s }).open();
      });

      const colBody = col.createDiv({ cls: "ws-board-col-body" });

      colBody.addEventListener("dragover", (e) => {
        e.preventDefault();
        col.addClass("is-drop");
      });
      colBody.addEventListener("dragleave", () => col.removeClass("is-drop"));
      colBody.addEventListener("drop", async (e) => {
        e.preventDefault();
        col.removeClass("is-drop");
        const path = e.dataTransfer.getData("text/plain");
        const f = this.app.vault.getAbstractFileByPath(path);
        if (f instanceof TFile) {
          await this.plugin.updateFrontmatter(f, (fm) => { fm.status = s; });
        }
      });

      for (const b of groups[s]) this.renderBoardCard(colBody, b);
    }
  }

  renderBoardCard(parent, b) {
    const id = b.file.path;
    const isFocused = this.state.focusedPath === id;
    const isExpanded = this.state.expanded.has(id);
    const card = parent.createDiv({
      cls: "ws-board-card" + (isFocused ? " is-focused" : ""),
      attr: { draggable: "true" },
    });

    card.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", id);
      e.dataTransfer.effectAllowed = "move";
      card.addClass("is-dragging");
    });
    card.addEventListener("dragend", () => card.removeClass("is-dragging"));

    const accent = card.createDiv({ cls: "ws-board-accent" });
    accent.style.background = b.tags.length
      ? `linear-gradient(90deg, ${colorForTag(b.tags[0])}, ${colorForTag(b.tags[b.tags.length - 1])})`
      : "var(--background-modifier-border)";

    const head = card.createDiv({ cls: "ws-board-card-head" });
    const fav = head.createSpan({ cls: "ws-board-card-fav" });
    paintFavicon(fav, this.plugin, b, 12);
    head.createSpan({ cls: "ws-board-card-domain", text: b.domain });

    const t = card.createEl("p", { cls: "ws-board-card-title" });
    appendInlineIcon(t, this.plugin, b);
    const tt = t.createSpan({ cls: "ws-title-text" });
    renderHighlighted(tt, b.title, this.state.search.trim());

    const meta = card.createDiv({ cls: "ws-board-card-meta" });
    const tags = meta.createDiv({ cls: "ws-card-tags" });
    for (const tg of b.tags.slice(0, 2)) {
      const pill = tags.createSpan({ cls: "ws-tag" });
      const ic = this.plugin.settings.tagIcons[tg];
      if (ic) setIcon(pill.createSpan({ cls: "ws-tag-ico" }), ic);
      pill.createSpan({ text: tg });
    }
    meta.createSpan({ cls: "ws-card-ago", text: formatAgo(b.added) });

    card.addEventListener("click", () => {
      this.state.focusedPath = id;
      if (isExpanded) this.state.expanded.delete(id);
      else this.state.expanded.add(id);
      this.render();
    });
    card.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      this.openRowMenu(e, b);
    });

    if (isExpanded) {
      const editor = parent.createDiv({ cls: "ws-board-editor" });
      renderBookmarkEditor(editor, this.plugin, b, this);
    }
  }

  // --- tree layout ---------------------------------------------

  renderTreeLayout(body) {
    body.addClass("ws-tree-body");
    const items = this.filtered();
    const left = body.createDiv({ cls: "ws-tree-list" });
    const right = body.createDiv({ cls: "ws-tree-preview" });

    if (items.length === 0) {
      this.renderEmpty(left);
      right.createDiv({ cls: "ws-empty", text: "Select a bookmark to preview." });
      return;
    }

    const previewPath = this.state.previewPath || items[0].file.path;
    for (const b of items) {
      const id = b.file.path;
      const item = left.createDiv({
        cls: "ws-tree-item" + (id === previewPath ? " is-active" : ""),
      });
      const fav = item.createSpan({ cls: "ws-tree-fav" });
      paintFavicon(fav, this.plugin, b, 16);
      const info = item.createDiv({ cls: "ws-tree-info" });
      const t = info.createDiv({ cls: "ws-tree-title" });
      appendInlineIcon(t, this.plugin, b);
      const tt = t.createSpan({ cls: "ws-title-text" });
      renderHighlighted(tt, b.title, this.state.search.trim());
      info.createDiv({ cls: "ws-tree-sub", text: `${b.domain} · ${formatAgo(b.added)}` });
      const stIco = item.createSpan({ cls: "ws-tree-status ws-status-" + b.status });
      setIcon(stIco, this.plugin.settings.statusIcons[b.status] || "circle");
      item.addEventListener("click", () => {
        this.state.previewPath = id;
        this.state.focusedPath = id;
        this.render();
      });
    }

    const cur = items.find((b) => b.file.path === previewPath) || items[0];
    if (cur) renderBookmarkEditor(right, this.plugin, cur, this);
  }

  // --- menus ---------------------------------------------------

  openStatusMenu(e, b) {
    const m = new Menu();
    const labels = this.plugin.settings.statusLabels;
    for (const s of ["inbox", "reading", "done", "archive"]) {
      m.addItem((it) =>
        it.setTitle(labels[s])
          .setIcon(this.plugin.settings.statusIcons[s] || "circle")
          .setChecked(b.status === s)
          .onClick(async () => {
            await this.plugin.updateFrontmatter(b.file, (fm) => { fm.status = s; });
          }),
      );
    }
    m.showAtMouseEvent(e);
  }

  openBulkStatusMenu(e) {
    const m = new Menu();
    const labels = this.plugin.settings.statusLabels;
    for (const s of ["inbox", "reading", "done", "archive"]) {
      m.addItem((it) =>
        it.setTitle(`Set: ${labels[s]}`)
          .setIcon(this.plugin.settings.statusIcons[s] || "circle")
          .onClick(async () => { await this.bulkSetStatus(s); }),
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
    m.addItem((it) =>
      it.setTitle("Refetch metadata").setIcon("refresh-cw").onClick(async () => {
        const meta = await fetchMetadata(b.url);
        if (!meta) { new Notice("Fetch failed"); return; }
        await this.plugin.updateFrontmatter(b.file, (fm) => {
          if (meta.title) fm.title = meta.title;
          if (meta.description) fm.description = meta.description;
          if (meta.favicon) fm.favicon = meta.favicon;
          if (meta.cover) fm.cover = meta.cover;
          if (meta.author) fm.author = meta.author;
          if (meta.readingTime) fm["reading-time"] = meta.readingTime;
        });
        new Notice("Metadata refreshed");
      }),
    );
    m.addSeparator();
    m.addItem((it) =>
      it.setTitle(b.status === "archive" ? "Unarchive" : "Archive").setIcon("archive").onClick(async () => {
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
      added: "Added", title: "Title", domain: "Domain", status: "Status", opened: "Last opened",
    };
    return map[this.state.sortField] || "Added";
  }

  // --- batch ---------------------------------------------------

  async bulkSetStatus(s) {
    for (const path of this.state.selected) {
      const file = this.app.vault.getAbstractFileByPath(path);
      if (file instanceof TFile) {
        await this.plugin.updateFrontmatter(file, (fm) => { fm.status = s; });
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

    this.addRibbonIcon("bookmark", "Open Wellspring", () => this.activateView());

    this.addCommand({
      id: "open-view",
      name: "Open Wellspring",
      callback: () => this.activateView(),
    });
    this.addCommand({
      id: "add-bookmark",
      name: "Add bookmark",
      callback: () => new AddBookmarkModal(this.app, this).open(),
    });
    this.addCommand({
      id: "import-bookmarks",
      name: "Import bookmarks (HTML)",
      callback: () => new ImportModal(this.app, this).open(),
    });
    this.addCommand({
      id: "export-bookmarks",
      name: "Export bookmarks to HTML",
      callback: () => this.exportToBrowserHtml(),
    });
    this.addCommand({
      id: "check-link-health",
      name: "Check link health",
      callback: async () => {
        const r = await this.runLinkHealthCheck(true);
        new Notice(`Checked ${r.total}, ${r.broken} broken`);
      },
    });

    this.addSettingTab(new WellspringSettingTab(this.app, this));

    const refresh = debounce(() => this.refreshViews(), 200, true);
    this.registerEvent(this.app.metadataCache.on("changed", refresh));
    this.registerEvent(this.app.vault.on("create", refresh));
    this.registerEvent(this.app.vault.on("delete", refresh));
    this.registerEvent(this.app.vault.on("rename", refresh));

    this.app.workspace.onLayoutReady(() => this.maybeRunPeriodicLinkCheck());
  }

  async onunload() {
    // Obsidian auto-detaches view leaves; nothing to do.
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    this.settings.statusIcons = { ...DEFAULT_SETTINGS.statusIcons, ...this.settings.statusIcons };
    this.settings.statusLabels = { ...DEFAULT_SETTINGS.statusLabels, ...this.settings.statusLabels };
    this.settings.tagIcons = { ...(this.settings.tagIcons || {}) };
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

  async createBookmark(rawUrl, opts = {}) {
    const url = String(rawUrl).trim();
    if (!/^https?:\/\//i.test(url)) throw new Error("URL must start with http(s)://");

    await this.ensureFolder();
    const meta = (this.settings.fetchMetadata && !opts.skipFetch)
      ? await fetchMetadata(url) : null;

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
            icon: fm.icon ? String(fm.icon) : undefined,
            readingTime:
              typeof fm["reading-time"] === "number" ? fm["reading-time"] : undefined,
          });
        }
      }
    };
    walk(folder);
    return result;
  }

  allTagsByCount() {
    const m = new Map();
    for (const b of this.loadBookmarks()) {
      for (const t of b.tags) m.set(t, (m.get(t) ?? 0) + 1);
    }
    return [...m.entries()]
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count);
  }

  // ---- export

  async exportToBrowserHtml() {
    const items = this.loadBookmarks();
    if (items.length === 0) { new Notice("No bookmarks to export"); return; }
    const html = buildBookmarksHtml(items);
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "wellspring-bookmarks.html";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    new Notice(`Exported ${items.length} bookmarks`);
  }

  // ---- link health

  async maybeRunPeriodicLinkCheck() {
    const days = this.settings.linkCheckIntervalDays || 0;
    if (days <= 0) return;
    const last = this.settings.lastLinkCheck || 0;
    const due = Date.now() - last > days * 86400 * 1000;
    if (!due) return;
    await this.runLinkHealthCheck(false);
  }

  async runLinkHealthCheck(verbose) {
    const items = this.loadBookmarks();
    let broken = 0;
    for (const b of items) {
      const ok = await checkLinkAlive(b.url);
      await this.updateFrontmatter(b.file, (fm) => {
        fm.lastChecked = new Date().toISOString();
        if (!ok) { fm.status = "broken"; }
        else if (b.status === "broken") fm.status = "inbox";
      });
      if (!ok) broken++;
    }
    this.settings.lastLinkCheck = Date.now();
    await this.saveData(this.settings);
    if (verbose) console.log(`Wellspring link check: ${items.length} total, ${broken} broken`);
    return { total: items.length, broken };
  }
}

module.exports = WellspringPlugin;
