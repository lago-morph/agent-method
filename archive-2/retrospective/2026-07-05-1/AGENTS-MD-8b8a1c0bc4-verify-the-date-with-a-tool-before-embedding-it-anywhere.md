# agent instruction

**Verify the date with a tool before embedding it anywhere.** "Before writing a date into a filename, frontmatter, or record, verify it with a tool call (date -u, or Python datetime in UTC) - never trust the internal sense of today, especially in long-running sessions."

*Grounded in: a session that started with documents dated 2026-07-03 and ended, per date -u, on 2026-07-05.*

# justification

This session spanned at least three calendar days of wall clock. Documents committed mid-session carry the date 2026-07-03, taken from ambient context that was accurate when the session began; by the time this retrospective was written, two independent tools (date -u and Python UTC datetime) agreed the date was 2026-07-05. Nothing in the session signaled the rollover. Dates embedded in filenames and provenance records are load-bearing in this repository — the registers and lessons cite them as evidence — so a silent two-day drift corrupts exactly the audit trail the methodology depends on. The check costs one tool call.
