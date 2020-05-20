const shell = require('shelljs');
const path = require('path');

const src = path.resolve(__dirname, '../src/template/*');
const target = path.resolve(__dirname, '../lib/template');

shell.rm('-rf', target);
shell.mkdir('-p', target);
shell.cp('-rf', src, target);
