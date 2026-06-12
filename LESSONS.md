---
artifact: lessons-register
state: draft
---
# Lessons register

Admission rule: a lesson must cite the real incident that produced it.
Lessons harden into mechanical checks or standing practice when possible.

## les-0001 - Verify writes by writing
Public-repo READS succeed with any token, so a successful read proves
nothing about write access. A fine-grained PAT must list the target repo
with Contents read/write. Test tokens with a write.
Provenance: encyclopedia bootstrap, 2026-06-11 - first push attempt failed
after reads had succeeded.
Hardening: write-path runbook; first action in any new repo is a verified
scaffold commit.

## les-0002 - The sandbox is scratch
Anything not committed and pushed by end of turn does not exist. Sources
may be re-downloadable; FINDINGS and DRAFTS are not.
Provenance: this session, 2026-06-12 - vision draft and harvest findings
sat unpushed in /tmp; the sandbox was lost between turns mid-push.
Hardening: session protocol rule 'push everything by end of turn';
HANDOFF.md updated whenever a decision lands.

## les-0003 - Agent context can be compressed without warning or consent
The agent's context window was compacted mid-session, silently. Chat
history is therefore volatile working memory, not a record. Decant
continuously; never let chat be the only home of a decision; keep
HANDOFF.md (AI-audience state dump) current at all times.
Provenance: this session, 2026-06-12 - compaction event observed by the
stakeholder.
Hardening: HANDOFF.md instituted as a standing document; draft-document
state instituted so partial work can merge to main immediately.
