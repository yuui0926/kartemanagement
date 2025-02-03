import React, { useState } from 'react';
import axios from 'axios';
import { 
  Button, Typography, TextField, Table, TableBody, 
  TableCell, TableContainer, TableHead, TableRow, Paper 
} from '@mui/material';

const CSVUploader = () => {
  const [csvText, setCsvText] = useState('');
  const [uploadedData, setUploadedData] = useState([]);

  const handleUpload = async () => {
    if (!csvText.trim()) {
      alert('CSV形式のテキストを入力してください');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/csv/upload-csv-text', { text: csvText }, {
        headers: { 'Content-Type': 'application/json' },
      });

      setUploadedData(response.data.records || []);
      alert(response.data.message);
    } catch (error) {
      console.error('❌ アップロードエラー:', error);
      alert('アップロードに失敗しました');
    }
  };

  // 健康状態を表示（group1, group2, group3 の組み合わせで判定）
  const getHealthStatus = (patient) => {
    if (patient.group1) return "自立可能";
    if (patient.group2) return "軽度な支援が必要";
    if (patient.group3) return "介護が必要";
    return "不明";
  };

  return (
    <div>
      <Typography variant="h4">CSVテキスト入力</Typography>
      <TextField
        label="CSVデータを入力"
        multiline
        rows={5}
        fullWidth
        variant="outlined"
        value={csvText}
        onChange={(e) => setCsvText(e.target.value)}
        style={{ marginBottom: '10px' }}
      />
      <Button variant="contained" color="primary" onClick={handleUpload} style={{ marginLeft: '10px' }}>
        アップロード
      </Button>

      {uploadedData.length > 0 && (
        <div>
          <Typography variant="h5" style={{ marginTop: '20px' }}>アップロードされたデータ</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>名前</TableCell>
                  <TableCell>年齢（歳）</TableCell>
                  <TableCell>家番号</TableCell>
                  <TableCell>先天性疾患・異常</TableCell>
                  <TableCell>健康状態</TableCell>
                  <TableCell>健康上の問題</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {uploadedData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.elderly_name || '不明'}</TableCell>
                    <TableCell>{row.age || '不明'}</TableCell>
                    <TableCell>{row.house_number || '不明'}</TableCell>
                    <TableCell>{row.congenital_issues || 'なし'}</TableCell>
                    <TableCell>{getHealthStatus(row)}</TableCell>
                    <TableCell>{row.health_problems || 'なし'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </div>
  );
};

export default CSVUploader;
