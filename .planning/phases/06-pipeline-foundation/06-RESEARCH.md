<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- Explicit naming convention: Use `-dark-only.svg` to indicate assets that intentionally omit a light mode counterpart.
- `verify-svgs.js` will skip the light/dark pairing requirement for any file ending in `-dark-only.svg`.
- The Frieren dark theme color palette check WILL still be strictly enforced for `-dark-only.svg` files.
- Dark-only assets will be shown in both light and dark modes (no special GitHub hiding suffixes).
- Authoring: Write these inside `<picture>` tags with a single `<img>` in `README.template.md`.
- `build-template.js` update: When it encounters a `<picture>` without a `<source>` (or single image), it should extract the `<img>` and output it directly without any `#gh-light-mode-only` or `#gh-dark-mode-only` suffixes.

### Claude's Discretion
- Exactly how `verify-svgs.js` skips the pairing check (e.g., filtering out `-dark-only` before checking pairs).
- Handling of `.gif` or `.mp4` extensions if the algorithmic art requires expanding the script beyond just `.svg` (though SVG is the primary focus of `verify-svgs.js`).

### Deferred Ideas (OUT OF SCOPE)
- None — discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| ARCH-01 | Update `verify-svgs.js` to allow dark-theme-only visual assets. | Details the exact script logic required to skip pairing checks for `-dark-only.svg` while maintaining the color palette enforcement. |
| ARCH-02 | Ensure the build pipeline supports the new visual assets (SVG, GIF/MP4). | Explores how new media types interact with the native `.svg` filters and how `build-template.js` can unwrap non-paired `<picture>` tags. |
</phase_requirements>

# Phase 6: Pipeline Foundation - Research

**Researched:** 2026-04-12
**Domain:** Node.js Build Scripts & Pipeline Validation
**Confidence:** HIGH

## Summary

This phase requires updating the custom asset build pipeline (`verify-svgs.js` and `build-template.js`) to elegantly support assets that are exclusively intended for a dark-themed visual experience without corresponding light-mode counterparts. The primary modifications involve bypassing strict pair validation for specific file naming conventions (`-dark-only.svg`), ensuring theme colors are still validated, and adjusting the template compilation script to unwrap single images from `<picture>` wrappers.

**Primary recommendation:** Use simple regex and string matching to update `verify-svgs.js` logic and extract full matched tags in `build-template.js` to support new extensions.

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `fs` | Native | File system operations | Zero-dependency, fast, natively available. |
| `path` | Native | File path manipulation | Zero-dependency, reliable standard library. |
| `assert` | Native | Validation and error throwing | Project standard (established in prior phases). |

**Installation:**
No new dependencies are required for this phase.

## Architecture Patterns

