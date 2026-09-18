# agent instruction

**Check the entry document against the git log before starting.** Before acting on the handoff's "next step", compare it with the merged PRs since the handoff was last committed (`git log --oneline -- ai/HANDOFF.md` against `git log --oneline main`). If newer PRs changed the plan, say so in the first message and treat the newest ratified plan as current, not the handoff.

*Grounded in: the 2026-09-17 session, where the handoff still named the implementation 4 checkpoint while PRs #27 and #28 had ratified a 22-step method plan it never mentioned.*

# justification

The handoff is rewritten at session end, but two PRs (#27, #28) landed a whole method plan without touching it. A session that trusted the handoff would have started on stale work, and the plan's own protocol tells each session to read only its step, so nothing downstream would have caught it. The check is one `git log` on the handoff and one on main, compared by date: under a minute. The cost of skipping it was, in this session, only avoided because the first instruction was to read everything; the plan's per-step sessions will not.
