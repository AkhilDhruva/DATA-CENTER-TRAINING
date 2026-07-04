# 03 — Data Center Upskilling: 3-Program Curriculum Map

**The suite.** Three stackable programs that take a learner from "new on the floor" to "trusted on a 24×7 shift." They share one spec source ([[01_DC_Spec-Library_SME-Source]]), one guide persona (Dana Okafor, Critical Facilities Lead), and one design system — so they read as a *program*, not three one-offs. The middle program is built to full depth as the flagship ([[02_Flagship_Rack-to-Runtime_Rise-Build-Pack]]); the other two are designed and ready to build.

> **Why a suite of three, with one built deep?** The 2026 instructional-design hiring bar rewards **fewer, deeper, interactive, AI-accelerated** portfolio pieces over many shallow ones. So the portfolio shows *breadth of curriculum architecture* (this map) **and** *depth of execution* (the flagship + the 3D asset) — the exact combination a hiring manager screens for.

---

## The learner journey (how the three ladder)

```
 P1  OPERATE THE ENVIRONMENT        P2  RACK TO RUNTIME (FLAGSHIP)     P3  DEFEND THE UPTIME
 "What a data center is and          "Install, commission & bring       "Run the 24×7 floor: monitor,
  the rules that keep it alive"       one rack to live"                  triage, escalate, hand off"
 ───────────────────────────        ──────────────────────────         ─────────────────────────
 • Critical-environment mindset      • Read the engineered package      • Monitoring (DCIM/BMS/EPMS)
 • Tiers & availability math         • Install MOP (dock→mounted)       • Severity triage P1–P4
 • ASHRAE thermal + airflow          • Power: A/B feeds, N+1/2N         • Escalation matrix / RACI
 • SOP / MOP / EOP — the rules       • Airflow: blanking, containment   • EOPs under pressure
 • Safety & Line of Fire awareness   • Commissioning go/no-go (sim)     • Shift handover (follow-the-sun)
                                      • First-night alarm (scenario) ───┘ deep-dives P3
       Foundations  ──────────────►  Hands-on procedure  ────────────►  Operational judgment
        (Understand)                  (Apply / Evaluate)                  (Apply / Evaluate)
```

Each program ends where the next begins: P1 teaches the *rules* the P2 MOP enforces; P2's first-night alarm is the *hook* into P3's full escalation discipline.

---

## Program 1 — "Operate the Environment" (Foundations)

| Field | Value |
|---|---|
| **Goal** | Build the critical-environment mindset and vocabulary so a new hire is safe and useful on day one. |
| **Audience** | New entrants / career-changers. |
| **Length** | ~35 min, Rise self-paced. |
| **Terminal objective** | Explain how a data center stays available and apply the basic environmental + procedural rules (thermal, airflow, SOP/MOP/EOP) to routine floor situations. |

**Lessons & objectives (Bloom):**

1. **What a data center is** — load, white space, the "critical load." *(Understand)*
2. **Availability & Tiers** — Tier I–IV vs. TIA-942 Rated 1–4; the downtime math (99.982% ≈ 1.6 h/yr; "five nines" ≈ 5.26 min). *(Understand)* → KC: match tier→redundancy.
3. **Thermal & airflow** — ASHRAE recommended 18–27 °C; hot/cold aisle; why blanking matters. *(Apply)* → KC.
4. **The rulebook: SOP / MOP / EOP** — what each is, when each governs, why they exist (human-error reduction). *(Understand/Apply)* → Scenario: "which document do you reach for?"
5. **Safety & Line of Fire awareness** — PPE, escorted live-electrical, stop-work authority. *(Apply)* → KC.

**Signature interaction:** a *"spot the airflow leak"* labeled-graphic using a 2D still of the **RACK-3D-01** model (open U, missing blanking).
**Assessment:** 6-item quiz (Magic Quiz Import), pass 80%.

---

## Program 2 — "Rack to Runtime" (FLAGSHIP — built)

Fully specified in **[[02_Flagship_Rack-to-Runtime_Rise-Build-Pack]]**: block-by-block copy, two branching scenarios (commissioning go/no-go + first-night escalation), Magic Quiz import, the interactive **3D 42U rack**, accessibility, and a Rise build runbook.

