# Requirements: Thushar's GitHub Profile Readme

**Defined:** 2026-04-12
**Core Value:** A beautiful, human-centric profile that clearly communicates Thushar's technical depth, curiosity, and product mindset without relying on dry corporate jargon, all while deeply integrating a "Frieren" visual and thematic aesthetic.

## v1.1 Requirements

### Algorithmic Background Art

- [x] **ART-01**: Structure the `algorithmic-art` prompt for the user to run in Claude Code.
- [x] **ART-02**: Integrate the generated algorithmic art (GIF/MP4) into the README for dark theme.

### Complex SVGs

- [ ] **SVG-01**: Create/find visually stunning, high-quality SVGs for the Frieren dark theme to replace the current ones.
- [x] **SVG-02**: Update the README template to use these new SVGs exclusively for dark theme using `#gh-dark-mode-only`.

### Architecture Updates

- [x] **ARCH-01**: Update `verify-svgs.js` to allow dark-theme-only visual assets.
- [x] **ARCH-02**: Ensure the build pipeline supports the new visual assets (SVG, GIF/MP4).

## v1.2 Requirements (Future)

### Dynamic Stats

- **STAT-01**: Create programmatic dynamic SVGs (using Satori) for personalized stats mapped to Frieren aesthetics.
- **STAT-02**: Implement GitHub Actions cron job for automated "Grimoire" updates.

### Interactivity

- **INT-01**: Add hover states, clickable spells, or interactive easter eggs using HTML/CSS tricks and Markdown wrappers.

## Out of Scope

| Feature | Reason |
|---------|--------|
| Light Theme SVGs/GIFs for v1.1 | The current focus is entirely on perfecting the visual aesthetic for the dark theme. Light theme can follow later. |
| Complex backend infrastructure | Must be hostable entirely within the standard GitHub profile ecosystem. |
| In-SVG Interactivity | Browser security strips `:hover` and `<a>` tags from SVGs embedded via `<img>`. Must use Markdown wrappers instead. |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| ART-01 | Phase 8 | Complete |
| ART-02 | Phase 8 | Complete |
| SVG-01 | Phase 7 | Pending |
| SVG-02 | Phase 7 | Complete |
| ARCH-01 | Phase 6 | Complete |
| ARCH-02 | Phase 6 | Complete |

**Coverage:**
- v1.1 requirements: 6 total
- Mapped to phases: 6
- Unmapped: 0 ✓

---
*Requirements defined: 2026-04-12*
*Last updated: 2026-04-12 after defining v1.1 scope*