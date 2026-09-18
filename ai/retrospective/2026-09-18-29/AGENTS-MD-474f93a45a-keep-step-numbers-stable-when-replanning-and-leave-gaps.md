# agent instruction

**Keep step numbers stable when replanning and leave gaps.** When a ratified plan is restructured, never renumber steps that survive. Give new steps unused numbers, retire the old ones, and state the unused range in the preamble. Then grep the whole file for every old number in prose (`step 12`, `steps 17 to 20`) and patch each reference by an asserted substitution.

*Grounded in: the 2026-09-17 phase 1 replan, which kept phase 2 at steps 15 to 21 and declared 11 to 14 unused.*

# justification

Retrospective 2026-09-09-27 already recorded a renumbering that broke cross-references across line breaks. This session avoided the problem by not renumbering: phase 2 kept its numbers, the retired range was declared, and only the twelve prose references that named replaced steps were patched, each by a substitution that asserted its anchor. Retrospectives, PR bodies, and chat all cite step numbers; a renumber silently invalidates every one of them. A gap in the sequence costs one sentence of explanation and nothing else.
