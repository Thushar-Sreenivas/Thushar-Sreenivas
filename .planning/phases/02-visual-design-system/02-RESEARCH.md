# Phase 2: Visual Design System - Research

**Researched:** 2026-04-12
**Domain:** SVG Generation, GitHub Markdown Theming, Visual Asset Creation
**Confidence:** HIGH

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- **Primary Theme**: Frieren (Light/Ethereal) — white, gold, and soft blue accents.
- **Light/Dark Mode**: "Character Shift" — Use Frieren colors for GitHub Light mode and Fern colors (deep purples, dark blues, silver) for GitHub Dark mode.
- **Accents**: "Magical Glow" — Gold/Yellow highlights in light mode, Silver/Teal highlights in dark mode.
- **Backgrounds**: All custom SVGs should have transparent backgrounds to blend naturally with GitHub's UI.
- **Section Headers**: Top-level headers (H2s) will use custom SVGs with an elegant, serif/fantasy-inspired font (e.g., Cinzel or EB Garamond). Sub-sections will remain standard Markdown.
- **Dividers**: Visual dividers between sections will be SVGs depicting a row of small magical runes.
- **Visual Metaphor**: Technologies are represented as spellbooks/grimoires.
- **Layout**: "Bookshelf SVGs" — A single SVG shelf containing all grimoires for a specific category.
- **Tech Identity**: The official logo for each technology (e.g., React, Go) is "engraved" on the cover of its grimoire.
- **Grouping**: Grouped by domain (e.g., Frontend, Backend, Tooling).
- **Style Constraints**: Use abstract magical elements and props (staves, flowers, auras). Avoid drawing full characters or silhouettes.
- **Hero Banner**: The top visual should feature a field of blue moon weed (Aurel) flowers in a soft breeze.
- **Quote Integration**: The core quote ("There's something about making code work that still feels like magic to me.") must be styled directly inside the Hero SVG banner.
- **Footer**: The profile concludes with an SVG showing a fading trail of magical sparks or petals.

### Claude's Discretion
- Exact dimensions and viewBox settings for the SVGs to ensure mobile responsiveness.
- The precise animation styles if any CSS animations are used within the SVGs.
- Minor design details of the grimoires to ensure they look distinct but unified.

### Deferred Ideas (OUT OF SCOPE)
- None — discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| VISL-01 | Establish "Frieren" visual language (palette, typography, headers, dividers) | SVG architecture, GitHub theming syntax, web-safe font fallback strategies |
| VISL-02 | Replace generic tech stack badges with custom Frieren-themed SVGs | SVG composition patterns, scalable viewBox configurations for mobile support |
</phase_requirements>

## Summary

This phase involves creating a suite of pure SVGs that replace standard markdown elements and generic badges with a cohesive, "Frieren"-themed visual identity. Because GitHub Profile READMEs are heavily sanitized by GitHub's Camo image proxy, the technical approach must prioritize inline SVG features and explicit light/dark file variants over complex external stylesheets or embedded media queries. 

**Primary recommendation:** Generate separate `-light.svg` and `-dark.svg` files for every asset, utilize `viewBox` without explicit dimensions for responsive scaling, and integrate them using GitHub's native `<picture>` tags or `#gh-theme-only` URL fragments.

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Raw SVG | SVG 1.1 | Visual asset creation | Only format that allows crystal clear vector scaling and intrinsic animations without JS. |
| GitHub Markdown | Native | Image theming integration | Using `<picture>` tags or URL fragment suffixes is the officially supported way to handle dark/light mode switches. |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Separate light/dark SVGs | Single SVG with CSS `@media (prefers-color-scheme)` | GitHub's Camo caching often breaks inline SVG media queries when displayed via `<img>`. Separate files guarantee correct rendering. |
| Custom external fonts | Standard web-safe serif fonts | External fonts fail in `<img>` rendered SVGs due to CORS. If exact custom fonts are required, text must be converted to SVG paths beforehand. Using an elegant web-safe fallback like `Georgia, serif` is zero-dependency. |

## Architecture Patterns

### Recommended Project Structure
```
assets/
├── hero-light.svg
├── hero-dark.svg
├── divider-light.svg
├── divider-dark.svg
├── header-experience-light.svg
├── header-experience-dark.svg
├── stack-frontend-light.svg
├── stack-frontend-dark.svg
```

### Pattern 1: Responsive SVG Canvas
**What:** SVGs configured to scale intrinsically to the container width, rather than maintaining a fixed pixel size.
**When to use:** All SVGs (Hero, Dividers, Bookshelves) to ensure they look correct on both the desktop website and the GitHub Mobile App.
**Example:**
```xml
<!-- Good: Fluid scaling -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 200" fill="none">
    <!-- SVG Content -->
</svg>
```

### Pattern 2: GitHub Theme Injection
**What:** Using standard HTML `<picture>` elements inside the Markdown to swap SVGs based on the active GitHub theme.
**When to use:** When rendering the Hero, Headers, and Bookshelves inside `README.template.md`.
**Example:**
```html
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="./assets/hero-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="./assets/hero-light.svg">
  <img alt="Hero Banner" src="./assets/hero-light.svg" width="100%">
</picture>
```
*Alternatively, standard Markdown syntax using fragments:*
```markdown
![Hero Banner](./assets/hero-light.svg#gh-light-mode-only)
![Hero Banner](./assets/hero-dark.svg#gh-dark-mode-only)
```

