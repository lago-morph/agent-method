# agent instruction

**Grep subagent transcripts, never read them.** A subagent's transcript is the raw material for metrics (tokens, tool uses, documents opened) and for checking a claim in its report. Extract what is needed with grep or a short script and read only the extracted lines; never open the whole transcript, which is hundreds of kilobytes and would displace the session's own context.

*Grounded in: the two implementation-run transcripts, each mined by grep for the procedure's metrics table.*

# justification

Both subagent runs left transcripts of several hundred kilobytes. The procedure needs their metrics: token count, tool-use count by kind, and the distinct documents the subagent opened in order. All of that came from three grep commands, now recorded in the procedure, and the extracted lines fit in a screen. Reading a transcript whole would have consumed more context than the entire rest of the session and would have had to be repeated after every compaction.

The extraction commands are already written in the implementation procedure; reusing them costs one tool call. The alternative costs the session's working memory.
