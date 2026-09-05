---
id: note-test-data-2
type: note
title: Implementation 2 — test data
links:
  related-to:
    - note-implementation-record-2.md
    - note-test-data-definition.md
---

Decisions of implementation 2, made while building it. The
implementation record
([note-implementation-record-2.md](note-implementation-record-2.md))
keeps one line per area and links here; this note holds the detail.
Guide: [note-test-data-definition.md](note-test-data-definition.md).

## The set

The set is the one the Initial UI use case designed, reused unchanged:
19 ideas per load, each present for a named reason, described item by
item in [note-test-data-1.md](note-test-data-1.md). The Edit ideas use
case states that no new test data is needed because the existing set
already exercises its corner cases, so nothing was added, nothing was
changed, and every title is byte-identical to implementation 1's — which
is what keeps checks that find ideas by name working across both
implementations. The set is embedded in
`implementations/2/idea-workbench.html`, as scaffolding, behind the
"Load test data" control.

## The guide's questions, answered

1. **What is in the set, and which corner case does each item cover?**
   As designed in the Initial UI use case and itemized in
   [note-test-data-1.md](note-test-data-1.md). *Repeated unchanged.*
2. **How are items identified?** By their title, kept stable. *Repeated
   unchanged.*
3. **Where does the set live for this implementation?** Embedded in the
   single file, as scaffolding, while no save or import exists.
   *Repeated unchanged.*
4. **Where does it live once the loader is removed?** Provisionally: a
   plain-text fixture per idea under `implementations/`, loaded through
   the import use case once that exists. The guide says to raise this in
   the round that introduces save, and that round has not happened; this
   answer is recorded so the question is not lost, and it is expected to
   be settled with the storage guide rather than here.
5. **What format?** Provisionally: one plain-text file per idea, its
   content being the idea's content verbatim — the format the import use
   case will have to read anyway, and the only one that can hold the
   whitespace-only item without an encoding decision. Also to be settled
   with the storage guide.
6. **How does a later implementation load the same set?** Provisionally:
   through the same import path as question 5, so the set is versioned
   with the spec rather than with any implementation. Implementations 1
   and 2 both embed a literal copy, which is the arrangement this
   question exists to end.
7. **Is there data other than the exercised set?** No. There is no
   realistic sample and none of Jonathan's real ideas; the checkpoint is
   done on the exercised set, whose walk-through in the Edit ideas use
   case doubles as the demonstration script.

## A corner case with no item of its own

The Edit ideas use case introduces one display case the set has no item
for: an idea whose first line is blank but whose later lines have
content. The use case's own walk-through creates it by editing ("Put a
blank line above the first line of a short idea"), rather than by adding
an item, and the automated checks do the same. The test-data guide's
rule that "a corner case with no item is a gap in the set" therefore
does not apply cleanly here: the case is a property of an edit, not of
loaded data, and adding a pre-blanked item would test the display
without testing the transition the use case actually describes. Noted
rather than resolved; if the set ever has to stand alone as a display
fixture, an item for this case belongs in it.
