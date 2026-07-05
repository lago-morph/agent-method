# ADR: Promote requirements by moving full standalone text between register files

- **ID**: ADR-1610d60d46
- **Status**: Draft (not yet adopted to docs/adr/)
- **Date**: 2026-07-05
- **Source retrospective**: ../2026-07-05-1.md
- **PRs covered**: #1

## Context

The rebuild tracks many proposed requirements while designing against few. Two stakeholder review comments on PR #1 forced the mechanic into shape: one asked "what is the mechanic to promote a requirement?" and proposed separate files; the other required each requirement to be standalone — "somewhat verbose … to avoid dependencies," with unavoidable dependencies "explicit and documented in both directions." A promotion mechanic therefore has to preserve standalone-ness and dependency visibility across the move, and it has to work with the quarantine (candidates are not session-visible; active requirements are).

## Decision

A candidate requirement is promoted by physically moving its complete standalone text from CANDIDATES.md into REQUIREMENTS.md on a joint stakeholder-agent decision, with IDs stable and never reused, a promotion log on both sides, and declared dependencies resolved or explicitly carried at promotion time.

## Alternatives considered

- **Status flags in a single file** (`status: active` per entry) — rejected: defeats the quarantine, since sessions loading the active set would load every parked proposal too.
- **Copy instead of move** — rejected: two authoritative copies of the same requirement invite silent divergence, the exact self-certified-staleness failure recorded in the complexity review; the move keeps exactly one home at all times.
- **Reference instead of text** (REQUIREMENTS.md lists promoted IDs, text stays in CANDIDATES.md) — rejected: sessions would need the quarantined file to read their own active requirements, and bare references are the "reference soup" the repo's deliverable conventions ban.

## Consequences

Easier: an ordinary session reads only real commitments, each self-contained; promotion and demotion are visible, logged, reversible acts; IDs stay citable forever (lessons and reviews already cite R-numbers). Harder: promotion is a small ceremony (move text, update two logs, check dependencies) rather than a one-character flag flip — acceptable because promotions should be rare, deliberate events. Accepted trade-off: the two files must be kept mutually consistent by the mover; until the deterministic evaluator exists (candidate R13), that consistency is checked by hand — the doc-ripple-check discipline applies to every promotion.

## References

- [`../2026-07-05-1.md`](../2026-07-05-1.md) — the source retrospective.
- [`./ADR-e0af6c4451-quarantine-speculative-content-from-ordinary-session-context.md`](./ADR-e0af6c4451-quarantine-speculative-content-from-ordinary-session-context.md) — the quarantine this mechanic serves.
- [`./SKILL-SPEC-abf94646a0-doc-ripple-check.md`](./SKILL-SPEC-abf94646a0-doc-ripple-check.md) — the consistency sweep each promotion needs.
- PR the decision was made in: #1 (both stakeholder review comments on REQUIREMENTS.md).
