const fs = require('fs');
const path = require('path');
const d3 = require('d3-shape');
const TextToSVG = require('text-to-svg');

const ASSETS_DIR = path.join(__dirname, '../assets/images');

const THEME = {
  bg: '#0d1117',
  accent: '#14b8a6', // Teal
  text: '#e2e8f0'
};

if (!fs.existsSync(ASSETS_DIR)) {
  fs.mkdirSync(ASSETS_DIR, { recursive: true });
}

const textToSVG = TextToSVG.loadSync(path.join(__dirname, '../assets/fonts/EBGaramond-Regular.ttf'));

function writeSvg(filename, content) {
  fs.writeFileSync(path.join(ASSETS_DIR, filename), content);
  console.log(`Generated: ${filename}`);
}

function generateDummy(filename, width, height) {
  const content = `<svg viewBox="0 0 ${width} ${height}" width="100%" xmlns="http://www.w3.org/2000/svg">
    <rect width="${width}" height="${height}" fill="${THEME.bg}" />
    <text x="${width/2}" y="${height/2}" font-family="sans-serif" font-size="20" fill="${THEME.accent}" text-anchor="middle" dominant-baseline="middle">Placeholder: ${filename}</text>
  </svg>`;
  writeSvg(filename, content);
}

// Generate Dummies
generateDummy('hero-banner-dark-only.svg', 800, 200);
['frontend', 'backend', 'tooling'].forEach(spell => {
  generateDummy(`grimoire-${spell}-dark-only.svg`, 800, 150);
});

// Helper for magic circles
function getMagicCircle(cx, cy, r, rotation = 0) {
  // complex magic circle paths
  const g = `<g transform="translate(${cx}, ${cy}) rotate(${rotation})">
    <circle cx="0" cy="0" r="${r}" fill="none" stroke="${THEME.accent}" stroke-width="1" opacity="0.4" />
    <circle cx="0" cy="0" r="${r * 0.9}" fill="none" stroke="${THEME.accent}" stroke-width="0.5" stroke-dasharray="4 4" opacity="0.6" />
    <circle cx="0" cy="0" r="${r * 0.75}" fill="none" stroke="${THEME.accent}" stroke-width="1" opacity="0.3" />
    <!-- Outer triangles -->
    <polygon points="0,-${r} ${r*0.866},${r*0.5} -${r*0.866},${r*0.5}" fill="none" stroke="${THEME.accent}" stroke-width="0.5" opacity="0.5" />
    <polygon points="0,${r} -${r*0.866},-${r*0.5} ${r*0.866},-${r*0.5}" fill="none" stroke="${THEME.accent}" stroke-width="0.5" opacity="0.5" />
    <!-- Inner square -->
    <rect x="-${r*0.53}" y="-${r*0.53}" width="${r*1.06}" height="${r*1.06}" fill="none" stroke="${THEME.accent}" stroke-width="0.5" opacity="0.4" transform="rotate(45)" />
    <!-- Central dot -->
    <circle cx="0" cy="0" r="${r * 0.05}" fill="${THEME.accent}" opacity="0.8" />
  </g>`;
  return g;
}

// Generate Headers
function generateHeader(title, filename) {
  const width = 800; // use full width for easier scaling
  const height = 120;
  
  const textPath = textToSVG.getPath(title, {
    x: 100, 
    y: 60, 
    fontSize: 48, 
    anchor: 'left dominant', 
    attributes: { fill: THEME.text }
  });

  const content = `<svg viewBox="0 0 ${width} ${height}" width="100%" xmlns="http://www.w3.org/2000/svg">
    <rect width="${width}" height="${height}" fill="${THEME.bg}" />
    <!-- Decorative magic circle on the left -->
    ${getMagicCircle(50, 60, 40)}
    <!-- The text -->
    ${textPath}
    <!-- Decorative line -->
    <path d="M 100,80 L 750,80" fill="none" stroke="${THEME.accent}" stroke-width="1" opacity="0.5" />
    <circle cx="750" cy="80" r="3" fill="${THEME.accent}" opacity="0.8" />
  </svg>`;
  writeSvg(filename, content);
}

generateHeader('The Journey So Far', 'header-journey-dark-only.svg');
generateHeader('The Grimoire', 'header-grimoire-dark-only.svg');
generateHeader('Send a Raven', 'header-contact-dark-only.svg');

// Generate Divider
function generateDivider(filename) {
  const width = 800;
  const height = 60;
  
  const content = `<svg viewBox="0 0 ${width} ${height}" width="100%" xmlns="http://www.w3.org/2000/svg">
    <rect width="${width}" height="${height}" fill="${THEME.bg}" />
    <!-- Left line -->
    <path d="M 50,30 L 350,30" fill="none" stroke="${THEME.accent}" stroke-width="1" opacity="0.4" />
    <!-- Central motif -->
    ${getMagicCircle(400, 30, 20)}
    <circle cx="370" cy="30" r="3" fill="${THEME.accent}" opacity="0.6" />
    <circle cx="430" cy="30" r="3" fill="${THEME.accent}" opacity="0.6" />
    <!-- Right line -->
    <path d="M 450,30 L 750,30" fill="none" stroke="${THEME.accent}" stroke-width="1" opacity="0.4" />
  </svg>`;
  writeSvg(filename, content);
}

generateDivider('divider-dark-only.svg');

// Generate Footer
function generateFooter(filename) {
  const width = 800;
  const height = 100;
  
  const textPath = textToSVG.getPath('Crafted with 🩵 by Thushar', {
    x: 400, 
    y: 50, 
    fontSize: 24, 
    anchor: 'middle dominant', 
    attributes: { fill: THEME.text, opacity: 0.7 }
  });

  const content = `<svg viewBox="0 0 ${width} ${height}" width="100%" xmlns="http://www.w3.org/2000/svg">
    <rect width="${width}" height="${height}" fill="${THEME.bg}" />
    <!-- Subtle arc -->
    <path d="M 200,20 Q 400,60 600,20" fill="none" stroke="${THEME.accent}" stroke-width="1" stroke-dasharray="4 8" opacity="0.4" />
    <!-- Small central motifs -->
    ${getMagicCircle(400, 75, 10)}
    <!-- Text -->
    ${textPath}
  </svg>`;
  writeSvg(filename, content);
}

generateFooter('footer-dark-only.svg');
