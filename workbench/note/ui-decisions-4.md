---
id: ui-decisions-4
type: note
title: Implementation 4 — UI decisions
links:
  related-to:
    - note/implementation-record-4.md
    - note/ui-standards-definition.md
---

Decisions of implementation 4, made while building it. The
implementation record
([note/implementation-record-4.md](implementation-record-4.md))
keeps one line per area and links here; this note holds the detail.
Guide: [note/ui-standards-definition.md](ui-standards-definition.md).
Values, not adjectives. Implementation 4 is a touch web app, like
implementations 1 through 3, so the previous answers apply unless a
reason to differ is recorded. None of the three behavior changes the
2026-09-06 revision made — the message list opening empty, ordering
comparing entire content, and hyphen-splitting a wide word in the right
pane — is a UI-standards question: each is behavior the use cases now
specify, not an appearance or interaction convention this guide covers.
They are recorded in
[note/implementation-structure-4.md](implementation-structure-4.md)
instead, per [note/decision-guides.md](decision-guides.md)'s rule that
behavior belongs to the use case and its implementation, not to a
guide answer.

## The guide's questions, answered

All twelve questions are repeated unchanged from implementation 3
([note/ui-decisions-3.md](ui-decisions-3.md)), which itself repeated
implementations 1 and 2 for all but the message area's own values
(question 7) and the additions "beyond the guide's questions" below.
Nothing in the 2026-09-06 revision changes an appearance or interaction
convention:

1. Platform conventions — the host platform, system font stack, 17 px
   base. *Repeated unchanged.*
2. Type size and line height — 17 px base; 1.4 line height in the edit
   area, including its display overlay (see below). *Repeated
   unchanged.*
3. Palette — unchanged: text `#1c1c1e`, muted `#8e8e93`, pane and
   message-list background white, chrome `#f2f2f5`, dividers `#c8c8cc`,
   row separators `#ececef`, selected row `#d9e7ff`, primary button
   `#0a66ff`, secondary button as before. The hyphen a wide word shows
   in the right pane is drawn in the same text colour as the rest of
   the idea's content — it is not called out visually, because nothing
   in the use case asks it to be. *Repeated unchanged.*
4. Dark mode — no. *Repeated unchanged.*
5. Minimum touch target — 44 px. *Repeated unchanged.*
6. Layout proportions — 1 : 2 : 4, unchanged in both orientations.
   *Repeated unchanged.*
7. Controls and their names — the same header bar and four buttons, the
   same message area controls. *Repeated unchanged.*
8. Selection, placeholder, and pressed states — unchanged. The
   selection highlight is the platform's native text-selection band,
   painted by the (invisible-text) interactive layer over the visible
   display layer beneath it — see
   [note/implementation-structure-4.md](implementation-structure-4.md),
   "Splitting a word with display-only hyphens" — so it looks exactly
   as it did in implementation 3, over whichever characters are
   selected. *Repeated unchanged.*
9. Which containers scroll — the left and middle panes; in the right
   pane, the interactive (invisible) layer is still the scroller the
   platform keeps the caret within, with the visible display layer kept
   at the same scroll position underneath it; the message list's
   entries scroll inside the panel. The page itself never scrolls.
   *Repeated unchanged in substance; the right pane's scroller is now
   one of two layers occupying the same box rather than the only thing
   there, recorded here because question 9 is exactly where that
   belongs.*
10. Platform needs — unchanged.
11. A command that currently cannot do anything — enabled and inert,
    unchanged.
12. Does invoking a command move the insertion point into the edit
    area? — unchanged.

## Decided beyond the guide's questions

- **The hyphen a split shows is not a special glyph or weight.** It is
  the plain "-" character, in the same font, size, and colour as the
  text around it — the use case says only that "a hyphen is shown",
  and nothing calls for it to be distinguished further.
- **The display layer never receives a visible caret or selection band
  of its own** — `pointer-events: none` and `user-select: none` keep it
  inert, so the one caret and one selection band the user sees are
  always the interactive layer's native ones. This is an implementation
  decision (see
  [note/implementation-structure-4.md](implementation-structure-4.md))
  rather than a UI-standards question, because there is only ever one
  visible caret and one visible selection to look at — nothing about
  their appearance changes.

## Proposed for promotion to a standard

Unchanged from implementation 3's proposal
([note/ui-decisions-3.md](ui-decisions-3.md)): questions 1–6, 8, and
10–12 have now been answered identically in four implementations, all
touch web apps. The proposal stands; this implementation adds no new
candidate values, because none of the 2026-09-06 revision's changes are
UI-standards decisions.
