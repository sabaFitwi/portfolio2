# Guidance for AI coding agents working on portfolio2

Purpose: help an AI quickly be productive in this static frontend portfolio.

Quick orientation

- This is a static, client-side portfolio site (HTML/CSS/JS). Entry point: `index.html`.
- Bundled scripts are under `scripts/js/` (used by `index.html`). Source copies also exist at `js/`.
- Data-driven UI: project cards and badges are loaded from JSON files in `json/` (notably `cardsData.json`, `tools.json`, `badges.json`). Updating these JSON files changes rendered content.
- Styles live in `styles/css/` (linked in `index.html`). There are duplicate CSS copies in `css/` — prefer `styles/css/` as the canonical path referenced by `index.html`.

Important files / patterns (examples)

- `index.html` — top-level structure and script ordering. Scripts are loaded from `scripts/js/*.js` (main.js, badges.js, card.js, dark-mode.js, tools.js, script.js).
- `scripts/js/card.js` — reads `json/cardsData.json` and renders `.portfolio-grid` items. Example: look for `fetch('json/cardsData.json')` and the `projects` array.
- `scripts/js/tools.js` — loads `json/tools.json` and appends images to `.tools` container. Example: create elements with `img.src = badge.src`.
- `scripts/js/dark-mode.js` — toggles `dark-mode` class on `body` and persists theme in `localStorage` under key `theme`.
- `scripts/js/main.js` — small scroll-smooth and header-size logic.
- `scripts/js/script.js` — UI utilities (preloader, scroll animations, navbar toggles, contact form validation). It wires many DOM IDs/classes; changing selectors may break behavior.

Project conventions and gotchas

- Two parallel folders for scripts/styles: `js/` and `scripts/js/`, `css/` and `styles/css/`. `index.html` references `styles/css/...` and `scripts/js/...` — prefer editing files under `scripts/js/` and `styles/css/` so edits are visible in the running page.
- Data files in `json/` are fetched with relative paths from the browser. When testing locally, use a static server (e.g., `npx http-server` or VS Code Live Server). Opening `index.html` directly via `file://` will cause fetch failures.
- The codebase uses plain ES5/ES6 browser JS — no build step, bundler, or package.json present. Keep changes compatible with modern browsers.
- Minimal defensive checks: many fetches assume well-formed JSON and that target DOM nodes exist. When editing, either update HTML or add null-checks.

Edit rules for AI

- When adding or changing scripts, update the matching file under `scripts/js/`. If you modify a file in `js/`, mirror changes to `scripts/js/` only if `index.html` refers to the other location.
- Preserve existing DOM selectors and IDs in index.html unless you update all script references. Key selectors: .portfolio-grid, .tools, #darkModeToggle, .preloader, #contactForm.
- When updating JSON structure (e.g., `cardsData.json`), update `scripts/js/card.js` rendering logic to match keys. Example: `projects.forEach(project => { ... project.title ... project.image ... })`.
- For accessibility and content edits prefer editing `index.html` and `json/*.json` rather than complex DOM injections.

## Guidance for AI coding agents working on portfolio2

Purpose: help an AI quickly be productive in this static frontend portfolio.

Quick orientation

- This is a static, client-side portfolio site (HTML/CSS/JS). Entry point: `index.html`.
- Bundled scripts are under `scripts/js/` (used by `index.html`). Source copies also exist at `js/`.
- Data-driven UI: project cards and badges are loaded from JSON files in `json/` (notably `cardsData.json`, `tools.json`, `badges.json`). Updating these JSON files changes rendered content.
- Styles live in `styles/css/` (linked in `index.html`). There are duplicate CSS copies in `css/` — prefer `styles/css/` as the canonical path referenced by `index.html`.

Important files / patterns (examples)

- `index.html` — top-level structure and script ordering. Scripts are loaded from `scripts/js/*.js` (main.js, badges.js, card.js, dark-mode.js, tools.js, script.js).
- `scripts/js/card.js` — reads `json/cardsData.json` and renders items into a container with class `portfolio-grid`. Look for a fetch to `json/cardsData.json` and usage of a `projects` array.
- `scripts/js/tools.js` — loads `json/tools.json` and appends images into an element with class `tools` using `img.src = badge.src`.
- `scripts/js/dark-mode.js` — toggles a `dark-mode` class on `body` and persists theme under `localStorage.theme`.
- `scripts/js/main.js` — small navigation helpers and smooth scrolling.
- `scripts/js/script.js` — assorted UI utilities (preloader hiding, scroll animations, navbar toggles, contact form validation). It assumes specific DOM ids/classes; changing them may break behavior.

Project conventions and gotchas

- Two parallel folders for scripts/styles: `js/` and `scripts/js/`, `css/` and `styles/css/`. `index.html` references `styles/css/...` and `scripts/js/...` — prefer editing files under `scripts/js/` and `styles/css/` so edits are visible in the running page.
- Data files in `json/` are fetched with relative paths from the browser. When testing locally, run a static server (e.g., `npx http-server` or VS Code Live Server). Opening `index.html` via `file://` will cause fetch failures.
- The codebase uses plain ES5/ES6 browser JS — no build step or package manager. Keep code compatible with modern browsers and avoid Node-only APIs in client scripts.
- Minimal defensive checks: many fetches assume well-formed JSON and that target DOM nodes exist. When editing, either update `index.html` to add expected elements or add guard checks (e.g., `if (node) { ... }`).

Edit rules for AI

- Edit the files referenced by `index.html` (prefer `scripts/js/*` and `styles/css/*`). If you touch the `js/` or `css/` copies, mirror changes to `scripts/js/`/`styles/css/` only when `index.html` points to those locations.
- Preserve selectors used at runtime: portfolio grid (`.portfolio-grid`), tools container (`.tools`), the preloader element (`.preloader`), and the ids for page controls (commonly named like `darkModeToggle` and `contactForm`).
- When changing JSON keys (for example in `json/cardsData.json`), update the consuming renderer in `scripts/js/card.js` to map the new keys.
- Prefer simple edits to `index.html` or `json/*.json` for content/accessibility changes rather than adding complex DOM injection logic.

Testing / running locally

- Serve the project from its folder with a static server. Example commands:

```powershell
npx http-server -c-1 .
# or use VS Code Live Server
```

- Open the served URL (commonly `http://127.0.0.1:8080/`) and check the browser console for fetch errors. If JSON fetches fail, confirm the server is running and the path `json/*.json` is reachable.

What to look for in reviews

- When modifying DOM-related code, open the browser console for uncaught exceptions (missing elements or failed fetches).
- Verify theming: toggling the dark-mode control (element id typically `darkModeToggle`) should set `localStorage.theme` to `dark` or `light` and add/remove `dark-mode` on the `body` element.
- When editing JSON, ensure `scripts/js/card.js` still finds keys like `projects`, `title`, `description`, `image`, `github`, `live_demo` (these names are used in the current rendering logic).

If you need to make larger changes

- Add a one-line note at the top of this file describing the change.
- If you introduce a build step (bundler/package.json), also update README.md with developer commands and add simple scripts for linting/testing.

Contact / maintainers

- Repo README lists contact email: fitwisaba@gmail.com. Use that for clarifications about intended content or behavior.

Endnotes

- The site is intentionally simple: client-rendered, no backend. Focus on safe DOM edits, preserving `index.html` script order, and using `json/` as the canonical data source.
