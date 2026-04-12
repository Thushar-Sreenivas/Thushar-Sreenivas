const fs = require('fs');
const path = require('path');
const d3 = require('d3-shape');
const TextToSVG = require('text-to-svg');

const ASSETS_DIR = path.join(__dirname, '../assets/images');

const THEME = {
  bg: '#0d1117',
  accent: '#14b8a6', // Teal
  text: '#e2e8f0',
  purple: '#581c87', // Required dark theme purple
  gold: '#94a3b8'    // Slate instead of gold, matching required dark theme color
};

if (!fs.existsSync(ASSETS_DIR)) {
  fs.mkdirSync(ASSETS_DIR, { recursive: true });
}

const textToSVG = TextToSVG.loadSync(path.join(__dirname, '../assets/fonts/EBGaramond-Regular.ttf'));

function writeSvg(filename, content) {
  fs.writeFileSync(path.join(ASSETS_DIR, filename), content);
  console.log(`Generated: ${filename}`);
}

// Basic Shapes
function getPolygonPath(radius, sides, color, opacity, rotationOff = 0) {
  const line = d3.radialLine()
    .angle((d, i) => (i * 2 * Math.PI / sides) + (rotationOff * Math.PI / 180))
    .radius(radius)
    .curve(d3.curveLinearClosed);
  const data = Array.from({length: sides});
  return `<path d="${line(data)}" fill="none" stroke="${color}" stroke-width="1.5" opacity="${opacity}" />`;
}

function getStarPath(radius, points, color, opacity) {
  const innerRadius = radius * 0.4;
  const line = d3.radialLine()
    .angle((d, i) => i * Math.PI / points)
    .radius((d, i) => i % 2 === 0 ? radius : innerRadius)
    .curve(d3.curveLinearClosed);
  const data = Array.from({length: points * 2});
  return `<path d="${line(data)}" fill="none" stroke="${color}" stroke-width="1.5" opacity="${opacity}" />`;
}

function getArcs(innerRadius, outerRadius, count, color, opacity) {
  let arcs = '';
  const arcGen = d3.arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);
    
  const angleStep = (2 * Math.PI) / count;
  for(let i=0; i<count; i++) {
    const start = i * angleStep;
    const end = start + (angleStep * 0.6); // 60% arc, 40% gap
    const pathData = arcGen({startAngle: start, endAngle: end});
    arcs += `<path d="${pathData}" fill="${color}" opacity="${opacity}" />\n`;
  }
  return arcs;
}

// Hero Banner Generator
function generateHeroBanner(filename) {
  const width = 800;
  const height = 400;
  const cx = width / 2;
  const cy = height / 2;
  const r = Math.min(width, height) * 0.45;

  let content = `<svg viewBox="0 0 ${width} ${height}" width="100%" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="glow-hero" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="${THEME.accent}" stop-opacity="0.15"/>
        <stop offset="100%" stop-color="${THEME.bg}" stop-opacity="0"/>
      </radialGradient>
      <filter id="blur-glow-hero" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <rect width="${width}" height="${height}" fill="${THEME.bg}" />
    
    <circle cx="${cx}" cy="${cy}" r="${r * 1.5}" fill="url(#glow-hero)" />
    
    <g transform="translate(${cx}, ${cy})">
      <!-- Main rotating group 1 -->
      <g>
        <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="60s" repeatCount="indefinite" />
        <circle r="${r}" fill="none" stroke="${THEME.accent}" stroke-width="1.5" opacity="0.8" filter="url(#blur-glow-hero)"/>
        <circle r="${r * 0.95}" fill="none" stroke="${THEME.accent}" stroke-width="0.5" opacity="0.5"/>
        <circle r="${r * 0.85}" fill="none" stroke="${THEME.accent}" stroke-width="1" stroke-dasharray="10 5" opacity="0.6"/>
        
        <!-- Nested star -->
        ${getStarPath(r * 0.85, 7, THEME.accent, 0.4)}
      </g>
      
      <!-- Counter-rotating group -->
      <g>
        <animateTransform attributeName="transform" type="rotate" from="360 0 0" to="0 0 0" dur="40s" repeatCount="indefinite" />
        <circle r="${r * 0.7}" fill="none" stroke="${THEME.accent}" stroke-width="2" opacity="0.7"/>
        ${getPolygonPath(r * 0.7, 5, THEME.accent, 0.5)}
        ${getPolygonPath(r * 0.7, 5, THEME.accent, 0.5, 36)} 
        
        <!-- Arcs -->
        ${getArcs(r * 0.6, r * 0.65, 8, THEME.accent, 0.6)}
      </g>
      
      <!-- Inner core -->
      <g>
        <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="20s" repeatCount="indefinite" />
        <circle r="${r * 0.4}" fill="none" stroke="${THEME.accent}" stroke-width="1" opacity="0.8"/>
        ${getStarPath(r * 0.4, 12, THEME.accent, 0.4)}
        <circle r="${r * 0.1}" fill="${THEME.accent}" opacity="0.9" filter="url(#blur-glow-hero)"/>
      </g>
    </g>
    
    <!-- Orbiting elements -->
    <g transform="translate(${cx}, ${cy})">
      <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="30s" repeatCount="indefinite" />
      <g transform="translate(${r * 1.1}, 0)">
        <circle r="${r * 0.15}" fill="${THEME.bg}" stroke="${THEME.accent}" stroke-width="1" />
        ${getStarPath(r * 0.15, 6, THEME.accent, 0.6)}
      </g>
    </g>
    <g transform="translate(${cx}, ${cy})">
      <animateTransform attributeName="transform" type="rotate" from="180 0 0" to="540 0 0" dur="45s" repeatCount="indefinite" />
      <g transform="translate(${r * 1.2}, 0)">
        <circle r="${r * 0.1}" fill="${THEME.bg}" stroke="${THEME.accent}" stroke-width="1" stroke-dasharray="2 2" />
        <circle r="${r * 0.05}" fill="${THEME.accent}" opacity="0.8" />
      </g>
    </g>
`;

  // Quote
  const quote1 = "There's something about making";
  const quote2 = "code work...";
  
  const textPath1 = textToSVG.getPath(quote1, {
    x: 40, 
    y: 60, 
    fontSize: 24, 
    anchor: 'left top', 
    attributes: { fill: THEME.text }
  });
  
  const textPath2 = textToSVG.getPath(quote2, {
    x: 40, 
    y: 90, 
    fontSize: 24, 
    anchor: 'left top', 
    attributes: { fill: THEME.text }
  });

  content += `
    ${textPath1}
    ${textPath2}
  </svg>`;
  
  writeSvg(filename, content);
}

