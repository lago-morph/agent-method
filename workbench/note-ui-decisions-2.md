---
id: note-ui-decisions-2
type: note
title: Implementation 2 — UI decisions
links:
  related-to:
    - note-implementation-record-2.md
    - note-ui-standards-definition.md
---

Decisions of implementation 2, made while building it. The
implementation record
([note-implementation-record-2.md](note-implementation-record-2.md))
keeps one line per area and links here; this note holds the detail.
Guide: [note-ui-standards-definition.md](note-ui-standards-definition.md).
Values, not adjectives.

## The guide's questions, answered

1. **Platform conventions** — the host platform (iPadOS Safari). System
   font stack (`-apple-system, system-ui, …`), 17 px base size.
   *Repeated unchanged from implementation 1.*
2. **Type size and line height** — 17 px base; line height 1.4 in the
   edit area. *Repeated unchanged.*
3. **Palette** — text `#1c1c1e`; muted text for placeholders `#8e8e93`;
   pane background white; chrome background `#f2f2f5`; dividers
   `#c8c8cc`; row separators `#ececef`; selected row background
   `#d9e7ff`; primary button `#0a66ff` with white text. *Repeated
   unchanged, extended with a secondary button: white background,
   `#1c1c1e` text, `#c8c8cc` border.*
4. **Dark mode** — no. *Repeated unchanged.*
5. **Minimum touch target** — 44 px for every row and button. *Repeated
   unchanged.*
6. **Layout proportions** — left : middle : right = 1 : 2 : 4 of the
   width, the same in landscape and portrait, 1 px dividers, the empty
   left pane drawn as a pane. *Repeated unchanged.*
7. **Where controls live and what they are called** — one header bar
   holding the application name ("Idea Workbench", left) and four
   buttons on the right, in this order: "New", "Undo", "Redo", "Load
   test data". Sentence case. New is the primary (blue) button; the
   other three are secondary. Nothing else on screen but the three
   panes. *The header bar and sentence case are repeated unchanged; the
   three new buttons are this implementation's addition, and follow the
   Interface guidance section of the Edit ideas use case.*
8. **Selection, placeholder, and pressed states** — selected row: tinted
   background. Placeholder text: grey. Pressed button: dimmed to 0.7
   opacity. *Repeated unchanged.* A row whose shown line stands in for a
   missing title is greyed exactly like "(empty)", which is what the Edit
   ideas use case asks for ("distinguished in the same way").
9. **Which containers scroll** — the left and middle panes scroll
   vertically; in the right pane the edit control itself is the
   scroller, so that the browser keeps the insertion point in view. The
   page itself never scrolls. *Repeated unchanged in substance; the
   scroller inside the right pane moved from the pane to the control.*
10. **Platform needs** — safe-area insets respected, dynamic viewport
    height, tap highlight suppressed, list rows not text-selectable.
    *Repeated unchanged.* Added: the layout follows the visual viewport
    when it shrinks, so an on-screen keyboard does not cover the edit
    area.

## Decided beyond the guide's questions

The guide has no question for these; each was decided while building and
is flagged so the guide can grow the question.

- **Undo and Redo are always enabled.** They do nothing when there is
  nothing to undo or redo, which is exactly what the use case says
  happens. Dimming them would be a second way of saying the same thing
  and would make "does nothing" unobservable. The guide's "dimmed
  control" default describes the pressed state, not an unavailable one;
  there is no default for unavailable controls yet.
- **Selecting an idea does not move the insertion point into the edit
  area.** Only the New command does, because that is the only case the
  use case names. On touch, the second tap into the text is where the
  keyboard is wanted; taking focus on every selection would raise the
  on-screen keyboard whenever the list is browsed.
- **The edit area is disabled, not merely read-only, when no idea is
  selected**, and is painted as a plain white pane rather than the
  platform's greyed disabled style, so the screen does not change
  appearance when the list is empty.
- **Keyboard shortcuts:** Undo is the platform's undo shortcut
  (`Cmd`/`Ctrl` + Z), Redo is `Cmd`/`Ctrl` + `Shift` + Z and
  `Ctrl` + Y, and New is `Cmd`/`Ctrl` + N. All are intercepted before
  the browser's default. The browser may keep `Cmd` + N for itself
  (it opens a new window on some platforms); the button is then the only
  route, which is why the Interface guidance names buttons first.
- **Undo and Redo return the insertion point to the edit area.**
  Applying a history entry restores the text with its insertion point
  and focuses the control, so a keyboard user keeps typing where the
  undo left off. On touch this means tapping the Undo or Redo button
  brings the on-screen keyboard back; whether that is wanted is a
  checkpoint item. Found in review, not chosen deliberately.
- **Text behaviors are left at the platform's defaults:** no
  `spellcheck`, `autocorrect`, or `autocapitalize` attributes are set,
  because the use case says the platform's standard text-editing
  facilities are used and the application adds none of its own.

## Proposed for promotion to a standard

Questions 1–6, 8, and 10 above were answered identically in
implementations 1 and 2, both of which are touch web apps. The guide
says to propose promoting a decision repeated unchanged in a second
implementation with the same UI method; these are proposed for a "touch
web app" UI standard, leaving only question 7 (which controls exist and
what they are called) per implementation, since that follows the use
cases included.
