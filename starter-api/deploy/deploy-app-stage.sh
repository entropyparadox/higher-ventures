#!/bin/bash

APP=starter
BRANCH=main

cd /home/ec2-user/app-stage
git reset --hard
git pull origin $BRANCH
cd $APP-api
yarn install --immutable --immutable-cache --check-cache
yarn run build
yarn run migration:run

# front-api
if [[ $(pm2 list | grep stage-front-api) ]]; then
  pm2 restart stage-front-api
else
  pm2 start --name "stage-front-api" node -- dist/apps/front-api/main.js
fi

# admin-api
if [[ $(pm2 list | grep stage-admin-api) ]]; then
  pm2 restart stage-admin-api
else
  pm2 start --name "stage-admin-api" node -- dist/apps/admin-api/main.js
fi

# batch가 있는 경우 주석 해제
# if [[ $(pm2 list | grep stage-batch) ]]; then
  # pm2 restart stage-batch
# else
  # pm2 start --name "stage-batch" node -- dist/apps/batch/main.js
# fi

pm2 save
