# Architecture Patterns

**Domain:** GitHub Profile Readme System
**Researched:** 2026-04-11

## Recommended Architecture

For a highly themed, narrative-driven profile with minimal external infrastructure, the **Static Builder with Automated Workflow (Cron Pattern)** is the industry standard. It fulfills the constraint of avoiding complex external backends while supporting rich dynamic elements.

### Component Boundaries

| Component | Responsibility | Communicates With |
|-----------|---------------|-------------------|
| **Template Source** (`README.template.md`) | Holds the base narrative, HTML structure, and placeholders (e.g., `{{ recent_posts }}`). | Build Script |
| **Asset Directory** (`/assets`) | Stores static Frieren-themed SVGs, PNGs, and GIFs. Used for CSS animations. | `README.md` |
| **Build Script** (`build.js` / `build.py`) | Fetches external data, processes placeholders, and generates the final markdown/SVGs. | External APIs, Template, `README.md` |
| **GitHub Actions** (`.github/workflows/update.yml`) | Orchestrates the build process on a schedule or push, committing changes back to the repo. | Build Script, GitHub Repo |
| **Final Output** (`README.md`) | The compiled file rendered by GitHub's markdown parser. | GitHub UI |

### Data Flow

1. **Trigger**: GitHub Action is triggered via `schedule` (e.g., daily) or `push` to main.
2. **Fetch**: Build script runs locally on the runner, querying any needed APIs (e.g., GitHub GraphQL for repo stats, blog RSS feeds).
3. **Generate**: 
   - Script injects fetched data into `README.template.md` to produce `README.md`.
   - *Optional:* Script modifies local `.svg` files to inject dynamic text (e.g., updating a stat within a Frieren magic circle SVG).
4. **Commit**: Action detects changes and commits them back to the repository using a bot account.
5. **Render**: GitHub's profile page automatically reflects the updated `README.md`.

## Patterns to Follow

### Pattern 1: Template-Driven Markdown Generation
**What:** Keeping a `README.template.md` file and generating the final `README.md` rather than doing regex replaces on the live README.
**When:** You have dynamic data (like latest repos or posts) that needs updating without breaking complex HTML layouts.
**Example:**
```javascript
// build.js
const template = fs.readFileSync('README.template.md', 'utf-8');
const data = await fetchLatestStats();
const output = template.replace('{{STATS}}', data);
fs.writeFileSync('README.md', output);
```

### Pattern 2: Self-Contained SVG Assets
**What:** Storing complex visual elements as `.svg` files in the repository and embedding them using `<img src="./assets/magic-circle.svg">` or `<picture>`.
**When:** Building heavy themes (like Frieren) requiring animations or intricate designs that raw Markdown cannot support.
**Example:**
```html
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="./assets/frieren-dark.svg">
  <img src="./assets/frieren-light.svg" width="100%">
</picture>
```

### Pattern 3: Componentized HTML in Markdown
**What:** Using HTML tables `<table>` with `align="center"` or `div` wrappers within the Markdown.
**When:** Creating grid layouts (e.g., a 2-column layout for text vs image) which standard Markdown doesn't natively support.

## Anti-Patterns to Avoid

### Anti-Pattern 1: Heavy External APIs for Images
**What:** Relying completely on external public APIs (like generic `github-readme-stats` cards) for primary visuals.
**Why bad:** Rate limits, downtime, and generic aesthetics destroy the unique narrative theme.
**Instead:** Generate your own static SVGs or use a script to inject data into custom-designed SVGs natively within your action.

### Anti-Pattern 2: `<foreignObject>` in SVG
**What:** Using `<foreignObject>` inside an SVG to render HTML/CSS elements.
**Why bad:** GitHub renders README images inside `<img>` tags. Browsers universally block external resources and HTML rendering within `<img>` SVGs for security reasons. The SVG will silently fail and render as a blank box.
**Instead:** Use pure vector nodes (`<path>`, `<rect>`, `<text>`) and inline styles within the SVG.

### Anti-Pattern 3: Unbounded Commit Bloat
**What:** Running a GitHub action every 15 minutes that makes a new commit.
**Why bad:** The profile repository's commit history becomes unusable and bloated with thousands of automated commits.
**Instead:** Limit cron jobs to once daily, or commit dynamic assets to a separate orphan `output` branch.

## Scalability Considerations

| Concern | Static Builder (Cron) | Dynamic Serverless (API) |
|---------|--------------|--------------|
| **Latency/Load time** | Instant (cached directly by GitHub Camo via native repo assets) | Slower (Camo must fetch and proxy from external provider like Vercel) |
| **Commit History** | Gets bloated if updated too frequently | Clean, no automated commits to the repo |
| **Infrastructure Overhead** | Zero (fully native to GitHub Actions) | Moderate (Requires external hosting account and DNS/Domain management) |

## Sources

- **HIGH CONFIDENCE**: GitHub Markdown rendering constraints & HTML support limits (Official documentation & internal knowledge base).
- **HIGH CONFIDENCE**: Browser security restrictions on `<img>` SVGs (`<foreignObject>` limits) (W3C / MDN specs).
- **HIGH CONFIDENCE**: Community standard architectures for profile READMEs (Internal knowledge base derived from thousands of open-source profile repos).