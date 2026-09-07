# agent instruction

**Chain the commit to the edit script.** When a script edits files that a commit will carry, run it as `script && git add -A && git commit`; never let a commit follow a script that may have applied only part of its edits.

*Grounded in: the handoff edit that failed at its fourth anchor and was committed with three edits applied.*

# justification

A Python script applying seven edits to the handoff asserted on the fourth anchor (a line-wrap mismatch) and stopped; the `git add` and `git commit` on the next lines ran anyway, and the partial handoff was pushed. Finding it, re-applying the remaining edits with whitespace-tolerant anchors, and pushing a second commit cost a turn and left a misleading commit in the history. The fix is a `&&` between the script and the commit, and asserting each anchor's count before writing.
