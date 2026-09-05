---
id: note-quality-standards-definition
type: note
title: Quality standards — guide for the checks the user never sees
links:
  related-to:
    - note-decision-guides.md
    - note-acceptance-criteria-definition.md
    - note-test-method-definition.md
    - note-implementation-record-1.md
    - note-implementation-record-2.md
---

Captured 2026-09-05 from Jonathan's markup on the acceptance-criteria
guide (PR #16). Acceptance criteria cover user-visible behavior. This
guide covers the quality checks the user never sees: unit test
standards, type checking, static analysis, integration tests, UI
tests, and end-to-end testing standards. It specifies **what we want,
not how to do it**. The how — the execution methods — is to be
encoded in the method proper, as AI skills, reference procedures,
linters, and CI pipelines, and is to be built after the first rounds
of implementing the workbench, when the artifact schemas and the
other support materials of the method are developed. Not before.

## What the artifact would be

A standard, per kind of check, stating what is wanted: whether the
kind applies, what it must cover, what passing means, when it runs
(before delivery, at every change, at the checkpoint), and what
evidence is kept. The standard holds for every implementation; each
implementation record says which kinds apply to it and cites the
method's reference material for how each is executed in its
environment.

## Rules for scoping

- **What, not how.** The standard names the requirement — "every
  module has unit tests that exercise its corner cases", "the code
  type-checks with no errors" — and nothing about tools, commands, or
  configuration. A sentence about how to run something is a sign it
  belongs in the method's reference materials, not here.
- **Distinct from its neighbours.** Acceptance criteria say what the
  user must be able to observe; the test method says how criteria are
  verified; this guide says what else must be true of the code and
  the build for the implementation to be trusted.
- **A kind applies only where its subject exists.** No integration
  tests for an implementation with one component; no type checking
  unless the implementation has types or a checker is chosen for it.
  The record says which apply and why the rest do not.
- **Verifiable without judgement.** Each standard is stated so that an
  agent can tell whether an implementation meets it and get the same
  answer as Jonathan.
- **Execution is referenced, never copied.** When a skill, procedure,
  linter, or pipeline exists in the method, the record cites it. Until
  it exists, the record states the gap.

## Kinds of checks and the questions each raises

For each kind, the walkthrough settles: does it apply; what must it
cover; what is a pass; when does it run; what evidence is kept.
Implementation 1's answer, recorded in its record, was "does not
apply" for every kind but UI tests.

- **Unit tests** — which units must have them; whether corner cases
  named in use cases must each have a test; whether a change without
  a test is acceptable.
- **Type checking** — whether the implementation is typed; whether
  the build fails on type errors; whether an untyped language gets a
  checker anyway.
- **Static analysis and formatting** — what a linter must find; what
  the formatting rule is; whether either blocks delivery.
- **Integration tests** — which component boundaries must be
  exercised together; with real or substitute collaborators.
- **UI tests** — which screens or areas must be driven automatically;
  at which sizes and on which engines; how they relate to the
  acceptance criteria (today they are the same checks).
- **End-to-end tests** — which whole user journeys must pass before
  delivery; whether they run against the real storage once storage
  exists.

## Guidance for the walkthrough

- Propose, in the implementation record, which kinds apply to this
  implementation and the standard for each; mark defaults; pause for
  markup, as for every other decision area.
- Do not write execution materials now. When they are built as part
  of the method, come back to each record and replace its "gap"
  statements with citations.
- When the same standard is repeated unchanged for a second
  implementation, propose promoting it into the implementation
  standards.
