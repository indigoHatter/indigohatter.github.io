# TODO

* ID should be unique, numerically increasing per category, sorted 1 to infinity, maintaning category order.
* Status may contain a tag (open, wip, staged, DONE, deferred, idea) and/or an estimated completion level (80%, 3/5, etc).
   * "DONE" will be left for later review before admin deletion. They may be temporarily kept to maintain "the next" unique serialized ID #.
* Rank (Rnk) is a numerical prioritization system, where 1 is highest. Blank assumes lower priority.
* Page is blank when todo's scope is ambiguous or unknown.
   * "multi" only acceptable when multiple specific pages exist — different from "all".

**Don't forget to check the Notes section at the bottom for relevant details!**

As of 2026-06-08, "splash" and "index.html" will be used interchangably... until pretty URLs are fully implemented.

| ID   | Status   | Rnk | Description                                                         | Page    |
|------|----------|-----|---------------------------------------------------------------------|---------|
| C1   | wip 60%  | 0   | Replace all placeholders, resume, photos (ps. reminder about links) | spokes  |
| C3   | open     |     | Evaluate rename: indigohatter vs porterwhatever                     | all     |
|      |          |     |                                                                     |         |
| L2   | open     | 17  | Creative Projects has no JSON to pull from?                         | RIGHT   |
| L3   | open     | 18  | Photos and Adventures have no JSON to pull from?                    | DREAM   |
|      |          |     |                                                                     |         |
| I4   | open     | 10  | Bump active-section threshold from 25% to 40% of viewport height    | spokes  |
| I6   | DONE     | . . | . . .                                                               | . . . . |
|      |          |     |                                                                     |         |
| S2   | wip 90%  | 14  | Audit manually-set variables vs tokens                              |         |
| S3   | open     | 15  | Pretty URLs (eg. `/left` instead of `/left.html`)                   | spokes  |
| S5   | deferred | 30  | Graduated highlights cap via LEFT_DATA.config.highlightsCaps        | LEFT    |
| S6   | open     | 19  | Nav consistency: index menu + sidebar gaps and label mismatches     |         |
| S7   | open     | 10  | Find way to unify menus (instead of updating index.html & spoke.js) | all     |
|      |          |     |                                                                     |         |
| D1   | DONE     | . . | . . .                                                               | . . . . |
|      |          |     |                                                                     |         |
| M5   | open     | 9   | Mobile navbar occlusion causes incorrect active section highlight   | spokes  |
|      |          |     |                                                                     |         |
| O2   | open     | 11  | move all page-specific info in <head> lower on each page            | all     |
| O3   | open     | 16  | Copy all profile mentions in various locations into left.json       |         |
| O4   | open     |     | Convert `/data/*.js` into `.json` files                             |         |
| O5   | planned  | 20  | Check `CLAUDE.md` for up-to-date-ness and conciseness               |         |
| O6   | planned  | 30  | Audit `tokens.css` for ways to increase references (see notes)      |         |
| O7   | planned  | 21  | Collect all commented "change this to change behavior" into a doc   |         |
|      |          |     |                                                                     |         |
| F1   | idea     | 12c | Spotify widget or Last.fm scrobble link or... (see notes)           |         |
| F2   | idea     | 999 | Re-add brainstem/lobe to brain diagram for fitness/food             |         |
| F3   | open     | 12a | Set reading "currently" to link to GoodReads, or find widget        | PFC     |
| F4   | open     | 12b | Similar to F3 - link hobby items to relevant profiles               | DREAM   |
|      |          |     |                                                                     |         |
| Z1   | known    | . . | Informal comment at bottom of `index.html`, kept for humor          | SPLASH  |
| Z2   | deferred | 50  | CSS reset redundancy between splash.css and spoke.css               |         |


---

## Notes

### (C) Content
* C1: Reminder: contact links (etc) need `_blank` + `noopener`. 
### (L) Layout
### (I) Interface
* I4: This is primarily targeted at mobile, but will affect both mobile and desktop.
### (S) Structure
* S3: Also: rename root `index.html` to `/splash/index.html`, then have root index point to `/splash`?
* S5: When implemented, cap resolution becomes item.highlightsCap (A) → LEFT_DATA.config.highlightsCaps[i] (B) → HIGHLIGHTS_CAP (C).
    * A overrides B overrides C. A is per-item default, B is per-page default, and C is global default. (A,C are already implemented.)
    * Requires renderInto to forward entry index to factory functions (items.forEach((item, i) => makeFn(item, i))).
    * S6: PFC index hover menu missing Bio, Why a brain?, Currently (spoke.js has them; index only shows About + Contact). Label mismatches: left sidebar/index say "Awards" but h2 says "Awards & Honors"; PFC sidebar says "Bio" but h2 says "The short version". `contact-form` section in pfc.html has no nav entry (likely intentional placeholder). HOWEVER!!! Some of this mismatch may be intentional (such as section header `<h2>` text vs spoke's nav text). Confirm each change before implementing.
### (D) Desktop
### (M) Mobile
* M5: Offset active-section threshold by mobile navbar height so occluded content behind navbar doesn't register as on-screen.
### (O) Other
* O3: Copying, not moving. This is to turn `left.json` into an (overly) complete resume.
* O4: There's lots of comments in the code which will need to be extracted... perhaps into an `.md` file?
* O6: Can tokens (and brain) be merged? Can things be set more referentially?
    * A thought driving this: light/dark mode toggles are set to each other's bg, but if one is changed, the other may be out of date. This currently seems necessary, however, because the bgs are set within theme styles, which are inaccessible to the opposite theme (meaning, right.light can't read right.dark.bg... therefore, right.light.opp.bg must exist and be set manually to whatever value right.light.bg is set to, and both must be updated simultaneously). Is there a way to improve this?
* O7: Copying, not moving. This is to build some `TODO-options.md` or similar that has all the possible "change this to change that" behaviors logged. (Next step is probably to make final decisions and axe a few of these.)


### (F) Future
* F1: Alternatively, find a way to link last.fm with Spotify, and have a last.fm scrobbler link...
    * Or, lowest-effort is to add a "Listening to..." section to PFC, then resolve it the same way as F4.
* F2: Or, add occipital/temporal lobe. For now, just place in dream cloud.
* F4: What other "collection" websites can I link?
    * BGG for board games.
    * Is there a LEGO profile?
    * Should I link to my Steam/etc under video games?
    * UDisc profile under Disc Golf?
### (Z) Known



### Freeform prose:
Left needs a more legible font for the body. The typewriter font can remain for headers and titles and sidebar nav, but should not be used in the body. (While we're at it... what other fonts is it using? Same for the other sections)

porterwhatever.io on spokes still lets sidebar scroll above it (as in, the drawn background for the text doesn't take up as much space as it seems like it should). The space above it is empty padding not claimed by the text? Anyway, it gives it a transparent effect, similar to a previous issue we had with the sidebar.