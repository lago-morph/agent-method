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

## les-0004 - Design the method by using it
A method meta-system designed before any of it is used will stall at first
contact and rot: the machinery absorbs the effort the work needed. The
first attempt designed gates, judges, calibration sets, and a two-plane
architecture in one session; its first gate (16 items for a 119-line
vision) never ran in the following three weeks, and the standing docs went
stale within days of stakeholder edits - reproducing the exact
self-certified-status failure the design was built to prevent.
Provenance: agent-method first attempt, 2026-06-11 to 2026-06-20; measured
in the 2026-07-03 complexity review (reviews/).
Hardening: rebuild is requirements-first; method elements enter as
candidates with sources and are validated by use on a real project before
being treated as established (REQUIREMENTS.md promotion model).

## les-0005 - Write the need before building the tool
A tool built before its need is written down takes its scope from the
material at hand instead of from the need. A complete 24MB browser for the
entire EPF practices library was built in one day, while the underlying
need - roughly five templates; 125 lines actually harvested to date - was
never recorded with success criteria.
Provenance: visual-efp-open-up, 2026-06-21; measured in the 2026-07-03
complexity review (reviews/).
Hardening: the need and its success criteria are written in an artifact
before any tool is built; tool scope answers the need, not the material.
First test: the deterministic checklist evaluator (REQUIREMENTS.md R13)
gets a written need before it gets code.
