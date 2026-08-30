# ADR 0005: Specify corner cases in use cases

- **Date**: 2026-08-30
- **Status**: Accepted
- **Adopted from**: Jonathan's markup on the Initial UI use case
  (2026-08-30 working session, PR #9)

## Context

The first draft of the Initial UI use case covered only the behavior
named in the source notes. Jonathan's markup asked what happens when
there are no ideas, when there are more ideas than fit the page, when
an idea's text exceeds the display area, when an idea is empty or
whitespace-only — and what the test data includes and how it shows off
each corner case. None of that was specified, and all of it was needed
before the use case could be implemented.

## Decision

A use case is not done when the happy path is written. Every use case
specifies its corner-case behavior: what happens with nothing (empty
collections, empty or whitespace-only content), with too much (more
items than fit, content larger than its area), and with degenerate
input. Where the use case involves test or example data, that data is
designed deliberately to exercise each specified corner case.

## Alternatives considered

- **Leave corner cases to the implementation** — rejected: the
  implementer (human or agent) then invents behavior Jonathan never
  approved, and the spec stops being the authority on what the
  software does.
- **A separate corner-case artifact per use case** — rejected as
  ceremony: the corner cases are part of the behavior, so they belong
  in the use case itself.

## Consequences

Use-case drafting rounds are slower and the artifacts longer, but each
ratified use case is implementable without invented behavior, and its
test data doubles as a demonstration script for the corner cases.

## References

- `../../workbench/use-case-initial-ui.md` — the worked example: its
  behavior sections and test-data design follow this decision.
