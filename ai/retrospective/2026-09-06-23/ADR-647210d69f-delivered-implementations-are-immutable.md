# ADR: Delivered implementations are immutable

- **ID**: ADR-647210d69f
- **Status**: Draft (not yet adopted to method/adr/)
- **Date**: 2026-09-06
- **Source retrospective**: ../2026-09-06-23.md
- **PRs covered**: #20, #21

## Context

Implementation 3 was delivered in PR #20 and reviewed by Jonathan at the checkpoint. Six review comments changed the specification: ordering compares the entire content, truncation shows an ellipsis after a partial word, long words are split with a hyphen, the message list opens empty, the walk-through must not be tied to test data, and implementations are named by their record. The first response applied the behavioral changes to implementation 3's HTML, checks, and per-area notes, so that the delivered files would match the revised use cases. Jonathan's review comment: "Why are you editing the implementation itself? You should never update a finished implementation. That is the historical record." A second comment on the notes: "Same comment. This is historical record."

The implementation was reverted to its delivery commit, the markup moved to a stacked PR #21 against the use cases only, and a lesson, a line in the implementation standards, and a line in the implementation procedure were added. The decision needs an ADR because it constrains every future checkpoint and every future subagent run: it decides where a change goes when a delivered implementation and the specification disagree.

## Decision

A delivered implementation, its per-area notes, and its checks are frozen at the delivery commit; every later change to specification or behavior goes into the use cases and the next implementation record, never into the delivered files.

"Delivered" means the commit in which the implementation's pull request was opened for the owner. From that point `workbench/implementations/<N>/` and the seven `*-<N>.md` notes are read-only. A defect found later is recorded in the next implementation record as a known difference, not fixed in place. The next record names the use-case changes since the previous implementation so the delta is visible.

## Alternatives considered

- **Patch the delivered implementation to track the specification.** Rejected by the owner: it destroys the record of what the artifacts of that day produced, which is the evidence the regeneration test depends on (ADR 0007). It also makes the implementation's metrics row meaningless, since the measured run no longer corresponds to the files.
- **Fork a "3a" implementation for small fixes.** Rejected: it creates a second numbering scheme alongside the record number, which the owner has already found confusing ("run 2 and implementation 3"), and a fix small enough for a fork is small enough for the next run.
- **Freeze only the HTML and allow the notes to be updated.** Rejected on the same review ("Same comment"): the notes are the decisions that produced the HTML; changing them without changing the HTML makes the two disagree.

## Consequences

Easier: each implementation is a fixed point that later runs can be compared against; review comments have exactly one destination (the use cases and the next record); the metrics table stays honest. Harder: a known defect stays visible in the delivered files until the next run, and the owner must accept reviewing a frozen artifact that no longer matches the current use cases. Accepted trade-off: the next implementation record carries a "use-case changes since implementation N" section so nothing is lost.

## References

- [`../2026-09-06-23.md`](../2026-09-06-23.md) — the source retrospective.
- [`./SKILL-SPEC-75e472ec0e-implement-by-subagent.md`](./SKILL-SPEC-75e472ec0e-implement-by-subagent.md) — the run that produces a delivery.
- [`./SKILL-SPEC-4b8b2cb47a-split-delivery-pr.md`](./SKILL-SPEC-4b8b2cb47a-split-delivery-pr.md) — how the markup was separated from the delivery.
- Already recorded in this repository as `ai/lessons/finished-implementations-are-never-edited.md` and a line in `workbench/note/implementation-standards.md`; this draft is the method-level statement.
- PRs the decision was made in: #20, #21.
