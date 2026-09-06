---
id: acceptance-criteria-4
type: note
title: Implementation 4 — acceptance criteria
links:
  related-to:
    - note/implementation-record-4.md
    - note/acceptance-criteria-definition.md
    - note/automated-checks-4.md
---

Decisions of implementation 4, made while building it. The
implementation record
([note/implementation-record-4.md](implementation-record-4.md))
keeps one line per area and links here; this note holds the detail.
Guide:
[note/acceptance-criteria-definition.md](acceptance-criteria-definition.md).
The Chromium column is filled from the checks in
[note/automated-checks-4.md](automated-checks-4.md).

Each row traces to a sentence in one of the included use cases or a
decision in the record. "Chromium" is the automated result; "iPad" is
Jonathan's checkpoint. Rows whose use-case sentence is unchanged are
copied verbatim from
[note/acceptance-criteria-3.md](acceptance-criteria-3.md), as the guide
directs, so results stay comparable across implementations. Rows marked
**(revised)** are ones the 2026-09-06 revision changed; rows marked
**(new)** cover behavior the revision added. They are not comparable
with implementation 3's, and that is the spec's doing, not the
implementation's.

## The guide's questions, answered

1. **Which sentences are checkable by a script?** All the behavior
   sentences of both use cases are, except the same three settled by
   inspecting the implementation's source that implementations 1
   through 3 used (platform clipboard facilities only; opens with no
   server, build, or network access; nothing persisted). *Repeated
   unchanged.*
2. **What general rules apply?** No script errors; the file opens the
   way the record says; nothing outside the included use cases is
   present. *Repeated unchanged.*
3. **What does done mean?** Every automated row passes and Jonathan has
   completed the checkpoint. *Repeated unchanged.*
4. **What happens when a row fails at the checkpoint?** Decide whether
   the use case or the implementation is wrong; a use-case change is a
   new round on that use case, an implementation bug is fixed in place.
   *Repeated unchanged.*

The Interface guidance sections of both use cases are not a source of
criteria — they are guidance for implementers, not behavior — so
nothing about buttons, shortcuts, or the on-screen keyboard appears
below; those are checkpoint items, listed in
[note/test-method-4.md](test-method-4.md).

## Criteria

