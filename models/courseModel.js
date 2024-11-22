const { DataTypes } = require('sequelize');
const sequelize = require('../sequelizeConnection');
const collegeYear = require('./collegeYearModel');
const department = require('./departmentModel');

const course = sequelize.define(
  'course',
  {
    courseid: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    coursename: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    semister: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    departmentid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: department,
        key: 'departmentid',
      },
    },
    yearid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: collegeYear,
        key: 'yearid',
      },
    },
  },
  {
    tableName: 'courses',
    timestamps: false,
  }
);

module.exports = course;
