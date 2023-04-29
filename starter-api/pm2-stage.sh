# front-api
pm2 save --force

if [[ $(pm2 list | grep starter-front-api) ]]; then
  pm2 restart starter-front-api
else
  pm2 start npm --name "starter-front-api" -- run start:front:dev
fi


# admin-api
if [[ $(pm2 list | grep starter-admin-api) ]]; then
  pm2 restart starter-admin-api
else
  pm2 start npm --name "starter-admin-api" -- run start:admin:dev
fi


pm2 save --force
