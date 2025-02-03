import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Paper, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const PregnancyRecord = () => {
  const [recordDate, setRecordDate] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [hospital, setHospital] = useState('');
  const [congenitalIssues, setCongenitalIssues] = useState('');
  const [postpartumCheck, setPostpartumCheck] = useState('');
  const [notes, setNotes] = useState('');
  const [patientId, setPatientId] = useState(''); // 患者IDフィールド

  const handleUpload = async () => {
    const recordData = {
      recordDate,
      name,
      age,
      houseNumber,
      deliveryDate,
      hospital,
      congenitalIssues,
      postpartumCheck,
      notes,
      patientId, // 患者IDを送信データに含める
    };

    try {
      const response = await fetch('http://localhost:5000/api/pregnancy-records', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recordData),
      });

      if (response.ok) {
        alert('妊婦の記録が保存されました。');
        // フィールドをリセット
        setRecordDate('');
        setName('');
        setAge('');
        setHouseNumber('');
        setDeliveryDate('');
        setHospital('');
        setCongenitalIssues('');
        setPostpartumCheck('');
        setNotes('');
        setPatientId('');
      } else {
        const error = await response.json();
        alert(`保存エラー: ${error.message}`);
      }
    } catch (error) {
      console.error('保存エラー:', error);
      alert('サーバーエラーが発生しました。');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper style={{ padding: '2rem', marginTop: '2rem' }}>
        <Typography variant="h4" component="h2" gutterBottom>
          妊婦の記録
        </Typography>
        <TextField
          label="患者ID"
          variant="outlined"
          fullWidth
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
          margin="normal"
          required
        />
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
          label="出産日"
          type="date"
          variant="outlined"
          fullWidth
          value={deliveryDate}
          onChange={(e) => setDeliveryDate(e.target.value)}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="出産する病院"
          variant="outlined"
          fullWidth
          value={hospital}
          onChange={(e) => setHospital(e.target.value)}
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
          <InputLabel>産後検診</InputLabel>
          <Select
            value={postpartumCheck}
            onChange={(e) => setPostpartumCheck(e.target.value)}
          >
            <MenuItem value="検査する">検査する</MenuItem>
            <MenuItem value="検査しない">検査しない</MenuItem>
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

export default PregnancyRecord;
