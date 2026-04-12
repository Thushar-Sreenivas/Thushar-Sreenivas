# Feature Landscape

**Domain:** GitHub Profile README Visuals
**Researched:** 2026-04-12

## Table Stakes

Features users expect. Missing = product feels incomplete.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Dark/Light Theme Switching | Broken aesthetic in wrong theme | Low | Handled via `#gh-dark-mode-only` and `<picture>` tags |
| Responsive Layout | Profile must look good on mobile app | Medium | Hard to do with absolute SVG widths; requires `100%` width hacks |
| Accessible Alt Text | Required for screen readers | Low | Standard markdown `![alt](...)` |

## Differentiators

Features that set product apart. Not expected, but valued.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Algorithmic Background | Proves technical capability and creates mesmerizing effect | High | Requires custom p5.js script and `.mp4` capture |
| "Frieren" Themed SVGs | Deep personalization; shows design skills | Medium | Requires complex SVG design or Satori configuration |
| Dynamic Stats (Grimoire) | Shows active engagement | Medium | Requires GitHub Actions and API integration |
| Clickable Easter Eggs | "Spells" that users can discover | Low | Must use clever Markdown link wrapping, not SVG internals |

## Anti-Features

Features to explicitly NOT build.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| Client-side JavaScript | GitHub sanitizer strips it | Pre-render everything to static assets |
| SVG Internal Hover States | Browsers disable it for `<img>` tags | Wrap images in Markdown links for basic clickability |
| Massive GIF Animations | Fails Camo proxy; crashes mobile | Use highly optimized `<video src="art.mp4">` |

## Feature Dependencies

```
Frieren Themed SVGs → Font Baking (SVG text-to-path)
Algorithmic Background → MP4 Encoding Pipeline
Dynamic Stats → Cache-Busting Markdown Template Builder
```

## MVP Recommendation

Prioritize:
1. Font-baked static SVGs for the Frieren theme
2. Markdown-level hyperlink wrapping for interactive spells
3. Basic looping animation (even if small)

Defer: Complex p5.js algorithmic art MP4 capture (do a simpler optimized GIF first to validate the pipeline before building FFmpeg capture).

## Sources

- Project requirements (.planning/PROJECT.md)
