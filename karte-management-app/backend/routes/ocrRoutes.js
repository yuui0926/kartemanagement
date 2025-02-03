const express = require('express');
const multer = require('multer');
const vision = require('@google-cloud/vision');

const router = express.Router();

// Google Cloud Visionクライアントの初期化
const client = new vision.ImageAnnotatorClient({
  keyFilename: 'C:/Users/Yuui1/OneDrive/デスクトップ/タイ/karte-management-app/backend/compact-gadget-429904-b0-749f095e2e84.json', // サービスアカウントキーのパス
});

// Multerの設定（アップロード先を指定）
const upload = multer({ dest: 'uploads/' });

// OCRエンドポイント（テキストと座標データを返す）
router.post('/ocr-and-save', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: '画像ファイルがアップロードされていません。' });
    }

    const filePath = req.file.path;

    // Google Cloud Vision APIでOCRを実行
    const [result] = await client.textDetection(filePath);
    const detections = result.textAnnotations;

    if (!detections || detections.length === 0) {
      return res.status(200).json({ message: '文字が検出されませんでした。', detectedText: '', boundingBoxes: [] });
    }

    // 検出されたテキストと座標データを整形
    const textData = detections.map((text) => ({
      description: text.description,
      boundingPoly: text.boundingPoly ? text.boundingPoly.vertices : [],
    }));

    console.log('検出されたデータ:', textData);

    // 成功レスポンス
    res.status(200).json({ message: 'OCR処理が成功しました。', data: textData });
  } catch (error) {
    console.error('OCRエラー:', error);
    res.status(500).json({ error: 'OCR処理中にエラーが発生しました。' });
  }
});

module.exports = router;
