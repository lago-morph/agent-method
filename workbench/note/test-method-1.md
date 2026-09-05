---
id: test-method-1
type: note
title: Implementation 1 — test method
links:
  related-to:
    - note/implementation-record-1.md
    - note/test-method-definition.md
    - note/automated-checks-1.md
---

Decisions of implementation 1, made while building it and captured 2026-09-05 at Jonathan's direction. The implementation record ([note/implementation-record-1.md](implementation-record-1.md)) keeps one line per area and links here; this note holds the detail. Guide: [note/test-method-definition.md](test-method-definition.md). The automated checks themselves are specified in [note/automated-checks-1.md](automated-checks-1.md).

- **Automated checks** in `implementations/1/verify.js`, run with
  Playwright and headless Chromium, loading the file over `file://`
  at iPad landscape (1024 × 768) and portrait (768 × 1024) with touch
  emulation. Each check is named for the use-case sentence it verifies
  and prints as JSON; the run ends PASS or FAIL. Screenshots are
  written outside the repository. The full specification of the checks
  — hooks, sequence, expected values, output contract, and the
  decisions behind them — is
  [note/automated-checks-1.md](automated-checks-1.md); the script
  is derived from it.
- **Test hooks:** the implementation exposes stable element ids and
  classes for the checks to locate panes, rows, selection, placeholder
  rows, the text element, and the load control; the checks never
  locate anything by screen position.
- **Visual review:** one look at the screenshots per orientation for
  layout sanity before delivery.
- **Quality checks beyond the UI checks:** none. No unit tests, type
  checking, static analysis, or integration tests; the automated
  checks are UI-level, end-to-end checks and double as the acceptance
  criteria. Guide:
  [note/quality-standards-definition.md](quality-standards-definition.md).
- **Real-device check:** Jonathan, on the iPad, at the checkpoint.
  Nothing here was run in Safari or WebKit; Chromium stands in for it
  and the gap is known.
- **Evidence in the PR:** the checks and their results are summarized
  in the PR body; the PR is the record of what was verified.
