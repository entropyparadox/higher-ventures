#!/bin/bash

APP=starter
BRANCH=main

cd /home/ec2-user/app-prod
git reset --hard
git pull origin $BRANCH
cd $APP-api
yarn install --immutable --immutable-cache --check-cache
yarn run build
yarn run migration:run

# front-api
if [[ $(pm2 list | grep prod-front-api) ]]; then
  pm2 restart prod-front-api
else
  pm2 start --name "prod-front-api" node -- dist/apps/front-api/main.js
fi

# admin-api
if [[ $(pm2 list | grep prod-admin-api) ]]; then
  pm2 restart prod-admin-api
else
  pm2 start --name "prod-admin-api" node -- dist/apps/admin-api/main.js
fi

# batch가 있는 경우 주석 해제
# if [[ $(pm2 list | grep prod-batch) ]]; then
  # pm2 restart prod-batch
# else
  # pm2 start --name "prod-batch" node -- dist/apps/batch/main.js
# fi

pm2 save
