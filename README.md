Tools:
- Dbeaver
- PostgreSQL

How to run server :
- cd server
- npm i
- npx sequelize-cli db:create
- npx sequelize-cli db:migrate
- npx sequelize-cli db:seed:all
- npx nodemon app.js

if the message = " Example app listening on port 3000 ", then the app is running correctly.