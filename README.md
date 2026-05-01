<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/Real-Fruit-Snacks/MyNotes/main/docs/assets/logo-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/Real-Fruit-Snacks/MyNotes/main/docs/assets/logo-light.svg">
  <img alt="MyNotes" src="https://raw.githubusercontent.com/Real-Fruit-Snacks/MyNotes/main/docs/assets/logo-dark.svg" width="100%">
</picture>

![MkDocs](https://img.shields.io/badge/built%20with-MkDocs%20Material-cba6f7?style=flat-square&labelColor=1e1e2e)
![Theme](https://img.shields.io/badge/theme-Catppuccin%20Mocha-b4befe?style=flat-square&labelColor=1e1e2e)
![Pages](https://img.shields.io/badge/hosted%20on-GitHub%20Pages-89b4fa?style=flat-square&labelColor=1e1e2e)
![License](https://img.shields.io/badge/license-MIT-a6e3a1?style=flat-square&labelColor=1e1e2e)

**Tradecraft, written down — a personal pentester's notebook.**

A living knowledge base for offensive security work: methodology, command cheat-sheets,
tool snippets, and field-tested workflows. Built with MkDocs Material, themed in
Catppuccin Mocha, deployed to GitHub Pages on every push to `main`.

---

## What's Inside

These notes are written for me first — but they're public because someone, somewhere,
might be debugging the same misconfigured ACL at 2 AM and find what they need faster
here than in a 40-tab browser session.

Topics live under `docs/` and grow over time. Expect a mix of:

- **Recon & enumeration** — nmap, rustscan, web fuzzing, AD discovery
- **Active Directory** — kerberos attacks, ACL abuse, BloodHound queries, NTLM relay
- **Privilege escalation** — Linux/Windows checklists, kernel exploits, misconfigs
- **Credential access** — secretsdump, mimikatz tradecraft, password spraying, hash cracking
- **Lateral movement** — pass-the-hash, pass-the-ticket, WMI/PsExec/WinRM, pivoting
- **Persistence & evasion** — defender bypasses, AMSI, ETW, scheduled task tricks
- **Tool references** — quick-reference pages for the [Real-Fruit-Snacks toolkit](https://github.com/Real-Fruit-Snacks)

> **Authorization required.** Everything here assumes you have explicit written
> permission to test the systems you're using these techniques against.

---

## Reading the Site

The published site lives at:

**https://real-fruit-snacks.github.io/MyNotes/**

Navigate via the left sidebar, search via the top bar, follow tag links between
related pages. Code blocks have a copy button. Light/dark are baked in.

---

## Running Locally

```bash
git clone https://github.com/Real-Fruit-Snacks/MyNotes.git
cd MyNotes

# install once
pip install mkdocs-material mkdocs-glightbox

# live-reloading dev server on http://127.0.0.1:8000
mkdocs serve

# one-shot build into ./site/
mkdocs build
```

---

## Adding a Note

1. Drop a Markdown file in `docs/` (or a subfolder). The filename becomes the
   slug; the first `# Heading` becomes the page title.
2. Save — `mkdocs serve` hot-reloads. Confirm formatting, code blocks, and any
   admonitions render the way you want.
3. Commit and push to `main`. The `Deploy MkDocs` workflow (in
   `.github/workflows/deploy.yml`) rebuilds the site and pushes to the
   `gh-pages` branch automatically.

### Style Conventions

- **One topic per page.** Long pages are fine; mixed-topic pages aren't.
- **Code blocks specify a language** (`bash`, `powershell`, `python`,
  `cypher`, etc.) so the Catppuccin syntax theme actually colors them.
- **Use admonitions** (`!!! tip`, `!!! warning`, `!!! danger`, `!!! info`) for
  callouts — don't bold-italicize a sentence and call it a warning.
- **Cite sources** when a technique came from somewhere specific (HackTricks,
  a CVE writeup, a conference talk). Future-me always wants the link.

---

## Stack

| Component | Purpose |
|-----------|---------|
| [MkDocs](https://www.mkdocs.org/) | Static site generator |
| [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/) | Theme, navigation, search |
| [Catppuccin Mocha](https://github.com/catppuccin/catppuccin) | Color palette (custom CSS in `docs/stylesheets/`) |
| [glightbox](https://github.com/blueswen/mkdocs-glightbox) | Image lightbox |
| [GitHub Pages](https://pages.github.com/) | Hosting via `gh-pages` branch |
| [GitHub Actions](https://docs.github.com/actions) | Auto-deploy on push to `main` |

---

## Repo Layout

```
MyNotes/
├── docs/
│   ├── index.md               # Landing page
│   ├── stylesheets/
│   │   └── catppuccin.css     # Mocha theme overrides
│   └── assets/
│       ├── logo-dark.svg
│       └── logo-light.svg
├── .github/workflows/
│   └── deploy.yml             # MkDocs → gh-pages on push to main
├── mkdocs.yml                 # Site config (theme, plugins, extensions)
└── README.md
```

---

## License

[MIT](LICENSE) — Copyright 2026 Real-Fruit-Snacks.

The notes themselves are personal field references; the site infrastructure
(theme, build, layout) is yours to fork and adapt for your own knowledge base.

---

<div align="center">

Part of the [Real-Fruit-Snacks](https://github.com/Real-Fruit-Snacks) water-themed offensive security toolkit.

</div>
