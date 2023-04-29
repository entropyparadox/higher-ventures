#!/bin/bash

prjRoot=$(node -p "require('path').resolve('$0', '../../..')")
source "$prjRoot/tasks/utils/string.sh"
source "$prjRoot/tasks/utils/fs.sh"

# @example
#   yarn g:resource cart_item   ## 리소스 이름은 입력과 무관하게 내부에서 별도로 표준화를 진행 합니다. 단/복수 무관. 작명스타일 무관.
#   yarn g:resource cartItems
#   yarn g:resource cart_items --namespace=admin
#   yarn g:resource cart_items --delete     ## 리소스 삭제
CONTEXT="CREATE"
for i in "$@"; do
  case $i in
    -d|--delete)
      CONTEXT="DELETE"
    ;;
    --namespace=*)
      namespace=$(echo "$i" | cut -c 13-)
    ;;
    *)
      resourceName=$i
      # unknown option
    ;;
  esac
done

pluralResourceName=$(node -p "const { plural } = require('pluralize'); plural('$resourceName')");
singularResourceName=$(node -p "const { singular } = require('pluralize'); singular('$resourceName')");

pluralFileName="$(hyphen_case "$pluralResourceName")"
pluralName="$(pascal_case "$pluralFileName")"
pluralCamel="$(camel_case "$pluralName")"

singularFileName="$(hyphen_case "$singularResourceName")"
singularName="$(pascal_case "$singularFileName")"
singularCamel="$(camel_case "$singularName")"


function reduce_template() {
  echo "$1" \
  | sed "s/{{ singularName }}/$singularName/g" \
  | sed "s/{{ pluralName }}/$pluralName/g" \
  | sed "s/{{ singularFileName }}/$singularFileName/g" \
  | sed "s/{{ pluralFileName }}/$pluralFileName/g" \
  | sed "s/{{ singularCamel }}/$singularCamel/g" \
  | sed "s/{{ pluralCamel }}/$pluralCamel/g"
}

function invoke_template() {
  reduce_template "$(cat "$prjRoot/templates/$1")"
}



#nest g resource "$resourceName" --no-spec

namespaced="resources"
if [ -n "$namespace" ]; then
  namespaced="$namespaced/$namespace"
fi

moduleDir="$pluralFileName"
moduleDirPath="$prjRoot/src/$namespaced/$moduleDir"

moduleFile="$pluralFileName.module.ts"
moduleFilePath="$moduleDirPath/$moduleFile"

entityFile="entities/$singularFileName.entity.ts"
entityFilePath="$moduleDirPath/$entityFile"

createDtoFile="dto/create-$singularFileName.dto.ts"
createDtoFilePath="$moduleDirPath/$createDtoFile"

updateDtoFile="dto/update-$singularFileName.dto.ts"
updateDtoFilePath="$moduleDirPath/$updateDtoFile"

controllerFile="$pluralFileName.controller.ts"
controllerFilePath="$moduleDirPath/$controllerFile"

repositoryFile="$pluralFileName.repository.ts"
repositoryFilePath="$moduleDirPath/$repositoryFile"

serviceFile="$pluralFileName.service.ts"
serviceFilePath="$moduleDirPath/$serviceFile"

if [ "$CONTEXT" == "CREATE" ]; then
  dir_should_exists "$prjRoot/src/$namespaced"
  dir_should_exists "$moduleDirPath"
  dir_should_exists "$moduleDirPath/entities"
  dir_should_exists "$moduleDirPath/dto"

  invoke_template resources/module.ts.template > "$moduleFilePath" # Upgrade Module
  created module "$moduleDir/$moduleFile"
  invoke_template resources/controller.ts.template > "$controllerFilePath" # Upgrade Controller
  created controller "$moduleDir/$controllerFile"
  invoke_template resources/repository.ts.template > "$repositoryFilePath" # Create Repository
  created repository "$moduleDir/$repositoryFile"
  invoke_template resources/service.ts.template > "$serviceFilePath" # Upgrade Service
  created service "$moduleDir/$serviceFile"
  invoke_template resources/entities/entity.ts.template > "$entityFilePath" # Upgrade Entity
  created entity "$moduleDir/$entityFile"
  invoke_template resources/dto/create-dto.ts.template > "$createDtoFilePath" # Upgrade CreateDto
  created create-dto "$moduleDir/$createDtoFile"
  invoke_template resources/dto/update-dto.ts.template > "$updateDtoFilePath" # Upgrade UpdateDto
  created update-dto "$moduleDir/$updateDtoFile"

  add_new_line "$prjRoot/src/app.module.ts" "import.*;" "$(reduce_template "import { {{ pluralName }}Module } from './$namespaced/$moduleDir/{{ pluralFileName }}.module';")"
  add_new_line "$prjRoot/src/app.module.ts" "\s\S*Module,$" "$(reduce_template "{{ pluralName }}Module,")"
fi

if [ "$CONTEXT" == "DELETE" ]; then
  dir_should_not_exists "$moduleDirPath"
  remove_lines "$prjRoot/src/app.module.ts" "$pluralFileName.module';$"
  remove_lines "$prjRoot/src/app.module.ts" "$pluralName"'Module,'
fi


printf "\n"
echo "lint fixing ..."
yarn lint >/dev/null
echo "done."
