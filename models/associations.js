const sequelize = require('../sequelizeConnection');

// Import models
const course = require('./courseModel');
const department = require('./departmentModel');
const collegeYear = require('./collegeYearModel');
const group = require('./groupModel');
const student = require('./studentModel');
const attendance = require('./attendanceRecordModel');

// Define associations

// Department 1:M Course
department.hasMany(course, {
  foreignKey: 'departmentid',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
course.belongsTo(department, {
  foreignKey: 'departmentid',
});

// CollegeYear 1:M Course
collegeYear.hasMany(course, {
  foreignKey: 'yearid',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
course.belongsTo(collegeYear, {
  foreignKey: 'yearid',
});

// Department 1:M Student
department.hasMany(student, {
  foreignKey: 'departmentid',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
student.belongsTo(department, {
  foreignKey: 'departmentid',
});

// CollegeYear 1:M Student
collegeYear.hasMany(student, {
  foreignKey: 'yearid',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
student.belongsTo(collegeYear, {
  foreignKey: 'yearid',
});

// Group 1:M Student
group.hasMany(student, {
  foreignKey: 'groupid',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
student.belongsTo(group, {
  foreignKey: 'groupid',
});

// M:M relationship between student & course
student.belongsToMany(course, { through: attendance });
course.belongsToMany(student, { through: attendance });
