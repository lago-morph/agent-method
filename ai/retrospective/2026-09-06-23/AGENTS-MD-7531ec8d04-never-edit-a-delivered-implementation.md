# agent instruction

**Never edit a delivered implementation.** A delivered implementation, its per-area notes, and its checks are the historical record of what was built from the specification of that day. When a checkpoint or review changes what the software should do, change the use cases and open the next implementation record; do not touch the delivered files, even for a one-line fix, even when the change is 'obviously right'.

*Grounded in: the checkpoint markup on implementation 3 was first applied to the implementation itself and had to be reverted.*

# justification

During the checkpoint on implementation 3, six review comments changed the specification (ordering over the entire content, truncation after a partial word, hyphenated splitting of long words, an empty message list, no test-data coupling). The first response applied those changes to implementation 3's HTML, checks, and notes, on the reasoning that the implementation should match the spec. The owner's reaction was immediate and unambiguous: "Why are you editing the implementation itself? You should never update a finished implementation. That is the historical record. Bad AI." Undoing it cost a revert of two files and six notes to the delivery commit, a branch reset, a stacked pull request, and a new lesson, standard line, and procedure line, roughly forty minutes of session time and one round of owner trust.

The rule costs nothing to follow: the change goes to the use case and the next record instead, which is where it was going to end up anyway. Without the rule the temptation recurs at every checkpoint, because the fix is always small and always "obviously right".
