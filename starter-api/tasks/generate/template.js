'use strict';

const fs = require('fs');
const path = require('path');
const { writeFile, dirShouldExists } = require('../utils/fs');

class TemplateReducer {
  constructor({
    prjRoot,
    templateDir,
    pluralFileName,
    pluralName,
    pluralCamel,
    singularFileName,
    singularName,
    singularCamel,
  }) {
    this.prjRoot = prjRoot;
    this.templateDir = templateDir;
    this.pluralFileName = pluralFileName;
    this.pluralName = pluralName;
    this.pluralCamel = pluralCamel;
    this.singularFileName = singularFileName;
    this.singularName = singularName;
    this.singularCamel = singularCamel;
  }

  reduce(templateText = '') {
    return `${templateText}`
      .replaceAll('{{ pluralFileName }}', this.pluralFileName)
      .replaceAll('{{ pluralName }}', this.pluralName)
      .replaceAll('{{ pluralCamel }}', this.pluralCamel)
      .replaceAll('{{ singularFileName }}', this.singularFileName)
      .replaceAll('{{ singularName }}', this.singularName)
      .replaceAll('{{ singularCamel }}', this.singularCamel);
  }

  invoke(templateFilePath) {
    return this.reduce(
      fs.readFileSync(`${this.templateDir}/${templateFilePath}`),
    );
  }

  generate({ about = '', templatePath, savePath }) {
    const outputPath = path.resolve(this.prjRoot, savePath);
    dirShouldExists(path.dirname(outputPath));
    writeFile(about, outputPath, this.invoke(templatePath));
    return savePath;
  }
}

module.exports = TemplateReducer;
