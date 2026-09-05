---
id: implementation-record-3
type: note
title: Implementation record 3 — single-page HTML, initial UI with messages and editing
links:
  depends-on:
    - use-case/initial-ui.md
    - use-case/edit-ideas.md
  related-to:
    - note/implementation-record-definition.md
    - note/implementation-standards.md
    - note/decision-guides.md
    - note/implementation-record-2.md
    - note/ui-standards-definition.md
    - note/test-method-definition.md
    - note/acceptance-criteria-definition.md
    - note/test-data-definition.md
    - note/quality-standards-definition.md
    - note/ui-decisions-3.md
    - note/implementation-structure-3.md
    - note/test-method-3.md
    - note/acceptance-criteria-3.md
    - note/test-data-3.md
    - note/automated-checks-3.md
---

Implementation 3 implements a version of the spec consisting of the
ratified Initial UI and Edit ideas use cases as revised on 2026-09-05
(PR #18): leading-whitespace stripping, blank ideas that exist only
while active, undo grouped by units, New with the insertion point at
the start, the list updated after every change, and the message area.
Implementation 2 ([implementation-record-2.md](implementation-record-2.md))
implements the previous version of the same two use cases.

This record's decisions below are the owner's; they are the input to
the implementation run described in the method's procedures. The run
adds the decisions made while building, in linked per-area notes, and
the list of artifacts.

## Decisions

- **Use cases included:** [initial-ui.md](../use-case/initial-ui.md)
  and [edit-ideas.md](../use-case/edit-ideas.md), as they stand on
  main after PR #18.
- **Target execution environment:** a single-page HTML file, opened
  directly (no server) in Safari on an iPad — unchanged from
  implementations 1 and 2.
- **UI method:** web app in the browser, usable by touch — unchanged.
- **Implementation language:** HTML, CSS, and JavaScript in a single
  file; no build step, no external dependencies — unchanged.
- **Persistent storage:** none — memory only. Neither included use case
  specifies saving; the "load test data" control provides content, and
  the session's messages are discarded when the application is closed,
  as the Initial UI use case says.
- **Build and installation method:** none — the file is opened directly
  in the browser. Delivery to the device follows implementation 2's
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
decided while building. The record keeps one line per area and links to
the structured note that holds the detail, per
[note/decision-guides.md](decision-guides.md). No owner was present, so
each is stated as a decision, with the ones that took a guide default
marked as defaults and the ones no guide had a question for flagged in
the notes.

- **UI:** implementations 1 and 2's answers repeated unchanged, plus the
  message area as a 44 px strip holding one line of text between a list
  button and a dismiss ×, a message list panel opening above it, and the
  removal of implementation 2's greyed stand-in title, which the revised
  use cases make impossible — [note/ui-decisions-3.md](ui-decisions-3.md).
- **Implementation structure:** implementation 2's model, identity,
  ordering, rendering, and code shape repeated unchanged, plus one
  `listUpdate` function transcribing the use case's algorithm, the
  active idea being the selected idea, change classification from
  `beforeinput`, and undo runs that track a deletion's removed range in
  the coordinates of the text as it was when the run opened —
  [note/implementation-structure-3.md](implementation-structure-3.md).
- **Test method:** Playwright with headless Chromium at both iPad
  orientations, one visual review of screenshots, the real-device check
  by Jonathan; the three previously "by inspection" criteria now checked
  by the script against the implementation's source; no quality checks
  beyond the UI checks — [note/test-method-3.md](test-method-3.md); the
  checks are specified in
  [note/automated-checks-3.md](automated-checks-3.md).
- **Acceptance criteria:** implementation 2's rows carried over verbatim
  where the use-case sentence is unchanged, revised where the 2026-09-05
  revision changed it, and one row per sentence the revision added; all
  automated rows pass in Chromium; the iPad column is the checkpoint —
  [note/acceptance-criteria-3.md](acceptance-criteria-3.md).
- **Test data:** the 19-item set of implementation 1 reused unchanged,
  as the Edit ideas use case directs; a load now yields 17 rows because
  the two blank items are deleted, and those items therefore now
  exercise deletion of blank loaded content rather than the placeholder
  display — [note/test-data-3.md](test-data-3.md).
- **Delivery to the device:** unchanged from implementation 2 — the file
  is handed over as a file attachment in the working session, the only
  route observed to keep the `.html` extension on iPadOS. A durable
  route is still undecided; recorded in
  [note/implementation-structure-3.md](implementation-structure-3.md).
- **Known gaps:** not verified in Safari or WebKit (no WebKit build is
  installed in the working environment and none was installed), which
  matters more here because the undo grouping is driven entirely by
  `beforeinput` and its `inputType` values; the on-screen keyboard,
  touch feel, and appearance are checkpoint items, not automated; the
  clipboard is not driven, so paste and cut are exercised only through a
  replacement; no message the implementation can produce is wide enough
  to observe the message area's truncation, and three messages are not
  enough to observe the message list scrolling, so both are checked
  against the computed style instead; no dark mode; no layout change for
  narrow widths; platform autocorrect and the platform's own undo
  gesture are untested against the application's undo history.
- **Flagged for the owner:** the Initial UI use case's "selecting a
  whitespace-only idea shows the whitespace" cannot happen once the Edit
  ideas use case is in force, so that half of the criterion is
  unreachable rather than passing
  ([note/acceptance-criteria-3.md](acceptance-criteria-3.md)); "one line
  high" for the message area and the 44 px touch-target standard are in
  tension, resolved at 44 px
  ([note/ui-decisions-3.md](ui-decisions-3.md)); and the test data set
  has no item with leading whitespace and visible content, so edge case
  3 is unexercised ([note/test-data-3.md](test-data-3.md)).

## Artifacts

Everything implementation 3 produces lives in `implementations/3/`:

- `idea-workbench.html` — the implementation.
- `verify.js` — the automated checks, derived from
  [note/automated-checks-3.md](automated-checks-3.md); how to run it
  is in its header comment. Its screenshots are not kept in the
  repository.
