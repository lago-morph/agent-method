# agent instruction

**Split reads that exceed the output cap instead of re-reading the saved file.** When a batched read is too large and the tool saves it to a file, do not `cat` the saved file: it is the same size and will be saved again. Split the original read into batches under the cap (about 30 KB) and issue them in parallel.

*Grounded in: a ten-file `cat` of 38 KB was saved to a tool-results file, and a `cat` of that file was saved again.*

# justification

The session's first survey read ten documents in one command. The output exceeded the cap, was saved to a results file, and the reflex `cat` of that file was saved again, costing two tool calls and yielding nothing. Splitting into four parallel reads of two or three files each returned everything at once. The rule costs a moment of arithmetic on `wc -c` before a batched read; skipping it costs at least two wasted round trips and, in a longer session, a truncated read that goes unnoticed.
