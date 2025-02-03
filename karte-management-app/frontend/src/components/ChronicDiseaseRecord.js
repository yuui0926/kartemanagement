import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Paper, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const ChronicDiseaseRecord = () => {
  const [recordDate, setRecordDate] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [diseaseType, setDiseaseType] = useState('');
  const [notes, setNotes] = useState('');

  const handleUpload = () => {
    // 入力データの送信処理を追加
    const recordData = {
      recordDate,
      name,
      age,
      houseNumber,
      diseaseType,
      notes,
    };
    console.log('記録データ:', recordData);
    alert('慢性疾患患者の記録が保存されました。');
  };

  return (
    <Container maxWidth="sm">
      <Paper style={{ padding: '2rem', marginTop: '2rem' }}>
        <Typography variant="h4" component="h2" gutterBottom>
          慢性疾患患者の記録
        </Typography>
        <TextField
          label="データ記録日"
          type="date"
          variant="outlined"
          fullWidth
          value={recordDate}
          onChange={(e) => setRecordDate(e.target.value)}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="名前"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
        />
        <TextField
          label="年齢"
          variant="outlined"
          fullWidth
          value={age}
          onChange={(e) => setAge(e.target.value)}
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
        <FormControl fullWidth margin="normal">
          <InputLabel>種類/持病</InputLabel>
          <Select
            value={diseaseType}
            onChange={(e) => setDiseaseType(e.target.value)}
          >
            <MenuItem value="糖尿病">糖尿病</MenuItem>
            <MenuItem value="高血圧">高血圧</MenuItem>
            <MenuItem value="がん">がん</MenuItem>
            <MenuItem value="麻痺">麻痺</MenuItem>
            <MenuItem value="心血管系疾患">心血管系疾患</MenuItem>
            <MenuItem value="腎臓">腎臓</MenuItem>
            <MenuItem value="精神系疾患">精神系疾患</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="備考"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleUpload}
          style={{ marginTop: '1rem' }}
        >
          アップロード
        </Button>
      </Paper>
    </Container>
  );
};

export default ChronicDiseaseRecord;
