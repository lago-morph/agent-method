---
id: test-data-3
type: note
title: Implementation 3 — test data
links:
  related-to:
    - note/implementation-record-3.md
    - note/test-data-definition.md
---

Decisions of implementation 3, made while building it. The
implementation record
([note/implementation-record-3.md](implementation-record-3.md))
keeps one line per area and links here; this note holds the detail.
Guide: [note/test-data-definition.md](test-data-definition.md).

## The set

The set is the one the Initial UI use case designed, reused unchanged:
19 items per load, each present for a named reason, described item by
item in [note/test-data-1.md](test-data-1.md). The Edit ideas use case
states that no new test data is needed because the existing set already
exercises its corner cases, so nothing was added, nothing was changed,
and every title is byte-identical to implementations 1 and 2's — which
is what keeps checks that find ideas by name working across all three.
The set is embedded in `implementations/3/idea-workbench.html`, as
scaffolding, behind the "Load test data" control.

## What a load now produces

19 items go in; **17 rows come out**. The empty item and the
whitespace-only item are blank after stripping, and the update that
follows a load deletes every blank idea that is not active, so they
never appear. That is what the Edit ideas use case says ("Load test
data: the list has 17 entries; no '(empty)' row") and what its edge
cases 1 and 2 specify. Three loads give 51 rows.

The two items have therefore changed the corner case they exercise. In
implementation 1, with the Initial UI use case alone, they demonstrated
the "(empty)" placeholder and the literal display of whitespace. From
implementation 3 they demonstrate the deletion of blank loaded content
and the silence of that stripping — no message is shown, because it was
not caused by editing. The placeholder is exercised instead through the
New command, as the Initial UI use case's own test-data section
anticipates. The items stay in the set: removing them would remove the
only coverage of the deletion rule.

## The guide's questions, answered

1. **What is in the set, and which corner case does each item cover?**
   As designed in the Initial UI use case and itemized in
   [note/test-data-1.md](test-data-1.md), with the two blank items now
   covering deletion of blank loaded content rather than the placeholder
   display. *The data is unchanged; what it demonstrates has moved.*
2. **How are items identified?** By their title, kept stable. *Repeated
   unchanged.*
3. **Where does the set live for this implementation?** Embedded in the
   single file, as scaffolding, while no save or import exists.
   *Repeated unchanged.*
4. **Where does it live once the loader is removed?** Provisionally: a
   plain-text fixture per idea under `implementations/`, loaded through
   the import use case once that exists. The guide says to raise this in
   the round that introduces save, and that round has not happened;
   the answer is recorded so the question is not lost, and it is
   expected to be settled with the storage guide rather than here.
   *Repeated unchanged from implementation 2.*
5. **What format?** Provisionally: one plain-text file per idea, its
   content being the idea's content verbatim. *Repeated unchanged.*
   Note that the argument implementation 2 gave for plain text — that it
   is "the only [format] that can hold the whitespace-only item without
   an encoding decision" — is weaker now: a whitespace-only item is
   deleted on load, so what a fixture format must preserve is the bytes
   that get stripped, not an idea that survives. The provisional answer
   stands; the reason is narrower.
6. **How does a later implementation load the same set?** Provisionally:
   through the same import path as question 5, so the set is versioned
   with the spec rather than with any implementation. Implementations 1,
   2, and 3 all embed a literal copy, which is the arrangement this
   question exists to end. *Repeated unchanged.*
7. **Is there data other than the exercised set?** No. There is no
   realistic sample and none of Jonathan's real ideas; the checkpoint is
   done on the exercised set, whose walk-through in the Edit ideas use
   case doubles as the demonstration script. *Repeated unchanged.*

## The corner case that no longer needs an item

[note/test-data-2.md](test-data-2.md) recorded one display case the
set had no item for: an idea whose first line is blank but whose later
lines have content. The 2026-09-05 revision removed that case from the
specification — leading whitespace, a leading newline included, is
stripped at every update, so the Edit ideas use case now states there is
no "blank first line with content below" case at all. The gap is closed
by the spec, not by an item, and the note is kept so the closure is on
the record rather than looking like an omission that was forgotten.

## A gap in the set that the revision opened

Nothing in the loaded set has leading whitespace other than the
whitespace-only item, which is deleted. So the set cannot demonstrate
edge case 3 — loaded content `··hello`, stripped silently to `hello`
and still present. The checks cover the silence of loaded stripping only
through the two blank items, and cover edge case 3 not at all; a
walk-through on the device cannot show it either. Adding one item
whose content begins with two spaces and a visible first line would
close it. That is a change to the set, which the guide says is done
deliberately and by adding rather than altering, and it belongs to a
round on the Initial UI use case's test-data section rather than to this
implementation — which is why it is proposed here and not made.
