# Procedures are not transcripts

A procedure says what to do: short, clear, to the point. The record of
following it — what a run read, its metrics, what went wrong — is
experimental data and lives elsewhere. Put into the procedure, it
contaminates the context of the agent following it and degrades its
decisions. The same holds for the handoff and every document an agent
reads before working: progressive disclosure fails when the first
document is long. The implementation sections in
`ai/procedures/implement-by-subagent.md` and the length of
`ai/HANDOFF.md` are to be fixed when work shifts to the method, not
before.

Grounding (2026-09-07, PR #25): Jonathan on the procedure's
implementation sections: "This is a transcript, not a procedure. Do not
confuse procedures with the record of following the procedure. It will
contaminate context by reporting things that were done improperly and
degrades the ability of the agent to make correct decisions." On
progressive disclosure: "you are confusing subagents with excessive
history. Procedures must be short, clear, and to the point. The
transcripts are extremely important as experimental data, but you are
absolutely not following principles of progressive disclosure." On the
handoff: "You are absolutely not using progressive disclosure when a
handoff document is this long."
