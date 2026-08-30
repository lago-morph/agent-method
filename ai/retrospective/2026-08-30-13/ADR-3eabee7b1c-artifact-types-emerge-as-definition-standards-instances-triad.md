# ADR: Artifact types emerge as a definition, standards, and numbered instances triad

- **ID**: ADR-3eabee7b1c
- **Status**: Draft (not yet adopted to method/adr/)
- **Date**: 2026-08-30
- **Source retrospective**: ../2026-08-30-13.md
- **PRs covered**: #12

## Context

When Jonathan hit pre-implementation decisions with "no good place to
put it," the content went into one catch-all note per SEED's promotion
path. Working that note immediately revealed internal structure: some
information is decided once for all implementations (terminology,
record numbering, artifact storage location), some must be decided per
implementation (execution environment, UI method, storage, language,
included use cases, build method, logging), and then there is the
concrete filled-in record for implementation 1. A first split produced
only standards + instance, and deleting the defining checklist
destroyed Jonathan's example option spaces — corrected by ADR 0004 and
his statement that "we need to have this type of information" and its
first instance are different things that must both be preserved. The
stable shape that survived his markup is three linked artifacts.

## Decision

When a note's content divides into what every instance must decide,
what is decided once for all instances, and the concrete instances
themselves, record it as three linked artifacts — a definition, a
standards document, and numbered instances — with instances never
replacing the definition.

Concretely, as instantiated for implementations in `workbench/`:
`note-implementation-record-definition.md` (each decision with example
options, list explicitly open), `note-implementation-standards.md`
(terminology, non-repeating integer numbering, artifact storage under
`implementations/<N>/`), and `note-implementation-record-1.md` (the
first instance), all cross-linked `related-to`, with each instance also
linking `depends-on` to the spec version it implements.

## Alternatives considered

- **One combined note per concern** (the original single
  implementation-record note) — rejected by use: the decided-once and
  decided-per-instance content demonstrably diverged the moment a real
  instance was written.
- **Definition folded into the first instance** — tried by accident and
  rejected by Jonathan on the spot: the instance's concrete choices
  displace the option spaces, leaving nothing to write instance 2
  against (see method/adr/0004).
- **Jump straight to a method-level template** — premature: these are
  still workbench notes awaiting promotion; the triad shape must
  survive at least a second instance before hardening into `method/`
  guidance.

## Consequences

Future method templates should expect three documents per matured
artifact type, not one — and the existing vision type should eventually
be re-checked against this shape (its standards are currently fused
into its guidance file). More files per type, but each instance is
written against the full decision space with example options intact,
and decided-once standards stop being restated (or contradicted) per
instance. The triad is the promotion criterion made concrete: when a
note grows all three parts, it is signaling it wants to become a type.

## References

- [`../2026-08-30-13.md`](../2026-08-30-13.md) — the source retrospective (Part 1, Phase 5).
- [`../../../workbench/note-implementation-record-definition.md`](../../../workbench/note-implementation-record-definition.md) — the definition.
- [`../../../workbench/note-implementation-standards.md`](../../../workbench/note-implementation-standards.md) — the standards.
- [`../../../workbench/note-implementation-record-1.md`](../../../workbench/note-implementation-record-1.md) — instance 1.
- [`../../../method/adr/0004-preserve-definitions-separately-from-instances.md`](../../../method/adr/0004-preserve-definitions-separately-from-instances.md) — the adopted ADR this builds on.
- PR the decision emerged in: #12.
