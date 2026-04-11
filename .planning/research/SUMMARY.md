# Project Research Summary

**Project:** Thushar's GitHub Profile Readme
**Domain:** GitHub Profile Readme
**Researched:** 2026-04-11
**Confidence:** HIGH

## Executive Summary

This project involves creating a highly customized, narrative-driven GitHub profile README centered around a "Frieren/magic" theme. Industry experts approach advanced profile READMEs by moving away from generic static markdown and dashboard-style badges towards rich, programmatic SVG generation powered by GitHub Actions. This allows for dynamic, visually striking components that fit seamlessly into a cohesive story without relying on fragile external hosting.

The recommended approach uses a **Static Builder with Automated Workflow (Cron Pattern)**. By utilizing Satori and React, we can build complex SVG layouts dynamically using standard HTML/CSS patterns, replacing brittle manual SVG manipulation. A scheduled GitHub Action will process a `README.template.md` along with fetched data (via Octokit) and commit the updated assets directly back to the repo, ensuring 100% uptime and keeping the infrastructure entirely within the GitHub ecosystem.

Key risks include burying the core technical message under excessive thematic elements, creating designs that break on mobile devices or in different color schemes (dark/light modes), and falling into the "dashboard anti-pattern" with generic stats. Mitigation involves strict adherence to responsive design principles, providing alternate assets for dark/light modes, and focusing strongly on narrative-driven copywriting that hooks the reader with technical credentials immediately.

## Key Findings

### Recommended Stack

Our stack centers around generating scalable vector graphics programmatically and automating the update lifecycle entirely within GitHub Actions.

**Core technologies:**
- **TypeScript & React**: Script authoring & SVG Templating — Provides strict typing and declarative UI composition instead of error-prone manual string templating.
- **Satori**: HTML/CSS to SVG generation — The state-of-the-art way to generate rich SVGs using standard Flexbox/CSS, avoiding the overhead of headless browsers like Puppeteer.
- **GitHub Actions (with tsx)**: Infrastructure & Execution — Satisfies the constraint of keeping the solution 100% within the GitHub ecosystem, running lightweight TS scripts without complex build steps.
- **Octokit & svgo**: Supporting Libraries — Used for fetching live GitHub stats and optimizing generated SVGs for fast profile load times.

### Expected Features

**Must have (table stakes):**
- **Hero/Intro Section** — Establishes identity and hooks the reader immediately.
- **Experience & Projects Showcase** — Highlights R&D mindset (Pencil, Surge, Crypto Go backend) in a thematic narrative.
- **Tech Stack & Contact Links** — Vital developer information designed to fit the Frieren aesthetic.

**Should have (competitive):**
- **Thematic Visual Consistency ("Frieren" Theme)** — Distinctive colors, typography, and themed assets making the profile memorable.
- **Narrative-Driven Copywriting** — Transforms standard resume points into an engaging "code as magic" journey.

**Defer (v2+):**
- **Automated "Grimoire" Updates** — Scheduled GitHub Action updates for recent activity. Focus on static narrative first.
- **Custom Animated/Dynamic SVGs & Interactives** — High complexity; add to baseline profile once live and validated.

### Architecture Approach

The industry standard for this domain is the **Static Builder with Automated Workflow (Cron Pattern)**.

**Major components:**
1. **Template Source (`README.template.md`)** — Holds the base narrative, HTML structure, and data placeholders.
2. **Build Script (`build.ts`)** — Fetches external data, processes placeholders, generates/optimizes SVGs, and outputs the final markdown.
3. **GitHub Actions (`update.yml`)** — Orchestrates the build process on a schedule, committing the final `README.md` and assets back to the repo.

### Critical Pitfalls

1. **The "Dashboard" Anti-Pattern** — Avoid overloading with generic stat badges. Use narrative text and strictly limit external metrics.
2. **Mobile Layout Breakage** — Avoid complex tables or fixed-width images failing on small screens. Use responsive widths (`100%`) and linear stacking.
3. **Dark/Light Mode Invisibility** — Avoid custom graphics failing when GitHub's theme changes. Use context-aware image tags (`#gh-dark-mode-only`) or embedded CSS media queries in SVGs.
4. **Burying the Technical Lede** — Avoid focusing too much on theme over capability. Hit the core technical punchlines (e.g., React, Go, WebCodecs) within the first few sentences.

## Implications for Roadmap

Based on research, suggested phase structure:

### Phase 1: Content & Narrative Draft
**Rationale:** The core value is the story. The narrative must blend the Frieren theme with hard technical experience before any design work begins.
**Delivers:** `README.template.md` with raw narrative, technical highlights, and placeholder tags.
**Addresses:** Hero/Intro Section, Experience & Projects Showcase, Narrative-Driven Copywriting.
**Avoids:** Pitfall - Burying the Technical Lede.

### Phase 2: Visual Design System & Static Assets
**Rationale:** Establishes the thematic visual language (colors, headers, static SVGs) that the narrative will reside within.
**Delivers:** Base `/assets` directory, custom headers, dividers, and responsive layout structure.
**Uses:** CSS/SVG design principles, svgo.
**Implements:** Thematic Visual Consistency, Asset Directory architecture component.

### Phase 3: Infrastructure & Dynamic SVG Generation
**Rationale:** Brings the static components to life using the automated workflow and programmatic SVG generation.
**Delivers:** Satori/React-based SVG generation scripts, Octokit data fetching, and GitHub Actions workflow.
**Uses:** Satori, React, TypeScript, Node.js, tsx, GitHub Actions.
**Implements:** Build Script and GitHub Actions architecture components.

### Phase Ordering Rationale

- **Narrative First:** The "code as magic" theme and technical highlights must be written before visuals, ensuring the technical value isn't overshadowed.
- **Design Before Automation:** Defining static visual boundaries and assets ensures the programmatic SVG generation (Satori) has clear aesthetic guidelines to follow.
- **Automation Last:** With content and visual guidelines locked, building the automated pipeline and complex SVGs reduces iteration friction.

### Research Flags

Phases likely needing deeper research during planning:
- **Phase 3:** Using Satori with React inside a Node.js script (without Next.js/Vercel) requires careful configuration of fonts and React-DOM server rendering.

Phases with standard patterns (skip research-phase):
- **Phase 1 & 2:** Standard markdown authoring and static SVG creation are well-documented, established patterns.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Satori + Actions is well documented and tested for similar use cases. |
| Features | HIGH | Based on analysis of top-tier profiles and explicit project constraints. |
| Architecture | HIGH | Static builder pattern is the proven standard for GitHub profile limits. |
| Pitfalls | HIGH | Common issues are well known in the developer community. |

**Overall confidence:** HIGH

### Gaps to Address

- **Satori Font Loading:** Ensuring custom thematic fonts are properly bundled and loaded by Satori within the GitHub Actions runner environment.
- **`<foreignObject>` limitations:** Need to strictly ensure Satori outputs raw SVG nodes, as GitHub strips out foreignObject tags containing HTML in READMEs.

## Sources

### Primary (HIGH confidence)
- **Satori Documentation (Vercel)** — Official source for HTML/CSS to SVG conversion capabilities.
- **GitHub Actions Documentation** — Official source for cron scheduling and automated commits.
- **W3C / MDN specs** — Browser security restrictions on `<img>` SVGs (`<foreignObject>` limits).

### Secondary (MEDIUM confidence)
- **Ecosystem analysis** — Review of top-tier GitHub profiles (Anurag Hazra, Platane, custom themed READMEs).

---
*Research completed: 2026-04-11*
*Ready for roadmap: yes*