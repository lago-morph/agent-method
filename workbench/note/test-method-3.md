---
id: test-method-3
type: note
title: Implementation 3 — test method
links:
  related-to:
    - note/implementation-record-3.md
    - note/test-method-definition.md
    - note/automated-checks-3.md
---

Decisions of implementation 3, made while building it. The
implementation record
([note/implementation-record-3.md](implementation-record-3.md))
keeps one line per area and links here; this note holds the detail.
Guide: [note/test-method-definition.md](test-method-definition.md).
The automated checks themselves are specified in
[note/automated-checks-3.md](automated-checks-3.md).

## The guide's questions, answered

1. **Automated, manual, or both?** Both: a script run before delivery,
   and the real device at the checkpoint. *Repeated unchanged from
   implementations 1 and 2.*
2. **Harness and engine?** Playwright 1.56.1 with headless Chromium, the
   only engine installed in the working environment (`/opt/pw-browsers`
   holds Chromium builds and no WebKit build). WebKit is preferred
   because the target is Safari; none was installed, and nothing was
   installed for this run. *Repeated unchanged, including the gap.*
3. **Sizes and emulation?** iPad landscape 1024 × 768 and portrait
   768 × 1024, both with touch and mobile emulation. Every check runs in
   both. *Repeated unchanged.*
4. **How is the implementation loaded?** Over `file://` from the
   script's own directory, exactly as the user opens it. *Repeated
   unchanged.*
5. **Where do scripts live and how are they run?**
   `implementations/3/verify.js`, run with
   `NODE_PATH="$(npm root -g)" node verify.js [output-dir]`, which is in
   the script's header comment. *Repeated unchanged.*
6. **Output and pass rule?** Named boolean checks as JSON, then a
   `PASS` or `FAIL: names` line, then the screenshot directory; exit
   code 0 or 1. Screenshots go to a directory outside the repository.
   *Repeated unchanged, with one addition:* the JSON gains an
   `inspection` object alongside the two orientations, holding the
   checks made against the implementation's source text rather than
   against a running page (see "Inspection checks are in the script
   now").
7. **What does a person check before delivery?** One look at the
   screenshots per orientation. *Repeated unchanged.*
8. **What evidence goes in the PR?** The list of checks and their
   results, plus the known gaps. *Repeated unchanged.*
9. **What is left to the checkpoint?** Everything that needs the real
   device: touch feel; the on-screen keyboard and whether the edit area
   stays clear of it; the platform's copy, cut, and paste; the
   platform's own undo gesture and whether cancelling it is the right
   call; autocorrect and its replacements against the undo history and
   the stripping rule; and appearance. *Repeated unchanged, extended
   with the message area:* whether a 44 px strip reads as "one line
   high"; whether the `☰` and `×` targets are comfortable; whether the
   message list panel is the right size and in the right place; and
   whether the "Leading whitespace was removed." message is helpful or
   noisy when it appears on every stripped keystroke.
10. **Which test hooks change from the previous implementation, and
    where is each change recorded?** One hook is removed and seven are
    added; every change is a row in the hooks table of
    [note/automated-checks-3.md](automated-checks-3.md), with the
    old and new shape. The removal
    (`#ideas li.placeholder-title`) follows from the spec revision, not
    from an implementation choice: leading-whitespace stripping makes
    the case it marked impossible.

## Test hooks

The implementation exposes stable element ids and classes for the checks
to locate the panes, rows, selection, blank rows, the text control, the
four commands, the message area, and the message list; the checks never
locate anything by screen position. Specific test ideas are located by
exact visible text, which is why test-data titles are stable. The table
is in [note/automated-checks-3.md](automated-checks-3.md), which is
the contract.

## Inspection checks are in the script now

Implementations 1 and 2 settled three criteria "by inspection" — no
clipboard code, no external references, nothing persisted — by a person
reading the file and writing the result into the criteria table.
Implementation 3 makes them checks in the script, run against the
implementation's source text, so that the criteria table is filled from
one run and a later regression is caught. They are reported under
`inspection` rather than per orientation, because they do not depend on
one. This is a change of method, not of criteria: the same three
sentences are being checked, by a pattern match rather than by a
reading, and a pattern match is the weaker instrument — it would miss
clipboard code written in a way the pattern does not describe. It is
recorded here so the weakening is visible.

## Quality checks beyond the UI checks

None. No unit tests, type checking, static analysis, or integration
tests; the automated checks are UI-level, end-to-end checks and double
as the acceptance criteria. This repeats implementations 1 and 2's
answer for the same reason: the implementation is one file with no
modules to integrate and no build to fail, and the method has no
execution materials for those kinds yet. Guide:
[note/quality-standards-definition.md](quality-standards-definition.md).

The undo-grouping rules of the revised Edit ideas use case are the first
piece of this software with enough internal logic that a unit test would
have a subject — `unitsOf`, the run bookkeeping, the strip. They are
covered end-to-end instead, through the checks, because the single-file
no-build rule leaves nowhere for a unit test to live. That is the first
concrete case for the quality-standards guide's "unit tests" kind, and
it is recorded here rather than answered.

## Real-device check

Jonathan, on the iPad, at the checkpoint. Nothing here was run in Safari
or WebKit; Chromium stands in for it and the gap is known. Editing and
the message area make that gap wider still: text input, the on-screen
keyboard, autocorrect, and the platform's own undo behave differently in
WebKit than in Chromium, and the undo grouping this implementation adds
is driven entirely by `beforeinput` and its `inputType` values, whose
exact values for some gestures differ between engines. The automated
result should be read as "the behavior is right in the stand-in engine",
not "it is right on the device".

## Evidence

The checks and their results are summarized where the implementation is
handed over, together with the known gaps; the automated results fill
the Chromium column of
[note/acceptance-criteria-3.md](acceptance-criteria-3.md).
