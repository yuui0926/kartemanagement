require('dotenv').config(); // 環境変数の読み込み
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models'); // models/index.js から sequelize をインポート

// ルートのインポート
const authRoutes = require('./routes/authRoutes'); // 認証関連
const patientRoutes = require('./routes/patientRoutes'); // 患者関連
const pregnancyRoutes = require('./routes/pregnancyRoutes'); // 妊婦記録関連
const ocrRoutes = require('./routes/ocrRoutes'); // OCR関連ルート
const elderlyRoutes = require('./routes/elderlyRoutes');
const smokingAlcoholRoutes = require('./routes/smokingAlcoholRoutes');
const csvRoutes = require('./routes/csvRoutes');

// アプリケーションの初期化
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// 簡単な動作確認ルート
app.get('/', (req, res) => {
  res.send('Hello from the Karte Management API');
});

// APIルート
app.use('/api', authRoutes);
app.use('/api', patientRoutes);
app.use('/api', pregnancyRoutes);
app.use('/api/ocr', ocrRoutes);
app.use('/api', elderlyRoutes);
app.use('/api', smokingAlcoholRoutes);
app.use('/api/csv', csvRoutes);


// 404エラーハンドリング
app.use((req, res, next) => {
  res.status(404).json({ error: 'Resource not found' });
});

// 全体のエラーハンドリング
app.use((err, req, res, next) => {
  console.error('サーバーエラー:', err.stack);
  res.status(500).json({ error: '内部サーバーエラーが発生しました。' });
});

// データベース接続と同期
sequelize
  .sync() // force: true を除外
  .then(() => {
    console.log('MySQLのデータベースが同期されました。');
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('データベース同期エラー:', err);
    process.exit(1); // エラー時にプロセス終了
  });
