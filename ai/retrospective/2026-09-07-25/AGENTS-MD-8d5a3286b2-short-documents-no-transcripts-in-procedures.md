# agent instruction

**Short documents, no transcripts in procedures.** Keep every document an agent reads before working short enough to read whole. A procedure says what to do; the record of following it (what a run read, its metrics, what went wrong) goes to a separate experimental-data file, never into the procedure or the handoff.

*Grounded in: the owner's review: "This is a transcript, not a procedure"; "You are absolutely not using progressive disclosure when a handoff document is this long."*

# justification

The implementation procedure grew a section per run (implementations 2, 3, 4), each recording what went wrong, and the handoff grew to over two hundred lines. The owner: transcripts in a procedure "will contaminate context by reporting things that were done improperly and degrades the ability of the agent to make correct decisions", and the per-implementation notes "are just restatements of other documents", using "20x the tokens you need to use to convey the same information". The transcripts are wanted, as data, elsewhere. Cost of the rule: one more file per run; the procedure and handoff stay readable in one pass.
