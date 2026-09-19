# Artifact type: build form

The cover page of a build: "use these files, with these parameters,
in this environment, to build this". One per build, at
`input/build-form.md` in the build's directory. It is written before
the run, sealed with the rest of `input/`, and never edited after the
seal. The run reads what the build form lists and nothing else.

## What a build form holds

- **Design artifacts.** The front-matter `depends-on` links: every
  use case, guide, and other design artifact the run reads, by path.
  The reciprocal `depended-on-by` link is added to each target.
- **Files in `input/`.** Every other file the run reads, by path: the
  per-build notes prepared and approved before the run, and any file
  inherited from an earlier build. An inherited file names the build
  it was copied from. Copies are the only way a build's files carry
  forward.
- **Parameters.** Eight, all required, one answer each. An answer is
  a value, not a discussion; detail lives in a file the build form
  lists.
- **Environment.** The model, the harness, and the tools the run has.
- **Seal.** The hash of the commit that holds every input. Added by
  the seal commit and nothing else.

## What a build form never holds

- Anything the run decides. That is the decision log, in `output/`.
- A restatement of a use case, a note, or a guide.
- What changed since the previous build. The design artifacts are
  whatever the listed paths hold at the sealed commit.

## Template

```markdown
---
id: build-form
type: build-form
title: Build <N> form
links:
  depends-on:
    - use-case/<id>.md
    - note/<id>.md
---

## Files in input/

- `<file>` — <what it is>; inherited from build <M> where it is.

## Parameters

- **Target execution environment:** <answer>
- **UI method:** <answer>
- **Persistent storage:** <answer>
- **UI design:** <answer>
- **Implementation language:** <answer>
- **Use cases and components to include:** <answer>
- **Build and installation methods:** <answer>
- **Logging requirements:** <answer>

## Environment

- **Model:** <answer>
- **Harness:** <answer>
- **Tools:** <answer>

## Seal

Prep commit: `<hash>`
```
