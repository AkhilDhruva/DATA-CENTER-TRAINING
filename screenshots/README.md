# Rack Module Dissection Screenshots

Every module in the interactive 42U rack (`index.html`) pulled out (dissected) and captured at 1920×1080. For each module there are two shots: the app's own dissection view, and a `-closeup` shot with the camera fitted to the pulled-out module.

Captured headless (Chromium + Playwright, `prefers-reduced-motion` so every animation is at its settled end state). The optional `models/*.glb` authored assets are not present in the repo, so all modules render via their procedural builds.

## Contents

| # | Module | U position | Internals | Render tier |
|---|--------|-----------|-----------|-------------|
| 00 | Full rack overview | — | — | — |
| 01 | Top-of-Rack Switch | 42 | 4 | **hi-fi** |
| 02 | Patch Panel | 41 | 0 (no dissection — passive) | shell only |
| 03 | AI GPU Compute Node (GB200-class) | 32–33 | 7 | **hi-fi** |
| 04 | 2U Compute Server | 37–38 | 6 | **hi-fi** |
| 05 | 2U Compute Server | 35–36 | 4 | **hi-fi** |
| 06 | 4U Storage Array | 25–28 | 4 | **hi-fi** |
| 07 | 1U Server | 25 | 3 | **hi-fi** |
| 08 | 1U Server | 24 | 2 | **hi-fi** |
| 09 | 2U Compute Server | 19–20 | 4 | **hi-fi** |
| 10 | 3U UPS / Battery (BBU) | 4–6 | 5 | **hi-fi** |
| 11 | rPDU — A-feed | 0U vertical | 4 | **hi-fi** |
| 12 | rPDU — B-feed | 0U vertical | 4 | **hi-fi** |

## Hi-fi standard

Every dissectable module is now built on the shared `hifiScaffold` pipeline (pull-out tray with rails, ghost cover, detailed bezel, hero scale, leader-line callouts anchored to real internals) with a per-category camera preset that frames the pulled-out module large on screen:

- **ToR Switch** — QSFP-DD transceiver rows, merchant-silicon ASIC under a low fin stack, removable N+1 fan sled, slim dual A/B PSUs (GLB contract: `models/tor-switch.glb`).
- **GPU Node (GB200-class)** — dual Blackwell packages under liquid cold plates with coolant ports, HBM3e stacks, Grace CPU with LPDDR, NVLink switch chips, ConnectX/BlueField cards, front coolant manifold with quick-disconnects, rear DC busbar tap (`models/gpu-node.glb`).
- **1U Servers** — low-profile variant of the 2U server build: slim heatsinks, DIMM banks, NVMe row, 1U fan wall, slim A/B PSUs (`models/compute-server-1u.glb`).
- **UPS / BBU** — hot-swap Li-ion battery strings with hazard striping, finned rectifier and inverter bricks, static bypass with copper links, BMS control board (`models/ups-bbu.glb`).
- **rPDUs** — keep their zero-U vertical form; dissection now explodes real sub-assemblies (inlet + gland, DIN-rail breaker bank, metering board, outlet-bank segment) into a labeled service column beside the strip, with side-aware camera framing.

The Patch Panel is passive by design (no internals defined) and keeps the shared shell without a dissection.
