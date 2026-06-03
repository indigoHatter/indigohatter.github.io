# [A] Content
1. Replace all the placeholders
    * Contact links not clickable - when made clickable, don't forget the _blank and noopener tags.
2. Add resume, photos, etc
    * JSON Resume?
3. Consider if rename of everything is necessary... indigohatter != porterwhatever. (Current name is cute, but it doesn't match.)

# [B] Desktop Version
1. `index.html` eventually needs hover menus repositioned better. (Hobbies menu looks like it's laying on top of Right brain. Right menu could come closer? PFC menu looks offcenter due to placement of About and Contact.)
    * Speaking of: as soon as the viewport is too small for the hover menus to be completely seen (~990px with current layout), it should trigger the smaller state. ...Or, we could add logic that moves the menus dynamically based on viewport size: only move the menu if it's clipped by the current viewport, meaning, not every menu gets moved just because one doesn't fit anymore.

# [C] Mobile Version
1. darkmode index is too small/dark to read
2. no need for index's hover menus to show on click - just click on a region.
3. Double-tapping navbar feels weird. We should either add the toplevel page as the first item (different color bg?) in the Row 3 so it can be clicked, or we should change the behavior to "tap = navigate" instead of what we previously discussed. Should be an easy flip--instructions are annotated in the code.

# [D] Structural
1. "CSS reset" redundancy between `splash.css` and `spoke.css`. Currently accepted as "not worth fixing", but I'm open to ideas it if it's easy.
2. Update all font sizing from px to rem (or whatever's best).
3. There's still likely other places with manually-set variables that perhaps should be set in tokens.
4. Some sections have multiple fonts (Left) while others have only one (Right). Determine if ideal. If so, perhaps create "all" tokens for consistency, then set each "redundant" token with a redundant value, to declare/preserve the design intent. (For example: create and let --font-right-header = --font-right-body, etc)

# [E] Minor
1. Pretty URLs? Move all pages into folders (and rename pages to index.html) so that browsers go to /left instead of /left.html. (Note: if doing so, these may need canonical tags?)

# [F] Future
1. If photos or other pfc.css components get added to other pages: extract just those components into their own CSS file (e.g., `photo-grid.css`) and load on the pages that need it. If a component becomes truly universal, promote it to `spoke.css` instead. Don't act until a second page actually needs the component.
2. Re-add the brainstem/cerebellum (maybe?) to the geometric brain. This would link to personal health, fitness, recipes, etc. -- Or add a occipital/temporal lobe? hrm. Anyway, not important yet. Could just be in the dream cloud until it gets substantially big enough to be on it's own.
3. Spotify widget? Link to whatever I'm currently listening to, or my most-played song of the week or something. (Maybe this goes on the "Currently..." section in About.)



# [Z] Known
1. Informal comment at bottom of `index.html`, kept for humor.

---------------------------------------
Ignore the below, it's just a copy-paste dump for thoughts regarding the above.
---------------------------------------
* B1 - I don't need to adjust this right now, but I'd like to have you tell me/clearly annotate in the codebase where the levers are for hover menu positioning. I'd also like a tip on how to make the PFC's menu look better: make the About & Contact links more centered.
* B1b - ideas for resolving this? discuss, then I may have you implement it.
* C2 - I'd assume this is an easy fix... on the index.html, mobile taps shouldn't open any menus. Just navigate.
* C3 - Yeah, I'm rethinking this. Let's just do tap=navigate.
* E1 - let's talk about this