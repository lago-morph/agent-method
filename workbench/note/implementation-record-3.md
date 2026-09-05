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
