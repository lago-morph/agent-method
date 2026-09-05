# Checking a functional use case for UI neutrality (ADR 0006)

**Status:** working document, non-normative. Retrospective.
**Observed in:** PR #16, on `workbench/use-case-edit-ideas.md`, after
Jonathan's markup that the first draft was welded to the screen.

## What was done

1. **Rewrote by rule, then grepped for leftovers.** After rewriting the
   behavior sections, a case-insensitive search for the words that had
   signalled the problem was run over the file, excluding the
   Interface guidance section by eye:

   ```sh
   grep -n -i "pane\|tab\|browser\|persist\|sav\|later\|next use case\|order" \
     workbench/use-case-edit-ideas.md
   ```

   Every hit was then classified: inside Interface guidance (allowed);
   a benign use ("later lines", "in order"); or a real leak (none
   remained after the rewrite).

2. **Read the behavior sections against the two-implementation test**
   from the ADR: imagine a terminal implementation and a native
   windowed implementation, and confirm each sentence stays true for
   both. Sentences that failed in the first draft, for reference:
   "the right pane", "closing the tab or browser", "nothing persists;
   saving is the next use case", "from its keyboard shortcut and an
   on-screen button".

3. **Checked section structure** with a heading listing, to confirm
   interface detail sat only under one section and that the section
   held only the interfaces currently specified:

   ```sh
   grep -n "^## \|^### " workbench/use-case-edit-ideas.md
   ```

## What was not done

- The Initial UI use case was not checked; it is a UI use case and is
  allowed positional language.
- No automated distinction between the behavior sections and the
  Interface guidance section; the grep covers the whole file and the
  hits are sorted by hand.

## Pitfalls observed

- The word list is a heuristic built from one draft's mistakes. It
  catches "pane", "tab", "browser", "save", "persist", and
  sequencing words, and misses others ("click", "tap", "button",
  "screen", "keyboard", "menu") that would equally weld a use case to
  an interface. Those were caught by the read-through, not the grep.
- "tab" also matches "table" and "tap"; expect false positives.

## Notes for formalizing

- A linter could restrict the search to the sections before
  `## Interface guidance` and use a maintained word list; the
  read-through against the two-implementation test stays a human or
  agent judgement.
- The word list belongs with the use-case type guidance when that is
  written, as examples of what a functional use case may not say.
