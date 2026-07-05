# Spec: `red-team-own-proposal`

- **ID**: SKILL-SPEC-342a65da55
- **Source retrospective**: ../2026-07-05-1.md

## Intent

Before presenting any substantial proposal (plan, design, methodology, migration), dispatch one adversarial subagent with the full proposal and its context, instructed to find residual complexity, likely failure modes, and internal contradictions; fold surviving critiques into the proposal and credit the rest as open risks. Exists because this session's red-team pass on the draft reset plan found the growth-law loophole ('need' vs incident), the standing-doc count creep, and the inversion of admitting an unproven artifact type while omitting the one proven process loop - all before the stakeholder saw the plan.

## Trigger

- Proactive (primary): a proposal is about to be presented that (a) the user will decide on, and (b) took more than trivial effort to construct — a plan, an architecture, a methodology change, a migration strategy.
- Direct: "red-team this", "poke holes in this before I see it".
- Negative: skip for trivial or fully-reversible proposals (a rename, a one-file fix), and skip when the user asked for raw brainstorming rather than a vetted recommendation.

## Inputs

- The complete draft proposal.
- The context that produced it: the user's stated constraints (verbatim where possible), the evidence base, and the failure history the proposal is supposed to avoid.
- The user's known biases/values if stated (this session: "start simple and build, never start complex and beat into shape").

## Outputs

- A structured critique from the subagent: residual complexity with proposed cuts, predicted failure modes with early-warning signs and low-weight countermeasures, internal contradictions.
- A revised proposal with accepted critiques folded in.
- A visible record in the presented proposal of what the red team changed and which risks remain open (opinion marked as opinion).

## Workflow

1. Freeze the draft. Do not keep editing while the red team runs.
2. Write the subagent brief as self-contained: the full proposal, the constraints verbatim, the evidence, and pointed questions — "what is still more than minimal?", "what are the 3–5 most likely failure modes, each with an early-warning sign and a countermeasure that adds no process weight?", "where does the proposal contradict its own principles?". Cap the response length.
3. Dispatch one subagent (no repo access needed if the brief is complete — say so explicitly to prevent wandering).
4. Triage the critique: accept (fold in), reject (record why), or convert to open risk (present to user as prediction, not fact).
5. Present the revised proposal, noting the load-bearing changes the red team caused so the user can judge the process, not just the output.

## Concrete examples

### Example 1: the methodology reset plan (this session)

Brief: full draft plan (one-page method, growth law, use-cases-only kernel) + both post-mortem summaries + the user's start-simple constraint, with questions A–E covering residual complexity, failure modes, kernel risks, and re-inflation channels. Critique returned: cut "need" from the growth law (incidents only — every gate in attempt 1 could cite a "need"); collapse six standing docs (staleness was the demonstrated failure); make the ideas manifest 3 lines, append-closed; canonize the proven recon→plan→build→verify loop instead of only an unproven artifact type; the vacuum (no pilot) as failure mode #1. Folded: all five. The presented plan credited the critique and carried the failure-mode table as predictions.

### Example 2: rejecting part of a critique

A red team reviewing a data-migration plan flags "no rollback for step 3" (accepted — rollback added) and "the whole migration should be event-sourced instead" (rejected — out of scope for the decision at hand; recorded in the presentation as a considered-and-rejected alternative with the reason). The user sees both dispositions, not a silently laundered plan.

## Anti-patterns

- **Red-teaming with the author's context window.** The subagent must receive a written brief, not share the author's assumptions; the value is the independent read. (Checker independent of author — the same principle the methodology adopted as R15.)
- **Folding in every critique.** The red team is input, not authority; critiques that fight the user's actual constraints get rejected with reasons.
- **Hiding the red team.** If the presented proposal doesn't mark what changed and what risks remain, the user is deciding on false confidence.
- **Skipping it for the proposal you're most attached to.** Attachment is the strongest trigger; this session's plan felt finished right before the red team gutted its centerpiece.

## Acceptance criteria

- [ ] The subagent brief is self-contained enough that the critique never says "I'd need to see the repo".
- [ ] Every critique has a recorded disposition: folded, rejected-with-reason, or open risk.
- [ ] The presented proposal marks red-team-driven changes and remaining risks as predictions.
- [ ] The red team ran before the user saw the proposal, not after a rejection.

## Files this skill creates / modifies

- The proposal document itself (revised in place).
- Optionally a short critique-disposition note appended to the proposal or its review record — this session folded it into the plan's "epistemic status" section.
