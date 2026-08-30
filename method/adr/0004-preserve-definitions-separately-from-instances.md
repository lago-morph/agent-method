# ADR 0004: Preserve definitions separately from instances

- **Date**: 2026-08-30
- **Status**: Accepted
- **Adopted from**: Jonathan's direction in the 2026-08-30 working
  session (implementation-record rounds, PR #12)

## Context

While turning the implementation-record note into a concrete record
for the first implementation, the note that *defined* what an
implementation record must contain — including Jonathan's example
option spaces for each decision — was deleted and replaced by the
filled-in first instance. The durable record of the examples was
destroyed. Jonathan's correction: "There is a difference between 'we
need to have this type of information' and defining the first instance
of that. Both need to be preserved."

## Decision

A definition ("every artifact of this kind must contain this
information", with its example option spaces) and the instances that
fill it in are separate artifacts. Creating an instance never replaces,
absorbs, or deletes the definition. Both are preserved, and each
instance links back to the definition it instantiates.

## Alternatives considered

- **Fold the definition into the first instance** — rejected on direct
  evidence: the first instance's concrete choices displace the option
  spaces, and the guidance for instance two is gone.
- **Keep the definition only in a method-level template** — premature:
  the definition is still a workbench note awaiting promotion; where
  definitions eventually live is a separate decision. This ADR only
  binds that they survive instantiation.

## Consequences

Slightly more files: each promoted-or-promotable artifact kind carries
a definition artifact alongside its numbered instances. In exchange,
every later instance is written against the full decision space, not
against whatever the previous instance happened to choose.

## References

- `../../workbench/note-implementation-record-definition.md` — the
  restored definition.
- `../../workbench/note-implementation-record-1.md` — the first
  instance.
