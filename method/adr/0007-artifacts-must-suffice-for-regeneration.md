# ADR 0007: The artifacts plus the method must suffice to regenerate the result

- **Date**: 2026-09-05
- **Status**: Accepted
- **Adopted from**: Jonathan's markup on `implementations/1/verify.js`
  (2026-09-05 working session, PR #16)

## Context

Implementation 1 was delivered with a verification script that had
been written from the AI partner's own reading of the use case and
its own choices of harness, viewports, hooks, and output. Those
choices lived only in the script and in the session that wrote it.
Jonathan's markup: the decisions made while generating the file and
the guidance to create it must be captured in a design artifact. His
objective: take the set of artifacts plus the method documents, give
them to any agent with no other context, and get a similar result —
including all of the QA checks.

## Decision

The test of the artifact set is regeneration: the application's
artifacts (`workbench/`) together with the method (`method/`), handed
to an agent with no other context, must be enough to produce a
similar implementation and the same checks. Consequently:

- **Every produced file is derived from an artifact.** An
  implementation, a check script, a test data set: each has a
  specification artifact it can be regenerated from. When file and
  artifact disagree, the artifact is corrected first and the file
  regenerated.
- **Decisions made while producing something are captured**, with
  their reasons, in the artifact that governs that thing (the
  implementation record for the implementation, the automated-checks
  note for the checks, and so on), not left in the file or the
  session.
- **Contracts between produced things are written down.** Where the
  checks depend on hooks in the implementation, or the data depends on
  a format, the dependency is a table in an artifact, not knowledge in
  a script.
- **"Similar", not identical.** Appearance and other details left open
  by the artifacts may differ between regenerations; behavior, checks,
  and the decisions recorded as standards may not. Where a difference
  would matter, that is the signal that an artifact is missing a
  decision — add it, per the decision-guides pattern.
- **The method documents count as input.** Type guidance, ADRs, and
  conventions are part of what the agent is handed; guidance that
  exists only in a session or a chat is a gap.

## Alternatives considered

- **Treat scripts and files as self-documenting** — rejected: a
  script records what was done, not why, nor what else was
  considered, and a fresh agent reproduces neither the reasoning nor
  the coverage.
- **Capture decisions in AI working documents (`ai/`)** — rejected:
  working documents are not handed to the next agent as part of the
  specification; only `workbench/` and `method/` are.

## Consequences

- More artifacts, each shorter than the file it governs: for
  implementation 1, an automated-checks note now sits beside the
  record.
- Reviewing an implementation includes reviewing the artifact it was
  derived from; the artifact is the thing marked up.
- The regeneration test is applied at checkpoints: could a fresh agent
  rebuild this from what is in the repository? Anything answered "only
  with the chat" is captured.

## References

- `../../workbench/note/automated-checks-1.md` — the first artifact
  written to this rule.
- `../../workbench/note/decision-guides.md` — the pattern for
  capturing decisions per area.
- `0004-preserve-definitions-separately-from-instances.md` — the
  definition/instance split the automated-checks note follows.
