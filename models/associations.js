const sequelize = require('../sequelizeConnection');

// Import models
const course = require('./courseModel');
const department = require('./departmentModel');
const collegeYear = require('./collegeYearModel');
const group = require('./groupModel');
const student = require('./studentModel');
const attendance = require('./attendanceRecordModel');
const user = require('./userModel');


// Define associations

// Department 1:M Course
department.hasMany(course, {
  foreignKey: 'departmentid',
  
});
course.belongsTo(department, {
  foreignKey: 'departmentid',
});

// CollegeYear 1:M Course
collegeYear.hasMany(course, {
  foreignKey: 'yearid',
  
});
course.belongsTo(collegeYear, {
  foreignKey: 'yearid',
});

// Department 1:M Student
department.hasMany(student, {
  foreignKey: 'departmentid',
  
});
student.belongsTo(department, {
  foreignKey: 'departmentid',
});

// CollegeYear 1:M Student
collegeYear.hasMany(student, {
  foreignKey: 'yearid',
  
});
student.belongsTo(collegeYear, {
  foreignKey: 'yearid',
});

// Group 1:M Student
group.hasMany(student, {
  foreignKey: 'groupid',
  
});
student.belongsTo(group, {
  foreignKey: 'groupid',
});

// Student 1:M Attendance
student.hasMany(attendance, {
  foreignKey: 'studentid',
  
});
attendance.belongsTo(student, {
  foreignKey: 'studentid',
});

// Course 1:M Attendance
course.hasMany(attendance, {
  foreignKey: 'courseid',
  
});
attendance.belongsTo(course, {
  foreignKey: 'courseid',
});

// Department 1:M Users
department.hasMany(user, {
  foreignKey: 'departmentid',
 
});

user.belongsTo(department, {
  foreignKey: 'departmentid',
});

// User 1:1 Student
user.hasOne(student , {
  foreignKey: 'userid'
})

student.belongsTo(user , {
  foreignKey : 'userid'
})