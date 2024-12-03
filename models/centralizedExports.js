const sequelize = require('../sequelizeConnection');

// Import models
const Course = require('./courseModel');
const Department = require('./departmentModel');
const CollegeYear = require('./collegeYearModel');
const Group = require('./groupModel');
const Student = require('./studentModel');
const Attendance = require('./attendanceRecordModel');
const User = require('../models/userModel');

// define the relatioships between the tables
require('./associations');

// Export models
module.exports = {
  sequelize,
  Course,
  Department,
  CollegeYear,
  Group,
  Attendance,
  Student,
  User,
};
