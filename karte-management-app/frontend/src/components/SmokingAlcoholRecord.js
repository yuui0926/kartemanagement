import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Paper, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';

const SmokingAlcoholRecord = () => {
  const [recordDate, setRecordDate] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [duration, setDuration] = useState('');
  const [quitStatus, setQuitStatus] = useState('');
  const [notes, setNotes] = useState('');

  const handleUpload = async () => {
    const recordData = {
      recordDate,
      name,
      age,
      houseNumber,
      phoneNumber,
      duration,
      quitStatus,
      notes,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/smoking-alcohol', recordData);
      alert(response.data.message);
    } catch (error) {
      console.error('エラー:', error);
      alert('記録の保存中にエラーが発生しました。');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper style={{ padding: '2rem', marginTop: '2rem' }}>
        <Typography variant="h4" component="h2" gutterBottom>
          飲酒や喫煙者の記録
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
          label="電話番号"
          variant="outlined"
          fullWidth
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          margin="normal"
        />
        <TextField
          label="期間"
          variant="outlined"
          fullWidth
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>辞められたかどうか</InputLabel>
          <Select
            value={quitStatus}
            onChange={(e) => setQuitStatus(e.target.value)}
          >
            <MenuItem value="辞められた">辞められた</MenuItem>
            <MenuItem value="辞められていない">辞められていない</MenuItem>
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

export default SmokingAlcoholRecord;
