---
id: use-case-edit-ideas
type: use-case
title: Edit ideas
links:
  is-part-of:
    - vision.md
  depends-on:
    - use-case-initial-ui.md
  depended-on-by:
    - note-implementation-record-2.md
---

Derived from [input/02-edit-ideas.md](input/02-edit-ideas.md) ("Edit
ideas" on the master list). Adds editing to the idea list area and the
idea text area that the Initial UI use case establishes; that area is
called the idea edit area here.

## Goal

Put ideas in and change them: enter a new idea, edit an existing one,
and have the list reflect what I typed as I type it.

## Behavior

### Editing the selected idea (idea edit area)

- The idea edit area is a plain-text editor for the selected idea. The
  text shown is the idea's content; typing changes it directly. There
  is no separate edit mode.
- Copy, cut, and paste use the platform's standard text-editing
  facilities; the application adds no facilities of its own for them.
- When no idea is selected, the idea edit area is blank and not
  editable. The only way to start a new idea is the New command.
- The editor keeps the insertion point visible: when the text is larger
  than the area, the area scrolls so that the point where I am typing
  stays in view.

### New ideas

- A New command creates an idea with no content, selects it, and puts
  the insertion point in the idea edit area, ready for typing.
- Until it has content, the new idea appears in the idea list area as
  an "(empty)" placeholder, selected, at the top of the list — exactly
  as the Initial UI use case displays any idea with no visible content.

### The list follows the text (idea list area)

- The idea list area updates as the idea is edited, not on leaving it:
  the selected idea's entry always shows the current first line of its
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
  first line that has visible content, distinguished in the same way as
  the "(empty)" placeholder to signal that it is standing in for a
  missing title, and it sorts by that line. (This extends the Initial
  UI use case, which did not decide this case.)

### Ideas with no text are deleted on leaving them

- When I leave the selected idea — by selecting another idea or by
  issuing the New command — and its content is empty or only
  whitespace, the idea is deleted. This holds even if the idea has
  labels, once labels exist (a separate use case), and it holds for an
  idea that was already empty when I selected it, not only for one I
  emptied.
- Issuing New while the selected idea is empty therefore deletes it
  and creates a fresh empty idea: repeating New never piles up empty
  ideas.
- Selecting the already-selected idea again is not leaving it: nothing
  is deleted and nothing else changes.
- Deleting happens only on leaving. An idea that is momentarily empty
  while I am editing it — for example after selecting all and cutting,
  before pasting — is not deleted, and its undo history is intact.

### Undo and redo

- An Undo command reverts the most recent change to the selected
  idea's text; a Redo command re-applies the most recently undone one.
- The undo history is long: it covers every change made since the idea
  was selected, however many, back to the text as it was at selection.
  Undoing at that point does nothing further; redoing when nothing has
  been undone does nothing.
- Making a new change after undoing discards what could have been
  redone, as text editors normally do.
- Undo and redo apply only to the text of the selected idea. They never
  create, delete, or change any other idea.
- The undo history is cleared when another idea is selected, when the
  New command is issued, and when the application is closed. Selecting
  an idea always starts with an empty history, so nothing done to a
  previous idea can be undone from a later one.

## Interface guidance

The behavior above holds for any kind of user interface. This section
says how the interfaces currently specified are expected to expose it;
it is guidance for implementers, not behavior. A subsection is added
here whenever a new kind of interface is specified.

### Browser, touch or pointer (the Initial UI use case)

- New, Undo, and Redo are on-screen buttons, and also respond to the
  platform's standard keyboard shortcuts when a keyboard is present.
- Copy, cut, and paste are the platform's shortcuts and, on touch, its
  text-selection menu.
- When an on-screen keyboard covers part of the screen, keeping the
  insertion point visible means scrolling the idea edit area clear of
  the keyboard.
- "The application is closed" means the page's tab or window is
  closed.

## Test data (scaffolding)

- The test data set that the Initial UI use case defines is reused
  unchanged; the loaded ideas are edited like any other. No new test
  data is needed, because the existing set already exercises this use
  case's corner cases. Walking through them in order:
  - Select the whitespace-only "(empty)" idea, then select any other
    idea: the placeholder entry disappears (deleted on leaving).
  - Issue New, type "Aardvark": the entry moves from the "(empty)"
    position to the top of the alphabetical list as the first letter
    appears; add a second line and confirm the entry is unchanged.
  - Change the first line of "Zebra crossing near the school" to start
    with "Bus": it moves up the list, staying selected and visible;
    undo, and it moves back.
  - In the very large idea, make a long series of edits, then undo all
    the way back to the original text and redo forward; select another
    idea and confirm undo no longer applies to the large idea.
  - Select all of a short idea's text and cut it: the entry shows
    "(empty)" but the idea remains; paste it back. Then select all, cut,
    and select another idea: the idea is gone.
  - Put a blank line above the first line of a short idea: its entry
    shows the second line, distinguished as a placeholder, and stays in
    alphabetical order by that line.
