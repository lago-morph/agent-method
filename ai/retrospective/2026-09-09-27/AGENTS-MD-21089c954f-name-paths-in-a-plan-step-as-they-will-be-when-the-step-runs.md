# agent instruction

**Name paths in a plan step as they will be when the step runs.** In a multi-step plan executed across clean contexts, write each step's context list with the paths that will exist when that step runs, after every earlier step's moves and renames, and say so in the preamble. Do not name today's paths for a step that runs after a restructure.

*Grounded in: steps 7 to 13 of ai/method-plan.md name `implementations/N/` paths that exist only after step 6 moves the notes there.*

# justification

The plan's step 6 moves implementation-specific notes under `implementations/N/`. Steps 7 to 13 read those notes. A fresh context executing step 10 will look for the file where the plan says it is; if the plan had named the pre-move path, that context would either fail the read or, worse, find a stale copy. Writing post-move paths cost nothing at authoring time because the move was already decided. The path check run over the finished plan listed every not-yet-existing path so each could be confirmed as a future output rather than a typo.
