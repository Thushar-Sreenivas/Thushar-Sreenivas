# Phase 3: Layout & Architecture - Context

**Gathered:** 2026-04-11
**Status:** Ready for planning

<domain>
## Phase Boundary

Implement the build system architecture to compile the final `README.md` from `README.template.md`. Ensure cross-platform responsiveness on mobile and visual robustness across GitHub's light and dark viewing modes.
</domain>

<decisions>
## Implementation Decisions

### Dark Mode Implementation
- Replace existing `<picture>` HTML tags with standard Markdown image tags.
- Use GitHub's `#gh-dark-mode-only` and `#gh-light-mode-only` URL fragments to handle theme switching.
- The replacement of `<picture>` tags with Markdown tags should be automated within the build script.
- SVG paths in the final Markdown will use direct relative paths pointing to the `assets/` folder.
- Enforce a strictly pure Markdown output by converting or stripping out residual HTML.

### Mobile SVG Scaling
- Make SVGs responsive by removing fixed `width` and `height` attributes and replacing them with `viewBox` (e.g. `viewBox="0 0 800 H"`).
- The `viewBox` modification should be applied inside the `generate-assets.js` script.
- SVGs will scale down proportionally on mobile (standard image behavior). Legibility of scaled-down text is acceptable.
- Extreme wide screens will naturally be contained by GitHub's maximum README container width, so explicit max-width rules are unnecessary.

### Build System Flow
- Create a minimal `package.json` with zero dependencies solely to define NPM scripts (e.g. `npm run build`).
- The `npm run build` script will execute asset generation, template processing, and verification.
- Content verification (`verify-content.js`) serves as a strict gate: the build must abort if verification fails.
- Automate the build process using a GitHub Action that automatically builds and commits the final `README.md` on push if source files change.

### Claude's Discretion
- The exact implementation details of the template parser/replacer in the Node.js script.
- Naming conventions for the GitHub Actions workflow file.

</decisions>

<specifics>
## Specific Ideas

- The template conversion script should read `README.template.md`, parse out `<picture>...<source media="(prefers-color-scheme: dark)" srcset="assets/images/X-dark.svg"><img src="assets/images/X-light.svg"...></picture>`, and replace it with `![Alt](assets/images/X-light.svg#gh-light-mode-only)\n![Alt](assets/images/X-dark.svg#gh-dark-mode-only)`.

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- `README.template.md` contains the narrative content and `<picture>` tags that act as markers for the automated replacement.
- `scripts/verify-content.js` exists and uses native Node.js asserts.
- `scripts/generate-assets.js` generates SVGs and should be updated to output responsive `viewBox` SVGs instead of fixed `width` and `height` attributes on the root element.

### Established Patterns
- Zero external dependencies: rely strictly on native Node.js APIs (e.g., `fs`, `path`, `assert`).

### Integration Points
- The build script needs to act as the pipeline connecting `generate-assets.js`, `README.template.md`, and `verify-content.js`.
- A new `.github/workflows/build.yml` file will be the integration point for CI automation.

</code_context>

<deferred>
## Deferred Ideas

- None — discussion stayed within phase scope

</deferred>

---

*Phase: 03-layout-architecture*
*Context gathered: 2026-04-11*
