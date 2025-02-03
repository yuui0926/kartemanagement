import React from 'react';
import { Container, Button, Typography, Paper } from '@mui/material';
import { CloudUpload, Search, PersonAdd, UploadFile } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Home = () => {
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
            ホーム
          </Typography>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              marginTop: '1rem',
            }}
          >
            {/* 既存のボタン */}
            <Button
              variant="contained"
              style={{
                backgroundColor: '#1976d2',
                color: '#ffffff',
                padding: '1rem',
                fontSize: '1.1rem',
                borderRadius: '8px',
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'background-color 0.3s ease',
              }}
              fullWidth
              startIcon={<CloudUpload />}
              component={Link}
              to="/add-record"
            >
              カルテアップロード
            </Button>
            <Button
              variant="contained"
              style={{
                backgroundColor: '#42a5f5',
                color: '#ffffff',
                padding: '1rem',
                fontSize: '1.1rem',
                borderRadius: '8px',
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'background-color 0.3s ease',
              }}
              fullWidth
              startIcon={<Search />}
              component={Link}
              to="/search"
            >
              カルテ検索
            </Button>
            <Button
              variant="contained"
              style={{
                backgroundColor: '#64b5f6',
                color: '#ffffff',
                padding: '1rem',
                fontSize: '1.1rem',
                borderRadius: '8px',
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'background-color 0.3s ease',
              }}
              fullWidth
              startIcon={<PersonAdd />}
              component={Link}
              to="/record/pregnancy"
            >
              妊婦記録
            </Button>

            {/* CSVアップローダーボタン */}
            <Button
              variant="contained"
              style={{
                backgroundColor: '#81c784',
                color: '#ffffff',
                padding: '1rem',
                fontSize: '1.1rem',
                borderRadius: '8px',
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'background-color 0.3s ease',
              }}
              fullWidth
              startIcon={<UploadFile />}
              component={Link}
              to="/upload-csv"
            >
              CSVアップロード
            </Button>

            {/* 仮ボタン：すべてのページへの遷移 */}
            <Typography
              variant="h6"
              component="h3"
              style={{ textAlign: 'center', color: '#1565c0', marginTop: '2rem' }}
            >
              確認用仮ボタン
            </Typography>
            {[
              { label: 'AddRecord', path: '/add-record' },
              { label: 'Login', path: '/login' },
              { label: 'ChildRecord', path: '/record/child' },
              { label: 'ChronicDiseaseRecord', path: '/record/chronic-disease' },
              { label: 'DisabilityRecord', path: '/record/disability' },
              { label: 'SearchPatient', path: '/search' },
              { label: 'ElderlyRecord', path: '/record/elderly' },
              { label: 'SmokingAlcoholRecord', path: '/record/smoking-alcohol' },
              { label: 'SignIn', path: '/sign-in' },
              { label: 'AddPatient', path: '/add-patient' }, // AddPatient.js用ボタン
              { label: 'PatientList', path: '/patients' }, // 追加: 患者リスト用ボタン
              { label: 'CSVUploader', path: '/upload-csv' }, // CSVアップロード用ボタン
            ].map((page, index) => (
              <Button
                key={index}
                variant="outlined"
                fullWidth
                component={Link}
                to={page.path}
                style={{ color: '#1565c0', borderColor: '#1565c0', marginTop: '0.5rem' }}
              >
                {page.label}
              </Button>
            ))}
          </div>
        </Paper>
      </Container>
    </div>
  );
};

export default Home;
