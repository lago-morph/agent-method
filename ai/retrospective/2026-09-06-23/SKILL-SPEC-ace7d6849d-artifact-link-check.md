# Spec: `artifact-link-check`

- **ID**: SKILL-SPEC-ace7d6849d
- **Source retrospective**: ../2026-09-06-23.md

## Intent

Validate the workbench artifact graph mechanically: every file's front matter has exactly the required keys, its id equals its file stem, its type equals its folder, every front-matter link resolves to an existing file, every link has its hand-maintained reciprocal in the target, and every body link resolves relative to the file. It earns its place because the graph was validated three times in one session, each time with a rewritten ad-hoc script, and a folder move of forty files would have left dangling links without it.

## Trigger

- Direct: "check the links", "validate the workbench", "/artifact-link-check".
- Proactive: after any commit that adds, renames, or moves a file under `workbench/`; after a subagent delivers an implementation; before opening a pull request that touches `workbench/`.
- Negative: not for `method/`, `ai/`, or `archive*/`, which are not part of the artifact graph.

## Inputs

- The `workbench/` tree. Artifacts live one folder per type: `vision/`, `use-case/`, `component/`, `interface/`, `note/`. `implementations/` and `README.md` are not artifacts.
- `method/CONVENTIONS.md`, which defines the front-matter keys (`id`, `type`, `title`, `links`), the link form `type/id.md`, and the reciprocal pairs: `is-part-of` with `includes`, `depends-on` with `depended-on-by`, `related-to` with itself.

## Outputs

- A report to the terminal: one line per violation as `path: message`, then `OK: <n> artifacts, <m> links` when clean.
- Exit status non-zero on any violation. No files are modified.

## Workflow

1. Collect every `*.md` under the five type folders. Skip `README.md` and `implementations/`.
2. For each file, parse the YAML front matter between the first two `---` lines. Report if absent.
3. Check the key set equals exactly `['id','type','title','links']` in that order. Report extra, missing, or reordered keys.
4. Check `id` equals the file's stem and `type` equals the folder name.
5. Check the raw text of the links block contains no `[]`; an artifact with no links lists each relation as an empty mapping value, not an empty array.
6. For each link `type/id.md` under each relation: check the target file exists; then load the target's front matter and check the reciprocal relation contains this file's `type/id.md`.
7. Scan the body (after the front matter) for markdown links `](...)`; for each relative target that is not a URL or anchor, resolve it from the file's own folder and check it exists.
8. Print violations, then the summary line. Exit 1 if any violation.

## Concrete examples

### Example 1: the per-type folder move

Before the move, links were `note-ui-decisions-1.md`; after, `note/ui-decisions-1.md`. Running the check after the scripted rewrite reported no front-matter violations, but the word-level diff of the same commit showed the bare id `vision` rewritten inside prose in three non-artifact files. The check's scope stops at `workbench/`; the prose corruption was caught by a separate diff read. Output when clean:

```
OK: 41 artifacts, 118 links
```

### Example 2: a subagent's new notes

Implementation 3's subagent created record 3's six per-area notes. The check found every `is-part-of: note/implementation-record-3.md` had its `includes` reciprocal, and that the record's body links (`[note/test-method-3.md](test-method-3.md)`) resolved relative to `workbench/note/`. Had the subagent written `[note/test-method-3.md](note/test-method-3.md)`, step 7 would have reported:

```
workbench/note/implementation-record-3.md: body link note/test-method-3.md does not resolve
```

## Anti-patterns

- **Rewriting the validator each time.** Three versions were written in one session because the previous one was in a scratchpad that had been cleared. Keep it in `ai/procedures/artifact-link-check.md` and run it from there.
- **Trusting a scripted rename without running the check.** The rename script can produce paths that look right and do not exist.
- **Treating a clean check as proof the prose is right.** The check covers front matter and links only.

## Acceptance criteria

- [ ] A missing reciprocal is reported with both file paths and the relation name.
- [ ] A link to a non-existent file is reported.
- [ ] An `id` that differs from the stem, or a `type` that differs from the folder, is reported.
- [ ] A body link written with the `type/` prefix from inside that type's folder is reported.
- [ ] The clean run prints the artifact and link counts and exits 0.

## Files this skill creates / modifies

- None in the repository. The script lives in `ai/procedures/artifact-link-check.md` and runs from a scratchpad copy.
