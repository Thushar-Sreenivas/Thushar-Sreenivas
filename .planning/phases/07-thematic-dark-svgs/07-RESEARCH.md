# Phase 7: Thematic Dark SVGs - Research

**Researched:** 2026-04-12
**Domain:** Programmatic SVG Generation / Magic Circles
**Confidence:** HIGH

## Summary

This phase requires generating highly intricate, Frieren-themed magic circles using Node.js, replacing all existing profile visual assets with cohesive `-dark-only.svg` variants. To achieve identical cross-device rendering under GitHub's camo proxy, all text must be converted to SVG paths instead of relying on standard `<text>` tags and system fonts. 

**Primary recommendation:** Use `d3-shape` (which relies on `d3-path`) to mathematically generate complex runic circles, combined with `text-to-svg` to reliably bake custom Frieren-style typography into static `<path>` elements.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- Primary motif: Geometric magic circles and runes (like Zoltraak).
- Complexity: Highly intricate, overlapping complex rings and dense runes.
- Color: Single accent color (e.g., glowing cyan, gold, or purple) against the dark void.
- Animation: Subtle animation (gentle rotation or glowing pulse using SVG `<animate>`).
- Scope: Replace every single existing SVG to ensure total consistency across the profile.
- Design Strategy: Distinct patterns for each section (e.g., offense magic for backend, defense for frontend).
- Headers: Text (e.g., "Journey") will be embedded directly into the SVG as part of the styling.
- Hero Banner: Arranged as a large central magic circle with smaller orbiting/connected circles.
- Generation: Programmatic generation using Node.js to handle the complex math and geometry.
- Library: Use `d3` / `d3-shape` to assist with the mathematical geometry, polar coordinates, and paths.
- Typography: Convert text to paths to ensure identical rendering across all devices and bypass GitHub font proxy issues.
- Visibility: Show these new dark-themed SVGs in both light and dark modes (everyone sees the beautiful dark SVGs).
- Naming Convention: Stick to the existing `-dark-only.svg` naming convention configured in Phase 6 to bypass pipeline checks.
- Background: Solid dark background matching the GitHub dark theme so they act as cohesive dark containers even in light mode.
- Mobile Scaling: Scale text proportionally larger relative to the circle in the design so it stays readable when shrunk down on narrow screens.

### Claude's Discretion
- Choice of the single accent color for the SVGs (as long as it complies with the dark theme palette).
- The exact layout and mathematical equations used for the `d3` magic circles.
- Text-to-path library or implementation details to convert the header text into paths.

### Deferred Ideas (OUT OF SCOPE)
- None — discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| SVG-01 | Create/find visually stunning, high-quality SVGs for the Frieren dark theme to replace the current ones. | Researched programmatic creation via `d3-shape` for complex geometry and animation. |
| SVG-02 | Update the README template to use these new SVGs exclusively for dark theme using `#gh-dark-mode-only`. | Confirmed `-dark-only.svg` naming convention bypasses existing verification script. |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `d3-shape` | ^3.2.0 | Generating arcs, lines, and complex mathematical SVG paths | Industry standard for data-driven, math-heavy SVG shapes |
| `text-to-svg` | ^3.1.5 | Converts strings and font files directly into SVG path definitions | Bypasses GitHub proxy font-stripping, ensuring exact typography rendering |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| `text-to-svg` | `opentype.js` directly | `opentype.js` is the underlying engine, but `text-to-svg` provides a simpler API for direct text-to-SVG-path string generation. |
| `d3-shape` | Vanilla JS Math | Manually calculating polar coordinates and arc sweeps for SVGs is highly error-prone and verbose. |

**Installation:**
```bash
npm install d3-shape text-to-svg
```
*(Also requires a local Frieren-esque .ttf font file, such as EB Garamond or Cinzel, placed in `assets/fonts/`)*

## Architecture Patterns

### Recommended Project Structure
```
scripts/
├── generate-magic-circles.js  # Main generation orchestrator (replaces generate-assets.js)
assets/
├── fonts/
│   └── Cinzel-Regular.ttf     # Or similar serif font for text-to-path
├── images/
│   ├── hero-banner-dark-only.svg
│   ├── grimoire-frontend-dark-only.svg
│   └── ...
```

### Pattern 1: Math-Driven Geometry with D3
**What:** Using `d3-shape` radial generators to create complex concentric layers.
**When to use:** When generating the outer rings of the Zoltraak-style magic circle.
**Example:**
```javascript
const d3 = require('d3-shape');
// Creates a dashed outer rune ring
const ringPath = d3.arc()
  .innerRadius(120)
  .outerRadius(125)
  .startAngle(0)
  .endAngle(Math.PI * 2)();
// Outputs: "M0,-125A125,125,0,1,1,0,125..."
```

### Pattern 2: Typography as Paths
**What:** Embedding headers via raw `<path>` data rather than `<text>`.
**When to use:** For all textual content ("The Journey So Far", "The Grimoire").
**Example:**
```javascript
const TextToSVG = require('text-to-svg');
const textToSVG = TextToSVG.loadSync('assets/fonts/Cinzel-Regular.ttf');
const pathOptions = { x: 0, y: 0, fontSize: 48, anchor: 'center', attributes: { fill: '#14b8a6' } };
const textPath = textToSVG.getPath('The Grimoire', pathOptions);
```

