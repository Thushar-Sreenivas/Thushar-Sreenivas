# Phase 8: Algorithmic Background - Context

**Gathered:** 2026-04-12
**Status:** Ready for planning

<domain>
## Phase Boundary

Dynamic algorithmic Frieren background for the profile in dark mode. Generates an algorithmic art GIF using p5.js and embeds it in the README.

</domain>

<decisions>
## Implementation Decisions

### Visual Composition
- **Concept:** Zoltraak Magic Circles (geometric, rotating spell circles).
- **Aesthetic:** Subtle & Ambient (soft glows, slow rotation, dark background to ensure readability).
- **Palette:** Deep Blues & Purples (Frieren's signature magical vibe).
- **Arrangement:** Multiple overlapping circles.
- **Details:** Include abstract runes/symbols inside the rings.
- **Motion:** Rotation & Pulsing (rings rotate and gently fade in/out).

### Media Format
- **Format:** GIF (universally supported, easy to embed with standard Markdown `<img>`).
- **Generation Method:** Automated Script (script captures canvas frames and outputs a GIF automatically using libraries like `ccapture.js` or `gif.js`).

### Animation Loop
- **Length:** Medium (4-6s).
- **Loop Type:** Seamless Loop (must loop perfectly without stutter).
- **Motion Logic:** Continuous Forward (spins continuously in one direction without stopping).
- **Loop Technique:** Slow & Symmetrical (slow, majestic rotation using symmetry to achieve a seamless loop, e.g., 90° rotation matches 0°).

### Claude's Discretion
- Aspect ratio of the generated art.
- Positioning/alignment of the overlapping circles within the frame.
- Target frame rate (balancing smoothness and file size).
- Target file size limit for GitHub compatibility.

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `generate-assets.js` and `build-template.js` pipeline architecture.

### Established Patterns
- Phase 6 enables `-dark-only` suffixes to bypass paired-mode requirements, perfect for a dark-only GIF.
- Markdown templates use `<picture>` tags with `<source media="(prefers-color-scheme: dark)">` for theme detection.

### Integration Points
- The final `Zoltraak-dark-only.gif` (or similar) will be embedded within `README.template.md`.

</code_context>

<specifics>
## Specific Ideas

- The loops must rely on rotational symmetry (e.g. an N-sided shape rotating 360/N degrees) rather than completing a full 360-degree rotation, to ensure the rotation is slow and majestic over the 4-6 second timeframe.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 08-algorithmic-background*
*Context gathered: 2026-04-12*