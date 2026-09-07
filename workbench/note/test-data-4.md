---
id: test-data-4
type: note
title: Implementation 4 — test data
links:
  related-to:
    - note/implementation-record-4.md
    - note/test-data-definition.md
---

Decisions of implementation 4, made while building it. The
implementation record
([note/implementation-record-4.md](implementation-record-4.md))
keeps one line per area and links here; this note holds the detail.
Guide: [note/test-data-definition.md](test-data-definition.md).

## The set

Implementation 3's 19-item set, reused unchanged, plus three items the
2026-09-06 revision's own test-data section calls for by name — 22
items per load. Every title implementation 3 used is byte-identical
here too, which is what keeps checks that find ideas by name working
across all four implementations.

The three added items, each present for the reason the Initial UI use
case's test-data section states:

- **Two ideas with the same first line and different second lines,
  created in the reverse of their sorted order** — `Same first
  line\nsecond line B`, then `Same first line\nsecond line A` —
  exercising ordering that compares an idea's entire content, not only
  its title: after a load, the row whose second line is A comes before
  the one whose second line is B, even though B was created first.
- **One idea whose first line is a single unbroken word wider than the
  pane — sixty letters, no spaces — followed by a short second line**
  (`abcdefghijklmnopqrstuvwxyz` repeated and cut to exactly sixty
  characters) — exercising "…" after a partial word in the list (as
  distinct from the existing wide-title item, whose truncation point
  happens to fall where a sentence's words do) and hyphen splitting in
  the right pane.

The existing wide-title item (a long sentence) and the existing large
idea's embedded 216-character unbroken run are unchanged and now do
double duty: the large idea's run is what the use case's test-data
section names for "a word split across several lines", since it is
wide enough to need more than one split.

## What a load now produces

22 items go in; **20 rows come out.** The empty item and the
whitespace-only item are blank after stripping, exactly as in
implementations 2 and 3; the three added items are all non-blank, so
the row count grows by three over implementation 3's 17. Three loads
give 60 rows.

## The guide's questions, answered

1. **What is in the set, and which corner case does each item cover?**
   Implementation 3's set unchanged, per
   [note/test-data-1.md](test-data-1.md) and
   [note/test-data-3.md](test-data-3.md), plus the three items above.
2. **How are items identified?** By their title, kept stable — with one
   qualification this implementation's checks surfaced: once an idea is
   *edited*, its title alone no longer reliably finds the specific copy
   just edited if other, identically-titled, unedited copies exist (see
   [note/automated-checks-4.md](automated-checks-4.md)). The titles
   themselves are unaffected; it is the checks that switch to an idea's
   `data-id` in that one situation.
3. **Where does the set live for this implementation?** Embedded in the
   single file, as scaffolding, while no save or import exists.
   *Repeated unchanged.*
4. **Where does it live once the loader is removed?** Provisionally
   unchanged from implementation 3: a plain-text fixture per idea,
   loaded through the import use case once it exists. Still not raised,
   because the round that introduces save still has not happened.
5. **What format?** Provisionally unchanged: one plain-text file per
   idea, its content verbatim.
6. **How does a later implementation load the same set?** Provisionally
   unchanged: through the same import path as question 5.
7. **Is there data other than the exercised set?** No. *Repeated
   unchanged.*

## Two gaps carried forward, unresolved

Implementation 3 recorded two gaps in the set; neither is closed by this
revision's additions, and neither is this implementation's to close
(the guide directs that adding to the set is a deliberate, separate
act, belonging to a round on the Initial UI use case's own test-data
section):

- **The corner case that no longer needs an item** — a blank first line
  with content below — is moot, unchanged from
  [note/test-data-3.md](test-data-3.md).
- **Edge case 3** (loaded content `··hello`, stripped silently to
  `hello`, still present) still has no item in the set: nothing loaded
  has leading whitespace other than the whitespace-only item, which is
  deleted. It is flagged again here rather than left to be
  rediscovered.
