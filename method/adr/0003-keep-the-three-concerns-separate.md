# ADR 0003: Keep the three concerns separate

- **Date**: 2026-08-28
- **Status**: Accepted
- **Adopted from**: AGENTS-MD-a67331433e (retrospective 2026-08-28-4)
- **Absorbs draft**: ADR-8844ad3492 (three-concern repository layout)

## Context

Jonathan ruled the separation twice in one message on 2026-08-28,
closing with "Please make sure to keep separate the three concerns."
The repository produces three different kinds of content — material
about the method, artifacts of the application being specified, and AI
working documents — and the previous attempt's failure mode was
everything intermingled until the whole became "too abstract,
overwhelming." The idea-workbench material is also expected to move
wholesale to another repository later, so application artifacts must be
extractable without surgery.

## Decision

In agent-method, method material goes in `method/`, artifact instances
of the application being specified go in `workbench/`, and AI-generated
working documents (plans, drafts, checklists, status reports, handoffs,
retrospectives) go in `ai/`; never mix them, and keep `workbench/`
self-contained — relative links only, no references outside the
directory — so it can later move wholesale to its own repository.

## Alternatives considered

- **Flat root with mixed files** (the previous attempt's de facto
  layout) — rejected: it is the layout that became overwhelming and got
  archived twice.
- **Two concerns, AI documents interleaved where produced** — rejected
  by Jonathan explicitly: "I'd also like to keep all of the
  AI-generated planning/use documents separately."
- **Separate repository for idea-workbench from day one** — deferred,
  not rejected: one repository is less ceremony for a first experiment,
  and self-containment keeps the later extraction cheap.

## Consequences

Browsing routes by concern from the root README; extracting
`workbench/` is a directory move; method definitions stay
application-agnostic. Every file placement requires a classification
call, and straddling documents get classified by what they *are* (a
retrospective about the method is still an AI document → `ai/`).
Cross-concern references may point from `ai/` or `method/` into
`workbench/`, never out of `workbench/`. ADR placement under this
separation is governed by [ADR 0001](./0001-adrs-live-with-their-concern.md).

## References

- [`../../ai/retrospective/2026-08-28-4/AGENTS-MD-a67331433e-keep-the-three-concerns-separate.md`](../../ai/retrospective/2026-08-28-4/AGENTS-MD-a67331433e-keep-the-three-concerns-separate.md) — the adopted rule (verbatim source).
- [`../../ai/retrospective/2026-08-28-4/ADR-8844ad3492-three-concern-repository-layout-ai-method-workbench.md`](../../ai/retrospective/2026-08-28-4/ADR-8844ad3492-three-concern-repository-layout-ai-method-workbench.md) — the absorbed draft; its durable ID `ADR-8844ad3492` now resolves here.
- [`../SEED.md`](../SEED.md) — the layout section recording Jonathan's ruling.
- PR #4 — where the layout landed.
