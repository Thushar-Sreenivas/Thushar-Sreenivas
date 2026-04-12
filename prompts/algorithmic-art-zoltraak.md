# Algorithmic Art Prompt: Zoltraak Magic Circles

This prompt is intended for the `algorithmic-art` skill to generate a seamlessly looping p5.js GIF for a dark-mode GitHub profile background.

**Aesthetic Constraints:**
- **Theme:** Frieren "Zoltraak Magic Circles".
- **Color Palette:** Deep blues and purples with subtle geometric lines and abstract runes, optimized for dark backgrounds.
- **Motion:** Rotating geometric circles with rotational symmetry, creating a seamless loop over exactly 80 frames.

**Technical Constraints:**
- **Canvas Size:** Wide banner format (e.g., 800x200 or 800x300 pixels) to keep the file size minimal.
- **Recording/Exporting:**
  - Inject the `p5.capture` CDN script into the HTML `<head>`: 
    `<script src="https://cdn.jsdelivr.net/npm/p5.capture@1.4.1/dist/p5.capture.umd.min.js"></script>`
  - Configure capture options inside the `setup()` function:
    `P5Capture.setDefaultOptions({ format: "gif", framerate: 20, duration: 80 });`
