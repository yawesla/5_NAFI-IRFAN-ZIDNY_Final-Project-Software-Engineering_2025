Tools:
- Dbeaver
- PostgreSQL

How to run server :
- cd server
- npm i
- touch .env (SECRETKEY = RAHASIA)
- npx sequelize-cli db:create
- npx sequelize-cli db:migrate
- npx sequelize-cli db:seed:all
- npx nodemon app.js
if the message = "Example app listening on port 3000", then the app is running correctly.

How to run client :
- cd Binuskop
- npm i
- npm start