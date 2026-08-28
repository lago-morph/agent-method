# ADR: Three-concern repository layout: ai, method, workbench

- **ID**: ADR-8844ad3492
- **Status**: Draft (not yet adopted to docs/adr/)
- **Date**: 2026-08-28
- **Source retrospective**: ../2026-08-28-4.md
- **PRs covered**: #4

## Context

agent-method exists to hold a methodology, but the 2026-08-28 restart immediately began producing three different kinds of content: material about the method itself (SEED.md, future schemas and type descriptions), artifacts of the first application specified with the method (idea-workbench), and AI-generated working documents (the kickstart prompt draft, and inevitably plans, status reports, handoffs). The previous attempt's failure mode — everything intermingled until the whole became "too abstract, overwhelming" — made the mixing risk concrete rather than theoretical. Jonathan also declared up front that the idea-workbench material will probably move wholesale to another repository later, which imposes a hard requirement: application artifacts must be extractable without surgery.

## Decision

Separate the agent-method repository into three top-level concerns — `method/` for the method itself, `workbench/` for artifacts of the application being specified, and `ai/` for AI-generated working documents — and never mix them.

Concretely: method material (schemas, artifact type descriptions, link conventions, linters, method design documents) lives only in `method/`; artifact instances of idea-workbench live only in `workbench/`, which stays self-contained (relative links, no references outside the directory); everything an AI partner produces to run or track its own work lives only in `ai/`. Each directory carries a README stating its concern and the separation rule.

## Alternatives considered

- **Flat root with mixed files** (the previous attempt's de facto layout) — rejected: it is the layout that became overwhelming and got archived twice; there is direct evidence it fails for this user.
- **Two concerns (method + application), with AI documents interleaved where produced** — rejected by Jonathan explicitly: "I'd also like to keep all of the AI-generated planning/use documents separately." AI residue in either concern makes both harder to browse.
- **Separate repository for idea-workbench from day one** — deferred, not rejected: one repository is less ceremony for a first experiment, and the self-containment rule keeps the later extraction cheap. Revisit when workbench/ is moved.

## Consequences

Easier: browsing (a reader routes by concern from the root README); the planned extraction of workbench/ to its own repository (a directory move, because self-containment is enforced from the start); keeping method definitions application-agnostic.

Harder: every file placement requires a classification decision, and some documents genuinely straddle concerns (a retrospective *about* the method is still an AI document — this retrospective itself landed in `ai/` on that reasoning). Cross-concern references must always point from ai/ or method/ into workbench/, never out of workbench/, which occasionally forces indirection.

Accepted trade-off: three READMEs and a classification habit, in exchange for extractability and the browsability the previous attempts lost.

## References

- [`../2026-08-28-4.md`](../2026-08-28-4.md) — the source retrospective.
- [`./SKILL-SPEC-8a139574e2-kickstart-prompt.md`](./SKILL-SPEC-8a139574e2-kickstart-prompt.md) — the first occupant of `ai/` was the kickstart prompt draft.
- `method/SEED.md` — records the layout and separation rule.
- PRs the decision was made in: #4.
