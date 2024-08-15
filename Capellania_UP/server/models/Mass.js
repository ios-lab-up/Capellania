// server/models/Mass.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Mass = sequelize.define('Mass', {
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Mass;
