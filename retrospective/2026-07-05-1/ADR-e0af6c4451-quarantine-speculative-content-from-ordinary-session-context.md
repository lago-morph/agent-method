# ADR: Quarantine speculative content from ordinary session context

- **ID**: ADR-e0af6c4451
- **Status**: Draft (not yet adopted to docs/adr/)
- **Date**: 2026-07-05
- **Source retrospective**: ../2026-07-05-1.md
- **PRs covered**: #1

## Context

An AI session loads the repository's entry-point documents to orient itself, and whatever it loads shapes what it proposes. This repository carries two large bodies of *non-process* text: the archived first-attempt design (an elaborate gate/judge/two-plane system, ~680 lines) and the candidate-requirements register (25 speculative proposals). During PR #1's review, the stakeholder flagged the risk directly on the register: proposed requirements sitting in a session-loaded file would "leak into session context accidentally" — priming future sessions with anticipation-shaped ideas, the exact failure mode (meta-work displacing project work) documented in the complexity review. The same reasoning had already produced the archive rule during the reset.

## Decision

Files holding speculative or superseded material (proposed requirements in CANDIDATES.md, the archived first-attempt design in archive/) are quarantined by standing instruction: agent sessions do not read them unless the session's explicit task is about them or the stakeholder names a file.

## Alternatives considered

- **Keep candidates inside REQUIREMENTS.md with a "candidates" heading** — rejected: entry-point docs direct sessions to read REQUIREMENTS.md, so every session would ingest all 25 proposals regardless of headings; instructions not to *act* on loaded text are weaker than not loading it (the k8s-platform record shows prose rules losing to context pressure).
- **Delete speculative material and rely on git history** — rejected for the archive during the reset conversation: the stakeholder chose "park it, clearly labeled" to keep it browsable for deliberate mining; deletion also does nothing for the candidates, which must remain actively editable.
- **No rule; trust each session's judgment** — rejected: the first attempt's own history shows standing docs and context shaping agent proposals within days.

## Consequences

Easier: ordinary sessions start from a small, true context (purpose, scope, active set, glossary); speculative ideas cost nothing while parked; the promotion act becomes meaningful (text physically enters session-visible space). Harder: requirements work needs an explicit step ("this session is about candidates") before the register is opened; two files must stay consistent about the quarantine rule (CLAUDE.md carries both instructions). Accepted trade-off: a session that *should* have known about a parked candidate may miss it — the promotion conversation, not ambient context, is the designed channel for that.

## References

- [`../2026-07-05-1.md`](../2026-07-05-1.md) — the source retrospective.
- [`./ADR-1610d60d46-promote-requirements-by-moving-full-standalone-text-between-register-files.md`](./ADR-1610d60d46-promote-requirements-by-moving-full-standalone-text-between-register-files.md) — the promotion mechanic this quarantine makes meaningful.
- PR the decision was made in: #1 (stakeholder review comment on REQUIREMENTS.md line 87).
