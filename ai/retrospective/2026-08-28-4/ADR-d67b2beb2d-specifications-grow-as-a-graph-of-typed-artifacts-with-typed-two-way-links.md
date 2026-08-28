# ADR: Specifications grow as a graph of typed artifacts with typed two-way links

- **ID**: ADR-d67b2beb2d
- **Status**: Draft (not yet adopted to docs/adr/)
- **Date**: 2026-08-28
- **Source retrospective**: ../2026-08-28-4.md
- **PRs covered**: #3, #4

## Context

Jonathan returned from a long break — taken because the previous, linear-document-centric attempts "became overwhelming" — and redirected the method toward structure matching how he thinks: "organized in a graph structure rather than a linear structure (linked data vs one markdown file)." A single long specification document forces sequential reading, hides dependency structure, and demands completeness before it is useful. A graph grows one node at a time; nothing demands completeness, which directly addresses the overwhelm pattern that aborted two prior attempts.

## Decision

Organize specification content as one markdown artifact per typed node, connected by typed, optionally directional, two-way links (initially is-part-of, depends-on, related-to) rather than as a single linear document.

The starting artifact types are: project vision document, use cases, component definitions, typed interfaces specified in a language-neutral way, and notes (see ADR-9c28489cd5). Links are two-way (traversable in both directions), typed, and optionally directional: `is part of` and `depends on` are directional; `is related to` is non-directional. Each artifact type also gets agent-facing background material — the intent behind the type and guidance for how instances evolve (see ADR-710d782cc2 for when that gets written). The concrete file convention (YAML front matter carrying id, type, title, links; the mechanism that makes links traversable both ways) is deliberately left to the kickstart session's first step, where it is proposed minimally and approved by Jonathan.

## Alternatives considered

- **One linear specification document per project** — rejected on direct evidence: it is the shape both archived attempts took, and both became overwhelming.
- **A real linked-data stack (RDF, JSON-LD, a graph database)** — rejected as ceremony: markdown files with front-matter links are human-readable, agent-parseable, greppable, and diffable; a visualization can be generated later when a real need appears. Linked data as a discipline, not a technology stack.
- **Untyped links (plain wiki-style references)** — rejected: Jonathan explicitly specified typed, optionally directional links with two-way traversal; untyped links cannot express is-part-of vs depends-on, which the eventual visual surface will need.

## Consequences

Easier: incremental growth (one node at a time, no completeness pressure); mechanical consistency checks and future linting (typed links are checkable); the deferred visual dashboard (a graph renders naturally); AI navigation (an agent follows typed edges instead of scrolling).

Harder: two-way traversal must be maintained (either reciprocal entries kept in sync or an index generated), which is a standing bookkeeping cost; the type system itself can become the new over-engineering — the named antidote is starting with five types and letting new ones emerge from note clusters rather than design sessions.

Accepted trade-off: per-node file overhead and link bookkeeping, in exchange for a specification that is useful while incomplete.

## References

- [`../2026-08-28-4.md`](../2026-08-28-4.md) — the source retrospective.
- [`./ADR-9c28489cd5-note-artifacts-as-the-typed-catch-all-with-a-promotion-path.md`](./ADR-9c28489cd5-note-artifacts-as-the-typed-catch-all-with-a-promotion-path.md) — the catch-all type.
- [`./ADR-710d782cc2-type-descriptions-are-extracted-from-real-artifact-instances-not-written-first.md`](./ADR-710d782cc2-type-descriptions-are-extracted-from-real-artifact-instances-not-written-first.md) — when type descriptions get written.
- `method/SEED.md` — records the artifact types and link rules verbatim.
- PRs the decision was made in: #3 (initial capture), #4 (note type added).
