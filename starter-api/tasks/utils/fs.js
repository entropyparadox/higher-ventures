'use strict';

const fs = require('fs');

const log = {
  created: (about, filename) =>
    console.log('Create', about, filename.split('/src/')[1]),
  removed: (about, filename) =>
    console.log('Remove', about, filename.split('/src/')[1]),
  skipped: (about, filename, because) =>
    console.log('Skip', about, filename.split('/src/')[1], `(${because})`),
};

function writeFile(about, path, content) {
  fs.writeFileSync(path, content);
  log.created(about, path);
}
module.exports.writeFile = writeFile;

function dirShouldExists(path) {
  if (fs.existsSync(path)) {
    log.skipped('dir', path, 'exists');
  } else {
    fs.mkdirSync(path, { recursive: true });
    log.created('dir', path);
  }
}
module.exports.dirShouldExists = dirShouldExists;

function dirShouldNotExists(path) {
  if (fs.existsSync(path)) {
    fs.rmdirSync(path);
    log.removed('dir', path);
  } else {
    log.skipped('dir', path, "doesn't exists");
  }
}
module.exports.dirShouldNotExists = dirShouldNotExists;
