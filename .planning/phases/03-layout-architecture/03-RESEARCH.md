<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
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

### Deferred Ideas (OUT OF SCOPE)
- None — discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| LAYT-01 | Implement template-driven architecture (`README.template.md` and build script) for generating final Markdown | Native Node.js `fs` module, simple regex replacement logic, GitHub Actions |
| LAYT-02 | Ensure layout is fully responsive and does not break on GitHub Mobile app | SVG `viewBox` attribute behavior over fixed `width`/`height` |
| LAYT-03 | Guarantee visual robustness across both Light and Dark mode GitHub settings using `#gh-dark-mode-only` patterns | GitHub standard Markdown image `#gh-light-mode-only` / `#gh-dark-mode-only` fragments |
</phase_requirements>

# Phase 3: Layout & Architecture - Research

**Researched:** 2026-04-11
**Domain:** Build System, Responsive SVG Layout, GitHub Markdown Theming
**Confidence:** HIGH

## Summary

This phase focuses on creating a reliable, zero-dependency build pipeline that processes `README.template.md` and outputs a platform-optimized `README.md`. It involves implementing regex-based asset replacement to leverage GitHub's native theme-switching URL fragments (`#gh-dark-mode-only` / `#gh-light-mode-only`) and ensuring all SVGs use the `viewBox` attribute for natural responsiveness on mobile devices.

**Primary recommendation:** Use a native Node.js script for the build process utilizing a robust regular expression to swap `<picture>` tags into standard Markdown image tags, wrapped in a single `npm run build` command, and automated via `stefanzweifel/git-auto-commit-action` in a `.github/workflows/build.yml` GitHub Action.

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Node.js `fs` / `path` | native | File processing and manipulation | Zero-dependency requirement, built-in reliability |
| `stefanzweifel/git-auto-commit-action` | v5 | GitHub Action to automatically commit built files | De-facto standard for pushing changes back to the repo from Actions without infinite loops |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Native Node.js Regex | Remark / unified ecosystem | Would violate the zero-dependency rule; much heavier setup for a simple string replacement task. |

**Installation:**
No NPM dependencies required (`npm install` is not needed).
Update `package.json` to include:
```json
"scripts": {
  "build": "node scripts/generate-assets.js && node scripts/build-template.js && node scripts/verify-content.js"
}
```

## Architecture Patterns

### Recommended Project Structure
```
/
├── .github/
│   └── workflows/
│       └── build.yml       # GitHub Action for CI automation
├── scripts/
│   ├── build.js            # Main build orchestrator (optional, or rely on npm run build)
│   ├── generate-assets.js  # Produces SVGs (modified to use viewBox)
│   └── verify-content.js   # Asserts final content (the build gate)
├── assets/images/          # Output directory for generated SVGs
├── README.template.md      # Source narrative
└── package.json            # Contains the "build" script
```

### Pattern 1: Regex Replacement for GitHub Theming
**What:** Convert complex HTML `<picture>` elements into dual Markdown images with theme fragments.
**When to use:** When supporting GitHub's native Light/Dark modes in pure Markdown.
**Example:**
```javascript
// Matches `<picture>...<source srcset="dark.svg">...<img src="light.svg" alt="Text">...</picture>`
const pictureRegex = /<picture>[\s\S]*?<source[^>]*srcset="([^"]+)"[^>]*>[\s\S]*?<img[^>]*src="([^"]+)"[^>]*alt="([^"]*)"[^>]*>[\s\S]*?<\/picture>/gi;

const finalReadme = template.replace(pictureRegex, (match, darkSrc, lightSrc, altText) => {
  return `![${altText}](${lightSrc}#gh-light-mode-only)\n![${altText}](${darkSrc}#gh-dark-mode-only)`;
});
```

### Pattern 2: Responsive SVGs via ViewBox
**What:** Dropping absolute `width`/`height` in SVGs and adopting intrinsic ratio properties.
**When to use:** Whenever SVGs need to fluidly scale in an `<img>` tag or Markdown.
**Example:**
```html
<!-- Avoid: -->
<svg width="800" height="200" xmlns="...">

