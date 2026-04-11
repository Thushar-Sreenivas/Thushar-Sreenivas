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
  console.log(`Generated: ${filename}`);
}

// Testing the write utility
// writeSvg('test.svg', `<svg width="10" height="10" xmlns="http://www.w3.org/2000/svg"><circle cx="5" cy="5" r="5" fill="${THEMES.light.primary}"/></svg>`);

function generateHero(themeName, theme) {
  return `<svg viewBox="0 0 800 200" width="100%" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad-${themeName}" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="${theme.accent2}" stop-opacity="0.3" />
        <stop offset="100%" stop-color="${theme.bg}" stop-opacity="0" />
      </linearGradient>
    </defs>
    <rect width="800" height="200" fill="url(#grad-${themeName})" />
    <!-- Flower/magic petal motifs -->
    <circle cx="100" cy="150" r="10" fill="${theme.accent1}" opacity="0.6"/>
    <circle cx="150" cy="120" r="6" fill="${theme.primary}" opacity="0.8"/>
    <circle cx="700" cy="80" r="8" fill="${theme.accent1}" opacity="0.5"/>
    <circle cx="750" cy="140" r="12" fill="${theme.primary}" opacity="0.7"/>
    
    <text x="400" y="100" font-family="EB Garamond, serif" font-size="24" font-style="italic" fill="${theme.text}" text-anchor="middle">
      "There's something about making code work that still feels like magic to me."
    </text>
  </svg>`;
}

function generateFooter(themeName, theme) {
  return `<svg viewBox="0 0 800 60" width="100%" xmlns="http://www.w3.org/2000/svg">
    <path d="M 200,30 Q 400,60 600,30" fill="none" stroke="${theme.accent1}" stroke-width="2" stroke-dasharray="4 8" opacity="0.5"/>
    <circle cx="400" cy="45" r="4" fill="${theme.primary}"/>
    <circle cx="380" cy="35" r="2" fill="${theme.accent2}"/>
    <circle cx="420" cy="35" r="2" fill="${theme.accent2}"/>
  </svg>`;
}

['light', 'dark'].forEach(mode => {
  writeSvg(`hero-banner-${mode}.svg`, generateHero(mode, THEMES[mode]));
  writeSvg(`footer-${mode}.svg`, generateFooter(mode, THEMES[mode]));
});

function generateDivider(themeName, theme) {
  return `<svg viewBox="0 0 800 40" width="100%" xmlns="http://www.w3.org/2000/svg">
    <line x1="100" y1="20" x2="350" y2="20" stroke="${theme.accent1}" stroke-width="1" opacity="0.4"/>
    <polygon points="400,15 405,25 395,25" fill="${theme.primary}" opacity="0.8"/>
    <circle cx="380" cy="22" r="2" fill="${theme.accent2}"/>
    <circle cx="420" cy="22" r="2" fill="${theme.accent2}"/>
    <line x1="450" y1="20" x2="700" y2="20" stroke="${theme.accent1}" stroke-width="1" opacity="0.4"/>
  </svg>`;
}

function generateHeader(title, width, themeName, theme) {
  return `<svg viewBox="0 0 ${width} 60" width="100%" xmlns="http://www.w3.org/2000/svg">
    <text x="20" y="40" font-family="EB Garamond, serif" font-size="28" font-weight="bold" fill="${theme.text}">
      ${title}
    </text>
    <circle cx="10" cy="32" r="4" fill="${theme.primary}"/>
  </svg>`;
}

const headers = [
  { file: 'header-journey', title: 'The Journey So Far', width: 400 },
  { file: 'header-grimoire', title: 'The Grimoire', width: 300 },
  { file: 'header-contact', title: 'Send a Raven', width: 300 }
];

['light', 'dark'].forEach(mode => {
  writeSvg(`divider-${mode}.svg`, generateDivider(mode, THEMES[mode]));
  headers.forEach(h => {
    writeSvg(`${h.file}-${mode}.svg`, generateHeader(h.title, h.width, mode, THEMES[mode]));
  });
});

function generateBookshelf(title, techList, themeName, theme) {
  const books = techList.map((tech, i) => {
    const x = 50 + (i * 90);
    return `
      <g transform="translate(${x}, 30)">
        <rect width="60" height="80" rx="4" fill="${theme.accent2}" opacity="0.2" stroke="${theme.accent1}" stroke-width="2"/>
        <text x="30" y="45" font-family="sans-serif" font-size="12" fill="${theme.text}" text-anchor="middle">${tech}</text>
      </g>
    `;
  }).join('');

  return `<svg viewBox="0 0 800 150" width="100%" xmlns="http://www.w3.org/2000/svg">
    <text x="50" y="20" font-family="EB Garamond, serif" font-size="16" fill="${theme.primary}" font-weight="bold">${title}</text>
    <!-- Shelf -->
    <rect x="30" y="110" width="700" height="10" fill="${theme.accent1}" opacity="0.5" rx="2"/>
    ${books}
  </svg>`;
}

const grimoires = [
  { file: 'grimoire-frontend', title: 'Frontend Spells', techs: ['React', 'TypeScript', 'React Native'] },
  { file: 'grimoire-backend', title: 'Backend Runes', techs: ['Go', 'Node.js'] },
  { file: 'grimoire-tooling', title: 'Automation Artifacts', techs: ['GitHub Actions', 'Figma API'] }
];

['light', 'dark'].forEach(mode => {
  grimoires.forEach(g => {
    writeSvg(`${g.file}-${mode}.svg`, generateBookshelf(g.title, g.techs, mode, THEMES[mode]));
  });
});
