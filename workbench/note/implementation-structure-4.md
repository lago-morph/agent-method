---
id: implementation-structure-4
type: note
title: Implementation 4 — implementation structure
links:
  related-to:
    - note/implementation-record-4.md
    - note/decision-guides.md
---

Decisions of implementation 4, made while building it. The
implementation record
([note/implementation-record-4.md](implementation-record-4.md))
keeps one line per area and links here; this note holds the detail. No
guide exists yet for this area (code conventions and data model are
foreseen in [note/decision-guides.md](decision-guides.md)); this note
is the fourth instance from which one will be derived.

## Repeated unchanged from implementation 3

Each of these is implementation 3's decision
([note/implementation-structure-3.md](implementation-structure-3.md)),
taken again for the same reason:

- **Model:** an idea is `{ id, content }`. The title is derived from
  the content on every render; it is not stored.
- **Identity:** ids are integers from a counter starting at 1, never
  reused within a session. Selection is held as the selected id.
- **Blank ideas, leading-whitespace stripping, `listUpdate`, the active
  idea being the selected idea, `beforeinput`/`input` change
  classification, the undo history and its run bookkeeping** — the
  whole editing and undo model, unchanged: this revision touches
  neither the Edit ideas use case's rules nor the algorithm that
  implements them.
- **Rendering:** the whole list is rebuilt from the model on every
  change; one click handler on the list, delegated to rows.
- **The list's scroll position is preserved across a re-render**, and
  the selected row is then scrolled into view with the "nearest"
  alignment.
- **Undo and redo are handled by the application, not by the text
  control;** the platform's shortcuts are intercepted and their default
  prevented; the control's own history never runs.
- **Code shape:** plain HTML, CSS, and JavaScript in one file, in an
  immediately-invoked strict-mode function; no framework, no build, no
  external references of any kind.
- **Accessibility:** panes carry `aria-label`s; the message area and its
  three buttons carry them too.

## New in implementation 4

### Ordering compares an idea's entire content

`sortedIdeas()`'s comparator now compares `a.content` against
`b.content` (case-insensitively, locale-aware), not `titleOf(a)` against
`titleOf(b)`. Blank-first and the stable-sort tie-break by creation
order are otherwise unchanged. This is the Initial UI use case's own
sentence ("Ordering compares an idea's entire content, not only the
first line"), taken literally.

**A consequence for anything that locates a specific idea by its
visible title once duplicates exist:** two ideas that once shared a
sort position because they shared a title no longer necessarily do, if
their later lines differ — and an idea that is *edited* now can move
relative to still-identical siblings of the same title. This surfaced
while writing the checks (see
[note/automated-checks-4.md](automated-checks-4.md), "Decisions made
while writing the checks") and is recorded here because it is a
consequence of this use case's own change, not a decision made only for
the checks: an idea's on-screen position among identically-titled
siblings is no longer stable once any one of them is edited.

### The message list opens with no rows at all

`renderMessages()` no longer renders a "No messages" placeholder row
when the message list is empty; it renders nothing. The use case's own
words ("the list opens empty") are read literally: an empty list, not a
list with one row that says so. Implementation 3's `.none` row class,
and the CSS rule for it, are removed; nothing takes their place.

### Splitting a word with display-only hyphens

The Initial UI use case's new right-pane rule — a word wider than the
pane is split across lines, with a hyphen shown at each split, "no
hyphenation rules", and the split touching only what is shown, never
the idea's content or what gets copied — needs a way to insert a
character into what is *seen* in the right pane without that character
ever being part of the textarea's value (which is the idea's content,
verbatim) or reachable by the platform's copy and cut facilities (which
this implementation must add no code for: see
[note/automated-checks-4.md](automated-checks-4.md)'s `noClipboardCode`
inspection check, inherited unchanged from implementation 1).

A single `<textarea>` cannot do this: whatever it shows *is* its value.
The right pane is therefore two elements occupying the same box:

- **`#text`**, a `<textarea>`, is the sole interactive surface. Nothing
  about it changes from implementation 3's edit and undo model: its
  `.value` is always exactly the idea's content, `beforeinput`/`input`
  classify changes exactly as before, and it still holds the caret and
  the native selection. What changes is only its paint: its text colour
  and background are transparent (`caret-color` is set explicitly, so
  the caret itself still shows), and it wraps with
  `overflow-wrap: anywhere` so it is never wider than the pane and never
  scrolls sideways.
- **`#text-display`**, a plain `<div>`, is never interactive
  (`pointer-events: none`) and never selectable (`user-select: none`),
  so it can never be the target of a tap, a selection, or a copy — the
  one thing the use case requires of the split. It is positioned
  exactly under `#text` (same padding, font, and line height) and shows
  the same content, transformed for display only: a U+00AD soft hyphen
  is inserted between every character of a word (a maximal run of
  non-whitespace) whose measured width — via a hidden `<canvas>` context
  using the pane's own font — exceeds the pane's content width. A soft
  hyphen has no width and is invisible everywhere except at the one
  point, if any, where the browser's own line-breaking actually has to
  use it to keep that word inside the pane, where it renders as a plain
  "-" — which is what makes a word that shrinks back to fit "shown
  whole again" with no further code: once it measures narrow enough, no
  soft hyphen in it is ever the point of a break, so none is ever drawn.
  Ordinary words, never measured as overlong, get no soft hyphens at
  all and are never split.
