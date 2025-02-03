import React, { useState } from 'react';
import { Container, Typography, Paper, Button, MenuItem, TextField } from '@mui/material';
import { UploadFile } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom'; // React Router v6以降を想定

const AddRecord = () => {
  const [selectedType, setSelectedType] = useState('');
  const navigate = useNavigate();

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      alert(`ファイル「${file.name}」が選択されました`);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      alert(`画像「${file.name}」が選択されました`);
    }
  };

  const handleNavigate = () => {
    switch (selectedType) {
      case '妊婦':
        navigate('/pregnant');
        break;
      case '新生児～6歳':
        navigate('/newborn');
        break;
      case '高齢者':
        navigate('/elderly');
        break;
      case '障がい者':
        navigate('/disabled');
        break;
      case '慢性疾患患者':
        navigate('/chronic');
        break;
      case '飲酒':
        navigate('/alcohol');
        break;
      case '喫煙者':
        navigate('/smoker');
        break;
      default:
        alert('カルテの種類を選択してください');
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
            カルテの追加
          </Typography>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              marginTop: '1rem',
            }}
          >
            {/* カルテの種類選択 */}
            <TextField
              select
              label="カルテの種類を選択"
              value={selectedType}
              onChange={handleTypeChange}
              variant="outlined"
              fullWidth
              style={{ backgroundColor: '#f5f5f5' }}
            >
              <MenuItem value="妊婦">妊婦</MenuItem>
              <MenuItem value="新生児～6歳">新生児～6歳</MenuItem>
              <MenuItem value="高齢者">高齢者</MenuItem>
              <MenuItem value="障がい者">障がい者</MenuItem>
              <MenuItem value="慢性疾患患者">慢性疾患患者</MenuItem>
              <MenuItem value="飲酒">飲酒</MenuItem>
              <MenuItem value="喫煙者">喫煙者</MenuItem>
            </TextField>

            {/* 画像アップロード */}
            <Button
              variant="contained"
              component="label"
              style={{
                backgroundColor: '#42a5f5',
                color: '#ffffff',
                padding: '0.8rem',
                fontSize: '1.1rem',
                borderRadius: '8px',
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'background-color 0.3s ease',
              }}
              fullWidth
              startIcon={<UploadFile />}
            >
              画像をアップロード
              <input type="file" accept="image/*" hidden onChange={handleImageUpload} />
            </Button>

            {/* ファイルアップロード */}
            <Button
              variant="contained"
              component="label"
              style={{
                backgroundColor: '#1976d2',
                color: '#ffffff',
                padding: '0.8rem',
                fontSize: '1.1rem',
                borderRadius: '8px',
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'background-color 0.3s ease',
              }}
              fullWidth
              startIcon={<UploadFile />}
            >
              ファイルをアップロード
              <input type="file" hidden onChange={handleFileUpload} />
            </Button>

            {/* 選択したカルテの登録ページへ遷移するボタン */}
            <Button
              variant="contained"
              color="primary"
              style={{
                padding: '0.8rem',
                fontSize: '1.1rem',
                borderRadius: '8px',
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
              }}
              fullWidth
              onClick={handleNavigate}
            >
              選択したカルテの登録ページへ
            </Button>
          </div>
        </Paper>
      </Container>
    </div>
  );
};

export default AddRecord;
