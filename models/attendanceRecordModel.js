const { DataTypes } = require('sequelize');
const sequelize = require('../sequelizeConnection');
const student = require('./studentModel');
const course = require('./courseModel');

const attendance = sequelize.define(
  'attendance',
  {
    attendanceid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    attendancedate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    attendancestatus: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    studentid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: student,
        key: 'studentid',
      },
    },
    courseid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: course,
        key: 'courseid',
      },
    },
  },
  {
    tableName: 'attendances',
    timestamps: false,
  }
);

module.exports = attendance;
