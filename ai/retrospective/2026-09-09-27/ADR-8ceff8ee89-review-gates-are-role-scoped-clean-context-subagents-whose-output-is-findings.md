# ADR: Review gates are role-scoped clean-context subagents whose output is findings

- **ID**: ADR-8ceff8ee89
- **Status**: Draft (not yet adopted to method/adr/)
- **Date**: 2026-09-09
- **Source retrospective**: ../2026-09-09-27.md
- **PRs covered**: #27

## Context

As the method's document count and their interdependence grew (types, standards, procedures, conventions, ADRs, lessons), the owner said he could no longer check gaps, overlaps, schema consistency, and procedure-to-artifact match himself, and wanted the obvious issues found before another implementation. The plan already had two review steps, both about reading load. The gap was logical review with distinct roles, at the points where a cluster of steps had produced something to check, not after every step.

## Decision

Consistency and completeness reviews of method artifacts happen at named gates after clusters of steps, performed by clean-context subagents with one role each that return findings only and edit nothing; the session collates the findings into one table, and the owner reviews the table.

## Alternatives considered

- **A review after every step** — Thirteen-plus reviews of mostly unchanged material; the owner's review load goes up, not down.
- **One generalist reviewer per gate** — A single agent asked to check consistency, gaps, schema, and procedure match at once reads everything and reports the first thing it notices; separate roles with separate briefs each read only their set and answer one question.
- **The session reviews its own work** — The session that wrote the artifacts has their intent in context and reads what it meant, not what it wrote; a clean context reads only the text.

## Consequences

Easier: the owner reviews one collated table per gate, with severity and the owning step per finding. Findings that need a decision reopen a step rather than being fixed in place, which keeps the one-decision-per-step protocol intact. Harder: each gate costs three or four subagent runs and the collation, and the role briefs must be short enough that a reviewer stays inside its set. The briefs are treated as method material once used twice and become a procedure at gate B.

## References

- [`../2026-09-09-27.md`](../2026-09-09-27.md) — the source retrospective.
- [`../../method-plan.md`](../../method-plan.md) — the plan that records the decision (preamble, steps 1 and 14, gates A and B).
- PRs the decision was made in: #27.
