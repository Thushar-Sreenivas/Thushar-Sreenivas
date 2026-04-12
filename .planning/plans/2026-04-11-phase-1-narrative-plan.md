# Phase 1: Narrative & Content Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Write the human, jargon-free story of Thushar's technical journey, woven into a Frieren-themed narrative.

**Architecture:** We will create a `README.template.md` which will serve as the source of truth for the profile text. This text will be structured in thematic sections (Intro, Canvas/Creation, Motion/Sound, Automation/AI, Contact).

**Tech Stack:** Markdown.

---

### Task 1: Initialize the Template and Write the Hero/Intro

**Files:**
- Create: `README.template.md`

- [ ] **Step 1: Create the template file with the Hero section**

```markdown
<!-- README.template.md -->
# The Magic of Code

*"There's something about making code work that still feels like magic to me."*

I'm Thushar, a Senior Frontend Engineer who loves exploring how systems are built. Over my 6+ years of coding, my curiosity has taken me across frontend, mobile, backend, and even plugin ecosystems. I like problems that don't fit neatly into one category. 

To me, engineering is like collecting spells—whether it's deciphering browser-level media processing, architecting design systems, or exploring AI tooling, I'm always looking for the next experiment.
```

- [ ] **Step 2: Commit the base template**

```bash
git add README.template.md
git commit -m "feat: initialize template and add narrative intro (NARR-01)"
```

### Task 2: Add Spells of Creation (Pencil & Canvas Experience)

**Files:**
- Modify: `README.template.md`

- [ ] **Step 1: Append the Canvas/Creation section**

Append this to `README.template.md`:

```markdown

## Spells of Creation: The Canvas

For the past couple of years, my main quest has been leading the frontend squad at **Pencil** (a Gen AI ad platform used by Fortune 500 brands). 

Some of the "spells" I've crafted there include:
- A high-performance **React core canvas editor** that lets users manipulate video timelines and AI-generated layouts across multiple aspect ratios simultaneously.
- **Figma and Photoshop plugins** (TypeScript) that convert design files into templates, turning multi-hour manual processes into minutes.
- A client-side video pipeline leveraging **WebCodecs** for in-browser transcoding, validation, and thumbnail generation.
```

- [ ] **Step 2: Commit the creation section**

```bash
git add README.template.md
git commit -m "feat: add canvas and creation experience (NARR-02)"
```

### Task 3: Add Past Adventures (Surge & Media Playback)

**Files:**
- Modify: `README.template.md`

- [ ] **Step 1: Append the Motion & Sound section**

Append this to `README.template.md`:

```markdown

## Past Adventures: Motion & Sound

Before Pencil, I journeyed with Sequoia Capital's **Surge** accelerator. I shipped their React Native app to serve 200+ founders, handling the heavy lifting of the media playback layer: Chromecast, AirPlay, lock-screen audio controls, and persistent playback state across iOS and Android.
```

- [ ] **Step 2: Commit the adventures section**

```bash
git add README.template.md
git commit -m "feat: add Surge media playback experience (NARR-02)"
```

### Task 4: Add Automating the Mundane (Tooling & AI)

**Files:**
- Modify: `README.template.md`

- [ ] **Step 1: Append the Automation section**

Append this to `README.template.md`:

```markdown

## Automating the Mundane

Much like a mage automating chores, I strongly believe in automating things that shouldn't be manual. I spend a lot of my time on **developer workflows, AI tooling, and MCPs**. At Surge, I built release automation with GitHub Actions that saved the team 6-8 hours a week. I'm usually the person trying to make the whole development experience better so we can focus on the hard problems.
```

- [ ] **Step 2: Commit the automation section**

```bash
git add README.template.md
git commit -m "feat: add AI and tooling automation passion (TECH-01)"
```

### Task 5: Add Contact & Socials

**Files:**
- Modify: `README.template.md`

- [ ] **Step 1: Append the Contact section**

Append this to `README.template.md`:

```markdown

## Connecting the Guild

I'm always open to talking about product architecture, new technical approaches, or just geeking out about good documentation. 

If you're looking for someone who takes full ownership of their work—from architecture and sprint planning to pushing for better processes—let's connect.

- 🌐 [thusharsreenivas.dev](https://thusharsreenivas.dev)
- ✉️ [thusharsreenivas@gmail.com](mailto:thusharsreenivas@gmail.com)
- 💼 [LinkedIn](https://linkedin.com/in/thusharsreenivas)
```

- [ ] **Step 2: Commit the contact section**

```bash
git add README.template.md
git commit -m "feat: add contact and social links (NARR-03)"
```
