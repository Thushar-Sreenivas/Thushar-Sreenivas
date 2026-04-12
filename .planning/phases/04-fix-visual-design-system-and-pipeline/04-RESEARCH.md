# Phase 4: Fix Visual Design System & Pipeline - Research

**Researched:** 2026-04-12
**Domain:** SVG Validation and Build Pipeline Automation
**Confidence:** HIGH

## Summary

The goal of this phase is to establish a robust SVG validation step in the build pipeline to ensure the Frieren visual identity (VISL-01) is strictly adhered to and that custom SVGs (VISL-02) replace generic badges correctly. 

A key constraint derived from previous phases is the absolute adherence to zero dependencies, relying exclusively on Node.js native libraries (`fs`, `path`, `assert`) and regex-based string matching rather than full DOM parsers. The validation script must check for fluid scaling attributes (`viewBox`) and proper theme color codes (`#eab308`, `#0ea5e9`, etc.) within the generated SVG files.

**Primary recommendation:** Create `scripts/verify-svgs.js` using Node native `assert` and regex to validate properties of `assets/images/*.svg`, and integrate it into the `build` script in `package.json`.

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| VISL-01 | Establish "Frieren: Beyond Journey's End" visual language (color palette, typography, thematic headers and dividers) | Regex validation pattern for Frieren theme hex codes in generated SVGs |
| VISL-02 | Replace generic tech stack badges with custom Frieren-themed SVGs or imagery | Asserting existence of `grimoire-*.svg` assets in the build pipeline |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Node `fs` | Native | File system operations | Zero dependency requirement for reading SVGs |
| Node `assert` | Native | Test assertions | Zero dependency alternative to Jest/Mocha |
| Node `path` | Native | Path resolution | Safe cross-platform file paths |

**Installation:**
No installation required. Native Node.js modules only.

## Architecture Patterns

### Recommended Project Structure
```
scripts/
├── generate-assets.js    # Generates SVGs to assets/images/
├── build-template.js     # Transforms template
├── verify-content.js     # Validates text content
└── verify-svgs.js        # NEW: Validates SVG properties
```

### Pattern 1: Regex-based SVG Validation
**What:** Validating XML/SVG attributes using regular expressions instead of a DOM parser.
**When to use:** When enforcing zero dependencies and checking simple attributes like `viewBox` or specific color codes.
**Example:**
```javascript
const fs = require('fs');
const assert = require('assert');

const content = fs.readFileSync('path/to/icon.svg', 'utf8');

// Validate viewBox exists
assert(/viewBox="[^"]+"/.test(content), 'SVG missing viewBox attribute');

// Validate width is relative (100%)
assert(/width="100%"/.test(content), 'SVG width must be fluid (100%)');

// Validate specific Frieren theme colors exist
assert(/#eab308|#0ea5e9/.test(content), 'SVG missing primary theme colors');
```

### Pattern 2: Build Pipeline Integration
**What:** Chaining validation scripts via npm standard scripts.
**When to use:** To ensure that assets are generated before they are validated.
**Example:**
```json
"scripts": {
  "build": "node scripts/generate-assets.js && node scripts/verify-svgs.js && node scripts/build-template.js && node scripts/verify-content.js",
  "test": "npm run build"
}
```

### Anti-Patterns to Avoid
- **DOM Parsers (jsdom/xmldom):** Do not install third-party parsers. Rely on simple regex as per Phase 3 decisions.
- **Hardcoded pixel dimensions:** `<svg width="800" height="200">` is an anti-pattern for GitHub profiles on mobile. Must use `viewBox` and `width="100%"`.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Assertions | Custom if/throw logic | `require('assert')` | Native assert provides clear diffs and standardized error codes |
| Directory iteration | Custom recursive loops | `fs.readdirSync` with filters | SVG assets are flat in `assets/images/`, keeping it simple |

**Key insight:** Keep validation tightly scoped to the specific attributes (viewBox, colors) instead of attempting to build a generic SVG linter.

## Common Pitfalls

### Pitfall 1: Brittle Regex for Attributes
**What goes wrong:** Regex like `viewBox="0 0 800 200"` fails if spaces change.
**Why it happens:** Inconsistent generation or minor tweaks in the asset generator.
**How to avoid:** Use flexible attribute matchers: `/viewBox="[\d\s]+"/i`.

### Pitfall 2: Validating Before Generation
**What goes wrong:** `verify-svgs.js` fails on the first run because SVGs don't exist yet.
**Why it happens:** Running verification before `generate-assets.js` in the npm scripts.
**How to avoid:** Ensure the execution order in `package.json` is `generate-assets.js` -> `verify-svgs.js`.

## Code Examples

Verified patterns from official sources:

### Reading Directory for Validation
```javascript
const path = require('path');
const fs = require('fs');

const svgDir = path.join(__dirname, '../assets/images');
const files = fs.readdirSync(svgDir).filter(f => f.endsWith('.svg'));

files.forEach(file => {
  const content = fs.readFileSync(path.join(svgDir, file), 'utf8');
  // run assertions
});
```

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Node.js Native Assert |
| Config file | none — see Wave 0 |
| Quick run command | `node scripts/verify-svgs.js` |
| Full suite command | `npm run build` |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| VISL-01 | SVGs contain Frieren theme color codes | unit | `node scripts/verify-svgs.js` | ❌ Wave 0 |
| VISL-01 | SVGs contain viewBox and width="100%" | unit | `node scripts/verify-svgs.js` | ❌ Wave 0 |
| VISL-02 | Replacement grimoire/badge SVGs exist | smoke | `node scripts/verify-svgs.js` | ❌ Wave 0 |

### Sampling Rate
- **Per task commit:** `node scripts/verify-svgs.js`
- **Per wave merge:** `npm run build`
- **Phase gate:** Full suite green before `/gsd-verify-work`

### Wave 0 Gaps
- [ ] `scripts/verify-svgs.js` — covers VISL-01, VISL-02 validation logic.
- [ ] Update `package.json` build script to include SVG verification.

## Sources

### Primary (HIGH confidence)
- `.planning/STATE.md` - Verified zero-dependency constraints and fluid scaling approach.
- `package.json` - Verified current pipeline architecture.
- `scripts/generate-assets.js` - Verified exact output paths and color palette used in SVGs.

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Directly follows decisions in STATE.md
- Architecture: HIGH - Mapped from existing Phase 3 script conventions
- Pitfalls: HIGH - Node filesystem and regex matching constraints are well-known

**Research date:** 2026-04-12
**Valid until:** 2026-05-12
