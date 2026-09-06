# agent instruction

**Update the pull request body when its scope changes.** When commits are added to an open pull request that change what it delivers, or when a branch is split and part of the work moves elsewhere, rewrite the pull request body and title to describe the current content. The body is what the owner reads on an iPad before merging; a stale body misdescribes the merge.

*Grounded in: PR #16 grew from one use case to twelve commits across four topics, and PR #18 lost half its commits to PR #20.*

# justification

PR #16 started as "Draft the Edit ideas use case" and ended with twelve commits spanning the use case, ADR 0006, ADR 0007, decision guides, the quality-standards guide, and the retrospective procedures. PR #18 was split in two, so half of its commits moved to PR #20. In both cases the body had to be rewritten so the owner, reading on an iPad and merging from there, saw what the merge would actually contain. The owner also asked how to see the consolidated diff rather than commit-by-commit, which is the same need from the other side.

The cost of a stale body is a merge made on a wrong description. The cost of the rule is one API call per scope change.
