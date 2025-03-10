const dotenv = require('dotenv');
const sequelize = require('./sequelizeConnection');
const { initializeSocket } = require('./socketio/socket');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection to Database has been established successfully.');
  })
  .catch((err) => {
    console.log(`Unable to connect to the database: ${err}`);
  });

const app = require('./app');

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`app listening on port ${port} ...`);
});

initializeSocket(server);

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
