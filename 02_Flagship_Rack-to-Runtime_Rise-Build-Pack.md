# FLAGSHIP — "Rack to Runtime" · Rise 360 Build Pack

**Install · Commission · Defend — the first 24×7 hours of a data center rack.**

This is the complete set of building materials to assemble in Articulate **Rise 360** *before* you open the app — block-by-block copy, scenario branching, quiz import, asset manifest, accessibility, and a build runbook. It is the data-center analog of the SC-12 "The Lift" pack ([[22_SC-12_EndToEnd_Walkthrough]]), built the same engine way: facts locked in [[01_DC_Spec-Library_SME-Source]], narration that *complements* on-screen text (Mayer, [[05_MayerMultimediaPrinciples]]), assessment aligned to every objective ([[01_BloomsTaxonomy]]), accessible by construction ([[06_Accessibility_WCAG]]).

> **Why this topic is the flagship.** It is the one course that touches all three requested areas at once — **rack technical specs**, the **install MOP (modus operandi)**, and **24×7 runtime escalation** — through one technician's first rack, dock to live. It is also the most *visual* (a 3D rack you can rotate) and the most *decision-rich* (two branching scenarios), which is exactly what a 2026 ID portfolio is rewarded for: fewer, deeper, interactive, AI-accelerated projects.

---

## 0. Course meta

| Field | Value |
|---|---|
| **Title** | Rack to Runtime: Install · Commission · Defend |
| **Modality** | Rise 360 self-paced; embedded Storyline block for the scored commissioning sim |
| **Length** | ~40–45 min |
| **Audience** | New data center technicians / install techs (entry → working tech) |
| **Guide (SME persona)** | **Dana Okafor — Critical Facilities Lead**, calm, exacting, "we measure against the package" |
| **Prereq** | Site safety induction; OSHA-10 / NFPA 70E *awareness* (live electrical work is escorted, not solo) |
| **Standards cited** | EIA-310-D · ASHRAE TC9.9 · Uptime/TIA-942-C · ITIL incident mgmt — all per [[01_DC_Spec-Library_SME-Source]] |
| **Output to LMS** | SCORM 1.2 / xAPI; pass = 80% + clean commissioning run |

### Terminal objective
Given a delivered rack and its engineered install package, the technician will **install, commission, and bring the rack to live 24×7 status** following the MOP and escalation protocol — with **zero safety incidents, zero airflow/load violations, a verified-redundant power state, and a correctly-triaged first alarm.**

### Enabling objectives (Bloom-tagged → assessment)

| EO | Objective | Bloom | Assessed by |
|---|---|---|---|
| **EO-1** | Identify the rack's controlling specs (U height, width/depth, static load, A/B power, ASHRAE inlet) from the engineered package | Understand | KC-1 + 3D-rack hotspots |
| **EO-2** | Sequence the install MOP from receiving to cabling without skipping a hold point | Apply | KC-2 (Process sort) + D1 |
| **EO-3** | Apply ASHRAE airflow rules (aisle orientation, blanking panels, containment) to a half-populated rack | Apply/Analyze | KC-3 + Q3 |
| **EO-4** | Balance dual A/B feeds and verify N+1/2N redundancy before energizing | Apply | D1 + Q2 |
| **EO-5** | Decide go/no-go at commissioning against the MOP acceptance criteria | Evaluate | D1 (scored sim) |
| **EO-6** | Triage a first-night alarm to the right severity (P1–P4) and escalate per the matrix | Apply/Evaluate | D2 + Q4 |

---

## 1. Strategy & lesson map

**Strategy:** scenario-anchored, productive-failure (honest consequences; calling a hold or a Stop = a *win*), guide-framed by Dana, Cathy-Moore action mapping (every block earns its place by moving a decision). Gagné sequence applied across the course ([[04_GagnesNineEvents]]).

