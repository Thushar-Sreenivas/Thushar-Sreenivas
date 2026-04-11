# Phase 2: Visual Design System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Establish the "Frieren: Beyond Journey's End" visual identity by creating custom SVGs for headers, dividers, tech stack representations, and hero/footer imagery.

**Architecture:** We will create a Node.js script `scripts/generate-assets.js` that programmatically generates all SVG files (light and dark mode versions) to maintain visual consistency, DRYness, and easy tweaking of colors/fonts. Then we will update `README.template.md` to reference these generated SVGs.

**Tech Stack:** Node.js, SVG, Markdown.

---

### Task 1: Initialize Asset Generation Script and Color Constants

**Files:**
- Create: `scripts/generate-assets.js`
- Create: `package.json`

- [ ] **Step 1: Create `package.json` for running the script**
```bash
npm init -y
```

- [ ] **Step 2: Create `scripts/generate-assets.js` with color schemes and utilities**
```javascript
const fs = require('fs');
const path = require('path');

const ASSETS_DIR = path.join(__dirname, '../assets/images');

// Frieren themes
const THEMES = {
  light: {
    bg: 'transparent',
    text: '#334155',
    accent1: '#eab308', // Gold
    accent2: '#bae6fd', // Soft blue
    primary: '#0ea5e9'
  },
  dark: {
    bg: 'transparent',
    text: '#e2e8f0',
    accent1: '#94a3b8', // Silver
    accent2: '#581c87', // Deep purple
    primary: '#14b8a6'  // Teal
  }
};

if (!fs.existsSync(ASSETS_DIR)) {
  fs.mkdirSync(ASSETS_DIR, { recursive: true });
}

function writeSvg(filename, content) {
  fs.writeFileSync(path.join(ASSETS_DIR, filename), content);
  console.log(\`Generated: \${filename}\`);
}

// Testing the write utility
writeSvg('test.svg', \`<svg width="10" height="10" xmlns="http://www.w3.org/2000/svg"><circle cx="5" cy="5" r="5" fill="\${THEMES.light.primary}"/></svg>\`);
```

- [ ] **Step 3: Run the script to verify generation**
```bash
node scripts/generate-assets.js
```

- [ ] **Step 4: Commit**
```bash
git add package.json scripts/generate-assets.js assets/images/test.svg
git commit -m "feat: initialize SVG generation script and themes"
```

### Task 2: Generate Hero and Footer SVGs

**Files:**
- Modify: `scripts/generate-assets.js`

- [ ] **Step 1: Add Hero and Footer SVG generators**
Append to `scripts/generate-assets.js`:
```javascript
function generateHero(themeName, theme) {
  return \`<svg width="800" height="200" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad-\${themeName}" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="\${theme.accent2}" stop-opacity="0.3" />
        <stop offset="100%" stop-color="\${theme.bg}" stop-opacity="0" />
      </linearGradient>
    </defs>
    <rect width="800" height="200" fill="url(#grad-\${themeName})" />
    <!-- Flower/magic petal motifs -->
    <circle cx="100" cy="150" r="10" fill="\${theme.accent1}" opacity="0.6"/>
    <circle cx="150" cy="120" r="6" fill="\${theme.primary}" opacity="0.8"/>
    <circle cx="700" cy="80" r="8" fill="\${theme.accent1}" opacity="0.5"/>
    <circle cx="750" cy="140" r="12" fill="\${theme.primary}" opacity="0.7"/>
    
    <text x="400" y="100" font-family="EB Garamond, serif" font-size="24" font-style="italic" fill="\${theme.text}" text-anchor="middle">
      "There's something about making code work that still feels like magic to me."
    </text>
  </svg>\`;
}

function generateFooter(themeName, theme) {
  return \`<svg width="800" height="60" xmlns="http://www.w3.org/2000/svg">
    <path d="M 200,30 Q 400,60 600,30" fill="none" stroke="\${theme.accent1}" stroke-width="2" stroke-dasharray="4 8" opacity="0.5"/>
    <circle cx="400" cy="45" r="4" fill="\${theme.primary}"/>
    <circle cx="380" cy="35" r="2" fill="\${theme.accent2}"/>
    <circle cx="420" cy="35" r="2" fill="\${theme.accent2}"/>
  </svg>\`;
}

['light', 'dark'].forEach(mode => {
  writeSvg(\`hero-banner-\${mode}.svg\`, generateHero(mode, THEMES[mode]));
  writeSvg(\`footer-\${mode}.svg\`, generateFooter(mode, THEMES[mode]));
});
```

