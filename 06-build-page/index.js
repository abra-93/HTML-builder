const { createWriteStream } = require('fs');
const fs = require('fs/promises');
const path = require('path');
const dist = path.resolve(__dirname, 'project-dist/');

const templateBuild = async () => {
  await fs.rm(dist, { recursive: true, force: true });
  await fs.mkdir(path.resolve(dist));
  const TMPL = await fs.readFile(
    path.join(__dirname, 'template.html'),
    'utf-8'
  );
  const TAGS = TMPL.match(/{{\s*([\w-]+)\s*}}/g);
  await fs.copyFile(
    path.resolve(__dirname, 'template.html'),
    path.join(dist, 'index.html')
  );
  for (const elem of TAGS) {
    let fileName = elem.replace(/[{}]/g, '') + '.html';
    let fileContent = await fs.readFile(
      path.resolve(__dirname, 'components', fileName),
      'utf-8'
    );
    let newTMPL = await fs.readFile(path.join(dist, 'index.html'), 'utf-8');
    newTMPL = newTMPL.replace(elem, fileContent);
    await fs.writeFile(path.join(dist, 'index.html'), newTMPL);
  }

  styleBuild();
  filesBuild();

  console.log(
    '\x1b[34m%s\x1b[0m',
    'Build complite. The files are in the ./project-dist folder'
  );
};

templateBuild();

const styleBuild = async () => {
  const stream = createWriteStream(path.join(dist, '/style.css'));
  const styleFiles = await fs.readdir(path.resolve(__dirname, 'styles'));
  for (const styles of styleFiles) {
    let style = await fs.readFile(
      path.resolve(__dirname, 'styles', styles),
      'utf-8'
    );

    stream.write(style);
  }
};

const filesBuild = async (dirPath, outPath) => {
  await fs.mkdir(path.join(dist, 'assets'), { recursive: true, force: true });

  dirPath = dirPath ? dirPath : path.join(__dirname, 'assets');
  const assetsFolder = await fs.readdir(dirPath);
  for (const folder of assetsFolder) {
    const stat = await fs.stat(path.join(dirPath, folder));
    const newPath = path.join(dirPath, folder);
    let outputFolder = path.join(dist, 'assets', outPath ? outPath : '');
    if (stat.isDirectory()) {
      await fs.mkdir(path.join(dist, 'assets', folder), {
        recursive: true,
        force: true,
      });
      filesBuild(newPath, folder);
    } else {
      await fs.copyFile(newPath, path.join(outputFolder, folder));
    }
  }
};
