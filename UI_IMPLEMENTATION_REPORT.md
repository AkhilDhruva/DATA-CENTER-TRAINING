# UI implementation report

Implements the `claude-code-ui-handoff` specification against the production trainer (`index.html`). The Three.js scene, hi-fi rack models, equipment data, training copy and dissection content are preserved unchanged; the surrounding shell and state model were rebuilt. The interactive mockup URL was unreachable from the build environment (network 403), so this implementation follows `UI_IMPLEMENTATION_SPEC.md` + `ACCEPTANCE_CRITERIA.md`, which fully describe the target information architecture.

Run the acceptance suite with the app served locally:

```
npx http-server -p 8123 .   # or python3 -m http.server 8123
APP_URL=http://127.0.0.1:8123/index.html node tests/acceptance.js
```

Result at time of writing: **74 passed, 0 failed** (`tests/acceptance.js`).

## Acceptance criteria → implementation

### State correctness
| Criterion | Status | How |
|---|---|---|
| Stable unique ID per device | ✅ | `def.uid` (`switch-u42`, `server-u36`, `pdu-a`, …) assigned at build; explorer rows carry `data-uid`; test asserts 12 unique ids |
| Explorer/scene/inspector/breadcrumb/stepper/metrics synchronized | ✅ | All render from the selection (`active`/`selectedPeri`/`curTab`/`curStep`); `markSidebar` marks the matching row with `aria-current` on any selection path |
| Patch Panel label selects Patch Panel | ✅ | 3D name labels are click targets (`.lbl.on`), no click-through; plus a dedicated explorer row |
| Each compute server independently selectable | ✅ | Flat explorer: one row per instance with U-position (U37–38, U35–36, U25, U24, U19–20) |
| Storage and UPS/BBU independently selectable | ✅ | Separate rows (`storage-u28`, `ups-u6`) |
| Inspect opens the part's Overview immediately | ✅ | Grid Inspect and 3D part clicks set `curTab='overview'` before render |
| Back returns to parent chassis without losing state | ✅ | Breadcrumb chassis link restores the Internals grid; explode state untouched (asserted `t ≥ 1`) |
| Return to rack restores closed rack + overview | ✅ | Breadcrumb "Rack", `View full rack`, ✕ and Esc all run `collapseAll` + overview with tab reset |
| Reset idempotent, restores geometry + UI | ✅ | Tested after all four stages and twice consecutively: geometry `t=0`, camera default, step 1, tab Overview, rack card |

### Desktop 1536×900
- Explorer (left, persistent by default ≥1200px), 3D workspace, inspector (right) verified non-overlapping by bounding boxes. ✅
- Explorer (menu button) and inspector (▾ toggle) collapse independently without losing selection. ✅
- Bottom metrics visible; labels shown only for the selection (or via the labels toggle). ✅
- All four tabs render matching content (asserted per tab). ✅

### Compact 1024×768
- Menu/drawer functional; inspector docks above a slim metrics strip (≤38vh, never covers the workspace); header actions on-screen; `scrollWidth == 1024`. ✅

### Mobile 390×844
- `scrollWidth == 390`; explorer is an open/close drawer; Training/Help/Fullscreen reachable (icon buttons with accessible names); view controls carry `aria-label`+`title` (visible text is hidden at this width); inspector is a readable, scrollable bottom sheet with its own collapse control. ✅

### Accessibility
- View controls and explorer rows: `role="button"`, `tabIndex=0`, Enter/Space activation, `:focus-visible` outlines; toggles expose `aria-pressed`, drawer/inspector expose `aria-expanded`. ✅
- Criticality: ★ prefix + red "critical" text in rows (not color alone); A/B feeds carry "A-feed"/"B-feed" text. ✅
- Canvas exposes `role="img"` with a live textual description of the current selection. ✅
- `prefers-reduced-motion` disables camera/dissection animation (pre-existing `REDUCED` path, preserved). ✅
- Vendors tab is labeled "Training reference only — not a procurement recommendation." ✅
- Training mode shows a persistent per-step instruction banner (`#trainHint`, `role="status"`). ✅

### Regression evidence
- `tests/acceptance.js` covers the four canonical state levels, reset after each stage, selection sync, search, three viewports, keyboard activation, and fails on any unexpected console error (`models/*.glb` 404s are the one allowed, pre-existing exception — the authored GLB assets are optional).
- Before/after screenshots: `screenshots/ui-redesign/` (desktop, compact, mobile).

## Known deviations / notes
- The interactive mockup could not be opened from the implementation environment (HTTP 403 at the network edge); layout decisions follow the written spec. If the mockup differs in specifics (e.g. exact toolbar arrangement), point them out and they can be reconciled quickly.
- The blanking panels are represented by a single explorer row (×24) since they are report-only teaching content, not selectable equipment instances.
- Search matches device name and U-position substrings; a query like `u25` intentionally matches both the U25 server and the U25–28 storage array.
