# ADR 0001: ADRs live with their concern

- **Date**: 2026-08-28
- **Status**: Accepted

## Context

agent-method separates three concerns: the method itself (`method/`), the
artifacts of the application being specified (`workbench/`), and
AI-generated working documents (`ai/`). Architecture decision records
began accumulating with no permanent home — five ADR drafts sit in the
2026-08-28-4 retrospective's sibling directory, which is a proposal
inbox, not a curated log. The default convention of the `adr` skill
(`docs/adr/` at repository root) would put method decisions and
workbench decisions in one sequence, mixing concerns and — worse —
stranding workbench decisions outside `workbench/` when that directory
moves wholesale to its own repository, which is the declared plan.

## Decision

ADRs about the method live in `method/adr/`; ADRs about idea-workbench
live in `workbench/adr/`; each directory numbers its own independent
`NNNN` sequence.

Classification rule: an ADR is a workbench ADR only when it binds
idea-workbench specifically; a decision that would bind any application
grown with the method is a method ADR. Decisions about how AI partners
work with Jonathan are method ADRs. Because the two sequences reuse
numbers (each has its own 0001), cross-references must use paths, never
bare ADR numbers.

## Alternatives considered

- **Single `docs/adr/` at repository root** (the `adr` skill default) —
  rejected: one sequence mixes the concerns, and workbench decisions
  would not travel with `workbench/` at extraction time.
- **Leaving ADRs as retrospective drafts only** — rejected: drafts are
  proposals awaiting a decision; adopted decisions need a curated,
  numbered log that a future session checks by default.
- **A third log under `ai/`** — rejected: `ai/` holds working residue,
  not durable decisions; nothing binding should live there.

## Consequences

Workbench ADRs travel with the workbench when it is extracted, and the
method's decision log stays application-agnostic. Each new ADR requires
a classification call under the rule above, and readers must be careful
that "ADR 0001" is ambiguous without a path. Retrospective ADR drafts
remain where they are until adopted; adoption into `method/adr/` or
`workbench/adr/` preserves any durable `ADR-<hash>` ID the draft
carries.

## References

- [`../SEED.md`](../SEED.md) — the three-concern layout this extends.
- [`../../ai/retrospective/2026-08-28-4/ADR-8844ad3492-three-concern-repository-layout-ai-method-workbench.md`](../../ai/retrospective/2026-08-28-4/ADR-8844ad3492-three-concern-repository-layout-ai-method-workbench.md) — the layout decision's draft record.
- Decided by Jonathan, 2026-08-28 session.
