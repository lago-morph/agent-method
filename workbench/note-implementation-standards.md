---
id: note-implementation-standards
type: note
title: Implementation standards
links:
  related-to:
    - vision.md
    - note-implementation-record-definition.md
    - note-implementation-record-1.md
    - note-decision-guides.md
---

Captured 2026-08-30 from Jonathan's direction. The standards that apply
to every implementation — decided once, revised only deliberately. Held
as a note for now; a candidate artifact type once the shape settles.

## Terminology

- We implement **a version of the spec**; the resulting thing is an
  **implementation**. The word "prototype" is avoided outside
  descriptive prose.

## Implementation records

- Each implementation gets its own **implementation record** (a note
  for now), numbered with non-repeating integers: 1, 2, 3, …
- Numbers are never reused, even if an implementation is abandoned.

## Where implementation artifacts live

- Implementation artifacts are stored in git, in the same directory
  that holds these specification artifacts, under the subdirectory
  `implementations/`, with one subdirectory per implementation named by
  its record's number: `implementations/1/`, `implementations/2/`, …
- An implementation's artifacts are whatever it produces: the runnable
  thing itself and anything that comes out of building and using it.
