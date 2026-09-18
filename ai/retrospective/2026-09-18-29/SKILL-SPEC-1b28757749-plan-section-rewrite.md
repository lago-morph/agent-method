# Spec: `plan-section-rewrite`

- **ID**: SKILL-SPEC-1b28757749
- **Source retrospective**: ../2026-09-18-29.md

## Intent

Rewrite one part of a long, ratified planning document by script, keeping the untouched parts byte-identical, the step numbering stable, and every cross-reference in the untouched parts pointing at the right place. The skill exists because the 2026-09-17 replan of ai/method-plan.md replaced phase 1 wholesale while phase 2 had to survive with twelve prose references patched, and the only safe way to do that was extraction, asserted substitution, reassembly, and a stale-reference grep, none of which an in-place edit gives you.

## Trigger

Direct: "replan phase N", "rewrite steps X to Y of the plan", "restructure the plan around ADR N", "retire steps X to Y". Proactive: the user has ratified a change that replaces several steps of `ai/method-plan.md` or any document with a numbered status table and cross-referenced sections. Negative: a one-line change to a single step (use a plain edit); a new plan with no surviving sections (write it fresh); a document without numbered cross-references.

## Inputs

- The path of the plan document and the heading pattern of its sections (for `ai/method-plan.md`: `## Step N — `, `## Gate X — `, `# Phase N — `).
- The list of sections to replace, the list to keep, and the new text for the replaced range, drafted in chat and agreed by the user.
- The mapping from retired section numbers to their replacements (a number, an ADR, or "deferred"), one entry per retired number.
- The scratchpad directory for intermediate files.

## Outputs

- The rewritten document, with kept sections byte-identical except for patched references.
- A list, printed to chat, of every substitution made and every grep hit that remains.
- One commit, message naming the replaced range.

## Workflow

1. Print the section headings with line numbers (`grep -n -E '^(# |## Step|## Gate)'`) and confirm the replace range and keep range with the user.
2. Extract each kept block into a scratchpad file by slicing between its headings in Python. Never `sed -i` the original.
3. Grep every kept block for references to retired numbers: `step N`, `steps N to M`, `step N's`, the retired file paths, and the retired concepts by name. Print the hits with line numbers.
4. For each hit, write a pair `(old, new)` where `old` is the exact text including line breaks. Put the pairs in a list and apply them in a loop that does `assert old in text, old` before `text.replace(old, new, 1)`.
5. Write the new text for the replaced range with unused numbers only. Never renumber a kept section. Add one sentence to the preamble naming the unused range.
6. Reassemble: header, status table, new range, kept blocks, in order, into the original path.
7. Reflow any paragraph a substitution lengthened (`textwrap.fill` at the document's width) and check `awk 'length>80'` against the pre-existing long lines (tables and paths are exempt).
8. Grep the assembled file for every retired number and retired path once more; the expected result is no hits outside the preamble's "unused" sentence.
9. Show the user `git diff --stat` and the substitution list, then commit.

## Concrete examples

### Example 1: the 2026-09-17 phase 1 replan

Input: `ai/method-plan.md`, 22 steps and two gates; replace steps 1 to 14 and gate A with nine steps and gate A; keep steps 15 to 21 and gate B; move step 5 (archive convention) into phase 2 as step 10. Mapping: 2 and 3 → 4; 4 → ADR 0008; 5 → 10; 6 → 5; 7 and 8 → 2 or deferred; 10 → 3; 11 → deferred; 12 → 7; 13 → 8; 14 → 9.

Step 3 found twelve hits in phase 2, for example `the step 12 procedure carries`, `status moved to the handoff in step 13`, and a six-line bullet in step 18 naming steps 1, 5, 8, 10, 4, and 12. Step 4's pairs included the six-line bullet with its exact line breaks. Step 7 reflowed that bullet, which had grown to a 131-character line. Step 8's grep for `step 1[1-4]|step 12|step 13|step 14|mutability.md` returned nothing. Output: one commit, `Implementation lifecycle as trial ADR 0008; the imagined workflow captured; phase 1 replanned around it`.

### Example 2: retiring one step in the middle

Input: a plan where step 6 is absorbed by an ADR. Keep everything else. Step 3 finds `step 6` in the preamble, in step 4's consequences, and in gate B's context. Step 4 writes three pairs pointing each at the ADR. Step 5 writes nothing new; the preamble gains "step 6 is absorbed by ADR 0009 and its number is unused". Step 8's grep for `step 6\b` returns only that sentence.

## Anti-patterns

- **Renumbering surviving steps.** Retrospective 2026-09-09-27 recorded cross-references broken across line breaks by a renumber; this session avoided it by leaving 11 to 14 unused.
- **Unasserted substitutions.** A missing anchor is a silent no-op and the stale reference ships.
- **Editing in place with `sed -i`.** Line-oriented tools miss references that wrap across lines, which is exactly how plan prose is formatted.
- **Skipping the reflow.** One substitution produced a 131-character line that only a length check caught.
- **Rewriting kept sections "while there".** The user ratified them; the diff must show them unchanged except for patched references.

## Acceptance criteria

- [ ] `git diff` on kept sections shows only the patched reference lines.
- [ ] A grep for every retired number and path returns only the preamble's "unused" sentence.
- [ ] Every substitution in the list was applied exactly once (assert passed, count printed).
- [ ] No line exceeds the document's width except tables and paths that already did.
- [ ] The status table lists every section heading in the file and nothing else.

## Files this skill creates / modifies

- `ai/method-plan.md` (or the named plan) — the rewritten document.
- `<scratchpad>/*.md` — extracted kept blocks and new range text, discarded after assembly.
