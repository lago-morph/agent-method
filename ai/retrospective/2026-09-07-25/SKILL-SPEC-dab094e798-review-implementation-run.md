# Spec: `review-implementation-run`

- **ID**: SKILL-SPEC-dab094e798
- **Source retrospective**: ../2026-09-07-25.md

## Intent

Review the output of a clean-context implementation run without changing it. The run's output is the measurement; the review reproduces its checks, delegates the reading and an independent check to fresh reviewers, extracts the run's metrics, records every finding in the procedure's section for that implementation, and delivers. It earns its place because implementation 4's review did the opposite: it fixed a reviewer's finding in the run's files and the owner had the whole change reverted.

## Trigger

- The implementation subagent's completion notification has arrived.
- The owner says "review", "check the run", or "deliver implementation N".
- Not for: a run still in progress (nothing may touch its files); a delivered implementation (frozen; markup goes to the use cases).

## Inputs

- `N`, the implementation number; `workbench/note/implementation-record-N.md` and `workbench/implementations/N/` as the run left them.
- The run's report file and its transcript path from the notification (tokens, tool uses, duration).
- `ai/procedures/implement-by-subagent.md` (checklist, metrics commands), `ai/procedures/artifact-link-check.md` (third version), `ai/procedures/ui-checks-playwright.md`.

## Outputs

- A section for implementation N in the procedure (metrics row, findings), guide questions where a guide was silent, use-case markup proposals for the owner.
- Nothing changed under `workbench/implementations/N/`, the record, or the notes.
- The PR body's "Verified" and "Known gaps" paragraphs; the file attached and a hosted copy.

## Workflow

1. Read the run's report. Confirm with `git status` and `git diff` that existing artifacts changed only by reciprocal links and the record's own sections.
2. Rerun the delivered check script; the PASS line must reproduce. Run the link validator over `workbench/`.
3. Launch two clean-context reviewers in parallel, both forbidden to modify files: one reads the record, notes, and source against the use cases and reports findings with file:line; one writes and runs a Playwright script from the use-case text only (forbidden to read the run's checks note or script) and reports checks per orientation, failures with the sentence each traces to, and its verdict on each failure (defect or its own assertion error).
4. Extract the run's metrics by grepping the transcript (documents opened, tool mix), never reading it; the report's own "Documents read" list is the authoritative order.
5. Look at one screenshot per orientation.
6. For every finding, decide only where it goes: a guide question, a procedure revision, a line in the procedure's section, or a proposed use-case markup for the owner. Never a change to the run's files, whether or not a use-case sentence backs it.
7. Add the metrics row and the section; deliver (attach the file, publish the hosted copy from the run's file, write the PR body); update the handoff.

## Concrete examples

### Example 1: a finding that stays a finding

The read-through reviewer of implementation 4 reported that `hyphenate` splits a wide word by UTF-16 code unit, so an emoji in such a word renders as two broken glyphs. The correct handling: the use cases put no rule on splitting but length, and the owner later confirmed emoji are out of scope; the finding is one line in the procedure's section and, at most, a proposed use-case markup. What the session did instead, a `graphemes()` function in the HTML, two new checks, and edits to seven notes, was reverted in full.

### Example 2: the independent script's own errors

The independent reviewer's first run failed seven checks. Re-reading the use case showed all seven were assertion errors: `lineHeight` computed to `normal`, searched for U+002D where the implementation uses U+00AD, and a wrong undo expectation that edge case 9 resolves. Final result 78 checks per orientation, PASS. The reviewer's verdicts are part of its report; the session does not re-derive them.

## Anti-patterns

- **Fixing a finding in the run's files** because it is small, or because a harness posture says bot findings are bug reports to push. Implementation 4, commit 7e0c739, reverted in f6acd46.
- **Folding findings into the implementation's notes** on the strength of the old step 8 wording. The notes are the run's output too.
- **Reading the transcript** for metrics; grep it.
- **Publishing the hosted copy from a file other than the run's**; the hosted copy of implementation 4 had to be republished after the revert.

## Acceptance criteria

- [ ] `git diff <run-commit> -- workbench/implementations/N workbench/note/*-N.md` is empty at delivery.
- [ ] The procedure's section for N lists every reviewer finding with where it went.
- [ ] Both reviewers ran with clean context and reported; the session read only their conclusions.
- [ ] The metrics row has tokens, tool mix, minutes, documents opened, checks per orientation, result, ambiguities.

## Files this skill creates / modifies

- `ai/procedures/implement-by-subagent.md` — metrics row and the section for N (until the transcript record moves to its own file).
- `workbench/note/*-definition.md` — new questions only.
- `ai/HANDOFF.md` — state and next step.
- The PR body; the attached file; the hosted copy.
