# Method phase plan

The plan for acting, in the method, on what four implementations,
four retrospectives, and the PR #25 review taught. Executed one step
per session, each step one PR, by Opus, with Jonathan deciding at
every step. Phase 1 was replanned on 2026-09-17 around ADR 0008, the
implementation lifecycle; phase 2 keeps its earlier step numbers, so
11 to 14 are unused.

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
   what implementation 5 will measure about the change.
5. Jonathan marks up and ratifies explicitly. The session then sets the
   step's status to done in the table, in the same PR or the next.
6. ADR 0008 and the outputs of steps 2 to 4 bind every later step from
   their ratification onward. Each later PR is checked against them
   before it is opened.

**Working rules.** Derivation: no method document is written without
an instance behind it, so the guide, standard, acceptance-criteria,
and automated-checks types wait until the ratification pass (step 6)
or implementation 5 shows what they must hold. Data: implementations
1 to 4, their records, and their notes are frozen experimental data;
moves by path only, edits never. Measurement: every PR names what
implementation 5 can measure about its change (documents opened,
tokens, decisions logged, entries that found a home, similarity to
implementation 4). The earlier halt rule is dropped: every step could
satisfy it with the same aggregate measures, so it gated nothing.

**Two phases and a checkpoint.** Phase 1 is the shortest path to a run
under ADR 0008: the lifecycle, the three types a run needs, the two
standards, the restructure, the ratification pass over the decisions
runs 3 and 4 already made, the procedure, the entry documents, and
implementation 5. Phase 2 is cleanup the run does not depend on: the
archive convention, the remaining types, history extraction, the
retrospectives, the ADR and lesson rewrites, and the audit. Step 9,
implementation 5, is the checkpoint: its log and metrics decide ADR
0008's trial and whether phase 2 runs as written, is reordered, or is
cut.

Why this order: the lifecycle first, because it says what every later
document is for. The types before the standards, because the standards
are written against real instances. The ratification pass before the
procedure, because it shows where a run's decisions land. The
measurement before the cleanup.

**Gates.** Two review gates, A and B, sit after the clusters that need
them and appear in the status table in execution order. A gate is a step
in every way except that its decisions are findings. The session
dispatches one clean-context subagent per role, each with a brief under
200 words naming the document set and the question; each returns
findings only (location, problem, severity, the step that owns the fix)
and edits nothing. The session collates them into one table in the
gate's PR body. Severity is one of: blocks implementation 5, fix in
gate, note. Small fixes land in the gate's PR; large ones reopen the
owning step or join the follow-up list. Jonathan reviews the collated
table, not the raw reviews. The six roles:

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
| **Phase 1** | | | |
| 1 | The implementation lifecycle (ADR 0008, trial) | done | #29 |
| 2 | Types: implementation record and decision log | next | |
| 3 | Type: test data, with the current data set | | |
| 4 | Standards: progressive disclosure and writing style | | |
| 5 | Restructure implementations 1 to 4 | | |
| 6 | Ratification pass over the existing decisions | | |
| 7 | Procedure rewrite | | |
| A | Gate: artifact types | | |
| 8 | Rewrite the entry documents | | |
| 9 | Checkpoint: implementation 5 and the trial's exit | | |
| **Phase 2** | | | |
| 10 | Archive convention | | |
| 15 | Test-method standard | | |
| 16 | Type: automated checks | | |
| 17 | History extraction | | |
| 18 | Retrospective triage | | |
| 19 | Rewrite the ADRs | | |
| 20 | Rewrite the lessons | | |
| B | Gate: procedures and rules | | |
| 21 | Reading-set audit | | |

**Base context**, loaded for every step: CLAUDE.md, `ai/lessons/`,
this preamble, the status table, the step's section, and
`method/adr/0008-*.md`. From step 5 on, also the ratified standards
under `method/standards/`. Each step below lists only what it needs
beyond that.

---

---

# Phase 1 — to the checkpoint

## Step 1 — The implementation lifecycle

