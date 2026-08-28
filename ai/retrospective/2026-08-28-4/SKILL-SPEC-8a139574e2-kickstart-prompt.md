# Spec: `kickstart-prompt`

- **ID**: SKILL-SPEC-8a139574e2
- **Source retrospective**: ../2026-08-28-4.md

## Intent

Turn the outcome of a planning conversation into a single, ratified, self-contained opening prompt for a future fresh-context session: the AI drafts it, commits the draft to the repository so chat is never its only home, the user marks it up, and ratification is recorded in the file itself. Grounded in ai/KICKSTART.md, the ratified prompt that will start the idea-workbench experiment.

## Trigger

Direct: "let's craft a prompt to kickstart the next step", "write the kickoff prompt", "we'll craft a single prompt for the next session".

Proactive: offer when a planning conversation converges on a next phase that will run in a *fresh* session (new context, possibly new repo state) — the moment when decisions are about to exist only in chat.

Negative: do NOT trigger for prompts the current session will execute itself, or for mid-task instructions.

## Inputs

- The decisions the conversation has produced (structure rulings, scope, sequencing, standing rules).
- The repository state the prompt will assume (which files will exist on main when the prompt runs).
- Any open slots only the user can fill (this session's example: the pilot subject).

## Outputs

- A committed prompt file (e.g. `ai/KICKSTART.md`) with two layers: a metadata header *outside* the prompt (drafted-by, date, ratification status, assumptions about repo state) and the prompt block itself, fully self-contained.
- Iterations committed as drafts (`-DRAFT` suffix or a draft header) until the user ratifies; then renamed/relabeled ratified with the date.

## Workflow

1. Draft the prompt with this internal shape: (a) what to read first (the files that carry context); (b) the working relationship in one or two sentences ("I decide intent and approve content; you draft, reflect back, and critique"); (c) numbered steps, each ending at a user-input pause — never "then continue until done"; (d) standing rules (commit every turn, separation rules, approval gates).
2. Mark every open slot the user must fill in visibly (e.g. `[PILOT SUBJECT]`) and list the slots in chat when presenting the draft.
3. Commit the draft to the repository (draft-labeled) in the directory designated for AI working documents, then present the draft in chat with the design choices the user might want to flip, stated explicitly with your lean.
4. Fold the user's markup in. If the user supplies information that changes an assumption (this session: source material is handwritten notes converted by a separate process), update the affected step rather than appending a note.
5. On ratification, rename to the final name, change the header to "ratified by <user> <date>", commit and push. The prompt is now the deliverable; the session that uses it should need nothing else from this conversation.

## Concrete examples

### Example 1: ai/KICKSTART.md (this session)

Draft committed as `ai/KICKSTART-DRAFT.md` with header "awaiting Jonathan's markup, not yet used". Four numbered steps (conventions → vision → grow outward → type descriptions last), each pausing for markup; open slot `[PILOT SUBJECT]` presented in chat with three options and a lean. Jonathan's markup arrived across turns: pilot = idea-workbench; three-concern layout added; source material = converted handwritten notes; the term "type notes" renamed to "type descriptions" after a collision with the note artifact type. Ratified mid-turn ("you can write kickstart - everything looks fine"); renamed to `ai/KICKSTART.md`, header changed to "ratified by Jonathan 2026-08-28", commit `d0c98ea`.

### Example 2: a migration-runbook kickoff (hypothetical shape)

A conversation converges on migrating a service next sprint in a fresh session. The prompt file names the design doc to read, states the operator/AI division of labor, sequences steps (inventory → shadow traffic → cutover → rollback rehearsal) each gated on operator confirmation, and carries the standing rule "never touch production DNS without an explicit go". Slots: `[CUTOVER DATE]`, `[ROLLBACK OWNER]`. Draft committed, marked up, ratified, renamed.

## Anti-patterns

- **The prompt living only in chat.** Jonathan lost chat context twice this session ("I can't see the context for the chat"); a prompt that isn't committed may simply vanish.
- **Steps without pauses.** The plan-that-ran-ahead failure (PR #38) came from executing past the user's intent; the prompt must encode the pauses structurally, not rely on the future session's judgment.
- **Coining terms without checking collisions.** "type-notes-last" collided with the note artifact type and cost a clarification round; check new terms against the vocabulary the prompt itself establishes.
- **Silently resolving open slots.** The pilot subject was the user's alone to pick; a draft that guesses a slot value forecloses the decision it exists to surface.

## Acceptance criteria

- [ ] A fresh-context session given only the prompt (plus the files it names) can start the work without asking what was meant.
- [ ] Every numbered step ends at an explicit user-input pause.
- [ ] The file records who drafted, who ratified, and when.
- [ ] All user-fillable slots were either filled by the user or remain visibly marked.

## Files this skill creates / modifies

- `ai/<NAME>-DRAFT.md` → `ai/<NAME>.md` — the prompt file, draft then ratified (directory per the project's AI-documents convention).
