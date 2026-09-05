---
id: implementation-structure-3
type: note
title: Implementation 3 — implementation structure
links:
  related-to:
    - note/implementation-record-3.md
    - note/decision-guides.md
---

Decisions of implementation 3, made while building it. The
implementation record
([note/implementation-record-3.md](implementation-record-3.md))
keeps one line per area and links here; this note holds the detail. No
guide exists yet for this area (code conventions and data model are
foreseen in [note/decision-guides.md](decision-guides.md)); this
note is the third instance from which one will be derived.

## Repeated unchanged from implementation 2

Each of these is implementation 2's decision, taken again for the same
reason ([note/implementation-structure-2.md](implementation-structure-2.md)):

- **Model:** an idea is `{ id, content }`. The title is derived from the
  content on every render; it is not stored.
- **Identity:** ids are integers from a counter starting at 1, never
  reused within a session. Selection is held as the selected id, so it
  survives re-sorting and re-rendering.
- **Ordering:** blank ideas first (creation order among themselves),
  then a locale-aware comparison of lowercased titles; ties keep
  creation order (stable sort).
- **Rendering:** the whole list is rebuilt from the model on every
  change; no incremental DOM updates. One click handler on the list,
  delegated to rows.
- **The edit area is a `textarea` whose value is the idea's content**,
  written back by the renderer only when it differs from what the
  control already holds, so typing never loses its insertion point.
- **The list's scroll position is preserved across a re-render** (read
  before the rebuild, written after), and the selected row is then
  scrolled into view with the "nearest" alignment.
- **Undo and redo are handled by the application, not by the text
  control.** The platform's shortcuts are intercepted and their default
  prevented.
- **Code shape:** plain HTML, CSS, and JavaScript in one file, in an
  immediately-invoked strict-mode function; no framework, no build, no
  external references of any kind, so the file works over `file://`.
- **Accessibility:** panes carry `aria-label`s; the message area and its
  three buttons carry them too; nothing further (no keyboard navigation
  of the list).

These have now been taken by three implementations and remain the
candidates for workbench ADRs that
[note/decision-guides.md](decision-guides.md) foresees. No ADR is
written here: an ADR records a decision that has been taken, and this
one is Jonathan's to take.

## New in implementation 3

- **"Blank" replaces "empty" as the model's predicate.** An idea is
  blank when its content is empty after leading whitespace is stripped.
  Because stripping happens at every list update, at rest an idea's
  content is either the empty string or starts with a visible
  character, so "blank" and "content is `''`" coincide everywhere except
  inside a list update, before the stripping loop has reached the idea.
- **The title is simply the first line.** Implementation 2's stand-in
  title (the first line with visible content, greyed, used as the sort
  key) is removed, with its `placeholder-title` class and its test hook.
  The Edit ideas use case states the reason: leading whitespace, a
  leading newline included, is stripped, so "there is no 'blank first
  line with content below' case".
- **`listUpdate(causedByEdit)` is one function** implementing the use
  case's algorithm in its order: strip the leading whitespace of every
  idea; where the stripped idea is the active one, move the insertion
  point left by the amount removed (never before the start), rewrite the
  current history entry, and — only when the update was caused by my
  editing — show the message; delete every blank idea that is not
  active; re-sort; keep the selection and scroll it into view. It is the
  only place any of that happens, and it is called from the edit
  handler, from undo and redo, from the load-test-data control, and
  whenever the active idea changes.
- **The active idea is the selected idea.** The use case's "active" is
  not a second piece of state; `selectedId` is it. Leaving is expressed
  as: change `selectedId`, then run a list update, which deletes the
  idea just left if it is blank. There is no separate "delete on
  leaving" function, which is why loading test data — not a change of
  selection — cannot delete the active blank idea.
- **`beforeinput` captures the pre-change state** (value, selection
  start and end, `inputType`, `data`) and `input` classifies the change
  against it. Three classes, matching the three the use case's algorithm
  distinguishes: a single typed character (collapsed selection, and
  `insertText` carrying one character, or `insertLineBreak` /
  `insertParagraph`, which is a typed newline); a single-character
  deletion (collapsed selection, `deleteContentBackward` or
  `deleteContentForward`); and everything else — pastes, cuts, drops,
  platform replacements, word deletions, deletions of a selection,
  multi-character inserts from an input method — as one atomic change,
  which is what the use case says a paste, a cut, a replacement, or the
  deletion of a selection is.
