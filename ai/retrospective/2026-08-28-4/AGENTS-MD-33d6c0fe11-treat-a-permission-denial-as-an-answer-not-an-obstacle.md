# agent instruction

**Treat a permission denial as an answer, not an obstacle.** "If Jonathan denies a tool permission, do not retry the call, work around it by other means, or re-ask in later turns; note the denial once and adapt the plan to live without that capability. Separately, stop retrying infrastructure-level tool failures (connection drops, permission-stream errors) after about three attempts and report the failure plainly instead."

*Grounded in: the denied send_later call and flapping MCP servers.*

# justification

The 2026-08-28 session hit both halves: three retries of a scheduled check-in against flapping MCP infrastructure wasted turns before the failure was reported, and when Jonathan then explicitly denied the send_later permission, the right move - no re-arm, no workaround, one acknowledgement - preserved trust and cost nothing. A user's denial is data about what they want, exactly like a spoken instruction; retrying it converts a preference into a nag. The rule's cost is remembering one bit of state per denial.
