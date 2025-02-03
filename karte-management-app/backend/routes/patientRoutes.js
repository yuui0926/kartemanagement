const express = require('express');
const { Op } = require('sequelize');
const { ElderlyRecord } = require('../models'); // 高齢者の記録モデルをインポート

const router = express.Router();

// 患者データ検索API
router.get('/search-patient', async (req, res) => {
  try {
    const { name, houseNumber, recordType } = req.query;

    const whereClause = {};
    if (name) whereClause.elderly_name = { [Op.like]: `%${name}%` };
    if (houseNumber) whereClause.house_number = houseNumber;

    let patients = [];

    // 高齢者のデータを取得
    if (recordType === '高齢者') {
      patients = await ElderlyRecord.findAll({ where: whereClause });
    }

    res.json(patients);
  } catch (error) {
    console.error('患者検索エラー:', error);
    res.status(500).json({ error: '検索中にエラーが発生しました。' });
  }
});

module.exports = router;
