const { DataTypes } = require('sequelize');
const sequelize = require('../sequelizeConnection');
const department = require('./departmentModel');

const user = sequelize.define(
  'user',
  {
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
    },
    departmentid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: department,
        key: 'departmentid',
      },
    },
  },
  {
    modelName: 'users',
    timestamps: false,
  }
);

module.exports = user;
