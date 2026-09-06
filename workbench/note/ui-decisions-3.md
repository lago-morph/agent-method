---
id: ui-decisions-3
type: note
title: Implementation 3 — UI decisions
links:
  related-to:
    - note/implementation-record-3.md
    - note/ui-standards-definition.md
---

Decisions of implementation 3, made while building it. The
implementation record
([note/implementation-record-3.md](implementation-record-3.md))
keeps one line per area and links here; this note holds the detail.
Guide: [note/ui-standards-definition.md](ui-standards-definition.md).
Values, not adjectives. Implementation 3 is a touch web app, like
implementations 1 and 2, so the previous answers apply unless a reason
to differ is recorded.

## The guide's questions, answered

1. **Platform conventions** — the host platform (iPadOS Safari). System
   font stack (`-apple-system, system-ui, "Helvetica Neue", Helvetica,
   Arial, sans-serif`), 17 px base size. *Repeated unchanged from
   implementations 1 and 2.*
2. **Type size and line height** — 17 px base; line height 1.4 in the
   edit area. *Repeated unchanged.*
3. **Palette** — text `#1c1c1e`; muted text for placeholders, the
   "(empty)" row, message times and "No messages" `#8e8e93`; pane and
   message-list background white; chrome background `#f2f2f5` (header
   bar and message area); dividers `#c8c8cc`; row separators `#ececef`
   (idea rows and message-list rows); selected row background
   `#d9e7ff`; primary button `#0a66ff` with white text; secondary
   button white with `#1c1c1e` text and a `#c8c8cc` border. *Repeated
   unchanged; the message area's colours reuse the existing values, no
   new ones were introduced.*
4. **Dark mode** — no. *Repeated unchanged.*
5. **Minimum touch target** — 44 px for every row and button, including
   the message area's list and dismiss buttons, which are 44 × 44.
   *Repeated unchanged.*
6. **Layout proportions** — left : middle : right = 1 : 2 : 4 of the
   width, the same in landscape and portrait, 1 px dividers, the empty
   left pane drawn as a pane. *Repeated unchanged.* Added: the message
   area spans the full width below the three panes and is 44 px high
   (see "Decided beyond the guide's questions"); the header bar and the
   message area take their height from their content and the panes take
   the rest.
7. **Where controls live and what they are called** — one header bar
   holding the application name ("Idea Workbench", left) and four
   buttons on the right, in this order: "New", "Undo", "Redo", "Load
   test data". Sentence case. New is the primary (blue) button; the
   other three are secondary. *Repeated unchanged from implementation
   2.* Added, in the message area: a list button at the left end
   (glyph `☰`, accessible name "Message list") and a dismiss button at
   the right end (glyph `×`, accessible name "Dismiss message"); the
   message list panel carries one more `×` at its top right
   ("Close message list"). Glyphs are plain characters, because the
   implementation has no external references of any kind and so no icon
   font.
8. **Selection, placeholder, and pressed states** — selected row:
   tinted background `#d9e7ff`. Placeholder text: grey `#8e8e93`.
   Pressed button: dimmed to 0.7 opacity. *Repeated unchanged.* The
   greying of a row that stands in for a missing title, which
   implementation 2 added, is gone: with leading whitespace stripped at
   every update an idea's first line always has visible content unless
   the idea is blank, so the case cannot arise.
9. **Which containers scroll** — the left and middle panes scroll
   vertically; in the right pane the edit control itself is the
   scroller, so that the browser keeps the insertion point in view; the
   message list's entries scroll inside the panel. The page itself
   never scrolls. *Repeated unchanged, extended with the message list.*
10. **Platform needs** — safe-area insets respected, dynamic viewport
    height, tap highlight suppressed, list rows not text-selectable,
    the layout following the visual viewport when an on-screen keyboard
    shrinks it. *Repeated unchanged.*
11. **A command that currently cannot do anything** — enabled and
    inert. Undo and Redo are always enabled and do nothing when there is
    nothing to undo or redo, which is what the use case says happens.
    *Repeated unchanged from implementation 2.*
12. **Does invoking a command from a control move the insertion point
    into the edit area?** Only where the use case says so. New does
    (the use case puts the insertion point at the beginning of the new
    idea's text); selecting a row does not; Undo and Redo do, because
    applying a history entry restores its insertion point and that is
    only meaningful in a focused control. *Repeated unchanged from
    implementation 2, including the note that on touch this raises the
    on-screen keyboard and that whether it is wanted is a checkpoint
    item.*

## Decided beyond the guide's questions

Each was decided while building; the ones the guide has no question for
are flagged so the guide can grow the question.

- **The message area is 44 px high, holding one line of text.** The use
  case says the area is "one line high"; the UI standard says the
  minimum touch target is 44 px, and the area contains two buttons. A
  17 px line is about 24 px. The two rules are in tension, and the
  choice is 44 px: one line of text, vertically centred, flanked by two
  44 × 44 buttons. *No guide question covers a conflict between a use
  case's size wording and the touch-target standard; the guide should
  grow one.*
- **The dismiss `×` is shown only while there is a message; the list
  button is always shown.** The use case puts the `×` "at the right end
  of a message", so with no message there is nothing to dismiss, while
  the list button is described as a fixture of the area. An always-
  present but inert `×` was rejected: unlike Undo, pressing it could
  never do anything at all, so there is nothing for it to be inert
  about.
- **The message list opens as a panel directly above the message
  area**, full width, at most 60% of the viewport height, white, with a
  1 px divider top and bottom. Its close `×` sits in its own row at the
  top right; its entries fill the rest and scroll. The use case says
  the list "opens" and "scrolls when it is taller than the space it
  has" but not where it appears; above the button that opens it, over
  the panes, keeps it near its control and leaves the panes' layout
  untouched.
- **A message list entry is the time in muted grey with tabular
  numerals, then the message text**, and the text wraps rather than
  truncating: the use case says the full text of a truncated message is
  readable in the list, so the list is the one place that must not
  truncate. "No messages" is a single greyed row in the same shape.
- **Times are the local clock in `HH:MM:SS`, zero-padded**, taken when
  the message appears. The use case asks for hours:minutes:seconds and
  says nothing about a time zone or a 12-hour clock; the device's local
  24-hour clock is the least surprising and the easiest to compare.
- **Selecting an existing idea puts the insertion point at the start of
  its text.** The use cases fix the insertion point only for New ("at
  the beginning of the (empty) text"). The start is the same answer,
  and it means a freshly shown idea is scrolled to its top rather than
  to wherever a previous idea's caret happened to be.
- **The edit area is disabled, not merely read-only, when no idea is
  selected**, and is painted as a plain white pane rather than the
  platform's greyed disabled style. *Repeated unchanged from
  implementation 2.*
- **Keyboard shortcuts:** Undo is `Cmd`/`Ctrl` + Z, Redo is
  `Cmd`/`Ctrl` + `Shift` + Z and `Ctrl` + Y, New is `Cmd`/`Ctrl` + N,
  all intercepted before the browser's default. *Repeated unchanged.*
- **Text behaviors are left at the platform's defaults:** no
  `spellcheck`, `autocorrect`, or `autocapitalize` attributes are set.
  *Repeated unchanged.*

## Proposed for promotion to a standard

Questions 1–6, 8, and 10–12 have now been answered identically in
implementations 1, 2, and 3, all touch web apps; implementation 2
already proposed most of them. The proposal stands and grows: only
question 7 (which controls exist and what they are called) and question
9's list of scrollers vary per implementation, because both follow from
the use cases included. The message area's values above are candidates
for the same standard once a second implementation of the revised use
cases exists.
