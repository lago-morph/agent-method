---
id: implementation-record-4
type: note
title: Implementation record 4 — single-page HTML, the 2026-09-06 use-case revision
links:
  depends-on:
    - use-case/initial-ui.md
    - use-case/edit-ideas.md
  related-to:
    - note/implementation-record-definition.md
    - note/implementation-standards.md
    - note/decision-guides.md
    - note/implementation-record-3.md
    - note/ui-standards-definition.md
    - note/test-method-definition.md
    - note/acceptance-criteria-definition.md
    - note/test-data-definition.md
    - note/quality-standards-definition.md
    - note/ui-decisions-4.md
    - note/implementation-structure-4.md
    - note/test-method-4.md
    - note/acceptance-criteria-4.md
    - note/test-data-4.md
    - note/automated-checks-4.md
---

Implementation 4 implements a version of the spec consisting of the
ratified Initial UI and Edit ideas use cases as revised on 2026-09-06
(PR #21), after the implementation 3 checkpoint: the message list opens
empty, the list button is always present and the dismiss × only with a
message, ordering compares the entire content, the title is truncated
after a partial word, words wider than the right pane are split with
display-only hyphens, and the walk-through gives examples rather than
counts. Implementation 3
([implementation-record-3.md](implementation-record-3.md)) implements
the previous version of the same two use cases.

This record's decisions below are the owner's; they are the input to
the implementation run described in the method's procedures. The run
adds the decisions made while building, in linked per-area notes, and
the list of artifacts.

## Decisions

- **Use cases included:** [initial-ui.md](../use-case/initial-ui.md)
  and [edit-ideas.md](../use-case/edit-ideas.md), as they stand on
  main after PR #21.
- **Target execution environment:** a single-page HTML file, opened
  directly (no server) in Safari on an iPad — unchanged from
  implementations 1 to 3.
- **UI method:** web app in the browser, usable by touch — unchanged.
- **Implementation language:** HTML, CSS, and JavaScript in a single
  file; no build step, no external dependencies — unchanged.
- **Persistent storage:** none — memory only. Neither included use case
  specifies saving; the "load test data" control provides content, and
  the session's messages are discarded when the application is closed,
  as the Initial UI use case says.
- **Build and installation method:** none — the file is opened directly
  in the browser. Delivery to the device follows implementation 3's
  route (the file attached in the working session; a hosted copy for a
  quick look) until a durable route is decided.
- **UI design:** the three-pane layout with the message area beneath
  it, as the Initial UI use case describes; the idea edit area as the
  Edit ideas use case's Interface guidance describes; visual values per
  the previous implementation's UI decisions unless the run records a
  reason to differ.
- **Logging requirements:** none for this implementation. The message
  area is user-facing behavior specified by the use case, not logging.

## Decisions made while building

The use cases and the decisions above left the following open; each was
decided while building. No owner was present, so each is stated as a
decision, with the ones that took a guide default marked as defaults
and the ones no guide had a question for flagged in the notes, per
[note/decision-guides.md](decision-guides.md).

- **UI:** every visual and interaction value repeated unchanged from
  implementation 3; none of this revision's three behavior changes is a
  UI-standards question, so there is nothing new to propose —
  [note/ui-decisions-4.md](ui-decisions-4.md).
- **Implementation structure:** implementation 3's model, identity,
  rendering, and editing/undo machinery repeated unchanged, plus
  ordering that now compares an idea's entire content, a message list
  that renders no row at all when empty, and a two-layer right pane (an
  invisible interactive textarea stacked over a non-interactive display
  `<div>`) that inserts a display-only soft hyphen wherever a word
  measures wider than the pane, so a split is seen but never touches
  the idea's content or what can be copied —
  [note/implementation-structure-4.md](implementation-structure-4.md).
- **Test method:** unchanged from implementation 3 (Playwright with
  headless Chromium at both iPad orientations, one visual review of
  screenshots, the real-device check by Jonathan, no quality checks
  beyond the UI checks), extended with a mutation-testing pass targeted
  at this implementation's three behavior changes —
  [note/test-method-4.md](test-method-4.md); the checks are specified
  in [note/automated-checks-4.md](automated-checks-4.md).
- **Acceptance criteria:** implementation 3's rows carried over verbatim
  where the use-case sentence is unchanged, revised where the
  2026-09-06 revision changed it, and one row per sentence the revision
  added; all automated rows pass in Chromium; the iPad column is the
  checkpoint — [note/acceptance-criteria-4.md](acceptance-criteria-4.md).
- **Test data:** implementation 3's 19-item set reused unchanged, grown
  by three items the revised Initial UI use case's own test-data section
  calls for — a pair of ideas sharing a first line, for whole-content
  ordering, and a single sixty-letter unbroken word, for partial-word
  truncation and hyphen splitting — giving 22 items per load and 20
  rows once the two blank ones are dropped —
  [note/test-data-4.md](test-data-4.md).
- **Delivery to the device:** unchanged from implementation 3 — the file
  is handed over as a file attachment in the working session. A durable
  route is still undecided; recorded in
  [note/implementation-structure-4.md](implementation-structure-4.md).
- **Known gaps:** everything implementation 3 left open (no WebKit run;
  the on-screen keyboard, touch feel, and appearance are checkpoint
  items; the clipboard is not driven; message truncation and message-
  list scrolling are checked against computed style, not observed; no
  dark mode; no layout change for narrow widths; platform autocorrect
  and the platform's own undo gesture are untested), plus two this
  implementation adds: the two right-pane layers can choose slightly
  different break points inside a word already split across several
  lines, so the caret can sit slightly off its apparent neighbour; and
  a word the canvas measurement under-measures would be clipped by the
  display layer rather than wrapped. Neither is observed in Chromium;
  both are checkpoint items —
  [note/implementation-structure-4.md](implementation-structure-4.md),
  "Decisions forced by the use case being silent or in tension".
- **Flagged for the owner:** two of the six changes the 2026-09-06
  revision made to the use cases' wording — the list button always
  present with the dismiss × only alongside a message, and the title
  truncating after a partial word — describe behavior this
  implementation would have produced unchanged from implementation 3
  even without the wording change; they are recorded as new acceptance-
  criteria rows anyway, because the sentences are new in the ratified
  text, per [note/acceptance-criteria-4.md](acceptance-criteria-4.md).
  A third, the walk-through giving examples rather than counts, changes
  no behavior at all.
  The genuine behavior changes — the message list's empty state,
  whole-content ordering, and display-only hyphen splitting — are the
  ones this run actually had to build.

## Artifacts

Everything implementation 4 produces lives in `implementations/4/`:

- `idea-workbench.html` — the implementation.
- `verify.js` — the automated checks, derived from
  [note/automated-checks-4.md](automated-checks-4.md); how to run it
  is in its header comment. Its screenshots are not kept in the
  repository.
