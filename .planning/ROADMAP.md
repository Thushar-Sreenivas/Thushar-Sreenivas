# Roadmap: Thushar's GitHub Profile Readme

## Milestones

- ✅ **v1.0 Initial Frieren Theme & Narrative** — Phases 1-05.1 (shipped 2026-04-12)
- 🚧 **v1.1 Visual Overhaul** — Phases 6-8

## Phases

<details>
<summary>✅ v1.0 Initial Frieren Theme & Narrative (Phases 1-05.1) — SHIPPED 2026-04-12</summary>

- [x] Phase 1: Narrative & Content (1/1 plans) — completed 2026-04-11
- [x] Phase 2: Visual Design System (4/4 plans) — completed 2026-04-12
- [x] Phase 3: Layout & Architecture (1/2 plans) — completed 2026-04-12
- [x] Phase 4: Fix Visual Design System & Pipeline (1/1 plans) — completed 2026-04-12
- [x] Phase 5: Fix Template Architecture & Asset Integration (1/1 plans) — completed 2026-04-12
- [x] Phase 05.1: Refactor README content to exactly match Cover Letter tone (1/1 plans) — completed 2026-04-12

</details>

### 🚧 v1.1 Visual Overhaul

- [ ] **Phase 6: Pipeline Foundation** - Build system supports dark-theme-only visual media
- [ ] **Phase 7: Thematic Dark SVGs** - High-quality Frieren SVGs integrated for dark mode
- [ ] **Phase 8: Algorithmic Background** - Dynamic algorithmic art generated and embedded

## Phase Details

### Phase 6: Pipeline Foundation
**Goal**: The build system successfully processes and validates dark-mode-only visual assets
**Depends on**: Nothing
**Requirements**: ARCH-01, ARCH-02
**Success Criteria**:
1. Validation script (`verify-svgs.js`) passes when visual assets only have dark-theme versions.
2. Build pipeline correctly recognizes and processes new media formats (GIF/MP4) without failing.
**Plans**: 1 plans
- [ ] 06-01-PLAN.md — Update build scripts to support dark-theme-only visual assets

### Phase 7: Thematic Dark SVGs
**Goal**: Users see beautiful, high-quality Frieren-themed SVGs in the profile dark mode
**Depends on**: Phase 6
**Requirements**: SVG-01, SVG-02
**Success Criteria**:
1. Profile README successfully displays the new dark-theme SVGs natively using `#gh-dark-mode-only` anchors.
2. Frieren-themed typography and aesthetic elements render perfectly without external font loading issues.
**Plans**: 2 plans
- [ ] 07-01-PLAN.md — Establish programmatic SVG generation foundation using `d3-shape` and `text-to-svg`.
- [ ] 07-02-PLAN.md — Implement visually stunning, highly intricate Frieren-themed magic circles using `d3-shape` in Node.js.

### Phase 8: Algorithmic Background
**Goal**: Users experience a dynamic algorithmic Frieren background when viewing the profile in dark mode
**Depends on**: Phase 6
**Requirements**: ART-01, ART-02
**Success Criteria**:
1. A structured algorithmic-art prompt is prepared and ready for the user to execute via Claude Code.
2. The generated algorithmic GIF/MP4 is embedded in the profile and plays automatically under GitHub's cache limits.
**Plans**: 1 plans
- [ ] 08-01-PLAN.md — Generate a structured prompt for the `algorithmic-art` skill and prepare the profile template.

## Progress

| Phase | Milestone | Plans Complete | Status | Completed |
|-------|-----------|----------------|--------|-----------|
| 1. Narrative & Content | v1.0 | 1/1 | Complete | 2026-04-11 |
| 2. Visual Design System | v1.0 | 4/4 | Complete | 2026-04-12 |
| 3. Layout & Architecture | v1.0 | 1/2 | Complete | 2026-04-12 |
| 4. Fix Visual Design System & Pipeline | v1.0 | 1/1 | Complete | 2026-04-12 |
| 5. Fix Template Architecture & Asset Integration | v1.0 | 1/1 | Complete | 2026-04-12 |
| 05.1. Refactor README content to exactly match Cover Letter tone | v1.0 | 1/1 | Complete | 2026-04-12 |
| 6. Pipeline Foundation | v1.1 | 0/1 | Not started | - |
| 7. Thematic Dark SVGs | v1.1 | 0/2 | Not started | - |
| 8. Algorithmic Background | v1.1 | 0/1 | Not started | - |
### Phase 08.1: Update skills in SVGs based on resume without grimoire suffix (INSERTED)

**Goal:** Update the programmatic SVG generation to remove "grimoire" terminology and align the displayed technical skills with the resume.
**Requirements**: REQ-08.1
**Depends on:** Phase 8
**Plans:** 1 plans

Plans:
- [ ] 08.1-01-PLAN.md — Update SVG skills and terminology
