const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const SmokingAlcoholRecord = sequelize.define('SmokingAlcoholRecord', {
  recordDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  houseNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  duration: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  quitStatus: {
    type: DataTypes.ENUM('辞められた', '辞められていない'),
    allowNull: false,
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'smoking_alcohol_records',
  timestamps: true,
});

module.exports = SmokingAlcoholRecord;
