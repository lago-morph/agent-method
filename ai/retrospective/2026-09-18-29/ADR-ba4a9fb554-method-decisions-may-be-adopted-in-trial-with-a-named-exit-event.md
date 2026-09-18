# ADR: Method decisions may be adopted in trial with a named exit event

- **ID**: ADR-ba4a9fb554
- **Status**: Draft (not yet adopted to method/adr/)
- **Date**: 2026-09-18
- **Source retrospective**: ../2026-09-18-29.md
- **PRs covered**: #29

## Context

Jonathan agreed on 2026-09-17 to a new implementation lifecycle but warned that "let's try it this way and see if it works" tends to be propagated as a rule that must be followed before anyone has seen what happens. The repository's ADRs had two statuses, Accepted and ratified, and its lessons are binding on sight, so there was no honest place for a decision that is in force but not yet adopted. ADR 0008 was written with a Trial status as the first instance; this ADR records the mechanism so it can be reused and checked.

## Decision

A method ADR may carry the status Trial, naming the event at which the owner confirms, revises, or withdraws it and the evidence to weigh; while in trial it is cited only as a trial and never restated as a rule elsewhere.

The status line carries three things: the word Trial; the exit event, which is an event in the plan (for ADR 0008, the ratification pass after implementation 5), never a date; and the sentence that forbids restatement. The ADR body carries a section naming the evidence the exit event weighs, so the decision at the exit is made on something the trial produced. At the exit event the owner's explicit statement changes the status to Accepted, to a revised ADR that supersedes this one, or to Withdrawn, and only then may lessons, the handoff, and procedures restate its content.

## Alternatives considered

- **Record the trial as a lesson** — rejected; lessons bind immediately and have no status, so a trial written there is already a rule.
- **Record it in the plan only** — rejected; the plan is a working document under `ai/` that the run's procedure and the method documents do not read, so the decision would have no home once the plan is done.
- **Accept the ADR and revise later** — rejected; this is the propagation Jonathan warned about, since every document written between acceptance and revision would cite it as settled.
- **A pending-approval marker in the ADR** — rejected; the lesson on pending state forbids markers about the document's own approval. Trial is a fact about the decision's standing, and the ADR that states it is itself ratified on merge.

## Consequences

- A trial decision has one source and one status line to check, and its end is a scheduled decision instead of a forgotten default.
- Documents written during the trial must cite the ADR rather than paraphrase it, which costs a link where a sentence would have been shorter.
- The plan must contain the exit event as a step, and the step's output includes the ADR's status line.
- The mutability of a trial ADR differs from an accepted one: its status line changes at the exit event, and the change is Jonathan's explicit statement, per the lesson on ratification.

## References

- [`../2026-09-18-29.md`](../2026-09-18-29.md) — the source retrospective.
- [`../../../method/adr/0008-an-implementation-is-sealed-run-and-frozen-and-its-decision-log-grows-the-spec.md`](../../../method/adr/0008-an-implementation-is-sealed-run-and-frozen-and-its-decision-log-grows-the-spec.md) — the first ADR adopted in trial.
- [`../../lessons/no-pending-approval-state-in-documents.md`](../../lessons/no-pending-approval-state-in-documents.md) — the lesson the status line must not violate.
- PRs the decision was made in: #29.
