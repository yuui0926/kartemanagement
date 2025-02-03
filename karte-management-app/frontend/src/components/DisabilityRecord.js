import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Paper, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const DisabilityRecord = () => {
  const [recordDate, setRecordDate] = useState('');
  const [disabledName, setDisabledName] = useState('');
  const [caregiverName, setCaregiverName] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [disabilityName, setDisabilityName] = useState('');
  const [disabilityType, setDisabilityType] = useState('');
  const [disabilitySeverity, setDisabilitySeverity] = useState('');
  const [notes, setNotes] = useState('');

  const handleUpload = () => {
    // 入力データの送信処理を追加
    const recordData = {
      recordDate,
      disabledName,
      caregiverName,
      houseNumber,
      disabilityName,
      disabilityType,
      disabilitySeverity,
      notes,
    };
    console.log('記録データ:', recordData);
    alert('障がい者の記録が保存されました。');
  };

  return (
    <Container maxWidth="sm">
      <Paper style={{ padding: '2rem', marginTop: '2rem' }}>
        <Typography variant="h4" component="h2" gutterBottom>
          障がい者の記録
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
          label="障がい者の名前"
          variant="outlined"
          fullWidth
          value={disabledName}
          onChange={(e) => setDisabledName(e.target.value)}
          margin="normal"
        />
        <TextField
          label="介護者の名前"
          variant="outlined"
          fullWidth
          value={caregiverName}
          onChange={(e) => setCaregiverName(e.target.value)}
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
          label="障害の名前"
          variant="outlined"
          fullWidth
          value={disabilityName}
          onChange={(e) => setDisabilityName(e.target.value)}
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>障害の種類</InputLabel>
          <Select
            value={disabilityType}
            onChange={(e) => setDisabilityType(e.target.value)}
          >
            <MenuItem value="資格">資格</MenuItem>
            <MenuItem value="聴覚または会話">聴覚または会話</MenuItem>
            <MenuItem value="身体または運動機能">身体または運動機能</MenuItem>
            <MenuItem value="精神または行動">精神または行動</MenuItem>
            <MenuItem value="知的または学習能力">知的または学習能力</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>障害の程度</InputLabel>
          <Select
            value={disabilitySeverity}
            onChange={(e) => setDisabilitySeverity(e.target.value)}
          >
            <MenuItem value="自立可能">自立可能</MenuItem>
            <MenuItem value="支援が必要">支援が必要</MenuItem>
            <MenuItem value="緊急支援が必要">緊急支援が必要</MenuItem>
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

export default DisabilityRecord;
