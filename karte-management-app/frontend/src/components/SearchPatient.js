import React, { useState } from 'react';
import axios from 'axios';
import { 
  Container, TextField, Button, Typography, Paper, 
  FormControl, InputLabel, Select, MenuItem 
} from '@mui/material';

const SearchPatient = () => {
  const [name, setName] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      setError('');
      setResults([]); // 前回の検索結果をクリア

      const response = await axios.get('http://localhost:5000/api/search-patient', {
        params: { elderly_name: name, house_number: houseNumber }, // ✅ 修正
      });

      if (response.data.length === 0) {
        setError('該当する患者が見つかりませんでした。');
      } else {
        setResults(response.data);
      }
    } catch (error) {
      console.error('検索エラー:', error);
      setError('検索中にエラーが発生しました。');
    }
  };

  // 健康状態を `group1, group2, group3` で判定
  const getHealthStatus = (patient) => {
    if (patient.group1) return "自立可能";
    if (patient.group2) return "軽度な支援が必要";
    if (patient.group3) return "介護が必要";
    return "不明";
  };

  return (
    <Container maxWidth="sm">
      <Paper style={{ padding: '2rem', marginTop: '2rem' }}>
        <Typography variant="h4" component="h2" gutterBottom>
          カルテ検索
        </Typography>
        <TextField
          label="名前"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
        />
        <TextField
          label="家番号"
          variant="outlined"
          fullWidth
          value={houseNumber}
          onChange={(e) => setHouseNumber(e.target.value)}
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSearch}
          style={{ marginTop: '1rem' }}
        >
          検索
        </Button>

        {error && (
          <Typography color="error" style={{ marginTop: '1rem' }}>
            {error}
          </Typography>
        )}

        {/* 検索結果の表示 */}
        {results.length > 0 && (
          <div style={{ marginTop: '2rem' }}>
            <Typography variant="h6" component="h3">
              検索結果
            </Typography>
            {results.map((result, index) => (
              <Paper key={index} style={{ padding: '1rem', marginTop: '1rem' }}>
                <Typography>患者ID: {result.id}</Typography>
                <Typography>名前: {result.elderly_name}</Typography>
                <Typography>家番号: {result.house_number}</Typography>
                <Typography>健康状態: {getHealthStatus(result)}</Typography>
                <Typography>健康上の問題: {result.health_problems || 'なし'}</Typography>
              </Paper>
            ))}
          </div>
        )}
      </Paper>
    </Container>
  );
};

export default SearchPatient;
