# ADR: Record provenance by inline quotation rather than reference

- **ID**: ADR-55e5990f2b
- **Status**: Draft (not yet adopted to docs/adr/)
- **Date**: 2026-07-05
- **Source retrospective**: ../2026-07-05-1.md
- **PRs covered**: #1

## Context

The methodology's growth discipline requires every registered item — requirement, lesson, decision — to carry evidence of the real moment that produced it. But most of those moments happen in chat, and chat is volatile: this repository's les-0003 records a mid-session context compaction, and this very session's design conversation is unrecoverable now that it has ended. A provenance convention that says "per the 2026-07-03 conversation" points at nothing. The candidate register was therefore written with sources quoted verbatim in each entry ("the load-bearing part should be the artifacts and the status of their checklists"), and the pattern held up through review and the register split.

## Decision

Every registered requirement, lesson, and decision carries its source quoted verbatim inline (or cited to a durable file), never a bare reference to a conversation, so provenance survives the loss of any chat context.

## Alternatives considered

- **Reference conversations by date** ("decided 2026-07-03") — rejected: the referenced material does not exist anywhere; a date alone cannot be audited, disputed, or re-read. (This session's own date drift — documents stamped 07-03, retro written 07-05 — shows even the date can be shaky.)
- **Decant whole conversations into transcript files and cite those** — rejected: transcripts are unreviewable at the length real sessions run, and the repo's deliverable conventions require records a human will actually read; the quotation convention captures the load-bearing sentence at the moment it is used.
- **No provenance requirement** — rejected: "anticipation dressed up as need" is a named failure mode in the complexity review's watch list; the quoted source is what makes that watchable.

## Consequences

Easier: any reader can audit why an item exists without access to any session; registered items survive context loss, compaction, and session termination by construction; disputes about what was meant can quote the same words. Harder: entries are longer, and the writer must select the genuinely load-bearing sentence at capture time — a small skill in itself. Accepted trade-off: quotations freeze a moment; if the stakeholder's position later changes, the entry needs a new dated source rather than a silent rewrite — which is the desired behavior, not a defect.

## References

- [`../2026-07-05-1.md`](../2026-07-05-1.md) — the source retrospective.
- [`./SKILL-SPEC-652b261982-session-decant.md`](./SKILL-SPEC-652b261982-session-decant.md) — the capture discipline this convention serves.
- PR the decision was made in: #1 (CANDIDATES.md source column; LESSONS.md provenance lines).
