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

## Artifacts

Everything implementation 1 produces lives in `implementations/1/`,
starting with the HTML file itself.
