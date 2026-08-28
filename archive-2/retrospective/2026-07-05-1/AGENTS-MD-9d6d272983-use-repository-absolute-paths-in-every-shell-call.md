# agent instruction

**Use repository-absolute paths in every shell call.** "Do not rely on the working directory persisting between shell calls - it can reset without notice. Start compound commands with cd to an absolute repository path or use tool flags that take explicit paths (git -C)."

*Grounded in: a commit command failing with 'not a git repository' after a silent cwd reset.*

# justification

Mid-session, a commit-and-push command failed with "fatal: not a git repository" because the shell's working directory had silently reset between calls (the harness resets it after certain operations). The failure was cheap this time — one retry with an explicit cd — but the same reset landing on a different command shape (a relative-path rm, an rsync, a redirect) is not cheap. The rule's cost is a handful of characters per command; the failure class it removes includes some of the most destructive mistakes a shell-wielding agent can make.
