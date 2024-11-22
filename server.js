const dotenv = require('dotenv');
const sequelize = require('./sequelizeConnection');

dotenv.config({ path: './config.env' });

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.log(`Unable to connect to the database: ${err}`);
  });

const app = require('./app');

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`app listening on port ${port} ...`);
});
