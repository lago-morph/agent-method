# Implementing by hand-off to a clean-context subagent

**Status:** working document, non-normative. Retrospective for run 1
(implementation 2, 2026-09-05); made the explicit implementation
procedure at Jonathan's direction the same day, to be followed for the
next implementation with an Opus subagent and, as soon as that works,
with Sonnet subagents.

**What it stress-tests.** Two things at once: *repeatability* — whether
`workbench/` plus `method/` plus these procedures, and nothing else,
yield a similar implementation every time (ADR 0007); and *context
preservation through progressive disclosure* — whether an agent that is
told where to start and reads further only as it needs to can finish
within a modest context window. A smaller model finishing the same run
is the stronger evidence for both.

## The procedure

1. **Fix the intent in one sentence each**: the implementation number
   N; the use cases the implementation covers (a spec version); the
   execution environment. These are the owner's decisions and the only
   answers the subagent is handed. Everything else it decides from the
   artifacts.
2. **Give document access in tiers**, not "read everything". The prompt
   names the tiers; the subagent reads tier 1 fully and the rest on
   demand, and lists in its report which documents it read and why.
3. **Forbid the rest by name**: `ai/HANDOFF.md`, `ai/PLAN.md`,
   `ai/lessons/`, `ai/retrospective/`, other `ai/*.md`, `archive/`,
   `archive-2/`, `.claude/`, the git log and diffs. The handoff and
   lessons are session context, not specification; a subagent that
   reads them is no longer a clean-context test.
4. **Name the outputs by the artifacts' own conventions** (record,
   per-area notes, `implementations/N/`, reciprocal links, a report
   with fixed sections) and **forbid state changes** the reviewer wants
   to make itself (no git state changes; no edits under `method/`,
   `ai/`, earlier implementations; existing artifacts touched only for
   reciprocal links; outputs outside the repository; no
   "awaiting review" markers).
5. **Launch** a fresh subagent with the prompt below, model Opus until
   a run with Opus produces a passing implementation from this
   procedure as written; then Sonnet. Nothing else touches the same
   files while it runs.
6. **Review** with the checklist below, fold findings back into the
   artifacts and procedures, record the run's metrics in the table, and
   deliver as a PR for the owner's markup and device checkpoint.

### Document tiers

| Tier | Read | Contents |
| --- | --- | --- |
| 1 | first, fully | `method/CONVENTIONS.md`; `method/adr/*.md`; `workbench/README.md`; `workbench/note/implementation-standards.md`; `workbench/note/implementation-record-definition.md`; `workbench/note/decision-guides.md` |
| 2 | next, fully | the use cases the record covers (`workbench/use-case/…`); `workbench/vision/vision.md` for context |
| 3 | when deciding that area | the guides: `workbench/note/ui-standards-definition.md`, `test-method-definition.md`, `acceptance-criteria-definition.md`, `test-data-definition.md`, `quality-standards-definition.md` |
| 4 | when repeating a decision, or needing hooks and data | the previous implementation: its record, per-area notes, automated-checks note, and `workbench/implementations/<N-1>/` |
| 5 | when doing that step | `ai/procedures/ui-checks-playwright.md`, `ai/procedures/artifact-link-check.md`; the other procedures only if the step arises |
| 6 | reference only, on demand | `workbench/input/` (non-normative source notes); `method/types/` |

### Prompt template

Fill the angle-bracket fields; send as the subagent's whole prompt.

