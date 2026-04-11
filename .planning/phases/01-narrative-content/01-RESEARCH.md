# Phase 1: Narrative & Content - Research

**Researched:** Sat Apr 11 2026
**Domain:** Content Strategy & GitHub Profile Markdown
**Confidence:** HIGH

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| NARR-01 | Write a Hero/Intro section in a human, jargon-free tone focusing on "code as magic" | Identified narrative structures that balance theme with readability (short paragraphs, hook). |
| NARR-02 | Weave key experiences (Pencil, Surge, Crypto) into a cohesive journey story | Extracted facts from cover letter; mapped to thematic "chapters" to avoid dry resume bullets. |
| NARR-03 | Integrate contact and social links naturally into the narrative structure | Researched standard markdown hyperlink patterns that fit naturally into prose. |
| TECH-01 | Feature passion for developer tooling, automation, and AI workflows | Mapped to a dedicated "Grimoire" or "Spells" section to highlight tooling separately from core product work. |
</phase_requirements>

## Summary

The narrative phase must transform a traditional resume (as seen in the Cover Letter) into an engaging, Frieren-themed technical story. The core challenge is balancing the "code as magic" flavor with clear, professional signaling of technical depth (React, TypeScript, Go, AI). The output will be a `README.template.md` file that serves as the foundation for the visual and architectural phases that follow.

**Primary recommendation:** Use a 3-act "journey" structure (The Intro/Hook, The Quests/Experience, The Grimoire/Tooling) using concise markdown formatting, avoiding walls of text while keeping the technical keywords bolded for scannability.

## Standard Stack

### Core
| Technology | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Markdown | GFM | Core structure of the profile | Native to GitHub READMEs, fully responsive |
| HTML | 5 | Section alignment | Necessary for layout control in GitHub markdown |

### Supporting
| Technology | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Node.js fs | Built-in | Content validation script | Lightweight alternative to full testing frameworks for simple string matching |

**Installation:**
```bash
# No external dependencies needed for simple validation
```

## Architecture Patterns

### Recommended Project Structure
```
/
├── README.template.md   # The main narrative content file
├── package.json         # (Optional) For npm scripts
└── scripts/
    └── verify-content.js # Validation script for content checks
```

### Pattern 1: Thematic Sectioning
**What:** Structuring the README as chapters in a journey rather than standard resume sections.
**When to use:** When replacing "Work Experience" and "Skills".
**Example:**
```markdown
## 📖 The Journey So Far
*At [Pencil](url), I crafted the core canvas editor...*
```

### Anti-Patterns to Avoid
- **Wall of Text:** Frieren's storytelling is deliberate and paced. Long paragraphs will cause recruiters/devs to bounce. Keep paragraphs to 2-3 sentences.
- **Over-theming (Cringe):** Don't make the reader decipher elven riddles to understand the tech stack. The theme should flavor the narrative, not obscure the fact that Thushar is a Senior Frontend Engineer.
- **Resume Bullets:** "• Built X using Y achieving Z" ruins the narrative flow.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Justifying text | `<div style="text-align: justify">` | Left-aligned markdown | Inline styles are heavily stripped by GitHub; left-aligned is easier to read on mobile. |
| Complex layouts | Massive HTML `<table>` grids | Sequential Markdown blocks | Tables break terribly on the GitHub Mobile app. Sequential narrative flows better. |

**Key insight:** GitHub's markdown parser (`cmark-gfm`) aggressively strips styling. Rely on structural markdown (headings, emphasis, blockquotes) for narrative flow rather than HTML hacks.

## Common Pitfalls

### Pitfall 1: Obscuring Contact Info
**What goes wrong:** The user gets so engrossed in the narrative that they forget to provide a clear CTA (Call to Action).
**Why it happens:** Trying to make contact links fit the "lore" too perfectly.
**How to avoid:** Have a dedicated, clearly visible section at the bottom (e.g., "📫 Send a Raven (Contact)") with standard, recognizable links.
**Warning signs:** A recruiter has to read 3 paragraphs to find the email address.

### Pitfall 2: Mobile Unreadability
**What goes wrong:** Beautiful on desktop, broken on the GitHub app.
**Why it happens:** Hardcoded line breaks (`<br>`) used for visual spacing on wide screens.
**How to avoid:** Rely on paragraph breaks instead of `<br>`.

## Code Examples

Verified patterns for GitHub Markdown:

### Engaging Hook
```markdown
# Thushar Sreenivas
### Senior Frontend Engineer · React, TypeScript, R&D, AI Tooling

> *"There's something about making code work that still feels like magic to me."*
```

### Natural Skill Weaving
```markdown
My journey has taken me across the stack—from building the core **React** & **TypeScript** canvas editor at **Pencil**, to architecting mobile media experiences with **React Native** at **Surge**, and delving into backend systems with **Go** for crypto vaults.
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Stat Cards | Narrative Profiles | 2023-present | Shift towards personality and storytelling over raw commit metrics |
| Resume Copy | Story-driven flow | 2022-present | Better engagement from visitors; shows communication skills |

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Node.js Vanilla Script |
| Config file | none — see Wave 0 |
| Quick run command | `node scripts/verify-content.js` |
| Full suite command | `node scripts/verify-content.js` |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| NARR-01 | Verifies presence of hero intro and "magic" keywords | unit | `node scripts/verify-content.js` | ❌ Wave 0 |
| NARR-02 | Verifies presence of Pencil, Surge, Crypto keywords | unit | `node scripts/verify-content.js` | ❌ Wave 0 |
| NARR-03 | Verifies contact/social links exist | unit | `node scripts/verify-content.js` | ❌ Wave 0 |
| TECH-01 | Verifies AI, automation, tooling keywords exist | unit | `node scripts/verify-content.js` | ❌ Wave 0 |

### Sampling Rate
- **Per task commit:** `node scripts/verify-content.js`
- **Per wave merge:** `node scripts/verify-content.js`
- **Phase gate:** Full suite green before `/gsd-verify-work`

### Wave 0 Gaps
- [ ] `scripts/verify-content.js` — covers NARR-01, NARR-02, NARR-03, TECH-01

## Sources

### Primary (HIGH confidence)
- Cover Letter (Extracted Thushar's career history: Pencil, Surge, Crypto Go backend from requirements, AI Tooling)
- GitHub Profile README Guidelines (Official GitHub documentation on markdown limitations and mobile rendering)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Markdown is the only native format for GitHub READMEs.
- Architecture: HIGH - Template system prevents mixing content authoring with build steps.
- Pitfalls: HIGH - Known rendering quirks of GitHub Mobile and HTML sanitization.

**Research date:** Sat Apr 11 2026
**Valid until:** Dec 2026