# Interactive 3D 42U AI Data Center Rack

> **Created and owned by [Akhil Gaddam](https://github.com/AkhilDhruva).**
> Copyright © 2026 Akhil Gaddam. All rights reserved. Proprietary — see [LICENSE](LICENSE).
> First created 4 July 2026. Authorship is verifiable from this repository's timestamped commit history.

A self-contained, browser-based **interactive 3D server rack** built for technical upskilling courseware. It opens on a God's-eye view of a whole AI data hall and zooms you down, row by row, to one rack — then you rotate, zoom, and click any component to read its spec. **Critical components dissect** — they slide out of the rack, the casing splits open, and the internal peripherals separate and label themselves. Each part opens a detailed report card with global vendors, hyperscaler deployments, and a course link.

**▶ Live demo:** https://data-center-training.vercel.app

## What it shows
- **The data-hall ride (opening sequence)** — *"Want to learn what's inside a data center rack? Start here and zoom — you're in for a ride."* The app opens on a God's-eye view of a full AI data hall (8 rows × 16 racks, hot/cold-aisle containment, perforated cold-aisle tiles, yellow fiber raceway, grey power busway with tap-offs, red fire-suppression mains, CRAH units). Scroll, swipe or press ↓ and the camera flies down the rows, drops into the cold aisle, locks onto **Rack C-08**, and the rest of the hall sinks away until one rack stands alone — landing on the trainer's own view with no cut. **Start the ride** plays it hands-free and carries on into the GPU-node dissection. A live **Field of view** ruler (log scale, ≈ 20 m → ≈ 2 m) tracks the zoom the whole way, powers-of-ten style. Scroll back up past the full rack (or use **Data hall**) to fly back out. Reduced-motion users get chapter cuts instead of a flight; `?intro=0` (or `#rack`) opens straight on the trainer.
- A 42U rack built to **EIA-310-D** dimensions (1U = 1.75 in / 44.45 mm; 42U = 73.5 in / 1867 mm; 19-in / 482.6 mm mounting).
- Populated with a Top-of-Rack switch, patch panel, 1U/2U compute, an **AI GPU compute node (GB200-class)**, 4U storage, a 3U UPS/BBU, blanking panels on every empty U, and dual zero-U rPDUs (A-feed amber, B-feed cyan).
- **★ Critical-component dissection** — click a critical part (GPU node, UPS, ToR switch, storage, A/B rPDUs) and it performs an *exploded view*: the component slides forward, the casing opens in opposite directions and fades to a translucent ghost, and the internal peripherals fan out, get highlighted, and label themselves. The camera choreographs a POV change to frame the dissection.
- **Report cards** for every component and peripheral, with tabs:
  - **Overview** — role in uptime and why it matters.
  - **Specs** — figures traced to the project Spec Library (EIA-310-D, ASHRAE TC9.9) plus 2026 density figures.
  - **Vendors & deployments** — global vendors *and* how the hyperscalers (Microsoft, Meta, Google, AWS, xAI, OpenAI) deploy the part, referencing operational / under-construction US AI infrastructure as of 2026 (Colossus, Fairwater, Prometheus/Hyperion, New Carlisle/Rainier, Stargate Abilene).
  - **Course** — a *"Start the course here"* CTA that opens the matching lesson from the **Rack to Runtime** program.
- **The silicon dive — from the GPU to a single atom, and back to the hall.** Open the AI GPU node and choose **Zoom into the silicon** (or just keep scrolling deeper; the hands-free ride continues into it automatically). Following the reel it recreates, the camera closes on one Blackwell GPU and keeps going, powers-of-ten style, through eleven levels:
  - **the package** (two reticle-sized dies, 8 × HBM3e, the cold plate lifting away) → **one die** (104 billion transistors) → a fly-through of the **L2 cache** corridor;
  - **one streaming multiprocessor** (128 CUDA cores, 4 Tensor Cores) → **one processing block** (32 CUDA cores, 1 Tensor Core, 64 KB register file) → **inside it**, with the warp scheduler, register file, CUDA cores, LD/ST·SFU and Tensor Core labelled;
  - *the memory path:* **the register file** (16,384 × 32-bit, drawn as 16 banks × 2 arrays of 128 × 128 cells) → **one bank** (wordline decoder, sense amplifiers) → **memory cells** → **one memory cell: six transistors** (access N, pull-down N, pull-up P, Q = 1 / Q = 0) → **reading the bit**, the wordline and bitlines lighting up;
  - *the logic path — cutting back out, as the reel does:* **one CUDA core** → **inside one CUDA core** (a fused multiply-add unit: INT32 unit, multiplier array, alignment shifter, adder, normalise · round, pipeline registers) → **into the electron microscope**, the wiring polished away → **rows of logic cells, then gates and fins** → **the full-adder tile** (sum = a ⊕ b ⊕ c, carry = majority) → **one XOR cell**, where every gate-over-fin crossing is a transistor → **one transistor, cut in half** → **silicon atoms 0.235 nm apart**;
  - and then, like the reel's last frame, **all the way back out to the data hall**.

  The Field-of-view ruler runs the whole way from ≈ 20 m to ≈ 1 nm (100 m → 0.1 nm scale), climbing once where the reel cuts back out to the logic. Each level is its own scene in its own units, cross-faded at a matched field of view so it reads as one continuous zoom; layouts are labelled *illustrative, not a silicon floorplan*. **Back to the rack** rewinds out; scrolling back up does the same.
- Classic modes retained: **Power view** (A/B feeds), **Airflow view** (blanking), component labels, U-position ruler, auto-rotate, hover-to-identify, and reset.
- One zoom language throughout: scroll down / pinch out / swipe up goes deeper — hall → rack → GPU → silicon → atom; scroll up pulls back out, all the way to the data hall.

> The interactive website is developed **separately** from the Articulate Rise 360 course objects — this is the standalone, deploy-and-share artifact.

## Tech
- Single HTML file. **Three.js (r128)** loaded from CDN; custom orbit controls (no extra dependencies).
- Detailed procedural component geometry (GPUs on cold plates, CPUs, HBM stacks, NVLink/ASICs, NICs, PSUs, battery modules, busbar, manifolds) built in-scene — no external asset files.
- The data hall is fully instanced (≈ 30 draw calls for 127 racks and all overhead services) with procedurally drawn rack doors, rears, tops and floor tiles; it is built at the same 1U = 44.45 mm scale as the trainer rack and hidden once the ride hands over, so the trainer costs nothing extra.
- Honors `prefers-reduced-motion` (auto-rotate off, instant transitions) and keeps all data as real on-screen text for accessibility.
- Drop-in embeddable in **Articulate Rise 360** as a Web Object / Embed block (≥ 560 px height).

## Use
Open `index.html` in any modern browser, or visit the live demo above. Part of the *Rack to Runtime* data-center upskilling program.

*Standards figures trace to the cited Spec Library (`01_DC_Spec-Library_SME-Source.md`). Vendor and data-center-project figures reflect the 2026 industry landscape and should be re-verified before publish.*

---

## Ownership, licence and provenance

**Author and sole copyright holder: Akhil Gaddam.**
Copyright © 2026 Akhil Gaddam. All rights reserved.

| | |
|---|---|
| Work first created | 4 July 2026 |
| Canonical source | https://github.com/AkhilDhruva/DATA-CENTER-TRAINING |
| Canonical deployment | https://data-center-training.vercel.app |
| Licence | Proprietary — All Rights Reserved ([LICENSE](LICENSE)) |

This project — its 3D models and procedural geometry, dissection choreography, interface, information architecture, instructional content, component specifications, vendor and deployment research, and written copy — is the original work of Akhil Gaddam.

It is published so it can be **viewed, learned from and evaluated**. It is **not** placed in the public domain. Without prior written permission you may not copy, modify, redistribute, rehost, rebrand, or commercially exploit it — in whole or in part — nor present it as your own work or a client deliverable. See [LICENSE](LICENSE) for the full terms.

Authorship is asserted in several independently checkable places: this README, the [LICENSE](LICENSE), the source header and metadata of `index.html`, [schema.org structured data](https://schema.org/SoftwareApplication), `humans.txt`, HTTP response headers, a watermark composited into the rendered 3D viewport, and — most durably — the **public, timestamped commit history of this repository**, which records the work from its first commit onward.

Removing or altering those notices does not extinguish the copyright, and is a separate violation of the provisions protecting copyright management information (17 U.S.C. § 1202 in the United States, and its equivalents elsewhere).

**Licensing enquiries are welcome.** Requests to teach from, adapt, or build on this work — particularly non-commercial educational use — are read and frequently granted. Open an issue on this repository.
