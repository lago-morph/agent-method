---
id: test-method-4
type: note
title: Implementation 4 — test method
links:
  related-to:
    - note/implementation-record-4.md
    - note/test-method-definition.md
    - note/automated-checks-4.md
---

Decisions of implementation 4, made while building it. The
implementation record
([note/implementation-record-4.md](implementation-record-4.md))
keeps one line per area and links here; this note holds the detail.
Guide: [note/test-method-definition.md](test-method-definition.md).
The automated checks themselves are specified in
[note/automated-checks-4.md](automated-checks-4.md).

## The guide's questions, answered

1. **Automated, manual, or both?** Both: a script run before delivery,
   and the real device at the checkpoint. *Repeated unchanged from
   implementations 1 through 3.*
2. **Harness and engine?** Playwright 1.56.1 with headless Chromium, the
   only engine installed in the working environment (`/opt/pw-browsers`
   holds Chromium builds and no WebKit build). WebKit is preferred
   because the target is Safari; none was installed, and nothing was
   installed for this run. *Repeated unchanged, including the gap.*
3. **Sizes and emulation?** iPad landscape 1024 × 768 and portrait
   768 × 1024, both with touch and mobile emulation. Every check runs in
   both. *Repeated unchanged.*
4. **How is the implementation loaded?** Over `file://` from the
   script's own directory. *Repeated unchanged.*
5. **Where do scripts live and how are they run?**
   `implementations/4/verify.js`, run with
   `NODE_PATH="$(npm root -g)" node verify.js [output-dir]`. *Repeated
   unchanged.*
6. **Output and pass rule?** Named boolean checks as JSON — an
   `inspection` object plus one per orientation — then a `PASS` or
   `FAIL: names` line, then the screenshot directory; exit code 0 or 1.
   *Repeated unchanged.*
7. **What does a person check before delivery?** One look at the
   screenshots per orientation. *Repeated unchanged.*
8. **What evidence goes in the PR?** The list of checks and their
   results, plus the known gaps. *Repeated unchanged.*
9. **What is left to the checkpoint?** Everything implementation 3 left
   (touch feel, the on-screen keyboard, the platform's copy/cut/paste
   and its own undo gesture, autocorrect, appearance), extended with
   this implementation's own additions: whether the message list
   genuinely reads as "opens empty" rather than looking broken; whether
   a word split across lines with a hyphen looks right and reads
   naturally, at a real line width and with the platform's own text
   rendering and hyphen glyph; and whether the very slight
   caret/character drift noted in
   [note/implementation-structure-4.md](implementation-structure-4.md)
   ("Decisions forced by the use case being silent or in tension") is
   ever actually noticeable while typing inside a long unbroken run;
   whether the selection band, painted by the invisible layer over the
   display layer, looks as it did in implementation 3 in Safari; and
   whether any long word appears cut off at the right edge, which is
   what a canvas measurement narrower than the real rendering would
   produce (the display layer clips rather than wraps).
10. **Which test hooks change from the previous implementation, and
    where is each change recorded?** One hook is removed, two are
    added; every change is a row in the hooks table of
    [note/automated-checks-4.md](automated-checks-4.md). The removal
    (`#message-entries li.none`) follows from the spec revision — the
    list opens empty now, so there is no placeholder row to find — not
    from an implementation choice.

## Test hooks

The implementation exposes stable element ids and classes for the
checks to locate the panes, rows, selection, blank rows, the two
right-pane layers, the four commands, the message area, and the message
list; the checks never locate anything by screen position. Specific
test ideas are located by exact visible text where the text is unique,
and by the row's `data-id` attribute where editing can move an idea
relative to identically-titled siblings (see
[note/automated-checks-4.md](automated-checks-4.md), "Decisions made
while writing the checks"). The hooks table is in
[note/automated-checks-4.md](automated-checks-4.md), which is the
contract.

## Mutation-tested before being trusted

Following implementation 3's addition to this guide's question 11:
three deliberate faults were introduced into a scratch copy of the
implementation outside the repository, each targeting one of this
implementation's three behavior changes — comparing only the title
instead of the entire content when ordering; reintroducing the "No
messages" placeholder row; and disabling word-splitting altogether — and
the run was confirmed to fail each time, naming the checks each fault
broke (2, 6, and 8 checks respectively; see
[note/automated-checks-4.md](automated-checks-4.md)). The scratch copies
were discarded after.

## Quality checks beyond the UI checks

None. No unit tests, type checking, static analysis, or integration
tests; the automated checks are UI-level, end-to-end checks and double
as the acceptance criteria. This repeats implementations 1 through 3's
answer for the same reason: one file, no modules to integrate, no build
to fail, and the method has no execution materials for those kinds yet.
Guide:
[note/quality-standards-definition.md](quality-standards-definition.md).

The word-splitting logic (`hyphenate`, `paneContentWidth`,
`updateDisplay`) is, like implementation 3's undo-grouping rules, a
piece of internal logic a unit test would have a natural subject for; it
is covered end-to-end instead, through the checks, for the same
single-file no-build reason recorded there.

## Real-device check

Jonathan, on the iPad, at the checkpoint. Nothing here was run in Safari
or WebKit; Chromium stands in for it and the gap is known — and matters
more for this implementation than for 3, because the word-splitting
overlay relies on `<canvas>` text measurement and native line-breaking
around a soft hyphen agreeing closely enough with the interactive
layer's own wrapping, and font metrics and line-breaking can differ
between engines. The failure mode is silent: a word the canvas
under-measures is clipped at the display layer's right edge, not
wrapped, while the interactive layer beneath still wraps it.

## Evidence

The checks and their results are summarized where the implementation is
handed over, together with the known gaps; the automated results fill
the Chromium column of
[note/acceptance-criteria-4.md](acceptance-criteria-4.md).
