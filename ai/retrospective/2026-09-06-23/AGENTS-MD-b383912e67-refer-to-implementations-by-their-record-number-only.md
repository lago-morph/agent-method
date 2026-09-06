# agent instruction

**Refer to implementations by their record number only.** An implementation is named by its implementation record ('implementation 3'), never by the sequence number of the run, subagent, or attempt that produced it. If a second counter is needed for procedure metrics, key it by the record number as well.

*Grounded in: 'run 2 and implementation 3 is incredibly confusing'.*

# justification

Implementation 3 was the second run of the subagent procedure, and the first drafts of the procedure and the handoff called it "run 2" in the metrics table and "implementation 3" everywhere else. The owner's comment: "refer to implementations by their implementation record; run 2 and implementation 3 is incredibly confusing." One commit fixed the wording, but the two counters had already leaked into the pull request body, the handoff, and the procedure's metrics table.

A second name for the same thing multiplies every cross-reference and gives a future reader two counters to reconcile. Keying everything by the record number costs nothing, since the record exists before the run starts.
