const { sequelize } = require('./models/centralizedExports');

(async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Error synchronizing models:', error);
  }
})();
