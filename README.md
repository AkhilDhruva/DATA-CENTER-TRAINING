# Interactive 3D 42U AI Data Center Rack

A self-contained, browser-based **interactive 3D server rack** built for technical upskilling courseware. Rotate, zoom, and click any component to read its spec. **Critical components dissect** — they slide out of the rack, the casing splits open, and the internal peripherals separate and label themselves. Each part opens a detailed report card with global vendors, hyperscaler deployments, and a course link.

**▶ Live demo:** https://data-center-training.vercel.app

## What it shows
- A 42U rack built to **EIA-310-D** dimensions (1U = 1.75 in / 44.45 mm; 42U = 73.5 in / 1867 mm; 19-in / 482.6 mm mounting).
- Populated with a Top-of-Rack switch, patch panel, 1U/2U compute, an **AI GPU compute node (GB200-class)**, 4U storage, a 3U UPS/BBU, blanking panels on every empty U, and dual zero-U rPDUs (A-feed amber, B-feed cyan).
- **★ Critical-component dissection** — click a critical part (GPU node, UPS, ToR switch, storage, A/B rPDUs) and it performs an *exploded view*: the component slides forward, the casing opens in opposite directions and fades to a translucent ghost, and the internal peripherals fan out, get highlighted, and label themselves. The camera choreographs a POV change to frame the dissection.
- **Report cards** for every component and peripheral, with tabs:
  - **Overview** — role in uptime and why it matters.
  - **Specs** — figures traced to the project Spec Library (EIA-310-D, ASHRAE TC9.9) plus 2026 density figures.
  - **Vendors & deployments** — global vendors *and* how the hyperscalers (Microsoft, Meta, Google, AWS, xAI, OpenAI) deploy the part, referencing operational / under-construction US AI infrastructure as of 2026 (Colossus, Fairwater, Prometheus/Hyperion, New Carlisle/Rainier, Stargate Abilene).
  - **Course** — a *"Start the course here"* CTA that opens the matching lesson from the **Rack to Runtime** program.
- Classic modes retained: **Power view** (A/B feeds), **Airflow view** (blanking), component labels, U-position ruler, auto-rotate, hover-to-identify, and reset.

> The interactive website is developed **separately** from the Articulate Rise 360 course objects — this is the standalone, deploy-and-share artifact.

## Tech
- Single HTML file. **Three.js (r128)** loaded from CDN; custom orbit controls (no extra dependencies).
- Detailed procedural component geometry (GPUs on cold plates, CPUs, HBM stacks, NVLink/ASICs, NICs, PSUs, battery modules, busbar, manifolds) built in-scene — no external asset files.
- Honors `prefers-reduced-motion` (auto-rotate off, instant transitions) and keeps all data as real on-screen text for accessibility.
- Drop-in embeddable in **Articulate Rise 360** as a Web Object / Embed block (≥ 560 px height).

## Use
Open `index.html` in any modern browser, or visit the live demo above. Part of the *Rack to Runtime* data-center upskilling program.

*Standards figures trace to the cited Spec Library (`01_DC_Spec-Library_SME-Source.md`). Vendor and data-center-project figures reflect the 2026 industry landscape and should be re-verified before publish.*
