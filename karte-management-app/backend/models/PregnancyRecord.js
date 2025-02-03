const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const PregnancyRecord = sequelize.define('PregnancyRecord', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
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
    allowNull: true,
  },
  deliveryDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  hospital: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  congenitalIssues: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  postpartumCheck: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  patientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'patients',
      key: 'id',
    },
  },
}, {
  tableName: 'pregnancy_records',
  timestamps: true,
});

module.exports = PregnancyRecord;
