# ADR: A regeneration run is withheld the previous implementation

- **ID**: ADR-fd79af8bcb
- **Status**: Draft (not yet adopted to docs/adr/)
- **Date**: 2026-09-07
- **Source retrospective**: ../2026-09-07-25.md
- **PRs covered**: #25

## Context

This is a proposal arising from the owner's questions on PR #25, not a decision he has made. ADR 0007 says the artifacts must suffice for regeneration. The procedure's prompt template puts the previous implementation's record, notes, and files in tier 4, "when repeating a previous decision or needing its hooks and data". Implementations 2, 3, and 4 all read their predecessor's source; implementation 4's report lists implementation 3's two files as "used as the base to build from and diff against", and its diff against 3 is 164 lines added and 50 removed with the editing and undo code byte-identical. The owner asked: "Did the implementation 4 agent look at the result of implementation 3. If not, why so much similarity between very different models?" and "It was instructed to generate from scratch, not modify. Or was it?" It was not. None of the three runs measured regeneration; each measured modification.

## Decision

The prompt for a regeneration run offers only the specification artifacts and the method, says the implementation is built from scratch, and does not name the previous implementation's source or checks.

Whether the previous implementation's per-area notes stay available is a separate choice: they carry decisions the guides ask to be repeated, but the owner's review found them to restate other documents; if the notes move under `implementations/<N>/` as he proposed, withholding the directory withholds them too.

## Alternatives considered

- **Keep tier 4 as is** — measures how well a model extends the last implementation, which is a different question from ADR 0007's.
- **Withhold the source but keep the notes** — keeps the guides' "repeat unchanged" pattern working; the owner's review calls that pattern history an agent must reconstruct, which "drastically increases the risk that subsequent runs will be different with the same inputs".
- **Say "from scratch" but leave the files reachable** — the owner's own warning: "Linking to a previous file you don't want an agent to look at is a bad idea. There is a good chance the agent will read it anyway."

## Consequences

Easier: the comparison between models becomes a comparison of what each builds from the artifacts alone, which is what the method is for. Harder: each run re-decides everything, so variance rises and the guides must carry every decision worth repeating; test data and hooks must live in the artifacts, not in the previous implementation. Accepted: a run may be worse than its predecessor; that is the measurement.

## References

- [`../2026-09-07-25.md`](../2026-09-07-25.md) — the source retrospective.
- [`./SKILL-SPEC-dab094e798-review-implementation-run.md`](./SKILL-SPEC-dab094e798-review-implementation-run.md) — the review skill spec.
- `ai/feedback-pr-25.md` items 7, 8, and 12; `method/adr/0007-artifacts-must-suffice-for-regeneration.md`; `ai/procedures/implement-by-subagent.md` (document tiers).
- PRs: #25.
