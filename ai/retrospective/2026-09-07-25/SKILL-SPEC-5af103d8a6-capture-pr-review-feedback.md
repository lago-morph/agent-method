# Spec: `capture-pr-review-feedback`

- **ID**: SKILL-SPEC-5af103d8a6
- **Source retrospective**: ../2026-09-07-25.md

## Intent

Turn the owner's pull-request review into a durable, verbatim feedback document before anything is changed, so that no thread is lost, none is hidden by resolving it, and only the changes the owner allowed are made. It earns its place because the owner's review of PR #25 had nineteen threads and opened with an instruction to capture rather than fix.

## Trigger

- The owner says "check for comments and reviews on the PR", or a review with more than two threads arrives.
- Not for: a single nit the owner asks to be fixed; a review by a bot.

## Inputs

- The PR number; the review bodies and threads (comments, review comments, reviews, via the GitHub tools).
- Any umbrella instruction in a review body about what may change now.

## Outputs

- `ai/feedback-pr-<N>.md`: every thread quoted verbatim with file, line, and disposition (fixed now / lesson now / question answered / future PR, grouped by theme).
- Replies on threads that ask a direct question, each ending with the attribution footer.
- Lessons the owner explicitly asked for.
- Pointers added to the handoff; nothing moved or deleted.

## Workflow

1. Fetch comments, reviews, and review threads. Read every review body first: an umbrella instruction there governs the whole pass.
2. Write the feedback document: one numbered item per thread, the owner's words verbatim, file and line, and a one-line disposition. Group by what may be done now and what waits.
3. Make only the changes the umbrella instruction allows. When it says "capture", add text or new files; do not change existing text beyond the allowed kind.
4. Answer direct questions on their threads, briefly, with the answer's evidence and a pointer to the feedback item; end with the footer.
5. Do not resolve any thread. Add a pointer to the document in the handoff's open points and next step.
6. Commit, push, update the PR body to list the document.

## Concrete examples

### Example 1: an umbrella instruction

PR #25's third review said: "The only changes you are allowed to make for this pr are changes that fix the implication that editing a delivered implementation is ever ok, and comments we will process later ... You are not allowed to move documents or delete them." Three threads matched the allowed kind and were fixed (a lesson rewritten, a procedure pitfall rewritten); sixteen were captured only; the lesson file whose name was now wrong stayed in place with a note.

### Example 2: a direct question

Thread on `ai/implementation-comparison-3-4.md` line 52: "It was instructed to generate from scratch, not modify. Or was it? Please confirm." Reply: the prompt offers implementation 3's files in tier 4 and the run's report lists them as read "as the base to build from"; captured as item 8 with the method finding that no run so far was a clean regeneration.

## Anti-patterns

- **Fixing while reading**, so later threads get less care and the early fixes exceed what was allowed.
- **Resolving threads** the owner addressed to a future pass; his processing pass then cannot see them.
- **Paraphrasing** his comments; the words are the record.
- **Changing a file's name** to match corrected content when moving is forbidden; note the mismatch instead.

## Acceptance criteria

- [ ] Every thread in the review appears in the document with its verbatim text.
- [ ] `git diff` shows only additions and the explicitly allowed edits.
- [ ] Every direct question has a reply on its thread.
- [ ] No thread is resolved by the session.

## Files this skill creates / modifies

- `ai/feedback-pr-<N>.md` — the capture.
- `ai/lessons/<name>.md` — only when the owner asked for a lesson.
- `ai/HANDOFF.md` — pointers.
