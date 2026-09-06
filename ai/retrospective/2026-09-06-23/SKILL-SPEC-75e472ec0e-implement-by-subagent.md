# Spec: `implement-by-subagent`

- **ID**: SKILL-SPEC-75e472ec0e
- **Source retrospective**: ../2026-09-06-23.md

## Intent

Run an implementation as a hand-off to a fresh clean-context subagent that receives only the repository's own artifacts, so that each run doubles as a test of whether the artifacts suffice for regeneration; measure the run, review the result independently with Playwright, and fold every ambiguity the subagent reports back into the artifacts. It earns its place because two runs in one session (implementations 2 and 3) produced working, defect-free implementations while exposing twenty-plus specification gaps that no amount of reading by the author had found.

## Trigger

- Direct: "run implementation N", "run it as per procedure", "implement record N", "/implement-by-subagent N".
- Proactive: an implementation record `workbench/note/implementation-record-<N>.md` exists whose owner decisions are complete and the owner has said to run it.
- Negative: do not trigger when the record is still being marked up by the owner; do not trigger to fix a delivered implementation (delivered implementations are never edited; a fix is a new record).

## Inputs

- `N`, the implementation record number. The record already names the use cases covered, the execution environment, and the owner's decisions per area.
- The working procedure `ai/procedures/implement-by-subagent.md` (tiered reading order, prompt template, review checklist, metrics table).
- The model to use for the subagent. The procedure records which model the last run used; the sequence so far is Opus, Opus, then Sonnet.
- A scratchpad path for the subagent's report and for review screenshots, outside the repository.

## Outputs

- `workbench/implementations/<N>/idea-workbench.html` and `verify.js`, written by the subagent.
- Record `<N>` completed by the subagent (the sections the owner left to the implementer) and six per-area notes `workbench/note/{ui-decisions,implementation-structure,test-method,acceptance-criteria,test-data,automated-checks}-<N>.md`.
- The subagent's report at the scratchpad path with sections Documents read (in order), Ambiguities, Decisions, Checks run.
- A new row in the procedure's metrics table (model, tokens, tool uses, minutes, documents opened, checks, result, ambiguities, defects found in review).
- A commit "Implementation N by the subagent procedure (<model>); lessons" and a pull request.

## Workflow

1. Confirm record `N` exists, is linked from the graph, and its owner-decision sections are filled. If any owner section is empty, stop and say which.
2. Build the prompt from the template in the procedure. Hand over only: the record path, the tiered reading order, the forbidden list (`ai/HANDOFF.md`, `ai/PLAN.md`, `ai/lessons/`, `ai/retrospective/`, `archive*/`, `.claude/`, git history), the output paths, and the report path. Do not restate anything the record carries.
3. Dispatch one subagent with the prompt and the chosen model. Record the dispatch time.
4. When it completes, take tokens, tool-use counts, and elapsed minutes from the completion notification. Extract the documents opened from the transcript with the grep commands in the procedure; never read the transcript.
5. Run the subagent's `verify.js` yourself, in both iPad orientations, with the Playwright setup in `ai/procedures/ui-checks-playwright.md`. It must pass.
6. Write an independent review script from the use cases alone, without reading the subagent's checks first. Run it. For every failure, decide from the use case which side is wrong before changing anything.
7. Mutation-test: introduce three deliberate faults into a copy of the HTML and confirm the subagent's checks fail on each.
8. Run the artifact link check on the whole workbench.
9. Read the subagent's Ambiguities section. For each item: if the use case is unclear, note it for the owner; if a guide is unclear, amend the guide; if it is an environment gap, amend the procedure. Do not decide use-case behavior yourself.
10. Add the metrics row to the procedure, commit, push, open the pull request, and list the ambiguities that need the owner's decision in the pull request body.

## Concrete examples

### Example 1: implementation 3 (Opus)

Input: `workbench/note/implementation-record-3.md` with the owner's decisions (reuse implementation 2's visual values, unit-based undo, message area). Prompt: record path plus tiers 1 to 6 and the forbidden list. Run: about 227 k tokens, 49 tool uses, 22 minutes, 33 repository documents opened in tier order. Output: HTML with `#messages`, `#message-text`, `#message-dismiss`, `#message-list-button`; 67 checks plus 3 inspection checks per orientation, all passing. Review: independent script passed; mutation of three faults made 26 checks fail; zero defects. Ambiguities reported: 20, of which 6 were use-case wording, 9 guides, 5 environment. The six use-case items went to the owner as open points; the guide items were folded into the guides.

### Example 2: implementation 2 (Opus, first run)

Input: record 2 drafted from the Edit ideas use case. The prompt did not tier the documents, so the subagent tiered them itself and read the vision last. Run: about 203 k tokens, 67 tool uses, 19 minutes, 25 documents. Review: my assertion that the first non-empty row would be "Aardvark" failed; the use case orders by locale, so "A very large idea" sorts first and the implementation was right. Fifteen ambiguities were reported, three of them in the use cases; these became use-case revisions in the next pull request. Lesson recorded: tier the reading order in the prompt.

## Anti-patterns

- **Restating record content in the prompt.** The owner asked "Implementation document already includes use cases covered and execution environment, doesn't it?" A prompt that repeats the record hides gaps in the artifacts.
- **Reading the subagent's checks before writing the independent review.** The review then tests what the subagent tested, not what the use case says.
- **Editing the implementation to make a review assertion pass.** The "Aardvark" assertion was wrong; the implementation was right.
- **Fixing the delivered implementation after the checkpoint.** A checkpoint change goes to the use cases and the next record. Implementation 3 was edited once and had to be reverted.
- **Reading the transcript.** Several hundred kilobytes; grep for the metrics.

## Acceptance criteria

- [ ] The subagent's prompt contains no use-case text, no environment description, and no decision that is also in the record.
- [ ] The subagent's own checks and an independently written review script both pass in both orientations.
- [ ] Three injected faults each cause at least one of the subagent's checks to fail.
- [ ] The procedure's metrics table has a row for this implementation keyed by record number.
- [ ] Every ambiguity the subagent reported is either folded into a guide or procedure, or listed for the owner; none is silently decided.

## Files this skill creates / modifies

- `workbench/implementations/<N>/idea-workbench.html`, `verify.js` — the delivered implementation and its checks (subagent-written; frozen after delivery).
- `workbench/note/implementation-record-<N>.md` and the six `*-<N>.md` per-area notes — completed by the subagent.
- `ai/procedures/implement-by-subagent.md` — metrics row and any procedure amendments.
- `workbench/note/*-definition.md` — guide amendments from the ambiguity list.
- `<scratchpad>/impl<N>-report.md`, `<scratchpad>/review<N>.js`, screenshots — outside the repository.
