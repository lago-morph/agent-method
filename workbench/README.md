# workbench/

The actual artifacts of **idea-workbench**, the first application specified
with the method: vision, use cases, component definitions, typed
interfaces, and notes, linked as a graph. One folder per artifact type,
named by the type: `vision/`, `use-case/`, `note/` today; `component/`
and `interface/` when the first of each exists. Architecture decision
records that bind idea-workbench specifically live in `adr/`; the
transcribed source notes in `input/`; implementations under
`implementations/<N>/`.

This directory holds artifact instances only - no method definitions
(`method/`) and no AI working documents (`ai/`). It is expected to move
wholesale to its own repository later, so everything in it stays
self-contained: links between artifacts are relative and nothing references
paths outside this directory.
