# agent instruction

**Record a trial decision with a named exit event and cite it only as a trial.** When Jonathan agrees to try a way of working but has not adopted it, record it as an ADR with status Trial that names the event at which he decides and the evidence he will weigh. Until that event, cite the ADR as a trial and never restate its content as a rule in a lesson, the handoff, a procedure, or a prompt.

*Grounded in: ADR 0008 of 2026-09-17 and Jonathan's warning that "let's try it" propagates into "we must".*

# justification

Jonathan named the failure mode directly: a trial gets restated as a rule by the next document that mentions it, and nobody can find where it was decided. Lessons, handoff, and prompt templates are where it happens, because each one summarizes the others. The rule keeps one source, with a status line any reader can check, and makes the exit event a scheduled decision rather than a forgotten one. The cost is a status line and one sentence of discipline per ADR.
