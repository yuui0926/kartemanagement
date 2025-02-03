import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Paper } from '@mui/material';

const ChildRecord = () => {
  const [recordDate, setRecordDate] = useState('');
  const [childName, setChildName] = useState('');
  const [age, setAge] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [congenitalIssues, setCongenitalIssues] = useState('');
  const [parentName, setParentName] = useState('');
  const [notes, setNotes] = useState('');

  const handleUpload = () => {
    // 入力データの送信処理を追加
    const recordData = {
      recordDate,
      childName,
      age,
      birthDate,
      houseNumber,
      congenitalIssues,
      parentName,
      notes,
    };
    console.log('記録データ:', recordData);
    alert('新生児の記録が保存されました。');
  };

  return (
    <Container maxWidth="sm">
      <Paper style={{ padding: '2rem', marginTop: '2rem' }}>
        <Typography variant="h4" component="h2" gutterBottom>
          新生児～6歳児の記録
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
          label="新生児名"
          variant="outlined"
          fullWidth
          value={childName}
          onChange={(e) => setChildName(e.target.value)}
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
          label="生年月日"
          type="date"
          variant="outlined"
          fullWidth
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
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
        <TextField
          label="親の名前"
          variant="outlined"
          fullWidth
          value={parentName}
          onChange={(e) => setParentName(e.target.value)}
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

export default ChildRecord;
