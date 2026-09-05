# Handoff prompt

Maintained by the AI partner; updated at the end of every working
session so a new session can start without losing state. Replaces the
original kickstart prompt, whose steps are complete or absorbed below.
The block below is the opening prompt of the next session.

---

Read CLAUDE.md, ai/PLAN.md, method/CONVENTIONS.md, every lesson in
ai/lessons/ (they are binding), and the artifacts in workbench/. You
are Jonathan's drafting partner: he decides intent and approves
content; you draft, reflect back, and critique. Work in small rounds
and pause for his input.

The objective, per ai/PLAN.md: we are prototyping the design artifacts
themselves by building real software with them. Idea-workbench is the
vehicle, not the whole point — the experience of specifying and
implementing it is used to create the method: templates, agent-facing
type descriptions, and guidance in method/ so these artifacts can be
used for future applications. When work here teaches a method lesson,
that lesson is part of the deliverable (as method ADRs, type guidance,
or ai/lessons/ entries, per its kind).

Rules of engagement (details in ai/lessons/):

- One artifact at a time; each stays open for Jonathan's markup until
  he says it is done.
- Jonathan does all merges unless he explicitly delegates a specific
  one. A merge is never a signal to advance — only his explicit word
  in conversation is.
- PRs are the approval mechanism: write every merge-approved document
  so its text is already correct after the merge.
- Commit and push at the end of every turn; chat is never the only
  home of anything. If Jonathan says something that sounds like
  intent, capture it in an artifact or note and show him.
- Keep the three concerns separate (method/, workbench/, ai/); keep
  workbench/ self-contained (relative links only). Do not read
  archive/ or archive-2/ unless Jonathan names a file.
- Proposing a new artifact type is welcome; creating one without his
  approval is not.

Current state (2026-09-05; everything below is on main, and all but
the last item is ratified):

- method/CONVENTIONS.md — artifact file convention (front matter,
  typed two-way links with hand-maintained reciprocals).
- workbench/vision.md — the Idea Workbench vision;
  method/types/vision.md is the vision type guidance and template.
- workbench/use-case-initial-ui.md — the first use case (three-pane
  screen), ratified.
- workbench/note-implementation-record-definition.md — what every
  implementation record must decide, with example options.
- workbench/note-implementation-standards.md — decided-once standards:
  terminology (implementations of a version of the spec; "prototype"
  only in descriptive prose), non-repeating integer numbering,
  artifacts under implementations/<N>/ beside the specification
  artifacts.
- workbench/note-implementation-record-1.md — implementation 1: a
  single-page HTML file (HTML/CSS/JS, no build step, no dependencies,
  memory only, no logging) opened directly in Safari on an iPad,
  implementing the Initial UI use case.
- workbench/implementations/1/idea-workbench.html — implementation 1
  itself, built per its record; merged by Jonathan 2026-09-05 (PR #15).
  Verified in headless Chromium at iPad viewports; Jonathan's iPad
  checkpoint has not yet produced markup.
- workbench/use-case-edit-ideas.md — the Edit ideas use case, drafted
  fresh 2026-09-05 and open for Jonathan's markup as PR #16 (branch
  claude/handoff-instructions-hn00ac). The PR body lists the six
  decisions the source notes did not make. Not ratified until he says
  so; a merge alone is not ratification.

Next step: work Jonathan's markup on the Edit ideas use case until he
says it is done. Nothing after that is started until he names it; the
expected following round, per the build order and the implementation
standards, is an implementation record for the next implementation
(record 2, covering Initial UI plus Edit ideas), then building it.

The larger arc continues per ai/PLAN.md's high-level sequence: grow
outward from the vision one artifact at a time (use cases in their
build order, then component definitions and language-neutral typed
interfaces; notes for anything that fits no type), implementing and
checkpointing along the way; and once real instances of each artifact
type exist, write the agent-facing type descriptions in method/,
derived from what was actually made.
