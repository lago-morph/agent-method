---
id: use-case-initial-ui
type: use-case
title: Initial UI
links:
  is-part-of:
    - vision.md
  depended-on-by:
    - use-case-edit-ideas.md
---

Derived from [input/01-display-ideas.md](input/01-display-ideas.md)
("Initial UI" on the master list). First use case in the v1 build
order; every later use case builds on this screen.

## Goal

See my ideas in one place: the three-pane screen that is the workbench.

## Behavior

### Layout

- The application presents a three-pane screen: a left pane, an idea
  list in the middle, and the idea text on the right.
- The left pane is empty for now. (A later use case populates it with
  labels.)

### Idea list (middle pane)

- The middle pane lists ideas, initially in alphabetical order.
  Ordering is case-insensitive.
- The first line of each idea is its title, and is what the middle pane
  displays for it — by default just that first line, truncated with
  "…" when it is wider than the pane.
- When there are no ideas, the list is simply empty; nothing else
  changes.
- When there are more ideas than fit the visible list, the middle pane
  scrolls vertically, independently of the other panes.

### Idea text (right pane)

- The right pane shows the text of the selected idea. If no idea is
  selected, or "new" is clicked, the area is blank.
- When the text is larger than the display area, the right pane scrolls
  vertically. Lines longer than the pane wrap; there is no horizontal
  scrolling.

### Ideas with no visible content

- An idea whose content is empty, or contains only whitespace
  characters, appears in the list as a greyed-out "(empty)" placeholder
  entry. It can be selected like any other idea; the right pane then
  shows its literal content (nothing, or the whitespace).
- These sort together at the top of the list, before ideas with titles.

## Test data (scaffolding)

- A "load test data" button populates the list with a fixed set of test
  ideas, so the display can be exercised before editing and saving
  exist. The button is removed once save is implemented.
- Each click of the button appends another full copy of the set (every
  idea gets its own identity, so duplicates coexist) — clicking a few
  times grows the list past one screen to exercise list scrolling.
- The set is designed to show off the corner cases:
  - a dozen or so short ideas with varied first letters and mixed case,
    exercising alphabetical ordering;
  - one idea whose first line is much wider than the middle pane,
    exercising title truncation;
  - one idea whose text is much larger than the display area,
    exercising right-pane scrolling and line wrapping;
  - one idea with no content at all, and one containing only
    whitespace characters, exercising the "(empty)" placeholder
    display.
