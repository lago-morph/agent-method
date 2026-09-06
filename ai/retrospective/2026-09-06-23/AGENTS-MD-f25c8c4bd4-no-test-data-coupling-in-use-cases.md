# agent instruction

**No test-data coupling in use cases.** When writing or revising a use case, describe behavior with an illustrative example and never with a count, name, or position taken from a test data set ('the fourth item', 'the sixty-letter idea', 'seven items'). Test data is the implementation's concern and changes per implementation; a use case that names it breaks when the data changes.

*Grounded in: 'Why in the world do you have use cases based on the test data? Give an example, not a number.'*

# justification

The Edit ideas use case's walk-through section was written against the implementation's test data set: "the seven items", "the fourth item", "the sixty-letter idea". The owner's pull request comment: "Why in the world do you have use cases based on the test data? Give an example, not a number." The section had to be rewritten as free-standing examples, and the definition of the use-case type and the handoff gained a rule.

The cost of the coupling is structural, not cosmetic: test data is chosen per implementation and recorded in that implementation's test-data note, so a use case that names it silently goes wrong when the next implementation chooses different data, and the clean-context subagent has no way to tell. Writing an example instead of a count is the same number of words.
