# CLAUDE.md - Claude Code entry point for agent-method

Read `HANDOFF.md` FIRST. It is the AI-audience state dump: full design
synthesis, session protocol, repo state, open items. Do nothing before
reading it.

## Session rules (summary - HANDOFF.md section 2 is authoritative)
- Commit and push everything by end of turn. The working tree and your
  context are both volatile (LESSONS.md: les-0002, les-0003).
- Update HANDOFF.md whenever a decision lands. Chat/context is never the
  only home of anything.
- Document states: `draft` merges ungated; only drafts may depend on a
  draft. `gated` requires a gate record + fully-gated dependency closure
  (docs/standards/repo-layout.md).
- Done = the verdict of a gate, never a claim. Human (stakeholder) checklist
  items are Jonathan's to answer - never answer them yourself.
- Do only what is asked; confirm before extras. Never proceed on guesses
  about information you cannot access - stop and ask.

## Environment
- Primary: Claude Code (this file is your entry point). Use native git:
  branch if work is risky, commit small, push every turn.
- Fallback (chat-only sessions, no shell): Jentic -> GitHub Git Data API;
  operation UUIDs and sequence in HANDOFF.md section 5.

## Where things are
- `model/` - this repo's own work products (vision, plan, gate-records/)
- `method/content/` - harvested method content (templates, checklists + .gates.yaml)
- `method/harvest/NOTES.md` - sources, inventories, XMI format findings
- `docs/standards/repo-layout.md` - layout + document-state rules
- `LESSONS.md` - incident-cited lessons register

## Current focus
See `model/plan.md`. Next milestone: stakeholder closes the three EDIT
markers in `model/vision.md`, then the Vision gates run by hand and
`model/gate-records/gr-0001-vision.md` is written.