```
L0  Cold open — "the 2 a.m. rack"............ gain attention / stakes
L1  Read the package — rack specs............ EO-1   [3D rack asset]
L2  The install MOP — dock to mounted........ EO-2   [Process block]
L3  Power & redundancy — A/B, N+1/2N......... EO-4
L4  Airflow & thermal — ASHRAE, blanking..... EO-3
L5  Commissioning go/no-go (scored sim)...... EO-5   [Storyline embed]
L6  The first night — triage & escalate...... EO-6   [Rise Scenario]
L7  Debrief · knowledge check · badge........ assess / transfer
```

**Rise lesson types:** L0/L1/L3/L4 = standard lessons (content + Knowledge Check); L5 = lesson with embedded Storyline (Web Object/Storyline block); L6 = lesson built from native **Scenario** blocks; L7 = **Quiz** lesson.

---

## 2. Block-by-block copy (paste-ready into Rise)

> Convention: **OST** = on-screen text (what learner reads). **VO/Dana** = narration (complements, never duplicates OST — Mayer). **Block** = the Rise block type to add. Alt text and a11y per §6.

### L0 — Cold open

**Block: Statement (large quote, full-width image behind)**
- OST: *"A rack is not 'installed' when it's bolted in. It's installed when it survives its first night."*
- VO/Dana: "I'm Dana, Critical Facilities Lead. The cabinet you're about to put in carries other people's uptime. Today we go dock to live — and we measure every move against the engineered package."

**Block: Paragraph**
- OST: By the end you'll read a rack's spec package, run the install MOP without skipping a hold point, balance its power, set its airflow, make the go/no-go call at commissioning, and handle the first alarm at 2 a.m. — the way the floor actually runs it.

**Block: Image (the 3D rack still or embed)** — see §5, links to `DC_42U-Rack_Interactive-3D.html`.

---

### L1 — Read the package (EO-1)

**Block: Paragraph**
- OST: Every install starts on paper, not on the floor. The **engineered package** tells you what "good" looks like — and everything today is measured against it.

**Block: Labeled Graphic** (the 3D rack; hotspots = the controlling specs)

| Hotspot | OST (marker label → text) |
|---|---|
| **Height** | **42U** — usable 73.5 in / 1867 mm. 1U = **1.75 in (44.45 mm)**. Plan mounting in whole-U increments. |
| **Width** | **19-in (482.6 mm)** mounting per **EIA-310-D**; cabinet often **800 mm** wide for side cable mgmt. |
| **Depth** | **1000–1200 mm** — confirm server depth + cable bend radius fit before placement. |
| **Static load** | Up to **~1588 kg (3500 lb)**. Heaviest gear mounts **low**; never exceed the package's load + U budget. |
| **Power** | **A + B feeds** to dual rPDUs; dual PSUs split across feeds. Voltage per package (often 208 V). |
| **Inlet temp** | ASHRAE **recommended 18–27 °C** at the *cold-aisle intake*. That's the number you defend. |

- VO/Dana: "Six numbers run your day: height, width, depth, load, power, and inlet temperature. Miss one on paper and you'll meet it again on the floor — usually the hard way."

**Block: Knowledge Check — Multiple Response (KC-1, EO-1)**
- Stem: From the package, which are *controlling* constraints for this rack? (Select all.)
  - ✓ Total U budget (42U) and per-device U height
  - ✓ Static load limit and weight distribution
  - ✓ A/B feed capacity and PSU split
  - ✗ The vendor's marketing model name
  - ✓ Cold-aisle inlet temperature target
- Feedback (correct): "Right — these are what the install must satisfy. The model name is just a label."

---

### L2 — The install MOP, dock to mounted (EO-2)

**Block: Paragraph**
- OST: A **MOP (Method of Procedure)** is the detailed, step-by-step script for any task that can touch the critical load. It exists to remove ambiguity — and to make sure two technicians do it the same way, every time.

**Block: Process** (one step per stop; this imports/builds cleanly as a Rise Process block)

