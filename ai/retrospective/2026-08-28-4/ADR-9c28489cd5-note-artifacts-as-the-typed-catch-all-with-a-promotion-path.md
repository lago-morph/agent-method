# ADR: Note artifacts as the typed catch-all with a promotion path

- **ID**: ADR-9c28489cd5
- **Status**: Draft (not yet adopted to docs/adr/)
- **Date**: 2026-08-28
- **Source retrospective**: ../2026-08-28-4.md
- **PRs covered**: #4

## Context

A small fixed set of artifact types (vision, use cases, component definitions, typed interfaces) inevitably meets content that fits none of them. Without a designated home, that content either gets forced into the wrong type (corrupting the type's meaning), triggers premature invention of new types (the schema over-engineering that helped kill prior attempts), or gets lost. Jonathan closed the gap explicitly: "add another artifact, 'note' for me to put content that does not fit in the other 4 initial artifacts. Over time we will identify groups of notes that record similar information, and create new artifact types to represent them."

## Decision

Content that fits no existing artifact type is captured as a note (title, body, links), and recurring groups of similar notes are promoted into new artifact types with user approval.

A note is a full graph citizen: it has a title, a free-form body, and typed links like any other artifact. The promotion path is the type system's growth mechanism: when an agent notices a cluster of notes recording similar information, it says so and proposes a new type; creating the type requires Jonathan's approval (encoded as a standing rule in `ai/KICKSTART.md`).

## Alternatives considered

- **Force-fit content into the nearest existing type** — rejected: it erodes what each type means, and the eventual type descriptions would have to describe polluted instances.
- **Invent new types on demand, as soon as unfitting content appears** — rejected: this is exactly the analysis-paralysis/over-engineering trap Jonathan named; a type born from one instance is speculation, a type promoted from a cluster of real notes is evidence.
- **An untyped "misc" dump outside the graph** — rejected: content outside the graph has no links, so it can't participate in traversal, consistency checks, or the future visual surface; it would rot.

## Consequences

Easier: capturing anything mid-flow without a classification battle (the wanted "experiment without a lot of process and ceremony"); growing the type system from evidence — each promoted type arrives with real instances already in hand, which also feeds the extract-descriptions-from-instances rule (ADR-710d782cc2).

Harder: notes accumulate and need periodic review for clusters; the agent must actively watch for similarity rather than waiting to be asked. A very large note pile would signal the starting types are wrong — itself useful evidence.

Accepted trade-off: a deliberately loose bucket inside an otherwise typed system, in exchange for zero-friction capture and evidence-driven type growth.

## References

- [`../2026-08-28-4.md`](../2026-08-28-4.md) — the source retrospective.
- [`./ADR-d67b2beb2d-specifications-grow-as-a-graph-of-typed-artifacts-with-typed-two-way-links.md`](./ADR-d67b2beb2d-specifications-grow-as-a-graph-of-typed-artifacts-with-typed-two-way-links.md) — the graph the note participates in.
- `method/SEED.md` — records the note type; `ai/KICKSTART.md` — encodes the promotion-needs-approval rule.
- PRs the decision was made in: #4 (commit `a308e67`).
