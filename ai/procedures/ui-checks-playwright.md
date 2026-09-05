# UI checks with Playwright on a single-file browser implementation

**Status:** working document, non-normative. Retrospective.
**Observed in:** implementation 1, PR #15 (first run, ad hoc script in
the scratch directory) and PR #16 (script moved into
`workbench/implementations/1/verify.js`, specified by
`workbench/note-automated-checks-1.md`).

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

## Notes for formalizing

- A reference procedure could reduce to: discover engine availability;
  write checks from the automated-checks note; run at every viewport
  the record implies; view one screenshot per viewport; fill the
  acceptance-criteria table; state gaps.
- The engine-availability step is the part most likely to differ
  between working environments; a skill should check for WebKit first
  when the target is Safari.
