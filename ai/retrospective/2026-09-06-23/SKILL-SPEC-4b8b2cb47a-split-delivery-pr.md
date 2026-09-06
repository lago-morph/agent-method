# Spec: `split-delivery-pr`

- **ID**: SKILL-SPEC-4b8b2cb47a
- **Source retrospective**: ../2026-09-06-23.md

## Intent

Split one working branch into two stacked pull requests when the owner asks for the changes to be reviewed separately, without losing commits or force-pushing over review history: reset branch A to the split point, cherry-pick the second group onto a new branch B based on A, verify both by log and diff, and retarget B's base after A merges. It earns its place because the split was done twice in one session and the first attempt silently dropped a cherry-pick.

## Trigger

- Direct: "split into two PRs", "put this change in PR N and the rest in another", "the markup goes in a separate PR".
- Proactive: when a rule forbids mixing two kinds of change in one pull request (for example, a delivered implementation and later specification changes) and both are on the same branch.
- Negative: not when the owner has already started reviewing commits that would move; ask first.

## Inputs

- The current branch A with commits `c1..ck` beyond `origin/main`.
- The owner's assignment of each commit to group A (stays) or group B (moves).
- The existing pull request number for A, if any.

## Outputs

- Branch A rewritten to contain only group A, pushed with `--force-with-lease`.
- New branch B based on A's tip containing group B in original order, pushed, with a pull request whose base is A.
- Both pull request bodies rewritten to describe their current content.
- After A merges, B's base retargeted to `main`.

## Workflow

1. Record the full log: `git log --oneline origin/main..A > before.txt`. Save the tip hash.
2. Create B from A's tip: `git branch B A`.
3. Reset A to the last group-A commit: `git reset --hard <last-A-commit>`. If group A commits are not contiguous, instead reset to `origin/main` and cherry-pick group A one by one.
4. Check out B, reset it to A's new tip, then cherry-pick each group-B hash from `before.txt` in order, with no extra flags. Stop on the first conflict and resolve it; do not continue past a failed pick.
5. Verify: `git log --oneline origin/main..A` and `git log --oneline A..B` together list every subject in `before.txt`, and `git diff <saved-tip> B` is empty.
6. Push A with `--force-with-lease`, push B with `-u`.
7. Open the pull request for B with base A. Rewrite A's body to its new scope, and write B's body from group B.
8. When A merges, retarget B's base to `main` and confirm B still merges cleanly.

## Concrete examples

### Example 1: implementation 3 and the checkpoint markup

Branch `claude/handoff-instructions-hn00ac` had the implementation 3 delivery plus seven checkpoint commits. The owner's rule that delivered implementations are never edited meant the checkpoint commits could not share a pull request with the delivery. Group A: `c4b132f`, `426f321` (PR #20). Group B: the seven use-case and lesson commits, cherry-picked onto `claude/use-case-markup-3-checkpoint` (PR #21, base PR #20's branch). After #20 merged, #21 was retargeted to `main`.

The first attempt used `git cherry-pick -q <hash>` in a loop. The flag is invalid, every pick failed, and A was force-pushed without the run-number fix. Step 5's diff would have been non-empty. Rerunning without the flag and reading both logs fixed it.

### Example 2: use cases and the folder move

The owner asked for the per-type folder move to go into PR #18 with the use-case changes, while the implementation procedure went into its own pull request. Same mechanics; verified by `git diff` between the saved tip and B, which was empty.

## Anti-patterns

- **Passing flags to git inside a loop without checking exit status.** A rejected flag makes every iteration a no-op.
- **Force-pushing before the log-and-diff check.** The push rewrites what the owner is reviewing.
- **Leaving the pull request bodies as they were.** Both scopes changed.
- **Rebasing instead of cherry-picking onto A.** Rebase rewrites the group-B hashes the owner may have already seen in review; cherry-pick does too, but from a clean base with an explicit list to verify against.

## Acceptance criteria

- [ ] The union of A's and B's commits after the split equals the commits before it, by subject and by tree.
- [ ] No pick reported an error that was ignored.
- [ ] B's pull request base is A until A merges, then `main`.
- [ ] Both pull request bodies describe their current content.

## Files this skill creates / modifies

- No repository files. Branches A and B and their pull requests.
- `<scratchpad>/before.txt` — the pre-split log used for verification.
