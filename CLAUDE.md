# CLAUDE.md — porterwhatever.io

## Deployment

- **Live URL:** `https://indigohatter.github.io/` (GitHub Pages)
- The custom domain `porterwhatever.io` is planned but not yet active. Use the GitHub Pages URL as the base for any absolute URLs (canonical tags, OG meta, sitemap entries) until the custom domain is confirmed.

## Identity / Brand

- **Site identity:** `porterwhatever` / `porterwhatever.io`
- **GitHub account:** `indigohatter`
- These are the same. The split is intentional but unresolved — see TODO.md for the open rename question. Do not "fix" one to match the other without explicit instruction.

## Tech Stack

Vanilla HTML, CSS, JavaScript. No build system, no package manager, no bundler, no SSG.

- No `npm install`, no compile step, no dist directory.
- Changes take effect immediately on the static files.
- All pages are served directly; `about.html` and `contact.html` are meta-refresh redirect stubs pointing to `pfc.html`.

## Architecture

The site uses a **brain metaphor** with four zones:

| Zone | Page | Body class | Aesthetic |
|------|------|------------|-----------|
| Left Brain | `left.html` | `zone-left` | Sepia / typewriter |
| Right Brain | `right.html` | `zone-right` | Deep purple / theatrical |
| Dream Cloud | `dream.html` | `zone-dream` | Soft blue / handwritten |
| Prefrontal | `pfc.html` | `zone-pfc` | Neutral / clean sans |

`index.html` is the splash page with an interactive SVG brain diagram linking to the four zones.

Spoke pages (`left`, `right`, `dream`, `pfc`) share a sidebar + main layout. The sidebar HTML is **manually duplicated** across all four files — there is no templating system. Any structural sidebar change must be made in all four files.

## Design System

- **`css/tokens.css`** — single source of truth for all colors, fonts, spacing, radii, and transitions (both dark and light themes). Zone tokens (`--c-zone-*`, `--f-zone-*`) live here too, scoped by body class.
- **`css/spoke.css`** — shared layout for all spoke pages, including pfc-specific components (photo strip, concept split, currently section) at the bottom.
- **`css/splash.css`** — index.html styles.
- **`css/SIZING.md`** — reference doc explaining every deliberate non-token sizing decision.

Color rules should reference CSS custom properties only — no hardcoded hex values outside of `tokens.css`. Fallback values inside `var(--token)` calls are intentionally absent; all tokens are defined for both themes.

**Sizing rule:** Prefer `var(--sz-*)` tokens first, bare `rem` second, `px` only for structural elements that must be fixed: widths/heights, `0.5px` hairline borders, media query breakpoints, and decorative nudges (gaps, transforms, offsets) of ≤ 8px. Never use `px` for font sizes. See `css/SIZING.md` for the full rationale and a table of deliberate exceptions.

## Fonts

Seven families loaded via Google Fonts. Token → family mapping:

| Token | Family |
|-------|--------|
| `--font-left-heading` | Playfair Display |
| `--font-left-body` | Courier Prime |
| `--font-right-heading` | Outfit |
| `--font-right-body` | Outfit |
| `--font-cloud-heading` | Caveat |
| `--font-cloud-body` | Quicksand |
| `--font-pfc-heading` | Inter |
| `--font-pfc-body` | Inter |
| `--font-splash-title` | Inter |
| `--font-nav` | system-ui |

## Boilerplate That Must Stay in Sync

Every HTML page (including index.html) has two pieces of identical boilerplate in `<head>` that must remain consistent across all files:

**1. Flash-prevention inline script** (prevents wrong-theme flash before CSS loads):
```html
<script>(function(){var t=localStorage.getItem('pw-theme'),d=t==='theme-light'||t==='theme-dark'?t:window.matchMedia('(prefers-color-scheme: light)').matches?'theme-light':'theme-dark';document.documentElement.classList.remove('theme-light','theme-dark');document.documentElement.classList.add(d);})();</script>
```

**2. Google Fonts `<link>`** — must include all seven families above. If adding a page, copy the URL from an existing spoke page.

## Content Status

The site is **under construction**. Large portions of every page are placeholder text (`[He/She/They]`, `20XX`, `[location]`, etc.). Do not flag placeholder content as bugs. The download résumé button on `left.html` is intentionally disabled (`aria-disabled="true"`) pending a `resume.pdf`.

## Known Open Work

See `TODO.md` for the owner's own list. From a code-review pass, the remaining unfixed items are:

- **Contact links not clickable** (`pfc.html` ~line 279): email, LinkedIn, and GitHub are plain `<span>` text, not `<a>` elements.
- **Mobile splash menus**: hover menus on `index.html` are not accessible on touch — acknowledged in TODO.md.
- **Pretty URLs**: moving pages into subdirectory `index.html` files would need canonical tags — noted in TODO.md.
