---
id: note-acceptance-criteria-definition
type: note
title: Acceptance criteria — guide for deciding when an implementation is done
links:
  related-to:
    - note-decision-guides.md
    - note-test-method-definition.md
    - note-implementation-record-1.md
    - note-quality-standards-definition.md
---

A guide in the sense of [note-decision-guides.md](note-decision-guides.md):
what must be true for an implementation to be accepted, and how that
is derived. The first recorded instance is the table in implementation
record 1 under "Acceptance criteria". Candidate for a real artifact
type — probably one per implementation, generated from the use cases
it includes.

## What the artifact would be

A table with one row per check: its source (the use-case sentence or
record decision it comes from), the check itself stated so that anyone
gets the same answer, how it is verified (automated, by a person, by
inspection), and its result per verification environment. Plus a
one-line definition of done for the implementation.

## Rules for scoping

- Criteria are derived, never invented. Every row traces to a sentence
  in a ratified use case, a decision in the implementation record, or
  a general rule agreed once (such as "no script errors"). A check
  with no source means a use case is missing a corner case: feed it
  back to the use case rather than keeping an orphan check.
- Criteria say what must be true; the test method says how it is
  checked. A criterion does not name a tool.
- Criteria cover what the user can observe. The quality checks the
  user never sees — unit tests, type checking, static analysis,
  integration, UI, and end-to-end testing standards — are the subject
  of [note-quality-standards-definition.md](note-quality-standards-definition.md).
- A criterion is implementation-independent where the use case is;
  rows sourced from the record are specific to that implementation.
- One table per implementation, covering all the use cases it
  includes; the same use-case rows recur in later implementations.
- Done is stated explicitly, in the table's artifact, and always
  includes Jonathan's checkpoint for anything he has to see or touch.

## Questions to walk through

1. Which use-case sentences are checkable by a script, which need a
   person, which are settled by inspecting the artifact? [script where
   the sentence names an observable; person for feel and appearance;
   inspection for "no dependencies"-type constraints]
2. What general rules apply to every implementation? [no script
   errors; opens the way the record says; nothing outside the included
   use cases is present]
3. What does done mean for this implementation? [every automated row
   passes, and Jonathan has completed the checkpoint]
4. What happens when a row fails at the checkpoint? [decide whether the
   use case or the implementation is wrong; a use-case change is a new
   round on that use case, an implementation bug is fixed in place]

## Guidance for the walkthrough

- Draft the table before building, from the use cases; it doubles as
  the plan for the checks and as the PR's "verified" section.
- Show Jonathan the rows marked as his to check; he may reassign rows
  or add ones the drafting missed.
- Never mark a row passed on the strength of a check that did not run;
  "—" is an honest result.
- When the same use-case rows recur in a later implementation, copy
  them; do not rephrase, so results stay comparable across
  implementations.
