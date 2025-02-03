import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Paper, MenuItem } from '@mui/material';

const AddPatient = () => {
  const [patientData, setPatientData] = useState({
    id: '', // IDを入力できるように追加
    name: '',
    age: '',
    gender: '',
    address: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatientData({ ...patientData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/patients', patientData);
      setMessage('患者が登録されました: ' + response.data.name);
      setPatientData({ id: '', name: '', age: '', gender: '', address: '' });
    } catch (error) {
      console.error('Error registering patient:', error);
      setMessage(error.response?.data?.error || '患者の登録に失敗しました。');
    }
  };

  return (
    <div style={{ backgroundColor: '#e3f2fd', minHeight: '100vh', paddingTop: '2rem' }}>
      <Container maxWidth="sm">
        <Paper
          style={{
            padding: '2rem',
            borderRadius: '12px',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#ffffff',
          }}
        >
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            style={{ fontWeight: 'bold', textAlign: 'center', color: '#1565c0' }}
          >
            患者の登録
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="ID"
              name="id"
              type="number"
              value={patientData.id}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="名前"
              name="name"
              value={patientData.name}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="年齢"
              name="age"
              type="number"
              value={patientData.age}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="性別"
              name="gender"
              select
              value={patientData.gender}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required
              margin="normal"
            >
              <MenuItem value="男性">男性</MenuItem>
              <MenuItem value="女性">女性</MenuItem>
              <MenuItem value="その他">その他</MenuItem>
            </TextField>
            <TextField
              label="住所"
              name="address"
              value={patientData.address}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required
              margin="normal"
            />
            <Button
              type="submit"
              variant="contained"
              style={{
                backgroundColor: '#1565c0',
                color: '#ffffff',
                marginTop: '1rem',
                padding: '0.75rem',
                fontSize: '1rem',
                borderRadius: '8px',
              }}
              fullWidth
            >
              登録
            </Button>
          </form>
          {message && (
            <Typography
              style={{
                marginTop: '1rem',
                textAlign: 'center',
                color: message.includes('失敗') ? 'red' : 'green',
              }}
            >
              {message}
            </Typography>
          )}
        </Paper>
      </Container>
    </div>
  );
};

export default AddPatient;
