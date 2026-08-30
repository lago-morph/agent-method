# Spec: `artifact-round`

- **ID**: SKILL-SPEC-e8bba62964
- **Source retrospective**: ../2026-08-30-13.md

## Intent

Run one artifact round of the agent-method workflow: draft or revise
exactly one artifact from ratified sources, maintain reciprocal links,
commit and push to the working branch, open or update the round's PR
for Jonathan to review and merge, and stop — because during this
session every deviation from that loop (drafting a second artifact,
merging, advancing on a merge event) cost a correction round, while the
loop itself carried seven PRs cleanly.

## Trigger

- Jonathan says "go", names the next artifact ("do the edit ideas use
  case"), or gives markup on the current round's artifact.
- Proactively: never. A merged PR, a GitHub notification, or silence is
  NOT a trigger (see ai/lessons/merge-is-not-a-signal-to-advance.md).
- Negative triggers: any request that is a question or discussion
  (answer in chat, capture intent as a note if stated); any request to
  merge (only Jonathan merges unless he explicitly delegates one).

## Inputs

- The named target artifact (new) or the markup to apply (revision).
- Ratified sources on `main`: `workbench/` artifacts, read-only
  `workbench/input/` pages, `method/CONVENTIONS.md`, `method/types/`,
  `method/adr/`, and the binding lessons in `ai/lessons/`.
- The working branch (`claude/...`), reset onto `origin/main` after the
  previous round merged.

## Workflow

1. If the previous round's PR merged since last check, reset the branch:
   `git fetch origin main && git checkout -B <branch> origin/main &&
   git push -u origin <branch>`. Do not treat the merge as approval to
   pick the next artifact — that came from Jonathan's message.
2. Draft or revise exactly ONE artifact file under the ratified
   convention (four-key front matter; id = filename stem).
3. Maintain reciprocal links in the same commit: `is-part-of` ↔
   `includes`, `depends-on` ↔ `depended-on-by`, `related-to` ↔ itself.
4. Write the document post-merge-correct: no "draft/awaiting markup"
   markers in anything a PR merge implicitly accepts.
5. For a use case, run the corner-case pass (method/adr/0005): nothing,
   too much, degenerate content, and test data that demonstrates each.
6. Commit with a descriptive subject; push; open a PR if none is open
   for the branch, else the push updates it. Update the PR body to
   match current content.
7. Report to Jonathan in chat: what the artifact says, which parts are
   proposals needing his eye, and stop. Do not start artifact two. Do
   not merge.

## Outputs

- One artifact file created or revised in `workbench/` (or `method/`
  when Jonathan directs), reciprocal links updated in its neighbors.
- One commit pushed; one open PR with an accurate body, awaiting
  Jonathan's merge.
- A chat report flagging every judgment call made beyond his words.

## Concrete examples

### Example 1: new artifact (Initial UI use case, PR #9)

Input: "Go. Let's just do initial ui at first. One at a time."
Actions: created `workbench/use-case-initial-ui.md` (front matter id
`use-case-initial-ui`, `is-part-of: [vision.md]`), added the reciprocal
`includes: [use-case-initial-ui.md]` to `workbench/vision.md`, commit
"Draft Initial UI use case, linked into the vision", push, opened PR #9,
reported, stopped. Jonathan's markup round then added the corner cases
(commit `8e5fe5a`) — a second pass of the same loop, same artifact.

### Example 2: revision from markup (implementation notes, PR #12)

Input: Jonathan's markup — avoid "prototype"; split decided-once vs
per-implementation into two notes; number records with non-repeating
integers. Actions: replaced the single note with
`note-implementation-standards.md` + `note-implementation-record-1.md`
(and, after his next correction, restored
`note-implementation-record-definition.md` as its own artifact),
maintained all `related-to` reciprocals, pushed to the same PR, updated
the PR body, reported the judgment calls (e.g., reading "this
directory" as workbench/), stopped. Jonathan merged.

## Anti-patterns

- **Starting the next artifact after a merge event.** PR #9's merge was
  read as ratification and Edit ideas was drafted unasked — Jonathan
  ordered it removed and the repo reset (PRs #10–#11).
- **Merging, ever, without an explicit delegation.** The "Merged."
  misreading; see ai/lessons/jonathan-does-all-merges.md.
- **Approval-state markers in the document.** Merged PRs carried
  "awaiting Jonathan's markup" into main twice before the rule landed.
- **Absorbing a definition into its instance.** Deleting the
  implementation-record definition destroyed the example option spaces
  (method/adr/0004).
- **Batching two artifacts into one round** "for efficiency" — the
  round size is one; Jonathan set it explicitly.

## Acceptance criteria

- [ ] Exactly one artifact changed per round (plus reciprocal-link
      touches in its neighbors).
- [ ] Every link in the round is present at both endpoints.
- [ ] No merged document ever contains pending-approval text.
- [ ] The round ends with an open PR and a chat report; the skill never
      calls a merge API.
- [ ] The next round starts only from an explicit instruction of
      Jonathan's.

## Files this skill creates / modifies

- `workbench/<artifact>.md` — the round's single artifact.
- `workbench/<neighbors>.md` — reciprocal link entries only.
- `method/...` — only when Jonathan directs method material this round.
