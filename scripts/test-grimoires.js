const fs = require('fs');
const path = require('path');
const d3 = require('d3-shape');
const TextToSVG = require('text-to-svg');

const ASSETS_DIR = path.join(__dirname, '../assets/images');
const textToSVG = TextToSVG.loadSync(path.join(__dirname, '../assets/fonts/EBGaramond-Regular.ttf'));

const THEME = {
  bg: '#0d1117',
  accent: '#14b8a6', // Teal
  text: '#e2e8f0',
  purple: '#581c87',
  gold: '#fbbf24'
};

function getPolygonPath(radius, sides, color, opacity, rotationOff = 0) {
  const line = d3.radialLine()
    .angle((d, i) => (i * 2 * Math.PI / sides) + (rotationOff * Math.PI / 180))
    .radius(radius)
    .curve(d3.curveLinearClosed);
  const data = Array.from({length: sides});
  return `<path d="${line(data)}" fill="none" stroke="${color}" stroke-width="1.5" opacity="${opacity}" />`;
}

function getGrimoire(type) {
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
    color = '#14b8a6'; // teal
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
    color = '#8b5cf6'; // purple
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
    color = '#fbbf24'; // amber/gold
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

  return `<svg viewBox="0 0 ${width} ${height}" width="100%" xmlns="http://www.w3.org/2000/svg">
    <rect width="${width}" height="${height}" fill="${THEME.bg}" rx="8" />
    <rect width="${width}" height="${height}" fill="none" stroke="${color}" stroke-width="2" stroke-opacity="0.2" rx="8" />
    ${motif}
    ${titlePath}
    ${subtitlePath}
  </svg>`;
}

['frontend', 'backend', 'tooling'].forEach(spell => {
  fs.writeFileSync(path.join(ASSETS_DIR, `grimoire-${spell}-dark-only.svg`), getGrimoire(spell));
});
console.log('Grimoires created');
