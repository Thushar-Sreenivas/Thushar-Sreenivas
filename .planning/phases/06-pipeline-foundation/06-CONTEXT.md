# Phase 6: Pipeline Foundation - Context

**Gathered:** 2026-04-12
**Status:** Ready for planning

<domain>
## Phase Boundary

Update build scripts (`verify-svgs.js` and `build-template.js`) to support dark-theme-only visual assets, ensuring CI validation passes without requiring light-theme pairs and allowing these assets to render correctly in the final README.

</domain>

<decisions>
## Implementation Decisions

### Verification Policy (`verify-svgs.js`)
- Explicit naming convention: Use `-dark-only.svg` to indicate assets that intentionally omit a light mode counterpart.
- `verify-svgs.js` will skip the light/dark pairing requirement for any file ending in `-dark-only.svg`.
- The Frieren dark theme color palette check WILL still be strictly enforced for `-dark-only.svg` files.

### Fallback Strategy & Template Authoring
- Dark-only assets will be shown in both light and dark modes (no special GitHub hiding suffixes).
- Authoring: Write these inside `<picture>` tags with a single `<img>` in `README.template.md`.
- `build-template.js` update: When it encounters a `<picture>` without a `<source>` (or single image), it should extract the `<img>` and output it directly without any `#gh-light-mode-only` or `#gh-dark-mode-only` suffixes.

### Claude's Discretion
- Exactly how `verify-svgs.js` skips the pairing check (e.g., filtering out `-dark-only` before checking pairs).
- Handling of `.gif` or `.mp4` extensions if the algorithmic art requires expanding the script beyond just `.svg` (though SVG is the primary focus of `verify-svgs.js`).

</decisions>

<specifics>
## Specific Ideas

- Ensure `verify-svgs.js` recognizes both `-dark.svg` and `-dark-only.svg` as valid Frieren dark-theme palette files.

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- `scripts/verify-svgs.js`: Contains the native Node `assert` logic. Easy to modify the `endsWith('-dark.svg')` checks and the pairing logic.
- `scripts/build-template.js`: Uses regex to find `<picture>` blocks. `return match;` currently leaves the `<picture>` tag untouched if no `<source>` is found. We can change this to extract and return the `<img>`.

</code_context>

<deferred>
## Deferred Ideas

- None — discussion stayed within phase scope

</deferred>

---

*Phase: 06-pipeline-foundation*
*Context gathered: 2026-04-12*