**Summary.** Record the lifecycle Jonathan described on 2026-09-17 as
a trial ADR with a named exit event, capture the workflow it grows
toward in `ai/PLAN.md`, and replan phase 1 around it.

**Output.** `method/adr/0008-*.md`; "The imagined workflow" in
`ai/PLAN.md`; this plan's preamble, status table, and phase 1; the
handoff's next-step pointer.

---

## Step 2 — Types: implementation record and decision log

**Summary.** The two sides of the seal boundary become typed: the
record as the manifest a run is given, and the decision log as the
list Jonathan ratifies from. Both derived from what runs 1 to 4 wrote.

**Context.** `method/types/vision.md` (the shape of a type
description); `workbench/note/implementation-record-definition.md`;
the four records; the ambiguity and decision sections of
implementation 3's and 4's notes (grep `ambigu` and `decided` under
`workbench/note/*-3.md` and `*-4.md`); the log entry shape in ADR 0008.

**Decisions.**

- Record fields: the spec version by prep commit hash, the input list
  by path, the environment, the inherited files, and one line per
  owner decision. It never restates a use case and never lists what
  changed since the last spec version. Recommend yes, under 600 words
  for the description and a template derived from record 4's headings
  minus everything that restates.
- Log entries: one file, `output/log.md`, three entry kinds:
  **decision** (the ADR 0008 shape), **problem** (a conflict between
  inputs, a missing artifact, a stop), **observation** (about the
  procedure or the tools). Recommend yes; each entry under 60 words;
  ids `N/D-k`, `N/P-k`, `N/O-k`.
- The six per-area notes: not produced from implementation 5 on;
  their content is log entries or code. Recommend yes.
- The old definition note: gains one line pointing at the type, and
  is removed in step 10. Recommend yes.

**Consequences.** `method/types/implementation-record.md` and
`method/types/decision-log.md`, each carrying a first-version line
naming step 9 as its revision point. Record 5 is the first instance of
each shape. The procedure's tier 1 shrinks.

**Output.** The two type descriptions; the pointer line.

---

## Step 3 — Type: test data

**Summary.** The test data becomes the artifact: the data itself, one
item per corner case, so defining a set stops being a prose exercise.

**Context.** `workbench/note/test-data-definition.md`;
`workbench/note/test-data-1.md` (the item list) and
`workbench/note/test-data-4.md` (read only far enough to see the
pattern to retire); the test-data section of
`workbench/use-case/initial-ui.md`; `ai/feedback-pr-25.md` thread 16;
`ai/retrospective/2026-09-06-23/ADR-0eaf6c6c61-use-cases-are-independent-of-their-test-data.md`.

**Decisions.**

- Form: a markdown artifact with front matter whose body is one fenced
  JSON block, each item carrying the corner case it covers and the use
  case that names it. Recommend this over a bare JSON file, since the
  conventions need front matter and an implementation embeds the data
  anyway.
- Folder: `workbench/test-data/`, one artifact per set, id by spec
  version. Recommend yes.
- Coverage: every corner case a use case names has an item; checked by
  a script under `method/tools/` if it is under 40 lines, otherwise
  by inspection at review. Recommend the script.
- The nine guide questions: the four that survive (size, one item per
  corner case, the leading-whitespace item no set has had, emoji
  excluded) go into the type description as what an instance decides;
  no separate guide until the guide type exists. Recommend yes.
- Lifecycle: a set belongs to a spec version; a frozen implementation
  keeps whatever it embedded. Recommend yes.

**Consequences.** `method/types/test-data.md`; the current data set as
the first instance, built from implementation 1's list plus every
corner case added since; the four `test-data-N` notes stay as data.

**Output.** The type description; the data set; the coverage script.

---

## Step 4 — Standards: progressive disclosure and writing style

**Summary.** Two standards under `method/standards/`, so that a
document can be rejected on form and size before it is read for
content. Written after steps 2 and 3 so they have real instances to
measure.

