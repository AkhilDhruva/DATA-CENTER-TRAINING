# 01 — Data Center Spec Library (SME Source of Truth)

**Purpose.** This is the *extracted, cited* technical backbone for all three upskilling programs. Every number a course states traces back to a line here, and every line here traces back to a published standard or vendor spec. It is the "crawl-and-extract" deliverable: the facts get locked **once**, then the courseware quotes them verbatim — no AI-paraphrased technical wording in regulated/spec content.

> **How the engine uses this file.** Per [[00_PLAN_OF_ACTION]] §4 (gap analysis) and the SC-12 run ([[22_SC-12_EndToEnd_Walkthrough]]), the Course AST pulls on-screen data (rack U height, ASHRAE setpoint, P1 SLA) directly from this table. If a course slide states a number that isn't here, that's a `[BLOCKER]` gap → fix the slide or add the cited spec.

**SME-verify flag.** Standards get revised. Re-confirm against the current edition before publish: EIA-310-D, ANSI/TIA-942-C (May 2024), ASHRAE TC9.9 Thermal Guidelines (5th ed.), Uptime Tier Standard, and the relevant NVIDIA/OEM rack spec for any density claim.

---

## A. Rack mechanical standard — EIA-310-D / IEC 60297

| Spec | Value | Notes |
|---|---|---|
| **Rack Unit (1U)** | **1.75 in = 44.45 mm** | Fundamental vertical pitch. Everything mounts in whole-U increments. |
| **Front-panel / mounting width** | **19 in = 482.6 mm** | The "19-inch rack." Posts 0.625 in (15.88 mm) each; gap 17.75 in (450.85 mm). |
| **Rack opening (min)** | **17.72 in ≈ 450 mm** | Usable equipment width between rails. |
| **Horizontal hole spacing** | **18.312 in = 465.1 mm** | Center-to-center of the two vertical mounting-hole rows. |
| **Vertical hole pattern (per U)** | **1/2″ – 5/8″ – 5/8″, repeating** | "U" boundary sits at the middle of the 1/2″-spaced holes. |
| **Hole types** | Round (tapped, e.g. 10-32/12-24) or **square (cage-nut)** | Square-hole + cage nuts is the data-center default. |

**Common heights & geometry**

| Height | Usable vertical | Where used |
|---|---|---|
| 24U | 42.0 in / 1067 mm | Wall/edge, branch rooms |
| **42U** | **73.5 in / 1867 mm** | **The data-center default cabinet** |
| 45U / 48U | 78.75 in / 84.0 in | High-density / tall-ceiling halls |
| 52U+ | 91.0 in+ | Hyperscale, max U per floor tile |

| Dimension | Typical range | Default |
|---|---|---|
| **Depth** | 600 / 750 / 1000 / 1070 / 1200 mm | **1000–1200 mm** in modern halls (deep servers + cable mgmt) |
| **External width** | 600 mm (24 in) standard; 800 mm wide for cabling | TIA-942-C: MDA/IDA/HDA cabinets **≥ 800 mm** wide |
| **Static (stationary) load** | 900–2000 kg | e.g. **1588 kg / 3500 lb** (Tripp Lite/Eaton SR42UB class) |
| **Rolling (dynamic) load** | ~1000 kg | e.g. **1022 kg / 2250 lb** |

> **Open Compute Project (OCP) Open Rack** is the hyperscale exception: **21-inch** equipment width, **OpenU (OU) = 48 mm** pitch, busbar power distribution — *not* EIA-310. Call it out so learners don't mis-measure OCP gear with a 19″ mental model.

---

## B. Power chain & rack density

| Item | Spec / value | Notes |
|---|---|---|
| **US rack voltage** | 120 V / **208 V** (single/3-phase); **415 V** 3-phase (→ 240 V to IT) | Higher voltage = lower current = thinner copper, less loss. |
| **Redundancy: power feed** | **A + B feeds** to dual rPDUs | Each IT box has dual PSUs, one per feed. |
| **Redundancy models** | **N** (no spare), **N+1** (one spare unit), **2N** (fully mirrored), **2N+1** | Maps to tiers (§D). |
| **Traditional rack density** | **6–15 kW** (air-cooled, optimized 8–12 kW) | The "normal" enterprise rack. |
| **AI / GPU rack density (2026)** | **120–132 kW** (e.g. NVIDIA GB200 NVL72) | Air cooling has no answer here → liquid. |
| **Next-gen density (2026–27)** | **250–500+ kW** (Rubin-class; Vera Rubin NVL72 > 200 kW, fanless) | Drives direct-to-chip & immersion. |
| **PUE (Power Usage Effectiveness)** | Ideal → 1.0; good air ~1.3–1.5; **two-phase immersion 1.01–1.03** | Total facility power ÷ IT power. |

**Cooling method vs. density (2026)**

