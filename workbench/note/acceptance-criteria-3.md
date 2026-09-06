---
id: acceptance-criteria-3
type: note
title: Implementation 3 — acceptance criteria
links:
  related-to:
    - note/implementation-record-3.md
    - note/acceptance-criteria-definition.md
    - note/automated-checks-3.md
---

Decisions of implementation 3, made while building it. The
implementation record
([note/implementation-record-3.md](implementation-record-3.md))
keeps one line per area and links here; this note holds the detail.
Guide:
[note/acceptance-criteria-definition.md](acceptance-criteria-definition.md).
The Chromium column is filled from the checks in
[note/automated-checks-3.md](automated-checks-3.md).

Each row traces to a sentence in one of the included use cases or a
decision in the record. "Chromium" is the automated result; "iPad" is
Jonathan's checkpoint. Rows whose use-case sentence is unchanged are
copied verbatim from
[note/acceptance-criteria-2.md](acceptance-criteria-2.md), as the guide
directs, so results stay comparable across implementations. Rows marked
**(revised)** are ones the 2026-09-05 revision of the use cases changed,
and rows marked **(new)** cover behavior the revision added; they are
not comparable with implementation 2's, and that is the spec's doing,
not the implementation's.

## The guide's questions, answered

1. **Which sentences are checkable by a script?** All the behavior
   sentences of both use cases are, except three that are settled by
   inspecting the implementation's source: that copy, cut, and paste are
   the platform's own facilities and the application adds none; that the
   file opens with no server, build, or network access; and that nothing
   is persisted, which is what clears the undo history and discards the
   messages when the application is closed. Implementation 3 makes those
   three inspections checks in the script rather than a person's
   reading; the change and its cost are recorded in
   [note/test-method-3.md](test-method-3.md).
2. **What general rules apply?** No script errors; the file opens the
   way the record says (directly, no server, build, or network access);
   nothing outside the included use cases is present. *Repeated
   unchanged from implementations 1 and 2.*
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
[note/test-method-3.md](test-method-3.md).

## Criteria

