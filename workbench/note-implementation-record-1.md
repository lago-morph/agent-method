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
    - note-automated-checks-1.md
    - note-quality-standards-definition.md
    - note-ui-decisions-1.md
    - note-implementation-structure-1.md
    - note-test-method-1.md
    - note-acceptance-criteria-1.md
    - note-test-data-1.md
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

Added 2026-09-05 at Jonathan's direction. The use case and the
decisions above left the following open; each was decided while
building. The record keeps one line per area and links to the
structured note that holds the detail, per
[note-decision-guides.md](note-decision-guides.md).

- **UI:** host-platform conventions, panes 1 : 2 : 4, light palette
  only, 44 px touch targets, only the panes scroll —
  [note-ui-decisions-1.md](note-ui-decisions-1.md).
- **Implementation structure:** an idea is `{ id, content }` with the
  title derived from the first line; never-reused integer ids; full
  re-render on every change; one file, no framework —
  [note-implementation-structure-1.md](note-implementation-structure-1.md).
- **Test method:** Playwright with headless Chromium at both iPad
  orientations, one visual review of screenshots, the real-device
  check by Jonathan; no quality checks beyond the UI checks —
  [note-test-method-1.md](note-test-method-1.md); the checks are
  specified in [note-automated-checks-1.md](note-automated-checks-1.md).
- **Acceptance criteria:** one row per use-case sentence; all pass in
  Chromium; the iPad column is the checkpoint —
  [note-acceptance-criteria-1.md](note-acceptance-criteria-1.md).
- **Test data:** 19 ideas per load, each with a named reason, titles
  stable — [note-test-data-1.md](note-test-data-1.md).
- **Delivery to the device:** open. Raw GitHub downloads gain a
  `.txt` extension on iPadOS; the file was attached in the working
  session and a copy hosted as a page instead.
- **Known gaps:** not verified in Safari or WebKit; no dark mode; no
  layout change for narrow widths; the blank-first-line case is
  decided by the Edit ideas use case.

## Artifacts

Everything implementation 1 produces lives in `implementations/1/`:

- `idea-workbench.html` — the implementation.
- `verify.js` — the automated checks, derived from
  [note-automated-checks-1.md](note-automated-checks-1.md); how to run
  it is in its header comment. Its screenshots are not kept in the
  repository.
