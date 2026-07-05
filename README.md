# Interactive 3D 42U Data Center Rack

A self-contained, browser-based **interactive 3D server rack** built for technical upskilling courseware. Rotate, zoom, and click any component to read its spec. Toggle **Power view** (A/B feeds) and **Airflow view** (blanking panels).

**▶ Live demo:** https://data-center-training.vercel.app

## What it shows
- A 42U rack built to **EIA-310-D** dimensions (1U = 1.75 in / 44.45 mm; 42U = 73.5 in / 1867 mm; 19-in / 482.6 mm mounting).
- Populated with a Top-of-Rack switch, patch panel, 1U/2U compute, a 2U GPU node, 4U storage, a 3U UPS, blanking panels on every empty U, and dual zero-U rPDUs (A-feed amber, B-feed cyan).
- Click-to-inspect spec readouts, plus **Power** and **Airflow** highlight modes that teach A/B redundancy and ASHRAE airflow management.

## Tech
- Single HTML file. **Three.js (r128)** loaded from CDN; custom orbit controls (no extra dependencies).
- Drop-in embeddable in **Articulate Rise 360** as a Web Object / Embed block (≥ 560 px height).

## Use
Open `index.html` in any modern browser, or visit the live demo above. Part of the *Rack to Runtime* data-center upskilling program.
