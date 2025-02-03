const express = require('express');
const router = express.Router();
const SmokingAlcoholRecord = require('../models/SmokingAlcoholRecord'); // モデルをインポート

// 記録の作成
router.post('/', async (req, res) => {
  const { recordDate, name, age, houseNumber, phoneNumber, duration, quitStatus, notes } = req.body;

  if (!recordDate || !name || !age || !houseNumber || !phoneNumber || !quitStatus) {
    return res.status(400).json({ message: '必要なフィールドをすべて入力してください。' });
  }

  try {
    await SmokingAlcoholRecord.create({
      recordDate,
      name,
      age,
      houseNumber,
      phoneNumber,
      duration,
      quitStatus,
      notes,
    });
    res.status(201).json({ message: '記録が正常に保存されました。' });
  } catch (error) {
    console.error('記録作成エラー:', error);
    res.status(500).json({ message: 'サーバーエラーが発生しました。' });
  }
});

module.exports = router;
