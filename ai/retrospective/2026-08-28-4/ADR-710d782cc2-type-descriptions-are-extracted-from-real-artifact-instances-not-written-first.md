# ADR: Type descriptions are extracted from real artifact instances, not written first

- **ID**: ADR-710d782cc2
- **Status**: Draft (not yet adopted to docs/adr/)
- **Date**: 2026-08-28
- **Source retrospective**: ../2026-08-28-4.md
- **PRs covered**: #4

## Context

SEED.md commits each artifact type to having agent-facing background material: the intent behind the type and guidance for how instances may evolve. The open question was ordering — write those descriptions before any artifacts exist, or after. Writing them first is the abstraction-before-content pattern with direct evidence of failure here: two attempts at this methodology were archived precisely because designing the abstract layer first became overwhelming, and theory-derived guidance tends to be thin or wrong. Jonathan questioned the draft's "type-notes-last" step (a naming collision with the note artifact type compounded the confusion), the reasoning was explained, and he ratified the ordering as part of `ai/KICKSTART.md`.

## Decision

Agent-facing descriptions of each artifact type are written only after at least one real instance of the type exists, derived from what was actually made rather than from theory.

During the first drafts, the guidance lives in the kickstart prompt and the conversation instead of a document. Once the workbench holds at least one genuine instance of each type, the descriptions are distilled into `method/` — a paragraph or two per type — from what those instances actually turned out to be.

## Alternatives considered

- **Descriptions first** — rejected: agents would have written guidance from day one, but derived from imagination; the session's own strawman-plan failure (a polished deliverable produced before understanding) is the same error one level down, and the archived attempts are the same error at repository scale.
- **No type descriptions at all** — rejected: SEED.md's requirement is grounded in a real need — a future session picking up an artifact must know the type's intent and evolution rules without Jonathan re-explaining; the previous attempts lacked exactly this.
- **Descriptions co-written with each first instance** — considered viable but not chosen: it interleaves two kinds of work in the drafting rounds; batching the distillation keeps the drafting rounds focused on content. Cheap to switch to later if the batch step keeps sliding.

## Consequences

Easier: type descriptions are guaranteed to describe reality (they are extracted from it); the first drafting rounds stay concrete; a wrong starting type gets discovered by failing to produce a real instance, before a description enshrines it.

Harder: the first artifacts are drafted without written type guidance, so early instances may be inconsistent with each other until the distillation pass; the ordering is a one-line change (`ai/KICKSTART.md` step 4) if practice shows up-front guidance is needed.

Accepted trade-off: temporary inconsistency risk in the earliest artifacts, in exchange for type descriptions that describe what exists rather than what was imagined.

## References

- [`../2026-08-28-4.md`](../2026-08-28-4.md) — the source retrospective.
- [`./ADR-d67b2beb2d-specifications-grow-as-a-graph-of-typed-artifacts-with-typed-two-way-links.md`](./ADR-d67b2beb2d-specifications-grow-as-a-graph-of-typed-artifacts-with-typed-two-way-links.md) — the type system this governs.
- `ai/KICKSTART.md` step 4 ("TYPE DESCRIPTIONS LAST") — the ratified encoding.
- PRs the decision was made in: #4 (commits `4132084`, `d0c98ea`).
