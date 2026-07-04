# context.md — Data Center Upskilling Portfolio + 3D Rack

> **Purpose of this file.** A full context handoff so any agent/developer (or a future session) can resume this work cold — especially the **interactive 3D rack code**. Read this top to bottom first. Last updated: 2026-07-04.

---

## 1. Who / identifiers
- **Owner:** Aki (Akhil Reddy Gaddam). Email: druva.akhil@gmail.com. GitHub: **AkhilDhruva**.
- **Goal:** land a **Technical Instructional Designer (Technical ID)** role in **data-center upskilling**. Everything here is a recruiter-facing portfolio.
- **Positioning bar (2026 ID market):** recruiters reward *fewer, deeper, interactive, AI-accelerated* projects over many shallow ones → strategy = one deep flagship + a tangible interactive 3D artifact + full ID process shown.

## 2. Repository & live deployment
- **Repo (public):** https://github.com/AkhilDhruva/DATA-CENTER-TRAINING — default branch **`main`**.
- **Live site (GitHub Pages, main / root):** **https://akhildhruva.github.io/DATA-CENTER-TRAINING/**
- **Repo contents (9 files on main):** `index.html` (= the 3D rack, served at root), `DC_42U-Rack_Interactive-3D.html` (same, original name), `README.md`, and docs `00_…` through `05_…` (see §5).
- **Verified:** HTTP 200, correct rack HTML (20,539 bytes), Three.js loads, 0 console errors.
- **Old/abandoned repo:** `AkhilDhruva/Data-Center-HMI-Training-` (private) — Pages blocked on free plan; superseded by the public repo above.

## 3. THE 3D RACK — code details (the thing to "work on later")

**File:** `DataCenter-Upskilling-Portfolio/DC_42U-Rack_Interactive-3D.html` (also `index.html` in repo). Single self-contained HTML file, ~20.5 KB.

**Stack:** Three.js **r128** from `https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js`. **No other deps.** Custom orbit controls (no OrbitControls dependency) so it works offline-ish and avoids version issues.

**Architecture (all in one inline `<script>` IIFE):**
- Guard: if `window.THREE` missing → show `#err` overlay and bail.
- `scene`, `PerspectiveCamera`, `WebGLRenderer` (antialias, shadows PCFSoft), `Fog`. Lights: Hemisphere + Directional key (shadow) + cyan rim + cold-aisle point light.
- **Units:** `U = 0.4` world units; `UNITS = 42`; rack W 6.2, D 7.6. Everything sizes off `U`.
- **Rack frame:** 4 corner posts, top/bottom plates, rear panel.
- **Data model:** `equip[]` array of `{u, h, type, name, desc, tag}` — u = bottom-most U, h = height in U, type ∈ {server, switch, storage, ups}. Change/extend the rack by editing this array.
- **Blanking panels:** auto-generated for every U not in `occupied[]`.
- **rPDUs:** two zero-U verticals (A = amber `0xff8c32`, B = cyan `0x36c2ff`) via `pdu()`.
- **Interaction:** custom pointer-drag orbit (theta/phi/radius), wheel zoom; `Raycaster` click → `setInfo()` populates the `#info` HUD panel; hover/selection emissive highlight.
- **View modes:** `setMode('power'|'air'|'all')` dims non-relevant meshes (opacity) and swaps the info panel copy. Buttons: Auto-rotate, Power view, Airflow view, Component labels, U-position ruler, Reset.
- **HTML labels:** DOM `.lbl` / `.uruler` divs projected each frame via `vector.project(camera)` in `updateLabels()`.
- **Loop:** `tick()` → auto-rotate, `applyCamera()`, `updateLabels()`, render.

**Spec accuracy (already baked in, per §6):** 1U = 1.75 in / 44.45 mm; 42U = 73.5 in / 1867 mm; 19-in mounting; A/B feeds; ASHRAE 18–27 °C; blanking every empty U; heaviest gear mounted low.

**Known issues / gotchas when working on it:**
- **Rendering verification:** when opened in a *foreground* browser tab it renders fine. In an automation/background tab `window.innerWidth/Height = 0` (visibilityState "hidden") so the canvas is 0×0 — that's a viewport artifact, NOT a bug. Verify hosting via `fetch()` + HTTP 200, not screenshots.
- **CDN dependency:** needs internet for Three.js. If offline support is needed, inline three.min.js.
- Screenshot tool in the Chrome extension currently errors (`clip.scale`) — don't rely on it.

**Extension backlog (planned, not built):**
1. Front/rear toggle showing A/B cabling paths.
2. "Drag a device into a U" install mini-interaction.
3. Thermal heat-map overlay for the airflow lesson.
4. Embed in Rise 360 as a Web Object (≥ 560 px height) with the text-equivalent component list beneath (accessibility).

