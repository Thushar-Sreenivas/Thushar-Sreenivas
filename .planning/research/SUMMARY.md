# Project Research Summary

**Project:** GitHub Profile v1.1 Visual Overhaul
**Domain:** GitHub Profile README / Markdown SVGs & Animations
**Researched:** 2026-04-12
**Confidence:** HIGH

## Executive Summary

This project focuses on a high-fidelity visual overhaul of a GitHub Profile README, specializing in "Frieren" themed aesthetics and dynamic algorithmic background art. Given GitHub's strict markdown sanitization and Camo proxy caching limitations, the architecture relies entirely on static, pre-rendered asset generation rather than client-side web technologies. Assets must be compiled into SVG or MP4 formats beforehand to guarantee rendering on the platform.

The recommended approach embraces a hybrid manual and scripted generation pipeline. Node.js handles data-fetching and structural SVG creation utilizing tools like Satori, while algorithmic art is driven by p5.js. Because GitHub strips scripts and advanced interactives from embedded SVGs, any interactions must be managed through top-level Markdown hyperlinking and targeted CSS hashes (like `#gh-dark-mode-only`).

Key risks center around GitHub platform restrictions: external fonts failing to render within SVGs, massive animated GIFs crashing behind the Camo proxy, and SVG-internal interactivity being silently sanitized away. These are mitigated by "baking" text into raw SVG paths using opentype.js, employing looping `.mp4` tags in Markdown instead of bloated GIFs, and strictly validating dark-theme-exclusive assets during CI builds.

## Key Findings

### Recommended Stack

The tech stack relies heavily on build-time pre-generation to sidestep GitHub's restrictive content rendering policies.

**Core technologies:**
- **Node.js (20+)**: Asset Generation — Core runner for validation scripts and data retrieval.
- **Satori (^0.10.0)**: Dynamic SVG Generation — Offers React-like syntax for generating complex, laid-out SVG stats components.
- **Playwright / FFmpeg**: Verification & Video Capture — Validates SVG generation and encodes algorithmic art frames into lightweight `.mp4` payloads.
- **GitHub GraphQL API**: Grimoire Stats — Native, robust data fetching for profile activity updates.
- **p5.js & opentype.js**: Asset Pipelines — Powers algorithmic generation and typography "baking" (converting fonts to `<path>`) respectively.

### Expected Features

**Must have (table stakes):**
- Dark/Light Theme Switching — Users expect visual consistency (managed via GitHub mode-specific hashes).
- Responsive Layout — Profile must format correctly across mobile and desktop apps.
- Accessible Alt Text — Critical for screen readers and SEO integrity.

**Should have (competitive):**
- Algorithmic Video Background — Proves technical capacity and visual distinctiveness.
- "Frieren" Themed SVGs — Delivers deep personalization and aesthetic flair.
- Dynamic Stats (Grimoire) — Automatically updates profile data via GitHub Actions.
- Clickable Easter Eggs — Wraps SVGs in Markdown-level links for interactive discovery.

**Defer (v2+):**
- Complex MP4 CI capture — Defer complex automated mp4 capture (start with optimized small GIFs/videos first).

### Architecture Approach

The application uses a segmented static asset generation pipeline to translate scripts into Markdown components.

**Major components:**
1. **`verify-svgs.js`** — Pre-verification logic updated to selectively whitelist and approve dark-theme-only assets without failing builds due to missing light variants.
2. **`generate-assets.js`** — Node.js script responsible for calling Satori, converting fonts to `<path>`, and outputting the "Frieren" themed SVGs into the `assets/images/` directory.
3. **`build-template.js`** — Generates the final `README.md` by injecting hashes and handling direct markdown `.mp4` and `#gh-dark-mode-only` `<img>` targets.

### Critical Pitfalls

1. **Interactive SVG Delusion:** `<a href>` and `:hover` states break completely inside GitHub `<img>` embeds. **Avoid by:** Wrapping the entire `<img src...>` in Markdown links `[![alt](img)](link)` and using autonomous keyframe animations.
2. **Camo Proxy Cache Limits:** GIFs >5MB fail to render or kill mobile scrolling. **Avoid by:** Exporting to highly compressed `.mp4` files using FFmpeg instead of GIF formats.
3. **External Font Blocking:** GitHub blocks external font loading within SVGs. **Avoid by:** Baking typography into raw `<path>` components using opentype.js or Satori's strict TTF loading flags.
4. **Stale Dynamic SVGs:** GitHub Actions don't bust the Camo image cache naturally. **Avoid by:** Having the build script append a unique commit hash parameter to the image tag `src="stats.svg?v=a1b2c"` in the README.

