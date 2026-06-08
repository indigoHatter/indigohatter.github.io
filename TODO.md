# TODO

* ID should, starting 20260506, retain unique values.
* Page is blank when todo affects no pages or all pages.
* Status may contain either a tag or an estimated completion level.
* Rank (Rnk) is a numerical prioritization system, where 1 is highest. Blank assumes lower priority.

| ID   | Category   | Page   | Description                                                         | Status   | Rnk |
|------|------------|--------|---------------------------------------------------------------------|----------|-----|
| C1   | Content    | Spokes | Replace all placeholders                                            | open     | 1   |
| C2   | Content    | Spokes | Add resume, photos, etc. (consider JSON Resume?)                    | wip      | 1   |
| C3   | Content    |        | Evaluate rename: indigohatter vs porterwhatever                     | open     |     |
|      |            |        |                                                                     |          |     |
| L1   | Layout     | Left   | Left is missing a "certifications" section.                         | done     | 2   |
| I1   | Interface  |        | Light/Dark mode toggle btn should use the opposite theme's colors   | open     | 3   |
| I2   | Interface  | Multi  | Dark mode too dark. (see notes)                                     | open     | 4   |
| S2   | Structural |        | Audit manually-set variables vs tokens                              | 90%      |     |
| S3   | Structural |        | Pretty URLs (eg. `/left` instead of `/left.html`)                   | open     |     |
| S4   | Structural |        | JSON Resume schema & data pull (highlights vs summary, etc)         | done     | 2   |
| D1   | Desktop    | Index  | Reposition hover menus on index.html; add viewport-clipping logic   | open     | 7   |
| M1   | Mobile     | Index  | Dark mode index too small/dark to read                              | open     | 6   |
| M2   | Mobile     | Index  | Remove hover menus on tap — just navigate on click                  | open     | 5   |
| M3   | Mobile     | Spokes | Fix double-tap navbar — change to tap=navigate                      | open     | 5   |
|      |            |        |                                                                     |          |     |
| F1   | Future     |        | Spotify widget (maybe in "Currently" section)                       | someday  |     |
| F2   | Future     |        | Re-add brainstem/lobe to brain diagram for fitness/food             | someday  |     |
| Z1   | Known      | Index  | Informal comment at bottom of `index.html`, kept for humor          | known    |     |
| Z2   | Structural |        | CSS reset redundancy between splash.css and spoke.css               | deferred |     |


---

## Notes

<!--C-->
* C1: Reminder: contact links (etc) need `_blank` + `noopener`. 
<!--L-->
<!--I-->
* I2: Left bg too dark.
      Dream text/bg not enough contrast.
      PFC subtitle ("bio"?) text not enough contrast.
      See also: M1.
<!--S-->
<!--D-->
* D1: Hover menus:
    * Issue: Hobbies menu looks like it's laying on top of Right brain. Right menu could come closer? PFC menu looks offcenter due to placement of About and Contact
    * Observed: ~990px is roughly where menus get clipped.
    * Idea: Two options. (1) hard breakpoint that triggers the mobile-style smaller state, or (2) dynamic logic that only repositions a menu if it would be clipped by the current viewport (so not every menu moves just because one doesn't fit). PFC menu's About/Contact links also look off-center due to their placement — could be improved independently.
<!--M-->
* M2: On index.html, mobile taps should just navigate directly to the zone, not open the hover menu first.
* M3: Change behavior to tap=navigate. Instructions are annotated in the code.


<!--F-->
* F2: Or, add occipital/temporal lobe. For now, just place in dream cloud.