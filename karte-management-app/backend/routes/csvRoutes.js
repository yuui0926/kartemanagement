const express = require('express');
const { ElderlyRecord } = require('../models'); // 高齢者データモデルをインポート

const router = express.Router();

// CSV形式のテキストデータをデータベースに保存するエンドポイント
router.post('/upload-csv-text', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ message: 'CSV形式のテキストが入力されていません。' });
    }

    const rows = text.trim().split('\n'); // 改行で分割
    const records = [];
    
    rows.forEach(row => {
      const cols = row.split(','); // カンマ区切りで分割
      records.push({
        elderly_name: cols[0] && cols[0].trim() !== '' ? cols[0] : '不明',
        age: cols[1] ? parseInt(cols[1], 10) : null,
        house_number: cols[2] ? parseInt(cols[2], 10) : null,
        congenital_issues: cols[3] || '',
        group1: cols[4] === '1', // ✅ 文字列 '1' なら true に変換
        group2: cols[5] === '1',
        group3: cols[6] === '1',
        health_problems: cols[7] || '',
      });
    });

    if (records.length === 0) {
      return res.status(400).json({ message: '有効なデータがありません。' });
    }

    console.log('📦 保存するデータ:', records); // デバッグ用
    const savedRecords = await ElderlyRecord.bulkCreate(records);

    res.status(201).json({ 
      message: 'CSVデータが保存されました。',
      records: savedRecords
    });
  } catch (error) {
    console.error('❌ データ保存エラー:', error);
    res.status(500).json({ error: 'データ保存中にエラーが発生しました。' });
  }
});

module.exports = router;
