# Regeneration run: a fresh agent builds an implementation from the artifacts

**Status:** working document, non-normative. Retrospective.
**Observed in:** implementation 2 (2026-09-05), the first run of the
test ADR 0007 defines: the artifacts plus the method, handed to an agent
with no other context, should yield a similar result including the
checks.

## What was done

1. **Scoped the inputs by directory**, not by prompt content. The
   agent was told it may read `method/` (all), `workbench/` (all,
   including `input/` as non-normative reference and
   `implementations/1/`), and `ai/procedures/` (non-normative
   execution methods); and that it must not read anything else — named
   explicitly: `ai/HANDOFF.md`, `ai/PLAN.md`, `ai/lessons/`,
   `ai/retrospective/`, other `ai/*.md`, `archive/`, `archive-2/`,
   `.claude/`, and the git log or diffs.
2. **Gave only the owner's intent, not the answers:** which use cases
   the implementation covers and the execution environment (the same as
   implementation 1). Everything else was "for you to decide per the
   artifacts".
3. **Named the outputs by the artifacts' own conventions:** the record
   (`note-implementation-record-2.md`), the per-area notes
   (`note-<area>-2.md`, listing the six expected), the implementation
   and its checks under `implementations/2/`, reciprocal links with the
   link check run before finishing, and a report file outside the
   repository with fixed sections: ambiguities and gaps, procedure
   deviations, check results (verbatim PASS/FAIL line), time sinks,
   suggested changes (one sentence each, naming the file).
4. **Forbade state changes** the reviewer would want to make itself: no
   git commands that change state, no edits under `method/`, `ai/`, or
   `implementations/1/`, no edits to existing artifacts beyond reciprocal
   links, screenshots outside the repository, no "awaiting review"
   markers.
5. **Launched a fresh Opus agent** with that prompt (the harness ran it
   in the background regardless of the requested mode; nothing else was
   done meanwhile). Run: about 19 minutes, 67 tool uses, roughly 200 k
   tokens.
6. **Reviewed the result in this order:** read the report; `git status`
   and `git diff` to confirm the only edits to existing artifacts were
   reciprocal links; rerun the delivered check script (PASS reproduced);
   read the record, every per-area note, and the implementation source;
   run the extended front-matter and link validator; write and run an
   independent Playwright script from the use case text (see
   `ui-checks-playwright.md`); look at two screenshots; then fold the
   findings back: guide questions added, one decision the review
   exposed added to the implementation's UI note, procedures revised,
   proposed use-case markups listed for the owner (never applied to
   ratified use cases).

## Result

- The fresh agent produced a working implementation and 46 checks per
  orientation, all passing, with every artifact the conventions
  require and clean links. Similar to what the previous session would
  have built; the regeneration test passed at the level of behavior.
- It reported 15 ambiguities or gaps (three in the use cases, ten in
  the guides and procedures, two in the environment) and 12 suggested
  changes, each traceable to a specific sentence. That list is the
  main product of the run: the artifacts are sufficient to build from,
  and each ambiguity is a place they were not yet sufficient to build
  *deterministically* from.
- The reviewer's independent script agreed with the agent's checks and
  found no defect; its one failing assertion was the reviewer's error.

## What was not done

- No second regeneration to measure variance between runs.
- No delivery by the agent (delivery stayed with the reviewer).
- The agent's report was not committed; its content was folded into
  artifacts, procedures, and the PR body.

## Pitfalls observed

- The agent's report lists "the decision-guides procedure cannot
  complete without the owner" — the guides assumed the owner is present
  to close each decision. The guide now says what to write when he is
  not.
- Repeating implementation 1's answers "unchanged" was voluminous
  (seven notes, mostly "repeated unchanged"). A standard for the
  repeated answers would shorten the next run; the UI note proposes one.
- The undo granularity, the position of a new idea among placeholders,
  and the Initial UI sentence about "new" are use-case ambiguities that
  no guide could have caught; only building exposed them. The
  regeneration run is the cheapest way found so far to surface such
  sentences.

## Notes for formalizing

- This is the natural shape of a skill: inputs = the three directories,
  outputs = the record, notes, implementation, checks, report; the
  review checklist above is the acceptance step. Its report sections
  are the schema for what a regeneration must give back.
- Run it for every implementation, not only as an experiment: the
  ambiguity list is the spec's defect list.
