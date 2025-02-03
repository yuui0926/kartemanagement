import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Paper, CircularProgress } from '@mui/material';

const OCRApp = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [detectedData, setDetectedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setDetectedData([]);
    setError('');
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('画像ファイルを選択してください。');
      return;
    }

    setLoading(true);
    setError('');
    setDetectedData([]);

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await axios.post('http://localhost:5000/api/ocr/ocr-and-save', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setDetectedData(response.data.data || []);
    } catch (err) {
      setError('OCR処理中にエラーが発生しました。');
      console.error('OCRエラー:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
      <Paper style={{ padding: '2rem' }}>
        <Typography variant="h4" component="h2" gutterBottom>
          OCR アプリ (座標データ付き)
        </Typography>
        <TextField
          type="file"
          fullWidth
          margin="normal"
          onChange={handleFileChange}
          InputLabelProps={{ shrink: true }}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleUpload}
          disabled={loading}
          style={{ marginTop: '1rem' }}
        >
          {loading ? <CircularProgress size={24} /> : 'アップロードしてOCR実行'}
        </Button>
        {error && (
          <Typography color="error" style={{ marginTop: '1rem' }}>
            {error}
          </Typography>
        )}
        {detectedData.length > 0 && (
          <Typography variant="body1" style={{ marginTop: '1rem', whiteSpace: 'pre-line' }}>
            <strong>検出されたテキストと座標:</strong>
            <br />
            {detectedData.map((item, index) => (
              <div key={index}>
                <p>
                  <strong>テキスト:</strong> {item.description}
                </p>
                <p>
                  <strong>座標:</strong>{' '}
                  {item.boundingPoly.map((vertex, i) => `(${vertex.x}, ${vertex.y})`).join(', ')}
                </p>
                <hr />
              </div>
            ))}
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default OCRApp;
