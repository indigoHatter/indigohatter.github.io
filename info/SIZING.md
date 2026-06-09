# SIZING.md — Font size decisions for porterwhatever.io

**Rule:** Prefer `var(--sz-*)` tokens > bare `rem` > `px`.
`px` is only acceptable for structural/fixed values — see section C.

---

## A — The `--sz-*` token scale

Defined in `tokens.css :root`. All values are `rem` so they scale with the
user's browser font-size preference.

| Token | rem | ~px | Semantic role |
|-------|-----|-----|---------------|
| `--sz-2xs` | 0.625rem | 10px | Mobile tabs, tiny chrome |
| `--sz-xs` | 0.6875rem | 11px | Labels, caps, tags, hints |
| `--sz-sm` | 0.8125rem | 13px | Meta, dates, sidebar nav |
| `--sz-base` | 0.9375rem | 15px | Primary body prose |
| `--sz-md` | 1.0625rem | 17px | Hero subtitle |
| `--sz-h2` | clamp(1.25rem, 3vw, 1.75rem) | 20–28px | Section headings (fluid) |
| `--sz-h1` | clamp(1.75rem, 5vw, 3rem) | 28–48px | Page titles (fluid) |

---

## B — Deliberate bare `rem` values (no token)

These values appear in the codebase without a `--sz-*` token. Each is intentional.
A token would require a semantic name — these values serve too many unrelated roles
to share one meaningful name.

### `1rem` — the base anchor
`body { font-size: 1rem }` defers to the user's browser default (~16px). This is
NOT a font size choice — it sets the rem anchor. Used also for decorative glyphs
(concept arrow, toggle icon characters) where the intent is "roughly body height."

### `0.75rem` (~12px) — 6 occurrences
| Location | Role |
|----------|------|
| `spoke.css` — `.sidebar-theme-btn` | Small button text |
| `spoke.css` — `.spoke-bio-note` | Fine-print italic footnote |
| `spoke.css` — `.zone-left` optical compensation | Courier Prime nudge (+1 from `--sz-xs`) |
| `spoke.css` — `.sidebar-mobile-strip a` | Mobile nav strip links |
| `spoke.css` — `.concept-label` | Zone label caps inside concept split (PFC section) |
| `splash.css` — `.brain-menu a` | Hover menu nav links |

These roles are unrelated: no single semantic name fits all six.
The occurrence is low: not currently worth their own size token.

### `0.875rem` (~14px) — 4 occurrences
| Location | Role |
|----------|------|
| `spoke.css` — `.sidebar-home-glyph` | Navigation glyph sizing |
| `spoke.css` — `.spoke-entry-detail` | Sub-body detail paragraph |
| `spoke.css` — `.spoke-placeholder` | Empty-state italic text |
| `splash.css` — `.menu-cloud h2` | Caveat override (handwritten font appears larger) |

### `1.125rem` (~18px) — 1 occurrence
- `spoke.css` — `.concept-divider` — the ○ separator glyph (PFC section). One-off decorative character.

---

## C — When `px` is acceptable

Font sizes: **never**.

Everything else, `px` is acceptable for values that must be fixed regardless of user font preference:

| Category | Examples |
|----------|---------|
| Fixed structural dimensions | Sidebar width (240px), max-widths, photo grid row heights |
| Hairline borders | `0.5px solid` — sub-pixel, cannot be expressed in rem |
| Media query breakpoints | `700px`, `600px`, `350px` — viewport breakpoints don't relate to font size |
| Decorative nudges ≤ 8px | `4px` gaps, `3px` offsets, `translateY(4px)` — pixel-perfect micro-adjustments |
| Icon/button dimensions | Toggle button (40px × 40px), icon (16px × 16px) |