**Context.** `ai/lessons/procedures-are-not-transcripts.md`;
`ai/feedback-pr-25.md` threads 4 to 6 and 12 to 19;
`method/types/vision.md` (its "no negative pointers" rule is the
precedent); one document of the right size
(`ai/lessons/jonathan-does-all-merges.md`) and
`method/CONVENTIONS.md`'s opening paragraph as an example of history in
a body. Measurements taken 2026-09-07 on main:

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
  8,000. Recommend these as starting numbers, revised by step 8's
  measurement.
- Forbidding by omission: a document never links to what its reader
  must not read. The one closed list of forbidden paths lives in the
  entry document. Recommend yes.
- No history in a reading path: revision notes, ratification lines,
  grounding stories, metrics, and transcripts live in git and the
  archive, never in a document an agent reads to act. Recommend yes.
- Compliance: a word-count script over a named reading set under
  `method/tools/`, plus the documents-opened list from each run.
  Recommend the script.
- Style rules: declarative and terse; every sentence is something the
  reader can act on or check; link, never restate; no revision history
  or ratification lines in a body; data is data; option spaces are
  tables; a rule is its statement plus the minimal context to apply
  it; no self-narration. Recommend all eight, one line each.
- Reader marker: recommend no; the folder and the layer say who reads
  it. Enforcement: a line in every review checklist; no linter yet.

**Consequences.** The budgets become the acceptance test for steps 7
to 21. Nothing is rewritten here; the documents over budget today are
listed in the PR body and assigned to their steps.

**Output.** `method/standards/progressive-disclosure.md`;
`method/standards/writing-style.md`; `method/tools/reading-budget.sh`
or equivalent.

---

## Step 5 — Restructure implementations 1 to 4

**Summary.** Everything about implementation N moves under
`workbench/implementations/N/` in ADR 0008's shape, byte for byte, so
the design artifacts stop being specific to any one implementation.

**Context.** ADR 0008; `method/CONVENTIONS.md`; `workbench/README.md`;
`ls workbench/note/`; `ai/feedback-pr-25.md` thread 10.

**Decisions.**

- What moves where: `implementation-record-N.md` to
  `implementations/N/input/record.md`; the six per-area `-N` notes,
  the HTML, and `verify.js` to `implementations/N/output/`. Recommend
  exactly that; records 1 to 4 also hold run-written content, which
  the PR body notes and nothing corrects.
- The moved files keep their front matter; CONVENTIONS.md gains one
  paragraph: implementation-specific artifacts live under
  `implementations/N/`, typed by front matter, links written as today.
  Recommend yes.
- Link paths: a scripted move whose diff shows path strings only, and
  the link check clean, per ADR 0008's move rule. Recommend yes.
- Pointers in the handoff and the procedure go stale until steps 7
  and 8. Recommend listing them in the PR body, not fixing them here.

**Consequences.** `workbench/note/` shrinks to the guides and
definitions. Four `implementations/N/` folders hold everything about
implementation N.

**Output.** The moves; the CONVENTIONS.md paragraph; a clean link check.

---

## Step 6 — Ratification pass over the existing decisions

**Summary.** The first trial of ADR 0008's four fates, on the
decisions runs 3 and 4 already made and the review's gaps, before
implementation 5 adds more.

**Context.** The "Known open points" of `ai/HANDOFF.md` as of PR #25;
the ambiguity sections found in step 2; `ai/implementation-comparison-3-4.md`
(its two findings); the use cases; `ai/feedback-pr-25.md` threads 7 to 9.

**Decisions.**

- The list: every entry in one table for Jonathan, columns id, the
  decision, the run's choice, the proposed fate, the artifact that
  would hold it. Recommend the session drafts the fates and he
  decides in conversation.
- A decision with no home: one note per decision under
  `workbench/note/`, titled by the decision, so clusters show in the
  folder listing. Recommend yes.
- Delegated decisions: the use case's Interface guidance section or
  the relevant definition note carries the options until the guide
  type exists. Recommend yes.
- PRs: one per artifact touched, in the order he names. Recommend yes;
  it keeps one artifact at a time.

