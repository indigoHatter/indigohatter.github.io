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
| C1   | wip 60%  | 0   | Replace all placeholders (plus, reminder about links)               | spokes  |
| C2   | wip 60%  | 0   | Add resume, photos, etc. (consider JSON Resume?)                    | spokes  |
| C3   | open     |     | Evaluate rename: indigohatter vs porterwhatever                     | all     |
|      |          |     |                                                                     |         |
| L2   | open     | 17  | Creative Projects has no JSON to pull from?                         | RIGHT   |
| L3   | open     | 18  | Photos and Adventures have no JSON to pull from?                    | DREAM   |
|      |          |     |                                                                     |         |
| I1   | DONE     | 1   | Light/Dark mode toggle btn should use the opposite theme's colors   | all     |
| I2   | open     | 5   | Dark mode too dark. (see notes)                                     | multi   |
| I3   | open     | 4   | Resume details font uses subdued font color.                        | LEFT    |
| I4   | open     | 10  | Bump active-section threshold from 25% to 40% of viewport height    | spokes  |
| I5   | open     |     | adjust light/dark mode toggle btns to be less jarring colors        |         |
| I6   | open     |     | Splash's bgs are very similar to LEFT... make them space/cloudy!    | SPLASH  |
|      |          |     |                                                                     |         |
| S2   | wip 90%  | 14  | Audit manually-set variables vs tokens                              |         |
| S3   | open     | 15  | Pretty URLs (eg. `/left` instead of `/left.html`)                   | spokes  |
| S5   | deferred | 30  | Graduated highlights cap via LEFT_DATA.config.highlightsCaps        | LEFT    |
| S6   | open     | 19  | Nav consistency: index menu + sidebar gaps and label mismatches     |         |
| S7   | open     | 10  | Find way to unify menus (instead of updating index.html & spoke.js) | all     |
|      |          |     |                                                                     |         |
| D1   | open     | 6   | Reposition hover menus on index.html; add viewport-clipping logic   | SPLASH  |
|      |          |     |                                                                     |         |
| M1   | open     | 7   | Dark mode index too small/dark to read                              | SPLASH  |
| M2   | DONE     | 2   | Remove hover menus on tap — just navigate on click                  | SPLASH  |
| M3   | DONE     | 3   | Fix double-tap navbar — change to tap=navigate                      | spokes  |
| M4   | staged   |     | Mobile navbar row 3 "autoscrolls" active selection?                 | spokes  |
| M5   | open     | 9   | Mobile navbar occlusion causes incorrect active section highlight   | spokes  |
|      |          |     |                                                                     |         |
| O1   | open     | 8   | spoke-bio-note's "info" symbol looks bad when italic. Do <i>.       | RIGHT   |
| O2   | open     | 11  | move all page-specific info in <head> lower on each page            | all     |
| O3   | open     | 16  | Copy all profile mentions in various locations into left.json       |         |
| O4   | open     |     | Convert `/data/*.js` into `.json` files                             |         |
| O5   | planned  | 20  | Check `CLAUDE.md` for up-to-date-ness and conciseness               |         |
| O6   | planned  |     | Audit `tokens.css` for ways to increase references (see notes)      |         |
| O7   | planned  | 21  | Collect all commented "change this to change behavior" into a doc   |         |
|      |          |     |                                                                     |         |
| F1   | idea     | 999 | Spotify widget (maybe in "Currently" section)                       |         |
| F2   | idea     | 999 | Re-add brainstem/lobe to brain diagram for fitness/food             |         |
| F3   | open     | 12  | Set reading "currently" to link to GoodReads, or find widget        | PFC     |
| F4   | open     | 13  | Similar to F3 - link hobby items to relevant profiles               | DREAM   |
|      |          |     |                                                                     |         |
| Z1   | known    |     | Informal comment at bottom of `index.html`, kept for humor          | SPLASH  |
| Z2   | deferred | 50  | CSS reset redundancy between splash.css and spoke.css               |         |


---

## Notes

### (C) Content
* C1: Reminder: contact links (etc) need `_blank` + `noopener`. 
### (L) Layout
### (I) Interface
* I2: Observations:
    * Left bg too dark.
    * Dream text/bg not enough contrast.
    * PFC subtitle ("bio"?) text not enough contrast.
    * See also: M1.
* I3: Each resume entry has a subdued grey font underneath it. This is fine for the location and dates, but not for the summary/highlights themselves. (NOTE: This may also affect Right, but I have not yet checked.)
* I4: This is primarily targeted at mobile, but will affect both mobile and desktop.
### (S) Structure
* S3: Also: rename root `index.html` to `/splash/index.html`, then have root index point to `/splash`?
* S5: When implemented, cap resolution becomes item.highlightsCap (A) → LEFT_DATA.config.highlightsCaps[i] (B) → HIGHLIGHTS_CAP (C).
    * A overrides B overrides C. A is per-item default, B is per-page default, and C is global default. (A,C are already implemented.)
    * Requires renderInto to forward entry index to factory functions (items.forEach((item, i) => makeFn(item, i))).
    * S6: PFC index hover menu missing Bio, Why a brain?, Currently (spoke.js has them; index only shows About + Contact). Label mismatches: left sidebar/index say "Awards" but h2 says "Awards & Honors"; PFC sidebar says "Bio" but h2 says "The short version". `contact-form` section in pfc.html has no nav entry (likely intentional placeholder).
### (D) Desktop
* D1: Hover menus:
    * Issue: Hobbies menu looks like it's laying on top of Right brain. Right menu could come closer? PFC menu looks offcenter due to placement of About and Contact
    * Observed: ~990px is roughly where menus get clipped.
    * Idea: Two options. (1) hard breakpoint that triggers the mobile-style smaller state, or (2) dynamic logic that only repositions a menu if it would be clipped by the current viewport (so not every menu moves just because one doesn't fit). PFC menu's About/Contact links also look off-center due to their placement — could be improved independently.
### (M) Mobile
* DONE ~~M2: On index.html, mobile taps should just navigate directly to the zone, not open the hover menu first.~~
* DONE ~~M3: Change behavior to tap=navigate.~~
* M4: Code present and commented out in `spoke.js`, near `line 375`.
* M5: Offset active-section threshold by mobile navbar height so occluded content behind navbar doesn't register as on-screen.
### (O) Other
* O3: Copying, not moving. This is to turn `left.json` into an (overly) complete resume.
* O4: There's lots of comments in the code which will need to be extracted... perhaps into an `.md` file?
* O6: Can tokens (and brain) be merged? Can things be set more referentially?
    * A thought driving this: light/dark mode toggles are set to each other's bg, but if one is changed, the other may be out of date. This currently seems necessary, however, because the bgs are set within theme styles, which are inaccessible to the opposite theme (meaning, right.light can't read right.dark.bg... therefore, right.light.opp.bg must exist and be set manually to whatever value right.light.bg is set to, and both must be updated simultaneously). Is there a way to improve this?
* O7: Copying, not moving. This is to build some `TODO-options.md` or similar that has all the possible "change this to change that" behaviors logged. (Next step is probably to make final decisions and axe a few of these.)


### (F) Future
* F2: Or, add occipital/temporal lobe. For now, just place in dream cloud.
* F4: What other "collection" websites can I link?
    * BGG for board games.
    * Is there a LEGO profile?
    * Should I link to my Steam/etc under video games?
    * UDisc profile under Disc Golf?
### (Z) Known