- The two layers are kept in step only for scrolling: `#text-display`'s
  `scrollTop` is set to `#text`'s on every native `scroll` event and
  after every render, since it is `#text` the platform scrolls to keep
  the caret in view, per implementation 3's decision (unchanged) that
  the edit control itself is the scroller.
- `updateDisplay(content)` runs at the end of every `render()` call,
  unconditionally — unlike `#text`'s own value, which is only written
  when it differs (to preserve the caret while typing), the display
  layer is rebuilt every time, because it must track every keystroke.
  It also reruns on a `resize` of the window, since the pane's width —
  and so which words measure as overlong — can change.

### Why a soft hyphen, not a computed break point

An earlier design considered computing each word's break points in
JavaScript (via the same canvas measurement) and inserting explicit
`<br>` tags plus a hyphen character at each one, so the display layer's
wrapping would never depend on the browser's own line-breaking. It was
rejected: forcing every line break by hand would still leave the
*interactive* layer's own natural wrapping (needed so its caret and
native scrolling behave like an ordinary textarea) to find its own,
independently-computed break points, and the two would only coincide by
accident. A U+00AD soft hyphen lets the *same* line-breaking algorithm
decide where to break in both layers — inserted only in the display
layer's text, never in the interactive layer's value — which is what
keeps the two visually aligned for ordinary text. The one case they can
still disagree in is recorded below.

## Decisions forced by the use case being silent or in tension

- **The two layers can wrap an overlong word at a slightly different
  character.** The display layer's line-breaking must fit a line that
  includes the hyphen glyph on every split; the interactive layer's own
  wrapping (via `overflow-wrap: anywhere`, with no hyphen ever drawn)
  does not reserve that width. For an ordinary word this never matters
  — soft hyphens are only used where a break is otherwise unavoidable,
  and short of that threshold both layers keep the whole word on one
  line. Only inside a single word that is *already* being split across
  several lines can the two layers' chosen break points drift by a
  character or so from one split onward, because the display layer's
  hyphen "costs" a little width the interactive layer's plainer
  wrapping does not need to spend. Since the interactive layer's text is
  never seen — only its (still exactly positioned) caret and selection
  band are — the visible effect, if any, is that the blinking caret can
  sit very slightly ahead of or behind the character it appears to be
  next to, while typing inside an unbroken run of dozens of characters
  with no spaces. The use case does not say how a display-only split
  should interact with caret placement inside the split word, so this
  is a genuine gap rather than an oversight; it is left as a known
  limitation of this implementation (see the record's "Known gaps") and
  is a real-device checkpoint item, per
  [note/test-method-4.md](test-method-4.md).
- **Hyphenation applies uniformly to every word, not only ones already
  known to be long.** Rather than pre-identifying "long" words, every
  non-whitespace run is measured and only split if it individually
  exceeds the pane's width; this is simpler than special-casing, has no
  visible cost for ordinary words (a soft hyphen with no break at it is
  invisible and taking zero width), and is what keeps the display and
  interactive layers wrapping identically for every word that is not
  itself wider than the pane.
- **A 1 px measurement margin.** `updateDisplay` treats a word as
  needing a split only once it measures more than the pane's content
  width minus 1 px, because the canvas measurement and the browser's own
  text layout are not guaranteed to agree to the sub-pixel; the margin
  only affects the borderline case of a word exactly at the pane's
  width, never an ordinary one.
- **Where inside a word a split may fall** — the use case says a word
  is split "across lines" and says nothing about characters. As built
  by the run, the word was split between UTF-16 code units, which put a
  soft hyphen inside an emoji's surrogate pair and rendered it as two
  broken glyphs (found in review, in Chromium). Decided in review: a
  split falls only between user-perceived characters — grapheme
  clusters from `Intl.Segmenter` where the engine has it (Safari has
  since 14.1), code points otherwise — so an emoji or a decomposed
  accent is never divided. Checked by the row added in review to
  [note/automated-checks-4.md](automated-checks-4.md).
- **A word the canvas under-measures** — the display layer wraps only
  at the soft hyphens the measurement inserted, and clips horizontally
  otherwise; if the canvas measured a word narrower than the engine
  renders it, the word would be cut off at the right edge while the
  interactive layer beneath still wraps it. Not observed in Chromium;
  a checkpoint item in [note/test-method-4.md](test-method-4.md).

## Open

- **Delivery to the device.** Unchanged from implementation 3: attaching
  the file in the working session is the route used. A durable route is
  still undecided, and is the subject of the delivery guide that
  [note/decision-guides.md](decision-guides.md) foresees.
