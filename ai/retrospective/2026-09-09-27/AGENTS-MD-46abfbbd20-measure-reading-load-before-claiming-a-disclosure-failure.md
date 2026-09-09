# agent instruction

**Measure reading load before claiming a disclosure failure.** Before stating that progressive disclosure is failing or that a document is too long, run `wc -w` over the exact reading set a session or run is told to load, and report the numbers per tier. Lead with the table, not the adjective.

*Grounded in: the assessment opened with a five-row word-count table of what an implementation run and a session start actually read.*

# justification

The owner had already said disclosure was failing; the session's job was to say where. Word counts over the run's tiers showed the spec was about five thousand words and the residue around it about six times that, and that the per-implementation notes had tripled between implementations 1 and 4. Those numbers became the budgets in the plan's step 2 and the acceptance test for its later steps. Without them the assessment would have agreed with the owner and added nothing. The cost is one `wc` command over a named file list.
