---
id: note-ui-standards-definition
type: note
title: UI standards — guide for the appearance and interaction decisions
links:
  related-to:
    - note-decision-guides.md
    - note-implementation-record-1.md
---

A guide in the sense of [note-decision-guides.md](note-decision-guides.md):
the questions to settle about how an implementation looks and feels,
which the use cases deliberately do not answer. The first recorded
answers are in implementation record 1 under "UI". Candidate for a
real artifact type once two implementations have answered it.

## What the artifact would be

A statement of the visual and interaction conventions an implementation
follows: platform conventions, typography, palette, layout proportions,
touch and pointer targets, how selection, placeholders, and disabled
states look, theming, behavior at different screen sizes, where
controls live and what they are called. Eventually one standards
artifact per UI method (touch web app, desktop web app, TUI, …) that
every implementation with that UI method follows, with per-
implementation deviations recorded in the implementation record.

## Rules for scoping

- Use cases decide behavior; UI standards decide appearance and
  interaction conventions; the implementation record's "UI design"
  field holds only what is specific to that one implementation. When
  in doubt: if changing it would change what the software does, it is
  behavior and belongs in the use case.
- A UI decision becomes a standard when it should hold for every
  implementation with the same UI method. Until then it is recorded
  per implementation.
- Wording that appears on screen (button labels, placeholders) is a UI
  standard unless a use case fixes it, as "(empty)" is fixed.
- Standards state values (sizes, colours, names), not adjectives.

## Questions to walk through

With the default in brackets — the answer to assume when Jonathan says
"whatever is conventional". Implementation 1 took every default.

1. Which platform's conventions are followed? [the host platform's:
   system font, system-like colours and controls]
2. Base type size and line height? [17 px; 1.4 in running text]
3. Palette: text, muted text, backgrounds, dividers, selection, primary
   control? [near-black on white, grey placeholders, light blue
   selection, blue primary button]
4. Is there a dark mode? [no, until asked]
5. Minimum touch target? [44 px]
6. Layout proportions, and do they change between orientations or at
   narrow widths? [1 : 2 : 4; no change]
7. Where do controls live, and what are they called? [one header bar;
   sentence-case labels]
8. How do selection, placeholder, and pressed states look? [tinted row;
   grey text; dimmed control]
9. Which containers scroll, and does the page ever scroll? [each pane;
   never the page]
10. Anything the platform needs (safe areas, viewport height, tap
    highlight)? [respect safe areas; dynamic viewport height; no tap
    highlight]

## Guidance for the walkthrough

- Settle these by looking, not by reading: screenshots at the target
  sizes, or the real device at the checkpoint. Prose descriptions of
  colours get no useful markup.
- Propose the defaults in the implementation record and move on;
  Jonathan marks up what he wants different after using it. Do not
  hold up a build on UI questions.
- Record only what was actually decided, as values. If he says "it
  looks fine", the recorded values are the ones in the file.
- When a decision is repeated unchanged in a second implementation
  with the same UI method, propose promoting it to a standard.