### Anti-Patterns to Avoid
- **Anti-pattern:** Using `<image href="https://external.../icon.png">` inside the SVG. GitHub's proxy will often fail to load external sub-resources for security and privacy reasons, rendering broken icons. Always use native `<path>` data for tech logos.
- **Anti-pattern:** Explicit `width="800"` and `height="400"` on the `<svg>` root. This causes the image to overflow the container on mobile devices, breaking the GitHub mobile experience.
- **Anti-pattern:** Relying on `@font-face` inside the SVG. GitHub strips/blocks webfonts from loading in images.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Tech Logos | Hand-drawing tech logos from scratch | Existing SVG path data | Complex curves (e.g., the React atom, Go gopher outline) are tedious to hand-code. Use standard paths mapped onto the grimoire designs. |
| SVGO Optimizations | Manual regex scrubbing of SVG code | Just write clean SVGs | We are generating standard XML. Keep it simple and legible so it can be updated easily. |

**Key insight:** SVGs in a GitHub profile are served as isolated images. They cannot execute JS, cannot fetch external fonts securely, and their internal media queries are notoriously flaky in the GitHub environment. Treat them as static, standalone vectors.

## Common Pitfalls

### Pitfall 1: Text Rendering Discrepancy
**What goes wrong:** Text looks beautiful (using Cinzel) on the developer's machine but falls back to Times New Roman on the viewer's machine.
**Why it happens:** The viewer doesn't have the font installed, and the SVG `<img>` context blocks external web font fetching.
**How to avoid:** Define a robust web-safe fallback stack (`font-family="Cinzel, Georgia, 'Times New Roman', serif"`) or convert the exact quote text to paths if absolute precision is required. Given the context, using `Georgia` with strategic `letter-spacing` creates an elegant fantasy feel without dependencies.

### Pitfall 2: Animation Clipping
**What goes wrong:** CSS animations inside the SVG (like floating petals or glowing runes) suddenly disappear or get cut off.
**Why it happens:** The animated elements move outside the bounds of the `viewBox`.
**How to avoid:** Ensure the `viewBox` is padded sufficiently so that elements (like auras or sparks) remain visible during their entire animation cycle.

## Code Examples

Verified patterns from official sources:

### Grimoire SVG Structure
```xml
<!-- Example of a single tech grimoire inside the bookshelf -->
<g transform="translate(150, 50)">
  <!-- Book Cover -->
  <rect x="0" y="0" width="60" height="120" rx="4" fill="#2E2E48" stroke="#D4AF37" stroke-width="2"/>
  <!-- Spine Accents -->
  <path d="M5 10 L55 10 M5 110 L55 110" stroke="#D4AF37" stroke-width="1.5"/>
  <!-- Tech Logo (e.g., React Path) -->
  <path transform="translate(15, 30) scale(0.6)" fill="#61DAFB" d="M15 15 c 0 0 ..."/>
  <!-- Grimoire Title -->
  <text x="30" y="100" font-family="Georgia, serif" font-size="10" fill="#E2E8F0" text-anchor="middle" letter-spacing="1">REACT</text>
</g>
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Shields.io Badges | Custom themed SVGs | General Trend | Elevates profile from generic resume to digital identity |
| SVG Media Queries | GitHub Theme URL fragments | 2021 | Allows reliable theme switching without relying on buggy SVG caching behavior |

## Open Questions

1. **How intricate should the flower/petal animations be?**
   - What we know: The Hero and Footer should have magical vibes. CSS animations in SVGs *do* work on GitHub.
   - What's unclear: If complex keyframes will distract from the content or cause performance issues.
   - Recommendation: Keep animations subtle (e.g., slow opacity pulsing for stars/runes, gentle `translateY` floating for petals) using standard CSS `@keyframes` embedded within the SVG `<style>` tag.

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Node.js native assert |
| Config file | none — see Wave 0 |
| Quick run command | `node scripts/verify-svgs.js` |
| Full suite command | `node scripts/verify-svgs.js` |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| VISL-01 | Headers/Dividers exist in light/dark variants | unit | `node scripts/verify-svgs.js` | ❌ Wave 0 |
| VISL-02 | Bookshelf SVGs exist and use `viewBox` | unit | `node scripts/verify-svgs.js` | ❌ Wave 0 |

### Sampling Rate
- **Per task commit:** `node scripts/verify-svgs.js`
- **Per wave merge:** `node scripts/verify-svgs.js`
- **Phase gate:** Full suite green before `/gsd-verify-work`

### Wave 0 Gaps
- [ ] `scripts/verify-svgs.js` — covers VISL-01 and VISL-02 (needs to check SVG formatting rules: no hardcoded widths/heights, no external image hrefs, correct pairs).

## Sources

### Primary (HIGH confidence)
- GitHub Official Docs - Theme context for images: `https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#specifying-the-theme-an-image-is-shown-to`

### Secondary (MEDIUM confidence)
- General Web SVG spec regarding `viewBox` vs `width`/`height` for responsive design.
- Known limitations of GitHub's Camo image proxy regarding external resource fetching inside SVGs.

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - GitHub's `<picture>` and `#gh-mode` syntax are the official specs.
- Architecture: HIGH - Dual SVGs are the only completely bulletproof way to handle GitHub's caching.
- Pitfalls: HIGH - CORS blocking and font un-availability in `<img>` embedded SVGs is a fundamental web security/privacy standard.

**Research date:** 2026-04-12
**Valid until:** 2026-10-12