**Consequences.** The use cases, data set, and notes absorb what he
locks; the handoff's open-points list empties; the first evidence on
whether the existing types have homes for real decisions.

**Output.** The table in the PR body; the artifact PRs.

---

## Step 7 — Procedure rewrite

**Summary.** The implementation procedure becomes a procedure: steps,
the manifest, prompt, checklist, within budget, under ADR 0008. The
other procedures take the same shape.

**Context.** ADR 0008; the type descriptions from steps 2 and 3;
`ai/procedures/README.md`; `ai/procedures/implement-by-subagent.md` in
full (the sections after "Metrics per run" are history and leave);
the other four procedures;
`ai/retrospective/2026-09-07-25/ADR-2f4599fd03-the-run-s-output-is-the-measurement-a-review-records-and-never-edits.md`.

**Decisions.**

- The run reads the manifest and nothing else; any hook contract the
  checks need is an input the record lists. Recommend yes.
- Where procedures live: they now bind, so `method/procedures/`;
  `ai/procedures/` retires. Recommend yes.
- Run outputs: the run's report and metrics go under
  `implementations/N/output/`; the cross-implementation metrics table
  becomes `ai/experiments/implementation-metrics.md`. Recommend yes.
- Review: reads the code for choices with no log entry, runs an
  independent script from the use cases, records and changes nothing
  in `output/`. Recommend yes.
- Test method: its standard is step 15. Until then the procedure
  states the four test statements itself (Chromium, both orientations,
  mutation testing, an independent script at review). Recommend yes.
- Tiers redefined against the new types, total under the step 4
  budget. Recommend yes.

**Consequences.** Five procedures rewritten and moved; the
implementation sections and metrics leave the procedure (to git
history until step 10 gives them an archive); the prompt template
cites ADR 0008.

**Output.** `method/procedures/*.md`; the metrics file.

---

## Gate A — Artifact types

**Summary.** Check that the three type descriptions and ADR 0008 cover
everything an implementation produces, once each, and agree with each
other and the conventions.

**Context.** `method/types/*.md`; ADR 0008; `method/CONVENTIONS.md`;
`workbench/implementations/4/` (every file, as the content inventory);
the use cases; the data set from step 3; the step 4 budget script.

**Roles.**

- Gap and overlap: list every kind of content in implementation 4's
  files and name its type home under ADR 0008; report content with
  none or two, and types with no instance.
- Schema: front matter keys, folder names, link types, and id rules
  across the type descriptions, ADR 0008, and the conventions.
- Fresh reader: given the types, the spec, ADR 0008, and the standards
  only, say what implementation 5 would produce and where; report
  every point of doubt.
- Disclosure audit: budgets over the same set.

**Findings feed.** A missing home reopens the nearest type's step; a
schema disagreement is fixed in the gate; doubt from the fresh reader
is a finding for step 7's tiers.

**Output.** The findings table; the fixes; the role briefs as used, kept
in the PR body for gate B.

---

## Step 8 — Rewrite the entry documents

**Summary.** CLAUDE.md, the handoff, and the concern READMEs become
maps within the disclosure budget.

**Context.** The step 4 budget script; the step 7 tiers as the run's
reading set; the workbench-authoring session's reading set (CLAUDE.md,
the handoff, CONVENTIONS.md, lessons, types, ADR 0008, vision, use
cases, data set); CLAUDE.md; `ai/HANDOFF.md`; `ai/README.md`,
`method/README.md`, `workbench/README.md`, `method/procedures/README.md`;
`ai/PLAN.md`.

**Decisions.**

- Measure first: the budget script over both reading sets, one verdict
  per document (fits, over, restates, carries history). Fix anything
  under a paragraph here; list the rest for phase 2. Recommend yes.
- CLAUDE.md: what the repository is, the three concerns, the one
  forbidden list, "start at the handoff"; 200 words. Recommend yes.
- The handoff: state in five lines, the next step, and two reading
  lists, one for workbench work and one for method work; 300 words.
  Rewritten at every session end; history in git only. Recommend yes.
