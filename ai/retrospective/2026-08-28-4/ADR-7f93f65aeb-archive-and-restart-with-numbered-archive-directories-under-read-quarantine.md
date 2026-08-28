# ADR: Archive-and-restart with numbered archive directories under read quarantine

- **ID**: ADR-7f93f65aeb
- **Status**: Draft (not yet adopted to docs/adr/)
- **Date**: 2026-08-28
- **Source retrospective**: ../2026-08-28-4.md
- **PRs covered**: #3

## Context

The requirements-first rebuild of agent-method had become "too abstract, overwhelming," and Jonathan wanted to "take everything in the agent method repo and archive it to use later to mine for source material, and start over clean in that repo." Two constraints shaped the mechanism: nothing may be lost (the archives are ore for future artifacts and schema), and the archived material must impose zero cognitive weight on ordinary sessions — an agent that reads two aborted methodologies at session start will leak their assumptions into the new attempt. The first attempt was already parked this way in `archive/`, so the pattern needed to be repeatable, not one-off.

## Decision

An aborted methodology attempt is preserved wholesale in a numbered archive directory that agents must not read unless the user names a specific file, and the new start begins from a minimal seed.

Mechanics: everything at top level (except LICENSE, `.git`, and prior archives) moves into the next `archive-N/` via `git mv`, keeping history traversable with `--follow`. The root agents file (`CLAUDE.md`) shrinks to: the restart date, one honest line per archive ("aborted: too complex" / "aborted: too abstract, became overwhelming"), the quarantine rule, and a pointer to the seed file. The root `README.md` labels the archives for human browsers with the same honesty ("Aborted; kept for reference only"). Quarantined files are moved without being opened — `git mv` prints nothing.

## Alternatives considered

- **Delete the old attempt (fresh orphan history)** — rejected: Jonathan explicitly wants the material minable later; the glossary and lessons files in archive-2/ are named early mining candidates.
- **Keep old material in place and build alongside it** — rejected: this is how attempt two related to attempt one's leftovers, and the accumulated weight is what Jonathan described as overwhelming; out of sight is the point.
- **A separate archive repository** — rejected as ceremony: a directory move is cheap, reversible, keeps history in one place, and needs no new access grants.

## Consequences

Easier: restarting without loss or guilt — the unit of abandonment is cheap, which matters for a user whose stated pattern is that accumulated obligation kills attempts; mining later (files sit in the same repo with intact history); onboarding a fresh session (the root is five items).

Harder: the archives are invisible to ordinary sessions by design, so knowledge in them (the glossary, the lessons file) must be deliberately re-imported when needed, by Jonathan naming files. Repository size grows monotonically.

Accepted trade-off: deliberate friction on accessing past work, in exchange for a present that carries no dead weight. Worth watching: two archives in two months is itself a signal — recorded in `PERCEIVED-INTENT.md` (idea-pipeline) as the smaller-unit-of-commitment observation.

## References

- [`../2026-08-28-4.md`](../2026-08-28-4.md) — the source retrospective.
- [`./SKILL-SPEC-26d3f2ef33-clean-restart.md`](./SKILL-SPEC-26d3f2ef33-clean-restart.md) — the repeatable procedure.
- `CLAUDE.md`, `README.md` (repo root) — carry the quarantine and the honest labels.
- PRs the decision was made in: #3 (commit `7cb1099`).
