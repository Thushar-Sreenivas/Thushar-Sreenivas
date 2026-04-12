# Phase 7: Thematic Dark SVGs - Context

**Gathered:** 2026-04-12
**Status:** Ready for planning

<domain>
## Phase Boundary

Create and integrate visually stunning, high-quality, Frieren-themed SVGs into the profile README. These assets will replace existing SVGs with complex programmatic magic circle designs.

</domain>

<decisions>
## Implementation Decisions

### Visual Aesthetic
- Primary motif: Geometric magic circles and runes (like Zoltraak).
- Complexity: Highly intricate, overlapping complex rings and dense runes.
- Color: Single accent color (e.g., glowing cyan, gold, or purple) against the dark void.
- Animation: Subtle animation (gentle rotation or glowing pulse using SVG `<animate>`).

### Replacement Scope
- Scope: Replace every single existing SVG to ensure total consistency across the profile.
- Design Strategy: Distinct patterns for each section (e.g., offense magic for backend, defense for frontend).
- Headers: Text (e.g., "Journey") will be embedded directly into the SVG as part of the styling.
- Hero Banner: Arranged as a large central magic circle with smaller orbiting/connected circles.

### Composition Approach
- Generation: Programmatic generation using Node.js to handle the complex math and geometry.
- Library: Use `d3` / `d3-shape` to assist with the mathematical geometry, polar coordinates, and paths.
- Typography: Convert text to paths to ensure identical rendering across all devices and bypass GitHub font proxy issues.

### Display Strategy
- Visibility: Show these new dark-themed SVGs in both light and dark modes (everyone sees the beautiful dark SVGs).
- Naming Convention: Stick to the existing `-dark-only.svg` naming convention configured in Phase 6 to bypass pipeline checks.
- Background: Solid dark background matching the GitHub dark theme so they act as cohesive dark containers even in light mode.
- Mobile Scaling: Scale text proportionally larger relative to the circle in the design so it stays readable when shrunk down on narrow screens.

### Claude's Discretion
- Choice of the single accent color for the SVGs (as long as it complies with the dark theme palette).
- The exact layout and mathematical equations used for the `d3` magic circles.
- Text-to-path library or implementation details to convert the header text into paths.

</decisions>

<specifics>
## Specific Ideas

- The magic circles should feel like Zoltraak — highly intricate, complex, and beautiful.
- Keep the animation subtle so it feels "alive" without being distracting.

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- `verify-svgs.js`: Already configured in Phase 6 to bypass pairing checks for `-dark-only.svg` while strictly enforcing the dark theme palette.
- `build-template.js`: Extracts single `<img>` tags from `<picture>` blocks without `source` fallbacks, allowing the `-dark-only.svg` files to render universally.

### Established Patterns
- Zero dependencies for validation, but we can use dependencies like `d3` and text-to-path libraries in the generation script since it's a build step.
- `viewBox` is used instead of fixed width/height for responsive scaling.

### Integration Points
- SVGs will be output to `assets/images/` and referenced in `README.template.md` using `<picture>` tags with a single `<img>` fallback.

</code_context>

<deferred>
## Deferred Ideas

- None — discussion stayed within phase scope

</deferred>

---

*Phase: 07-thematic-dark-svgs*
*Context gathered: 2026-04-12*
