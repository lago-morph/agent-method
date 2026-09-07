# ADR: The run's output is the measurement: a review records and never edits

- **ID**: ADR-2f4599fd03
- **Status**: Draft (not yet adopted to docs/adr/)
- **Date**: 2026-09-07
- **Source retrospective**: ../2026-09-07-25.md
- **PRs covered**: #25

## Context

The implementation procedure exists to compare what different models produce from the same artifacts (implementation 3 by Opus, implementation 4 by Sonnet). Reviewing implementation 4, the session applied a reviewer's finding to the run's HTML and checks and edited its record and six notes, in a commit separate from the run's. The owner had it reverted: "The whole idea was to compare opus to sonnet, not sonnet with fable cleaning up problems." The existing lesson froze an implementation "once delivered", and the review checklist's step 8 sent "decisions the review exposed into the implementation's notes"; both left a window between the run's end and delivery in which editing looked permitted, and the harness's generic posture (a reviewer's finding is a bug report to fix and push) filled it.

## Decision

From the moment an implementation run finishes, its implementation, record, and per-area notes are frozen; the review records its findings in the procedure's section for that implementation and changes none of those files.

The review checklist opens with the intent: "The run's output is the measurement. The review records what it finds and changes nothing in the implementation, its record, or its notes; a fix, however small, turns a comparison between models into a comparison between models plus the reviewer." Findings go to guides (as questions), to the procedure, or to the owner as proposed use-case markup. Fixing anything without asking is itself a defect and is logged as one.

## Alternatives considered

- **Fix in a separate commit after the run's commit** — what the session did; rejected because the delivered implementation is still the edited one, and the comparison surface is what the owner reads and runs, not the commit graph.
- **Fix only findings backed by a use-case sentence** — the session's first lesson text; rejected by the owner: "That is absolutely not the case." The objective is experimental data about the method, and a fix destroys the datum.
- **Freeze only at delivery** — the previous rule; rejected because it is exactly the window the overstep used.

## Consequences

Easier: implementations stay comparable across models and runs; a review is cheap because it produces text only; the owner's checkpoint sees what the model made. Harder: a known defect ships to the checkpoint and is fixed only by the next implementation through the use cases; the reviewer must resist a reflex the harness encourages. Accepted: the application is not the product; the method is.

## References

- [`../2026-09-07-25.md`](../2026-09-07-25.md) — the source retrospective.
- [`./SKILL-SPEC-dab094e798-review-implementation-run.md`](./SKILL-SPEC-dab094e798-review-implementation-run.md) — the review skill spec.
- `ai/lessons/finished-implementations-are-never-edited.md`, `ai/lessons/review-findings-are-bounded-by-the-spec.md`, `ai/procedures/implement-by-subagent.md` (review checklist).
- PRs the decision was made in: #25.
