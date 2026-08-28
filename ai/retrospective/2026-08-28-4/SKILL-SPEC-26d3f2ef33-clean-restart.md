# Spec: `clean-restart`

- **ID**: SKILL-SPEC-26d3f2ef33
- **Source retrospective**: ../2026-08-28-4.md

## Intent

Restart a repository's working surface cleanly while preserving every prior attempt for later mining. Move all current top-level material into the next numbered archive directory (archive/, archive-2/, ...) with git mv, leave a minimal agents file that quarantines the archives from ordinary sessions, and seed the new start with a single captured-decisions file. Grounded in the 2026-08-28 agent-method restart, where the requirements-first rebuild moved wholesale to archive-2/ and the new start began from method/SEED.md.

## Trigger

Direct: "start over clean in this repo", "archive everything and restart", "take everything here and archive it to mine later".

Proactive: never. A restart discards the working surface of a repository; it is only ever performed on the user's explicit instruction, with their definition of "clean" confirmed (archive directory vs. fresh history).

Negative: do NOT trigger for archiving a single file or subdirectory, for deleting content (a restart preserves everything), or when the user asks to reorganize rather than restart.

## Inputs

- The repository and its current default-branch state.
- The user's rulings: what "clean" means (numbered archive directory with history intact is the default; a fresh orphan history only if explicitly demanded), what survives at root (LICENSE stays; anything else only if named), and what seeds the new start.
- The set of decisions already made for the new direction (these go in the seed file).

## Outputs

- `archive-N/` containing everything previously at top level (N = next unused number), moved with `git mv`, history intact.
- A minimal root agents file (e.g. `CLAUDE.md`) containing only: the restart date, one line per archive directory stating honestly that it is an aborted attempt kept as source material, and the quarantine rule ("do not read anything inside unless <user> names a specific file"), plus a pointer to the seed file.
- A seed file capturing the new start's agreed decisions, labeled with its provenance (captured from which session, on what date) and what it is not ("raw material, not the method itself").
- One commit, pushed, with a PR.

## Workflow

1. Confirm the user's definition of "clean" and what survives at root before touching anything. Do not guess.
2. `mkdir archive-N` where N is the next unused number (check for existing `archive*/` directories).
3. `git mv` every top-level file and directory into `archive-N/`, except `.git`, existing `archive*/` directories, `LICENSE`, and anything the user named as surviving. Files under a no-read quarantine are moved without being opened.
4. Write the minimal root agents file (restart date, honest per-archive labels, quarantine rule, seed pointer). If the user said they will author agent guidance themselves, include only the archive guidance and nothing else.
5. Write the seed file from the user's actual rulings in the conversation — their words, not embellishments. Include a "next action" section.
6. Commit ("Restart clean: archive <attempt-name> to archive-N/"), push, open a PR describing what moved and what the new root contains.

## Concrete examples

### Example 1: agent-method archive-2 (this session)

Input: Jonathan's ruling "Clean means an archive-2 directory, plus lightweight guidance to future agents that those directories represent aborted attempts and to only look in those directories when directed." Action: `git mv CANDIDATES.md CLAUDE.md GLOSSARY.md HANDOFF.md LESSONS.md README.md REQUIREMENTS.md retrospective reviews archive-2/` (CANDIDATES.md moved unread — it was quarantined); new 13-line CLAUDE.md with only archive guidance; SEED.md capturing the artifact types and link rules. Commit `7cb1099` "Restart clean: archive requirements-first attempt to archive-2/", PR #3, merged same day. LICENSE and archive/ (the first attempt) untouched.

### Example 2: a second restart of the same repo (hypothetical shape)

If the artifacts-first attempt were later aborted: everything except `.git`, `LICENSE`, `archive/`, `archive-2/` moves to `archive-3/`; the root agents file gains a third honest line ("archive-3/ - third attempt, artifacts-first (aborted: <reason in the user's words>)"); a new seed file captures the fourth direction. The quarantine rule is unchanged.

## Anti-patterns

- **Reading archived content while moving it.** CANDIDATES.md was under quarantine; `git mv` moves without printing. Opening files "to check" breaks the quarantine the restart exists to create.
- **Deleting instead of archiving.** The user's stated purpose is mining later; a restart that loses material has failed.
- **Writing a rich new agents file.** Jonathan said "Leave the new agents md file alone. I'll look at it myself" — the root file carries the archive guidance the user asked for and nothing more.
- **Softening the archive labels.** "Previous work" is evasive; the honest label is "aborted attempt, kept for reference only" — the user asked for exactly that honesty in the README.

## Acceptance criteria

- [ ] `git log --follow` on any archived file shows unbroken history through the move.
- [ ] Root contains only: the agents file, the seed file, LICENSE, archive directories, and anything the user explicitly named (plus, later, directories the new direction adds).
- [ ] Quarantined files were never printed to the transcript.
- [ ] The seed file contains only decisions the user actually made, attributed to the session that made them.

## Files this skill creates / modifies

- `archive-N/**` — everything moved from top level, via git mv.
- `CLAUDE.md` (or the project's agents file) — minimal archive guidance + seed pointer.
- `<seed file>` — captured decisions for the new start (this session used `SEED.md`, later `method/SEED.md`).
