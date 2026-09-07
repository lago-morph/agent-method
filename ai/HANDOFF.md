# Handoff prompt

Maintained by the AI partner; updated at the end of every working
session so a new session can start without losing state. The block
below is the opening prompt of the next session. The chronological
record of how the state came about is in this file's git history
(the version at commit 780fba6 is the last log-style one) and in
ai/retrospective/.

---

Read CLAUDE.md, ai/PLAN.md, method/CONVENTIONS.md, every lesson in
ai/lessons/ (they are binding), ai/procedures/README.md, and the
artifacts in workbench/ — start with workbench/README.md,
note/decision-guides.md, note/implementation-standards.md, and
note/implementation-record-definition.md, then the vision and the two
use cases, then the rest as needed. You are Jonathan's drafting
partner: he decides intent and approves content; you draft, reflect
back, and critique. Work in small rounds and pause for his input.

The objective, per ai/PLAN.md: we are prototyping the design artifacts
themselves by building real software with them. Idea-workbench is the
vehicle, not the whole point — the experience of specifying and
implementing it is used to create the method: templates, agent-facing
type descriptions, and guidance in method/ so these artifacts can be
used for future applications. When work here teaches a method lesson,
that lesson is part of the deliverable (as method ADRs, type guidance,
or ai/lessons/ entries, per its kind).

## Rules of engagement (details in ai/lessons/)

- One artifact at a time; each stays open for Jonathan's markup until
  he says it is done.
- Jonathan does all merges. A merge is never a signal to advance, and
  ratification is only his explicit statement in conversation.
- PRs are the approval mechanism: write every merge-approved document
  so its text is already correct after the merge; no pending-state
  markers inside artifacts.
- Commit and push at the end of every turn; chat is never the only
  home of anything. If Jonathan says something that sounds like
  intent, capture it in an artifact or note and show him.
- Once the run that builds an implementation has finished, the
  implementation, its record, and its per-area notes are never edited:
  they are the historical record. The run's output is the measurement;
  the review records what it finds and changes nothing in those files.
  Markup goes to the use cases, in its own PR, for the next
  implementation. Changes after a delivery PR's first commit are
  sectioned off into their own PR.
- Use cases never depend on the specific test-data set: examples, not
  counts or item names. The UI use case (Initial UI) owns display and
  layout; other use cases are UI-neutral, with interface detail only
  in an Interface guidance section (ADR 0006).
- Refer to implementations by their record number, never by run
  numbers.
- Keep the three concerns separate (method/, workbench/, ai/); keep
  workbench/ self-contained (relative links only). Do not read
  archive/ or archive-2/ unless Jonathan names a file.
- Proposing a new artifact type is welcome; creating one without his
  approval is not.

## Current state (everything on main through PR #24 is ratified;
## Jonathan stated it explicitly on 2026-09-06, recorded in PR #22.
## PR #25, implementation 4, awaits his checkpoint)

Method (method/):
- CONVENTIONS.md — one folder per artifact type under workbench/
  (vision/, use-case/, note/; component/ and interface/ when they
  exist); id = filename stem; front-matter links are type/id.md with
  hand-maintained reciprocals; body links are file-relative and need
  no reciprocal.
- adr/0001–0007 — ADRs live with their concern; discuss before
  delivering on intent-level work; keep the three concerns separate;
  preserve definitions separately from instances; specify corner cases
  in use cases; the UI design lives in the UI use cases and other use
  cases are UI-neutral; artifacts must suffice for regeneration (the
  workbench plus the method handed to an agent with no other context
  yields a similar result including the QA checks).
- types/vision.md — the vision type's guidance and template (the only
  type description written so far; the rest wait for real instances).

Workbench (workbench/):
- vision/vision.md.
- use-case/initial-ui.md — the UI use case: three panes plus a message
  area (current message with ×, list button always present, session
  message list with times, opens empty); list updated after every
  change; ordering case-insensitive over the entire content; first
  line as title, truncated by width; words wider than the right pane
  split with display-only hyphens as typed; "(empty)" placeholder; the
  designed test-data set with an item per corner case.
- use-case/edit-ideas.md — the functional editing use case: edit area,
  New (selects, insertion point at start), the list follows the text,
  leading whitespace stripped at every update with a message when the
  user's edit caused it, blank ideas exist only while active, undo by
  units (typed runs with their leading whitespace; deletion runs by
  unit; paste as one), a Detailed behavior section with an edge-case
  table and pseudocode algorithm (may later move to its own artifact),
  an Interface guidance section with the browser subsection, and a
  walk-through of examples.
- note/implementation-record-definition.md (what a record decides; a
  record is short bullets linking to per-area notes),
  note/implementation-standards.md (numbering, implementations/<N>/,
  delivered implementations are frozen),
  note/decision-guides.md (the guide / decisions / standard pattern,
  scoping rules, walkthrough guidance, foreseen areas including
  persistent storage and delivery to the device), and the guides:
  note/ui-standards-definition.md, test-method-definition.md,
  acceptance-criteria-definition.md, test-data-definition.md,
  quality-standards-definition.md (what, not how; execution methods
  belong to the method proper later). The UI guide has 15 questions
  and the test-data guide 9 after implementation 4's review; the
  decision guides foresee an implementation-structure guide.
  note/v1-scope-and-prototyping-intent.md holds Jonathan's scope
  discipline.
