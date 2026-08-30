# Conventions proposal (step 1 of KICKSTART)

Drafted 2026-08-30 by the AI partner. **Status: awaiting Jonathan's
approval.** Once approved (with markup), the convention gets recorded in
`method/CONVENTIONS.md` and this file is working residue.

## Proposed convention for artifact nodes

### One file per artifact

Every artifact is one markdown file directly under `workbench/`
(no subdirectories for now). The filename is the artifact's id plus
`.md` — e.g. `vision.md`, `use-case-edit-ideas.md`.

### Front matter

YAML front matter with exactly four keys — nothing else:

```yaml
---
id: use-case-edit-ideas
type: use-case
title: Edit ideas
links:
  is-part-of: []
  has-part: []
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

### Two-way traversal: reciprocal entries, maintained by hand

Every link appears in **both** files it connects, so either endpoint can
be traversed from without tooling:

| Forward (in A)  | Reciprocal (in B)      | Meaning                    |
| --------------- | ---------------------- | -------------------------- |
| `is-part-of: B` | `has-part: A`          | directional                |
| `depends-on: B` | `depended-on-by: A`    | directional                |
| `related-to: B` | `related-to: A`        | non-directional, symmetric |

The AI partner maintains both ends on every edit; drift is caught in
review. **Alternative considered:** a generated index file. Rejected for
now per SEED — tooling gets added only when real friction (i.e. actual
drift) shows it is needed. If drift happens, a linter or generated index
is the known escape hatch.

## Open point for Jonathan

Approve as-is, or mark up: the reciprocal-key names (`has-part`,
`depended-on-by`), the id-equals-filename rule, and the choice of
hand-maintained reciprocity over a generated index are the three
decisions with alternatives.
