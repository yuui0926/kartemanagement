const express = require('express');
const { ElderlyRecord } = require('../models'); // ✅ 修正: `index.js` からインポート

const router = express.Router();

// **患者データを保存するエンドポイント**
router.post('/save', async (req, res) => {
    try {
        const { records } = req.body;

        for (const record of records) {
            await ElderlyRecord.create({
                elderly_name: record.elderly_name,
                age: record.age,
                house_number: record.house_number,
                congenital_issues: record.congenital_issues,
                health_problems: record.health_problems,
            });
        }

        res.status(200).json({ message: '高齢者情報が保存されました。' });
    } catch (error) {
        console.error('エラー:', error);
        res.status(500).json({ error: 'データの保存に失敗しました。' });
    }
});

// **患者一覧を取得するエンドポイント**
router.get('/elderly-records', async (req, res) => {
    try {
        console.log("🚀 GET /elderly-records にリクエストが来ました"); 
        const records = await ElderlyRecord.findAll();
        console.log("📦 取得したデータ:", records);
        res.status(200).json(records);
    } catch (error) {
        console.error('データ取得エラー:', error);
        res.status(500).json({ error: 'データの取得に失敗しました。' });
    }
});

// **特定の患者データを削除するエンドポイント**
router.delete('/elderly-records/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const record = await ElderlyRecord.findByPk(id);
        if (!record) {
            return res.status(404).json({ error: '該当の患者が見つかりません。' });
        }

        await record.destroy();
        res.status(200).json({ message: '患者データを削除しました。' });
    } catch (error) {
        console.error('データ削除エラー:', error);
        res.status(500).json({ error: 'データの削除に失敗しました。' });
    }
});

module.exports = router;
