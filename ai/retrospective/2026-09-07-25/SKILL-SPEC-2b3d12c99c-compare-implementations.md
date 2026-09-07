# Spec: `compare-implementations`

- **ID**: SKILL-SPEC-2b3d12c99c
- **Source retrospective**: ../2026-09-07-25.md

## Intent

Produce a comparison of two implementations for the owner to read, focused on what he asks (this session: sophistication, and where a better-defined architecture would help), written to his reader rules and bounded by the specification. It earns its place because the implementation 3-versus-4 comparison was useful but overran its length and reported out-of-scope behavior as defects.

## Trigger

- The owner asks to compare implementations, or asks what an architecture guide should settle.
- Not for: acceptance-criteria audits (the checks do that); comparisons the owner has not asked for.

## Inputs

- The two implementation directories, their implementation-structure and automated-checks notes, the decision guides' foreseen areas, the use cases.
- The owner's question, verbatim.
- The reader rules from the `human-scoped-deliverables` skill: an orientation block of about fifty words, small tables, Mermaid diagrams of at most seven elements, corpus vocabulary, no hash IDs or section cross-references, no time or money estimates, opinion marked as opinion, decision points with alternatives and a rewind path.

## Outputs

- `ai/implementation-comparison-<A>-<B>.md`, 900 to 1400 words plus tables and diagrams.
- Any behavior the writer finds outside the use cases listed as a possible use-case markup, never as a defect, and never fixed.

## Workflow

1. Brief a clean-context writer with the owner's question verbatim, the reading list, the reader rules, the word cap, and the sentence: a finding is a defect only against a use-case sentence; anything else is a possible markup for the owner; change no file but the comparison.
2. Give the writer the run's untouched commit so it can separate what the run produced from anything later.
3. On return, check mechanically: word count, number of Mermaid blocks and elements per block, a grep for time or money estimates and hash IDs, the orientation block's presence. Send it back if any fails.
4. Read the load-bearing finding and the decision points; confirm each cites file:line.
5. Commit; put the load-bearing finding in the handoff in one sentence.

## Concrete examples

### Example 1: the load-bearing finding

For implementations 3 and 4 the writer found from `git diff` that 4 is 3 plus three small edits and one new subsystem (164 lines added, 50 removed; editing, undo, and list code byte-identical), so all of 4's new risk sits in the two-layer right pane, exactly the area with no decision guide. That sentence went to the handoff and was the answer to the owner's question about similarity between different models.

### Example 2: an out-of-scope finding

The writer also found that undo counts an emoji as two characters in both implementations and proposed a decision point about fixing it. The owner's later direction: emoji are out of scope for idea text. The finding and its decision point were removed; a writer briefed with the spec-boundary sentence would have listed it as a possible markup or left it out.

## Anti-patterns

- **Letting the writer decide what is a defect.** Two writers this session (the read-through reviewer and the comparison writer) reported emoji handling as defects; the spec has no sentence on it.
- **Accepting an overrun**: 1884 words against a 1400 cap was accepted; the owner's next review said everything is too verbose.
- **Diagrams of the whole system**; three diagrams of six, six, and three elements read well.

## Acceptance criteria

- [ ] Word count within the cap; every diagram at most seven elements.
- [ ] No time or money estimate, no hash ID, no "see section" reference.
- [ ] Every claimed defect cites a use-case sentence; everything else is labeled a possible markup.
- [ ] The load-bearing finding is in the first screen of the document.

## Files this skill creates / modifies

- `ai/implementation-comparison-<A>-<B>.md` — the comparison.
- `ai/HANDOFF.md` — one sentence.
