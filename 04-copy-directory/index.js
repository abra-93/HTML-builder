const fs = require('fs/promises');
const path = require('path');
const folder = path.resolve(__dirname, 'files');
const newFolder = path.resolve(__dirname, 'files-copy');

const copyDir = async () => {
  await fs.rm(newFolder, { recursive: true, force: true });
  await fs.mkdir(newFolder, { recursive: true });

  const fileFolder = await fs.readdir(folder);
  for (const file of fileFolder) {
    await fs.copyFile(path.join(folder, file), path.join(newFolder, file));
  }
  console.log('\x1b[34m%s\x1b[0m', `[ ${fileFolder} ]  files copied`);
};
copyDir();
