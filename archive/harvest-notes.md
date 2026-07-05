# Harvest notes - EPF/OpenUP sources and findings
Session knowledge decanted 2026-06-12. Sources are re-downloadable; findings are not.

## Sources (Internet Archive item: epf-2021-11-26)
| What | URL path | Use |
|---|---|---|
| EPF Practices library 1.5.1.5 (XMI) | Libraries/epf_practices_library_1.5.1.5_20121212.zip | CANONICAL harvest source |
| OpenUP library 1.0 (XMI, monolithic) | Libraries/OpenUP_library_1.0_20070801.zip | reference only (pre-refactor) |
| Scrum library 1.5 (XMI) | Libraries/scrum_library_1.5_20080820.zip | standalone sibling method |
| XP library 0.1 (XMI) | Libraries/XP_library_0.1_20070724.zip | standalone sibling method |
| Practices published site (HTML) | Published Websites/epf_practices_published_1.5.1.5_20121212.zip | human reading; contains OpenUP/DSDM hybrid publish |

Base: https://archive.org/download/epf-2021-11-26/

## Element counts (measured)
Practices 1.5.1.5 XMI: 83 tasks, 55 workproducts, 26 roles, 20 checklists,
20 templates, 84 guidelines, 65 concepts, 108 terms, 56 capabilitypatterns,
10 deliveryprocesses, 54 plugins (719 xmi files).
Published openup/ tree (stock layer): 17 tasks (98 steps), 15 checklists
(100 check items), 83 workproducts, 32 roles, 32 true activities (of 160
capability-pattern pages), 11 templates, 9 worked examples (ATM case study).
Scrum 1.5: 7 tasks, 6 wps, 3 roles. XP 0.1: 28 tasks, 10 wps, 6 roles.
Scrum/XP do NOT reference OpenUP - composition would be via UMA variability
(contribute/extend/replace + configurations); the DSDM overlay in the publish
demonstrates the mechanism.

## Format findings (why XMI is the harvest source)
- One XMI file per element; org.eclipse.epf.uma schema (epf:version 1.2.0).
- Every element AND every task step (sections) carries a stable GUID +
  changeDate + version. Node identity for harvested content is solved by
  the source.
- Cross-references embed BOTH href and target guid -> typed edge extraction
  is exact, no scraping heuristics.
- Task anatomy: keyConsiderations, sections (= steps, named, with HTML
  descriptions), relationships (performers/inputs/outputs) resolvable by guid.
- Word templates (*.dot) ARE present in the XMI library under
  guidances/templates/resources/ (missing from the publish); strings-readable.
- Published-site view files use suffixes .html_desc/_tbs/_wbs/_wpbs - dedupe
  on these for unique element counts; _wbs gives phase->activity->task
  breakdown mechanically.

## First harvest completed
core.tech.common.extend_supp: Vision template (guid -DUD2tbhBn23i6Jm6gcoN9Q),
Vision workproduct (_zHTQUKYSEdmvhNXG0Oc2uA), Vision checklist
(_qktWQMM0EdmSIPI87WLu3g, 10 items) -> method/content/, with gate
decomposition in vision.gates.yaml (4 mechanical / 7 judge / 5 human).