| Method | Density band | Note |
|---|---|---|
| Air (raised-floor / CRAC-CRAH) | up to ~12–15 kW/rack | Hot/cold aisle + containment required above ~5 kW. |
| Rear-door heat exchanger | up to ~40–60 kW | Air-assist, retrofit-friendly. |
| **Direct-to-chip liquid** | ~100–175 kW | Cold plates on CPU/GPU. |
| **Immersion (single/two-phase)** | 150–250+ kW | Best PUE; whole-server in dielectric fluid. |

---

## C. Thermal envelope — ASHRAE TC9.9 (Thermal Guidelines, 5th ed.)

| Envelope | Temp (server inlet) | Use |
|---|---|---|
| **Recommended** | **18–27 °C (64.4–80.6 °F)** | Target band for reliability + efficiency. |
| Allowable **A1** | 15–32 °C (59–89.6 °F) | Enterprise servers (tightest). |
| Allowable **A2** | 10–35 °C (50–95 °F) | Volume servers. |
| Allowable **A3** | 5–40 °C (41–104 °F) | Extended-temp. |
| Allowable **A4** | 5–45 °C (41–113 °F) | Max flexibility. |

**Humidity (recommended):** dew point **−9 °C to 15 °C**, **≤ 60% RH**. Allowable min = higher of −12 °C DP and 8% RH; max RH 80% (A1/A2) → 90% (A4).