```
You are a fresh agent with no prior context, building implementation <N>
of the Idea Workbench in the git repository at /home/user/agent-method.
This is a regeneration test of the specification artifacts: the point is
to see whether the artifacts plus the method documents are sufficient on
their own. Follow what is written; where the artifacts are silent,
ambiguous, or contradictory, make a reasonable decision, record it as the
artifacts direct, and note the ambiguity in your report. Do not invent
scope beyond the use cases named below.

## Document access

Read in tiers, and read further only as you need to. List in your report
every document you read, in order, with one phrase on why.

- Tier 1, read first and fully: method/CONVENTIONS.md; method/adr/*.md;
  workbench/README.md; workbench/note/implementation-standards.md;
  workbench/note/implementation-record-definition.md;
  workbench/note/decision-guides.md.
- Tier 2, then fully: <the use cases, as paths>; workbench/vision/vision.md
  for context.
- Tier 3, when you reach that decision area: the guides
  workbench/note/ui-standards-definition.md, test-method-definition.md,
  acceptance-criteria-definition.md, test-data-definition.md,
  quality-standards-definition.md.
- Tier 4, when repeating a previous decision or needing its hooks and
  data: workbench/note/implementation-record-<N-1>.md, its per-area notes
  (workbench/note/*-<N-1>.md), and workbench/implementations/<N-1>/.
- Tier 5, when doing that step: ai/procedures/ui-checks-playwright.md and
  ai/procedures/artifact-link-check.md (non-normative execution methods);
  the other files in ai/procedures/ only if the step arises.
- Tier 6, reference only: workbench/input/ (non-normative source notes);
  method/types/.

Do NOT read anything else: not ai/HANDOFF.md, ai/PLAN.md, ai/lessons/,
ai/retrospective/, other ai/*.md, not archive/ or archive-2/, not
.claude/, not the git log or diffs.

## The task

Jonathan (the owner; he decides intent) directs: implementation <N>
implements the version of the spec consisting of <the use cases>, in
<the execution environment>. Everything else is for you to decide per
the artifacts.

Produce, following the implementation standards, the record definition,
the decision guides, and the guides:

1. workbench/note/implementation-record-<N>.md — in the shape the record
   definition requires (short bullets; details in linked notes).
2. Per-area decision notes workbench/note/<area>-<N>.md, following the
   pattern of the -<N-1> notes: at least ui-decisions, implementation-
   structure, test-method, acceptance-criteria, test-data,
   automated-checks. Propose an answer for every question the guides
   raise; where the previous implementation's answer is repeated
   unchanged, say so (the guides say what to propose then). Where a
   guide says something is "open", decide and flag it.
3. workbench/implementations/<N>/ — the implementation and its automated
   checks script, derived from your automated-checks note, run per
   ai/procedures/ui-checks-playwright.md. The checks must pass; report
   results faithfully. Playwright is installed globally
   (NODE_PATH="$(npm root -g)"); Chromium is at /opt/pw-browsers; do not
   install anything.
4. Front matter exactly per method/CONVENTIONS.md on every new artifact,
   and every link's reciprocal in the other file (including depended-on-by
   entries in the use cases and related-to entries in the guides and
   notes you link). Run the link check in
   ai/procedures/artifact-link-check.md (third version) before you finish;
   it must report no problems.
5. A report at <report path> with these sections: Documents read (in
   order, one phrase each on why); Ambiguities and gaps (every place the
   artifacts, guides, or procedures were silent, unclear, or
   contradictory, what you decided, where you recorded it); Procedure
   deviations; Check results (the verbatim PASS/FAIL line); Time sinks;
   Suggested changes (one sentence each, naming the file).

## Rules

- Work only inside /home/user/agent-method/workbench/ plus the report
  file. Do not modify anything under method/, ai/, or
  implementations/<N-1>/ and earlier. Do not modify existing artifacts
  except to add the reciprocal links the conventions require.
- No git command that changes state: no commit, push, checkout, stash.
- Screenshots and other check outputs go outside the repository.
- Write every document so it is correct as it stands; no "awaiting
  review" markers.
- Keep the implementation to what the named use cases specify; their
  Interface guidance sections say how the interface exposes commands.
- When finished, reply with a summary under 300 words: what you
  produced, the PASS/FAIL line, and the three most important
  ambiguities. The full detail belongs in the report file.
```

