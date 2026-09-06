# agent instruction

**The implementation record is the subagent's whole brief.** When handing an implementation to a subagent, do not restate in the prompt what the record already carries (use cases covered, environment, decisions); point to the record and to the reading order. Anything the subagent needs that is not in the record or the artifacts is a gap to fix in the documents, not in the prompt.

*Grounded in: 'Implementation document already includes use cases covered and execution environment, doesn't it?'*

# justification

The first draft of the subagent procedure's prompt template restated the use cases covered and the execution environment. The owner pointed out that the record already carries both: "Implementation document already includes use cases covered and execution environment, doesn't it?" The template was cut to a pointer at the record plus the tiered reading order, and the second run worked from that.

Restating record content in the prompt creates a second source that can drift from the first, and it hides gaps: if the subagent could only succeed because the prompt told it something the artifacts do not, then the artifacts are insufficient and nobody finds out. Pointing at the record costs one line and keeps the run an honest test of the documents.
