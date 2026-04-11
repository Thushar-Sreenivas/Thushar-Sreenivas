# Pitfalls Research

**Domain:** GitHub Profile Readme
**Researched:** 2026-04-11
**Confidence:** HIGH

## Critical Pitfalls

### Pitfall 1: The "Dashboard" Anti-Pattern (Visual Clutter)

**What goes wrong:**
Overloading the README with WakaTime stats, shield.io badges, GitHub streak counters, language pie charts, and auto-generated metrics, overshadowing the actual narrative and personal story.

**Why it happens:**
Developers want to quickly prove their technical chops and rely on quantitative metrics and plugins because it's easier than writing a compelling narrative. It's the default "developer aesthetic".

**How to avoid:**
Strictly limit external metrics. Focus on qualitative highlights (e.g., specific impact at Surge/Pencil) and narrative flow that fits the Frieren theme. Any visual elements should serve the story, not act as a dashboard.

**Warning signs:**
The profile starts looking like a Grafana dashboard; text-to-badge ratio is less than 1:1.

**Phase to address:**
Phase 1 (Content & Narrative Draft) & Phase 2 (Visual Design System)

---

### Pitfall 2: Mobile Layout Breakage

**What goes wrong:**
A beautifully crafted layout, especially using HTML `<table>` tags or wide images to create a grid, completely breaks or requires horizontal scrolling on the GitHub mobile app and narrow browser windows.

**Why it happens:**
Hardcoding fixed widths (e.g., `width="800"`) for images or using complex, deeply nested HTML tables that aren't responsive in GitHub's markdown renderer.

**How to avoid:**
Use responsive approaches: relative widths (`width="100%"`), linear stacking, or keep layouts simple. If side-by-side elements are needed, test them rigorously to ensure graceful degradation.

**Warning signs:**
Using fixed pixel widths like `<img width="800">` or relying on multi-column `<td>` layouts for core content.

**Phase to address:**
Phase 3 (Implementation & Assets)

---

### Pitfall 3: Dark/Light Mode Invisibility

**What goes wrong:**
A custom Frieren-themed SVG or transparent PNG looks gorgeous in dark mode but is completely invisible (black text/lines on black background) or blinding in light mode.

**Why it happens:**
Failing to account for GitHub's native theme toggling and assuming the viewer uses the same theme as the developer.

**How to avoid:**
Use GitHub's context-aware image tags (appending `#gh-dark-mode-only` and `#gh-light-mode-only` to image URLs) to serve different assets per theme, or use CSS media queries (`@media (prefers-color-scheme: dark)`) embedded directly inside SVGs.

**Warning signs:**
Using transparent backgrounds on line art; using pure black (`#000000`) or pure white (`#ffffff`) without a complementary background fill.

**Phase to address:**
Phase 3 (Implementation & Assets)

---

### Pitfall 4: Inaccessible Fancy Typography (Unicode Abuse)

**What goes wrong:**
Using unicode script generators (e.g., 𝕿𝖍𝖚𝖘𝖍𝖆𝖗) for headers or emphasis to make the text look "magical" or fit an anime aesthetic.

**Why it happens:**
Markdown doesn't natively support custom fonts, so developers use unicode hacks to achieve a specific look.

**How to avoid:**
Use standard markdown headers. If custom typography is absolutely essential for the Frieren theme, use embedded SVGs containing the text with appropriate `<title>` and `<desc>` accessibility tags instead of unicode characters.

**Warning signs:**
Copy-pasting text from a "fancy text generator" website into the markdown.

**Phase to address:**
Phase 1 (Content & Narrative Draft) & Phase 2 (Visual Design System)

---

### Pitfall 5: Burying the Technical Lede

**What goes wrong:**
Writing a long, thematic novel about magic and the passage of time. Recruiters or hiring managers spend 5-10 seconds on a profile and leave without seeing the 6+ years of rigorous engineering experience.

**Why it happens:**
Over-committing to the creative theme at the expense of professional utility.

