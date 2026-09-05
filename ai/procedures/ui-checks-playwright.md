# UI checks with Playwright on a single-file browser implementation

**Status:** working document, non-normative. Retrospective.
**Observed in:** implementation 1, PR #15 (first run, ad hoc script in
the scratch directory) and PR #16 (script moved into
`workbench/implementations/1/verify.js`, specified by
`workbench/note-automated-checks-1.md`); implementation 2 (a fresh
agent following this procedure, then the reviewer's independent script
written from the use case rather than from the checks note).

## What was done

1. **Discovered the environment** rather than assuming it:

   ```sh
   which node && node --version
   ls /opt/pw-browsers            # chromium, chromium_headless_shell present
   npm ls -g playwright           # playwright@1.56.1, installed globally
   ```

   Playwright was global, so scripts needed `NODE_PATH="$(npm root -g)"`
   to `require('playwright')`. No `npm install` was run; nothing was
   added to the repository.

2. **Wrote one plain Node script, no test framework.** Shape:
   - `chromium.launch()`, then for each viewport a fresh
     `browser.newContext({ viewport, hasTouch: true, isMobile: true })`
     and a page.
   - `page.on('pageerror', …)` registered **before** `page.goto`.
   - `page.goto('file://' + absolute path)` — the file opened exactly
     as the user opens it.
   - Checks as named booleans collected into one object per viewport,
     computed with `page.$$eval` / `page.$eval` / `page.evaluate`
     against ids and classes the implementation exposes; specific test
     ideas located by exact visible text
     (`#ideas li:has-text("A very large idea")`).
   - `page.screenshot({ path })` at named points, into a directory
     outside the repository.
   - JSON of results, a `PASS` / `FAIL: names` line, the screenshot
     directory, and `process.exitCode`.

3. **Ran it** from the implementation's directory:

   ```sh
   cd workbench/implementations/1
   NODE_PATH="$(npm root -g)" node verify.js
   ```

   Runtime was a few seconds per orientation. On the first run the
   results were read in full; on the rerun after moving the script,
   only the `PASS` line and the screenshot path were read
   (`| tail -3`).

4. **Looked at the screenshots once**, one per orientation at a
   representative point (large idea selected; list scrolled), using
   the image-reading tool. Purpose: confirm the layout reads as the use
   case describes. No second look, no pixel comparison.

5. **Reported in the PR body**: a "Verified" paragraph listing what was
   checked and at which sizes, and a "Known gaps" statement (not run in
   Safari or WebKit). Later, `note-acceptance-criteria-1.md` carried the
   same facts as a table with a Chromium column and an empty iPad
   column.

### Added by implementation 2

6. **Two sequences separated by a page reload** once a behavior
   changes the row count for every later step (deletion on leaving).
   Sequence A keeps the previous implementation's counts so results
   stay comparable; sequence B starts from a known state.
7. **Diagnose before changing anything.** The one failing check of the
   fresh agent's run (`typingAtEndScrollsEditorToCaret`) and the one
   failing check of the reviewer's run (a row expected first that
   sorted second) were both wrong assertions, not wrong
   implementations. Dump the inputs of the failing assertion first
   (row texts and classes, scroll metrics), then decide which side is
   wrong. Neither implementation needed a change.
8. **Independent review script.** The reviewer wrote a second script
   from the use case text alone — not from the automated-checks note —
   and ran it at both sizes. Where it agreed with the checks note it
   confirmed the checks; where its expectation differed (new idea
   position, undo step counts) it surfaced the ambiguities the fresh
   agent had reported. Observations were kept as numbers (undos
   needed: 2 for "Bus "; 12 for six words), not only booleans, so the
   granularity decision is visible in the output.
9. **Rerun the delivered script before reviewing anything else** — a
   PASS reproduced independently is the baseline for the review.

## What was not done

- No WebKit run: `/opt/pw-browsers` had no WebKit build and installing
  one was not attempted.
- No run on the real device; that is Jonathan's checkpoint.
- No continuous integration; the repository has none.
- No unit tests, type checking, or lint on the implementation's
  JavaScript.

## Pitfalls observed

- The check script started life in the session's scratch directory and
  would have been lost; it became an implementation artifact only when
  Jonathan asked for the test method to be captured. Write it into
  `implementations/<N>/` from the start.
- Expected counts (19 per load, 57 after three) came from reading the
  test data in the implementation, not from an artifact; they are now
  in `note-test-data-1.md` and `note-automated-checks-1.md`. Derive
  expected values from the data artifact, not from the code under test.
- The `NODE_PATH` requirement is environment-specific and easy to
  forget; it lives in the script's header comment for that reason.
- Locale ordering sorts a space before letters, so "A very large idea"
  precedes "Aardvark"; an assertion that expects a typed title to be
  "first non-empty row" is wrong whenever an earlier title has a space
  at the right position. Derive expected positions from the sort rule,
  not from intuition.
- A textarea exposes no caret geometry; any "insertion point stays
  visible" check is written against the scroller and must allow for
  bottom padding.
- Playwright's `keyboard.type` fires one `input` event per character;
  the undo-granularity rule decides how many history entries that
  makes, so expected undo counts depend on that rule.

## Notes for formalizing

- A reference procedure could reduce to: discover engine availability;
  write checks from the automated-checks note; run at every viewport
  the record implies; view one screenshot per viewport; fill the
  acceptance-criteria table; state gaps.
- The engine-availability step is the part most likely to differ
  between working environments; a skill should check for WebKit first
  when the target is Safari.
