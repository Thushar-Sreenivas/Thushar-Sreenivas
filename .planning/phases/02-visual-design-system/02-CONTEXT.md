# Phase 2: Visual Design System - Context

**Gathered:** 2026-04-11
**Status:** Ready for planning

<domain>
## Phase Boundary

Establish the "Frieren: Beyond Journey's End" visual identity by creating custom SVGs for headers, dividers, tech stack representations, and hero/footer imagery. This effectively replaces generic GitHub profile components with a cohesive, magical aesthetic that adapts to light/dark modes.
</domain>

<decisions>
## Implementation Decisions

### Color Palette & Theme
- **Primary Theme**: Frieren (Light/Ethereal) — white, gold, and soft blue accents.
- **Light/Dark Mode**: "Character Shift" — Use Frieren colors for GitHub Light mode and Fern colors (deep purples, dark blues, silver) for GitHub Dark mode.
- **Accents**: "Magical Glow" — Gold/Yellow highlights in light mode, Silver/Teal highlights in dark mode.
- **Backgrounds**: All custom SVGs should have transparent backgrounds to blend naturally with GitHub's UI.

### Typography & Headers
- **Section Headers**: Top-level headers (H2s) will use custom SVGs with an elegant, serif/fantasy-inspired font (e.g., Cinzel or EB Garamond). Sub-sections will remain standard Markdown.
- **Dividers**: Visual dividers between sections will be SVGs depicting a row of small magical runes.

### Tech Stack Representation
- **Visual Metaphor**: Technologies are represented as spellbooks/grimoires.
- **Layout**: "Bookshelf SVGs" — A single SVG shelf containing all grimoires for a specific category.
- **Tech Identity**: The official logo for each technology (e.g., React, Go) is "engraved" on the cover of its grimoire.
- **Grouping**: Grouped by domain (e.g., Frontend, Backend, Tooling).

### Imagery & Decor
- **Style Constraints**: Use abstract magical elements and props (staves, flowers, auras). Avoid drawing full characters or silhouettes.
- **Hero Banner**: The top visual should feature a field of blue moon weed (Aurel) flowers in a soft breeze.
- **Quote Integration**: The core quote ("There's something about making code work that still feels like magic to me.") must be styled directly inside the Hero SVG banner.
- **Footer**: The profile concludes with an SVG showing a fading trail of magical sparks or petals.

### Claude's Discretion
- Exact dimensions and viewBox settings for the SVGs to ensure mobile responsiveness.
- The precise animation styles if any CSS animations are used within the SVGs.
- Minor design details of the grimoires to ensure they look distinct but unified.

</decisions>

<specifics>
## Specific Ideas

- The "Character Shift" requires generating two versions of the SVGs (or CSS within the SVGs responding to `prefers-color-scheme`, but since GitHub sanitizes SVG CSS, two separate files using `<picture>` or `#gh-light-mode-only` patterns is required).
- The "Bookshelf SVG" should feel cohesive, rather than a loose collection of icons.

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- `README.template.md` exists and contains the raw text content from Phase 1. It will be the target for inserting the new SVG references.

### Established Patterns
- A template-driven build process is planned for Phase 3, so these SVGs should be placed in an `assets/` directory and referenced correctly in the template.

### Integration Points
- SVGs will be integrated using Markdown image syntax, utilizing GitHub's theme-context standard (e.g., `#gh-dark-mode-only`).

</code_context>

<deferred>
## Deferred Ideas

- None — discussion stayed within phase scope

</deferred>

---

*Phase: 02-visual-design-system*
*Context gathered: 2026-04-11*