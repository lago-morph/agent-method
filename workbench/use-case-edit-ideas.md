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

*Draft 2026-08-30 by the AI partner, awaiting Jonathan's markup.*

Derived from [input/02-edit-ideas.md](input/02-edit-ideas.md). Second
use case in the v1 build order; builds on the three-pane screen from
[use-case-initial-ui.md](use-case-initial-ui.md).

## Goal

Write and rework ideas directly in the right pane, with the editing
behavior I expect from any text editor.

## Behavior

### Editing

- The right pane is a plain-text editor for the selected idea, with the
  standard copy, cut, and paste shortcuts.
- Clicking "new" creates a new, empty idea, selects it, and puts the
  cursor in the editor.
- The idea list updates as the idea is edited: changing the first line
  changes the title shown in the middle pane immediately, and the
  idea's position in the list re-sorts live to match.

### Undo and redo

- Text editing supports undo and redo, including for large text
  changes.
- The undo buffer is cleared when another idea is selected, when "new"
  is clicked, or when the tab or browser is closed. Undo history never
  crosses ideas.
- Undoing a split restores this idea's text but does not delete the
  split-off idea. (Splitting arrives in a later use case; this rule
  governs how its interaction with undo behaves.)

### Empty-idea deletion

- If an idea has no text when another idea is clicked or the "new"
  button is pressed, the idea is deleted — even if it has labels
  defined. Text that is only whitespace characters counts as no text.
- Deletion happens only at that moment of leaving the idea; deleting
  all the text and continuing to type in place never deletes the idea.

### Lifetime of edits

- Until saving exists (a later use case), edits live only in memory:
  closing the tab or browser loses them. The "load test data" button
  from the initial UI coexists with editing; loaded test ideas can be
  edited like any other idea.
