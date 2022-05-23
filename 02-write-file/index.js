const fs = require('fs');
const path = require('path');
const { stdin, stdout, exit } = process;
let newFile = fs.createWriteStream(path.resolve(__dirname, 'text.txt'));

stdout.write(['\x1b[36m', 'Введите текст:\n', '\033[0m'].join(''));

stdin.on('data', (data) => {
  if (data.toString().trim() === 'exit') {
    exit();
  } else {
    newFile.write(data);
  }
});

process.on('exit', () => messageExit());
process.on('SIGINT', () => {
  exit();
  stdout.write(() => messageExit());
});

const messageExit = () =>
  stdout.write(['\x1b[31m', 'Удачи в изучении Node.js!', '\033[0m'].join(''));
