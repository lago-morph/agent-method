# ADR: Method changes are batched into phases that end with an implementation run

- **ID**: ADR-41a8f2ac19
- **Status**: Draft (not yet adopted to method/adr/)
- **Date**: 2026-09-09
- **Source retrospective**: ../2026-09-09-27.md
- **PRs covered**: #27

## Context

The plan for the method phase grew to 22 steps and 4 review gates before the owner asked whether it was drifting into the abstraction that ended the two archived attempts. The session's assessment was that the step count was not the risk; the distance between implementation 4 and implementation 5 was. The archived attempts died while nothing real was being built. The plan was split into a phase of fourteen steps that is the shortest path to a run under the new method, and a second phase of cleanup the run does not depend on, with the run itself as the checkpoint between them.

## Decision

Changes to the method are grouped into a phase that ends with a fresh implementation run; the run's metrics decide whether the next phase proceeds as written, is reordered, or is cut, and any step that cannot name what the run will measure about it is cut before it is done.

## Alternatives considered

- **One long sequence with the run at the end** — Twenty-six sessions of ratification before any measurement; a stall at any point leaves a half-rewritten repository with nothing to show whether the rewrite helped.
- **A run after every step** — Runs cost a clean-context subagent and a review each; most steps change nothing a run can see on its own, so the signal per run would be noise.
- **No plan, one artifact at a time as before** — The retrospectives and the PR #25 review had already produced more unprocessed material than the method itself; without an ordered plan across clean contexts, each session would rediscover the backlog.

## Consequences

Easier: every step carries a stated measurement, so a step with none is visible before it is started. The owner gets a decision point with data rather than a long commitment. Harder: phase 2 work that would have made phase 1 documents cleaner (history extraction, the ADR and lesson rewrites) waits, so implementation 5 runs against some documents still over budget; that is accepted because the run's tiers do not read them. The trade-off is one imperfect measurement early over a clean one late.

## References

- [`../2026-09-09-27.md`](../2026-09-09-27.md) — the source retrospective.
- [`../../method-plan.md`](../../method-plan.md) — the plan that records the decision (preamble, steps 1 and 14, gates A and B).
- PRs the decision was made in: #27.
