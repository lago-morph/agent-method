# Spec: `stepwise-plan`

- **ID**: SKILL-SPEC-f70a414fcd
- **Source retrospective**: ../2026-09-09-27.md

## Intent

Author a multi-step plan that will be executed across several clean contexts by a different model, in a shape that lets the owner review one step at a time: a preamble with the execution protocol, a status table, and per-step sections with a summary, the context to load, the decisions with a recommendation each, the consequences, and the output. The shape came from the owner's request on 2026-09-07 for a plan whose every section starts with an overview and then the start of a conversation, so that review effort goes to decisions and not to detail.

## Trigger

Direct: "make a plan I can review", "create the detailed plan", "plan the next phase" for work that spans more than three sessions. Proactive: when a backlog (retrospectives, review feedback, lessons) has grown larger than the thing it is about and the owner asks what to do next. Negative: a task that fits one session; a plan the owner will execute alone.

## Inputs

The agreed one-sentence step list (negotiated first, see workflow); the repository's lessons and conventions; measurements that motivate the plan (word counts, metrics); the executing model and the fact that contexts will be clean.

## Outputs

One markdown document under the working-documents concern (here `ai/method-plan.md`), committed and opened as a PR; no other file changes.

## Workflow

1. State what you think the owner is asking for in three sentences, then give a numbered list of one-sentence step descriptions, then stop. Do not draft the plan.
2. Take the owner's edits (merge, split, reorder, cut). Reply with a reaction to each edit and the revised list. Repeat until the owner says the list is good. Three rounds is typical.
3. Write the preamble: purpose, how to execute a step (what a fresh session reads, that it posts the summary and opens the conversation before drafting, that only the owner closes a decision, one PR per step, status update on ratification), the prerequisites, why the steps are in this order, and the halt rule.
4. Write the status table: one row per step and gate, a status column, a PR column. Mark the first step `next`.
5. Write each step with exactly five parts: Summary (2 to 4 sentences), Context (files beyond the base set, with paths as they will exist when the step runs), Decisions (big ones first, each with a recommendation and a one-line reason), Consequences (what changes in the repository if the recommendations hold), Output (what the PR contains). Keep each step under 350 words.
6. If the plan has more than about ten steps, group them into phases with a measurable checkpoint between phases, and add review gates after the clusters that produce interdependent artifacts. A gate has the same five parts, with roles in place of decisions.
7. Run a check that every path named in a Context list either exists now or is named as an output of an earlier step. List the misses in the PR body.
8. Commit, push, open the PR with a body that gives the shape and the order, and stop. Do not begin step 1.

## Concrete examples

### Example 1: The method phase plan

The owner asked for a plan to analyze and act on four implementations of lessons. Round one: 11 steps; the owner moved one out as a prerequisite, split the types step per type, added a critical review, broadened the transcript step. Round two: 15 steps; the owner split the retro step and asked for one concern per step. Round three: 22 steps, accepted. The document was written with the five-part shape, 4,781 words, then gained four gates on request, then was split into two phases with a checkpoint when the owner questioned its weight.

### Example 2: A smaller case

An owner asks for a plan to migrate a project's test data into typed artifacts. Round one lists five steps; the owner merges two. The document has one phase, no gates, and each step names the exact files the executing session loads, with post-move paths for steps after the move.

## Anti-patterns

- **Drafting the plan before the list is agreed.** The plan is 5,000 words; the list is 300. Every round on the list saves a rewrite of the plan.
- **A step with more than one concern.** The owner asked for one concern per step so that each PR is one decision; a step with two decisions cannot be ratified half-way.
- **Naming pre-move paths for post-move steps.** A fresh context reads the path literally; see the agents-file rule on paths.
- **Explaining the recommendation at length.** One line of reason per decision; the consequences section is where the effect is shown.

## Acceptance criteria

- [ ] Every step has exactly the five parts, in order, and is under 350 words.
- [ ] The status table lists every step and gate and marks one `next`.
- [ ] No Context list names a path that neither exists nor is an earlier step's output.
- [ ] The owner ratified the one-sentence list before the document was written.
- [ ] The PR body states the order and its reason.

## Files this skill creates / modifies

- `ai/<plan-name>.md` — the plan document.
