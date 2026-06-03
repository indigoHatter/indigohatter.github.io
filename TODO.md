# Content
* Replace all the placeholders
    * Contact links not clickable - when made clickable, don't forget the _blank and noopener tags.
* Add resume, photos, etc
    * JSON Resume?
* Consider if rename of everything is necessary... indigohatter != porterwhatever. (Current name is cute, but it doesn't match.)

# Desktop Version
* `index.html` eventually needs hover menus repositioned better. (Hobbies menu looks like it's laying on top of Right brain. Right menu could come closer? PFC menu looks offcenter due to placement of About and Contact.)
    * Speaking of: as soon as the viewport is too small for the hover menus to be completely seen (~990px with current layout), it should trigger the smaller state. ...Or, we could add logic that moves the menus dynamically based on viewport size: only move the menu if it's clipped by the current viewport, meaning, not every menu gets moved just because one doesn't fit anymore.

# Mobile Version
* darkmode index is too small/dark to read
* no need for hover menus to show on click - just click on a region.

# Structural
* "CSS reset" redundancy between `splash.css` and `spoke.css`. Currently accepted as "not worth fixing", but I'm open to fixing it if it's easy.
* Update all font sizing from px to rem.
* There's still likely other places with manually-set variables that perhaps should be set in tokens.
* Some sections have multiple fonts (Left) while others have only one (Right). Determine if ideal. If so, perhaps create "all" tokens for consistency, then set each "redundant" token with a redundant value, to declare/preserve the design intent. (For example: create and let --font-right-header = --font-right-body, etc)

# Minor
* Pretty URLs? Move all pages into folders (and rename pages to index.html) so that browsers go to /left instead of /left.html. (Note: if doing so, these may need canonical tags?)

# Future Pages
* Re-add the brainstem/cerebellum (maybe?) to the geometric brain. This would link to personal health, fitness, recipes, etc. -- Or add a occipital/temporal lobe? hrm. Anyway, not important yet. Could just be in the dream cloud until it gets substantially big enough to be on it's own.

# Future Features
* Spotify widget? Link to whatever I'm currently listening to, or my most-played song of the week or something. (Maybe this goes on the "Currently..." section in About.)

# Known
* Informal comment at bottom of `index.html`, kept for humor.