# Complexity review — the first two methodology attempts (2026-07-03)

> **What this is:** the dated record of the analysis that triggered the
> requirements-first rebuild: what the two example repos actually contained,
> the pattern across four prior efforts, the design alternatives considered
> and rejected on the way to GLOSSARY.md, and a watch list for the rebuild.
> What it is not: process. Conclusions live in GLOSSARY.md and
> REQUIREMENTS.md; this is the evidence and reasoning behind them.

## 1. What the two example repos contained

Measured by full reads on 2026-07-03.

| | agent-method (first attempt) | visual-efp-open-up |
|---|---|---|
| Built in | ~2 sessions, Jun 11–20 | 1 day, Jun 21 (15 commits, 3 PRs) |
| What got built | 684 lines of markdown, zero code, no CI | Complete working EPF-library browser: 24MB, 719 XMI files → 3.5MB graph (900 nodes / 1,559 edges), viewer with plugin dependency resolution |
| Where the effort went | The method's machinery: 2 document states, 3 gate-item kinds, ~17 frontmatter fields, 15+ standing rules, 2 maturity ladders, a two-plane architecture with a planned reconciler | Tooling for browsing method source material |
| Meta share | **61%** of all lines were process-about-the-process; the one product artifact (vision, 119 lines) was 17% | The tool is polished and complete — but the method content it served came to **125 harvested lines**, 1 of ~20 available templates, copied by hand before the tool existed |
| First contact with reality | The first gate — 16 items for the 119-line vision — **never ran** in the three weeks after it was defined | Shipped and self-verified the same day — *as software*. As a method step, the harvested library was never used for its purpose |
| The tell | Standing docs (HANDOFF/README/plan) went stale within days of the stakeholder's Jun 20 edits — the repo reproduced the exact self-certified-staleness failure it was designed to prevent | The need (~5 templates) was never written down with success criteria, so the source archive set the tool's scope |

Now lessons les-0004 and les-0005 in LESSONS.md.

## 2. The pattern across four efforts

| Effort | What it was | The step that never ran |
|---|---|---|
| k8s-platform (May 2 – Jun 9) | Real platform, no method up front: 722 commits, 214 PRs, 38 days, 16 overnight runs | A clean build from committed source |
| software-factory (spring) | Methodology synthesis: ten candidates with designed falsifier experiments, ~3.2MB of prose | The experiments |
| agent-method (Jun 11–20) | Method meta-system design | Its own first gate |
| visual-efp-open-up (Jun 21) | Method-library tooling | Consuming the harvested library |

**The one pattern** (interpretation, not measurement): in all four, the missing
step is the same one — *verify the real thing against stated intent*.
Everything upstream of that step flourished; meta-output was always available
as a substitute for it. Whatever the methodology becomes, its job is to make
that loop close small and often.

Two findings from the k8s-platform forensics carry design weight here:

- The natural experiment, quoted from the forensic record: **"mechanical
  enforcement (hooks, lints, CI gates) ended every bug class it was applied
  to; prose rules ended none."** The rulebook grew ~240 → ~1,350 lines while
  its target behaviors kept recurring; the final rule was violated within
  minutes by the agent that wrote it. (Behind REQUIREMENTS.md R13/R15/R19.)
- The k8s-platform June-10 restructure — 748-line rulebook replaced by a
  ~140-line operating agreement, mechanical rules converted to CI checks,
  lessons distilled into a register, backlog frozen — independently converged
  on the same remedy shape as this rebuild. Two post-mortems, same shape.

The four k8s-platform traps map onto the candidate requirements: the agent
grading its own homework → R8/R9/R15; code written as if the ephemeral
account were durable → R4; specs that hand-waved the seams ("After apply,
ArgoCD takes over" as an entire boundary spec) → R6; more-instructions as the
remedy of choice → R19/R20.

## 3. Alternatives considered and rejected (for the methodology itself)

| Decision | Rejected alternative | Why rejected |
|---|---|---|
| Requirements first, then vocabulary, then design | A "minimal method" designed directly (one page, use-cases-only, file layouts fixed) — proposed and discarded in this session | It restricted the artifact universe below usability (nowhere for objectives, alternatives, constraints, done-ness) while fixing *implementation* details early — deciding how before what. Framework expressiveness and content minimalism got conflated |
| Checklist status as the only status concept | A separate "metrics" concept | Two concepts where one suffices; "the checklist status of X" is unambiguous and preserves the only thing metrics were for — status that cannot be asserted |
| Readiness = named checklists per purpose | A maturity ladder with defined states and transitions | State machines invite machinery; a named checklist ("ready-to-implement-against") says who is waiting and needs no transition rules |
| All change enters through the owning artifact and ripples | A "feedback"/"acceptance" channel | Feedback that lands downstream (or in chat, or in a head) destroys or hides intent and makes upstream artifacts lie — the spec-level version of k8s-platform's hand-patched environment. "Acceptance" survives only as one permanently judged root item: "this is still what I want" |
| "Checklist" as the term | "Rule" | Rule implies always-true invariants; checklists are satisfied or not, assessed when something waits on them |
| "Implementation" as the category | "Build" | Noun/verb ambiguity |
| Checker independence as a capability constraint | "The checker must be human" | Independence (checker ≠ author) plus unambiguous items is the real requirement; assignment stays experimental (glossary "Role") |
| Judged items as externalization bookmarks, economics attached | Drive judged items to zero | Fully specifying taste is its own rabbit hole; only *rework-causing* judgment earns externalization |

## 4. Watch list for the rebuild (prediction, not observation)

| Failure mode | Early warning | Countermeasure already in place |
|---|---|---|
| Meta-work is the only work | Sessions produce only methodology artifacts | Pilot selection is HANDOFF's top action; method design waits for promoted requirements |
| Polishing the glossary/register instead of using them | Edits to GLOSSARY/REQUIREMENTS with no project artifact in between | After promotion, changes need a live rub from the pilot |
| Anticipation dressed as need | A candidate promoted without a concrete project moment or post-mortem citation | The register's mandatory source column |
| Self-certified pass | A status asserted without recorded item answers | R8/R9/R13: evidence, computed status, deterministic evaluation early |
| Tooling relapse | Method tooling beyond the R13 evaluator before the pilot exists | R20; les-0005's hardening (written need before code) |
| Scope churn (the software-factory shape) | The pilot's upstream artifacts rewritten repeatedly instead of built against | Root-cause routing makes churn visible as ripple; watch ripple frequency |
| Silent bypass | Project work that never touches artifacts or checklists | Note "didn't fit" moments in HANDOFF; three of them force a conversation |

## 5. Epistemic status

Section 1 is measured (full reads of both repos). Section 2's table rows are
measured or quoted from the k8s-platform forensics and software-factory's own
README; the "one pattern" is interpretation. Section 3 records joint decisions
from the 2026-07-03 design conversation. Section 4 is prediction.
