# ADR: Use cases are independent of their test data

- **ID**: ADR-0eaf6c6c61
- **Status**: Draft (not yet adopted to method/adr/)
- **Date**: 2026-09-06
- **Source retrospective**: ../2026-09-06-23.md
- **PRs covered**: #21

## Context

The Edit ideas use case's walk-through was written as a sequence over implementation 2's test data: "the seven items", "the fourth item", "the sixty-letter idea". At the checkpoint on implementation 3 Jonathan commented: "Why in the world do you have use cases based on the test data? Give an example, not a number." The section was rewritten as free-standing examples ("an idea whose first line is a single sixty-letter word") and the handoff gained a rule. At the same checkpoint the Initial UI use case was given a test data set for the new ordering case, which is the opposite direction: the use case may say what data would exercise a case, but the implementation's test-data note decides what data is loaded.

ADR 0005 already says corner cases and the data that exercises them belong in the use case. This decision draws the line inside that: the use case names the shape of the data a case needs; it never assumes a particular loaded set.

## Decision

A use case describes behavior with illustrative examples and never with counts, names, or positions taken from a test data set; the test data belongs to the implementation's test-data note.

An example in a use case is self-describing ("two ideas whose first lines are identical and whose second lines differ") and could be satisfied by many data sets. A reference to a data set ("item four", "the seven items", "Aardvark") is forbidden. The test-data guide `workbench/note/test-data-definition.md` requires the note to state which use-case example each item serves.

## Alternatives considered

- **A shared canonical test data set referenced by all use cases.** Rejected: the set changed between implementations 1 and 3 (two same-first-line items and a sixty-letter word were added at the checkpoint), and every implementation's test-data note is where those additions are decided.
- **Allow walk-throughs to name data if the data is defined in the same document.** Rejected: it duplicates the test-data note inside the use case and the two drift; the walk-through as examples is the same length.

## Consequences

Easier: use cases survive a change of test data; a clean-context subagent can choose its own data from the examples and the guide; the neutrality check procedure can grep for counts and item names. Harder: examples are slightly less concrete than a numbered walk-through, and an implementer must map each example to a data item and say so in the test-data note. Accepted trade-off: that mapping is exactly what the test-data note is for.

## References

- [`../2026-09-06-23.md`](../2026-09-06-23.md) — the source retrospective.
- [`./SKILL-SPEC-75e472ec0e-implement-by-subagent.md`](./SKILL-SPEC-75e472ec0e-implement-by-subagent.md) — the consumer of the test-data note.
- `method/adr/0005-specify-corner-cases-in-use-cases.md` — the ADR this one refines.
- `ai/procedures/use-case-neutrality-check.md` — the working check.
- PRs the decision was made in: #21.
