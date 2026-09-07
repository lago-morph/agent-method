# Method phase plan

The plan for analyzing what four implementations, four retrospectives,
and the PR #25 review taught, and acting on it in the method. Executed
one step per session, each step one PR, by Opus, with Jonathan deciding
at every step.

## How to execute a step

1. A fresh session reads CLAUDE.md, `ai/lessons/`, this preamble, the
   status table, and the section of the step marked **next** in the
   table. It then loads only the context that step names. It does not
   read the other steps.
2. The session posts the step's summary and opens the conversation:
   the decisions first, each with its recommendation, then the
   consequences. It updates both for the repository's current state
   before posting, since earlier steps may have changed the ground.
3. Jonathan decides. Only his explicit statement closes a decision.
4. The session drafts the step's output as one PR. The PR body names
   what implementation 5 will measure about the change (step 1's rule).
5. Jonathan marks up and ratifies explicitly. The session then sets the
   step's status to done in the table, in the same PR or the next.
6. Outputs of steps 2 to 4 bind every later step from their
   ratification onward. Each later PR is checked against them before
   it is opened.

Prerequisite, done before step 1: the use-case markup from PR #25
(long-word rules replaced by "nothing is ever hidden; innovate if the
default is insufficient"; emoji out of scope; idea text is UTF-8) is
on main.

Why this order: standards first, because everything after is written
against them. The archive convention before anything is removed. Types
in the order a run consumes them. Reviews after everything is
rewritten. The measurement last.

**Gates.** Four review gates, lettered A to D, sit between clusters of
steps and appear in the status table in execution order. A gate is a step in every way except that its decisions are
findings. The session dispatches one clean-context subagent per role,
each with a brief under 200 words naming the document set and the
question; each returns findings only (location, problem, severity, the
step that owns the fix) and edits nothing. The session collates them
into one table in the gate's PR body. Severity is one of: blocks
implementation 5, fix in gate, note. Small fixes land in the gate's PR;
large ones reopen the owning step or join the follow-up list. Jonathan
reviews the collated table, not the raw reviews. The six roles:

| Role | Question |
| --- | --- |
| Consistency | Where do documents in this set contradict or duplicate each other? |
| Gap and overlap | Does every piece of content have exactly one type home, and every type an instance? |
| Schema | Do front matter, folders, link types, and names agree with the conventions and each other? |
| Procedure match | Does every procedure step name artifacts that exist, in the shape the types define? |
| Fresh reader | Restate this document in your own words, or dry-run this task without producing anything; where were you unsure? |
| Disclosure audit | Which documents exceed budget, link to forbidden paths, or carry history? |

## Status

| # | Step | Status | PR |
| --- | --- | --- | --- |
| 1 | Working rules for the method phase | next | |
| 2 | Progressive-disclosure standard | | |
| 3 | Writing-style standard | | |
| 4 | Mutability standard | | |
| A | Gate: standards | | |
| 5 | Archive convention | | |
| 6 | Restructure the workbench | | |
| 7 | Type: implementation record | | |
| 8 | Type: decision guide and standard | | |
| 9 | Which decision areas are per-implementation | | |
| 10 | Type: test data | | |
| 11 | Type: test method | | |
| 12 | Type: acceptance criteria | | |
| 13 | Type: automated checks | | |
| B | Gate: artifact types | | |
| 14 | Procedure rewrite | | |
| 15 | History extraction | | |
| 16 | Retrospective triage | | |
| 17 | Rewrite the ADRs | | |
| 18 | Rewrite the lessons | | |
| C | Gate: procedures and rules | | |
| 19 | Critical review: workbench-work context | | |
| 20 | Critical review: method-work context | | |
| 21 | Rewrite the entry documents | | |
| D | Gate: regeneration readiness | | |
| 22 | Implementation 5 | | |

**Base context**, loaded for every step: CLAUDE.md, `ai/lessons/`,
this preamble, the status table, the step's section. From step 3 on,
also the ratified standards under `method/standards/`. Each step below
lists only what it needs beyond that.

---

## Step 1 — Working rules for the method phase

**Summary.** State the three rules that govern every later step, so
each clean context starts from the same stance: derive from instances,
treat the implementations as data, measure by regeneration.

**Context.** `ai/PLAN.md` (objective and sequence only);
`method/adr/0007-artifacts-must-suffice-for-regeneration.md`;
`ai/retrospective/2026-08-28-4/ADR-710d782cc2-type-descriptions-are-extracted-from-real-artifact-instances-not-written-first.md`.

**Decisions.**

- Derivation rule: no method document is written without an instance
  behind it. Recommend yes. It is the guard against the failure of the
  second archived attempt, and it means component and interface types
  wait until one exists.
- Data rule: implementations 1 to 4, their records, and their notes are
  frozen experimental data. Moves are allowed only as step 4 permits;
  edits never. Recommend yes.
- Measurement rule: every PR in this plan names what implementation 5
  can measure about its change (documents opened, tokens, ambiguities
  reported, similarity to the previous implementation). Recommend yes.
  A change nobody can measure is a change we cannot defend.
- Where the rules live: a method ADR, since they bind the method, not a
  session. Recommend ADR 0008, under 150 words.

**Consequences.** One new ADR. `ai/PLAN.md` gains one line pointing at
this plan; its status section is left for step 15. Every later PR body
carries a "measured by" line.

**Output.** `method/adr/0008-*.md`; the pointer line in `ai/PLAN.md`.

---

## Step 2 — Progressive-disclosure standard

**Summary.** Define progressive disclosure so it can be checked rather
than felt: reading layers, a budget per layer, and the two rules that
were broken most (linking to forbidden files, history in the reading
path).

**Context.** `ai/lessons/procedures-are-not-transcripts.md`;
`ai/feedback-pr-25.md` threads 4 to 6 and 12; `method/types/vision.md`
(its "no negative pointers" rule is the precedent). The measurements
that motivate the budgets, taken 2026-09-07 on main:

| What a reader is told to read | Words |
| --- | --- |
| The two use cases plus the vision | ~5,000 |
| An implementation run, tiers 1 to 3 | ~15,500 |
| The previous implementation's record and notes (tier 4) | ~11,600 |
| A session start (CLAUDE.md, handoff, plan, lessons) | ~4,400 |

**Decisions.**

- Layers: an entry map, then the task document, then the artifacts the
  task needs, then reference on demand. Every document has one job and
  one intended reader. Recommend these four layers and no more.
- Budgets, in words, to be marked up: entry document 300; task
  procedure 600; any document an agent must read in full 1,500, use
  cases excepted; total mandatory reading for an implementation run
  8,000. Recommend these as starting numbers, revised by step 19's
  measurement.
- Forbidding by omission: a document never links to what its reader
  must not read. The one closed list of forbidden paths lives in the
  entry document. Recommend yes.
- No history in a reading path: revision notes, ratification lines,
  grounding stories, metrics, and transcripts live in git and the
  archive, never in a document an agent reads to act. Recommend yes.
- Compliance: a word-count script over a named reading set, plus the
  documents-opened list from each run. Recommend the script, under
  `method/tools/`; the friction that justifies tooling has been shown.
- Location of the standards: `method/standards/`, one file each.
  Recommend yes; this decision covers steps 3 and 4.

**Consequences.** The budgets become the acceptance test for steps 14
to 21. Nothing is rewritten in this step; the documents that are over
budget today are listed in the PR body and assigned to their steps.

**Output.** `method/standards/progressive-disclosure.md`;
`method/tools/reading-budget.sh` or equivalent.

---

## Step 3 — Writing-style standard

**Summary.** The rules for how an artifact is written, so that a
reviewer can reject a document on form before reading it for content.

**Context.** `ai/feedback-pr-25.md` threads 13 to 19; one document of
the right size (`ai/lessons/jonathan-does-all-merges.md`) and one of
the wrong kind (`workbench/note/test-data-4.md`, read only far enough
to see the pattern); `method/CONVENTIONS.md` opening paragraph as an
example of history in a body.

**Decisions.**

- The rules: declarative and terse; every sentence is something the
  reader can act on or check; link, never restate; no revision history
  or ratification lines in a body; data is data (a test-data artifact
  contains the data); option spaces are tables; a rule is its statement
  plus the minimal context to apply it; no self-narration. Recommend
  all eight, each as one line in the standard.
- Reader marker: does each document name its reader? Recommend no; the
  folder and the layer say who reads it.
- Enforcement: a line in every review checklist; no linter yet.
  Recommend yes.

**Consequences.** Every later step's output is written under this
standard. Existing documents are not rewritten here; steps 14 to 21
do that.

**Output.** `method/standards/writing-style.md`.

---

## Step 4 — Mutability standard

**Summary.** One table saying who may change what, in which phase of an
implementation, replacing the rules now spread across three lessons,
the prompt template, and two notes.

**Context.** `ai/lessons/finished-implementations-are-never-edited.md`,
`ai/lessons/review-findings-are-bounded-by-the-spec.md`,
`ai/lessons/ratification-is-explicit.md`; the Rules block of the prompt
template and the review checklist in
`ai/procedures/implement-by-subagent.md`; the section "Guidance for
taking Jonathan through the decisions" in
`workbench/note/decision-guides.md`;
`workbench/note/implementation-standards.md`.

**Decisions.**

- Phases: before the run (record drafted), during the run, review,
  after delivery. Rows: vision, use cases, guides, standards, method
  documents, record N, the run's decisions, implementation N and its
  checks, earlier implementations, procedures, lessons. Cells: read-only,
  created, frozen, review-changed, owner-only. Recommend this shape.
- Is a move an edit? A move of a frozen file changes its path, and the
  link paths that point at it must change with it. Recommend: a move is
  not an edit when the content diff shows only path strings, verified by
  the link check; anything else is an edit. This is the decision step 6
  depends on.
- Who closes what: the run creates; the review changes guides
  (questions added) and procedures; the owner changes use cases and
  standards. Recommend yes, as the table's legend.

**Consequences.** The three lessons collapse to a pointer at the table
in step 18; the prompt template cites the table in step 14; step 6 has
its permission or its prohibition.

**Output.** `method/standards/mutability.md`.

---

## Gate A — Standards

**Summary.** Check the three standards against each other and against
what already binds, before anything is written under them.

**Context.** `method/standards/*.md`; `ai/lessons/`; `method/adr/`;
three documents to apply the standards to: `method/CONVENTIONS.md`,
`workbench/note/decision-guides.md`, `ai/procedures/implement-by-subagent.md`.

**Roles.**

- Consistency, over the standards, lessons, and ADRs: contradictions
  and duplicates.
- Fresh reader, twice: restate each standard; then apply each rule to
  the three documents and report every rule that could not be applied
  as written.

**Findings feed.** Contradictions reopen the standard's step.
Unapplicable rules are rewritten in the gate's PR.

**Output.** The findings table; the rewrites.

---

## Step 5 — Archive convention

**Summary.** Where removed history goes, how it is indexed, and the
quarantine rule on it, before any later step removes anything.

**Context.** The archive paragraph of CLAUDE.md;
`ai/retrospective/2026-08-28-4/ADR-7f93f65aeb-archive-and-restart-with-numbered-archive-directories-under-read-quarantine.md`.

**Decisions.**

- Location: `ai/archive/`, not a third numbered top-level directory.
  The numbered ones are aborted attempts; this is evidence from the
  attempt that worked. Recommend `ai/archive/` with the same quarantine
  sentence added to CLAUDE.md.
- Index: `ai/archive/INDEX.md`, one line per entry: date, original
  path, what it is, what it is evidence of, where it now lives.
  Recommend yes.
- Granularity: fragments cut from one source file go to one archive file
  named by the source path, each fragment headed by the commit it was
  cut from. Whole files move intact. Recommend yes.
- Copy or reference: git already holds every version. Recommend copying
  the text anyway; a quarantined reader will not run git archaeology,
  and the index needs something to point at.
- Never archived: implementation-specific artifacts, use cases, the
  vision, anything ratified and current.

**Consequences.** Steps 14 to 18 have a destination. CLAUDE.md gains
one line. Whoever archives maintains the index in the same commit.

**Output.** `ai/archive/INDEX.md` (empty table with its columns); the
CLAUDE.md line.

---

## Step 6 — Restructure the workbench

**Summary.** Implementation-specific artifacts move under
`workbench/implementations/<N>/`, byte for byte, so the design
artifacts stop being specific to any one implementation.

**Context.** `method/standards/mutability.md`; `method/CONVENTIONS.md`;
`workbench/README.md`; `ls workbench/note/`; `ai/feedback-pr-25.md`
thread 10.

**Decisions.**

- What moves: `implementation-record-N.md` and the six per-area `-N`
  notes for N in 1 to 4, into `implementations/N/`. The definitions,
  guides, decision-guides, standards, and the scope note stay.
  Recommend exactly that set.
- Are the moved files still artifacts? They keep their front matter,
  and CONVENTIONS.md gains one paragraph: implementation-specific
  artifacts live in `implementations/N/`, typed by front matter, with
  links written as today. Recommend yes; the alternative strips type
  from the historical record.
- Link paths: every front-matter and body link to or from a moved file
  changes. Permitted only as step 4 decided. Recommend a scripted move
  with a diff showing path strings only, and the link check clean.
- Pointers elsewhere (the handoff, the procedure) go stale until steps
  14 and 21. Recommend listing them in the PR body, not fixing them
  here.

**Consequences.** `workbench/note/` shrinks to the guides and
definitions. Four `implementations/N/` folders hold everything about
implementation N.

**Output.** The moves; the CONVENTIONS.md paragraph; a clean link check.

---

## Step 7 — Type: implementation record

**Summary.** The first type description derived from four instances:
what a record is, what it holds, and what it never holds.

**Context.** `method/types/vision.md` (the shape of a type
description); `workbench/note/implementation-record-definition.md`;
the four records and the four implementation-structure notes under
`implementations/N/`; `ai/feedback-pr-25.md` threads 11 and 13 to 15;
`method/adr/0004-preserve-definitions-separately-from-instances.md`.

**Decisions.**

- One artifact or two? Today the record holds the owner's decisions
  (before the run) and the run's decisions (after). The mutability
  table treats them differently. Recommend two: the **record** is the
  owner's input, frozen when the run starts; the **build notes** are
  the run's output, frozen when it ends. The implementation-structure
  note is what the build notes already are, which settles thread 11.
- What the record holds: one bullet per decision area, the spec version
  by date and PR, the environment. It never restates a use case and
  never lists what changed since the last spec version; implementation
  4 spent an ambiguity classifying such a list. Recommend yes, with a
  word budget from the standard.
- Template: derived from record 4's headings minus everything that
  restates. Recommend yes.

**Consequences.** `method/types/implementation-record.md` and
`method/types/build-notes.md`, each under 600 words. The record
definition note is archived with an index line. Records 1 to 4 are
untouched. Record 5 is the first instance of the new shape. The
procedure's tier 1 shrinks.

**Output.** The two type descriptions; the archived definition.

---

## Step 8 — Type: decision guide and standard

**Summary.** The guide, decisions, standard triad becomes typed: what a
guide is, what a standard is, and where each implementation's answers
go.

**Context.** `workbench/note/decision-guides.md`;
`workbench/note/ui-standards-definition.md` (the one called too
verbose) and `implementations/4/ui-decisions-4.md`;
`workbench/note/implementation-standards.md`; `ai/feedback-pr-25.md`
threads 17 to 19;
`ai/retrospective/2026-08-30-13/ADR-3eabee7b1c-artifact-types-emerge-as-definition-standards-instances-triad.md`.

**Decisions.**

- Two types, not three: **guide** and **standard**. An implementation's
  answers are not an artifact; they are one section per area in the
  build notes from step 7. Recommend yes; it removes six files per
  implementation.
- Guide shape: one table, columns question, options, default, who
  answers (owner or run). Nothing else. Recommend a 400-word budget.
- Standard shape: numbered statements; each holds across
  implementations until revised by PR. Recommend yes.
- Folders: CONVENTIONS.md says one folder per type. Recommend
  `workbench/guide/` and `workbench/standard/`, with the current guides
  moved when each area's step rewrites them.

**Consequences.** `method/types/guide.md` and `method/types/standard.md`.
`decision-guides.md` collapses into the two type descriptions plus a
list of areas, which step 9 owns. `implementation-standards.md` becomes
the first standard instance. Each guide is rewritten in its area's step.

**Output.** The two type descriptions; `workbench/standard/implementation.md`.

---

## Step 9 — Which decision areas are per-implementation

**Summary.** For every decision area, decide whether it belongs to the
spec, to a standard, or to one implementation, and say what happens to
the areas that are not per-implementation.

**Context.** The "Decision areas foreseen" section of
`workbench/note/decision-guides.md`; the four `ui-decisions-N.md`
(headings only); `ai/feedback-pr-25.md` thread 18;
`method/adr/0006-use-cases-are-platform-neutral.md`;
`ai/implementation-comparison-3-4.md` (its argument for an
architecture guide).

**Decisions.** Classify each area as spec, standard, or
per-implementation. Recommendations:

| Area | Recommendation | Reason |
| --- | --- | --- |
| UI decisions | Spec plus a UI standard; nothing per-implementation | Thread 18; ADR 0006 puts the UI design in the UI use case |
| Implementation structure | Per-implementation, in build notes; an architecture guide proposed, not created | The 3-versus-4 comparison |
| Test method | Standard, with deviations in build notes | Four implementations answered alike |
| Acceptance criteria | Per spec version, not per implementation | Criteria derive from use-case sentences, which do not change per implementation |
| Test data | Per spec version | Same reason; the data covers the corner cases the spec names |
| Automated checks | Per-implementation | They are code |
| Storage, delivery, code conventions, logging, data model | Deferred until an implementation needs them | The decision-guides note's own rule |

**Consequences.** A short method ADR records the classification.
Steps 10 to 13 each act on their area. The UI guide's questions move to
the Initial UI use case or a UI standard; the per-implementation UI
note retires.

**Output.** `method/adr/0009-*.md`; the UI standard if the owner wants
it in this step, otherwise listed for step 19.

---

## Step 10 — Type: test data

**Summary.** The test data becomes the artifact: the data itself, one
item per corner case, with no history of how the set came to be.

**Context.** `workbench/note/test-data-definition.md`;
`implementations/1/test-data-1.md` (the item list) and
`implementations/4/test-data-4.md` (the pattern to retire); the test-data
section of `workbench/use-case/initial-ui.md`; `ai/feedback-pr-25.md`
thread 16;
`ai/retrospective/2026-09-06-23/ADR-0eaf6c6c61-use-cases-are-independent-of-their-test-data.md`.

**Decisions.**

- Form: a markdown artifact with front matter whose body is one fenced
  JSON block, each item carrying the corner case it covers. Recommend
  this over a bare JSON file, since the conventions need front matter
  and an implementation embeds the data anyway.
- Folder: `workbench/test-data/`, one artifact per data set, versioned
  by spec version in the id. Recommend yes.
- Guide: which of the nine questions survive as a table (size, one item
  per corner case, the leading-whitespace item that no set has had,
  emoji excluded). Recommend keeping four.
- Lifecycle: a set belongs to a spec version; a frozen implementation
  keeps whatever it embedded. Recommend yes.

**Consequences.** `method/types/test-data.md`; the guide as a table
under `workbench/guide/`; a current data set built from the
implementation 1 list plus every corner case added since, as the first
instance. The four `test-data-N` notes stay as data.

**Output.** The type description; the guide; the current data set.

---

## Step 11 — Type: test method

**Summary.** The test method becomes a standard with per-implementation
deviations in the build notes, and the "what versus how" split between
standards and procedures is settled.

**Context.** `workbench/note/test-method-definition.md`;
`implementations/4/test-method-4.md`;
`workbench/note/quality-standards-definition.md`;
`ai/procedures/ui-checks-playwright.md`.

**Decisions.**

- Content of the standard: Playwright in Chromium, both orientations,
  mutation testing of the suite, an independent script from the use
  cases at review. Recommend these four statements.
- What versus how: the standard says what; the procedure says how; the
  quality-standards note's questions fold into the guide table.
  Recommend yes, and the quality-standards note is archived.
- Safari: no implementation has been verified in WebKit. Recommend the
  standard states it as an open question, not a claim.

**Consequences.** `workbench/standard/test-method.md`;
`method/types/standard.md` gains its second instance; the guide as a
table; the quality-standards note archived with an index line.

**Output.** The standard; the guide; the archive entry.

---

## Step 12 — Type: acceptance criteria

**Summary.** Acceptance criteria become a per-spec-version artifact
derived sentence by sentence from the use cases, written before the
run so every implementation is measured against the same list.

**Context.** `workbench/note/acceptance-criteria-definition.md`;
`implementations/1/acceptance-criteria-1.md` and
`implementations/4/acceptance-criteria-4.md`; the headings of the two
use cases; `method/adr/0005-specify-corner-cases-in-use-cases.md`.

**Decisions.**

- Shape: one table per use case, columns sentence reference,
  criterion, checkable by (automated or inspection). Recommend yes.
- Who writes it: today the run does; recommend the spec side, before
  the run, marked up by the owner. Criteria then stay constant across
  models, which is what the comparison needs.
- Folder: `workbench/acceptance-criteria/<use-case-id>.md`. Recommend
  yes.
- The first instances for Initial UI and Edit ideas are written in this
  step, since the type must be tested against real content.

**Consequences.** `method/types/acceptance-criteria.md`; the guide as a
table; two instances; the four `acceptance-criteria-N` notes stay as
data. Step 13's mapping has something to map to.

**Output.** The type description; the guide; the two instances.

---

## Step 13 — Type: automated checks

**Summary.** The checks script is the artifact; the prose note about
it retires in favor of a one-line-per-check mapping to criteria.

**Context.** `implementations/1/automated-checks-1.md` and
`implementations/4/automated-checks-4.md` (headings and one section
each); the header of `implementations/4/verify.js`;
`workbench/acceptance-criteria/` from step 12;
`ai/procedures/ui-checks-playwright.md`.

**Decisions.**

- The artifact: `implementations/N/verify.js`, each check tagged with a
  criterion id. Recommend yes.
- The mapping: a table criterion id to check name, one line each,
  produced by the run or generated from the script. Recommend generated
  by a small script, so it cannot drift.
- Mutation testing: inherited from the test-method standard, not
  restated. Recommend yes.

**Consequences.** `method/types/automated-checks.md`; the 4,000-word
notes are not produced for implementation 5; the four existing notes
stay as data.

**Output.** The type description; the mapping generator under
`method/tools/`.

---

## Gate B — Artifact types

**Summary.** Check that the seven type descriptions cover everything an
implementation produces, once each, and agree with each other and the
conventions.

**Context.** `method/types/*.md`; `method/CONVENTIONS.md`;
`workbench/implementations/4/` (every file, as the content inventory);
the use cases; the guides, standards, test data, and criteria written
in steps 8 to 13; the step 2 budget script.

**Roles.**

- Gap and overlap: list every kind of content in implementation 4's
  files and name its type home; report content with none or two, and
  types with no instance.
- Schema: front matter keys, folder names, link types, and id rules
  across the type descriptions and the conventions.
- Fresh reader: given the types, the spec, and the standards only, say
  what implementation 5 would produce and where; report every point of
  doubt.
- Disclosure audit: budgets over the same set.

**Findings feed.** A missing home reopens the nearest type's step; a
schema disagreement is fixed in the gate; doubt from the fresh reader
is a finding for step 14's tiers.

**Output.** The findings table; the fixes; a draft of the review
procedure's role briefs, since they have now been used twice.

---

## Step 14 — Procedure rewrite

**Summary.** The implementation procedure becomes a procedure: steps,
tiers, prompt, checklist, within budget, with the predecessor withheld.
The other procedures take the same shape.

**Context.** `method/standards/mutability.md`; the type descriptions
from steps 7 to 13; `ai/procedures/README.md`;
`ai/procedures/implement-by-subagent.md` in full (the sections after
"Metrics per run" are the history this step extracts); the other four
procedures;
`ai/retrospective/2026-09-07-25/ADR-fd79af8bcb-a-regeneration-run-is-withheld-the-previous-implementation.md`;
`ai/retrospective/2026-09-07-25/ADR-2f4599fd03-the-run-s-output-is-the-measurement-a-review-records-and-never-edits.md`.

**Decisions.**

- Withhold the predecessor: a run gets the spec, standards, guides,
  test data, and criteria, and nothing from `implementations/`.
  Recommend yes; every run so far measured modification, not
  regeneration. Any hook contract the checks need moves into a standard.
- Where procedures live: they now bind, so `method/procedures/`;
  `ai/procedures/` retires. Recommend yes.
- Run outputs: the run's report and metrics are data, stored under
  `implementations/N/`. The cross-implementation metrics table becomes
  `ai/experiments/implementation-metrics.md`. Recommend yes.
- Tiers redefined against the new types, with the total under the
  step 2 budget. Recommend yes.

**Consequences.** Five procedures rewritten and moved; the
implementation sections and metrics extracted to the archive and the
data file, each with an index line; the prompt template cites the
mutability table.

**Output.** `method/procedures/*.md`; the archive entries; the metrics
file.

---

## Step 15 — History extraction

**Summary.** Every other document in a reading path loses its
transcript and history, fragment by fragment, into the indexed archive.

**Context.** `ai/archive/INDEX.md`; the candidates, confirmed by a grep
for dates, PR numbers, "ratified", "captured", "revised", "clarified":
`method/CONVENTIONS.md` (preamble and the 2026-09-05 clarification);
`workbench/note/decision-guides.md` (opening paragraph);
`method/types/vision.md` (ratified line); `ai/PLAN.md` (preamble and
status); `ai/README.md`; `workbench/note/v1-scope-and-prototyping-intent.md`;
`ai/2026-08-30-conventions-proposal.md` (whole file);
`ai/implementation-comparison-3-4.md` (whole file). ADRs and lessons
are steps 17 and 18; the handoff is step 21.

**Decisions.**

- The candidate list: confirm and extend from the grep. Recommend the
  list above as the floor.
- `ai/PLAN.md`: reduce to objective, sequence, and a pointer to this
  plan; status moves to the handoff in step 21. Recommend yes.
- Meaning never changes in this step: the diff shows deletions and
  pointer lines only. Recommend that as the review rule.

**Consequences.** Each touched document shrinks; the index grows by one
line per fragment; no document in a reading path links to the archive.

**Output.** The edits; the archive files; the index lines.

---

## Step 16 — Retrospective triage

**Summary.** Decide what the four retrospectives contribute: which ADR
drafts are adopted, which rules become lessons, which skill specs are
parked, and archive the rest.

**Context.** Parts 2 to 4 of each retrospective report (not Part 1);
`ls ai/retrospective/*/`; the titles of `method/adr/` and
`ai/lessons/`.

**Decisions.**

- The twelve ADR drafts: adopt, reject, or already covered. Most map to
  a step of this plan: type descriptions from instances (step 1),
  archive under quarantine (step 5), the definition and instances triad
  (step 8), use cases independent of test data (step 10), delivered
  implementations immutable and the run's output is the measurement
  (step 4), the clean-context run and the withheld predecessor
  (step 14). Recommend confirming that mapping and deciding the
  remainder: the note catch-all with promotion, and specifications as
  a typed graph.
- The thirty-one rules: already a lesson, becomes a lesson, harness or
  skill level (parked), or rejected. Recommend that many of the generic
  ones (word-level diff after replacement, verify scripted git surgery)
  become one working-practices list, one line each.
- The eleven skill specs: parked in the archive index until the skills
  phase. Recommend yes.
- The retrospectives themselves: archived after triage. Recommend yes.

**Consequences.** Steps 17 and 18 receive their input lists in the PR
body. `ai/retrospective/` moves under the archive with index lines.

**Output.** The triage table in the PR body; the archive moves.

---

## Step 17 — Rewrite the ADRs

**Summary.** Every ADR becomes its statement plus minimal context, and
the drafts adopted in step 16 join them.

**Context.** The step 16 triage list; `method/adr/*.md`;
`workbench/adr/README.md`; the adopted draft files.

**Decisions.**

- Shape: title, status, decision in at most three sentences, context in
  at most three, consequences as bullets; 150 words. Superseding is a
  new ADR, never an edit. Recommend yes.
- Rewriting ratified ADRs: allowed for length with meaning intact, each
  diff ratified by the owner, the full text archived. Recommend yes.
  ADRs 0006 and 0007 are the long ones.
- An index: `method/adr/README.md`, one line per ADR. Recommend yes.

**Consequences.** `method/adr/` under budget; the archive holds the
originals; new ADRs numbered from 0010.

**Output.** The rewritten ADRs; the new ADRs; the index.

---

## Step 18 — Rewrite the lessons

**Summary.** Lessons become one line of rule and one of context each;
their grounding stories go to the archive; the rules adopted in step
16 join them.

**Context.** The step 16 list; `ai/lessons/*.md`;
`method/standards/mutability.md` (which lessons it absorbs).

**Decisions.**

- One file or many: recommend one list, `ai/lessons/LESSONS.md`, each
  entry a statement plus one sentence of context, 40 words. Separate
  files earned nothing but link targets.
- Absorption: the three mutability lessons become one line pointing at
  the standard; the lesson whose filename no longer matches its content
  is renamed by the rewrite. Recommend yes.
- Relationship to CLAUDE.md: CLAUDE.md is the entry; lessons are the
  second layer; nothing is stated in both. Recommend yes.

**Consequences.** `ai/lessons/` is one document; the archive holds the
grounding; CLAUDE.md's pointer is updated in step 21.

**Output.** The list; the archive entries.

---

## Gate C — Procedures and rules

**Summary.** Check that the rewritten procedures match the artifacts
they name, that every rule-bearing document says the same thing, and
that nothing removed was lost.

**Context.** `method/procedures/*.md`; `method/types/*.md`;
`method/standards/*.md`; `method/adr/`; `ai/lessons/`;
`ai/archive/INDEX.md`; the git log of steps 14 to 18 for the removals.

**Roles.**

- Procedure match: every step, tier, and output of every procedure
  against the types and the repository as it stands.
- Consistency, over ADRs, lessons, standards, and the mutability
  table.
- Disclosure audit: every removed fragment has an index line; no
  document in a reading path links into the archive; budgets.

**Findings feed.** A procedure naming a missing artifact is fixed in
the gate; a rule contradiction reopens step 17 or 18; a missing index
line is added in the gate.

**Output.** The findings table; the fixes; the review procedure
promoted to `method/procedures/review-gates.md`.

---

## Step 19 — Critical review: workbench-work context

**Summary.** Measure everything a session or a run reads to work on
the workbench against the standards, fix the small, list the large.

**Context.** The reading set itself: the rewritten procedure's tiers,
and what a workbench-authoring session loads (CLAUDE.md, the handoff,
CONVENTIONS.md, lessons, the type descriptions, the vision, the use
cases, guides, standards, test data, criteria); the budget script from
step 2.

**Decisions.**

- Method: a word-count table of the set against the budgets, one verdict
  per document (fits, over, restates, carries history). Recommend fixing
  anything under a paragraph here and listing the rest for its owning
  step or step 21.
- A dry run: a clean-context agent given the implementation 5 tiers and
  told to report what is missing or contradictory without building.
  Recommend yes; it is cheap and it measures.

**Consequences.** A fixes PR; a list carried into step 21.

**Output.** The table in the PR body; the fixes; the carried list.

---

## Step 20 — Critical review: method-work context

**Summary.** The same measurement for everything a session reads to
work on the method.

**Context.** CLAUDE.md, the handoff, `ai/PLAN.md`, this plan, the
standards, the type descriptions, the ADRs, the lessons; the budget
script.

**Decisions.**

- Same method as step 19. Recommend the same fix-small, list-large rule.
- Check that nothing in the set links into the archive, and that the
  forbidden list in the entry document is the only place the archive is
  named. Recommend yes.

**Consequences.** A fixes PR; a list carried into step 21.

**Output.** The table in the PR body; the fixes; the carried list.

---

## Step 21 — Rewrite the entry documents

**Summary.** CLAUDE.md, the handoff, and the concern READMEs become
maps within the disclosure budget.

**Context.** The carried lists from steps 19 and 20; CLAUDE.md;
`ai/HANDOFF.md`; `ai/README.md`, `method/README.md`,
`workbench/README.md`, `ai/procedures/README.md` or its successor;
`ai/PLAN.md`.

**Decisions.**

- CLAUDE.md: what the repository is, the three concerns, the one
  forbidden list, "start at the handoff"; 200 words. Recommend yes.
- The handoff: state in five lines, the next step, and two reading
  lists, one for workbench work and one for method work; 300 words.
  Rewritten at every session end; history in git only. Recommend yes.
- Where the handoff's open points go: spec points to the use cases'
  open-issues sections, method points to this plan's status table.
  Recommend yes; this is the decision that lets the handoff shrink.
- READMEs: what is here and what is not; 100 words each. Recommend yes.

**Consequences.** The old handoff and PLAN status go to the archive
with index lines; `ai/feedback-pr-25.md`, fully consumed by then, is
archived too.

**Output.** The five documents; the archive entries.

---

## Gate D — Regeneration readiness

**Summary.** The last check before spending a run: an agent given only
what implementation 5 will be given reports what it cannot resolve.

**Context.** The rewritten implementation procedure and the exact tier
set it names; nothing else.

**Roles.**

- Fresh reader, in dry-run mode: read the tiers as the run would,
  produce nothing, and report every place the artifacts are silent,
  ambiguous, or contradictory.
- Consistency, adversarial: name three places where two models given
  these artifacts would diverge, and what sentence would prevent each.

**Findings feed.** A finding that blocks implementation 5 is fixed
before step 22 in the owning artifact, by the owner's word; the rest
are recorded as expected ambiguities so the run's report can be scored
against them.

**Output.** The findings table; the expected-ambiguities list under
`ai/experiments/`.

---

## Step 22 — Implementation 5

**Summary.** The measurement: a clean run under the rewritten method,
with the predecessor withheld, compared against implementations 3
and 4.

**Context.** The rewritten implementation procedure only. The session
running it reads the base context and that procedure; the run reads
what the procedure's tiers say.

**Decisions.**

- Model: the owner's call. Recommend Sonnet, to measure variance
  against implementation 4 on the same model, then Haiku if the budget
  allows, for the context test.
- Spec version: main at the run's start, by date and PR.
- Comparison: documents opened, tokens, tool uses, ambiguities, checks,
  and a similarity measure against implementation 4's source, to show
  the run was a regeneration and not an inheritance. Recommend all six.
- Success for this plan: total mandatory reading within budget; the run
  completes and passes; the ambiguities it reports are about the spec,
  not about the guides.

**Consequences.** Record 5 in the new shape; build notes; the review per
the rewritten checklist; a metrics row; every finding goes into a
follow-up list appended to this plan's status, not into the
implementation.

**Output.** `implementations/5/`; the metrics row; the follow-up list.
