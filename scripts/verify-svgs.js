const fs = require('fs');
const path = require('path');
const assert = require('assert');

const ASSETS_DIR = path.join(__dirname, '../assets');

function verifySVGs() {
  if (!fs.existsSync(ASSETS_DIR)) {
    console.log('No assets directory found. Passing.');
    return;
  }

  const files = fs.readdirSync(ASSETS_DIR).filter(f => f.endsWith('.svg'));
  
  if (files.length === 0) {
    console.log('No SVGs to verify. Passing.');
    return;
  }

  let errors = 0;

  files.forEach(file => {
    const filePath = path.join(ASSETS_DIR, file);
    const content = fs.readFileSync(filePath, 'utf8');
    
    console.log(`Verifying ${file}...`);
    
    // Check root SVG tag
    const svgTagMatch = content.match(/<svg[^>]*>/);
    if (!svgTagMatch) {
      console.error(`❌ [${file}] No <svg> tag found`);
      errors++;
      return;
    }
    
    const svgTag = svgTagMatch[0];
    
    // Check for viewBox
    if (!svgTag.includes('viewBox=')) {
      console.error(`❌ [${file}] Missing viewBox attribute on root <svg>`);
      errors++;
    }
    
    // Check for hardcoded width/height on root
    // regex checks for width="<number>" or height="<number>" or width='...'
    // note: width="100%" is allowed, we only ban fixed pixel/number widths, but the requirement says "NO hardcoded width or height attributes". We'll fail if width="..." or height="..." exist.
    if (/[\s]width\s*=\s*['"]?[^'"]*['"]?/.test(svgTag) || /[\s]height\s*=\s*['"]?[^'"]*['"]?/.test(svgTag)) {
      console.error(`❌ [${file}] Has hardcoded width or height on root <svg>`);
      errors++;
    }
    
    // Check for external images
    if (/<image[^>]*href=["']http/i.test(content)) {
      console.error(`❌ [${file}] Contains external <image href="http...">`);
      errors++;
    }
  });

  // Check matching dark/light
  const lightFiles = files.filter(f => f.endsWith('-light.svg'));
  const darkFiles = files.filter(f => f.endsWith('-dark.svg'));
  
  lightFiles.forEach(lf => {
    const base = lf.replace('-light.svg', '');
    if (!darkFiles.includes(`${base}-dark.svg`)) {
      console.error(`❌ Missing dark mode variant for ${lf}`);
      errors++;
    }
  });
  
  darkFiles.forEach(df => {
    const base = df.replace('-dark.svg', '');
    if (!lightFiles.includes(`${base}-light.svg`)) {
      console.error(`❌ Missing light mode variant for ${df}`);
      errors++;
    }
  });

  if (errors > 0) {
    console.error(`\nValidation failed with ${errors} error(s).`);
    process.exit(1);
  } else {
    console.log(`\n✅ All ${files.length} SVGs passed verification!`);
  }
}

verifySVGs();