- [ ] **Step 2: Run the script**
```bash
node scripts/generate-assets.js
```

- [ ] **Step 3: Commit**
```bash
git add scripts/generate-assets.js assets/images/hero-banner-*.svg assets/images/footer-*.svg
git commit -m "feat: generate hero and footer SVGs"
```

### Task 3: Generate Dividers and Section Headers

**Files:**
- Modify: `scripts/generate-assets.js`

- [ ] **Step 1: Add Divider and Header SVG generators**
Append to `scripts/generate-assets.js`:
```javascript
function generateDivider(themeName, theme) {
  return \`<svg width="800" height="40" xmlns="http://www.w3.org/2000/svg">
    <line x1="100" y1="20" x2="350" y2="20" stroke="\${theme.accent1}" stroke-width="1" opacity="0.4"/>
    <polygon points="400,15 405,25 395,25" fill="\${theme.primary}" opacity="0.8"/>
    <circle cx="380" cy="22" r="2" fill="\${theme.accent2}"/>
    <circle cx="420" cy="22" r="2" fill="\${theme.accent2}"/>
    <line x1="450" y1="20" x2="700" y2="20" stroke="\${theme.accent1}" stroke-width="1" opacity="0.4"/>
  </svg>\`;
}

function generateHeader(title, width, themeName, theme) {
  return \`<svg width="\${width}" height="60" xmlns="http://www.w3.org/2000/svg">
    <text x="20" y="40" font-family="EB Garamond, serif" font-size="28" font-weight="bold" fill="\${theme.text}">
      \${title}
    </text>
    <circle cx="10" cy="32" r="4" fill="\${theme.primary}"/>
  </svg>\`;
}

const headers = [
  { file: 'header-journey', title: 'The Journey So Far', width: 400 },
  { file: 'header-grimoire', title: 'The Grimoire', width: 300 },
  { file: 'header-contact', title: 'Send a Raven', width: 300 }
];

['light', 'dark'].forEach(mode => {
  writeSvg(\`divider-\${mode}.svg\`, generateDivider(mode, THEMES[mode]));
  headers.forEach(h => {
    writeSvg(\`\${h.file}-\${mode}.svg\`, generateHeader(h.title, h.width, mode, THEMES[mode]));
  });
});
```

- [ ] **Step 2: Run the script**
```bash
node scripts/generate-assets.js
```

- [ ] **Step 3: Commit**
```bash
git add scripts/generate-assets.js assets/images/divider-*.svg assets/images/header-*.svg
git commit -m "feat: generate dividers and section headers"
```

### Task 4: Generate Tech Stack Bookshelves (Grimoires)

**Files:**
- Modify: `scripts/generate-assets.js`

- [ ] **Step 1: Add Bookshelf SVG generator**
Append to `scripts/generate-assets.js`:
```javascript
function generateBookshelf(title, techList, themeName, theme) {
  const books = techList.map((tech, i) => {
    const x = 50 + (i * 90);
    return \`
      <g transform="translate(\${x}, 30)">
        <rect width="60" height="80" rx="4" fill="\${theme.accent2}" opacity="0.2" stroke="\${theme.accent1}" stroke-width="2"/>
        <text x="30" y="45" font-family="sans-serif" font-size="12" fill="\${theme.text}" text-anchor="middle">\${tech}</text>
      </g>
    \`;
  }).join('');

  return \`<svg width="800" height="150" xmlns="http://www.w3.org/2000/svg">
    <text x="50" y="20" font-family="EB Garamond, serif" font-size="16" fill="\${theme.primary}" font-weight="bold">\${title}</text>
    <!-- Shelf -->
    <rect x="30" y="110" width="700" height="10" fill="\${theme.accent1}" opacity="0.5" rx="2"/>
    \${books}
  </svg>\`;
}

const grimoires = [
  { file: 'grimoire-frontend', title: 'Frontend Spells', techs: ['React', 'TypeScript', 'React Native'] },
  { file: 'grimoire-backend', title: 'Backend Runes', techs: ['Go', 'Node.js'] },
  { file: 'grimoire-tooling', title: 'Automation Artifacts', techs: ['GitHub Actions', 'Figma API'] }
];

['light', 'dark'].forEach(mode => {
  grimoires.forEach(g => {
    writeSvg(\`\${g.file}-\${mode}.svg\`, generateBookshelf(g.title, g.techs, mode, THEMES[mode]));
  });
});
```