1. **Receive & inspect** — match the asset tag to the package; check for shipping damage; photograph. *Hold point: damage → stop and report.*
2. **Stage & position** — move to the assigned floor tile/aisle position; confirm orientation (cold-aisle intake side).
3. **Level & stabilize** — level the cabinet; engage feet; install anti-tip / baying as specified.
4. **Mount rails & gear** — square-hole + cage nuts; heaviest devices low; torque to spec; **no skipped U where a blanking panel belongs.**
5. **Bond & ground** — connect the rack bonding/grounding to the common bonding network *before* energizing. *Hold point.*
6. **Power: A + B** — land A-feed and B-feed to separate rPDUs; split dual PSUs one per feed; do **not** energize IT yet.
7. **Cabling** — structured cabling to the EDA; maintain bend radius; label both ends; manage to the package.
8. **Blanking & airflow** — fill every empty U with a blanking panel; confirm aisle containment intact.
9. **Pre-energization check** — back-out plan ready; peer verification; sign the MOP step.

- VO/Dana: "Notice the hold points — receiving, grounding, pre-energization. A hold isn't lost time. It's the procedure doing its job."

**Block: Knowledge Check — Sequence/Matching (KC-2, EO-2)**
- Task: Put four steps in MOP order: *Mount gear · Bond & ground · Land A/B power · Blank empty U.*
- Correct order: Mount gear → Bond & ground → Land A/B power → Blank empty U.
- Feedback: "Ground before power, always. Blanking is part of the install — not a 'later.'"

---

### L3 — Power & redundancy (EO-4)

**Block: Paragraph**
- OST: Redundancy is a promise the rack makes: *lose one path, lose nothing.* You keep that promise by how you land and balance power.

**Block: Accordion** (definitions — static reference, accordion is the right tool here)
- **N** — exactly what the load needs, no spare.
- **N+1** — one extra unit beyond need (Tier III / Rated 3 territory).
- **2N** — two fully independent, mirrored systems (Tier IV / Rated 4).
- **A/B feeds** — two independent power paths to the rack; each IT device's dual PSUs take one each. Lose A, B carries the load.

**Block: Multimedia / Image+Text** (load-balance diagram)
- OST: **Balance the legs.** Split devices so A-feed and B-feed each carry roughly half — and so that **either feed alone stays under its breaker rating** when the other drops. An unbalanced pair that trips on failover defeats the redundancy you paid for.
- VO/Dana: "Run the math before you energize: if B fails, can A hold all of it without tripping? If the answer's 'maybe,' the answer's 'no.'"

**Block: Knowledge Check — Multiple Choice (Q2, EO-4)**
- Stem: Each feed sits at 60% of breaker rating. Is the rack redundant?
  - ✗ Yes — both feeds are under 100%.
  - ✓ No — on failover one feed jumps to ~120% and trips. Keep each ≤ ~50% so either can carry all.
  - ✗ Only if the racks are Tier II.
- Feedback (correct): "Redundancy is judged at *failover*, not at rest. 2N means either path alone carries the whole load."

---

### L4 — Airflow & thermal (EO-3)

**Block: Paragraph**
- OST: The cooling system can only cool air it actually receives. Your job is to make sure **cold air reaches the intakes and hot air can't sneak back.**

**Block: Image+Text** (hot/cold aisle diagram)
- OST: **Hot-aisle / cold-aisle:** intakes face the cold aisle, exhaust to the hot aisle, rack-to-rack down the row. **Containment** (enclosing one aisle) stops mixing and can cut cooling energy **up to ~30%**.
- VO/Dana: "Every open U is a leak. Hot exhaust loops back to the intake, the inlet temp climbs, and the cooling plant works harder for worse results."

**Block: Statement**
- OST: **Defend 18–27 °C at the cold-aisle intake** (ASHRAE *recommended*). "Allowable" (up to A-class limits) is a short-term ceiling, not a target — sustained operation there shortens equipment life.

**Block: Knowledge Check — Multiple Choice (KC-3 / Q3, EO-3)**
- Stem: Half the rack is empty after install. Best airflow action?
  - ✓ Install blanking panels in every empty U.
  - ✗ Leave gaps so heat can rise out.
  - ✗ Lower the whole room setpoint 5 °C.
  - ✗ Point a portable fan at the rack.