### Review checklist (the reviewer, in this order)

1. Read the report. 2. `git status` and `git diff`: existing artifacts
changed only by reciprocal links. 3. Rerun the delivered check script;
PASS must reproduce. 4. Read the record, every per-area note, and the
implementation source. 5. Run the link validator (third version). 6.
Write and run an independent Playwright script from the use case text,
not from the checks note (`ui-checks-playwright.md`); look at one
screenshot per orientation. 7. Extract the run's metrics (below). 8.
Fold findings back: questions into guides, decisions the review exposed
into the implementation's notes, procedure revisions; list proposed
markups to ratified use cases for the owner, never apply them. 9.
Deliver: PR, file attached and hosted copy (`deliver-to-ipad.md`),
handoff.

### Metrics per run

From the subagent's completion notification (tokens, tool uses,
duration) and its transcript file (`…/tasks/<id>.output`; do not read
it, grep it):

```sh
T=<transcript>
grep -o '"file_path":"[^"]*"' "$T" | sed 's/"file_path":"//;s/"$//' | awk '!seen[$0]++'   # documents opened, in order
grep -o '"name":"Read"' "$T" | wc -l; grep -o '"name":"Bash"' "$T" | wc -l                # tool mix
```

| Run | Impl. | Model | Tokens | Tool uses | Minutes | Repo docs opened | Checks / orientation | Result | Ambiguities reported | Defects found in review |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 2 | Opus | ~203 k | 67 (26 Read, 30 Bash, 10 Write, 1 Edit) | 19 | 25 (order: conventions, the two use cases, decision guides, record definition, standards, record 1, then each guide with its `-1` note as that area came up, the two check procedures, implementation 1's files, the vision last; never `input/`, `method/types/`, or the other procedures) | 46 | PASS | 15 (3 use-case, 10 guides/procedures, 2 environment) | 0 (one reviewer assertion was wrong) |

"Repo docs opened" counts distinct repository documents; the subagent
also opened its own outputs and screenshots.

## Run 1 (implementation 2, 2026-09-05) — the retrospective record

- **Scoping** was by directory, not by prompt content, with the
  forbidden set named explicitly; the owner's intent was two sentences
  (use cases; environment); outputs named by the artifacts' conventions;
  state changes forbidden. The prompt did not yet tier the documents;
  the agent tiered them itself (see the metrics row), which is what
  prompted the tiers above.
- **Result:** a working implementation and 46 checks per orientation,
  all passing; every artifact the conventions require; clean links. 15
  ambiguities and 12 suggested changes, each traceable to a sentence —
  the main product of the run: the artifacts were sufficient to build
  from, and each ambiguity marked where they were not yet sufficient to
  build *deterministically* from.
- **Review** found no defect; the reviewer's one failing assertion was
  its own (locale ordering).
- **Not done:** no second run to measure variance; delivery stayed with
  the reviewer; the report was not committed (folded into artifacts,
  procedures, and the PR body).

## Pitfalls observed

- The guides assumed the owner is present to close each decision; the
  agent had to invent a way to record decisions without him. The guide
  now says what to write in that case.
- Repeating the previous implementation's answers "unchanged" was
  voluminous (seven notes, mostly "repeated unchanged"). A standard for
  the repeated answers would shorten the next run.
- Use-case ambiguities (undo granularity, the new idea's position, a
  contradictory clause) were found only by building. The run is the
  cheapest way found so far to surface such sentences.
- The harness ran the subagent in the background regardless of the
  requested mode; nothing else may touch its files meanwhile.

## Notes for formalizing

- This is the natural shape of a skill: inputs = the tiers, outputs =
  the record, notes, implementation, checks, report; the review
  checklist is the acceptance step; the metrics table is the evidence.
- Run it for every implementation, not as an experiment: the ambiguity
  list is the spec's defect list. Compare rows across models for the
  repeatability and context questions.
