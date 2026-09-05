---
id: note-decision-guides
type: note
title: Decision guides — capturing implementation decisions so implementation is repeatable
links:
  related-to:
    - note-implementation-record-definition.md
    - note-implementation-standards.md
    - note-implementation-record-1.md
    - note-ui-standards-definition.md
    - note-test-method-definition.md
    - note-acceptance-criteria-definition.md
    - note-test-data-definition.md
    - note-quality-standards-definition.md
---

Captured 2026-09-05 from Jonathan's direction after implementation 1.
Building it required many decisions the spec did not make — how the
screen looks, how it was tested, what counts as done, what the test
data is. He wants those captured so that implementation becomes
repeatable and deterministic, and each kind of decision eventually
gets its own artifact. This note is the pattern; the notes it links to
are the first guides, and implementation record 1 holds the first
recorded decisions.

## The pattern: guide, decisions, standard

Every area of decision gets two separate things, kept apart like a
definition and its instances:

- A **guide** — what the area covers, its option space, rules for what
  belongs to it, and the questions to walk Jonathan through. A guide
  asks and lists; it never decides. It is stable across
  implementations and grows a question each time one was missed.
- **Decisions** — the answers for one implementation, recorded in that
  implementation's record under a heading per area, with the guide
  linked. This is the instance.

A decision becomes a **standard** when it should hold for every
implementation until deliberately revised; it then moves into
[note-implementation-standards.md](note-implementation-standards.md)
(or a per-area standards artifact once one exists) and later records
simply say "per the standard". A decision that shapes the software's
structure and had real alternatives becomes a workbench **ADR** in
`adr/`, so its reasoning survives.

## Rules for scoping a guide

- One area per guide. A new guide is warranted when the same kind of
  decision recurs across implementations or use cases, or when leaving
  it to the implementer produced behavior Jonathan never approved.
- A guide holds questions, options, and a default per question. It
  never holds an answer for a specific implementation; those live in
  the record.
- Behavior belongs to use cases, never to a guide. If a guide's
  question turns out to be about what the software does rather than
  how it is built, tested, or presented, it moves to the use case.
- Guides stay short. The walkthrough is the deliverable; prose that
  does not end in a question or an option is cut.

## Guidance for taking Jonathan through the decisions

- **Before building:** read every guide. List the decisions the spec
  and the standards leave open for this implementation. Propose an
  answer for each, mark which are defaults, and put the whole list in
  the implementation record draft as one artifact. Pause for markup.
- **Only his word closes a decision.** A default he did not mark is
  accepted only when he says the record is done; a merge is not that.
- **While building:** any decision not foreseen is added to the record
  as it is made, flagged as made while building, and shown to him at
  delivery. The guide gets the question that was missing.
- **At the checkpoint:** decisions that turned out wrong are revised in
  the record and, if they were standards, in the standard. The
  checkpoint is where UI decisions in particular are settled — by
  looking, not by prose.

## Decision areas foreseen

Guides that exist:

- UI standards — [note-ui-standards-definition.md](note-ui-standards-definition.md)
- Test method — [note-test-method-definition.md](note-test-method-definition.md)
- Acceptance criteria — [note-acceptance-criteria-definition.md](note-acceptance-criteria-definition.md)
- Test data — [note-test-data-definition.md](note-test-data-definition.md)
- Quality standards (what, not how; execution methods belong to the
  method proper, later) — [note-quality-standards-definition.md](note-quality-standards-definition.md)

Guides to write when the first implementation that needs them is being
planned (not before):

- **Persistent storage** — first needed by the Save ideas use case.
  Option space: browser storage (localStorage, IndexedDB, the
  origin-private file system), a file the user saves and reopens, the
  File System Access API, a remote store, a git repository. Questions:
  what survives clearing browser data; what survives a change of
  implementation (export and migration); the on-disk format and its
  versioning; size limits; where the "durable storage" of the use case
  concretely is; how the user gets the data out.
- **Delivery to the device** — how the runnable reaches Jonathan's
  device: attached file, hosted page, GitHub Pages, a release asset.
  Implementation 1 found that raw GitHub downloads gain a `.txt`
  extension on iPadOS. The record definition's "build and installation
  method" should grow to cover this.
- **Code conventions** — language level, file structure, naming, how
  code traces back to use-case sentences, what a comment must say.
- **Logging and diagnostics** — what is logged, where, and how Jonathan
  gets at it on the device when something goes wrong.
- **Data model and identity** — what an idea is in memory and in
  storage, how identity is assigned and preserved across saves and
  implementations. Candidate ADRs from implementation 1: ideas are
  `{ id, content }` with the title derived from the first line; ids are
  never-reused integers assigned at creation; the whole list is
  re-rendered on every change; ordering is empties first, then
  locale-aware comparison of lowercased titles, ties by creation order.
- **Carrying data between implementations** — once storage exists,
  whether implementation N+1 must read implementation N's data.

Anything not on this list gets a note first, and a guide only when it
recurs.
