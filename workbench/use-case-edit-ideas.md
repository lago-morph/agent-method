---
id: use-case-edit-ideas
type: use-case
title: Edit ideas
links:
  is-part-of:
    - vision.md
  depends-on:
    - use-case-initial-ui.md
---

Derived from [input/02-edit-ideas.md](input/02-edit-ideas.md) ("Edit
ideas" on the master list). Second use case in the v1 build order; it
adds editing to the three-pane screen of
[use-case-initial-ui.md](use-case-initial-ui.md), which it otherwise
leaves unchanged.

## Goal

Put ideas in and change them: type a new idea, edit an existing one,
and have the list reflect what I typed as I type it.

## Behavior

### Editing the selected idea (right pane)

- The right pane is a plain-text editor for the selected idea. The text
  shown is the idea's content; typing changes it directly. There is no
  separate edit mode and no save step within this use case.
- Copy, cut, and paste work through the standard system shortcuts and
  the platform's touch selection menu; the application adds no controls
  of its own for them.
- When no idea is selected, the right pane is blank and not editable.
  The only way to start a new idea is the New button.
- The editor keeps the insertion point visible: when the text is larger
  than the pane, or an on-screen keyboard covers part of the screen,
  the pane scrolls so the point where I am typing stays in view.

### New ideas

- A "New" button creates an idea with no content, selects it, and puts
  the insertion point in the right pane, ready for typing.
- Until it has content, the new idea appears in the list as an
  "(empty)" placeholder, selected, at the top of the list — exactly as
  the Initial UI use case displays any idea with no visible content.

### The list follows the text (middle pane)

- The list updates as the idea is edited, not on leaving it: the
  selected idea's entry always shows the current first line of its
  text, truncated as the Initial UI use case describes.
- When the first line changes, the idea moves to its new alphabetical
  position immediately. It stays selected, and the list scrolls if
  needed so that it remains visible.
- While an idea's content is empty or only whitespace, its entry shows
  the "(empty)" placeholder at the top of the list; as soon as it has
  visible content, it shows its first line and takes its alphabetical
  place.
- An idea whose first line is blank (empty or only whitespace) but
  whose later lines have content is not empty. Its entry shows the
  first line that has visible content, greyed like the "(empty)"
  placeholder to signal that it is standing in for a missing title, and
  it sorts by that line. (This extends the Initial UI use case, which
  did not decide this case.)

### Ideas with no text are deleted on leaving them

- When I leave the selected idea — by selecting another idea or by
  pressing New — and its content is empty or only whitespace, the idea
  is deleted. This holds even if the idea has labels, once labels exist
  (a later use case), and it holds for an idea that was already empty
  when I selected it, not only for one I emptied.
- Pressing New while the selected idea is empty therefore deletes it
  and creates a fresh empty idea: pressing New repeatedly never piles
  up empty ideas.
- Tapping the already-selected idea is not leaving it: nothing is
  deleted and nothing else changes.
- Deleting happens only on leaving. An idea that is momentarily empty
  while I am editing it — for example after selecting all and cutting,
  before pasting — is not deleted, and its undo history is intact.

### Undo and redo

- Undo reverts the most recent change to the selected idea's text;
  redo re-applies the most recently undone one. Each is available from
  its standard keyboard shortcut and from an on-screen button, so both
  work without a hardware keyboard.
- The undo history is long: it covers every change made since the idea
  was selected, however many, back to the text as it was at selection.
  Undoing at that point does nothing further; redoing when nothing has
  been undone does nothing.
- Making a new change after undoing discards what could have been
  redone, as text editors normally do.
- Undo and redo apply only to the text of the selected idea. They never
  create, delete, or change any other idea.
- The undo history is cleared when another idea is selected, when New
  is pressed, and when the tab or browser is closed. Selecting an idea
  always starts with an empty history, so nothing done to a previous
  idea can be undone from a later one.

### Persistence

- Nothing in this use case persists: ideas and edits live in memory
  until the browser tab is closed, and are then gone. Saving is the next
  use case in the build order.

## Test data (scaffolding)

- The "load test data" button and the set from the Initial UI use case
  stay as they are; the loaded ideas are edited like any other. No new
  test data is needed, because the existing set already exercises this
  use case's corner cases. Walking through them in order:
  - Select the whitespace-only "(empty)" idea, then select any other
    idea: the placeholder entry disappears (deleted on leaving).
  - Press New, type "Aardvark", and watch the entry move from the
    "(empty)" position to the top of the alphabetical list as the first
    letter appears; add a second line and confirm the entry is
    unchanged.
  - Change the first line of "Zebra crossing near the school" to start
    with "Bus" and watch it move up the list, staying selected and
    visible; undo, and watch it move back.
  - In the very large idea, make a long series of edits, then undo all
    the way back to the original text and redo forward; select another
    idea and confirm undo no longer applies to the large idea.
  - Select all of a short idea's text and cut it: the entry shows
    "(empty)" but the idea remains; paste it back. Then select all, cut,
    and select another idea: the idea is gone.
  - Put a blank line above the first line of a short idea: its entry
    shows the second line, greyed, and stays in alphabetical order by
    that line.
