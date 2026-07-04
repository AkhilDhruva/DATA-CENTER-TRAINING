# Technical Instructional Designer — Data Center Upskilling
### Portfolio case study · Aki

> **The one-line pitch.** I design technical e-learning that takes a new hire from "never been on the floor" to "trusted on a 24×7 shift" — grounded in real standards (EIA-310-D, ASHRAE TC9.9, Uptime/TIA-942-C, ITIL), built in Storyline 360 / Rise 360, and accelerated with an AI production pipeline and a custom interactive 3D asset.

**For the recruiter in 60 seconds:** this folder is one deep, finished portfolio piece — a three-program data-center upskilling **suite**, with the middle program built to full production depth and an **interactive 3D rack** you can open in a browser right now. It shows I can (1) command technical subject matter, (2) run the full ID process, (3) build in the industry-standard tools, and (4) work fast with modern AI + interactive media. Start with the flagship and the 3D file; everything else is the scaffolding behind them.

---

## The problem I designed for

The AI build-out has created one of the strongest structural skills shortages in any US sector. From the market research grounding this project:

- A projected **140,000+ skilled-worker gap by 2030** in data center operations, as experienced technicians retire faster than new ones are trained (Johnson Controls, via Data Center Knowledge).
- US data center construction growing from **$48.18B (2024) to $112.33B (2030)** — a 15.15% CAGR (Arizton).
- Nearly **half of operators (46%)** report difficulty finding qualified candidates (Uptime Institute Global Data Center Survey).

The bottleneck isn't hardware — it's **trained people**. And the fastest-to-scale layer of that training is exactly the *knowledge/procedure* layer that great e-learning owns: how a facility stays available, how to install and commission to spec, how to triage and escalate at 2 a.m. That's the gap this portfolio targets.

---

## What I built

A stackable, three-program upskilling suite (full map: [[03_Program-Suite_Curriculum-Map]]):

| # | Program | Outcome | Depth in this package |
|---|---|---|---|
| **P1** | **Operate the Environment** | New hire is safe & useful on day one (Tiers, ASHRAE, SOP/MOP/EOP, safety) | designed + outlined |
| **P2** | **Rack to Runtime** ⭐ | Install, commission & bring a rack to live 24×7 status | **fully built ([[02_Flagship_Rack-to-Runtime_Rise-Build-Pack]])** |
| **P3** | **Defend the Uptime** | Run a live shift: monitor, triage P1–P4, escalate, hand off | designed + outlined |

The flagship **P2 "Rack to Runtime"** deliberately touches all three things a data-center employer cares about in one learner journey — **rack technical specs**, the **install MOP (the floor's "modus operandi")**, and **24×7 runtime escalation** — through one technician's first rack, dock to live. It includes block-by-block course copy, two branching decision scenarios (a scored commissioning go/no-go and a first-night alarm), a verbatim quiz, accessibility build, and a Rise assembly runbook.

**The interactive 3D asset** (`DC_42U-Rack_Interactive-3D.html`) is the showpiece: a rotatable, clickable 42U rack with Power and Airflow views, built to EIA-310-D dimensions. Open it in any browser; embed it in Rise as a web object.

---

## How I designed it (the process a hiring manager screens for)

| Discipline | What I applied |
|---|---|
| **Analysis & architecture** | ADDIE backbone + SAM iteration; a 3-program ladder where each course's exit is the next one's entry. |
| **Objectives** | Bloom-tagged terminal + enabling objectives; **every objective maps to an assessment item** (no orphan content, no unassessed objective). |
| **Active learning** | Scenario-based, productive-failure design — wrong choices show honest consequences and route back; calling a hold/Stop *scores as a win*. |
| **Subject-matter rigor** | A cited **spec library** ([[01_DC_Spec-Library_SME-Source]]) is the single source of truth; safety/spec wording stays verbatim, never AI-paraphrased; SME sign-off is a gate. |
| **Multimedia** | Mayer principles — narration complements on-screen text, one idea per screen, signal the critical number. |
| **Accessibility** | WCAG 2.1 AA built in — real-text data, alt text, captions, keyboard + visible focus, text+icon (never color alone), reduced-motion. |
| **Assessment & data** | Knowledge checks + scored sims; SCORM 1.2 / xAPI to the LMS; sims track meaningful metrics (missed-P1, escalation latency, clean commission). |

---

## Tools & modern edge

**Authoring:** Articulate **Storyline 360** (scored sims, variables, branching) + **Rise 360** (responsive content, native scenarios, knowledge checks). **Standards:** SCORM 1.2 / xAPI / LMS delivery. **Interactive 3D:** Three.js. **Production:** an AI-assisted pipeline (the "Articulate Engine" in this project) that turns sources into import-ready Rise/Storyline build packs — locking facts once, then projecting storyboard, scenarios, quiz bank, and asset specs.

This matters because the **2026 ID hiring bar** explicitly rewards it: industry guidance is that competitive portfolios now feature **fewer, deeper projects** and that candidates who show **AI-enabled and interactive** work see stronger outcomes and higher-level roles. This package is built to that bar on purpose — one deep, interactive, AI-accelerated flagship rather than a pile of thin samples.

---

## Outcomes this is designed to move

Framed as the business case I'd bring to a stakeholder (targets to validate in pilot):

- **Faster time-to-competency** — a standardized install/commission path replaces shadowing, shrinking ramp time for new techs.
- **Fewer procedural incidents** — most data-center incidents are procedural, not equipment; scenario practice on MOP hold points and escalation triage attacks that directly.
- **Cleaner audits & onboarding** — consistent, SME-verified, accessible content with LMS-tracked completion and assessment data.

---

## What's in this folder

| File | What it is |
|---|---|
| `00_START-HERE_Recruiter-Brief.md` | **This file** — the case study & positioning. |
| `01_DC_Spec-Library_SME-Source.md` | Cited technical source of truth (racks, tiers, thermal, power, ops, escalation). |
| `02_Flagship_Rack-to-Runtime_Rise-Build-Pack.md` | The fully-built flagship course (copy, scenarios, quiz, runbook). |
| `03_Program-Suite_Curriculum-Map.md` | The 3-program suite and how it ladders. |
| `04_3D-and-Visual-Asset-Specs.md` | Production specs for every 3D/visual asset. |
| `DC_42U-Rack_Interactive-3D.html` | **The interactive 3D rack — open this.** |

---

*Recommended review path for a recruiter: this brief → open the 3D rack → skim the flagship build pack §2–§3 (the actual course copy + scenarios) → glance at the spec library to see the technical grounding.*

**Sources:** market figures from the project research report (`compass_artifact`, citing Johnson Controls / Data Center Knowledge, Arizton, Uptime Institute). 2026 ID hiring & portfolio guidance: [Devlin Peck — How to Become an Instructional Designer in 2026](https://www.devlinpeck.com/content/how-to-become-instructional-designer), [Instructional Designer Resume Keywords 2026 — ResumeAdapter](https://www.resumeadapter.com/blog/instructional-designer-resume-keywords). Technical specifications cited inline in [[01_DC_Spec-Library_SME-Source]].
