---
id: ui-decisions-1
type: note
title: Implementation 1 — UI decisions
links:
  related-to:
    - note/implementation-record-1.md
    - note/ui-standards-definition.md
---

Decisions of implementation 1, made while building it and captured 2026-09-05 at Jonathan's direction. The implementation record ([note/implementation-record-1.md](implementation-record-1.md)) keeps one line per area and links here; this note holds the detail. Guide: [note/ui-standards-definition.md](ui-standards-definition.md). Values, not adjectives; every one of them took the guide's default.

- **Platform conventions:** follow the host platform (iPadOS Safari).
  System font stack (`-apple-system, system-ui, …`), 17 px base size,
  line height 1.4 in the text pane.
- **Chrome:** one header bar holding the application name ("Idea
  Workbench", left) and the scaffolding button ("Load test data",
  right). Nothing else on screen but the three panes.
- **Pane proportions:** left : middle : right = 1 : 2 : 4 of the
  width, the same in landscape and portrait. Panes are separated by
  1 px dividers; the empty left pane is drawn as a pane, not hidden.
- **Palette (light only, no dark mode):** text `#1c1c1e`; muted text
  for placeholders `#8e8e93`; pane background white; chrome background
  `#f2f2f5`; dividers `#c8c8cc`; row separators `#ececef`; selected
  row background `#d9e7ff`; button `#0a66ff` with white text.
- **Touch:** every row and button is at least 44 px tall; the tap
  highlight is suppressed; list rows cannot be text-selected; the
  button dims while pressed.
- **List rows:** one line each, 10 px vertical and 12 px horizontal
  padding, hairline separator beneath, ellipsis truncation.
- **Text pane:** 12 px × 16 px padding; whitespace preserved as typed;
  long unbroken runs wrap anywhere rather than overflow.
- **Scrolling:** only the three panes scroll; the page itself never
  does. Each pane contains its own overscroll. Safe-area insets are
  respected and the layout uses the dynamic viewport height.
- **Wording:** sentence case on buttons; the placeholder is literally
  "(empty)" as the use case says.
