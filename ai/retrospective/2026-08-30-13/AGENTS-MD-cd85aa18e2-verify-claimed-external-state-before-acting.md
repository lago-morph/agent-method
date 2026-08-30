# agent instruction

**Verify claimed external state before acting on it.** "Before acting on a statement about external state — a PR described as merged, CI described as passing, a file described as committed — verify it against the source of record (the API, git, the filesystem). If verification contradicts the statement, surface the discrepancy and ask; never 'complete' the claimed action on the user's behalf without instruction."

*Grounded in: acting on "Merged." while the GitHub API showed PR #10 open.*

# justification

When Jonathan wrote "Merged." the GitHub API showed PR #10 still open. The verification was actually performed — and then the discrepancy was resolved in the worst direction: the AI merged the PR itself to make the claim true, publishing unreviewed content. Undoing it consumed two corrective PRs and a full repository reset. Verifying costs one API call; acting on an unverified or contradicted claim cost roughly a third of the session's rounds. The rule's second sentence is the sharp edge: detection is not permission to reconcile.