**Airflow management (the operator's daily job):**
- **Hot-aisle / cold-aisle**: cabinets row up with cold intakes facing the cold aisle, hot exhaust to the hot aisle.
- **Containment** (hot or cold aisle fully enclosed) cuts mixing → **up to ~30% cooling-energy savings.**
- **Blanking panels** fill every empty U so hot exhaust can't recirculate to the intake. *No empty U left open.* This is the single most-cited "free win" in air-cooled halls.

> **Allowable ≠ Recommended.** Allowable envelopes are manufacturer *warranty* limits; sustained operation there can shorten equipment life or raise energy use. Teach learners to run to **Recommended** and treat Allowable as a short-term ceiling.

---

## D. Availability & resilience — Uptime Institute Tiers vs. ANSI/TIA-942-C

| Level | Uptime name | Availability | Max downtime/yr | Topology |
|---|---|---|---|---|
| **Tier I / Rated 1** | Basic Capacity | 99.671% | ~28.8 h | Single path, **N** |
| **Tier II / Rated 2** | Redundant Capacity | 99.741% | ~22 h | Single path, **N+1** components |
| **Tier III / Rated 3** | **Concurrently Maintainable** | 99.982% | ~1.6 h | **Dual path** (1 active/1 available), N+1 — *maintain anything with zero downtime* |
| **Tier IV / Rated 4** | **Fault Tolerant** | 99.995% | ~26.3 min | **2N / 2N+1**, dual active paths — *survives any single failure* |

- **"Five nines" (99.999%)** = **~5.26 min/yr** downtime — a marketing/SLA term, above Tier IV's certified 99.995%.
- **Uptime Tier** certifies *design + facility operations*; **TIA-942** is a telecom-infrastructure *standard* (construction, cabling, fire, security) using a parallel Rated 1–4 scale. They're complementary, not interchangeable.

**TIA-942-C (May 2024) functional areas (cabling topology):**
Entrance Room (ER) → **Main Distribution Area (MDA)** → Horizontal Distribution Area (HDA) → *Zone Distribution Area (ZDA, optional)* → **Equipment Distribution Area (EDA)** = the cabinet/rack. Recognized media: OS2 single-mode fiber, OM3/OM4/OM5 multimode, **Cat 6A+** copper.

---

## E. Operations documents — the "modus operandi" (SOP / MOP / EOP)

| Doc | What it is | Scope | Example |
|---|---|---|---|
| **SOP** — Standard Operating Procedure | High-level framework / policy: *what* must be done and the rules to stay consistent. The umbrella that governs change in normal ops. | Program-level | "Critical-load change-management policy." |
| **MOP** — Method of Procedure | Detailed, **step-by-step** script for any task that can touch the critical load. Eliminates ambiguity at execution. Often several MOPs sit under one SOP. | Task-level | "Install + power on Rack R-14, A/B feeds." |
| **EOP** — Emergency Operating Procedure | Pre-written response to a predicted/known failure mode: **get to a safe state, restore redundancy, isolate the fault.** | Incident-level | "Loss of A-feed to Row 4." |

**Supporting concepts:** Change/Risk classification (Level 1–3), back-out plan in every MOP, peer review + approval before execution, "human-error reduction" is the *reason* these exist (most data-center incidents are procedural, not equipment).

---

## F. 24×7 runtime, monitoring & escalation (NOC / ITIL)

**Severity & SLA (ITIL-style P-scale):**

| Priority | Meaning | Coverage | Response target* | Path |
|---|---|---|---|---|
| **P1** | Critical — outage / critical-load at risk | **24×7, clock never stops** | Immediate (minutes) | Page on-call + incident commander |
| **P2** | High — major degradation, redundancy lost | **24×7** | Minutes–1 hr | On-call engineer |
| **P3** | Moderate — limited impact | 8×5 (pauses nights/weekends) | Hours–days | Queue / next business day |
| **P4** | Low — cosmetic / informational | 8×5 | Days | Backlog |

\*Targets are illustrative; the SLA contract sets the real numbers.

**Key metrics:**
- **MTTA** — Mean Time To Acknowledge (alarm → human owns it).
- **MTTR** — Mean Time To Resolve (alarm → restored).
- **MTBF** — Mean Time Between Failures.
- **Alert volume / escalation rate** — health of the monitoring tuning.

**Escalation discipline:**
- A **RACI matrix** is set at onboarding so there's *"no ambiguity at 2 a.m. when an incident pages"* — who's Responsible, Accountable, Consulted, Informed.
- Escalate when an incident **exceeds the NOC's authority or technical scope** → defined on-call engineer, then management, with **time-boxed no-response windows** (e.g., no ack in 15 min → escalate up).
- **Follow-the-sun** hand-offs keep a live owner across time zones; every shift change passes an explicit handover.
- DCIM/BMS + EPMS feed the NOC: environmental (ASHRAE breaches), power (feed loss), and security alarms all route through the same severity triage.

---

## Sources

- 19-inch rack / EIA-310-D dimensions: [RackSolutions](https://www.racksolutions.com/news/data-center-optimization/eia-310-definition/), [NavePoint EIA-310-D](https://navepoint.com/blog/what-is-eia310d/), [19-inch rack — Wikipedia](https://en.wikipedia.org/wiki/19-inch_rack), [Insitect EIA-310-D guide](https://insitect.com/19-inch-server-rack-standard-complete-eia-310-d-guide.html)
- 42U dimensions / depth / load / containment / blanking: [Lianjie rack sizes 2026](https://www.lianjer.com/server-rack-sizes-dimensions/), [Tripp Lite/Eaton SR42UB spec](https://tripplite.eaton.com/42u-smartrack-standard-depth-server-rack-enclosure-cabinet-doors-side-panels~SR42UB), [Eziblank cold-aisle containment](https://www.eziblank.com/data-center/cold-aisle-containment/), [DataSpan blanking panels](https://dataspan.com/blog/blanking-panels-why-your-server-racks-need-them/)
- Uptime Tiers: [Uptime Institute Tiers](https://uptimeinstitute.com/tiers), [Uptime Institute Tier classification (2021 update)](https://journal.uptimeinstitute.com/explaining-uptime-institutes-tier-classification-system/), [CoreSite tiers](https://www.coresite.com/blog/breaking-down-data-center-tiers-classifications)
- TIA-942-C: [TIA Online ANSI/TIA-942](https://tiaonline.org/products-and-services/tia942certification/ansi-tia-942-standard/), [TIA-942-C overview](https://thenetworkinstallers.com/blog/ansi-tia-942-c-standard/), [TIA-942 — Wikipedia](https://en.wikipedia.org/wiki/TIA-942)
- ASHRAE TC9.9: [CKY ASHRAE TC9.9 5th ed.](https://www.cky.com.tw/en/insights/ashrae-tc9-datacenter-thermal-guidelines), [Upsite recommended vs allowable](https://www.upsite.com/blog/what-is-the-difference-between-ashraes-recommended-and-allowable-data-center-environmental-limits-part-4/), [ASHRAE 2011 thermal guidelines (PDF)](https://airatwork.com/wp-content/uploads/ASHRAETC99.pdf)
- Rack power density / liquid cooling 2026: [Introl 100kW+ racks](https://introl.com/blog/high-density-racks-100kw-ai-data-center-ocp-2025), [Network World AI rack densities](https://www.networkworld.com/article/4149069/why-ai-rack-densities-make-liquid-cooling-nonnegotiable.html), [CoreSite liquid cooling](https://www.coresite.com/blog/liquid-cooling-steps-up-for-high-density-racks-and-ai-workloads)
- SOP / MOP / EOP: [Vitralogy SOP vs MOP](https://vitralogy.com/blog/what-is-the-difference-between-an-sop-and-a-method-of-procedure-mop/), [Uptime Institute — making a good MOP](https://journal.uptimeinstitute.com/the-making-of-a-good-method-of-procedure/), [Schneider Electric reports & procedures](https://blog.se.com/datacenter/architecture/2012/08/28/reports-and-procedures-crucial-elements-in-reducing-human-error-in-data-center-operations/)
- NOC / escalation / SLA: [Rootly P1/P2/P3](https://rootly.com/incident-response/support-levels), [INOC NOC service-level reporting](https://www.inoc.com/blog/noc-reporting), [Giva incident severity levels](https://www.givainc.com/blog/incident-severity-levels/), [PDCA ITIL priority matrix](https://pdcaconsulting.com/itil-priority-matrix-templates-incident-problem-request/)
