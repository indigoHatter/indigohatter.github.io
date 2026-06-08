# TODO

* ID should be unique, numerically increasing per category.
* Status may contain either a tag (open, wip, done, deferred, idea) or an estimated completion level (80%, 3/5, etc).
   * "Done" will be left for later review before admin deletion. They may be temporarily kept to maintain "the next" unique serialized ID #.
* Rank (Rnk) is a numerical prioritization system, where 1 is highest. Blank assumes lower priority.
* Page is blank when todo affects no pages or all pages.

| ID   | Status   | Rnk | Description                                                         | Page   |
|------|----------|-----|---------------------------------------------------------------------|--------|
| C1   | open     | 1   | Replace all placeholders                                            | Spokes |
| C2   | wip      | 1   | Add resume, photos, etc. (consider JSON Resume?)                    | Spokes |
| C3   | open     |     | Evaluate rename: indigohatter vs porterwhatever                     |        |
|      |          |     |                                                                     |        |
| L1   | done     |     | . . .                                                               |        |
| I1   | open     | 3   | Light/Dark mode toggle btn should use the opposite theme's colors   |        |
| I2   | open     | 4   | Dark mode too dark. (see notes)                                     | Multi  |
| I3   | open     | 4   | Resume details font uses subdued font color.                        | Left   |
| S2   | 90%      |     | Audit manually-set variables vs tokens                              |        |
| S3   | open     |     | Pretty URLs (eg. `/left` instead of `/left.html`)                   |        |
| S6   | open     |     | Nav consistency: index menu + sidebar gaps and label mismatches     | Multi  |
| S5   | deferred | 10  | Graduated highlights cap via LEFT_DATA.config.highlightsCaps        | Left   |
| D1   | open     | 7   | Reposition hover menus on index.html; add viewport-clipping logic   | Index  |
| M1   | open     | 6   | Dark mode index too small/dark to read                              | Index  |
| M2   | open     | 5   | Remove hover menus on tap — just navigate on click                  | Index  |
| M3   | open     | 5   | Fix double-tap navbar — change to tap=navigate                      | Spokes |
|      |          |     |                                                                     |        |
| F1   | idea     |     | Spotify widget (maybe in "Currently" section)                       |        |
| F2   | idea     |     | Re-add brainstem/lobe to brain diagram for fitness/food             |        |
| Z1   | known    |     | Informal comment at bottom of `index.html`, kept for humor          | Index  |
| Z2   | deferred | 50  | CSS reset redundancy between splash.css and spoke.css               |        |


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
### (S) Structure
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
* M2: On index.html, mobile taps should just navigate directly to the zone, not open the hover menu first.
* M3: Change behavior to tap=navigate. Instructions are annotated in the code.


### (F) Future
* F2: Or, add occipital/temporal lobe. For now, just place in dream cloud.
### (Z) Known