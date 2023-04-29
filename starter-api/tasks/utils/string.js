'use strict';

module.exports = {
  pascalCase,
  camelCase,
  snakeCase,
  hyphenCase,
};

// reference: https://stackoverflow.com/questions/4068573/convert-string-to-pascal-case-aka-uppercamelcase-in-javascript
function pascalCase(str = '') {
  return `${str}`
    .replace(/[-_]+/g, ' ') //new RegExp(/[-_]+/, 'g'), ' ')
    .replace(/[^\w\s]/g, '') // new RegExp(/[^\w\s]/, 'g'), '')
    .replace(
      /\s+(.)(\w*)/g,
      ($1, $2, $3) => `${$2.toUpperCase() + $3.toLowerCase()}`,
    )
    .replace(/\w/, (s) => s.toUpperCase());
}

function camelCase(str = '') {
  return `${str}`
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
}

// reference: https://www.geeksforgeeks.org/how-to-convert-a-string-to-snake-case-using-javascript/
function snakeCase(str = '') {
  return `${str}`
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map((s) => s.toLowerCase())
    .join('_');
}

function hyphenCase(str = '') {
  return snakeCase(str).replace(/[-_]+/g, '-');
}
