const fs = require('fs');
const path = require('path');

const templatePath = path.join(__dirname, '../README.template.md');
const outputPath = path.join(__dirname, '../README.md');

let content = fs.readFileSync(templatePath, 'utf8');

const pictureRegex = /<picture>\s*([\s\S]*?)\s*<\/picture>/gi;

content = content.replace(pictureRegex, (match, inner) => {
  const sourceMatch = inner.match(/<source[^>]*?srcset="([^"]+)"/i);
  const imgMatch = inner.match(/<img([^>]*?)>/i);
  
  if (!sourceMatch || !imgMatch) {
    // If it's a single video, try to match the full tag including closing tag
    const videoMatch = inner.match(/<video[\s\S]*?<\/video>/i) || inner.match(/<video[^>]*>/i);
    if (videoMatch) {
      return videoMatch[0];
    }
    // If it's a single image, match the self-closing tag
    const singleImgMatch = inner.match(/<img[^>]*>/i);
    if (singleImgMatch) {
      return singleImgMatch[0];
    }
    return match;
  }
  
  const darkSrc = sourceMatch[1];
  const imgAttrs = imgMatch[1]; // Attributes inside the img tag
  
  const srcMatch = imgAttrs.match(/src="([^"]+)"/i);
  const altMatch = imgAttrs.match(/alt="([^"]*)"/i);
  const widthMatch = imgAttrs.match(/width="([^"]*)"/i);
  
  const lightSrc = srcMatch ? srcMatch[1] : '';
  const altText = altMatch ? altMatch[1] : '';
  const widthAttr = widthMatch ? ` width="${widthMatch[1]}"` : '';
  
  // Output two img tags with GitHub mode suffix
  return `<img src="${lightSrc}#gh-light-mode-only" alt="${altText}"${widthAttr}>\n  <img src="${darkSrc}#gh-dark-mode-only" alt="${altText}"${widthAttr}>`;
});

fs.writeFileSync(outputPath, content, 'utf8');
console.log('README.md generated successfully.');
