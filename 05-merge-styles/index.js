const fs = require('fs/promises');
const path = require('path');
const cssFolder = path.resolve(__dirname, 'styles');
const output = path.resolve(__dirname, 'project-dist');
let cssContent = '';
(async () => {
  let files = await fs.readdir(cssFolder);
  for (const file of files) {
    if (path.extname(file) === '.css') {
      const style = await fs.readFile(path.join(cssFolder, file), 'utf-8');
      cssContent += style;
      fs.writeFile(path.join(output, 'bundle.css'), cssContent);
    }
  }
})();