| Field | Value |
|---|---|
| **Goal** | Install, commission, and bring a rack to live 24×7 status against the engineered package. |
| **Audience** | New techs → working techs. |
| **Length** | ~40–45 min; embedded Storyline scored sim. |
| **Touches all 3 requested areas** | rack specs · install MOP (modus operandi) · 24×7 escalation. |

---

## Program 3 — "Defend the Uptime" (24×7 Operations & Escalation)

| Field | Value |
|---|---|
| **Goal** | Run a live shift: read the monitoring, triage by severity, escalate correctly, execute EOPs, and hand off cleanly. |
| **Audience** | Working techs / NOC / shift operators. |
| **Length** | ~40 min, Rise + embedded Storyline triage sim. |
| **Terminal objective** | During a 24×7 shift, triage incoming alarms to the correct severity, escalate per the matrix within the response window, run the matching EOP, and complete a clean shift handover — no missed P1, no skipped escalation. |

**Lessons & objectives (Bloom):**

1. **The floor you're defending** — DCIM / BMS / EPMS; what the NOC actually watches (power, thermal, security). *(Understand)*
2. **Severity triage** — P1–P4: impact × urgency; 24×7 vs. 8×5 coverage; P1 = critical-load at risk. *(Apply)* → Scenario: triage a queue of 4 alarms.
3. **The escalation matrix & RACI** — who gets paged, when, and the time-boxed no-response window ("no ambiguity at 2 a.m."). *(Apply/Evaluate)* → scored Storyline sim.
4. **EOPs under pressure** — get to safe state → restore redundancy → isolate the fault; loss-of-A-feed worked example. *(Apply)*
5. **Metrics & handover** — MTTA / MTTR / MTBF; follow-the-sun handoff; the post-incident review. *(Understand/Apply)* → KC.

**Signature interaction:** a *"2 a.m. pager"* scored triage sim (Storyline embed) — alarms arrive on a timer; learner sets severity and escalates; score tracks **missed-P1**, **escalation-latency**, **correct-EOP**.
**Assessment:** 6-item quiz + the scored sim; pass = 80% + zero missed P1.

---

## Shared design system (what makes it one program)

| Element | Standard across all 3 |
|---|---|
| **Spec source** | [[01_DC_Spec-Library_SME-Source]] — every number traces here; no paraphrased spec wording. |
| **Guide** | Dana Okafor, Critical Facilities Lead — same voice, same "measure against the package" ethic. |
| **Model** | ADDIE backbone, SAM iteration; Gagné sequence per lesson; Mayer multimedia rules. |
| **Interactivity** | Native Rise for content + knowledge checks + branching scenarios; Storyline embed only where *scoring/variables* exceed Rise. |
| **Assessment** | Bloom-aligned; Magic Quiz Import (verbatim) for spec/safety items; per-question feedback tied to the spec + consequence. |
| **Accessibility** | WCAG 2.1 AA by construction — real-text data, alt text, captions, keyboard + visible focus, text+icon (never color alone), reduced-motion. |
| **Assets** | One locked visual style; the interactive 3D rack reused across P1/P2; full specs in [[04_3D-and-Visual-Asset-Specs]]. |
| **Delivery** | SCORM 1.2 / xAPI to the LMS; SME (Critical Facilities) sign-off gate before any production release. |

---

## Build status & next actions

| Program | Design | Build-pack | Built artifacts | Next action |
|---|---|---|---|---|
| P1 Operate the Environment | ✔ mapped | outline (this file) | reuses 3D rack still | expand to full block-by-block pack |
| **P2 Rack to Runtime** | ✔ | **✔ full ([[02_Flagship_Rack-to-Runtime_Rise-Build-Pack]])** | **✔ 3D rack, scenarios, quiz** | assemble in Rise; build Storyline sim |
| P3 Defend the Uptime | ✔ mapped | outline (this file) | triage-sim spec drafted | expand to full pack; build triage sim |

*Sources: market & hiring rationale from [[01_DC_Spec-Library_SME-Source]] sources + the 2026 ID portfolio research (see [[00_START-HERE_Recruiter-Brief]]). Pedagogy conventions from the Articulate Engine KB ([[00_PLAN_OF_ACTION]], [[04_GagnesNineEvents]], [[14_ScenarioBasedLearning]]).*
