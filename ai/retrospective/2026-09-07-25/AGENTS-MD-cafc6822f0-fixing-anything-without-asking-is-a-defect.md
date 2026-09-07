# agent instruction

**Fixing anything without asking is a defect.** Do not fix a finding in any artifact under review, whether or not a use-case sentence stands behind it; report it and ask. The objective of every run is experimental data about the method, not working software.

*Grounded in: the owner's review of PR #25: "Fixing anything without asking is a defect."*

# justification

The session's first version of the lesson said a finding is a defect "only if the spec says so", which the owner read as permission to fix sentence-backed findings: "That is absolutely not the case." His statement of purpose: "The actual application could probably be one-shotted with my hand written notes. Do not optimize implementing the software. Instead optimize gathering experimental data that allows us to find areas where the method must be changed or extended." A harness posture that says bot findings are bug reports to verify and push does not know this purpose; the rule is what lets a session override it. Cost: one question to the owner instead of a commit.