// Grimoire Generator
function generateGrimoire(type, filename) {
  const width = 800;
  const height = 150;
  
  let motif = '';
  let color = THEME.accent;
  const cx = 150;
  const cy = 75;
  const r = 60;
  
  // Specific geometric patterns per grimoire type
  if (type === 'frontend') {
    // Overlapping triangles
    color = THEME.accent; // teal
    motif = `
      <g transform="translate(${cx}, ${cy})">
        <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="40s" repeatCount="indefinite" />
        <circle r="${r}" fill="none" stroke="${color}" stroke-width="1" opacity="0.6" stroke-dasharray="4 4" />
        <circle r="${r*0.9}" fill="none" stroke="${color}" stroke-width="0.5" opacity="0.4" />
        ${getPolygonPath(r*0.8, 3, color, 0.7)}
        ${getPolygonPath(r*0.8, 3, color, 0.7, 60)}
        ${getPolygonPath(r*0.4, 3, color, 0.9, 180)}
      </g>
    `;
  } else if (type === 'backend') {
    // Concentric pentagrams
    color = THEME.purple; // purple
    motif = `
      <g transform="translate(${cx}, ${cy})">
        <animateTransform attributeName="transform" type="rotate" from="360 0 0" to="0 0 0" dur="45s" repeatCount="indefinite" />
        <circle r="${r}" fill="none" stroke="${color}" stroke-width="2" opacity="0.5" />
        ${getPolygonPath(r*0.85, 5, color, 0.8)}
        ${getPolygonPath(r*0.85, 5, color, 0.8, 36)}
        <circle r="${r*0.4}" fill="none" stroke="${color}" stroke-width="1" opacity="0.6" stroke-dasharray="2 6" />
      </g>
    `;
  } else if (type === 'tooling') {
    // Interlocking hexagons/gears
    color = THEME.gold; // amber/gold
    motif = `
      <g transform="translate(${cx}, ${cy})">
        <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="35s" repeatCount="indefinite" />
        ${getPolygonPath(r, 6, color, 0.6)}
        ${getPolygonPath(r*0.8, 6, color, 0.6, 30)}
        <circle r="${r*0.6}" fill="none" stroke="${color}" stroke-width="2" opacity="0.5" stroke-dasharray="8 4" />
        <circle r="${r*0.2}" fill="${color}" opacity="0.7" />
      </g>
      <!-- Small interlocked gear -->
      <g transform="translate(${cx + r*1.1}, ${cy + r*0.5})">
        <animateTransform attributeName="transform" type="rotate" from="360 0 0" to="0 0 0" dur="20s" repeatCount="indefinite" />
        ${getPolygonPath(r*0.4, 6, color, 0.8)}
        <circle r="${r*0.2}" fill="none" stroke="${color}" stroke-width="1" opacity="0.8" />
      </g>
    `;
  }
  
  const titlePath = textToSVG.getPath(`Grimoire of ${type.charAt(0).toUpperCase() + type.slice(1)}`, {
    x: 280, 
    y: 50, 
    fontSize: 32, 
    anchor: 'left dominant', 
    attributes: { fill: THEME.text }
  });
  
  const subtitlePath = textToSVG.getPath(type === 'frontend' ? 'React, Vue, Tailwind, D3.js' : type === 'backend' ? 'Node.js, Python, PostgreSQL, Redis' : 'Docker, Git, AWS, CI/CD', {
    x: 280, 
    y: 90, 
    fontSize: 18, 
    anchor: 'left dominant', 
    attributes: { fill: color, opacity: 0.8 }
  });

  const content = `<svg viewBox="0 0 ${width} ${height}" width="100%" xmlns="http://www.w3.org/2000/svg">
    <rect width="${width}" height="${height}" fill="${THEME.bg}" rx="8" />
    <rect width="${width}" height="${height}" fill="none" stroke="${color}" stroke-width="2" stroke-opacity="0.2" rx="8" />
    ${motif}
    ${titlePath}
    ${subtitlePath}
  </svg>`;
  
  writeSvg(filename, content);
}


// Legacy helper for generic headers/dividers/footer
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

// Generate the specific elements
generateHeroBanner('hero-banner-dark-only.svg');

['frontend', 'backend', 'tooling'].forEach(spell => {
  generateGrimoire(spell, `grimoire-${spell}-dark-only.svg`);
});

generateHeader('The Journey So Far', 'header-journey-dark-only.svg');
generateHeader('The Grimoire', 'header-grimoire-dark-only.svg');
generateHeader('Send a Raven', 'header-contact-dark-only.svg');

generateDivider('divider-dark-only.svg');
generateFooter('footer-dark-only.svg');
