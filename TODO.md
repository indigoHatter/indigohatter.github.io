# Content
* Replace all the placeholders
    * Contact links not clickable - when made clickable, don't forget the _blank and noopener tags.
* Add resume, photos, etc
    * JSON Resume?
* Consider if rename of everything is necessary... indigohatter != porterwhatever. (Current name is cute, but it doesn't match.)

# Desktop Version
* spokes navbar no longer folds/unfolds when selecting the category's bar (not the text, but the whitespace between the text and the arrow). Arrow should fold/unfold, whitespace should ... either fold/unfold or navigate (undecided), and selecting the text should navigate.
* navbar seperator line needs rethinking.
    * on Left: shows separator below section. Good.
    * on Right, Dream: shows separator above section. Good, but, also needs to show below. (This "separates" the active section from the inactive sections.)
    * on Prefrontal: shows separator above section. Good.
* `index.html` eventually needs hover menus repositioned better. (Hobbies menu looks like it's laying on top of Right brain. Right menu could come closer? PFC menu looks offcenter due to placement of About and Contact.)


# Mobile Version
* darkmode index is too small/dark to read
* no need for hover menus to show on click - just click on a region.
* navbar on spokes is not organized, and still opens vertically despite listing horizontally.
    * Perhaps:
        > [o] porterwhatever.io  .................   🌗 light/dark  
        > **>** Left 🧠   < Right 🧠   < Dreams 💭   < PFC ✉️  
        > \* Resume  \* Academics  \* Awards  ...etc
        ----

# Structural
* "CSS reset" redundancy between `splash.css` and `spoke.css`. Currently accepted as "not worth fixing", but I'm open to fixing it if it's easy.
* Is there a way to "template" the sidebar across each spoke, to avoid the current state of being duplicated? Need to learn how.
* Update all font sizing from px to rem.
* There's still likely other places with manually-set variables that perhaps should be set in tokens.
* Some sections have multiple fonts (Left) while others have only one (Right). Determine if ideal. If so, perhaps create "all" tokens for consistency, then set each "redundant" token with a redundant value, to declare/preserve the design intent. (For example: create and let --font-right-header = --font-right-body, etc)

# Minor
* Pretty URLs? Move all pages into folders (and rename pages to index.html) so that browsers go to /left instead of /left.html. (Note: if doing so, these may need canonical tags?)

# Known
* Informal comment at bottom of `index.html`, kept for humor.