# 04 — 3D & Visual Asset Specs (Production Brief)

**Purpose.** The complete set of building materials for the *visual* layer — built once, reused across all three programs, locked to one style so the suite looks like one product. This is the "build all the 3D assets and support material before we open Rise" deliverable. One asset is **built and shipping** (the interactive 3D rack); the rest are specified precisely enough to hand to a generator, a 3D artist, or a stock-library search and get a consistent result.

**Asset rules (from [[21_Rise360_AIAssistant_Playbook]] §4, applied here):**
- **Lock once, reuse:** one style string + one Dana reference + fixed seed. Don't regenerate the style per asset.
- **Don't trust AI for technical accuracy.** Equipment geometry comes from the **built 3D model** or **Content Library / licensed stock**, never a hallucinated render. AI is for low-stakes atmosphere art only.
- **Guardrails on every prompt:** correct PPE, no people in hazard positions, no load over personnel, no fictional gauges/numbers.
- **Accessibility is part of the spec**, not a later pass (real-text data, alt text, reduced-motion still).

---

## A. Global style guide (lock this first)

| Token | Value |
|---|---|
| **Palette** | bg `#0a0e14` · panel `#121823` · ink `#e6edf6` · cold-aisle accent `#36c2ff` · A-feed `#ff8c32` · B-feed `#36c2ff` · ok `#39d98a` · warn `#ffd23f` |
| **Mood** | clean, technical, "after-hours data hall" — cool blue cold aisle, warm amber on power. Calm and authoritative, not sci-fi. |
| **Lighting** | low ambient + one key light + cyan rim; soft shadows. |
| **Typography** | system sans (Segoe UI / Roboto / -apple-system); numbers always real text, tabular. |
| **Diagram style** | flat vector, 2px strokes, rounded joins, labeled with real values, legend bottom-left. |
| **Negative prompt (all AI art)** | `no people in hazard zones, no load over workers, no missing PPE, no fictional readouts, no warped hardware, no text gibberish` |

---

## B. 3D assets

### RACK-3D-01 — Interactive 42U rack  ✅ BUILT
- **File:** `DC_42U-Rack_Interactive-3D.html` (self-contained; Three.js r128 via CDN; custom orbit, no extra deps).
- **Spec basis:** EIA-310-D (1U = 1.75 in / 44.45 mm; 42U = 73.5 in / 1867 mm; 19-in / 482.6 mm mounting), per [[01_DC_Spec-Library_SME-Source]] §A.
- **Contents modeled:** ToR switch, patch panel, 1U/2U compute, 2U GPU node, 4U storage (mounted low), 3U UPS (lowest), blanking panels on every empty U, dual zero-U rPDUs (A=amber, B=cyan).
- **Interactions:** drag-orbit, scroll-zoom, click any component → spec readout; **Power view** (highlight A/B feeds), **Airflow view** (highlight blanking), **Component labels**, **U-position ruler**, **Reset**.
- **Used in:** P2 L0/L1 (Labeled Graphic / Web Object) and P1 L3 (still frame).
- **Embed in Rise:** Block library → **Multimedia → Embed** (or Storyline Web Object) → host the HTML (Review 360 / LMS / static host) → paste URL. Set block height ≥ 560 px.
- **Accessibility:** keyboard-rotatable target; ships with a **text-equivalent component list** (paste beneath the embed); static labeled view available; honors reduced-motion (auto-rotate off → fully usable).
- **Extension backlog:** (1) front/rear toggle to show A/B cabling; (2) "drag device into a U" install mini-interaction; (3) a thermal heat-map overlay for the airflow lesson.

### MODEL-HALL-01 — Data hall row (3D or pre-rendered)
- **Brief:** a single row of 6–8 of the RACK-3D-01 cabinets, hot-aisle/cold-aisle, containment panels above the cold aisle, perforated floor tiles (if raised floor) or overhead supply. Camera: low 3/4 down the cold aisle, cyan glow.
- **Use:** P1 L1 hero, P3 L1 "the floor you're defending."
- **Build path:** extend the Three.js scene (instance the rack) **or** render stills in Blender; **or** licensed stock for a photoreal hero. Lock the same palette/lighting.

### MODEL-AISLE-CUT-01 — Hot/cold aisle cutaway (3D diagram)
- **Brief:** two rack rows back-to-back; blue arrows = cold supply into intakes, red arrows = hot exhaust into the contained hot aisle; one open U shown recirculating (red curl back to intake) as the "leak."
- **Use:** P1 L3, P2 L4 (DIAG-AIR companion).

---

## C. 2D diagrams (vector — build in PPT/SVG/Figma)

