import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Paper } from '@mui/material';

const Login = ({ setIsLoggedIn }) => {
  const [id, setId] = useState(''); // IDフィールドを追加
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

const handleLogin = async () => {
  if (!id || !password) {
    alert('IDとパスワードを入力してください。');
    return;
  }

  try {
    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, password }),
    });

    console.log('送信データ:', { id, password }); // デバッグ用

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('token', data.token);
      setIsLoggedIn(true);
      navigate('/home');
    } else {
      const error = await response.json();
      alert(`ログイン失敗: ${error.message || '不明なエラーが発生しました。'}`);
    }
  } catch (error) {
    console.error('ログインエラー:', error);
    alert('ネットワークまたはサーバーエラーが発生しました。');
  }
};

  

  return (
    <Container maxWidth="sm">
      <Paper style={{ padding: '2rem', marginTop: '2rem' }}>
        <Typography variant="h4" component="h2" gutterBottom>
          ログイン
        </Typography>
        <TextField
          label="ユーザーID"
          variant="outlined"
          fullWidth
          value={id}
          onChange={(e) => setId(e.target.value)}
          margin="normal"
        />
        <TextField
          label="パスワード"
          variant="outlined"
          fullWidth
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleLogin}
          style={{ marginTop: '1rem' }}
        >
          ログイン
        </Button>
        <Button
          color="secondary"
          fullWidth
          onClick={() => navigate('/sign-in')}
          style={{ marginTop: '1rem' }}
        >
          アカウント作成はこちら
        </Button>
      </Paper>
    </Container>
  );
};

export default Login;
