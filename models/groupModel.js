const { DataTypes } = require('sequelize');
const sequelize = require('../sequelizeConnection');

const group = sequelize.define(
  'group',
  {
    groupid: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    grouptype: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: 'studentgroups',
    timestamps: false,
  }
);

module.exports = group;
