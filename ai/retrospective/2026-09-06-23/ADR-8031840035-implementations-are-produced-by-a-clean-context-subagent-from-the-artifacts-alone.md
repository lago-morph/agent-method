# ADR: Implementations are produced by a clean-context subagent from the artifacts alone

- **ID**: ADR-8031840035
- **Status**: Draft (not yet adopted to method/adr/)
- **Date**: 2026-09-06
- **Source retrospective**: ../2026-09-06-23.md
- **PRs covered**: #17, #18, #19, #20

## Context

ADR 0007 states that the workbench plus the method documents must suffice to regenerate an implementation. The only way to test that is to have something with no other context try. Implementation 2 was built by a fresh Opus subagent given the repository and a prompt, and it produced a working implementation while reporting fifteen ambiguities. Jonathan then asked to make the procedure "explicitly to give it to an opus subagent with clean context and specific access to documents", to move to Sonnet subagents once Opus worked, and to make the implementation record the subagent's whole input rather than restating its content in the prompt. Implementation 3 was built that way with a tiered reading order and a forbidden list, and reported twenty ambiguities and no defects.

The decision belongs in an ADR because it changes what "implementing" means in this method: the session that owns the conversation with Jonathan never writes the implementation; it drafts the record, dispatches, measures, and reviews.

## Decision

Each implementation is built by a fresh subagent whose only input is the implementation record and the repository's artifacts and method documents, in a tiered reading order, with the session's own memory forbidden, so that every run tests whether the artifacts suffice.

The tiers: (1) the record, conventions, ADRs, workbench README, standards, definitions, and decision guides; (2) the use cases the record covers and the vision; (3) the guides; (4) the previous implementation and its notes; (5) the check procedures when doing that step; (6) `input/` and `method/types/` for reference only. Forbidden: `ai/HANDOFF.md`, `ai/PLAN.md`, `ai/lessons/`, `ai/retrospective/`, the archives, `.claude/`, and git history. The dispatching session reviews the result independently, mutation-tests the checks, and records tokens, tool uses, minutes, documents opened, checks, and ambiguities per run.

## Alternatives considered

- **The main session implements directly.** Rejected: it has read the owner's intent, the plan, and the lessons, so its success proves nothing about the artifacts. Implementation 1 was built this way and its record had to be reconstructed afterwards.
- **A subagent with the session's summary as context.** Rejected for the same reason; the forbidden list exists to keep the test honest.
- **A subagent with no reading order.** This was the implementation 2 run. It worked, but the subagent read the vision last and the guides piecemeal, and the ambiguity list included items the guides already answered. The tiered order fixed that in implementation 3.

## Consequences

Easier: every run is a measured regeneration test; ambiguity reports are a direct list of specification gaps; the model can be varied per run (Opus, Opus, next Sonnet) with comparable metrics. Harder: about 200 k tokens and twenty minutes per run; the dispatching session must review without leaking its own knowledge into the fix; the prompt must be kept minimal so the record stays the single source. Accepted trade-off: the review checklist and the "record is the whole brief" rule are procedure text, not tooling, and depend on discipline.

## References

- [`../2026-09-06-23.md`](../2026-09-06-23.md) — the source retrospective.
- [`./SKILL-SPEC-75e472ec0e-implement-by-subagent.md`](./SKILL-SPEC-75e472ec0e-implement-by-subagent.md) — the skill this decision defines.
- [`./ADR-2c18f3fb21-implementation-decisions-are-captured-through-decision-guides.md`](./ADR-2c18f3fb21-implementation-decisions-are-captured-through-decision-guides.md) — what the subagent answers.
- `ai/procedures/implement-by-subagent.md` — the working procedure with the metrics table.
- PRs the decision was made in: #17, #18, #19, #20.
