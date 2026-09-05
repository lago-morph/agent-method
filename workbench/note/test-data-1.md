---
id: test-data-1
type: note
title: Implementation 1 — test data
links:
  related-to:
    - note/implementation-record-1.md
    - note/test-data-definition.md
---

Decisions of implementation 1, made while building it and captured 2026-09-05 at Jonathan's direction. The implementation record ([note/implementation-record-1.md](implementation-record-1.md)) keeps one line per area and links here; this note holds the detail. Guide: [note/test-data-definition.md](test-data-definition.md). The set is embedded in `implementations/1/idea-workbench.html`.

The set embedded in the file, 19 ideas per load, each present for a
named reason:

- **Fifteen short ideas** with varied first letters and mixed case,
  some with a second line to show that only the first line is the
  title: apple pie recipe; Apple crumble; Zebra crossing near the
  school; Banana bread; banana split for the kids; Quantum garden;
  mango sorbet; Elephant memory app; kite festival weekend; Yak wool
  socks; cherry blossom walk; Dinosaur museum trip; umbrella stand by
  the door; Walnut desk plans; lighthouse tour. The pairs "Apple
  crumble" / "apple pie recipe" and "Banana bread" / "banana split"
  interleave only under case-insensitive ordering, so a wrong sort is
  visible at a glance.
- **One wide idea** whose first line runs to about 230 characters,
  with a short second line, for truncation.
- **One large idea** ("A very large idea"): forty numbered paragraphs
  of filler followed by an unbroken run of 216 characters, for
  vertical scrolling and wrap-anywhere.
- **One empty idea** (content `""`) and **one whitespace-only idea**
  (content `"  \n\t \n   "`, spaces, tab, and newlines), for the
  "(empty)" placeholder and literal display.

Titles are stable so that checks can find items by name. The set is
scaffolding: the use case removes the load button once save exists,
and the set then needs a new home.