- Implementations 1, 2, 3 — each a single HTML file plus verify.js
  under implementations/<N>/, with note/implementation-record-<N>.md
  and per-area notes (ui-decisions, implementation-structure,
  test-method, acceptance-criteria, test-data, automated-checks).
  1: Initial UI only. 2: Initial UI plus Edit ideas as first ratified.
  3: the 2026-09-05 revision (whitespace, blank ideas, undo by units,
  message area), built by the subagent procedure with Opus; frozen.
  4: the 2026-09-06 revision (ordering over the entire content,
  partial-word truncation, display-only hyphen splitting by a two-layer
  right pane, empty message list), built by the procedure with Sonnet
  (PR #25), delivered exactly as the run produced it; the review's
  findings are recorded in the procedure's implementation 4 section,
  not applied (the session applied one and Jonathan had it reverted).
  ai/implementation-comparison-3-4.md compares 3 and 4 for Jonathan
  (sophistication; where an architecture guide would help).

Procedures (ai/procedures/, non-normative working documents, revised
whenever the same work recurs): implement-by-subagent.md (the
implementation procedure: record N first, then a clean-context
subagent with tiered document access; prompt template, review checklist, per-implementation metrics for 2,
3, and 4; Opus and Sonnet both worked as written; the review's
read-through and independent script are delegated to clean-context
reviewers), ui-checks-
playwright.md, artifact-link-check.md (third-version validator),
use-case-neutrality-check.md, deliver-to-ipad.md (attach the file in
chat plus a hosted copy; raw GitHub downloads gain .txt on iPadOS).

## Known open points (not pending markup)

- Implementation 3 reported seven ambiguities it decided and Jonathan
  did not change the use cases for: platform word-deletion is one
  change; the algorithm's run.entry aliases history[index]; an open
  deletion run goes stale when a strip changes its base text; Initial
  UI's whitespace-only sub-case is unreachable with editing in force;
  the message list is a panel directly above the area; the message
  area is 44 px holding one line; no test item has leading whitespace
  with visible content. The next implementation follows implementation
  3's decisions (in its notes) unless the use cases change, and reports
  them again.
- Implementation 4 reported six ambiguities and the review added two
  gaps: the caret can drift from its apparent neighbour inside a word
  split over several lines; a word the canvas under-measures would be
  clipped, not wrapped; "a hyphen at every line" is verified only by
  inspection; two of the six 2026-09-06 wording changes were already
  implementation 3's behavior; a record that lists the spec's changes
  invites the run to classify them; the test data still has no item
  with leading whitespace and visible content. The review's findings
  on the run's notes and checks (a miscount in the record, three
  guide questions unanswered, two checks observing less than their
  rows claim) are listed in the procedure's implementation 4 section
  for the next implementation. The 3-vs-4 comparison found that the
  two right-pane layers can differ in height when one word runs to
  thousands of characters, leaving the last line unreachable.
- Proposed use-case markup, from Jonathan on 2026-09-07, not applied:
  "Emojis are out of scope for idea text. We can limit to utf-8", and
  splitting a wide word has rules on length only. The Initial UI use
  case's idea-text section is where it would go; the session drafts
  it only on his word.
- Jonathan's review of PR #25 (19 threads: the notes restate other
  documents, implementation-specific artifacts belong with the
  implementations, procedures and the handoff are transcripts and too
  long, the long-word rules leave the use case, the run read
  implementation 3) is captured verbatim in ai/feedback-pr-25.md for
  future PRs.
- A spec version is identified only by date and PR number.
- Delivery to the device has no durable route yet; the persistent-
  storage guide is needed by the Save use case; the test data needs a
  home once the load button goes.
- No implementation has been verified in Safari or WebKit; the iPad
  checkpoint is Jonathan's, and his findings arrive as use-case markup.

## Standing directions from Jonathan

- Capture every decision an implementation makes that the spec did not,
  in the per-area notes, so implementation is repeatable; guides gain a
  question whenever one was missing.
- Execution methods are recorded retrospectively in ai/procedures/;
  the formal versions (skills, linters, CI) come after the first rounds
  of implementing the workbench, when the method's schemas and support
  materials are built.
- Implementation is by the subagent procedure: record N's owner
  decisions drafted first for his markup, then the run, then the
  review checklist, then delivery as a PR with the file attached and a
  hosted copy.
- Preserve the session's context: delegate bounded work (the run, the
  review's read-through and independent script, comparisons) to
  clean-context subagents and keep only their conclusions.
- Subscribe to a PR for one hour at most, then unsubscribe and stop
  checking (ai/lessons/pr-watching-is-capped-at-one-hour.md).

## Next step

Jonathan's iPad checkpoint on implementation 4 (PR #25; the file was
attached in the session and a hosted copy published). His findings
arrive as use-case markup in their own PR; implementation 4 itself is
not edited. His reading of ai/implementation-comparison-3-4.md may
also produce direction on an implementation-structure guide — a new
guide is proposed, not created, until he approves it. Implementation 5
starts only on his word, with the model he names (a second Sonnet run
would measure variance; Haiku would extend the context test).
Before any of that, on his word: process ai/feedback-pr-25.md, one
theme per PR.
