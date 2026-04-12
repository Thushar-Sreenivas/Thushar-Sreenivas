# Architecture Research

**Domain:** GitHub Profile Visual Architecture
**Researched:** 2026-04-12
**Confidence:** HIGH

## Standard Architecture

### System Overview

```text
┌─────────────────────────────────────────────────────────────┐
│                       Data Pipeline                          │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐    ┌─────────────────┐                 │
│  │ Algorithmic Art │    │ generate-assets │                 │
│  │ Skill / Prompt  │    │ (Node.js script)│                 │
│  └───────┬─────────┘    └────────┬────────┘                 │
│          │                       │                          │
├──────────┼───────────────────────┼──────────────────────────┤
│          │          Asset Layer  │                          │
├──────────┼───────────────────────┼──────────────────────────┤
│  ┌───────▼─────────┐    ┌────────▼────────┐                 │
│  │ assets/images/  │    │ assets/images/  │                 │
│  │ hero-bg-dark.gif│    │ complex-*.svg   │                 │
│  └───────┬─────────┘    └────────┬────────┘                 │
│          │                       │                          │
├──────────┼───────────────────────┼──────────────────────────┤
│          │        Verification   │                          │
├──────────┼───────────────────────┼──────────────────────────┤
│  ┌───────▼───────────────────────▼─────────────────┐        │
│  │ verify-svgs.js                                  │        │
│  │ (Updated with dark-only exemptions & GIF check) │        │
│  └───────────────────────┬─────────────────────────┘        │
│                          │                                  │
├──────────────────────────┼──────────────────────────────────┤
│                  Build & Render Layer                       │
├──────────────────────────┼──────────────────────────────────┤
│  ┌───────────────────────▼─────────────────────────┐        │
│  │ README.template.md                              │        │
│  │ (using <img src="..."#gh-dark-mode-only>)       │        │
│  └───────────────────────┬─────────────────────────┘        │
│                          │                                  │
│  ┌───────────────────────▼─────────────────────────┐        │
│  │ build-template.js (pass-through for <img>)      │        │
│  └───────────────────────┬─────────────────────────┘        │
│                          ▼                                  │
│                      README.md                              │
└─────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Typical Implementation |
|-----------|----------------|------------------------|
| `generate-assets.js` | Generates programmatic complex SVGs exclusively for the dark theme. | Node.js script using string interpolation for SVG nodes. |
| `verify-svgs.js` | Validates asset existence, enforces Frieren theme colors, and allows deliberate exemptions for dark-only assets. | Node.js script using native `assert`. |
| Algorithmic Art Pipeline | Generates the core background GIF using the `algorithmic-art` skill and a structured prompt via Claude Code. | Claude Code + p5.js HTML Viewer + Manual/Automated GIF Capture. |
| `build-template.js` | Parses the template into the final README. Must support bypassing `<picture>` parsing for dark-only `<img>` tags. | Node.js regex replacement script. |

## Recommended Project Structure

```text
/
├── assets/
│   └── images/
│       ├── hero-bg-dark.gif       # Output of algorithmic-art generation
│       └── complex-banner-dark.svg# Output of generate-assets.js
├── scripts/
│   ├── generate-assets.js         # Modified to handle complex dark-theme SVGs
│   ├── verify-svgs.js             # Modified to exempt specific dark-only assets
│   └── build-template.js          # Unmodified (passes through <img> tags)
├── README.template.md             # Updated to use direct dark-only <img> tags
└── README.md                      # Final output
```

### Structure Rationale

- **`assets/images/`:** Keeps the GIF and SVGs together. GIF is committed manually once generated; SVGs are regenerated via script.
- **`verify-svgs.js` Exemption:** The existing script strictly validates light/dark pairs. Introducing dark-theme-exclusive assets requires modifying this script to prevent build failures.

## Architectural Patterns

### Pattern 1: Target-Specific Verification Exemptions

**What:** Adding explicit exceptions in `verify-svgs.js` for new complex SVGs that only have dark-theme variants, allowing them to pass CI checks without requiring an empty or dummy light-theme file.
**When to use:** During transitional milestones or feature branches where one theme is the explicit focus.
**Trade-offs:** Increases verification logic complexity, but avoids cluttering the repository with dummy files.

**Example:**
```javascript
const DARK_ONLY_ASSETS = ['complex-banner', 'grimoire-frontend'];