- Feedback (correct): "Blank every empty U. Gaps recirculate hot air; dropping the room setpoint just burns energy to fix a leak you could close for a few dollars."

---

### L5 — Commissioning go/no-go (EO-5) — *scored Storyline embed*

This is the **scored** decision sim. Native Rise can't do variable scoring + consequence layers that *return* to the decision, so build it once in Storyline and embed (build approach mirrors SC-12 §5 / [[22_SC-12_EndToEnd_Walkthrough]] Stage 5–6). The branching content is **D1** in §3. Rise wrapper:

**Block: Paragraph**
- OST: Commissioning is the moment you decide the rack is fit to go live. You'll be handed the state of the rack; call **go** or **no-go** against the acceptance criteria. A *no-go* when the criteria fail is the right answer — and it scores.

**Block: Storyline / Web Object** → the embedded sim (D1).

---

### L6 — The first night: triage & escalate (EO-6) — *native Rise Scenario*

The narrative payoff: the rack you installed throws its first alarm at 2 a.m. Built from native Rise **Scenario** blocks (branch by routing, never label the "correct" choice). Full branching content = **D2** in §3.

**Block: Scenario** (D2 — see §3 for paste-ready copy).

---

### L7 — Debrief · knowledge check · badge

**Block: Quote**
- OST: *"Dock to live, you made every call against the package. That's the job — not heroics at 2 a.m., but a clean install that never needs them."* — Dana

**Block: Quiz** (the graded check — §4 import block).

**Block: Statement (completion)**
- OST: **Rack Commissioned — "Clean Runtime" badge.** You installed to spec, kept redundancy and airflow intact, made the go/no-go call, and escalated the first alarm correctly.

---

## 3. Scenario blocks (paste-ready) — D1 (commissioning) & D2 (first night)

Format matches [[22_SC-12_EndToEnd_Walkthrough]] / the SC-12 scenario file: an opening situation, choices, one response per choice, and routing. **Correctness lives only in the routing** (Continue vs. Try again) — never type "correct" into a choice or show two feedbacks at once. For D1's *scored* version, the score deltas and variables are listed for the Storyline build.

### D1 — Commissioning go/no-go (scored; Storyline embed)

**Scoring variables** (declare in Storyline): `defects` (number, default 0; **go requires 0**), `redundancyOK` (boolean, default false), `airflowOK` (boolean, default false), `cleanCommission` (boolean, default true).

```
Situation: The rack is mounted, cabled, and powered. The commissioning checklist is open.
Reading: A-feed 58% / B-feed 61% of breaker. Three empty U near the top are open (no blanking).
Inlet temp reads 26 °C. Bonding/ground: signed. Back-out plan: ready.
Dana: It looks done. "Looks done" isn't a state we energize on. What's your call?

Choice: Go — temperature's in range and it's powered
Response: On a B-feed failure, A jumps past its breaker and trips — and three open U are recirculating hot air. We don't commission a rack that fails on the first fault. (defects+1; cleanCommission=false)
Route: Try again (return to this decision)

Choice: No-go — fix power balance and blanking first
Response: Right call. Rebalance so either feed alone stays under rating (redundancyOK=true), blank the three open U (airflowOK=true), re-read inlet temp, then commission. A no-go that prevents a 2 a.m. trip is a win. (holds the clean run)
Route: Continue

Choice: Go — we'll fix the blanking tomorrow
Response: "Tomorrow" is how recirculation becomes a thermal alarm tonight. Blanking is part of the install, not a follow-up. (defects+1; cleanCommission=false)
Route: Try again (return to this decision)
```
Result logic: `defects == 0 && redundancyOK && airflowOK → cleanCommission stays true → "Clean Commission" + continue`; any defect routes back (productive failure). SME-verify the breaker/balance threshold for the site.

### D2 — First-night alarm: triage & escalate (native Rise Scenario)

