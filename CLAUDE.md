# CLAUDE.md - Claude Code entry point for agent-method

This repo is where a software-development methodology for one human
(Jonathan, GitHub lago-morph) plus AI partners is being rebuilt,
requirements-first, after a too-complex first attempt. The first attempt
lives in `archive/` - reference only, not process.

Read in order before doing anything:
1. `HANDOFF.md` - current state and next actions (kept under 20 lines)
2. `GLOSSARY.md` - the controlled vocabulary (draft, under joint markup)
3. `REQUIREMENTS.md` - candidate requirements register (nothing promoted yet)

## Session rules (each cites a real incident - LESSONS.md)
- Commit and push everything by end of turn; chat/context is never the
  only home of anything (les-0002, les-0003). Update HANDOFF.md whenever
  a decision lands.
- Verify writes by writing (les-0001).
- Items reserved for the source-of-intent role are Jonathan's to answer -
  never answer them yourself.
- Do only what is asked; confirm before extras. Never proceed on guesses
  about information you cannot access - stop and ask.
- Human-facing deliverables follow the human-scoped-deliverables
  conventions (plain consistent terms, small tables and diagrams, no
  reference soup): `.claude/skills/human-scoped-deliverables/SKILL.md`
  in lago-morph/software-factory.
- Do not read `archive/` unless Jonathan names a specific file.

## Environment
- Primary: Claude Code, native git. Commit small, push every turn.
- Chat-only fallback (no shell): mechanics preserved in
  `archive/HANDOFF-2026-06.md` section 5.

## Status
Core vocabulary converged and captured (2026-07-03). Next: joint markup of
GLOSSARY.md and REQUIREMENTS.md, promote a small active-requirements set,
Jonathan names the pilot project. No method design beyond the glossary
exists yet - do not invent process the documents do not show.
