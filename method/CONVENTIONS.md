# Artifact file conventions

Proposed by the AI partner and **ratified by Jonathan 2026-08-30**
(PR #7), with one markup: the reciprocal of `is-part-of` is named
`includes`. This records the approved convention from step 1 of
`ai/KICKSTART.md`. **Revised 2026-09-05 at Jonathan's direction**
(PR #18): one folder per artifact type, because the flat directory had
become unwieldy.

## One folder per type, one file per artifact

Every artifact is one markdown file under `workbench/<type>/`, where
`<type>` is the artifact's type exactly as written in its front matter:
`vision/`, `use-case/`, `component/`, `interface/`, `note/`. The
filename is the artifact's id plus `.md`, and the id does not repeat
the type — `use-case/edit-ideas.md`, `note/implementation-record-1.md`,
`vision/vision.md`. Everything else under `workbench/` (`input/`,
`implementations/`, `adr/`, `README.md`) is not an artifact and has no
front matter.

## Front matter

YAML front matter with exactly four keys — nothing else:

```yaml
---
id: edit-ideas
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
- `type` — one of `vision`, `use-case`, `component`, `interface`, `note`;
  matches the folder the file is in.
- `title` — human-readable, free text.
- `links` — lists of target paths relative to `workbench/`, always
  `<type>/<id>.md` (e.g. `vision/vision.md`,
  `use-case/initial-ui.md`), keeping the directory self-contained.
  Empty link lists may be omitted rather than listed as `[]`. Links in
  the markdown body are ordinary relative links from the file's own
  folder (`../use-case/initial-ui.md`, or `test-data-1.md` for a
  sibling), so they resolve wherever the file is viewed.

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