```
Situation: 02:14. The rack you commissioned pages: "Cold-aisle inlet 31 °C and rising — Rack R-14." 
IT load is still online. You are the on-shift technician; the on-call engineer and IC are reachable.
Dana (over comms): Talk me through it. What is this, and what do you do?

Choice: Watch it for an hour — it might settle
Response: Inlet is climbing past recommended toward the A-class ceiling with live load. Waiting risks a thermal-driven hardware event. This isn't a "watch." 
Route: Try again (return to this decision)

Choice: Treat as P1, page on-call + IC, and start the thermal EOP
Response: Correct. Rising inlet on a live rack threatens the critical load → P1: page on-call and the incident commander now, open the incident, and run the cooling/thermal EOP (find the cause — containment breach, open U, CRAH fault — restore the envelope).
Route: Continue

Choice: Log it as P3 for the day shift
Response: P3 is for limited-impact, business-hours issues. A live rack heading out of thermal spec is not next-day work. Re-triage.
Route: Try again (return to this decision)

Choice: Power the rack off yourself to be safe
Response: Killing a live production rack solo, unescalated, can cause the very outage you're trying to prevent — and it's not your call to make alone. Escalate and run the EOP; shutdowns happen on the IC's authority.
Route: Try again (return to this decision)
```
Branch close: the **P1 → page + EOP** route leads to a short resolution screen — *"Cause: two open U from a rushed install were recirculating hot air; blanking restored, inlet back to 24 °C. The clean install you almost made would have prevented the page."* — tying L6 back to L4/L5.

**Build note (how to get a real Scenario block, not an Accordion):** Rise's AI **Generate** menu doesn't include Scenario — use **AI Blocks → Magic Text Import** (paste a block above) or **Interactive → Scenario** manually, then wire routing. (Same gotcha documented in the SC-12 scenario file / [[21_Rise360_AIAssistant_Playbook]].)

---

## 4. Quiz — Magic Quiz Import (paste-ready)

For safety/spec content, keep items **verbatim** via **Magic Quiz Import** (not Generate quiz, which paraphrases). `*` = correct answer. After import, add the feedback strings below.

```
Q1. 1U of rack space equals what height?
*1.75 in (44.45 mm)
1.5 in (38.1 mm)
2.0 in (50.8 mm)
1 in (25.4 mm)

Q2. Each power feed sits at 60% of its breaker rating. Is the rack truly redundant?
*No — on failover one feed exceeds 100% and trips; keep each feed low enough to carry the full load alone
Yes — both feeds are under 100%
Only for Tier I racks
Redundancy can't be judged until the rack is live

Q3. Half the rack is empty after install. The correct airflow action is to:
*Install blanking panels in every empty U
Leave the gaps so hot air can rise and escape
Lower the entire room setpoint by 5 °C
Aim a portable fan into the rack

Q4. At 02:00 a live rack's cold-aisle inlet is rising past the ASHRAE recommended range. Correct triage?
*P1 — page on-call + incident commander and run the thermal EOP
P3 — log it for day shift
Acknowledge and watch for an hour
Power the rack off yourself without escalating

Q5. Which document is the detailed, step-by-step script for a task that can touch the critical load?
*MOP (Method of Procedure)
SOP (Standard Operating Procedure)
EOP (Emergency Operating Procedure)
SLA (Service Level Agreement)

Q6. ASHRAE TC9.9 *recommended* server-inlet range is:
*18–27 °C (64.4–80.6 °F)
10–35 °C (50–95 °F)
5–45 °C (41–113 °F)
21–21 °C, exactly
```
**Settings:** pass 80%; randomize choice order; per-question feedback referencing the spec + Dana's reasoning; results route to the completion/badge block. (Rise quiz types: multiple choice, multiple response, fill-in-blank, matching — no branching; branching lives in §3.)

---

## 5. Visual & 3D asset manifest

Full production specs live in [[04_3D-and-Visual-Asset-Specs]]. This course needs:

