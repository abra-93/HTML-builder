const fs = require('fs');
const path = require('path');
const { stdout } = require('process');

let textRead = fs.createReadStream(path.resolve(__dirname, 'text.txt'));
textRead.on('data', (data) => {
  stdout.write(data);
});
