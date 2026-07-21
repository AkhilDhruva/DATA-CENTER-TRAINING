# Rack Module Dissection Screenshots

Every module in the interactive 42U rack (`index.html`) pulled out (dissected) and captured at 1920×1080. For each module there are two shots: the app's own dissection view, and a `-closeup` shot with the camera fitted to the pulled-out module so render quality can be compared directly.

Captured headless (Chromium + Playwright, `prefers-reduced-motion` so every animation is at its settled end state). The `models/*.glb` hi-fi assets referenced by the app are not present in the repo, so all modules render via their procedural builds.

## Contents

| # | Module | U position | Internals | Render tier |
|---|--------|-----------|-----------|-------------|
| 00 | Full rack overview | — | — | — |
| 01 | Top-of-Rack Switch | 42 | 4 | lo-fi |
| 02 | Patch Panel | 41 | 0 (no dissection) | lo-fi |
| 03 | AI GPU Compute Node (GB200-class) | 32–33 | 7 | lo-fi |
| 04 | 2U Compute Server | 37–38 | 6 | **hi-fi** |
| 05 | 2U Compute Server | 35–36 | 4 | **hi-fi** |
| 06 | 4U Storage Array | 25–28 | 4 | **hi-fi** |
| 07 | 1U Server | 25 | 3 | lo-fi |
| 08 | 1U Server | 24 | 2 | lo-fi |
| 09 | 2U Compute Server | 19–20 | 4 | **hi-fi** |
| 10 | 3U UPS / Battery (BBU) | 4–6 | 5 | lo-fi |
| 11 | rPDU — A-feed | 0U vertical | 4 | lo-fi |
| 12 | rPDU — B-feed | 0U vertical | 4 | lo-fi |

## Observed render-quality gap

- **Hi-fi modules** (2U servers, 4U storage) are built on the shared `RackModuleShell` pipeline: full chassis with tray/rails/bezel, ghosted casing, detailed internals (fan wall, DIMM banks, NVMe carriers, backplane), and dedicated close camera presets (`CAM_PRESETS.server` / `CAM_PRESETS.storage`) that frame the pulled-out module large on screen.
- **Lo-fi modules** (ToR switch, GPU node, 1U servers, UPS, rPDUs) dissect into small flat primitive tiles spread near the floor, and have no camera preset — the default dissection camera stays wide, leaving the module small at the edge of frame (clearly visible in shots 01, 03, 10, 11, 12).
- The **Patch Panel** (02) has no dissection at all — clicking it only focuses the rack slot.
- The GPU node (03) is content-rich (7 internals) but visually the weakest relative to its importance; it has neither the hi-fi shell treatment nor a camera preset.
