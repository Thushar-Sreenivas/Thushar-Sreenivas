---
phase: 07-thematic-dark-svgs
plan: 01
subsystem: ui
tags: [d3-shape, text-to-svg, svg, ui]

# Dependency graph
requires:
  - phase: 06-pipeline-foundation
    provides: [Build pipeline ready for dark SVGs]
provides:
  - Generates foundational text-path SVGs
  - Frieren-esque typography
affects: [08-algorithmic-background]

# Tech tracking
tech-stack:
  added: [d3-shape, text-to-svg]
  patterns: [Programmatic SVG generation, Type-to-path text embedding]

key-files:
  created: [scripts/generate-magic-circles.js, assets/fonts/EBGaramond-Regular.ttf]
  modified: [package.json, README.template.md, scripts/verify-content.js]

key-decisions:
  - "Switched from pre-built SVGs to programmatic generation using d3-shape and text-to-svg"
  - "Embedded text as SVG paths to ensure perfect cross-device typography rendering"
  - "Adopted universal display of dark-themed SVGs across both light and dark modes"

patterns-established:
  - "Path-based text generation: converting font to paths during build to avoid font-loading issues"
  - "Algorithmic geometry generation: using d3-shape to programmatically draw SVG motifs"

requirements-completed: [SVG-02]

# Metrics
duration: 4 min
completed: 2026-04-12
---

# Phase 07 Plan 01: Thematic Dark SVGs Summary

**Programmatic generation of dark-themed Frieren SVGs with embedded text paths using d3-shape and text-to-svg**

## Performance

- **Duration:** 4 min
- **Started:** 2026-04-12T05:35:00Z
- **Completed:** 2026-04-12T05:39:00Z
- **Tasks:** 3
- **Files modified:** 5

## Accomplishments
- Set up `d3-shape` and `text-to-svg` to allow algorithmic generation of SVG assets.
- Downloaded and integrated `EBGaramond-Regular.ttf` for generating Frieren-esque typography baked as SVG paths.
- Wrote `generate-magic-circles.js` to replace static `generate-assets.js`, building new headers, dividers, and footers.
- Updated the `README.template.md` to reference only the `-dark-only` SVGs, ensuring universal display of the dark theme.

## Task Commits

Each task was committed atomically:

1. **Task 1: Setup Font and Dependencies** - `cd33f4f` (chore) & `20bd076` (fix)
2. **Task 2: Create Generator Script for Typography SVGs** - `c89774a` (feat)
3. **Task 3: Update README Template Integration** - `6d4bd5c` (feat)

## Files Created/Modified
- `package.json` - Added `d3-shape` and `text-to-svg` dependencies, updated build script.
- `assets/fonts/EBGaramond-Regular.ttf` - Local copy of the variable font used for text-to-svg conversion.
- `scripts/generate-magic-circles.js` - Script for algorithmically generating the SVG layout and converting text to paths.
- `README.template.md` - Updated to use the new `-dark-only.svg` files without mode-switching picture tags.
- `scripts/verify-content.js` - Added documentation regarding the intentional omission of `#gh-dark-mode-only` tag checks.

## Decisions Made
- Used Google's variable TTF font for `EBGaramond` to successfully map text to paths with `text-to-svg`.
- Embedded all text as paths to ensure consistent cross-device rendering (bypassing GitHub's image proxy limitations on external fonts).
- Removed dual-image picture blocks in favor of single `<img src="...-dark-only.svg">` tags so the elegant dark-themed assets appear universally.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Updated font download to correct GitHub raw URL**
- **Found during:** Task 1
- **Issue:** The `curl` command in the plan pointed to an invalid link, resulting in an HTML file instead of a valid TTF, causing `text-to-svg` to throw an error.
- **Fix:** Switched to the correct Google Fonts repository path and downloaded the valid variable `.ttf` file.
- **Files modified:** `assets/fonts/EBGaramond-Regular.ttf`
- **Verification:** Ran `node -e` script successfully validating text path generation.
- **Committed in:** `20bd076` (fix)

---

**Total deviations:** 1 auto-fixed (1 bug)
**Impact on plan:** Allowed the `text-to-svg` generation script to run correctly.

## Issues Encountered
None - auto-fixes resolved blockers seamlessly.

## Next Phase Readiness
SVGs are successfully generated using programmatic paths, and typography is fully baked in.
Ready to proceed to generating the animated, complex SVG components (Hero Banner and Grimoires).
