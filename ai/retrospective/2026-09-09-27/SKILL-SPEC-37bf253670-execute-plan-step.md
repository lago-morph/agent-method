# Spec: `execute-plan-step`

- **ID**: SKILL-SPEC-37bf253670
- **Source retrospective**: ../2026-09-09-27.md

## Intent

Run one step of a stepwise plan in a fresh context without reading the rest of the plan: load the base context and the step's section, post the summary and open the conversation with the decisions and recommendations updated for the repository's current state, wait for the owner, draft one PR, and update the status table on ratification. The protocol is written in the plan's preamble; this skill is its executable form, needed because the plan will be run by a different model across many sessions and the owner wants each session to read as little as possible.

## Trigger

Direct: "execute step N", "do the next step of the plan", "continue the plan". Proactive: a session opened on a repository whose handoff names a plan with a step marked `next`. Negative: the owner asks a question about the plan; the owner asks for a step out of order without saying so explicitly.

## Inputs

The plan path; the step identifier (or `next` from the status table); the base context named in the plan's preamble; the repository at its current head.

## Outputs

A chat message with the step's summary and the conversation opener; after the owner's decisions, one PR containing the step's output; on ratification, the status table row updated (status `done`, PR number) in the same PR or the next.

## Workflow

1. Read the base context the preamble names (for this repository: CLAUDE.md, the lessons, the preamble, the status table) and the section of the step marked `next` or named by the owner. Do not read other steps.
2. Load only the context the step's Context list names. If a path does not exist, check whether an earlier step in the status table is not yet done; if so, stop and tell the owner which prerequisite is missing.
3. Check the step's decisions against the repository's current state: an earlier step may have changed the ground. Revise the recommendations where the ground changed and say which ones changed.
4. Post the summary and the conversation opener: the decisions first, each with its recommendation and reason, then the consequences. End the turn. Do not draft.
5. When the owner has decided every decision (his explicit statement per decision or for the set), draft the output as one PR on a branch for this step. The PR body names the step, the decisions as taken, and what implementation 5 (or the plan's named measurement) will measure about the change.
6. If the plan's standards are ratified, check the output against them before opening the PR: word budget, no history in the body, no links to forbidden paths.
7. On the owner's explicit ratification, set the step's status row to `done` with the PR number and mark the next row `next`. Do not infer ratification from a merge.

## Concrete examples

### Example 1: Step 2 of the method plan

A fresh session reads CLAUDE.md, the lessons, the preamble, the status table, and the step 2 section. It loads the procedures-are-not-transcripts lesson, threads 4 to 6 and 12 of the PR #25 feedback, and the vision type. It posts the summary, the six decisions with recommendations (four layers, the word budgets, forbidding by omission, no history, the compliance script, the standards folder), and the consequences. The owner marks up the budgets. The session drafts `method/standards/progressive-disclosure.md` and the budget script as one PR.

### Example 2: A gate

The session reads gate A's section, dispatches four clean-context subagents with briefs under 200 words (gap and overlap, schema, fresh reader, disclosure audit), collates the findings into one table in the PR body with severity and owning step, fixes the schema disagreements in the gate's PR, and lists the reopened steps.

## Anti-patterns

- **Reading the whole plan.** The plan is 5,500 words; a session that reads it all has spent the disclosure budget the plan exists to protect.
- **Drafting before the owner decides.** The owner's rule from 2026-08-30: one artifact at a time, and only his word closes a decision.
- **Treating a merge as ratification.** Two lessons in the repository record the cost of that inference.
- **Fixing a finding inside a gate that belongs to a step.** A gate's decisions are findings; a fix that changes a decision reopens the step.

## Acceptance criteria

- [ ] The session's first message names the step and contains its summary and every decision with a recommendation.
- [ ] No file outside the step's Output list is changed by the step's PR.
- [ ] The status table is updated only after the owner's explicit ratification.
- [ ] A missing prerequisite stops the session before any drafting.

## Files this skill creates / modifies

- The step's named outputs.
- The plan's status table row.