| ID | Title | Must show (real values) | Used in |
|---|---|---|---|
| **DIAG-PWR** | A/B feed + dual-PSU load balance | Utility→UPS→A-feed rPDU and B-feed rPDU; server with PSU1→A, PSU2→B; callout: "each feed ≤ ~50% so either carries 100% on failover"; N / N+1 / 2N inset | P2 L3, P3 L4 |
| **DIAG-AIR** | Airflow & containment cutaway | cold aisle 18–27 °C intake; hot exhaust; blanking on empty U; containment = up to ~30% savings | P1 L3, P2 L4 |
| **DIAG-TIER** | Tier / Rated comparison ladder | I–IV vs Rated 1–4; availability % + downtime/yr; single vs dual path; N→2N | P1 L2 |
| **DIAG-ESC** | Escalation matrix / RACI | P1–P4 rows; coverage 24×7 vs 8×5; page→on-call→IC; time-boxed no-response window | P3 L3 |
| **DIAG-MOP** | MOP step ribbon | 9 install steps with hold points flagged (receiving, grounding, pre-energization) | P2 L2 |
| **DIAG-DOCS** | SOP ▸ MOP ▸ EOP pyramid | scope (program/task/incident) + one example each | P1 L4 |

All diagrams: flat vector, palette §A, real-text labels (not rasterized numbers), legend bottom-left, exported SVG + PNG @2x.

---

## D. Imagery / photo briefs (stock-first; AI only for atmosphere)

| ID | Brief | Source preference | Alt text (sample) |
|---|---|---|---|
| **HERO-01** | Data hall at night, rack row, cold-aisle blue glow | Content Library / licensed stock (realism) | "Row of server racks in a data hall lit cool blue along the cold aisle." |
| **HERO-P3** | NOC at 2 a.m., monitoring wall, one operator | licensed stock | "A night-shift operator at a wall of monitoring dashboards." |
| **RECV-01** | Crated rack on a dock, asset tag, inspection | stock or staged photo | "A newly delivered server rack on a loading dock awaiting inspection." |

If AI-generated atmosphere art is used, apply the §A negative prompt and never depict unsafe acts.

---

## E. Guide persona — DANA-REF

- **Who:** Dana Okafor, Critical Facilities Lead. Calm, exacting, mentor energy. Appears as the narration voice across all three programs.
- **Reference lock:** generate one approved portrait set (neutral, 3/4, and gesture-to-screen), fix the seed + style string, reuse everywhere. Consistent attire (company polo + ID badge + safety glasses on the floor).
- **Use:** scenario character in P2 D1/D2 and P3 sim; small inset on VO content blocks.
- **Accessibility:** decorative on content blocks (mark decorative); as a scenario character, the dialog is real on-screen text, not baked into the image.

---

## F. Narration / VO spec (support material)

| Param | Value |
|---|---|
| **Voice** | Authoritative, warm, mid-pace. (Rise TTS or recorded; if TTS, a single consistent voice across the suite.) |
| **Pacing** | Insert a short break before each critical step/number; never read the on-screen text verbatim (Mayer — complement, don't duplicate). |
| **Captions** | On for every VO and animation; transcript provided. |
| **Scripts** | Live in each build pack's §2 (the "VO/Dana" lines). Keep spec wording verbatim from [[01_DC_Spec-Library_SME-Source]]. |

---

## G. Master asset manifest

| ID | Type | P1 | P2 | P3 | Status |
|---|---|:--:|:--:|:--:|---|
| RACK-3D-01 | Interactive 3D | ● | ● |  | **built** |
| MODEL-HALL-01 | 3D / render | ● |  | ● | spec |
| MODEL-AISLE-CUT-01 | 3D diagram | ● | ● |  | spec |
| DIAG-PWR | Vector |  | ● | ● | spec |
| DIAG-AIR | Vector | ● | ● |  | spec |
| DIAG-TIER | Vector | ● |  |  | spec |
| DIAG-ESC | Vector |  |  | ● | spec |
| DIAG-MOP | Vector |  | ● |  | spec |
| DIAG-DOCS | Vector | ● |  |  | spec |
| HERO-01 / HERO-P3 / RECV-01 | Image | ● | ● | ● | brief |
| DANA-REF | Persona set | ● | ● | ● | brief |

**Definition of done (assets):** style locked · every technical asset traces to [[01_DC_Spec-Library_SME-Source]] · alt text written · reduced-motion handled · SME-verified before publish.

*Build conventions: [[21_Rise360_AIAssistant_Playbook]] §4, [[05_MayerMultimediaPrinciples]], [[06_Accessibility_WCAG]]. Interactive asset: `DC_42U-Rack_Interactive-3D.html`.*
