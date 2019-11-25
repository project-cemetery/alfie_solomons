const path = require('path');
const fs = require('fs');

const { version } = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '..', 'package.json')).toString(),
);

process.stdout.write(version);