- **The control's own history never runs.** `historyUndo` and
  `historyRedo` input types are cancelled in `beforeinput`, so a
  platform gesture reaches the application's history the same way a
  shortcut does, or does nothing.
- **The undo history is the algorithm's, transcribed.** `history` is a
  list of `{ content, start, end }` snapshots with `history[0]` the text
  at selection, `index` the current position, and `run` the open run.
  The algorithm's `run.entry` is an alias for `history[index]` here:
  where it writes `run.entry = snapshot()` the implementation writes
  `history[index] = snapshot()`, which is what makes `closeRun`'s
  comparison of `run.entry` with `history[index - 1]` meaningful.
- **A deletion run tracks its removed range in the coordinates of the
  text as it was when the run opened.** The run keeps that text's units
  and the half-open range `[lo, hi)` it has removed from it; a position
  `j` in the current text maps back to `j < lo ? j : j + (hi − lo)`. The
  run extends only when the mapped position is contiguous with the range
  (`lo − 1` or `hi`) and falls in the same unit as the characters
  already removed. That is a direct rendering of the use case's "not in
  the same unit as the characters the run has removed (units taken from
  the text as it was when the run opened)", and it gives the same
  answer for backspace, forward delete, and the two mixed.
- **Stripping during a deletion run makes the run stale**, and the next
  deletion opens a new one. The run's bookkeeping is stated against the
  text as it was when the run opened; stripping changes that text by
  means other than the run, so the mapping above would no longer hold.
  The observable behavior of the use case's edge case 18 is unaffected:
  the deletion that causes the strip is still one entry.
- **A run is closed when the insertion point moves**, detected on
  `keyup`, `pointerup`, and `select` by comparing the control's
  selection with where the run left it. The document-level
  `selectionchange` event is deliberately not used: whether it fires
  before or after `input` differs between engines, and a run closed by
  its own typing would make every character its own undo entry. The
  comparison is also the safety net — a character typed anywhere but at
  the run's end opens a new run whether or not the move was observed.
- **Messages are an in-memory list of `{ text, time }`,** newest last,
  with the current message a reference to the newest. Dismissing clears
  the current message and leaves the list alone, which is how "a message
  goes away either when the × is pressed or when the next message
  arrives" and "identical messages are separate entries" hold at the
  same time. The list is rendered newest first from the same array.
- **The message list is a panel inside the message area**, shown and
  hidden with the `hidden` attribute and positioned above it, so
  opening it changes nothing about the panes' layout.

## Decisions forced by the use cases being silent or in tension

- **"One line high" against the 44 px touch target.** Resolved in
  [note/ui-decisions-3.md](ui-decisions-3.md): the area is 44 px high
  and holds one line of text.
- **The insertion point is a range, not a point.** The algorithm speaks
  of one insertion point; a text control has an anchor and a focus. Both
  ends are stored in every snapshot and both are moved left by the
  amount stripped, bounded at zero. Anything else would lose a selection
  across an undo.
- **Where the insertion point goes when an existing idea is selected.**
  The use cases fix it only for New. The start, for the reason recorded
  in the UI decisions.
- **A whitespace-only idea cannot exist at rest.** The Initial UI use
  case says an idea containing only whitespace shows as "(empty)" and
  that selecting it shows "its literal content (nothing, or the
  whitespace)". With the Edit ideas use case in force, such an idea is
  stripped to nothing at the next update and then deleted unless it is
  active, and an active blank idea's content is the empty string. So the
  "or the whitespace" case is unreachable in implementation 3. This is a
  consequence of the two use cases together, not a choice made here; it
  is recorded so that the unreachable criterion is not quietly marked
  passed. The Initial UI sentence remains correct for an implementation
  of that use case alone.
- **Word deletions are atomic.** The use case names typed runs,
  single-character deletion runs, and "a single paste, cut, or
  replacement". A platform word-delete (`deleteWordBackward` and its
  kin) is one act by the user and is treated like the deletion of a
  selection: one entry. Flagged because the use case's list does not
  mention it.

## Open

- **Delivery to the device.** Unchanged from implementation 2:
  attaching the file in the working session is the route used, because a
  raw GitHub download gains a `.txt` extension on iPadOS. A durable
  route — a hosted page, a release asset, GitHub Pages — is still
  undecided, and is the subject of the delivery guide that
  [note/decision-guides.md](decision-guides.md) foresees.
