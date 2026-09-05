---
id: acceptance-criteria-2
type: note
title: Implementation 2 — acceptance criteria
links:
  related-to:
    - note/implementation-record-2.md
    - note/acceptance-criteria-definition.md
    - note/automated-checks-2.md
---

Decisions of implementation 2, made while building it. The
implementation record
([note/implementation-record-2.md](implementation-record-2.md))
keeps one line per area and links here; this note holds the detail.
Guide:
[note/acceptance-criteria-definition.md](acceptance-criteria-definition.md).
The Chromium column is filled from the checks in
[note/automated-checks-2.md](automated-checks-2.md).

Each row traces to a sentence in one of the included use cases or a
decision in the record. "Chromium" is the automated result; "iPad" is
Jonathan's checkpoint. The Initial UI rows are copied verbatim from
[note/acceptance-criteria-1.md](acceptance-criteria-1.md), as the
guide directs, so the results stay comparable across implementations.

## The guide's questions, answered

1. **Which sentences are checkable by a script?** All the behavior
   sentences of both use cases are, except that copy, cut, and paste
   ("the platform's standard facilities; the application adds no
   facilities of its own") is settled by inspecting the implementation
   for clipboard code, and that clearing the history when the
   application is closed is settled by inspecting it for persistence.
2. **What general rules apply?** No script errors; the file opens the way
   the record says (directly, no server, build, or network); nothing
   outside the included use cases is present. *Repeated unchanged from
   implementation 1.*
3. **What does done mean?** Every automated row passes and Jonathan has
   completed the checkpoint. *Repeated unchanged.*
4. **What happens when a row fails at the checkpoint?** Decide whether
   the use case or the implementation is wrong; a use-case change is a
   new round on that use case, an implementation bug is fixed in place.
   *Repeated unchanged.*

The Interface guidance section of the Edit ideas use case is not a
source of criteria — it is guidance for implementers, not behavior — so
nothing about buttons, shortcuts, or the on-screen keyboard appears
below. Those are things for Jonathan to look at, listed in
[note/test-method-2.md](test-method-2.md).

## Criteria

| Source | Check | Chromium | iPad |
| --- | --- | --- | --- |
| Layout | Three panes; the left one is empty | pass | — |
| Idea list | With no ideas, the list is empty and the text pane blank | pass | — |
| Idea list | Titles are in case-insensitive alphabetical order ("Apple crumble" before "apple pie recipe" before "Banana bread") | pass | — |
| Idea list | Each row shows only the first line of its idea | pass | — |
| Idea list | A first line wider than the pane is truncated with "…" | pass | — |
| Idea list | With more ideas than fit, the middle pane scrolls, and scrolling it moves neither the page nor the right pane | pass | — |
| Idea text | Selecting an idea shows its text and highlights its row | pass | — |
| Idea text | Text larger than the pane scrolls vertically; nothing scrolls horizontally | pass | — |
| Empty ideas | Empty and whitespace-only ideas show as greyed "(empty)" rows at the top | pass | — |
| Empty ideas | Selecting them shows their literal content (nothing, or the whitespace) | pass | — |
| Test data | One click loads the full set (19 ideas); each further click appends another full copy with its own identities; the selection survives | pass | — |
| Idea edit area | Typing in the edit area changes the selected idea's content directly; there is no separate edit mode | pass | — |
| Idea edit area | Copy, cut, and paste are the platform's own | pass (by inspection: no clipboard code) | — |
| Idea edit area | With no idea selected, the edit area is blank and not editable | pass | — |
| Idea edit area | The area scrolls so that the point being typed at stays in view | pass | — |
| New ideas | New creates an idea with no content, selects it, and puts the insertion point in the edit area | pass | — |
| New ideas | Until it has content, the new idea shows as an "(empty)" placeholder, selected, among the placeholders at the top | pass | — |
| List follows the text | The entry shows the current first line as the idea is typed, not on leaving it | pass | — |
| List follows the text | When the first line changes, the entry moves to its new alphabetical position immediately, stays selected, and stays visible | pass | — |
| List follows the text | While the content is empty or whitespace the entry shows "(empty)" at the top; with visible content it shows its first line and takes its alphabetical place | pass | — |
| List follows the text | An idea with a blank first line but later content shows its first line with visible content, distinguished as a placeholder, and sorts by that line | pass | — |
| Deleted on leaving | Leaving an idea with no visible content deletes it, whether it was emptied or was already empty when selected | pass | — |
| Deleted on leaving | New while the selected idea is empty deletes it and creates a fresh one; repeating New never piles up empty ideas | pass | — |
| Deleted on leaving | Selecting the already-selected idea is not leaving it: nothing is deleted and nothing else changes | pass | — |
| Deleted on leaving | An idea that is momentarily empty while being edited is not deleted, and its undo history is intact | pass | — |
| Undo and redo | Undo reverts the most recent change to the selected idea's text; Redo re-applies the most recently undone one | pass | — |
| Undo and redo | The history covers every change since the idea was selected; undoing past that does nothing, and redoing when nothing has been undone does nothing | pass | — |
| Undo and redo | A new change after undoing discards what could have been redone | pass | — |
| Undo and redo | Undo and redo never create, delete, or change any other idea | pass | — |
| Undo and redo | The history is cleared when another idea is selected and when New is issued | pass | — |
| Undo and redo | The history is cleared when the application is closed | pass (by inspection: the history is in memory and nothing is persisted) | — |
| Record | Opens directly from a file with no server, build, or network access | pass (by inspection: no external references) | — |
| General | No script errors during the run | pass | — |

Done means: every automated row passes, and Jonathan has used the
implementation on the iPad and said the checkpoint is complete.
