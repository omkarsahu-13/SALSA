const fs = require('fs');
const path = require('path');

const BASE_DIR = __dirname;

// Helper to write file
function saveFile(filename, html) {
  const filePath = path.join(BASE_DIR, filename);
  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`Generated: ${filename}`);
}

// Include generator framework
const { wrapHTML } = require('./generate_pages.js');
