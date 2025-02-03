import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Paper } from '@mui/material';

const SignIn = () => {
  const [id, setId] = useState(''); // ID フィールドを追加
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async () => {
    if (!id || !email || !password || !confirmPassword) {
      alert('すべての項目を入力してください。');
      return;
    }

    if (password !== confirmPassword) {
      alert('パスワードが一致しません。再入力してください。');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/sign-in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, email, password }), // id を含める
      });

      if (response.ok) {
        alert('アカウントが正常に作成されました。ログインしてください。');
        navigate('/'); // ログインページへ遷移
      } else {
        const error = await response.json();
        alert(`アカウント作成失敗: ${error.message}`);
      }
    } catch (error) {
      console.error('アカウント作成エラー:', error);
      alert('サーバーエラーが発生しました。');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper style={{ padding: '2rem', marginTop: '2rem' }}>
        <Typography variant="h4" component="h2" gutterBottom>
          アカウント作成
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
          label="メールアドレス"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        <TextField
          label="パスワード確認"
          variant="outlined"
          fullWidth
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSignIn}
          style={{ marginTop: '1rem' }}
        >
          アカウント作成
        </Button>
      </Paper>
    </Container>
  );
};

export default SignIn;