<!-- Use instead: -->
<svg viewBox="0 0 800 200" width="100%" xmlns="...">
```
*(Note: Adding `width="100%"` alongside `viewBox` is technically optional in GitHub Markdown since `img` max-width forces scaling, but it's a good fail-safe.)*

### Anti-Patterns to Avoid
- **Hardcoding `width` and `height` in SVGs:** Causes horizontal scrolling on mobile GitHub apps.
- **Using HTML in Markdown:** Some GitHub client versions strip HTML `<picture>` tags aggressively. Pure Markdown with URL fragments is officially supported.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| CI Auto-committing | Custom `git config` and `git push` bash scripts in GitHub Actions | `stefanzweifel/git-auto-commit-action@v5` | Handles edge cases, avoids infinite action triggering out of the box (GITHUB_TOKEN prevents re-triggering), handles dirty/clean state gracefully. |

**Key insight:** Using standard GitHub actions for git operations prevents CI headaches and accidental recursion.

## Common Pitfalls

### Pitfall 1: Missing or Reordered HTML Attributes in Template
**What goes wrong:** Regex fails to match `<picture>` tags if `alt` is placed before `src`, or if newlines are introduced differently.
**Why it happens:** Regex targeting HTML is brittle.
**How to avoid:** Use a robust regex that uses `[\s\S]*?` to skip over non-relevant attributes and captures `srcset`, `src`, and `alt` independently of their order. (The provided example accounts for this).

### Pitfall 2: Infinite CI Build Loops
**What goes wrong:** GitHub Action pushes a commit (`README.md`), which triggers another GitHub Action run, which pushes another commit, ad infinitum.
**Why it happens:** A Personal Access Token (PAT) is used instead of the default `GITHUB_TOKEN`.
**How to avoid:** Rely on the default `${{ secrets.GITHUB_TOKEN }}`. GitHub intentionally prevents commits pushed by this token from triggering new workflow runs.

### Pitfall 3: Broken Relative Paths in Build
**What goes wrong:** Assets break because the build script is run from `scripts/` instead of the root directory.
**Why it happens:** Node.js `fs` resolves paths relative to the current working directory (`process.cwd()`), not the script file location.
**How to avoid:** Use `path.join(__dirname, '..', 'README.md')` to ensure paths are strictly absolute relative to the script directory, avoiding execution context ambiguity.

## Code Examples

Verified patterns from official sources:

### [Building the Final Markdown]
```javascript
const fs = require('fs');
const path = require('path');

const templatePath = path.join(__dirname, '..', 'README.template.md');
const outputPath = path.join(__dirname, '..', 'README.md');

const template = fs.readFileSync(templatePath, 'utf8');

const pictureRegex = /<picture>[\s\S]*?<source[^>]*srcset="([^"]+)"[^>]*>[\s\S]*?<img[^>]*src="([^"]+)"[^>]*alt="([^"]*)"[^>]*>[\s\S]*?<\/picture>/gi;

const finalReadme = template.replace(pictureRegex, (match, darkSrc, lightSrc, altText) => {
  return `![${altText}](${lightSrc}#gh-light-mode-only)\n![${altText}](${darkSrc}#gh-dark-mode-only)`;
});

fs.writeFileSync(outputPath, finalReadme);
console.log('✅ Final README.md generated successfully.');
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `<picture>` and `<source>` HTML tags | Standard Markdown image fragments (`#gh-dark-mode-only`) | Nov 2021 | Allows GitHub mobile and web clients to flawlessly render theme-specific images using strict Markdown without HTML fallback quirks. |
| Hardcoded SVG dimensions | `viewBox` driven intrinsic sizing | N/A | Fixes horizontal scrolling on mobile without needing media queries, perfectly integrating into GitHub's `max-width: 100%` container. |

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | native node assert |
| Config file | none — see Wave 0 |
| Quick run command | `npm run build` |
| Full suite command | `npm run build` |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| LAYT-01 | Template build architecture | integration | `npm run build` | ❌ Wave 0 |
| LAYT-02 | Responsive SVG layout | manual | *Visual check on mobile viewport* | ❌ Wave 0 |
| LAYT-03 | Visual robustness Light/Dark | manual | *Visual check on GitHub toggle* | ❌ Wave 0 |

### Wave 0 Gaps
- [ ] `scripts/build-template.js` — covers LAYT-01 (Build step needs implementation)
- [ ] `npm run build` script missing in `package.json`
- [ ] GitHub action `.github/workflows/build.yml` missing

## Sources

### Primary (HIGH confidence)
- Official docs: [GitHub Docs - Specifying the theme an image is shown to](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#specifying-the-theme-an-image-is-shown-to)
- Official GitHub Action: [stefanzweifel/git-auto-commit-action](https://github.com/stefanzweifel/git-auto-commit-action)

### Secondary (MEDIUM confidence)
- W3C SVG viewBox behavior specification

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Minimal zero-dependency node scripts and git-auto-commit are universally used patterns for this.
- Architecture: HIGH - Regex replacement and pipeline approach map cleanly to the stated constraints.
- Pitfalls: HIGH - Known issues with regex brittleness, relative paths, and GH Action loops are highly common.

**Research date:** 2026-04-11
**Valid until:** 2026-05-11