- Where the handoff's open points go: spec points to the use cases'
  open-issues sections, method points to this plan's status table.
  Recommend yes; this is the decision that lets the handoff shrink.
- READMEs: what is here and what is not; 100 words each. Recommend yes.

**Consequences.** The old handoff and PLAN status leave the reading
path (to git history until step 10).

**Output.** The five documents.

---

## Step 9 — Checkpoint: implementation 5 and the trial's exit

**Summary.** The checkpoint between the phases: a clean run under the
rewritten procedure and ADR 0008, compared against implementations 3
and 4, followed by the ratification pass that ends ADR 0008's trial.

**Context.** The rewritten implementation procedure only. The session
running it reads the base context and that procedure; the run reads
what the manifest lists.

**Decisions.**

- Model: the owner's call. Recommend Sonnet, to measure variance
  against implementation 4 on the same model, then Haiku if the budget
  allows, for the context test.
- Inherited files: none, unless the owner lists some in the record.
  Recommend none, so the run measures regeneration.
- Comparison: documents opened, tokens, tool uses, decisions logged,
  checks, and a similarity measure against implementation 4's source.
  Recommend all six.
- The trial's exit: after the ratification pass over log 5, ADR 0008
  is confirmed, revised, or withdrawn on the evidence it names, by
  Jonathan's explicit statement. Recommend deciding on that evidence
  and the pass's experience, nothing else.
- The phase decision: continue phase 2 as written, reorder it, or cut
  it, on the metrics and the log. Recommend the same.
- Success for phase 1: total mandatory reading within budget; the run
  completes or stops on a real conflict; the log is ratifiable as a
  list; the decisions it reports are about the spec, not about the
  method documents.

**Consequences.** Record 5 in the new shape; log 5; the review per the
rewritten checklist; a metrics row; every finding goes into log 5's
ratification pass, not into the implementation.

**Output.** `implementations/5/`; the metrics row; ADR 0008's status
line; the follow-up list appended to this plan's status.

---

# Phase 2 — after the checkpoint

## Step 10 — Archive convention

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

**Consequences.** Steps 17 to 20 have a destination. CLAUDE.md gains
one line. Whoever archives maintains the index in the same commit.

**Output.** `ai/archive/INDEX.md` (empty table with its columns); the
CLAUDE.md line.

---


## Step 15 — Test-method standard

**Summary.** The test method becomes a standard with per-implementation
deviations in the build notes, and the "what versus how" split between
standards and procedures is settled.

**Context.** The four test statements the step 7 procedure carries
meanwhile; `workbench/note/test-method-definition.md`;
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

## Step 16 — Type: automated checks

**Summary.** The checks script is the artifact; the prose note about
it retires in favor of a one-line-per-check mapping to criteria.

**Context.** `implementations/1/automated-checks-1.md` and
`implementations/4/automated-checks-4.md` (headings and one section
each); the header of `implementations/4/verify.js`;
the acceptance criteria, once their type exists (deferred; see
the preamble);
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

## Step 17 — History extraction

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
are steps 19 and 20; the handoff was step 8. `ai/feedback-pr-25.md`
is archived here if every thread has been consumed.

**Decisions.**

- The candidate list: confirm and extend from the grep. Recommend the
  list above as the floor.
- `ai/PLAN.md`: reduce to objective, sequence, and a pointer to this
  plan; status moved to the handoff in step 8. Recommend yes.
- Meaning never changes in this step: the diff shows deletions and
  pointer lines only. Recommend that as the review rule.

**Consequences.** Each touched document shrinks; the index grows by one
line per fragment; no document in a reading path links to the archive.

**Output.** The edits; the archive files; the index lines.

---

## Step 18 — Retrospective triage

**Summary.** Decide what the four retrospectives contribute: which ADR
drafts are adopted, which rules become lessons, which skill specs are
parked, and archive the rest.

**Context.** Parts 2 to 4 of each retrospective report (not Part 1);
`ls ai/retrospective/*/`; the titles of `method/adr/` and
`ai/lessons/`.

**Decisions.**

