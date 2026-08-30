# Artifact file conventions

Proposed by the AI partner and **ratified by Jonathan 2026-08-30**
(PR #7), with one markup: the reciprocal of `is-part-of` is named
`includes`. This records the approved convention from step 1 of
`ai/KICKSTART.md`.

## One file per artifact

Every artifact is one markdown file directly under `workbench/`
(no subdirectories for now). The filename is the artifact's id plus
`.md` — e.g. `vision.md`, `use-case-edit-ideas.md`.

## Front matter

YAML front matter with exactly four keys — nothing else:

```yaml
---
id: use-case-edit-ideas
type: use-case
title: Edit ideas
links:
  is-part-of: []
  includes: []
  depends-on: []
  depended-on-by: []
  related-to: []
---
```

- `id` — matches the filename stem. Lowercase, hyphen-separated.
- `type` — one of `vision`, `use-case`, `component`, `interface`, `note`.
- `title` — human-readable, free text.
- `links` — lists of target filenames relative to `workbench/`
  (e.g. `vision.md`), keeping the directory self-contained. Empty link
  lists may be omitted rather than listed as `[]`.

The body below the front matter is free markdown.

## Two-way traversal: reciprocal entries, maintained by hand

Every link appears in **both** files it connects, so either endpoint can
be traversed from without tooling:

| Forward (in A)  | Reciprocal (in B)   | Meaning                    |
| --------------- | ------------------- | -------------------------- |
| `is-part-of: B` | `includes: A`       | directional                |
| `depends-on: B` | `depended-on-by: A` | directional                |
| `related-to: B` | `related-to: A`     | non-directional, symmetric |

Whoever edits a link maintains both ends in the same change; drift is
caught in review. If drift actually occurs, a linter or generated index
is the known escape hatch — tooling gets added only when real friction
shows it is needed.
