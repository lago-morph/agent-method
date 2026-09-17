# ADR 0008: An implementation is sealed, run, and frozen; its decision log grows the spec

- **Date**: 2026-09-17
- **Status**: Trial. The exit event is the ratification pass after
  implementation 5, where Jonathan confirms, revises, or withdraws
  this decision on the evidence below. Until then it is cited as a
  trial and never restated as a rule in the lessons, the handoff, or a
  procedure.
- **Adopted from**: Jonathan's direction in conversation, 2026-09-17,
  captured as "The imagined workflow" in `../../ai/PLAN.md`.

## Context

Four implementations were built with the mutability rules spread over
three lessons, a prompt template, and two notes, and each run's
decisions were scattered across six per-area notes. Runs 3 and 4
reported thirteen ambiguities between them; none has yet been
ratified into a design artifact. What Jonathan needs at every stage is
to know what is input, what is output, and what may change.

## Decision

An implementation N has one directory and two freeze points.

```
workbench/implementations/N/
  input/    record.md and any inherited files   frozen at the seal commit
  output/   the code, the checks, log.md        frozen at the finalize commit
```

- **Prepare.** The record and any design artifact may be edited. The
  record is the manifest: it lists every input file by path, the
  environment (model, harness, tools), and, when N builds on an
  earlier implementation, which of its files were copied into
  `input/`. Copies are the only way an implementation artifact
  evolves. A prep commit holds every input.
- **Seal.** One commit adds the prep commit's hash to the record.
  From here `input/` and every listed artifact are read-only for the
  run.
- **Run.** The run reads what the manifest lists and nothing else,
  writes only to `output/`, and logs every decision the inputs left
  open. It stops when two inputs conflict; a stop is a valid result
  and the log is the implementation. Missing information is not a
  stop: the run decides and logs.
- **Freeze.** The finalize commit ends the run. `output/` is never
  edited afterward. A move that changes only path strings, verified
  by the link check, is not an edit.
- **Between.** Jonathan tests, then reads the log as a list. Each
  entry meets one of four fates: **locked** into a use case, standard,
  or data set; **delegated** to the run by a guide entry naming the
  options; **reversed**; or **left open**, so the next run may decide
  differently, which is data. A decision is ratified only by being
  preserved in a design artifact; one with no home goes into a note,
  and clustered notes drive changes to the artifact types.

A log entry has a stable id (`N/D-k`), the question the inputs left
open, the options the run saw, the choice, and the input that should
have answered it. The log is frozen, so the artifact that absorbs an
entry cites the entry; provenance runs forward.

A run on the same sealed inputs with a different environment is a new
N whose record says so; the difference in its log measures variance.

## Evidence the exit event weighs

Whether implementation 5's log was ratifiable as a list; whether each
entry found a home in an existing type or needed a note; whether the
run stopped when it should have and only then; whether the two-
directory shape made input and output unambiguous.

## Alternatives considered

- **A mutability table** by phase, artifact, and actor (the earlier
  method plan's step 4): rejected; two freeze points answer the same
  question by path.
- **Always withhold the predecessor**: rejected; inheritance declared
  in the manifest makes regeneration versus modification measurable
  per run.
- **Stop on every ambiguity**: rejected; a long list of logged
  decisions is the material the spec grows from.

## Consequences

- Implementations 1 to 4 are moved into this shape by path only;
  their content is untouched. Record 5 is the first instance written
  to it.
- The implementation record, the decision log, and the test data get
  type descriptions derived from the existing instances; other types
  wait until the ratification pass shows what they must hold.
- The lessons on frozen implementations and unfixed findings still
  bind; they are not rewritten to cite this ADR while it is a trial.

## References

- `../../ai/PLAN.md` — "The imagined workflow".
- `0007-artifacts-must-suffice-for-regeneration.md` — the
  regeneration test this lifecycle serves.
- `../../ai/method-plan.md` — the steps that act on this decision.
