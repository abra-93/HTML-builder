const fs = require('fs');
const path = require('path');
const { stdout } = process;

try {
  fs.readdir(
    path.join(__dirname, 'secret-folder'),
    { withFileTypes: true },
    (err, data) => {
      if (err) {
        console.log('error:', err);
      } else {
        data.forEach((file) => {
          if (file.isFile()) {
            fs.stat(
              path.join(__dirname, './secret-folder/' + file.name),
              (err, data) => {
                if (err) console.log(err);
                else {
                  stdout.write(
                    `${path.parse(file.name).name} - ${path
                      .parse(file.name)
                      .ext.replace(/[^a-zа-яё]/gi, '')} - ${data.size}\n`
                  );
                }
              }
            );
          }
        });
      }
    }
  );
} catch (err) {
  console.error(err);
}