## 4. Deployment playbook & environment constraints (CRITICAL for a coding agent)
- **The assistant sandbox has NO network to GitHub** (proxy returns 403 on CONNECT). `git`/`gh`/`curl` to GitHub all fail there. → Deploy from **Aki's machine** (real internet) or via the **Claude-in-Chrome** browser tools (runs in her browser with her GitHub session).
- **Browser-deploy flow that works:** navigate to `…/upload/main` (non-empty repo) or click "uploading an existing file" (empty repo) → `find` the file input → `file_upload` the files → commit via **JavaScript** (`document.querySelector('#commit-summary-input')` + click the "Commit changes" button). Element refs go stale between calls; the JS-commit approach is robust.
- **`javascript_tool` quirk:** an `async` IIFE returns a Promise that serializes as `{}`. Use **top-level `await`** with a final expression instead.
- **Chrome extension domains:** only user-approved domains work (github.com + github.io approved; Netlify/Vercel were blocked until approved).
- **GitHub Pages needs the repo public** on a free plan (or a paid plan for private Pages). **Do NOT change repo visibility on Aki's behalf** — that's her call (sharing-permission change).
- **Filesystem:** the assistant can read/write the connected workspace `W:\Portfolio\_Articulate Storyline _ Automation Engine\` only. It **cannot** reach `C:\Users\Akhil Reddy Gaddam\Downloads\…`.

## 5. Deliverables & file map
Folder: `W:\Portfolio\_Articulate Storyline _ Automation Engine\DataCenter-Upskilling-Portfolio\`

| File | What it is |
|---|---|
| `00_START-HERE_Recruiter-Brief.md` | Recruiter case study / positioning (read first). |
| `01_DC_Spec-Library_SME-Source.md` | Cited technical source of truth (racks, tiers, thermal, power, ops, escalation). |
| `02_Flagship_Rack-to-Runtime_Rise-Build-Pack.md` | Full Rise 360 build pack: objectives, block-by-block copy, 2 scenarios, quiz, runbook. |
| `03_Program-Suite_Curriculum-Map.md` | The 3-program suite and how it ladders. |
| `04_3D-and-Visual-Asset-Specs.md` | Production specs for all 3D/visual assets (RACK-3D-01 = the rack). |
| `05_3D-Rack_Instruction-Transcript.md` | Verbatim transcript of Aki's instructions for the 3D rack. |
| `DC_42U-Rack_Interactive-3D.html` | **The interactive 3D rack (source).** |
| `HANDOVER_to-Claude-Code.md` | Deploy handoff (has local paths — NOT pushed to public repo). |
| `deploy-to-github/` | Staged deploy bundle: `index.html`, rack html, `README.md`, `DEPLOY_COMMANDS.md`, zips. |
| `context.md` | **This file.** |

Parent project also has the **"Articulate Engine"** KB at `…/Articulate Storyline Automation Engine/ArticulateEngine/` (00–22 numbered ID/authoring knowledge files) and the reference build pack **SC-12 "The Lift"** — the pattern all build packs follow.

## 6. Technical spec grounding (key numbers; full + cited in `01_…`)
- **Rack (EIA-310-D):** 1U = 1.75 in (44.45 mm); 42U usable 73.5 in (1867 mm); 19-in (482.6 mm) mounting; depth 1000–1200 mm; static load ~1588 kg (3500 lb).
- **Power/density:** A/B feeds; N / N+1 / 2N; traditional 6–15 kW/rack; 2026 AI GPU racks 120–132 kW (GB200 NVL72); next-gen 250–500+ kW → liquid cooling.
- **Thermal (ASHRAE TC9.9 5th ed.):** recommended inlet 18–27 °C (64.4–80.6 °F); allowable A1–A4 up to 15–32 … 5–45 °C; blanking + containment ≈ up to 30% cooling-energy savings.
- **Availability (Uptime / TIA-942-C):** Tier I 99.671% → IV 99.995%; Tier III concurrently maintainable (N+1, dual path), Tier IV fault tolerant (2N). "Five nines" ≈ 5.26 min/yr.
- **Ops:** SOP (policy) ▸ MOP (step-by-step for critical-load work) ▸ EOP (emergency).
- **24×7 escalation (ITIL):** P1 critical / P2 high = 24×7; P3/P4 = 8×5. Metrics MTTA/MTTR/MTBF; RACI for "no ambiguity at 2 a.m."

## 7. The 3-program curriculum (suite)
1. **P1 — Operate the Environment** (foundations; new entrants) — designed/outlined.
2. **P2 — Rack to Runtime** (install · commission · defend) — **flagship, fully built** (`02_…`).
3. **P3 — Defend the Uptime** (24×7 monitor, triage, escalate) — designed/outlined.
Shared: guide persona **Dana Okafor (Critical Facilities Lead)**; ADDIE+SAM, Bloom-tagged objectives, scenario-based/productive-failure, WCAG 2.1 AA, SCORM/xAPI.

## 8. Open items / next steps
- [ ] Add the live URL into `00_START-HERE_Recruiter-Brief.md` (link the working demo).
- [ ] Optionally add **sanitized** `DEPLOY_COMMANDS.md` / `HANDOVER` to the repo (currently excluded — contain local paths).
- [ ] Local fallback copy of the rack HTML → `C:\Users\Akhil Reddy Gaddam\Downloads\files\` (assistant can't reach it; run locally — command in `deploy-to-github/DEPLOY_COMMANDS.md` §5).
- [ ] Expand **P1** and **P3** to full build-pack depth (match `02_…`).
- [ ] Generate import-ready **PPTX layout deck** + **XLSX quiz bank** (Storyline/Rise native import).
- [ ] Build the scored **Storyline** sims (commissioning go/no-go D1; 2 a.m. triage) referenced in `02_…` §3.
- [ ] 3D rack extensions (see §3 backlog): A/B cabling toggle, drag-to-install, thermal overlay, Rise embed.

## 9. Conventions
- Build packs follow the **SC-12 "The Lift"** pattern (see `…/ArticulateEngine/22_SC-12_EndToEnd_Walkthrough.md`).
- Facts are locked once in the spec library (`01_…`); courseware quotes them verbatim — no AI-paraphrased spec/safety wording; SME sign-off is a release gate.
- `[[double-bracket]]` links in the docs reference other files in the engine KB.