| Source | Check | Chromium | iPad |
| --- | --- | --- | --- |
| Layout | Three panes; the left one is empty | pass | — |
| Layout | The message area spans the full width beneath the three panes and is always present **(new)** | pass | — |
| Idea list | With no ideas, the list is empty and the text pane blank | pass | — |
| Idea list | Titles are in case-insensitive alphabetical order ("Apple crumble" before "apple pie recipe" before "Banana bread") | pass | — |
| Idea list | Each row shows only the first line of its idea | pass | — |
| Idea list | A first line wider than the pane is truncated with "…" | pass | — |
| Idea list | With more ideas than fit, the middle pane scrolls, and scrolling it moves neither the page nor the right pane | pass | — |
| Idea text | Selecting an idea shows its text and highlights its row | pass | — |
| Idea text | Text larger than the pane scrolls vertically; nothing scrolls horizontally | pass | — |
| Ideas with no visible content | A blank idea shows as a greyed "(empty)" row at the top of the list and can be selected **(revised)** | pass | — |
| Ideas with no visible content | Selecting a blank idea shows its literal content — nothing **(revised)** | pass | — |
| Message area | With no current message the area is empty and offers nothing to dismiss **(new)** | pass | — |
| Message area | A message appears in the area, with an × that dismisses it; a new message replaces the current one **(new)** | pass | — |
| Message area | A message wider than the area is truncated with "…" **(new)** | pass (by inspection of the computed style: no specified message is wide enough to truncate at either iPad size) | — |
| Message area | The list button opens the message list and closes it again; the list's own × closes it too **(new)** | pass | — |
| Message list | Every message of the session, newest first, each with the time it appeared as hours:minutes:seconds **(new)** | pass | — |
| Message list | Identical messages are separate entries with their own times **(new)** | pass | — |
| Message list | With no message yet, the list shows "No messages" **(new)** | pass | — |
| Message list | The list scrolls when it is taller than the space it has **(new)** | pass (by inspection of the computed style: three messages do not overflow the panel) | — |
| Message list | Messages are not kept across sessions **(new)** | pass | — |
| Test data | One click loads the set as 17 ideas — the empty and whitespace-only items are blank and never appear; each further click appends another full copy with its own identities; the selection survives **(revised)** | pass | — |
| Idea edit area | Typing in the edit area changes the selected idea's content directly; there is no separate edit mode | pass | — |
| Idea edit area | Copy, cut, and paste are the platform's own | pass (inspection check: no clipboard code) | — |
| Idea edit area | With no idea selected, the edit area is blank and not editable | pass | — |
| Idea edit area | The area scrolls so that the point being typed at stays in view | pass | — |
| New ideas | New creates an idea with no content, selects it, and puts the insertion point at the beginning of the empty text **(revised)** | pass | — |
| New ideas | Until it has content, the new idea shows as the "(empty)" placeholder at the top of the list, selected, and it is the only blank idea that can exist **(revised)** | pass | — |
| List follows the text | The entry shows the current first line as the idea is typed, not on leaving it | pass | — |
| List follows the text | When the first line changes, the entry moves to its new alphabetical position immediately, stays selected, and stays visible | pass | — |
| List follows the text | While the content is blank the entry shows "(empty)" at the top; with visible content it shows its first line and takes its alphabetical place **(revised)** | pass | — |
| Leading whitespace | Whitespace at the beginning of an idea's text is stripped at every update of the idea list **(new)** | pass | — |
| Leading whitespace | Stripping caused by my editing the active idea shows the message "Leading whitespace was removed."; stripping for any other reason is silent **(new)** | pass | — |
| Leading whitespace | Undo never brings stripped whitespace back, and the insertion point moves left by the amount removed, never before the start **(new)** | pass | — |
| Blank ideas | A blank idea exists only while it is active: leaving it deletes it, and every blank idea other than the active one is deleted at every update **(revised)** | pass | — |
| Blank ideas | New while the active idea is blank deletes it and creates a fresh one; repeating New never piles up blank ideas | pass | — |
| Blank ideas | Selecting the already-selected idea is not leaving it: nothing is deleted and nothing else changes | pass | — |
| Blank ideas | An idea that is momentarily blank while being edited is not deleted, and its undo history is intact | pass | — |
| Blank ideas | Loaded content that is blank after stripping is deleted at the update that follows loading; it never appears in the list **(new)** | pass | — |
| Undo and redo | Undo reverts the most recent change to the active idea's text; Redo re-applies the most recently undone one | pass | — |
| Undo and redo | A run of characters typed one after another is one change: whitespace goes with the text that follows it, and a sequence of whitespace is one unit **(new)** | pass | — |
| Undo and redo | A run of consecutive deletions at one place that removes characters of one unit is one change; reaching the next unit starts another **(new)** | pass | — |
| Undo and redo | A paste, cut, or replacement is one change **(new)** | pass (through a replacement; the clipboard is a checkpoint item) | — |
| Undo and redo | The history covers every change since the idea was selected; undoing past that does nothing, and redoing when nothing has been undone does nothing | pass | — |
| Undo and redo | A new change after undoing discards what could have been redone | pass | — |
| Undo and redo | Undo and redo never create, delete, or change any other idea | pass | — |
| Undo and redo | The history is cleared when another idea is selected and when New is issued | pass | — |
| Undo and redo | The history is cleared when the application is closed | pass (inspection check: nothing is persisted) | — |
| Record | Opens directly from a file with no server, build, or network access | pass (inspection check: no external references) | — |
| General | No script errors during the run | pass | — |

Done means: every automated row passes, and Jonathan has used the
implementation on the iPad and said the checkpoint is complete.

## A criterion the two use cases together make unreachable

Implementation 2's row "Selecting them shows their literal content
(nothing, or the whitespace)" is revised above to its "nothing" half.
The Initial UI use case still says an idea containing only whitespace
appears as "(empty)" and that selecting it shows the whitespace; with
the Edit ideas use case in force, such an idea is stripped to nothing at
the next update and deleted unless it is active, and an active blank
idea's content is the empty string. So no whitespace-only idea can exist
in implementation 3, and the sub-case cannot be checked. It is recorded
here, and in
[note/implementation-structure-3.md](implementation-structure-3.md),
rather than marked passed on a check that did not run. The Initial UI
sentence remains correct for an implementation of that use case alone,
which is implementation 1.
