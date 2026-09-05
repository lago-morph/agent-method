---
id: note-test-method-2
type: note
title: Implementation 2 — test method
links:
  related-to:
    - note-implementation-record-2.md
    - note-test-method-definition.md
    - note-automated-checks-2.md
---

Decisions of implementation 2, made while building it. The
implementation record
([note-implementation-record-2.md](note-implementation-record-2.md))
keeps one line per area and links here; this note holds the detail.
Guide: [note-test-method-definition.md](note-test-method-definition.md).
The automated checks themselves are specified in
[note-automated-checks-2.md](note-automated-checks-2.md).

## The guide's questions, answered

1. **Automated, manual, or both?** Both: a script run before delivery,
   and the real device at the checkpoint. *Repeated unchanged from
   implementation 1.*
2. **Harness and engine?** Playwright 1.56.1 with headless Chromium, the
   only engine installed in the working environment. WebKit is preferred
   because the target is Safari; no WebKit build is present and none was
   installed. *Repeated unchanged, including the gap.*
3. **Sizes and emulation?** iPad landscape 1024 × 768 and portrait
   768 × 1024, both with touch and mobile emulation. *Repeated
   unchanged.*
4. **How is the implementation loaded?** Over `file://` from the
   script's own directory, exactly as the user opens it. *Repeated
   unchanged.*
5. **Where do scripts live and how are they run?**
   `implementations/2/verify.js`, run with
   `NODE_PATH="$(npm root -g)" node verify.js [output-dir]`, which is in
   the script's header comment. *Repeated unchanged.*
6. **Output and pass rule?** Named boolean checks as JSON, then a
   `PASS` or `FAIL: names` line, then the screenshot directory; exit
   code 0 or 1. Screenshots go to a directory outside the repository.
   *Repeated unchanged.*
7. **What does a person check before delivery?** One look at the
   screenshots per orientation. *Repeated unchanged.*
8. **What evidence goes in the PR?** The list of checks and their
   results, plus the known gaps. *Repeated unchanged.*
9. **What is left to the checkpoint?** Everything that needs the real
   device: touch feel, the on-screen keyboard and whether the edit area
   stays clear of it, the platform's copy, cut, and paste, the
   platform's own undo gesture, and appearance. *Repeated unchanged,
   extended with the editing items.*

## Test hooks

The implementation exposes stable element ids and classes for the checks
to locate the panes, rows, selection, placeholder rows, the text
control, and the four commands; the checks never locate anything by
screen position. Two hooks changed shape from implementation 1 because
the idea text area became editable; both changes are tabulated in
[note-automated-checks-2.md](note-automated-checks-2.md), which is the
contract.

## Quality checks beyond the UI checks

None. No unit tests, type checking, static analysis, or integration
tests; the automated checks are UI-level, end-to-end checks and double
as the acceptance criteria. This repeats implementation 1's answer for
the same reason: the implementation is one file with no modules to
integrate and no build to fail, and the method has no execution
materials for those kinds yet. Guide:
[note-quality-standards-definition.md](note-quality-standards-definition.md).

## Real-device check

Jonathan, on the iPad, at the checkpoint. Nothing here was run in Safari
or WebKit; Chromium stands in for it and the gap is known. Editing makes
that gap wider than it was for implementation 1, because text input,
the on-screen keyboard, and the platform's own undo behave differently
in WebKit than in Chromium — the automated result should be read as
"the behavior is right in the stand-in engine", not "it is right on the
device".

## Evidence

The checks and their results are summarized where the implementation is
handed over, together with the known gaps; the automated results fill
the Chromium column of
[note-acceptance-criteria-2.md](note-acceptance-criteria-2.md).