- [ ] **Step 2: Run the script**
```bash
node scripts/generate-assets.js
```

- [ ] **Step 3: Commit**
```bash
git add scripts/generate-assets.js assets/images/grimoire-*.svg
git commit -m "feat: generate tech stack bookshelf SVGs"
```

### Task 5: Integrate SVGs into `README.template.md`

**Files:**
- Modify: `README.template.md`

- [ ] **Step 1: Replace elements in template with SVG image tags**
Open `README.template.md` using the script or manually. Since it's easier to modify directly, here is a sed command to replace the quote with the Hero SVG.

```bash
sed -i.bak -e 's|> \*"There'"'"'s something about making code work that still feels like magic to me\."\*|<picture><source media="(prefers-color-scheme: dark)" srcset="assets/images/hero-banner-dark.svg"><img src="assets/images/hero-banner-light.svg" alt="Quote: There is something about making code work that still feels like magic to me."></picture>|' README.template.md
```

Wait, simpler to do manually in node or just give the file modification step.

Create a replacement script `scripts/update-readme.js`:
```javascript
const fs = require('fs');
const path = require('path');

const readmePath = path.join(__dirname, '../README.template.md');
let content = fs.readFileSync(readmePath, 'utf8');

// Replace quote with hero banner
content = content.replace(
  /> \*"There's something about making code work that still feels like magic to me\."\*/,
  '<picture><source media="(prefers-color-scheme: dark)" srcset="assets/images/hero-banner-dark.svg"><img src="assets/images/hero-banner-light.svg" width="800" alt="Magic Quote"></picture>'
);

// Add grimoires under The Grimoire heading
content = content.replace(
  /## 🔮 The Grimoire/,
  \`<picture><source media="(prefers-color-scheme: dark)" srcset="assets/images/header-grimoire-dark.svg"><img src="assets/images/header-grimoire-light.svg" alt="The Grimoire"></picture>

<picture><source media="(prefers-color-scheme: dark)" srcset="assets/images/grimoire-frontend-dark.svg"><img src="assets/images/grimoire-frontend-light.svg" alt="Frontend Spells"></picture>
<picture><source media="(prefers-color-scheme: dark)" srcset="assets/images/grimoire-backend-dark.svg"><img src="assets/images/grimoire-backend-light.svg" alt="Backend Runes"></picture>
<picture><source media="(prefers-color-scheme: dark)" srcset="assets/images/grimoire-tooling-dark.svg"><img src="assets/images/grimoire-tooling-light.svg" alt="Automation Artifacts"></picture>\`
);

// Replace other headers
content = content.replace(
  /## 📖 The Journey So Far/,
  '<picture><source media="(prefers-color-scheme: dark)" srcset="assets/images/header-journey-dark.svg"><img src="assets/images/header-journey-light.svg" alt="The Journey So Far"></picture>'
);

content = content.replace(
  /## 📫 Send a Raven/,
  '<picture><source media="(prefers-color-scheme: dark)" srcset="assets/images/header-contact-dark.svg"><img src="assets/images/header-contact-light.svg" alt="Send a Raven"></picture>'
);

// Add footer at the very end
content += '\\n\\n<picture><source media="(prefers-color-scheme: dark)" srcset="assets/images/footer-dark.svg"><img src="assets/images/footer-light.svg" alt="Footer"></picture>';

fs.writeFileSync(readmePath, content);
console.log('README.template.md updated');
```

- [ ] **Step 2: Run update script**
```bash
node scripts/update-readme.js
```

- [ ] **Step 3: Clean up and Commit**
```bash
rm scripts/update-readme.js
git add README.template.md
git commit -m "feat: integrate Frieren visual design SVGs into README (VISL-01, VISL-02)"
```
