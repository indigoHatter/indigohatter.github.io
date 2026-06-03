# TODO

| ID | Category   | Description                                                         | Status   |
|----|------------|---------------------------------------------------------------------|----------|
| C1 | Content    | Replace all placeholders                                            | open     |
| C2 | Content    | Add resume, photos, etc. (consider JSON Resume?)                    | open     |
| C3 | Content    | Evaluate rename: indigohatter vs porterwhatever                     | open     |
| D1 | Desktop    | Reposition hover menus on index.html; add viewport-clipping logic   | open     |
| M1 | Mobile     | Dark mode index too small/dark to read                              | open     |
| M2 | Mobile     | Remove hover menus on tap — just navigate on click                  | open     |
| M3 | Mobile     | Fix double-tap navbar — change to tap=navigate                      | open     |
| S1 | Structural | CSS reset redundancy between splash.css and spoke.css               | deferred |
| S2 | Structural | Audit manually-set variables vs tokens                              | 90%      |
| S3 | Structural | Pretty URLs (eg. `/left` instead of `/left.html`)                   | open     |
| F1 | Future     | Spotify widget (maybe in "Currently" section)                       | someday  |
| F2 | Future     | Re-add brainstem/lobe to brain diagram for fitness/food             | someday  |
| Z1 | Known      | Informal comment at bottom of `index.html`, kept for humor          | known    |

---

## Notes

* C1: Reminder: contact links (etc) need `_blank` + `noopener`. 
* D1: Hover menus:
    * Issue: Hobbies menu looks like it's laying on top of Right brain. Right menu could come closer? PFC menu looks offcenter due to placement of About and Contact
    * Observed: ~990px is roughly where menus get clipped.
    * Idea: Two options. (1) hard breakpoint that triggers the mobile-style smaller state, or (2) dynamic logic that only repositions a menu if it would be clipped by the current viewport (so not every menu moves just because one doesn't fit). PFC menu's About/Contact links also look off-center due to their placement — could be improved independently.
* M2: On index.html, mobile taps should just navigate directly to the zone, not open the hover menu first.
* M3: Change behavior to tap=navigate. Instructions are annotated in the code.
* F2: Or, add occipital/temporal lobe. For now, just place in dream cloud.
