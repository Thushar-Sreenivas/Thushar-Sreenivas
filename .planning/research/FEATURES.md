# Feature Landscape

**Domain:** GitHub Profile Readme
**Researched:** 2026-04-11

## Table Stakes

Features users expect. Missing = product feels incomplete.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Hero/Intro Section | Immediately answers "who is this?" and hooks the reader | Low | Must clearly establish Thushar's identity and primary value proposition. |
| Tech Stack Indicators | Developers look for specific language/framework competencies | Low | Usually implemented via generic badges, but we need a themed approach to fit the aesthetic. |
| Experience & Projects Showcase | Tangible proof of capability (Pencil, Surge, Crypto Go backend) | Low | Must highlight deep R&D mindset and scale of work without sounding dry. |
| Contact & Social Links | Enables professional networking and outreach | Low | Links to LinkedIn, Email, Portfolio/Blog. |

## Differentiators

Features that set product apart. Not expected, but valued.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Thematic Visual Consistency ("Frieren" Theme) | Makes the profile instantly memorable, deeply personal, and stands out from standard templates | High | Requires custom color palettes, typography, and themed assets (headers, dividers). |
| Narrative-Driven Copywriting | Engages the reader emotionally. Replaces dry resume bullet points with a "magical" journey story | Medium | Must seamlessly align with Thushar's "code as magic" philosophy and cover letter tone. |
| Custom Animated/Dynamic SVGs | Breaks the static markdown mold; adds visual flair (e.g., Frieren-themed animated stats or floating elements) | High | Replaces generic `github-readme-stats` with custom SVGs, potentially requiring GitHub Actions to update. |
| Themed Interactive Elements | Encourages engagement and time spent on the profile (e.g., hover states, clickable spells/easter eggs) | Medium | Requires clever use of HTML/CSS within GitHub's markdown constraints. |
| Automated "Grimoire" Updates | Keeps the profile fresh by auto-fetching recent blog posts, activity, or rotating Frieren quotes | Medium | Implemented via a GitHub Actions cron job modifying the `README.md`. |

## Anti-Features

Features to explicitly NOT build.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| Wall of Generic Shield.io Badges | Clutters visual space, breaks the fantasy theme, and looks like every other generic profile. | Use themed, subtle icons or integrate technical skills naturally into the narrative text. |
| Dry, Resume-Style Bullet Points | Boring and contradicts the creative, curious, "code as magic" narrative approach. | Write story-driven paragraphs outlining the coding journey and experiences. |
| Unstyled GitHub Readme Stats | The default stats cards look out of place in a highly themed, aesthetic profile. | Design custom SVGs for stats or omit them in favor of curated highlights. |
| Complex External Backend Server | Over-engineers the solution; hard to maintain and prone to downtime. | Keep everything hosted via GitHub (Actions, SVGs, static assets) to ensure 100% uptime. |

## Feature Dependencies

```
Thematic Visual Consistency → Custom Animated/Dynamic SVGs (SVGs must match the established Frieren visual language)
Narrative-Driven Copywriting → Experience & Projects Showcase (Experiences must be woven directly into the story)
```

## MVP Recommendation

Prioritize:
1. Narrative-Driven Copywriting (Introduction + Pencil/Surge/Crypto experiences)
2. Thematic Visual Consistency (Basic Frieren imagery, colors, custom headers/dividers in static markdown)
3. Custom Themed Hero Graphic (Static SVG or high-quality image)
4. Contact & Social Links (Themed icons)

Defer:
1. Automated "Grimoire" Updates: Focus on nailing the static aesthetic and story first.
2. Complex Interactive Elements / Custom Animated SVGs: High complexity; best added in a follow-up iteration once the baseline profile is live and validated.

## Sources

- `.planning/PROJECT.md` (Project Context & Constraints)
- Ecosystem analysis of top-tier GitHub profiles (e.g., Anurag Hazra, Platane, custom themed READMEs)
