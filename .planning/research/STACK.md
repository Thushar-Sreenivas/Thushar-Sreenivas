# Technology Stack

**Project:** Thushar's GitHub Profile Readme
**Researched:** 2026-04-11

## Recommended Stack

### Core Generation Framework
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| TypeScript | v5.x | Script authoring | Strict typing for generating components; avoids runtime data errors during cron execution. |
| Satori | v0.26.x | HTML/CSS to SVG | The SOTA way to generate rich, dynamic GitHub profile cards. Unlike manual SVG paths, Satori lets us build the "Frieren Grimoire/Magic" layouts using familiar Flexbox/CSS. Runs entirely without a headless browser. |
| React | v18.x | SVG Templating | Satori consumes JSX. React allows us to compose UI pieces (e.g., `<GrimoireCard>`, `<SkillList>`) declaratively instead of string templating. |

### Infrastructure
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Node.js | v24.x | Execution | The default fast runner for the generation scripts. |
| GitHub Actions | v4 | Cron & Pipeline | Satisfies the "Must be hostable entirely within the standard GitHub profile ecosystem" constraint. Rebuilds SVGs statically and commits them back to the repo, eliminating the need for Vercel/external hosting and cold starts. |
| tsx | v4.x | TS Execution | Fastest way to execute the TypeScript generation scripts natively inside Actions without a bulky build step. |

### Supporting Libraries
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| octokit | ^4.x | Data Fetching | When pulling live GitHub stats (like recent "magic spells" / commits) to feed into the SVGs. |
| svgo | ^4.0.x | SVG Optimization | Run on Satori's output before committing to keep file sizes minimal for fast README load times. |
| @types/node | ^20.x | Type definitions | Required for native `fs` and `path` operations when reading fonts and saving SVGs. |

## Alternatives Considered

| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| SVG Generation | Satori | Puppeteer + Canvas | Puppeteer is heavy, slow, and brittle in CI environments. Satori is WASM-based, instant, and lightweight. |
| Infrastructure | GitHub Actions | Vercel Serverless | While Vercel is great for dynamic SVGs, it introduces an external dependency. Actions keeps it 100% within the GitHub ecosystem by committing static assets, satisfying project constraints. |
| UI Templating | React + Satori | Manual SVG Strings | Building complex visual layouts (Frieren themes, custom fonts, animations) manually with SVG primitives is unmaintainable and highly prone to alignment bugs. |
| Profile Tooling | Custom Pipeline | github-readme-stats | Explicitly out of scope per `PROJECT.md`. Generic tools cannot achieve the highly narrative, Frieren-themed visual aesthetic required. |

## Installation

```bash
# Core Dependencies
npm install react satori octokit svgo

# Dev dependencies
npm install -D typescript @types/react @types/node tsx
```

## Sources

- [Satori Documentation (Vercel)](https://github.com/vercel/satori) (HIGH) - Official source for HTML/CSS to SVG conversion capabilities.
- [GitHub Actions Documentation](https://docs.github.com/en/actions) (HIGH) - Official source for cron scheduling and automated commits.
- [svgo npm repository](https://www.npmjs.com/package/svgo) (HIGH) - Standard ecosystem tool for SVG optimization.
