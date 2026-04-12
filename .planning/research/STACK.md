# Technology Stack

**Project:** GitHub Profile v1.1 Visual Overhaul
**Researched:** 2026-04-12

## Recommended Stack

### Core Framework
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Node.js | 20+ | Asset Generation | Zero-dependency approach for the verification scripts, but we need robust generation. |
| Satori | ^0.10.0 | Dynamic SVG Generation | React-like syntax to generate complex, beautifully laid-out SVGs for the Grimoire stats. |
| Playwright | ^1.40.0 | Verification & Capture | Used to verify SVG generation and potentially capture p5.js algorithmic art into frames. |

### Database
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| GitHub GraphQL API | v4 | Grimoire Stats | Fetching latest contribution and activity data for the profile without external databases. |

### Infrastructure
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| GitHub Actions | v2 | Cron Updates | Standard, free, and tightly integrated way to run the script and push back to the repo. |
| FFmpeg | (system) | Video Encoding | If converting algorithmic art frames to MP4 to bypass GitHub Camo GIF limits. |

### Supporting Libraries
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| p5.js | 1.9.0 | Algorithmic Art | To implement the `algorithmic-art` generative philosophy for the background. |
| opentype.js | ^1.3.4 | Font Baking | To convert Satori/SVG text into raw `<path>` data to survive GitHub's CSP limits. |

## Alternatives Considered

| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| Animation Format | `.mp4` (Autoplaying markdown) | `.gif` | GIFs over 5MB fail GitHub's Camo proxy, have poor color banding, and ruin mobile scrolling. |
| SVG Interactivity | Markdown `<a>` wrappers | SVG `<style>` `:hover` | Browsers block internal CSS `:hover` states inside SVGs loaded via `<img>` tags. |

## Installation

```bash
# Core
npm install satori @resvg/resvg-js opentype.js

# Dev dependencies
npm install -D playwright
```

## Sources

- GitHub Markdown Video Support Announcements
- Satori Documentation
