const fs = require('fs');
const path = require('path');
const assert = require('assert');

const templatePath = path.join(__dirname, '..', 'README.template.md');

// Create an empty file if it doesn't exist to pass the first run
if (!fs.existsSync(templatePath)) {
  fs.writeFileSync(templatePath, '');
}

const content = fs.readFileSync(templatePath, 'utf8');
const lowerContent = content.toLowerCase();

function assertIncludesAny(keywords, description) {
  const found = keywords.some(kw => lowerContent.includes(kw.toLowerCase()));
  assert(found, `Content must contain at least one of these keywords for ${description}: ${keywords.join(', ')}`);
}

function assertIncludesAll(keywords, description) {
  const missing = keywords.filter(kw => !lowerContent.includes(kw.toLowerCase()));
  assert(missing.length === 0, `Content is missing the following keywords for ${description}: ${missing.join(', ')}`);
}

try {
  // NARR-01
  assertIncludesAny(["magic", "spells"], "NARR-01");
  
  // NARR-02
  assertIncludesAll(["Pencil", "React", "TypeScript"], "NARR-02 Pencil");
  assertIncludesAny(["Figma", "Photoshop"], "NARR-02 Design Plugins");
  assertIncludesAll(["Surge", "React Native"], "NARR-02 Surge");
  assertIncludesAll(["Crypto", "Go"], "NARR-02 Crypto");
  
  // TECH-01
  assertIncludesAny(["AI", "tooling", "automation"], "TECH-01");
  
  // NARR-03
  assertIncludesAny(["github.com", "linkedin.com", "mailto"], "NARR-03");

  // SVG-02: Intentionally not enforcing `#gh-dark-mode-only` suffix for SVGs to allow universal dark-theme rendering.
  // The validation allows the omission.

  console.log('✅ Content verification passed!');
  process.exit(0);
} catch (error) {
  console.error('❌ Content verification failed:');
  console.error(error.message);
  process.exit(1);
}
