# Workbench input — source notes

Transcribed from handwritten notes (Idea Workbench PDF, pages 1–16). Each
source page (or group of pages) became one file. Wording is kept close to
the original; only light cleanup (spelling, punctuation, list structure)
was applied.

**These files are read-only once the PR that introduced them is merged.**
They are source material to pull from when writing specs, use cases, and
plans — they do not govern anything. Later work quotes or mines them; it
does not edit them, and nothing here is normative.

## Contents

| File | Source pages | What's in it |
|------|--------------|--------------|
| [high-level-scope.md](high-level-scope.md) | 1–3 | Brainstorming on what the workbench is for: the idea→spec→system vision, capture sources, and a list of things you do with an idea. Not normative. |
| [implementation-notes.md](implementation-notes.md) | 4 | Brainstorming on implementation options (hosting, storage, spec formats), open questions, and candidate key artifacts. Not normative. |
| [00-use-case-list.md](00-use-case-list.md) | 5 | Master list of ~18 use cases in rough build order, from "initial UI" through exports. |
| [01-display-ideas.md](01-display-ideas.md) | 6 | The initial 3-pane screen: labels left, idea list middle, idea text right. |
| [02-edit-ideas.md](02-edit-ideas.md) | 7 | Text editing rules: undo/redo, when the undo buffer clears, empty-idea deletion. |
| [03-save-ideas.md](03-save-ideas.md) | 8 | In-memory model synced to durable storage every 30s, on save click, and on close. |
| [04-save-restore-ui-state.md](04-save-restore-ui-state.md) | 9 | UI state persisted with data and restored on open, starting with the selected idea. |
| [05-label-ideas.md](05-label-ideas.md) | 10 | Label syntax (`x.y.z` hierarchy), character rules, multi-label ideas, label editor UI. |
| [06-split-ideas.md](06-split-ideas.md) | 11 | Splitting one idea into two from highlighted text; the new idea keeps the labels. |
| [07-filter-ideas.md](07-filter-ideas.md) | 12 | Filtering the idea list by label, with a worked example; filter is part of UI state. |
| [08-hierarchical-display-ideas.md](08-hierarchical-display-ideas.md) | 13 | Idea list grouped under label headers, indented by depth, with greyed-out parents. |
| [09-hierarchical-display-labels.md](09-hierarchical-display-labels.md) | 14 | Label pane as a collapsible folder tree with tri-state selection. |
| [10-import-ideas.md](10-import-ideas.md) | 15 | Importing text files via drag/drop, paste, or browse; filename becomes the title. |
| [11-ui-enhancements.md](11-ui-enhancements.md) | 16 | "Show details" toggle adding up to 3 preview lines per idea in the list. |

Items on the master list with no detail page yet: merge idea, import URL,
import files from GitHub directory, import GitHub issues, summarize URL,
export ideas (use case / spec / beads).
