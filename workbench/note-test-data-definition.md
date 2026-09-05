---
id: note-test-data-definition
type: note
title: Test data — guide for designing, storing, and managing test data
links:
  related-to:
    - note-decision-guides.md
    - note-test-method-definition.md
    - note-implementation-record-1.md
---

A guide in the sense of [note-decision-guides.md](note-decision-guides.md):
the questions to settle about the data used to exercise an
implementation. The first recorded instance is the set described in
implementation record 1 under "Test data" and embedded in
`implementations/1/idea-workbench.html`. Candidate for a real artifact
type, and eventually part of test cases or general test data
management.

## What the artifact would be

The concrete data sets used to exercise the software, each item
annotated with the corner case it exists for, together with where the
data lives, how each implementation loads it, and how the sets change
over time. Use cases design the data (a use case is not done until its
test data shows off its corner cases); this artifact holds the actual
data and its lifecycle, referenced from the use case that designed it
and from the checks that use it.

## Rules for scoping

- Every item exists for a named reason. An item with no corner case
  behind it is removed; a corner case with no item is a gap in the set.
- Items have stable, distinctive titles, so checks and walk-throughs
  can find them by name ("A very large idea"). Change a set by adding
  to it; changing or removing an item breaks the checks that name it,
  and is done deliberately.
- One growing set rather than one per use case, so long as later use
  cases mostly add corner cases to the same data. A separate set is
  warranted when a use case needs data of a different kind (imported
  files, for example).
- The set is versioned with the spec, not with an implementation:
  every implementation of the same spec version loads the same set.
- Scaffolding that loads the data is part of an implementation and can
  disappear (the Initial UI use case removes the load button once save
  exists); the data itself must not disappear with it.

## Questions to walk through

Defaults in brackets; implementation 1 took the first three and left
the rest open.

1. What is in the set, and which corner case does each item cover?
   [as designed in the use case]
2. How are items identified? [by their title, kept stable]
3. Where does the set live for this implementation? [embedded in the
   single file, as scaffolding, while no save or import exists]
4. Where does it live once the loader is removed? [open — candidates:
   a fixture file under `implementations/`, loaded through the import
   use case once it exists; or a dev-only loader that stays hidden]
5. What format? [open — plain text files would match the import use
   case; JSON would match a saved-data format once one exists]
6. How does a later implementation load the same set? [open — decided
   with the storage guide]
7. Is there data other than the exercised set — a realistic sample
   for the checkpoint, Jonathan's real ideas? [open]

## Guidance for the walkthrough

- Design the data with the use case, per the corner-case rule; the
  walk-through of the data in the use case is the demonstration script
  for the checkpoint.
- When a use case adds corner cases, propose the items to add and name
  the case each covers; show Jonathan the list, not the data blob.
- Raise question 4 in the round that introduces save: the loader goes
  away and the data needs its home decided before the button is
  removed.
