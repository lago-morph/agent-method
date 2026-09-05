---
id: implementation-structure-2
type: note
title: Implementation 2 — implementation structure
links:
  related-to:
    - note/implementation-record-2.md
    - note/decision-guides.md
---

Decisions of implementation 2, made while building it. The
implementation record
([note/implementation-record-2.md](implementation-record-2.md))
keeps one line per area and links here; this note holds the detail. No
guide exists yet for this area (code conventions and data model are
foreseen in [note/decision-guides.md](decision-guides.md)); this
note is the second instance from which one will be derived.

## Repeated unchanged from implementation 1

Each of these is implementation 1's decision, taken again for the same
reason ([note/implementation-structure-1.md](implementation-structure-1.md)):

- **Model:** an idea is `{ id, content }`. The title is derived from the
  content on every render; it is not stored.
- **Identity:** ids are integers from a counter starting at 1, never
  reused within a session. Selection is held as the selected id, so it
  survives re-sorting and re-rendering.
- **Emptiness:** an idea is empty when its content trimmed of whitespace
  is the empty string.
- **Ordering:** empties first (creation order among themselves), then a
  locale-aware comparison of lowercased titles; ties keep creation order
  (stable sort).
- **Rendering:** the whole list is rebuilt from the model on every
  change; no incremental DOM updates. One click handler on the list,
  delegated to rows.
- **Code shape:** plain HTML, CSS, and JavaScript in one file, in an
  immediately-invoked strict-mode function; no framework, no build, no
  external references of any kind, so the file works over `file://`.
- **Accessibility:** panes carry `aria-label`s; nothing further (no
  keyboard navigation of the list).

Both implementations having taken them, these are the candidates for
workbench ADRs that [note/decision-guides.md](decision-guides.md)
foresees, once Jonathan agrees they should bind later implementations.
No ADR is written here: an ADR records a decision that has been taken,
and this one is his to take.

## New in implementation 2

- **The title shown for an idea** is the first line when that line has
  visible content; otherwise it is the first line that does have visible
  content, marked as standing in for the missing title (class
  `placeholder-title`) and used as the sort key. An idea whose whole
  content is whitespace is empty and shows "(empty)" instead. One
  function returns both the line and whether it is a stand-in, so the
  list and the sort can never disagree about which line an idea is
  filed under.
- **The edit area is a `textarea` whose value is the idea's content.**
  The input handler writes the content back to the model and re-renders;
  the renderer writes the value back only when it differs from what the
  control already holds, so typing never loses its insertion point.
- **Undo history is a list of snapshots** `{ content, start, end }` with
  an index into it. The first entry is the text as it was when the idea
  was selected; every change appends one and moves the index. Undo and
  redo move the index and apply the snapshot, restoring the insertion
  point with the text. A change made while the index is not at the end
  truncates the entries above it. The history is rebuilt from scratch on
  every selection and on New, which is how "selecting an idea always
  starts with an empty history" is implemented; it lives in memory only,
  so closing the application clears it.
- **A run of typed characters is one change.** Consecutive
  non-whitespace characters inserted at the insertion point extend the
  current snapshot instead of appending a new one; whitespace, deletion,
  paste, a moved insertion point, and undo or redo all end the run. The
  use cases do not say what "the most recent change" is; a run is the
  granularity text editors normally use, and it is defined here without
  a timer so that the checks are deterministic.
- **Undo and redo are handled by the application, not by the text
  control.** The platform's shortcuts are intercepted and their default
  prevented, because the control's own history has different granularity
  and different clearing rules from the ones the use case specifies.
- **Deletion on leaving is one function** called at exactly two points —
  selecting a different idea and the New command — and it does nothing
  when the idea being left is not empty. Selecting the already-selected
  idea returns before it is called. Loading test data is not leaving, so
  an empty idea survives a load.
- **The list's scroll position is preserved across a re-render** (read
  before the rebuild, written after), and the selected row is then
  scrolled into view with the "nearest" alignment. Without the first, a
  full re-render on every keystroke would send the list back to the top;
  without the second, an idea that moves in the sort order while being
  typed could move out of sight.

## Decisions forced by the use cases disagreeing

- **A new idea sits with the other placeholders at the top, in creation
  order.** The Edit ideas use case says the new idea appears "as an
  '(empty)' placeholder, selected, at the top of the list — exactly as
  the Initial UI use case displays any idea with no visible content",
  and the Initial UI use case says such ideas "sort together at the top
  of the list". Read strictly, the first sentence would put a new idea
  above existing placeholders and the second would not distinguish them.
  The clause "exactly as the Initial UI use case displays" is taken to
  govern: "at the top" means the group of placeholders at the top, and
  within it the ordering rule already recorded applies.
- **Clicking New leaves an idea selected.** The Initial UI use case says
  the idea text area is blank "if no idea is selected, or 'new' is
  clicked"; the Edit ideas use case says New "creates an idea with no
  content, selects it, and puts the insertion point in the idea edit
  area". Edit ideas owns the New command, so it governs: after New an
  idea is selected and the area is editable; it is blank because the new
  idea has no content.

## Open

- **Delivery to the device.** Attaching the file in the working session
  is the route used, because a raw GitHub download gains a `.txt`
  extension on iPadOS. A durable route — a hosted page, a release asset,
  GitHub Pages — is still undecided, and is the subject of the delivery
  guide that [note/decision-guides.md](decision-guides.md)
  foresees.
