const fs = require('fs');
const path = require('path');
const assert = require('assert');

const ASSETS_DIR = path.join(__dirname, '../assets/images');

function verifySVGs() {
  assert(fs.existsSync(ASSETS_DIR), `Assets directory not found at ${ASSETS_DIR}`);

  const files = fs.readdirSync(ASSETS_DIR).filter(f => f.endsWith('.svg'));
  assert(files.length > 0, 'No SVGs found in assets directory');

  // Assert the existence of at least one generated grimoire-* SVG file
  // Wait, I noticed earlier the generated assets were "grimoire-frontend-light.svg", etc.
  assert(
    files.some(f => f.startsWith('grimoire-')),
    'Missing required grimoire-* SVG badge replacement files'
  );

  files.forEach(file => {
    const filePath = path.join(ASSETS_DIR, file);
    const content = fs.readFileSync(filePath, 'utf8');

    // Root SVG tag
    const svgTagMatch = content.match(/<svg[^>]*>/);
    assert(svgTagMatch, `[${file}] No <svg> tag found`);
    const svgTag = svgTagMatch[0];

    // Assert fluid scaling attributes
    assert(/viewBox="[^"]+"/.test(svgTag), `[${file}] Missing viewBox attribute on root <svg>`);
    assert(/width="100%"/.test(svgTag), `[${file}] SVG root must have width="100%"`);

    // Assert Frieren theme colors based on mode
    if (file.endsWith('-light.svg')) {
      const hasLightColor = /#eab308|#0ea5e9|#bae6fd/i.test(content);
      assert(hasLightColor, `[${file}] Missing required light theme colors (#eab308, #0ea5e9, or #bae6fd)`);
    } else if (file.endsWith('-dark.svg') || file.endsWith('-dark-only.svg')) {
      const hasDarkColor = /#94a3b8|#14b8a6|#581c87/i.test(content);
      assert(hasDarkColor, `[${file}] Missing required dark theme colors (#94a3b8, #14b8a6, or #581c87)`);
    }
  });

  // Check matching dark/light mode variants
  const lightFiles = files.filter(f => f.endsWith('-light.svg'));
  const darkFiles = files.filter(f => f.endsWith('-dark.svg'));

  lightFiles.forEach(lf => {
    const base = lf.replace('-light.svg', '');
    assert(darkFiles.includes(`${base}-dark.svg`), `Missing dark mode variant for ${lf}`);
  });

  darkFiles.forEach(df => {
    const base = df.replace('-dark.svg', '');
    assert(lightFiles.includes(`${base}-light.svg`), `Missing light mode variant for ${df}`);
  });

  console.log(`✅ All ${files.length} SVGs passed verification with native asserts!`);
}

verifySVGs();
