# ADR: Implementation decisions are captured through decision guides

- **ID**: ADR-2c18f3fb21
- **Status**: Draft (not yet adopted to method/adr/)
- **Date**: 2026-09-06
- **Source retrospective**: ../2026-09-06-23.md
- **PRs covered**: #16, #17, #18

## Context

Implementation 1 was built directly from the Initial UI use case, and the record of it said what was built but not what was decided: pane proportions, font sizes, how the list is ordered, how touch is emulated in the checks, which checks exist, what the test data is. Jonathan asked for the record to be enhanced with those decisions, and further for "notes with hints for a future session about what the artifacts would be, rules for scoping them, and guidance for taking the user through the decisions". The first attempt put the decisions inline in the record, which grew past the "short bullets" shape the record definition prescribes.

The resolution was a three-level pattern: a guide per decision area (questions, options, defaults, and a rule for what to do with no owner present), a per-implementation note per area answering the guide, and one bullet per area in the record linking to the note. Implementations 2 and 3 were then produced by subagents that answered the guides without the author present, which is the evidence that the pattern is complete enough to work.

## Decision

Each area where an implementer must decide something (UI, structure, test method, acceptance criteria, test data, automated checks) has a guide of questions, options, and defaults; each implementation answers it in a per-area note linked from a one-bullet-per-area record; recurring answers are promoted to a standard or ADR.

The guides live at `workbench/note/<area>-definition.md`; the answers at `workbench/note/<area>-<N>.md`; the index at `workbench/note/decision-guides.md`. A guide states what the note must contain but not how to produce it. When the same answer is given by two consecutive implementations without the owner objecting, it is a candidate for `implementation-standards.md`; when it constrains the method rather than one workbench, it is an ADR candidate.

## Alternatives considered

- **Decisions inline in the record.** Rejected: the record definition requires short bullets, and the inline version of record 1 became unreadable at six areas.
- **One combined "implementation decisions" note per implementation.** Rejected: the areas evolve at different rates (UI values were reused unchanged between 2 and 3 while the automated checks grew from 46 to 67), and a subagent reads only the areas it needs.
- **A fixed standard per area with no per-implementation note.** Rejected for now: the pattern is a discovery mechanism; standards are promoted from repeated answers, not written first. The definition, standards, instances triad from the previous retrospective (ADR-3eabee7b1c) is the same shape.

## Consequences

Easier: a clean-context subagent can answer every open question from the guide's defaults and report what it answered; the record stays short; a reviewer can diff two implementations' notes per area. Harder: seven files per implementation, each with reciprocal links to maintain; the guides accumulate questions from every ambiguity report and need pruning. Accepted trade-off: the link check is mechanical and the pruning happens when a standard is promoted.

## References

- [`../2026-09-06-23.md`](../2026-09-06-23.md) — the source retrospective.
- [`./SKILL-SPEC-75e472ec0e-implement-by-subagent.md`](./SKILL-SPEC-75e472ec0e-implement-by-subagent.md) — the consumer of the guides.
- `workbench/note/decision-guides.md` — the index and the pattern statement as it stands in the workbench.
- PRs the decision was made in: #16 (guides and per-area notes for implementation 1), #17 and #18 (exercised by implementations 2 and 3).
