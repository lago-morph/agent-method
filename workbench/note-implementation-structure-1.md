---
id: note-implementation-structure-1
type: note
title: Implementation 1 — implementation structure
links:
  related-to:
    - note-implementation-record-1.md
    - note-decision-guides.md
---

Decisions of implementation 1, made while building it and captured 2026-09-05 at Jonathan's direction. The implementation record ([note-implementation-record-1.md](note-implementation-record-1.md)) keeps one line per area and links here; this note holds the detail. No guide exists yet for this area (code conventions and data model are foreseen in [note-decision-guides.md](note-decision-guides.md)); this note is the first instance from which one will be derived.

Candidates for workbench ADRs once Jonathan agrees they should bind
later implementations (proposed in
[note-decision-guides.md](note-decision-guides.md)).

- **Model:** an idea is `{ id, content }`. The title is derived from
  the first line of the content on every render; it is not stored.
- **Identity:** ids are integers from a counter starting at 1, never
  reused within a session. Selection is held as the selected id, so
  it survives re-sorting and re-rendering.
- **Emptiness:** an idea is empty when its content trimmed of
  whitespace is the empty string.
- **Ordering:** empties first (creation order among themselves), then
  a locale-aware comparison of lowercased titles; ties keep creation
  order (stable sort).
- **Rendering:** the whole list is rebuilt from the model on every
  change; no incremental DOM updates. One click handler on the list,
  delegated to rows.
- **Code shape:** plain HTML, CSS, and JavaScript in one file, in an
  immediately-invoked strict-mode function; no framework, no build, no
  external references of any kind, so the file works over `file://`.
- **Accessibility:** panes carry `aria-label`s; nothing further
  (no keyboard navigation).