- The twelve ADR drafts: adopt, reject, or already covered. Most map
  to a step of this plan: type descriptions from instances (the
  derivation rule in the preamble), archive under quarantine (step
  10), the definition and instances triad (deferred: the guide and
  standard types), use cases independent of test data (step 3),
  delivered implementations immutable and the run's output is the
  measurement (ADR 0008), the clean-context run and the withheld
  predecessor (step 7; ADR 0008 replaces withholding with a declared
  manifest). Recommend confirming that mapping and deciding the
  remainder: the note catch-all with promotion, and specifications as
  a typed graph.
- The thirty-one rules: already a lesson, becomes a lesson, harness or
  skill level (parked), or rejected. Recommend that many of the generic
  ones (word-level diff after replacement, verify scripted git surgery)
  become one working-practices list, one line each.
- The eleven skill specs: parked in the archive index until the skills
  phase. Recommend yes.
- The retrospectives themselves: archived after triage. Recommend yes.

**Consequences.** Steps 19 and 20 receive their input lists in the PR
body. `ai/retrospective/` moves under the archive with index lines.

**Output.** The triage table in the PR body; the archive moves.

---

## Step 19 — Rewrite the ADRs

**Summary.** Every ADR becomes its statement plus minimal context, and
the drafts adopted in step 18 join them.

**Context.** The step 18 triage list; `method/adr/*.md`;
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

## Step 20 — Rewrite the lessons

**Summary.** Lessons become one line of rule and one of context each;
their grounding stories go to the archive; the rules adopted in step
18 join them.

**Context.** The step 18 list; `ai/lessons/*.md`;
ADR 0008 (which lessons it absorbs, once its trial has ended).

**Decisions.**

- One file or many: recommend one list, `ai/lessons/LESSONS.md`, each
  entry a statement plus one sentence of context, 40 words. Separate
  files earned nothing but link targets.
- Absorption: the three mutability lessons become one line pointing at
  ADR 0008, if its trial ended in confirmation; the lesson whose filename no longer matches its content
  is renamed by the rewrite. Recommend yes.
- Relationship to CLAUDE.md: CLAUDE.md is the entry; lessons are the
  second layer; nothing is stated in both. Recommend yes.

**Consequences.** `ai/lessons/` is one document; the archive holds the
grounding; CLAUDE.md's pointer is updated here.

**Output.** The list; the archive entries.

---

## Gate B — Procedures and rules

**Summary.** Check that the rewritten procedures match the artifacts
they name, that every rule-bearing document says the same thing, and
that nothing removed was lost.

**Context.** `method/procedures/*.md`; `method/types/*.md`;
`method/standards/*.md`; `method/adr/`; `ai/lessons/`;
`ai/archive/INDEX.md`; the git log of steps 7 and 17 to 20 for the removals.

**Roles.**

- Procedure match: every step, tier, and output of every procedure
  against the types and the repository as it stands.
- Consistency, over ADRs, lessons, standards, and ADR 0008.
- Disclosure audit: every removed fragment has an index line; no
  document in a reading path links into the archive; budgets.

**Findings feed.** A procedure naming a missing artifact is fixed in
the gate; a rule contradiction reopens step 19 or 20; a missing index
line is added in the gate.

**Output.** The findings table; the fixes; the role briefs, now used twice,
promoted to `method/procedures/review-gates.md`.

---

## Step 21 — Reading-set audit

**Summary.** After the cleanup, measure both reading sets again, the
workbench-work set and the method-work set, and fix what the cleanup
missed.

**Context.** The step 4 budget script; the step 7 tiers; the
method-work set (CLAUDE.md, the handoff, `ai/PLAN.md`, this plan, the
standards, types, ADRs, lessons).

**Decisions.**

- Same method as step 8: one verdict per document; fix small, list
  large. Recommend yes.
- Nothing in either set links into the archive, and the entry
  document's forbidden list is the only place the archive is named.
  Recommend yes.

**Consequences.** A fixes PR; the list of what remains, appended to
this plan's status.

**Output.** The table in the PR body; the fixes.
