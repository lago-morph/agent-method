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
- Also in PR #16, at Jonathan's direction the same day: implementation
  record 1 enhanced with the decisions made while building it (UI,
  structure, test method, acceptance-criteria table, test data,
  delivery, known gaps); implementations/1/verify.js as an
  implementation artifact; and five notes defining future artifacts —
  note-decision-guides.md (the guide / decisions / standard pattern,
  scoping rules, walkthrough guidance, foreseen areas such as
  persistent storage) plus guides for UI standards, test method,
  acceptance criteria, and test data. Open for markup like the rest.
- method/adr/0006-use-cases-are-platform-neutral.md — adopted from
  Jonathan's markup on the Edit ideas use case (PR #16) and his
  clarification: the UI use cases (one or more per kind of interface,
  logically one; Initial UI today) are the single home of the UI design
  and name the functional areas; every other use case is
  UI-neutral (elements by function not position, silent about other
  use cases and persistence, platform-neutral wording, the TUI/native
  test), with interface-specific detail allowed only in an Interface
  guidance section holding one subsection per interface currently
  specified (no placeholders). Adding a kind of UI means writing its UI
  use case, then sweeping the other use cases' Interface guidance
  sections. To be carried into the use-case type guidance when it is
  written, distinguishing the two kinds of use case.

- workbench/note-automated-checks-1.md and
  method/adr/0007-artifacts-must-suffice-for-regeneration.md — from
  Jonathan's markup on verify.js: the checks are specified in a note
  the script is derived from (environment, hooks contract, sequence
  with expected values, output contract, decisions with reasons,
  regeneration steps), and the method rule is that workbench/ plus
  method/ handed to an agent with no other context must yield a
  similar result including all QA checks. The test-method guide now
  says what such a note must contain.

- workbench/note-quality-standards-definition.md — from Jonathan's
  markup on the acceptance-criteria guide: the non-user-visible quality
  checks (unit test standards, type checking, static analysis,
  integration, UI, end-to-end) are specified as what we want, not how.

Execution methods for the quality guides (Jonathan's direction,
2026-09-05): the formal versions — AI skills, reference procedures,
linters, CI pipelines in the method proper — are built only after the
first rounds of implementing the workbench, when the artifact schemas
and other support materials are developed. Until then, the AI partner
records what it actually did, retrospectively and never as a forward
design step, as non-normative working documents in ai/procedures/
(started after implementation 1: Playwright UI checks, the link
reciprocity check, the use-case neutrality check, delivery to the
iPad). Revise those files whenever the same work is done again for a
later implementation; add one when something new is done.

- Per Jonathan's markup on record 1 (PR #16): an implementation record
  is a short list of bullets linking to structured documents with the
  detail. Record 1 now keeps one line per area; the detail lives in
  note-ui-decisions-1, note-implementation-structure-1,
  note-test-method-1, note-acceptance-criteria-1, note-test-data-1
  (and note-automated-checks-1). He expects these to become artifact
  types later. The record definition carries the shape rule.

Standing direction from Jonathan (2026-09-05): capture every decision
an implementation makes that the spec did not, so implementation is
repeatable and deterministic; future implementations with more choices
(persistent storage, UI) need structured artifacts that guide the
decision and durably record it. note-decision-guides.md is the current
home of that pattern; before planning implementation 2, read the
guides and propose the open decisions in its record first.

- 2026-09-05, later: PR #16 merged by Jonathan; he ratified the Edit
  ideas use case in conversation and named implementation 2 as the next
  round, to be built as a regeneration test (ADR 0007). A fresh Opus
  subagent, given only method/, workbench/, and ai/procedures/, built
  implementation 2 (Initial UI plus Edit ideas, same environment as 1):
  workbench/implementations/2/, note-implementation-record-2.md and its
  six per-area notes. Reviewed by the session with a rerun of its checks,
  an independent Playwright script from the use case, the front-matter
  and link validator, and screenshots; all clean. Delivered as PR #17
  (branch claude/handoff-instructions-hn00ac), the file attached in chat
  and a hosted copy published. The run's 15 ambiguities are folded into
  the guides (questions added), the procedures (revised, plus
  ai/procedures/regeneration-run.md), and the PR body. Three are
  use-case defects listed in the PR for Jonathan's markup: where a new
  idea sits among the placeholders, what one undoable "change" is, and
  Initial UI's "or 'new' is clicked" clause. Ratified use cases were not
  edited.

- 2026-09-05, later still: Jonathan answered the three use-case
  questions and added rules, in conversation; applied to the ratified
  use cases on the same branch (PR #17): leading whitespace is stripped
  at every list update (message to the user when their edit caused it);
  blank ideas exist only while active and are deleted otherwise,
  including blank loaded content at load; undo groups leading
  whitespace with the text that follows and treats whitespace
  sequences as one; New selects the new idea with the insertion point
  at the start. Edit ideas now carries an edge-case table and a
  pseudocode algorithm, with a note that such material may later move
  to its own artifact (a detailed design or similar; decision deferred
  until more examples exist). Initial UI gains the message area
  (current message with ×, list button, session message list with
  times) and fixes list-update timing (after every change). Consequence
  confirmed by Jonathan: the empty and whitespace-only test-data items
  are deleted at load and never appear (the test data confirms the
  startup behavior); trailing whitespace is kept; whitespace typed at
  the start is stripped before it is visible. His deletion rule:
  consecutive deletions are one change while they remove one unit (a
  run of non-whitespace plus the whitespace before it). Implementation
  2 implements the previous spec version; implementation 3 would
  implement this one. At his direction the work was split: PR #17
  (branch claude/handoff-instructions-hn00ac) holds everything through
  implementation 2 and its review; the use-case revisions are a
  stacked PR on branch claude/use-cases-whitespace-undo-messages,
  based on PR #17's branch until that merges.

Next step: Jonathan's checkpoint on implementation 2 (iPad) and his
markup on PR #17, now including the revised use cases; work that markup
until he says it is done. Nothing after that is started until he
names it. The build order's next use case is Save ideas, which needs the
persistent-storage guide foreseen in note-decision-guides.md; the
test-data guide's open questions are to be raised in that round.

The larger arc continues per ai/PLAN.md's high-level sequence: grow
outward from the vision one artifact at a time (use cases in their
build order, then component definitions and language-neutral typed
interfaces; notes for anything that fits no type), implementing and
checkpointing along the way; and once real instances of each artifact
type exist, write the agent-facing type descriptions in method/,
derived from what was actually made.