| Source | Check | Chromium | iPad |
| --- | --- | --- | --- |
| Layout | Three panes; the left one is empty | pass | — |
| Layout | The message area spans the full width beneath the three panes and is always present | pass | — |
| Idea list | With no ideas, the list is empty and the text pane blank | pass | — |
| Idea list | Titles are in case-insensitive alphabetical order ("Apple crumble" before "apple pie recipe" before "Banana bread") | pass | — |
| Idea list | Ordering compares an idea's entire content, not only the first line: two ideas sharing a first line are told apart by what follows **(new)** | pass | — |
| Idea list | Each row shows only the first line of its idea | pass | — |
| Idea list | A first line wider than the pane is truncated with "…" after whatever part of it fits, whether the line is a sentence or a single unbroken word **(revised: made explicit for a single word with no spaces)** | pass | — |
| Idea list | With more ideas than fit, the middle pane scrolls, and scrolling it moves neither the page nor the right pane | pass | — |
| Idea text | Selecting an idea shows its text and highlights its row | pass | — |
| Idea text | Text larger than the pane scrolls vertically; nothing scrolls horizontally | pass | — |
| Idea text | A word wider than the pane is split across lines with a hyphen shown at each split; a word spanning several lines has a hyphen at every line it is split across **(new)** | pass for "split with a hyphen"; "at every line" by inspection of the screenshots — the automated check counts soft hyphens in the display text, which shows the word was marked for splitting, not where the lines break (see [automated-checks-4.md](automated-checks-4.md), row 24) | — |
| Idea text | Splitting is display only: the idea's content is unchanged and no hyphen is part of it or reachable by copying it **(new)** | pass | — |
| Idea text | Splitting happens as the text is typed: a word split as it grows past the pane's width, and shown whole again once it shrinks back to fit **(new)** | pass | — |
| Ideas with no visible content | A blank idea shows as a greyed "(empty)" row at the top of the list and can be selected | pass | — |
| Ideas with no visible content | Selecting a blank idea shows its literal content — nothing (unreachable for the "or the whitespace" half; see implementation 3's note) | pass | — |
| Message area | With no current message the area is empty and offers nothing to dismiss | pass | — |
| Message area | A message appears in the area, with an × that dismisses it; a new message replaces the current one | pass | — |
| Message area | A message wider than the area is truncated with "…" | pass (by inspection of the computed style: no specified message is wide enough to truncate at either iPad size) | — |
| Message area | The list button opens the message list and closes it again; the list's own × closes it too | pass | — |
| Message area | The list button is present whether or not there is a current message; the × is present only while a message is displayed **(new)** | pass | — |
| Message list | Every message of the session, newest first, each with the time it appeared as hours:minutes:seconds | pass | — |
| Message list | Identical messages are separate entries with their own times | pass | — |
| Message list | When no message has appeared yet, the list opens empty **(revised: no "No messages" row; the list simply has none)** | pass | — |
| Message list | The list scrolls when it is taller than the space it has | pass (by inspection of the computed style: three messages do not overflow the panel) | — |
| Message list | Messages are not kept across sessions | pass | — |
| Test data | One click loads the set as 20 ideas — the empty and whitespace-only items are blank and never appear; each further click appends another full copy with its own identities; the selection survives **(revised: 22-item set, 20 rows, following the record's own test-data note)** | pass | — |
| Idea edit area | Typing in the edit area changes the selected idea's content directly; there is no separate edit mode | pass | — |
| Idea edit area | Copy, cut, and paste are the platform's own | pass (inspection check: no clipboard code) | — |
| Idea edit area | With no idea selected, the edit area is blank and not editable | pass | — |
| Idea edit area | The area scrolls so that the point being typed at stays in view | pass | — |
| New ideas | New creates an idea with no content, selects it, and puts the insertion point at the beginning of the empty text | pass | — |
| New ideas | Until it has content, the new idea shows as the "(empty)" placeholder at the top of the list, selected, and it is the only blank idea that can exist | pass | — |
| List follows the text | The entry shows the current first line as the idea is typed, not on leaving it | pass | — |
| List follows the text | When the first line changes, the entry moves to its new alphabetical position immediately, stays selected, and stays visible | pass | — |
| List follows the text | While the content is blank the entry shows "(empty)" at the top; with visible content it shows its first line and takes its alphabetical place | pass | — |
| Leading whitespace | Whitespace at the beginning of an idea's text is stripped at every update of the idea list | pass | — |
| Leading whitespace | Stripping caused by my editing the active idea shows the message "Leading whitespace was removed."; stripping for any other reason is silent | pass | — |
| Leading whitespace | Undo never brings stripped whitespace back, and the insertion point moves left by the amount removed, never before the start | pass | — |
| Blank ideas | A blank idea exists only while it is active: leaving it deletes it, and every blank idea other than the active one is deleted at every update | pass | — |
| Blank ideas | New while the active idea is blank deletes it and creates a fresh one; repeating New never piles up blank ideas | pass | — |
| Blank ideas | Selecting the already-selected idea is not leaving it: nothing is deleted and nothing else changes | pass | — |
| Blank ideas | An idea that is momentarily blank while being edited is not deleted, and its undo history is intact | pass | — |
| Blank ideas | Loaded content that is blank after stripping is deleted at the update that follows loading; it never appears in the list | pass | — |
| Undo and redo | Undo reverts the most recent change to the active idea's text; Redo re-applies the most recently undone one | pass | — |
| Undo and redo | A run of characters typed one after another is one change: whitespace goes with the text that follows it, and a sequence of whitespace is one unit | pass | — |
| Undo and redo | A run of consecutive deletions at one place that removes characters of one unit is one change; reaching the next unit starts another | pass | — |
| Undo and redo | A paste, cut, or replacement is one change | pass (through a replacement; the clipboard is a checkpoint item) | — |
| Undo and redo | The history covers every change since the idea was selected; undoing past that does nothing, and redoing when nothing has been undone does nothing | pass | — |
| Undo and redo | A new change after undoing discards what could have been redone | pass | — |
| Undo and redo | Undo and redo never create, delete, or change any other idea | pass | — |
| Undo and redo | The history is cleared when another idea is selected and when New is issued | pass | — |
| Undo and redo | The history is cleared when the application is closed | pass (inspection check: nothing is persisted) | — |
| Record | Opens directly from a file with no server, build, or network access | pass (inspection check: no external references) | — |
| General | No script errors during the run | pass | — |

Done means: every automated row passes, and Jonathan has used the
implementation on the iPad and said the checkpoint is complete.

## A criterion the two use cases together still make unreachable

Carried unchanged from
[note/acceptance-criteria-3.md](acceptance-criteria-3.md): with the
Edit ideas use case in force, no whitespace-only idea can exist at
rest, so the Initial UI use case's "selecting it shows the whitespace"
half of its sentence cannot be checked in this implementation. It
remains correct for an implementation of the Initial UI use case alone
(implementation 1).

## A new caution this implementation's own change introduces

The row-count expectations above and in
[note/automated-checks-4.md](automated-checks-4.md) (20 rows per load,
60 after three) are specific to this implementation's 22-item test-data
set ([note/test-data-4.md](test-data-4.md)) and are not comparable with
implementation 3's 17-and-51, even though the underlying rule (blank
loaded content is deleted, non-blank content is not) is identical; the
difference is the spec's test-data addition, not a behavior change.
