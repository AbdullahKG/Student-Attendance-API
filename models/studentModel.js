const { DataTypes } = require('sequelize');
const sequelize = require('../sequelizeConnection');
const collegeYear = require('./collegeYearModel');
const department = require('./departmentModel');
const group = require('./groupModel');

const student = sequelize.define(
  'student',
  {
    studentid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    displayid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    secondname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    thirdname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cardid: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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
    groupid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: group,
        key: 'groupid',
      },
    },
  },
  {
    tableName: 'students',
    timestamps: false,
  }
);

module.exports = student;
