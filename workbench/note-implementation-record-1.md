---
id: note-implementation-record-1
type: note
title: Implementation record 1 — single-page HTML, initial UI
links:
  depends-on:
    - use-case-initial-ui.md
  related-to:
    - note-implementation-record-definition.md
    - note-implementation-standards.md
    - note-decision-guides.md
    - note-ui-standards-definition.md
    - note-test-method-definition.md
    - note-acceptance-criteria-definition.md
    - note-test-data-definition.md
---

Implementation 1 implements a version of the spec consisting of the
ratified Initial UI use case.

## Decisions

- **Use cases included:**
  [use-case-initial-ui.md](use-case-initial-ui.md) only.
- **Target execution environment:** a single-page HTML file, opened
  directly (no server) in Safari on an iPad.
- **UI method:** web app in the browser, usable by touch.
- **Implementation language:** HTML, CSS, and JavaScript in a single
  file; no build step, no external dependencies.
- **Persistent storage:** none — memory only. The Initial UI use case
  has no save; the "load test data" button provides content.
- **Build and installation method:** none — the file is opened directly
  in the browser.
- **UI design:** the three-pane layout as the use case describes;
  visual details get settled by using it and marked up at the
  checkpoint.
- **Logging requirements:** none for this implementation.

## Decisions made while building

Added 2026-09-05 at Jonathan's direction, after the implementation was
built and merged (PR #15). The use case and the decisions above left
everything below open; it was decided while building. It is recorded
so that rebuilding this implementation from its spec gives the same
result, and so that each kind of decision can be captured by a proper
artifact later. [note-decision-guides.md](note-decision-guides.md)
describes the pattern; each area below links to the note that
defines its future artifact.

### UI

Guide: [note-ui-standards-definition.md](note-ui-standards-definition.md).

- **Platform conventions:** follow the host platform (iPadOS Safari).
  System font stack (`-apple-system, system-ui, …`), 17 px base size,
  line height 1.4 in the text pane.
- **Chrome:** one header bar holding the application name ("Idea
  Workbench", left) and the scaffolding button ("Load test data",
  right). Nothing else on screen but the three panes.
- **Pane proportions:** left : middle : right = 1 : 2 : 4 of the
  width, the same in landscape and portrait. Panes are separated by
  1 px dividers; the empty left pane is drawn as a pane, not hidden.
- **Palette (light only, no dark mode):** text `#1c1c1e`; muted text
  for placeholders `#8e8e93`; pane background white; chrome background
  `#f2f2f5`; dividers `#c8c8cc`; row separators `#ececef`; selected
  row background `#d9e7ff`; button `#0a66ff` with white text.
- **Touch:** every row and button is at least 44 px tall; the tap
  highlight is suppressed; list rows cannot be text-selected; the
  button dims while pressed.
- **List rows:** one line each, 10 px vertical and 12 px horizontal
  padding, hairline separator beneath, ellipsis truncation.
- **Text pane:** 12 px × 16 px padding; whitespace preserved as typed;
  long unbroken runs wrap anywhere rather than overflow.
- **Scrolling:** only the three panes scroll; the page itself never
  does. Each pane contains its own overscroll. Safe-area insets are
  respected and the layout uses the dynamic viewport height.
- **Wording:** sentence case on buttons; the placeholder is literally
  "(empty)" as the use case says.

### Implementation structure

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

### Test method

Guide: [note-test-method-definition.md](note-test-method-definition.md).

- **Automated checks** in `implementations/1/verify.js`, run with
  Playwright and headless Chromium, loading the file over `file://`
  at iPad landscape (1024 × 768) and portrait (768 × 1024) with touch
  emulation. Each check is named for the use-case sentence it verifies
  and prints as JSON; the run ends PASS or FAIL. Screenshots are
  written outside the repository.
- **Visual review:** one look at the screenshots per orientation for
  layout sanity before delivery.
- **Real-device check:** Jonathan, on the iPad, at the checkpoint.
  Nothing here was run in Safari or WebKit; Chromium stands in for it
  and the gap is known.
- **Evidence in the PR:** the checks and their results are summarized
  in the PR body; the PR is the record of what was verified.

### Acceptance criteria

Guide: [note-acceptance-criteria-definition.md](note-acceptance-criteria-definition.md).

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

### Test data

Guide: [note-test-data-definition.md](note-test-data-definition.md).

The set embedded in the file, 19 ideas per load, each present for a
named reason:

- **Fifteen short ideas** with varied first letters and mixed case,
  some with a second line to show that only the first line is the
  title: apple pie recipe; Apple crumble; Zebra crossing near the
  school; Banana bread; banana split for the kids; Quantum garden;
  mango sorbet; Elephant memory app; kite festival weekend; Yak wool
  socks; cherry blossom walk; Dinosaur museum trip; umbrella stand by
  the door; Walnut desk plans; lighthouse tour. The pairs "Apple
  crumble" / "apple pie recipe" and "Banana bread" / "banana split"
  interleave only under case-insensitive ordering, so a wrong sort is
  visible at a glance.
- **One wide idea** whose first line runs to about 230 characters,
  with a short second line, for truncation.
- **One large idea** ("A very large idea"): forty numbered paragraphs
  of filler followed by an unbroken run of 216 characters, for
  vertical scrolling and wrap-anywhere.
- **One empty idea** (content `""`) and **one whitespace-only idea**
  (content `"  \n\t \n   "`, spaces, tab, and newlines), for the
  "(empty)" placeholder and literal display.

Titles are stable so that checks can find items by name. The set is
scaffolding: the use case removes the load button once save exists,
and the set then needs a new home.

### Delivery to the device

The record definition's "build and installation method" did not cover
how the file reaches the iPad, and it turned out to matter:
downloading the raw file from GitHub gives it a `.txt` extension that
iPadOS will not let the user remove, so Safari opens it as text. What
worked: attaching the file in the working session for saving to Files,
and publishing a copy as a hosted page for a quick look (the hosted
copy exercises the UI but not "opened directly from a file"). A
durable delivery method is an open decision for the next
implementation.

### Known gaps

- Not verified in Safari or any WebKit browser before delivery.
- No dark mode; no layout change for narrow widths.
- An idea whose first line is blank but has content below shows a
  blank row; the Edit ideas use case decides this case.

## Artifacts

Everything implementation 1 produces lives in `implementations/1/`:

- `idea-workbench.html` — the implementation.
- `verify.js` — the automated checks; how to run it is in its header
  comment. Its screenshots are not kept in the repository.
