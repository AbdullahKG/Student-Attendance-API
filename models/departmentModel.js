const { DataTypes } = require('sequelize');
const sequelize = require('../sequelizeConnection');

const department = sequelize.define(
  'department',
  {
    departmentid: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    departmentname: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: 'departments',
    timestamps: false,
  }
);

module.exports = department;