| ID | Asset | Type | Used in | Source |
|---|---|---|---|---|
| **RACK-3D-01** | Interactive 42U rack, rotatable, labeled components | **Interactive 3D (Three.js)** | L0, L1 (Labeled Graphic / Web Object) | **Built: `DC_42U-Rack_Interactive-3D.html`** |
| HERO-01 | Data hall at night, rack row, cold-aisle glow | Image (stock/Content Library preferred for realism) | L0 | Content Library / licensed stock |
| DIAG-PWR | A/B feed + dual-PSU load-balance diagram | Vector diagram | L3 | Build in PPT/SVG (spec in file 04) |
| DIAG-AIR | Hot/cold aisle + containment + blanking cutaway | Vector diagram | L4 | Build in PPT/SVG |
| SIM-COMM | Commissioning checklist UI (for D1 Storyline sim) | Storyline screens | L5 | Storyline |
| DANA-REF | Dana persona reference (consistent guide image) | Image set | all VO blocks | Lock once, reuse (style+seed) |

**Asset rules (from [[21_Rise360_AIAssistant_Playbook]] §4):** lock the style string + Dana reference + seed once and reuse; **don't** trust AI for equipment accuracy (use the built 3D model + Content Library/stock); AI only for low-stakes art; PPE correct, no people in hazard positions.

---

## 6. Accessibility (WCAG 2.1 AA — build it in, per [[06_Accessibility_WCAG]])

- **On-screen data is real text**, never baked into an image: rack specs, °C, %, P1/P-levels, U counts.
- **Alt text** on every meaningful image; mark decorative images decorative. (Sample HERO-01 alt: "Row of server racks in a data hall, cool blue light along the cold aisle.")
- **3D asset:** keyboard-rotatable; provides a text-equivalent component list; not motion-only — a static labeled view is available; respects reduced-motion.
- **Scenarios:** choices keyboard-operable with visible focus; feedback carries **text + icon**, never color alone; logical reading/tab order.
- **Captions/transcript** for any narration/animation; no strobe/flash.
- **Contrast** ≥ 4.5:1 for text; status (alarm/ok/hold) shown with label + icon + color, never color alone.

---

## 7. Build Runbook — assemble in Rise (the no-rebuild path)

```
1  New course → "Rack to Runtime." Set theme; cover image HERO-01.
2  Create lessons L0–L7 (names from §1). Set L7 as a Quiz lesson.
3  L0–L4: add the §2 blocks in order; paste OST; add VO as audio or narration notes;
   set images (HERO-01, RACK-3D-01, DIAG-PWR, DIAG-AIR) with alt text from §6.
4  Insert Knowledge Checks KC-1, KC-2, KC-3/Q2/Q3 inline (§2) — mark correct, add feedback.
5  L1 3D rack: embed DC_42U-Rack_Interactive-3D.html as a Web Object (or Storyline block);
   add the §6 text-equivalent component list beneath it.
6  L5: build the scored commissioning sim once in Storyline from D1 (§3) + variables;
   publish; embed as a Storyline/Web Object block. (Variable scoring exceeds native Rise.)
7  L6: add Scenario blocks via Magic Text Import (paste D2, §3); wire routing
   (right call → Continue; wrong → Try again to same decision). Add Dana as character.
8  L7 Quiz: Magic Quiz Import the §4 block; set pass 80%, randomize, add feedback;
   route results → completion/badge Statement block.
9  Accessibility pass (§6): alt text, tab order, captions, contrast, reduced-motion.
10 Publish SCORM 1.2 / xAPI; pilot with one install crew; SME (Critical Facilities) sign-off
   on every spec/number before production release.
```

**Definition of done:** every EO has a passing assessment · scenarios route correctly · all on-screen specs trace to [[01_DC_Spec-Library_SME-Source]] · WCAG AA · SME-verified · pilot passed.

---

*Sources for all technical values: [[01_DC_Spec-Library_SME-Source]] (EIA-310-D, ASHRAE TC9.9, Uptime/TIA-942-C, ITIL). Pedagogy & build conventions: [[22_SC-12_EndToEnd_Walkthrough]], [[21_Rise360_AIAssistant_Playbook]], [[05_MayerMultimediaPrinciples]], [[06_Accessibility_WCAG]], [[01_BloomsTaxonomy]], [[14_ScenarioBasedLearning]].*