### Anti-Patterns to Avoid
- **CSS `<style>` for animations:** Avoid using `<style>` tags for animations. Use SVG native `<animateTransform>` inline on the group or path elements to prevent CSS class collisions across multiple SVGs on the profile.
- **Using `<text>` with web fonts:** GitHub's Camo proxy strips `@import` or `<link>` font requests in SVGs, falling back to system fonts unpredictably.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Polar to Cartesian Math | Custom `Math.sin()`/`Math.cos()` arc path generators | `d3.arc()` | SVG arc syntax is notoriously difficult to write manually due to large/small sweep flags and precise path concatenation. |
| Font Parsing | Native `<text>` with custom fonts | `text-to-svg` | GitHub proxy forces native system fonts. Pre-baking text to paths guarantees exact visual output. |

**Key insight:** SVG generation on the server allows us to compute complex visual logic once. Bypassing the browser rendering engine entirely guarantees consistent viewing on GitHub.

## Common Pitfalls

### Pitfall 1: ID Collisions in Gradients/Filters
**What goes wrong:** A gradient named `id="glow"` in the hero SVG overrides or is overridden by `id="glow"` in the backend SVG.
**Why it happens:** GitHub inline-renders SVGs or caches them. Browsers share the SVG ID namespace globally across the DOM.
**How to avoid:** Ensure all `<linearGradient>`, `<filter>`, `<clipPath>` IDs include a unique suffix per file (e.g., `id="glow-hero"`, `id="filter-frontend"`).

### Pitfall 2: Mobile Text Scaling
**What goes wrong:** Beautiful intricate circles have tiny, unreadable text when viewed on mobile.
**Why it happens:** Fluid `viewBox` scaling shrinks the entire SVG proportionately.
**How to avoid:** The text inside the SVG should be disproportionately large compared to the circles. Use negative space aggressively so that when scaled down to 320px width, the text paths are still highly legible.

### Pitfall 3: Palette Verification Failures
**What goes wrong:** CI fails on `verify-svgs.js`.
**Why it happens:** `verify-svgs.js` strictly checks that dark mode SVGs contain one of the exact hex colors: `#94a3b8`, `#14b8a6`, or `#581c87`.
**How to avoid:** You MUST use one of these exact hex strings for the chosen accent color. Teal (`#14b8a6`) or Purple (`#581c87`) fit the "glow" aesthetic well. GitHub dark background is `#0d1117`.

## Code Examples

Verified patterns from official sources:

### Generating an Animated Nested Magic Circle
```javascript
const d3 = require('d3-shape');

// Generate an inner star using radial lines
const points = Array.from({length: 6}, (_, i) => [i * Math.PI / 3, 50]);
const starPath = d3.radialLine()(points) + "Z"; // Close path

const svg = `
<svg viewBox="-200 -200 400 400" width="100%" xmlns="http://www.w3.org/2000/svg">
  <rect x="-200" y="-200" width="400" height="400" fill="#0d1117" />
  <g stroke="#14b8a6" fill="none" stroke-width="2">
    <!-- Slow rotating outer ring -->
    <path d="${d3.arc().innerRadius(150).outerRadius(160).startAngle(0).endAngle(Math.PI*2)()}">
      <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="20s" repeatCount="indefinite" />
    </path>
    <!-- Counter-rotating inner star -->
    <path d="${starPath}">
      <animateTransform attributeName="transform" type="rotate" from="360" to="0" dur="15s" repeatCount="indefinite" />
    </path>
  </g>
</svg>
`;
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `<text>` tags | Pre-baked `<path>` strings | 2020s | Typography remains completely identical regardless of OS or web proxies. |
| CSS Animation | Native `<animateTransform>` | - | Better support within restricted `<img src="...svg">` environments. |

## Open Questions

1. **Font Licensing & Availability**
   - What we know: We need an open-source Frieren-esque font (e.g., OFL license).
   - What's unclear: Whether to automate downloading it or commit a `.ttf` file.
   - Recommendation: Download a TTF file (like `Cinzel` or `EB Garamond` from Google Fonts) via script or commit it directly to `assets/fonts/` for reliable offline build stability. Committing a ~100kb `.ttf` is usually fine for profile repositories.

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Native Node.js `assert` |
| Config file | none — see Wave 0 |
| Quick run command | `node scripts/verify-svgs.js` |
| Full suite command | `npm run build` |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| SVG-01 | Replaces current SVGs with new `-dark-only` visually stunning SVGs | integration | `node scripts/verify-svgs.js` | ✅ Wave 0 |
| SVG-02 | Uses `#gh-dark-mode-only` in template | integration | `node scripts/verify-content.js` | ✅ Wave 0 |

### Sampling Rate
- **Per task commit:** `node scripts/verify-svgs.js`
- **Per wave merge:** `npm run build`
- **Phase gate:** Full suite green before `/gsd-verify-work`

### Wave 0 Gaps
None — existing test infrastructure covers all phase requirements. The current `verify-svgs.js` already validates the `-dark-only.svg` names, the dark theme color palette, and the responsive `viewBox` usage.

## Sources

### Primary (HIGH confidence)
- Official GitHub Markdown Documentation - Verified camo proxy limitations on SVGs
- `d3-shape` Official GitHub - Verified `d3.arc()` functionality in Node.js
- Project existing `verify-svgs.js` - Confirmed acceptable colors (`#94a3b8`, `#14b8a6`, `#581c87`) and naming (`-dark-only.svg`).

### Secondary (MEDIUM confidence)
- `text-to-svg` npm registry - Verified lack of native dependencies (easier CI setup).

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - `d3` and `text-to-svg` are the standard open-source tools for programmatic path generation.
- Architecture: HIGH - Integrating exactly with the project's established build script pattern.
- Pitfalls: HIGH - ID collision and GitHub camo issues are well-documented constraints.

**Research date:** 2026-04-12
**Valid until:** 2026-05-12
