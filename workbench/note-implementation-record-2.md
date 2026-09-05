---
id: note-implementation-record-2
type: note
title: Implementation record 2 — single-page HTML, initial UI and editing
links:
  depends-on:
    - use-case-initial-ui.md
    - use-case-edit-ideas.md
  related-to:
    - note-implementation-record-definition.md
    - note-implementation-standards.md
    - note-decision-guides.md
    - note-ui-standards-definition.md
    - note-test-method-definition.md
    - note-acceptance-criteria-definition.md
    - note-test-data-definition.md
    - note-quality-standards-definition.md
    - note-ui-decisions-2.md
    - note-implementation-structure-2.md
    - note-test-method-2.md
    - note-acceptance-criteria-2.md
    - note-test-data-2.md
    - note-automated-checks-2.md
---

Implementation 2 implements a version of the spec consisting of the
ratified Initial UI and Edit ideas use cases.

## Decisions

- **Use cases included:** [use-case-initial-ui.md](use-case-initial-ui.md)
  and [use-case-edit-ideas.md](use-case-edit-ideas.md).
- **Target execution environment:** a single-page HTML file, opened
  directly (no server) in Safari on an iPad — unchanged from
  implementation 1.
- **UI method:** web app in the browser, usable by touch — unchanged.
- **Implementation language:** HTML, CSS, and JavaScript in a single
  file; no build step, no external dependencies — unchanged.
- **Persistent storage:** none — memory only. Neither included use case
  specifies saving, and the "load test data" control still provides
  content.
- **Build and installation method:** none — the file is opened directly
  in the browser.
- **UI design:** the three-pane layout as the Initial UI use case
  describes, with the idea text area now an editable plain-text control,
  and the New, Undo, and Redo commands as buttons in the header bar
  alongside the scaffolding one — [note-ui-decisions-2.md](note-ui-decisions-2.md).
- **Logging requirements:** none for this implementation.

## Decisions made while building

The use cases and the decisions above left the following open; each was
decided while building. The record keeps one line per area and links to
the structured note that holds the detail, per
[note-decision-guides.md](note-decision-guides.md).

- **UI:** implementation 1's answers repeated unchanged, plus the four
  header commands (New primary, Undo, Redo, Load test data secondary),
  an edit area that fills its pane and scrolls itself, and rows standing
  in for a missing title greyed like "(empty)" —
  [note-ui-decisions-2.md](note-ui-decisions-2.md).
- **Implementation structure:** implementation 1's model, identity,
  ordering, rendering, and code shape repeated unchanged, plus the undo
  history as snapshots with typed runs coalesced, deletion on leaving,
  and the list's scroll position preserved across re-renders —
  [note-implementation-structure-2.md](note-implementation-structure-2.md).
- **Test method:** Playwright with headless Chromium at both iPad
  orientations, one visual review of screenshots, the real-device check
  by Jonathan; no quality checks beyond the UI checks —
  [note-test-method-2.md](note-test-method-2.md); the checks are
  specified in [note-automated-checks-2.md](note-automated-checks-2.md).
- **Acceptance criteria:** implementation 1's rows carried over verbatim
  plus one row per sentence of the Edit ideas use case; all automated
  rows pass in Chromium; the iPad column is the checkpoint —
  [note-acceptance-criteria-2.md](note-acceptance-criteria-2.md).
- **Test data:** the 19-idea set of implementation 1 reused unchanged, as
  the Edit ideas use case directs; the guide's open questions about where
  the set lives are answered provisionally —
  [note-test-data-2.md](note-test-data-2.md).
- **Delivery to the device:** the file is handed over as a file
  attachment in the working session, the only route observed to keep the
  `.html` extension on iPadOS. A durable route (a hosted page, a release
  asset) is still undecided; recorded in
  [note-implementation-structure-2.md](note-implementation-structure-2.md).
- **Known gaps:** not verified in Safari or WebKit (no WebKit build is
  installed in the working environment and none was installed); the
  on-screen keyboard, touch feel, and appearance are checkpoint items,
  not automated; no dark mode; no layout change for narrow widths;
  platform autocorrect and the platform's own undo gesture are untested
  against the application's undo history.

## Artifacts

Everything implementation 2 produces lives in `implementations/2/`:

- `idea-workbench.html` — the implementation.
- `verify.js` — the automated checks, derived from
  [note-automated-checks-2.md](note-automated-checks-2.md); how to run it
  is in its header comment. Its screenshots are not kept in the
  repository.
