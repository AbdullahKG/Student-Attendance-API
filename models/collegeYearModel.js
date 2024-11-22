const { DataTypes } = require('sequelize');
const sequelize = require('../sequelizeConnection');

const collegeYear = sequelize.define(
  'collegeYear',
  {
    yearid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    yearname: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: 'collegeYears',
    timestamps: false,
  }
);

module.exports = collegeYear;
