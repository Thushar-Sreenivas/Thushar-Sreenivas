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
writeSvg('test.svg', `<svg width="10" height="10" xmlns="http://www.w3.org/2000/svg"><circle cx="5" cy="5" r="5" fill="${THEMES.light.primary}"/></svg>`);
