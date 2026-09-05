# ai/procedures/

Execution methods for the quality guides, written by the AI partner by
**retrospecting on what it actually did** for an implementation — not
designed ahead of use. Started 2026-09-05 at Jonathan's direction, after
implementation 1.

**Status: working documents, non-normative.** Nothing here binds a
session. Each file records what was done, what was not done, what went
wrong, and what would change; it is revised whenever the same work is
done again for a later implementation. When the method proper gains its
support materials (skills, reference procedures, linters, CI pipelines,
per `workbench/note/quality-standards-definition.md`), these are the
starting point for formalizing them into `method/`, and the files here
become working residue.

Each procedure carries: **Observed in** (which implementation and PRs),
**What was done** (steps and the exact commands or scripts), **What was
not done**, **Pitfalls observed**, and **Notes for formalizing**.

| File | Covers | Quality-guide kind |
| --- | --- | --- |
| `ui-checks-playwright.md` | driving a single-file browser implementation with Playwright, reading results, reporting | UI tests / end-to-end |
| `artifact-link-check.md` | verifying two-way link reciprocity across `workbench/` front matter | static analysis (of artifacts) |
| `use-case-neutrality-check.md` | checking a functional use case against ADR 0006 | static analysis (of artifacts) |
| `deliver-to-ipad.md` | getting a single HTML file onto an iPad for the checkpoint | delivery (not a quality kind; captured because it was done) |
| `implement-by-subagent.md` | the implementation procedure: hand-off to a clean-context subagent with tiered document access (Opus first, then Sonnet), the prompt template, review checklist, and per-run metrics | the ADR 0007 test; end-to-end review |

Not done for implementations 1 or 2, so no procedure exists yet: unit
tests, type checking, code linting or formatting, integration tests.
