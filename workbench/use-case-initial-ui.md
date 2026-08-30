---
id: use-case-initial-ui
type: use-case
title: Initial UI
links:
  is-part-of:
    - vision.md
---

*Draft 2026-08-30 by the AI partner, awaiting Jonathan's markup.*

Derived from [input/01-display-ideas.md](input/01-display-ideas.md)
("Initial UI" on the master list). First use case in the v1 build
order; every later use case builds on this screen.

## Goal

See my ideas in one place: the three-pane screen that is the workbench.

## Behavior

- The application presents a three-pane screen: a left pane, an idea
  list in the middle, and the idea text on the right.
- The left pane is empty for now. (A later use case populates it with
  labels.)
- The middle pane lists ideas, initially in alphabetical order.
- The first line of each idea is its title, and is what the middle pane
  displays for it — by default just that first line, truncated with
  "…" when it is too long.
- The right pane shows the text of the selected idea. If no idea is
  selected, or "new" is clicked, the area is blank.

## Scaffolding

- A "load test data" button populates the list with test ideas, so the
  display can be exercised before editing and saving exist. The button
  is removed once save is implemented.
