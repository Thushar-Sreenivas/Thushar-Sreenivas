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

function getHeroBanner(width, height) {
  const cx = width / 2;
  const cy = height / 2;
  const r = Math.min(width, height) * 0.45;

  let content = `<svg viewBox="0 0 ${width} ${height}" width="100%" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="glow-hero" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="${THEME.accent}" stop-opacity="0.2"/>
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
  
  return content;
}

function getPolygonPath(radius, sides, color, opacity, rotationOff = 0) {
  const line = d3.radialLine()
    .angle((d, i) => (i * 2 * Math.PI / sides) + (rotationOff * Math.PI / 180))
    .radius(radius)
    .curve(d3.curveLinearClosed);
  const data = Array.from({length: sides});
  return `<path d="${line(data)}" fill="none" stroke="${color}" stroke-width="1" opacity="${opacity}" />`;
}

function getStarPath(radius, points, color, opacity) {
  const innerRadius = radius * 0.4;
  const line = d3.radialLine()
    .angle((d, i) => i * Math.PI / points)
    .radius((d, i) => i % 2 === 0 ? radius : innerRadius)
    .curve(d3.curveLinearClosed);
  const data = Array.from({length: points * 2});
  return `<path d="${line(data)}" fill="none" stroke="${color}" stroke-width="1" opacity="${opacity}" />`;
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

fs.writeFileSync(path.join(ASSETS_DIR, 'hero-banner-dark-only.svg'), getHeroBanner(800, 400));
console.log('Hero banner created');