## Implications for Roadmap

Based on research, suggested phase structure:

### Phase 1: Foundation & Verification Updates
**Rationale:** The existing project scripts will fail if dark-only SVGs are added. CI/CD must be updated before asset work begins.
**Delivers:** Modified `verify-svgs.js` (dark-only whitelist) and updated `README.template.md` leveraging hash-based theme logic.
**Addresses:** Dark/Light Theme Switching, Responsive Layout.
**Avoids:** Failing builds for missing light-mode pairs; dummy asset generation clutter.

### Phase 2: Complex SVG Generation
**Rationale:** Typographical assets are the core differentiator and form the aesthetic base for the remaining dynamic stats.
**Delivers:** Node.js generator utilizing Satori and opentype.js to construct Frieren-themed visual banners.
**Uses:** Node.js, Satori, opentype.js.
**Addresses:** "Frieren" Themed SVGs, Clickable Easter Eggs.
**Avoids:** External Font Blocking (Pitfall 3) and Interactive SVG Delusion (Pitfall 1).

### Phase 3: Dynamic Stats Integration
**Rationale:** Automating dynamic generation is an extension of the Satori-driven pipeline established in Phase 2.
**Delivers:** Scheduled GitHub Action workflows hitting GraphQL API to update stats data and append cache-busters.
**Uses:** GitHub Actions, GitHub GraphQL API.
**Addresses:** Dynamic Stats (Grimoire).
**Avoids:** Stale Dynamic SVGs (Pitfall 4).

### Phase 4: Algorithmic Background Animation
**Rationale:** The p5.js to FFmpeg pipeline is the most uncertain module; pushing to Phase 4 prevents blockers on core functionality.
**Delivers:** p5.js art script and the final rendering output into a looped `hero-bg-dark.mp4` (or optimized gif) referenced in markdown.
**Uses:** p5.js, Playwright, FFmpeg.
**Addresses:** Algorithmic Background.
**Avoids:** Camo Proxy Cache Limits (Pitfall 2).

### Phase Ordering Rationale

- **Dependency Order:** Modifying build rules must precede adding complex SVGs, and aesthetic pipelines (Satori) must precede dynamic CI generation.
- **Risk Mitigation:** The riskiest component (the algorithmic background integration with GitHub's restrictive Camo limits) is isolated at the end so core stats and styling remain unaffected if timeline constraints apply.

### Research Flags

Phases likely needing deeper research during planning:
- **Phase 4:** Video encoding optimizations and integration limits for GitHub `.mp4` support require precise FFmpeg configuration parameters to guarantee autoplaying functionality on all platforms.

Phases with standard patterns (skip research-phase):
- **Phase 1, 2, 3:** Standard regex parsing, assertion updates, and React-to-SVG implementations using Satori are highly documented and straightforward.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Tools like Satori and p5.js are industry standard for static visual generation. |
| Features | HIGH | Constraints for Markdown rendering map 1:1 with proposed features. |
| Architecture | HIGH | Exact boundaries (`verify-svgs.js`, `build-template.js`) exist and are thoroughly mapped. |
| Pitfalls | HIGH | Pitfalls precisely track known GitHub Camo, SVG injection, and cache behaviors. |

**Overall confidence:** HIGH

### Gaps to Address

- **Algorithmic Video Compatibility:** Best FFmpeg encoding format settings to ensure seamless, native autoplay on both iOS GitHub app and Desktop web interface.

## Sources

### Primary (HIGH confidence)
- Official GitHub Documentation — Markdown mode-specific rendering hashes (`#gh-dark-mode-only`) and image embedding.
- Project Source Code — `scripts/verify-svgs.js` and `scripts/build-template.js` constraints.

### Secondary (MEDIUM confidence)
- Satori Documentation — Font loading and path baking syntax.

---
*Research completed: 2026-04-12*
*Ready for roadmap: yes*