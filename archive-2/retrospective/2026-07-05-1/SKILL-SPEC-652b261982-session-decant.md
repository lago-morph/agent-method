# Spec: `session-decant`

- **ID**: SKILL-SPEC-652b261982
- **Source retrospective**: ../2026-07-05-1.md

## Intent

Before a session ends or a PR is declared final, inventory everything of value that exists only in the session's conversation and capture the high-value remainder into durable repository files. Exists because this session nearly terminated with its highest-value content - the complexity diagnosis, the four-efforts synthesis, the rejected-alternatives log, and a failure-mode watch list - living only in chat, and a single stakeholder question ('what do I lose if I merge and terminate?') was the only thing that triggered capture.

## Trigger

- Direct: "what do I lose if I end this session?", "decant the session", "is everything captured?", "can I merge and close?"
- Proactive: the user signals session wrap ("merge the PR", "looks good, we're done") after a session that included substantial analysis, design discussion, or rejected alternatives that were never written to disk.
- Negative: do not trigger after short mechanical sessions where every product is already a commit; do not trigger repeatedly — once the inventory says "nothing valuable remains uncaptured," stop.

## Inputs

- The full session conversation (analysis, decisions, rejected options, incidents).
- The repository's current committed state (what is already durable).
- The repository's conventions for where records live (in this repo: `reviews/` for dated analyses, `LESSONS.md` for incident-cited lessons, registers for requirements).

## Outputs

- An inventory, presented to the user as a table: each session-only item, why it matters, and an honest value rating (including "fine to lose").
- On user approval: files capturing the high-value items, committed and pushed, each in the repository's native convention — not a transcript dump.
- A closing statement only when true: "the session is now disposable."

## Workflow

1. Diff the session against the repo: list every substantive item (finding, decision, rejected alternative, measured fact, watch-list, workaround) discussed in conversation. For each, check whether a committed file already carries it.
2. Rate each uncaptured item's value honestly. Include a "fine to lose" tier (process narration, dead ends with no lesson) — an inventory with no discardable tier is not being honest.
3. Present the inventory as a table with a recommendation: which items to capture, where each belongs per repo convention, estimated shape (e.g., "two lessons entries + one dated review doc").
4. Wait for user selection. Do not write anything before approval.
5. Write the approved items into repo-native forms: lessons entries match the existing register format; analyses become dated documents; decisions land where the repo keeps decisions. Quote conversation sources verbatim where provenance matters — the chat will not exist later.
6. Commit, push, verify the push (remote SHA equals local HEAD). State plainly whether the session is now disposable.

## Concrete examples

### Example 1: this session's pre-merge decant

Input: user asks "What information exists in this session that is important for this effort that has not been captured in the pull request? What do I lose if I merge the pr and terminate this session?"
Inventory produced: 6 rows — complexity diagnosis numbers (High), four-efforts synthesis (High), attempt-3 watch list (High), rejected-alternatives log (Medium-high), two drafted lessons (Medium), step-by-step reasoning (None — fine to lose).
Output after approval: `reviews/2026-07-03-complexity-review.md` (diagnosis + synthesis + rejected alternatives + watch list) and two entries appended to `LESSONS.md` (les-0004, les-0005), committed as "Decant session analysis: complexity review record + two lessons", pushed, remote SHA verified. Closing line: "The session is now disposable."

### Example 2: a session with nothing to decant

Input: a session that fixed one bug, committed the fix with a descriptive message, and added a regression test.
Inventory: every item (the diagnosis, the fix, the test) already lives in the commit and its message. Output: a one-line report — "Nothing of value exists only in this session; it is already disposable" — and no files written.

## Anti-patterns

- **Dumping the transcript.** The decant writes repo-native records (a dated review, a lesson, a register entry), not conversation logs. This session's decant compressed hours of conversation into ~150 lines of structured record.
- **Capturing everything.** The inventory must have a fine-to-lose tier; padding the repo with low-value capture is its own failure (this repo's first attempt died of exactly that).
- **Waiting until asked.** In this session the stakeholder had to ask; the skill exists so the agent raises the inventory unprompted at wrap signals.
- **Claiming disposability without verifying the push.** A decant that exists only in the working tree decants nothing (les-0002).

## Acceptance criteria

- [ ] Every substantive session item appears in the inventory with an honest value rating, including at least the possibility of "fine to lose".
- [ ] No file is written before the user selects from the inventory.
- [ ] Captured items follow the repository's existing conventions and quote volatile sources verbatim.
- [ ] The push is verified (remote SHA = local HEAD) before the session is declared disposable.

## Files this skill creates / modifies

- `reviews/<date>-<topic>.md` — dated analysis records (or the repo's equivalent convention).
- `LESSONS.md` — appended incident-cited entries, matching the register's format.
- Register files (e.g., `CANDIDATES.md`) — only when the session produced register-shaped items the user approves.