### Pattern 1: Extending Validation Logic
**What:** Modifying the SVG validation script to handle the `-dark-only.svg` edge case.
**When to use:** When extending the validation rules for the `verify-svgs.js` step.
**Example:**
```javascript
// Check matching dark/light mode variants
const lightFiles = files.filter(f => f.endsWith('-light.svg'));
// Exclude -dark-only from the strict pair checking array
const strictDarkFiles = files.filter(f => f.endsWith('-dark.svg') && !f.endsWith('-dark-only.svg'));
const darkOnlyFiles = files.filter(f => f.endsWith('-dark-only.svg'));

// Color validation block update:
if (file.endsWith('-dark.svg') || file.endsWith('-dark-only.svg')) {
  const hasDarkColor = /#94a3b8|#14b8a6|#581c87/i.test(content);
  assert(hasDarkColor, `[${file}] Missing required dark theme colors (#94a3b8, #14b8a6, or #581c87)`);
}
```

### Pattern 2: Single Element Extraction
**What:** Unwrapping the `<picture>` tag in `build-template.js` when only one `<img>` element is present and no `<source>` tags are defined.
**When to use:** To render a single media file across both light and dark modes natively on GitHub.
**Example:**
```javascript
content = content.replace(pictureRegex, (match, inner) => {
  const sourceMatch = inner.match(/<source[^>]*?srcset="([^"]+)"/i);
  const imgMatch = inner.match(/<img([^>]*?)>/i);
  const videoMatch = inner.match(/<video[\s\S]*?>[\s\S]*?<\/video>/i); // For MP4 support
  
  if (sourceMatch && imgMatch) {
    // ... existing dual image logic ...
  }
  
  // Extract and return single image without suffixes
  if (imgMatch) {
    return imgMatch[0]; // Output the <img> tag directly
  }
  
  // Support MP4 fallback if authored inside picture tags
  if (videoMatch) {
    return videoMatch[0];
  }
  
  return match;
});
```

## Common Pitfalls

### Pitfall 1: Extracting Partial Tags
**What goes wrong:** Using `imgMatch[1]` to reconstruct the `<img>` tag in `build-template.js` might cause malformed HTML if the tag is self-closing or contains specific spacing.
**Why it happens:** The regex capture group only captures the attributes, not the full tag wrapper.
**How to avoid:** Use `imgMatch[0]` which contains the full, exact matched `<img>` tag from the source string.

### Pitfall 2: MP4 Support in `<img>` Tags
**What goes wrong:** Adding `<img src="art.mp4">` inside the template because the authoring instructions mentioned "Write these inside `<picture>` tags with a single `<img>`".
**Why it happens:** Browsers (except Safari) generally do not support video formats inside `<img>` tags. GitHub supports MP4s via the `<video>` tag or raw URL embeddings.
**How to avoid:** If algorithmic art is generated as `.mp4`, the template script `build-template.js` must be prepared to also extract `<video>` tags. Otherwise, advise strictly using `.gif` for the generated art.

### Pitfall 3: Failing Validation on Non-SVGs
**What goes wrong:** `verify-svgs.js` crashing when it encounters a `.gif` or `.mp4`.
**Why it happens:** It assumes every file is an SVG and tries to parse `<svg>` roots.
**How to avoid:** Ensure the script explicitly filters for `.endsWith('.svg')`. Currently, `fs.readdirSync(ASSETS_DIR).filter(f => f.endsWith('.svg'))` is active. This perfectly ignores `.gif` or `.mp4` and allows them to bypass the validation natively, fulfilling the "without failing" requirement.

## Code Examples

Verified patterns from existing script contexts:

### Skipping Pair Validation for Dark-Only
```javascript
// Replace the old darkFiles collection to exclude -dark-only
const darkFiles = files.filter(f => f.endsWith('-dark.svg') && !f.endsWith('-dark-only.svg'));
```

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Node.js native (`assert`) |
| Config file | none — see Wave 0 |
| Quick run command | `node scripts/verify-svgs.js && node scripts/build-template.js` |
| Full suite command | `npm run build` |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| ARCH-01 | Script passes when a `-dark-only.svg` exists without a matching `-light.svg` file, and enforces dark colors. | unit/integration | `npm run build` | ✅ Wave 0 |
| ARCH-02 | Script correctly extracts the `<img>` tag (unwrapped) and successfully builds when `.gif`/`.mp4` assets are in the folder. | unit/integration | `npm run build` | ✅ Wave 0 |

### Sampling Rate
- **Per task commit:** `node scripts/verify-svgs.js && node scripts/build-template.js`
- **Per wave merge:** `npm run build`
- **Phase gate:** Full suite green before `/gsd-verify-work`

### Wave 0 Gaps
- None — existing custom test infrastructure covers all phase requirements. Manual asset manipulation (creating a test `-dark-only.svg` and a `.gif`) may be necessary during implementation to verify behavior.

## Sources

### Primary (HIGH confidence)
- Extracted local project codebase (`verify-svgs.js`, `build-template.js`, `generate-assets.js`)
- Local `06-CONTEXT.md` design decisions

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Core built-in libraries already established.
- Architecture: HIGH - Regex modifications are straightforward.
- Pitfalls: HIGH - MP4 browser compatibility is well-documented web knowledge.

**Research date:** 2026-04-12
**Valid until:** Project completion
