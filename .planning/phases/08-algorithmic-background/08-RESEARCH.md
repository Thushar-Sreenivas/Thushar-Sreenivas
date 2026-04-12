# Phase 8: Algorithmic Background - Research

**Researched:** 2026-04-12
**Domain:** Generative Art Prompting & Automated Asset Capturing
**Confidence:** HIGH

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

### Visual Composition
- **Concept:** Zoltraak Magic Circles (geometric, rotating spell circles).
- **Aesthetic:** Subtle & Ambient (soft glows, slow rotation, dark background to ensure readability).
- **Palette:** Deep Blues & Purples (Frieren's signature magical vibe).
- **Arrangement:** Multiple overlapping circles.
- **Details:** Include abstract runes/symbols inside the rings.
- **Motion:** Rotation & Pulsing (rings rotate and gently fade in/out).

### Media Format
- **Format:** GIF (universally supported, easy to embed with standard Markdown `<img>`).
- **Generation Method:** Automated Script (script captures canvas frames and outputs a GIF automatically using libraries like `ccapture.js` or `gif.js`).

### Animation Loop
- **Length:** Medium (4-6s).
- **Loop Type:** Seamless Loop (must loop perfectly without stutter).
- **Motion Logic:** Continuous Forward (spins continuously in one direction without stopping).
- **Loop Technique:** Slow & Symmetrical (slow, majestic rotation using symmetry to achieve a seamless loop, e.g., 90° rotation matches 0°).

### Claude's Discretion
- Aspect ratio of the generated art.
- Positioning/alignment of the overlapping circles within the frame.
- Target frame rate (balancing smoothness and file size).
- Target file size limit for GitHub compatibility.

### Deferred Ideas
None — discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| ART-01 | Structure the `algorithmic-art` prompt for the user to run in Claude Code. | Utilizes `p5.capture` CDN injection to enable frictionless 1-click GIF exports from the generated HTML artifact |
| ART-02 | Integrate the generated algorithmic art (GIF/MP4) into the README for dark theme. | Relies on Phase 6's `<picture>` and `#gh-dark-mode-only` suffix logic for seamless embedding |
</phase_requirements>

## Summary

This phase requires generating a highly structured prompt to feed into the `algorithmic-art` skill, rather than writing the art script ourselves. The output of the `algorithmic-art` skill is an interactive HTML file running `p5.js`. To bridge the gap between "interactive HTML" and "automated GIF capture", we will inject `p5.capture` via a CDN link in the prompt instructions.

This completely bypasses the need for complex headless browser (Puppeteer) setups. The user will simply execute the prompt, open the resulting HTML file in their browser, and `p5.capture` will automatically record and download a perfectly looped GIF. The planner will then update the `README.template.md` to reference this GIF.

**Primary recommendation:** Instruct the `algorithmic-art` skill to include the `p5.capture` CDN script and explicitly configure it for a 4-second, 20fps seamless GIF loop.

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `p5.js` | `1.7.0` | Generative canvas rendering | The required target for the project's `algorithmic-art` skill |
| `p5.capture` | `1.4.1` | Automated canvas to GIF recording | Adds a floating UI to p5 sketches; eliminates need for headless browser automation |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| `p5.capture` | `puppeteer` + `gifencoder` | Node.js headless recording is much more complex and brittle than dropping a CDN link into the HTML artifact for the user |
| `p5.capture` | `gif.js` manually | Requires writing custom workers and recording loops; `p5.capture` handles this natively |

## Architecture Patterns

### Recommended Project Structure
```
prompts/
└── algorithmic-art-zoltraak.md    # The prepared prompt for the user
assets/images/
└── Zoltraak-dark-only.gif         # The generated artifact (after user runs prompt)
```

### Pattern 1: Prompt Injection for Tooling
**What:** Adding external tools to generated artifacts by instructing the `algorithmic-art` skill.
**When to use:** When you need the generated HTML to have capabilities beyond standard p5.js.
**Example:**
Instructing the skill to add:
```html
<script src="https://cdn.jsdelivr.net/npm/p5.capture@1.4.1/dist/p5.capture.umd.min.js"></script>
```

### Pattern 2: Dark-Only Template Embedding
**What:** Leveraging the Phase 6 pipeline update to use the GIF only in dark mode.
**When to use:** In `README.template.md`.
**Example:**
```html
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/images/Zoltraak-dark-only.gif">
  <img alt="Magic Circles Background" src="assets/images/hero-banner-light.svg">
</picture>
```

### Anti-Patterns to Avoid
- **Anti-pattern:** Writing a Node script to run `p5.js` headless. `p5.js` relies heavily on DOM APIs. Running it in Node requires `node-canvas` shims which are notoriously buggy. Use the browser for rendering.
- **Anti-pattern:** Generating a 60fps 10-second GIF. GitHub will aggressively throttle or fail to load GIFs over ~5MB. Keep frame count and resolution low.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Canvas to GIF encoding | Custom `requestAnimationFrame` loop saving to `gif.js` | `p5.capture` via CDN | `p5.capture` handles frame timing, Web Workers, and the download UI automatically |
| Continuous Loop logic | Keyframe-based timeline state machines | `rotate(frameCount * speed)` with modulo | p5's `frameCount` math naturally handles continuous rotational symmetry |

## Common Pitfalls

### Pitfall 1: Large GIF File Size
**What goes wrong:** The GIF takes 10+ seconds to load on GitHub and breaks the profile experience.
**Why it happens:** Capturing at 1200x800 @ 60fps generates massive files.
**How to avoid:** Constrain the algorithmic prompt to generate a wide, short canvas (e.g., 800x200 or 800x300) and limit capture framerate to 15-20fps over 4 seconds.

### Pitfall 2: Imperfect Looping
**What goes wrong:** The GIF "hiccups" at the end of the loop.
**Why it happens:** The animation doesn't return to the exact starting state on the final frame.
**How to avoid:** Instruct the algorithm to use rotational symmetry. For a 4-second loop at 20fps (80 frames), rotate by exactly 360/N degrees over the 80 frames.

## Code Examples

Verified patterns from official sources:

### `p5.capture` Integration Prompt
The prompt we write for the user MUST include instructions like this:
```markdown
Add this to the generated `viewer.html` head:
<script src="https://cdn.jsdelivr.net/npm/p5.capture@1.4.1/dist/p5.capture.umd.min.js"></script>

And add this to the `setup()` function:
P5Capture.setDefaultOptions({
  format: "gif",
  framerate: 20,
  duration: 80 // frames (4 seconds * 20 fps)
});
```

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Native Node.js `assert` |
| Config file | none |
| Quick run command | `node -e "require('assert')(require('fs').existsSync('prompts/algorithmic-art-zoltraak.md'))"` |
| Full suite command | `npm run build` |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| ART-01 | Prompt file generated | unit | `node -e "require('assert')(require('fs').existsSync('prompts/algorithmic-art-zoltraak.md'))"` | ❌ Wave 0 |
| ART-02 | README template references GIF | unit | `node -e "const t = require('fs').readFileSync('README.template.md', 'utf8'); require('assert')(/Zoltraak-dark-only\.gif/.test(t))"` | ❌ Wave 0 |

### Sampling Rate
- **Per task commit:** Verification command checks file existence
- **Phase gate:** Full suite green before `/gsd-verify-work`

### Wave 0 Gaps
- [ ] Need to ensure the `prompts` directory exists before writing the prompt file.

## Sources

### Primary (HIGH confidence)
- `.config/opencode/skill/algorithmic-art/SKILL.md` - Verified the required skill output format
- `p5.capture` NPM registry - Verified capability for out-of-the-box UI-based GIF exporting

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - `p5.capture` perfectly solves the p5.js export problem.
- Architecture: HIGH - Matches Phase 6 pipeline logic.
- Pitfalls: HIGH - Frame limits are universally necessary for GitHub Markdown GIFs.

**Research date:** 2026-04-12
**Valid until:** 2026-05-12