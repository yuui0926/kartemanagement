import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Paper, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const ElderlyRecord = () => {
  const [recordDate, setRecordDate] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [congenitalIssues, setCongenitalIssues] = useState('');
  const [healthStatus, setHealthStatus] = useState('');
  const [healthIssues, setHealthIssues] = useState('');
  const [notes, setNotes] = useState('');

  const handleUpload = () => {
    // 入力データの送信処理を追加
    const recordData = {
      recordDate,
      name,
      age,
      houseNumber,
      congenitalIssues,
      healthStatus,
      healthIssues,
      notes,
    };
    console.log('記録データ:', recordData);
    alert('高齢者の記録が保存されました。');
  };

  return (
    <Container maxWidth="sm">
      <Paper style={{ padding: '2rem', marginTop: '2rem' }}>
        <Typography variant="h4" component="h2" gutterBottom>
          高齢者の記録
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
        <TextField
          label="先天性疾患/異常症状"
          variant="outlined"
          fullWidth
          value={congenitalIssues}
          onChange={(e) => setCongenitalIssues(e.target.value)}
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>健康状態</InputLabel>
          <Select
            value={healthStatus}
            onChange={(e) => setHealthStatus(e.target.value)}
          >
            <MenuItem value="自立可能">自立可能</MenuItem>
            <MenuItem value="軽度な支援を要する">軽度な支援を要する</MenuItem>
            <MenuItem value="介護を要する">介護を要する</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="健康上の問題"
          variant="outlined"
          fullWidth
          value={healthIssues}
          onChange={(e) => setHealthIssues(e.target.value)}
          margin="normal"
        />
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

export default ElderlyRecord;
