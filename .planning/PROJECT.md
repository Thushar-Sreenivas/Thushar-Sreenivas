# Thushar's GitHub Profile Readme

## What This Is

An awesome, unique GitHub profile README for Thushar Sreenivas. It translates 6+ years of rigorous software engineering experience—from building high-performance browser video pipelines and AI tools to leading frontend architecture—into a human, jargon-free story. The entire profile is creatively themed around the anime "Frieren: Beyond Journey's End".

## Core Value

A beautiful, human-centric profile that clearly communicates Thushar's technical depth, curiosity, and product mindset without relying on dry corporate jargon, all while deeply integrating a "Frieren" visual and thematic aesthetic.

## Current Milestone: v1.1 Visual Overhaul

**Goal:** Complete overhaul of the profile's visual elements, generating stunning algorithmic art for the background (as a GIF) and creating complex, beautiful SVGs specifically for the dark theme.

**Target features:**
- Algorithmic art background GIF (dark theme)
- Complex, high-quality SVG replacements
- Focus exclusively on dark theme aesthetics for this iteration
- Structuring the algorithmic-art prompt for you to run in Claude Code

## Requirements

### Validated

- ✓ Write the introduction and "About Me" section using a human, narrative tone mirroring Thushar's cover letter — v1.0
- ✓ Highlight key experiences: Pencil (Canvas Editor, Figma/Photoshop plugins, WebCodecs), Surge (React Native), and Crypto backend (Go) — v1.0
- ✓ Feature Thushar's passion for developer tooling, automation, and AI workflows — v1.0
- ✓ Include technical skills section (React, TypeScript, Go, etc.) without making it a dry list — v1.0
- ✓ Create a "Frieren" themed visual layout and aesthetic for the README — v1.0
- ✓ Incorporate dynamic or aesthetic elements (e.g., SVG animations, themed images, or quotes) related to Frieren — v1.0
- ✓ Ensure layout is fully responsive across both Light and Dark mode GitHub settings using `#gh-dark-mode-only` patterns — v1.0
- ✓ Complex, high-quality, stunning SVG replacements for dark theme — Phase 07
- ✓ Algorithmic art background GIF (dark theme) using `algorithmic-art` — Phase 08

### Active

- [ ] Create programmatic dynamic SVGs (using Satori) for personalized stats mapped to Frieren aesthetics
- [ ] Add hover states, clickable spells, or interactive easter eggs using HTML/CSS tricks
- [ ] Implement GitHub Actions cron job for automated "Grimoire" updates (e.g., recent activity, blog posts, or rotating quotes)

### Out of Scope

- Standard, generic badge-heavy layouts — We want a unique, story-driven Frieren theme
- Dry, resume-style bullet points — The tone must remain human, curious, and narrative
- Complex backend infrastructure for the profile — Must be hostable entirely within the standard GitHub profile `README.md` ecosystem

## Context

- **Background**: Thushar has a strong R&D mindset, building things that don't fit into one category (plugins, design systems, video transcoding in the browser).
- **Tone**: "There's something about making code work that still feels like magic to me." (Very fitting for a Frieren theme about magic and time).
- **Theme**: "Frieren: Beyond Journey's End" focuses on the passage of time, the beauty of everyday magic, and exploring the world. Thushar's coding journey of 6+ years and his experimentation with new "magic" (code/AI) fits this perfectly.

## Constraints

- **Technical**: Must be a valid Markdown file (with optional HTML/SVG) supported by GitHub's markdown renderer.
- **Tone**: Must remain professional enough for hiring managers but human and creative enough to stand out.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| "Frieren" Theme Integration | Creates a memorable, magical aesthetic that aligns with Thushar's view of coding as "magic". | — Validated |
| Narrative-first approach | Avoids standard jargon and makes the profile read like a personal letter, matching the cover letter's strength. | — Validated |
| Verification script approach | Chose native Node.js asserts over test frameworks like Jest for content verification to keep dependencies zero. | — Phase 1 |
| Fail-fast SVG verification | Used Node's native 'assert' module inside 'verify-svgs.js' immediately after 'generate-assets.js' to ensure generated outputs are strictly validated for thematic constraints before template processing. | — Validated |
| Template building strategy | Standardized `README.template.md` to use pure HTML `<picture>` elements for local authoring ergonomics, converting them to GitHub-proprietary dual-`<img>` syntax via `build-template.js`. | — Validated |
| Programmatic SVG generation via d3-shape | Used d3-shape's radial lines/arcs to build complex geometric math easily rather than relying on static images. | — Phase 07 |
| Embedded text paths for SVGs | Avoids GitHub's external font loading proxies by baking the font directly as SVG paths. | — Phase 07 |
| Universal Dark SVGs | Mapped to `-dark-only` to ensure the complex new SVGs show elegantly regardless of user theme mode. | — Phase 07 |
| Auto-generated background GIF | Automated headless execution of the interactive `algorithmic-art` prompt to generate the GIF without manual intervention. | — Phase 08 |

---
*Last updated: 2026-04-12 after Phase 08*
