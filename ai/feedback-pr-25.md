# Jonathan's review of PR #25 (2026-09-07), captured for future PRs

His instruction on the review: "All comments in this section are to be
captured in a way that we can fix them in a future PR. The only changes
you are allowed to make for this pr are changes that fix the
implication that editing a delivered implementation is ever ok, and
comments we will process later in appropriate places ... You are not
allowed to move documents or delete them. Just capture the feedback. We
will process most of the feedback in future PRs."

Each thread below is quoted verbatim, with what was done in PR #25
(only the two kinds of change he allowed) and what is left for later.

## Fixed in PR #25: the implication that fixes are ever allowed

1. `ai/lessons/review-findings-are-bounded-by-the-spec.md` line 4 —
   "This implies that if there is a sentence behind it there is
   permission to fix. That is absolutely not the case." Lesson
   rewritten; the filename stays until documents may be moved.
2. Same file, line 8 — "Fixing anything without asking is a defect.
   Please remember that the objective of this exercise is to develop
   the method. The actual application could probably be one-shotted
   with my hand written notes. Do not optimize implementing the
   software. Instead optimize gathering experimental data that allows
   us to find areas where the method must be changed or extended."
   Written into the lesson as its statement of intent.
3. `ai/procedures/implement-by-subagent.md` line 343 — "Again, implies
   that fixes are allowed. They are not, and it is a defect of intent
   that any were done." Pitfall rewritten.

## Recorded as a lesson now, to be fixed when work shifts to the method

4. `ai/procedures/implement-by-subagent.md` line 225 — "This is a
   transcript, not a procedure. Do not confuse procedures with the
   record of following the procedure. It will contaminate context by
   reporting things that were done improperly and degrades the ability
   of the agent to make correct decisions. Do not fix this now. Rather
   add this as a lesson we will fix when we shift over to working on
   the method." → `ai/lessons/procedures-are-not-transcripts.md`.
5. Same file, line 229 — "Progressive disclosure is failing because
   you are confusing subagents with excessive history. Procedures must
   be short, clear, and to the point. The transcripts are extremely
   important as experimental data, but you are absolutely not
   following principles of progressive disclosure." → same lesson.
6. `ai/HANDOFF.md` line 207 — "You are absolutely not using
   progressive disclosure when a handoff document is this long." →
   same lesson.

## Questions, answered on the threads and here

7. `ai/implementation-comparison-3-4.md` line 12 — "Did the
   implementation 4 agent look at the result of implementation 3. If
   not, why so much similarity between very different models?" Yes:
   the procedure's prompt puts `workbench/implementations/3/` in tier
   4 ("when repeating a previous decision or needing its hooks and
   data"), and the run's report lists both of its files as read, "used
   as the base to build from and diff against". The similarity is
   inheritance, not convergence.
8. Same file, line 52 — "It very much should not have edited anything
   regardless. It was instructed to generate from scratch, not modify.
   Or was it? Please confirm." It was not instructed to generate from
   scratch. The prompt says "building implementation 4" and offers the
   previous implementation in tier 4; nothing forbids starting from
   it. Method finding for a future PR: a regeneration test needs the
   previous implementation withheld, or the prompt must say "from
   scratch"; implementations 2, 3, and 4 all read their predecessor.

## Use-case markup, for a future PR on the use cases

9. `ai/implementation-comparison-3-4.md` line 33 — "Remove all
   specifications around behavior of long words inside the idea edit
   pane. Replace with a statement that long words must not result in
   skipping the display of text. A requirement that everything is
   still shown, and explicit permission to innovate if the default or
   easily configured behavior is not sufficient." Target: the Initial
   UI use case's idea-text section. Also from chat the same day:
   "Emojis are out of scope for idea text. We can limit to utf-8."

## Structure of the workbench, for future PRs

10. `workbench/note/acceptance-criteria-4.md` line 1 — "We should put
    all implementation specific artifacts, including the
    implementation record, with the implementations themselves. The
    design artifacts should not be specific to any one
    implementation."
11. `workbench/note/implementation-structure-4.md` line 10 — "How is
    this document different than the stuff added in the implementation
    record? It is very confusing to have the implementation record and
    this document both have information about what happened."
12. Same file, line 22 — "Linking to a previous file you don't want an
    agent to look at is a bad idea. There is a good chance the agent
    will read it anyway."
13. Same file, line 29 — "Why is this here? Isn't this specified
    already in the use case? If you are synthesizing things from the
    use case why are you durably recording this here?"
14. Same file, line 43 — "Isn't this specified in the implementation
    record? If not, why not?"
15. Same file, line 74 — "Why is this here? I'm going to stop
    commenting on this stuff - you are creating and saving many things
    that are just restatements of other documents. That is very bad."
16. `workbench/note/test-data-4.md` line 18 — "You have this long
    document about test data without any test data. You require an
    agent to reconstruct a bunch of history to figure out what to do.
    This is stupid and feels like you are trying to show how clever
    you are, rather than getting the job done in a straightforward
    way. Doing it this way drastically increases the risk that
    subsequent runs will be different with the same inputs. Don't do
    that."
17. `workbench/note/test-method-4.md` line 1 — "Again, mental
    masturbation. You are using 20x the tokens you need to use to
    convey the same information. Verbose text confuses both human and
    ai implementers."
18. `workbench/note/ui-decisions-4.md` line 1 — "Why? This is
    essentially useless to have as an implementation specific file.
    Bad."
19. `workbench/note/ui-standards-definition.md` line 1 — "Everything
    is too verbose."

Themes for the processing PRs: implementation-specific artifacts move
under `implementations/<N>/`; notes stop restating the use cases and
the record; the test data itself lives with the implementation, not a
history of it; every document an agent reads is short; no links to
files an agent is not meant to read; the previous implementation is
withheld from a regeneration run.
