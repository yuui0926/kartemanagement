const sequelize = require('../config/db');
const Patient = require('./Patient');
const PregnancyRecord = require('./PregnancyRecord');
const ElderlyRecord = require('./ElderlyRecord'); // ✅ 修正: モデルを正しく登録

const db = {
  sequelize,
  Patient,
  PregnancyRecord,
  ElderlyRecord, // ✅ モデルを登録
};

module.exports = db;