darkFiles.forEach(df => {
  const base = df.replace('-dark.svg', '');
  if (!DARK_ONLY_ASSETS.includes(base)) {
    assert(lightFiles.includes(`${base}-light.svg`), `Missing light variant for ${df}`);
  }
});
```

### Pattern 2: Hash-Based Markdown Image Targeting

**What:** Using direct `<img src="path.gif#gh-dark-mode-only">` tags in `README.template.md` instead of the more verbose `<picture>` syntax.
**When to use:** When you have an asset that is explicitly meant to be shown *only* in one specific theme, and there is no fallback required for the other theme.
**Trade-offs:** `build-template.js` currently targets `<picture>` tags to generate dual-hashes. Direct `<img>` tags will simply be passed through by the build script, cleanly bypassing the `<picture>` parsing logic without requiring modifications to `build-template.js`.

### Pattern 3: Hybrid Manual/Scripted Asset Generation

**What:** Mixing fully automated SVG generation (`generate-assets.js`) with one-off manual algorithmic artifact generation (Claude Code `algorithmic-art` output captured to `.gif`).
**When to use:** For complex browser-dependent visual outputs (like canvas/p5.js generated GIFs) where setting up headless Chromium in CI just to generate a static profile background is overkill.

## Data Flow

### Asset Generation and Build Flow

```text
[Developer Action]
    ↓ (Runs Claude Code with algorithmic-art prompt)
[p5.js HTML Artifact] → [Manual GIF Capture] → [Save to assets/images/hero-bg-dark.gif]
    
[Developer Action]
    ↓ (Runs npm run build)
[generate-assets.js] → [Outputs complex-*-dark.svg to assets/images/]
    ↓
[verify-svgs.js] ← [Reads assets/images/, checks for GIF, applies dark-only exemptions]
    ↓
[build-template.js] ← [Reads README.template.md]
    ↓
[README.md]
```

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| 1-3 complex SVGs | Current `generate-assets.js` string interpolation is fine. |
| 10+ complex SVGs | Consider moving SVG generation logic into dedicated factory functions or migrating from pure string manipulation to an SVG builder library (like `satori` or `svg-builder`) to manage node complexity. |
| GIF File Size | An algorithmic GIF can become massive. The capture process must prioritize low frame rates (10-15fps) and aggressive color reduction to keep the final payload under 3MB to prevent GitHub caching timeouts. |

## Anti-Patterns

### Anti-Pattern 1: Generating Dummy Light-Mode Assets

**What people do:** Creating empty, transparent, or cloned `*-light.svg` files just to satisfy the `verify-svgs.js` pairing checks.
**Why it's wrong:** Clutters the `assets` directory, increases the payload size unnecessarily, and obscures the explicit intent that this milestone is for dark-theme exclusive assets.
**Do this instead:** Modify `verify-svgs.js` to whitelist dark-only assets using a specific naming convention or array map.

### Anti-Pattern 2: Attempting Headless GIF Generation in the Build Script

**What people do:** Integrating Puppeteer or Playwright into `generate-assets.js` to load the p5.js art and record frames into a GIF during `npm run build`.
**Why it's wrong:** Drastically increases dependencies (downloading Chromium), bloats the repository, makes local generation extremely slow, and violates the constraint of keeping infrastructure minimal and self-contained within standard Node.js limits.
**Do this instead:** Treat the GIF as a one-off static asset generated locally by the developer via the skill prompt, and commit the resulting `.gif` binary.

## Integration Points

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| `generate-assets.js` ↔ `verify-svgs.js` | File System | `verify-svgs.js` must be updated *before* generating the new complex dark assets, otherwise the build will instantly fail. |
| Template ↔ `build-template.js` | Regex Parsing | Direct `<img src="#gh-dark-mode-only">` tags will be ignored by `build-template.js` (which searches for `<picture>`), which is the exact behavior we want. |

## Suggested Build Order

1. **Verification Updates:** Update `verify-svgs.js` to allow specific assets to skip the light-mode pairing check, and add an assertion to verify `hero-bg-dark.gif` exists.
2. **SVG Generation:** Update `generate-assets.js` to output the new complex dark-theme SVGs.
3. **Template Updates:** Add the standalone `#gh-dark-mode-only` image tags to `README.template.md` pointing to the new SVGs and GIF.
4. **GIF Generation:** Use Claude Code with the `algorithmic-art` skill to generate the p5.js viewer, record the GIF, and place it in the `assets/images/` directory.

## Sources

- **HIGH CONFIDENCE**: Official GitHub documentation on markdown mode-specific rendering hashes (`#gh-dark-mode-only`).
- **HIGH CONFIDENCE**: Existing `scripts/verify-svgs.js` code structure requiring updates for unilateral theme generation.
- **HIGH CONFIDENCE**: Existing `scripts/build-template.js` regex structure relying on `<picture>` wrappers.

---
*Architecture research for: GitHub Profile Readme — Algorithmic Art GIF and Complex SVGs*
*Researched: April 12, 2026*