**How to avoid:**
Hook the reader immediately. Blend the theme with the technical punchline in the first two sentences. Use the theme as a framing device, not the core content.

**Warning signs:**
Scrolling past the first viewport without seeing keywords like "React," "Go," "Pencil," "WebCodecs," or "Architecture."

**Phase to address:**
Phase 1 (Content & Narrative Draft)

---

## Technical Debt Patterns

Shortcuts that seem reasonable but create long-term problems.

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Mixing Markdown and raw HTML arbitrarily without blank lines | Quick layout fixes | Markdown parser breaks unexpectedly, displaying raw HTML tags to users. | Never. Always separate HTML blocks with blank lines. |
| Hardcoding external URLs for thematic quotes/images | Fast implementation | URLs break, leaving broken image icons that ruin the profile's aesthetic. | MVP phase only, must be localized later. |

## Integration Gotchas

Common mistakes when connecting to external services.

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| External Image Hosting (Imgur, AWS S3) | Linking directly to externally hosted assets. | Commit all visual assets directly to the repository and use relative paths. |
| Dynamic Stats Generators (Vercel, Heroku) | Relying on live external APIs for critical visual layout. | If dynamic data is needed, use GitHub Actions cron jobs to generate static assets and commit them to the repo. |

## Performance Traps

Patterns that work at small scale but fail as usage grows.

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| Large Unoptimized GIFs | Profile takes 5+ seconds to load, jarring the user. | Use compressed WebP, optimized SVGs, or very short, low-framerate GIFs. | Slow network connections or mobile. |
| Massive Inline SVGs | Reaching GitHub's character/rendering limits or slowing down the DOM. | Extract complex SVGs into standalone `.svg` files in the repo and reference them via `<img>` tags. | Extremely complex vector art. |

## Security Mistakes

Domain-specific security issues beyond general web security.

| Mistake | Risk | Prevention |
|---------|------|------------|
| Exposing personal email to scrapers | Massive spam. | Obfuscate email, use a contact form, or direct users to LinkedIn/Twitter DMs instead. |

## UX Pitfalls

Common user experience mistakes in this domain.

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| Tiny clickable areas in complex layout | Users cannot click your links on touch devices. | Ensure links are isolated, clear, and have sufficient padding/spacing. |
| Contrast failure on text over images | Unreadable content. | Ensure text has sufficient contrast ratios; use subtle semi-transparent overlays on background images. |

## "Looks Done But Isn't" Checklist

Things that appear complete but are missing critical pieces.

- [ ] **Visuals:** Often missing dark/light mode testing — verify in both GitHub themes.
- [ ] **Layout:** Often missing mobile testing — verify on the GitHub mobile app or responsive web view.
- [ ] **Content:** Often missing clear technical impact — verify it passes the "5-second scan" test for a hiring manager.
- [ ] **Accessibility:** Often missing `alt` attributes on thematic images — verify screen reader compatibility.

## Recovery Strategies

When pitfalls occur despite prevention, how to recover.

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Broken SVGs in Dark Mode | LOW | Add `#gh-dark-mode-only`/`#gh-light-mode-only` image pairs or CSS media queries to the SVGs. |
| Narrative is too long | MEDIUM | Edit down ruthlessy. Move the strongest technical highlights to the top above the fold. |
| Layout breaks on mobile | HIGH | Refactor the entire markdown structure to remove tables and rely on linear flex-like stacking. |

## Pitfall-to-Phase Mapping

How roadmap phases should address these pitfalls.

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| Burying the Technical Lede | Phase 1: Narrative Draft | Review draft specifically for 5-second technical scanning. |
| The "Dashboard" Anti-Pattern | Phase 2: Design System | Ensure design system rules explicitly forbid generic stat badges. |
| Dark/Light Mode Invisibility | Phase 3: Implementation | Toggle GitHub theme to test asset visibility. |
| Mobile Layout Breakage | Phase 3: Implementation | View the README on the GitHub mobile app. |

---
*Pitfalls research for: GitHub Profile Readme*
*Researched: 2026-04-11*