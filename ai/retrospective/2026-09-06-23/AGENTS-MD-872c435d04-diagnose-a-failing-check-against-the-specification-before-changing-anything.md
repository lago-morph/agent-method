# agent instruction

**Diagnose a failing check against the specification before changing anything.** When a check you wrote fails against an implementation, first decide from the specification which side is wrong. Do not edit the implementation, and do not edit the check, until you can state which document the failure contradicts.

*Grounded in: a review assertion expected 'Aardvark' first; locale ordering puts 'A very large idea' first, and the implementation was right.*

# justification

The independent review of implementation 2 asserted that after loading the test data the first non-empty row would be "Aardvark". It was "A very large idea", because locale-aware ordering sorts a space before a letter. The implementation was correct and the assertion was wrong, which was established by reading the use case's ordering rule before touching anything. Had the reflex been to "fix" the implementation, a correct behavior would have been broken to satisfy a wrong test, and the resulting implementation would have been delivered and frozen with the defect.

Deciding which side is wrong takes one look at the specification. Changing the wrong side costs a delivered defect, and delivered implementations cannot be edited afterwards.
