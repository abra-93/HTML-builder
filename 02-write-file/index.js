const fs = require('fs');
const path = require('path');
const { stdin, stdout, exit } = process;

let newFile = fs.createWriteStream(path.resolve(__dirname, 'text.txt'));

stdout.write('Введите текст:\n');

stdin.on('data', (data) => {
  if (data.toString().trim() === 'exit') {
    exit();
  } else {
    newFile.write(data);
  }
});

process.on('exit', () => stdout.write('Удачи в изучении Node.js!'));
process.on('SIGINT', () => {
  exit();
  stdout.write('Удачи в изучении Node.js!');
});
