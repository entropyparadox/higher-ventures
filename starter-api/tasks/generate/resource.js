/**
 * resource.sh 파일에서 구현된 기능을 추종하여
 * 후행 구현하고 있습니다. 따라서 sh 파일에 비해
 * 지원되는 기능에 차이가 있을 수 있습니다.
 *
 * TODO:
 *  | arguments option parsing
 *  | --namespace option should be implemented
 *  | 리소스 이름이 반드시 첫번째 인자로 전달되어야 하는 문제 해결. (리소스 이름과 명령 중간에 옵션 위치 허용)
 *  | 특정 요소만 선택하여 생성과 삭제 가능. (또는 특정 요소만 선택하여 제외) : ex. --controller or --no-controller
 */

const path = require('path');
const { plural, singular } = require('pluralize');
const TemplateReducer = require('./template');
const { camelCase, hyphenCase, pascalCase } = require('../utils/string');

const args = process.argv.slice(2);
const prjRoot = path.resolve(__dirname, '../..');

const resourceName = args[0];
const pluralResourceName = plural(resourceName);
const singularResourceName = singular(resourceName);

const pluralFileName = hyphenCase(pluralResourceName);
const pluralName = pascalCase(pluralFileName);
const pluralCamel = camelCase(pluralName);

const singularFileName = hyphenCase(singularResourceName);
const singularName = pascalCase(singularFileName);
const singularCamel = camelCase(singularName);

const templateReducer = new TemplateReducer({
  prjRoot,
  templateDir: `${prjRoot}/templates`,
  pluralFileName,
  pluralName,
  pluralCamel,
  singularFileName,
  singularName,
  singularCamel,
});

const currentResourceDir = `src/resources/${pluralResourceName}`;

templateReducer.generate({
  about: 'module',
  templatePath: 'resources/module.ts.template',
  savePath: `${currentResourceDir}/${pluralFileName}.module.ts`,
});

templateReducer.generate({
  about: 'controller',
  templatePath: 'resources/controller.ts.template',
  savePath: `${currentResourceDir}/${pluralFileName}.controller.ts`,
});

templateReducer.generate({
  about: 'repository',
  templatePath: 'resources/repository.ts.template',
  savePath: `${currentResourceDir}/${pluralFileName}.repository.ts`,
});

templateReducer.generate({
  about: 'service',
  templatePath: 'resources/service.ts.template',
  savePath: `${currentResourceDir}/${pluralFileName}.service.ts`,
});

templateReducer.generate({
  about: 'entity',
  templatePath: 'resources/entities/entity.ts.template',
  savePath: `${currentResourceDir}/entities/${singularFileName}.entity.ts`,
});

templateReducer.generate({
  about: 'create-dto',
  templatePath: 'resources/dto/create-dto.ts.template',
  savePath: `${currentResourceDir}/dto/create-${singularFileName}.dto.ts`,
});

templateReducer.generate({
  about: 'update-dto',
  templatePath: 'resources/dto/update-dto.ts.template',
  savePath: `${currentResourceDir}/dto/update-${singularFileName}.dto.ts`,
});
