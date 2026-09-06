# Spec: `deliver-to-ipad`

- **ID**: SKILL-SPEC-f1390d9ae7
- **Source retrospective**: ../2026-09-06-23.md

## Intent

Present a single-file HTML implementation so the owner can open it in Safari on an iPad, where GitHub's raw download appends .txt and the file cannot be renamed; deliver by attaching the file and by publishing a hosted copy, and report the route that worked. It earns its place because the first delivery attempt failed on exactly this and the working route had to be rediscovered.

## Trigger

- Direct: "present the file so I can open it in Safari", "I can't remove the .txt", "show me implementation N on the iPad".
- Proactive: whenever an implementation under `workbench/implementations/<N>/` is delivered or reviewed and the owner works from an iPad (the environment section of the implementation record says so).
- Negative: not for markdown or scripts; those are read on GitHub.

## Inputs

- The path `workbench/implementations/<N>/idea-workbench.html`.
- The owner's device: Safari on iPad, both orientations, touch input.

## Outputs

- A file attachment of the HTML sent to the owner, with the `.html` extension intact.
- A hosted copy published as an artifact page, made from the same file with the document skeleton stripped, plus its link.
- One line in the reply stating both routes and that the hosted copy is a copy, not the file of record.

## Workflow

1. Copy the file to the scratchpad under a name that carries the implementation number, for example `idea-workbench-impl-3.html`. Keep the `.html` extension.
2. Send it as an attachment with display set to attach, so Safari receives a file and not an inline preview.
3. Make the hosted copy: strip the `<!doctype>`, `<html>`, `<head>`, and `<body>` wrapper tags, keep `<title>`, `<style>`, the body content, and the scripts in order, and publish it. Do not change any content.
4. Verify the hosted copy loads the same scaffolding controls (the test-data load control, the panes, the message area) with a headless browser at iPad size before sending the link.
5. Reply with the attachment and the link. State that the repository file is the record and the hosted page is a convenience copy.
6. If the artifact service refuses a watch subscription, say so and do not retry; the page still publishes.

## Concrete examples

### Example 1: implementation 1

The owner opened the raw file from GitHub on the iPad; Safari saved it as `idea-workbench.html.txt` with no way to rename. Attaching the file from the scratchpad as `idea-workbench-impl-1.html` opened directly in Safari. The hosted copy was published as well and the owner used both.

### Example 2: implementations 2 and 3

Same route reused. For implementation 3 the hosted copy was verified headless at 1024×768 and 768×1024 before sending, and the watch subscription returned 403; the reply noted it and moved on.

## Anti-patterns

- **Pointing the owner at the GitHub raw URL.** That is what fails.
- **Renaming the file to hide the number.** Three implementations delivered in one session; the number in the filename is how the owner tells them apart in Files.
- **Editing the HTML to make it publish.** Strip only the wrapper tags; content changes would make the hosted copy differ from the record.

## Acceptance criteria

- [ ] The attached file's name ends in `.html` and carries the implementation number.
- [ ] The hosted copy renders the same controls as the file at both iPad sizes.
- [ ] The reply names both routes and which is the record.
- [ ] No repository file was modified.

## Files this skill creates / modifies

- `<scratchpad>/idea-workbench-impl-<N>.html` — the attachment and the source of the hosted copy.
