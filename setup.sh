#!/bin/bash

STARTER_DIR_PATH="$(cd "$(dirname "$0")" && pwd -P)"

echo "starter directory path: ${STARTER_DIR_PATH}"

#
# Read Inputs..
#
read -rp "Project name: " prjName
if ! [[ $prjName =~ ^[a-z]+([-_]+[a-z0-9]+)*$ ]]; then
  echo "올바른 형식이 아닙니다."
  exit 0
fi

rm -rf .git

#
# Setup project-api
#
cd "$STARTER_DIR_PATH/starter-api"
cp .env.example .env


#
# Setup project-web
#
cd "$STARTER_DIR_PATH/starter-web"
cp .env.example .env


#
# Setup project-app
#
cd "$STARTER_DIR_PATH/starter-app"
# do nothing


#
# Finish Setup
#
cd "$STARTER_DIR_PATH"
LC_CTYPE=C find . -type f ! -path "**/node_modules/*" ! -path "./.git/*" ! -name "README.md" ! -name "setup.sh" ! -name "*.svg" ! -name "*.png" ! -name "*.ico" -exec sed -i "" "s/starter/${prjName}/" {} \;
mv starter-api "$prjName-api"
mv starter-web "$prjName-web"
mv starter-app "$prjName-app"

# Git Setup
repoUrl="git@github.com:entropyparadox/${prjName}.git"
git init
git add .
git commit -m "Project init"
git branch -M main
git remote add origin "$repoUrl"

echo "done"
