# agent instruction

**Verify scripted git surgery by log and diff before pushing.** After any cherry-pick, reset, rebase, or branch split done in a script, print the resulting log of each affected branch and the diff between the expected and actual tree before pushing. Never pass unknown flags to git in a loop; a rejected flag makes the command a no-op and the loop continues silently.

*Grounded in: `git cherry-pick -q` is invalid; the split branch was force-pushed without its fix.*

# justification

Splitting the checkpoint work into two stacked pull requests was done with a loop of cherry-picks written as `git cherry-pick -q <hash>`. The `-q` flag does not exist for cherry-pick, so every command failed, the loop continued, and branch A was force-pushed without the run-number fix it was supposed to carry. The pull request body described a commit that was not on the branch. Recovery meant re-running the cherry-picks without the flag and comparing logs and diffs, which is what should have been done before the first push.

The check is two commands: `git log --oneline` on each branch and `git diff <expected>..<actual> --stat`. A silent no-op in a git loop is invisible until someone reads the pull request, and by then the force-push has already rewritten what the owner was reviewing.
