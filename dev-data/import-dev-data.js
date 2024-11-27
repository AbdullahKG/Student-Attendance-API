const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
const fs = require('fs');

const collegeYearModel = require('../models/collegeYearModel');
const groupModel = require('../models/groupModel');
const courseModel = require('../models/courseModel');
const departmentModel = require('../models/departmentModel');
const studentModel = require('../models/studentModel');

dotenv.config({ path: './config.env' });

const sequelize = new Sequelize(
  process.env.DB,
  process.env.DB_USER_NAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false,
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.log(`Unable to connect to the database: ${err}`);
  });

// Read JSON files
const yearData = JSON.parse(
  fs.readFileSync(`${__dirname}/year-data.json`, 'utf-8')
);
const groupData = JSON.parse(
  fs.readFileSync(`${__dirname}/group-data.json`, 'utf-8')
);
const courseData = JSON.parse(
  fs.readFileSync(`${__dirname}/courses-data.json`, 'utf-8')
);
const departmentData = JSON.parse(
  fs.readFileSync(`${__dirname}/department-data.json`, 'utf-8')
);
const studentData = JSON.parse(
  fs.readFileSync(`${__dirname}/students-data.json`)
);

// import all data into DB
const importData = async () => {
  try {
    //await collegeYearModel.bulkCreate(yearData);
    //await groupModel.bulkCreate(groupData);
    //await departmentModel.bulkCreate(departmentData);
    //await courseModel.bulkCreate(courseData);
    //await studentModel.bulkCreate(studentData);
    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  } finally {
    await sequelize.close();
    process.exit();
  }
};

// delete all data from DB
const deleteData = async () => {
  try {
    //await collegeYearModel.destroy({ truncate: true });
    //await groupModel.destroy({ truncate: true });
    //await departmentModel.destroy({ truencate: true });
    //await courseModel.destroy({ truncate: true });
    await studentModel.destroy({ truncate: true });
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  } finally {
    await sequelize.close();
    process.exit();
  }
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
