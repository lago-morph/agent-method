# Spec: `doc-ripple-check`

- **ID**: SKILL-SPEC-abf94646a0
- **Source retrospective**: ../2026-07-05-1.md

## Intent

After any commit that moves, renames, splits, or merges documents, mechanically sweep the live tree for references to the old names/paths and re-verify every self-declared document constraint (line budgets, required sections), fixing violations before push. Exists because this session's register split (REQUIREMENTS.md into REQUIREMENTS.md + CANDIDATES.md) left three stale references across GLOSSARY.md and CLAUDE.md and pushed HANDOFF.md to 22 lines against its own 20-line rule - all caught only by an ad-hoc grep after an initial push.

## Trigger

- Proactive (primary): immediately after staging any change that renames, moves, splits, or merges a document, or that changes what a document is *for* (so references to it change meaning).
- Direct: "check for stale references", "did the split break anything?"
- Negative: not needed for pure content edits within one document that no other document names section-by-section.

## Inputs

- The set of old names/paths affected (from `git status` / `git diff --stat` of the staged change).
- The live tree (excluding quarantined areas like `archive/`, whose internal references are deliberately frozen).
- Each document's self-declared constraints (e.g., a header saying "keep under 20 lines").

## Outputs

- A pass/fail report per old name and per constraint.
- Fix commits (or amendments to the staged change) for every hit.
- Nothing else — the sweep never rewrites content beyond reference/constraint repairs.

## Workflow

1. Collect the old identifiers: file names, paths, and any renamed concepts (e.g., a file that changed role even if its path is unchanged).
2. Grep the live tree for each identifier, excluding quarantined/archived directories and the diff's own removals: `grep -rn "<old-name>" -- <live files>`.
3. For each hit, decide: update the reference to the new target, or — if the referencing sentence's *meaning* changed — rewrite that sentence. A reference that resolves but now says the wrong thing is still a defect.
4. Enumerate self-declared constraints in touched documents (grep for phrases like "keep under", "must contain") and verify each mechanically (`wc -l`, section greps).
5. Fix all defects in the same change-set; re-run steps 2–4 until clean.
6. Only then push. If a defect is discovered after a push (as in this session), fix in an immediate follow-up commit that names what went stale and why.

## Concrete examples

### Example 1: the register split (this session)

Staged change: `REQUIREMENTS.md` split into `REQUIREMENTS.md` (active) + `CANDIDATES.md` (proposals). Sweep: `grep -rn "REQUIREMENTS.md" CLAUDE.md README.md HANDOFF.md LESSONS.md GLOSSARY.md reviews/`. Hits: GLOSSARY.md's "Candidate requirement" entry and storage note still pointed candidates at REQUIREMENTS.md; CLAUDE.md's status line told sessions to mark up the wrong file. Constraint check: `wc -l HANDOFF.md` → 22 against its own ≤20 rule. Output: one fix commit ("Fix remaining register references; restore HANDOFF line budget") updating three references and trimming HANDOFF to 19 lines.

### Example 2: archiving a directory

Staged change: `docs/standards/repo-layout.md` moved to `archive/repo-layout.md`. Sweep: grep live tree for `docs/standards` and `repo-layout`. Hits in the old CLAUDE.md ("Where things are" listed `docs/standards/...`) and README's standing-documents table. Fix: rewrite both entry-point docs so they describe only what exists; verify with a final grep that no live doc mentions `docs/standards`. (This session did exactly this during the archive move, which is why that split shipped clean.)

## Anti-patterns

- **Sweeping only for paths.** HANDOFF.md never moved, but its 20-line constraint broke; constraints are part of the sweep, not an extra.
- **Fixing hits inside `archive/` or other quarantined areas.** Frozen material keeps its internal references; "fixing" them destroys the historical record.
- **Trusting the editor's memory of what references exist.** All three stale references in this session were in files the author had touched minutes earlier and believed consistent.
- **Treating a resolving-but-wrong reference as fine.** CLAUDE.md's "mark up REQUIREMENTS.md" resolved to a real file — and directed future sessions at the wrong one.

## Acceptance criteria

- [ ] Every old name/path greps to zero hits in live (non-quarantined) files before push.
- [ ] Every self-declared constraint in touched documents verifies mechanically.
- [ ] Fixes land in the same change-set as the restructure, or in an immediate named follow-up.
- [ ] Quarantined directories are excluded from fixes and the exclusion is deliberate.

## Files this skill creates / modifies

- Any live document holding a stale reference — reference/constraint repairs only.
- No new files; the skill's output is the repaired change-set itself.
