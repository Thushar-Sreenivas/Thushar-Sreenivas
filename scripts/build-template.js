const fs = require('fs');
const path = require('path');

const templatePath = path.join(__dirname, '../README.template.md');
const outputPath = path.join(__dirname, '../README.md');

let content = fs.readFileSync(templatePath, 'utf8');

const pictureRegex = /<picture>([\s\S]*?)<\/picture>/gi;

content = content.replace(pictureRegex, (match, inner) => {
  const sourceMatch = inner.match(/<source[^>]*?srcset="([^"]+)"/i);
  const imgMatch = inner.match(/<img[^>]*?>/i);
  
  if (!sourceMatch || !imgMatch) {
    return match;
  }
  
  const darkSrc = sourceMatch[1];
  const imgTag = imgMatch[0];
  
  const srcMatch = imgTag.match(/src="([^"]+)"/i);
  const altMatch = imgTag.match(/alt="([^"]*)"/i);
  
  const lightSrc = srcMatch ? srcMatch[1] : '';
  const altText = altMatch ? altMatch[1] : '';
  
  return `![${altText}](${lightSrc}#gh-light-mode-only)\n![${altText}](${darkSrc}#gh-dark-mode-only)`;
});

fs.writeFileSync(outputPath, content, 'utf8');
console.log('README.md generated successfully.');
