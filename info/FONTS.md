# FONTS.md — Font system reference

Six families loaded via Google Fonts, plus `system-ui`. If adding a page, copy the Google Fonts `<link>` URL from an existing spoke page.

## Token → family mapping

| Token | Family | Source |
|-------|--------|--------|
| `--font-left-heading` | Playfair Display | Google Fonts |
| `--font-left-body` | Courier Prime | Google Fonts |
| `--font-left-splash` | Courier Prime | alias of `--font-left-body` |
| `--font-right-heading` | Outfit | Google Fonts |
| `--font-right-body` | Outfit | Google Fonts |
| `--font-cloud-heading` | Caveat | Google Fonts |
| `--font-cloud-body` | Quicksand | Google Fonts |
| `--font-pfc-heading` | Inter | Google Fonts |
| `--font-pfc-body` | Inter | Google Fonts |
| `--font-splash-title` | Inter | Google Fonts |
| `--font-nav` | system-ui | System font |

## Menu heading/body tokens

Each zone also has `--font-{zone}-menu-heading` and `--font-{zone}-menu-body` tokens used by the splash page hover menus. These map to the same families as the zone's heading/body tokens.
