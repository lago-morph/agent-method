---
id: acceptance-criteria-1
type: note
title: Implementation 1 — acceptance criteria
links:
  related-to:
    - note/implementation-record-1.md
    - note/acceptance-criteria-definition.md
    - note/automated-checks-1.md
---

Decisions of implementation 1, made while building it and captured 2026-09-05 at Jonathan's direction. The implementation record ([note/implementation-record-1.md](implementation-record-1.md)) keeps one line per area and links here; this note holds the detail. Guide: [note/acceptance-criteria-definition.md](acceptance-criteria-definition.md). The Chromium column is filled from the checks in [note/automated-checks-1.md](automated-checks-1.md).

Each row traces to a sentence in the use case or a decision in this
record. "Chromium" is the automated result; "iPad" is Jonathan's
checkpoint.

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
| Record | Opens directly from a file with no server, build, or network access | pass (by inspection: no external references) | — |
| General | No script errors during the run | pass | — |

Done means: every automated row passes, and Jonathan has used the
implementation on the iPad and said the checkpoint is complete.
