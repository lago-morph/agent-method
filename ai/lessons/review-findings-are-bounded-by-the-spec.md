# Fixing anything without asking is a defect

A review finding is recorded, never fixed. This holds whether or not a
use-case sentence stands behind the finding: the implementation under
review is experimental data, and the objective of every run is to
develop the method, not to ship the application. Optimize for gathering
the data that shows where the method must be changed or extended, never
for the software.

Grounding (2026-09-07): reviewing implementation 4, the AI partner
"fixed" a wide word being split inside an emoji. Jonathan: "Fixing
anything without asking is a defect. Please remember that the objective
of this exercise is to develop the method. The actual application could
probably be one-shotted with my hand written notes. Do not optimize
implementing the software. Instead optimize gathering experimental data
that allows us to find areas where the method must be changed or
extended." A first version of this lesson implied that a finding backed
by a use-case sentence could be fixed; he rejected that: "That is
absolutely not the case." The filename is that first version's; it
stays until documents may be moved.
