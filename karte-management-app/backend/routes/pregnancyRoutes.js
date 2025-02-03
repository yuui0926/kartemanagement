const express = require('express');
const router = express.Router();
const PregnancyRecord = require('../models/PregnancyRecord');
const Patient = require('../models/Patient'); // 患者モデルをインポート

// 妊婦記録の保存
router.post('/', async (req, res) => {
  const { recordDate, name, age, houseNumber, deliveryDate, hospital, congenitalIssues, postpartumCheck, notes, patientId } = req.body;

  try {
    // 患者が存在するか確認
    const patient = await Patient.findByPk(patientId);
    if (!patient) {
      return res.status(404).json({ message: '指定された患者が見つかりません。' });
    }

    // 妊婦記録を作成
    const newRecord = await PregnancyRecord.create({
      recordDate,
      name,
      age,
      houseNumber,
      deliveryDate,
      hospital,
      congenitalIssues,
      postpartumCheck,
      notes,
      patientId,
    });

    res.status(201).json(newRecord);
  } catch (error) {
    console.error('Error saving pregnancy record:', error);
    res.status(500).json({ message: '妊婦記録の保存に失敗しました。' });
  }
});

// 妊婦記録のリストを取得
router.get('/', async (req, res) => {
  try {
    const records = await PregnancyRecord.findAll({ include: Patient }); // 患者情報も含めて取得
    res.status(200).json(records);
  } catch (error) {
    console.error('Error fetching pregnancy records:', error);
    res.status(500).json({ message: '妊婦記録の取得に失敗しました。' });
  }
});

module.exports = router;
