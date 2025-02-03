import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import Home from './components/Home';
import SearchPatient from './components/SearchPatient';
import AddPatient from './components/AddPatient';
import AddRecord from './components/AddRecord';
import PregnancyRecord from './components/PregnancyRecord';
import ChildRecord from './components/ChildRecord';
import ElderlyRecord from './components/ElderlyRecord';
import DisabilityRecord from './components/DisabilityRecord';
import ChronicDiseaseRecord from './components/ChronicDiseaseRecord';
import SmokingAlcoholRecord from './components/SmokingAlcoholRecord';
import Login from './components/Login';
import SignIn from './components/SignIn';
import { AppBar, Toolbar, Button, Container } from '@mui/material';
import PatientList from './components/PatientList';
import PatientDetails from './components/PatientDetails';
import OCRApp from './components/OCRApp';
import CSVUploader from './components/CSVUploader'; // ← CSVアップローダーのコンポーネントをインポート

// カスタムナビゲーションボタン
const NavButton = ({ to, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Button
      component={Link}
      to={to}
      style={{
        color: isActive ? '#0d47a1' : '#ffffff',
        backgroundColor: isActive ? '#bbdefb' : 'transparent',
        margin: '0 10px',
        padding: '0.5rem 1rem',
        borderRadius: '8px',
        transition: 'background-color 0.3s ease',
      }}
    >
      {label}
    </Button>
  );
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <AppBar position="static" style={{ backgroundColor: '#1565c0', boxShadow: 'none' }}>
        <Toolbar>
          {isLoggedIn ? (
            <>
              <NavButton to="/home" label="ホーム" />
              <NavButton to="/search" label="カルテ検索" />
              <NavButton to="/patients" label="患者リスト" />
              <NavButton to="/add-patient" label="患者追加" />
              <NavButton to="/add-record" label="カルテ追加" />
              <NavButton to="/ocr" label="文字認識" />
              <NavButton to="/upload-csv" label="CSVアップロード" /> {/* ← 追加 */}

              <Button
                onClick={() => setIsLoggedIn(false)}
                style={{
                  color: '#ffffff',
                  marginLeft: 'auto',
                  backgroundColor: 'transparent',
                }}
              >
                ログアウト
              </Button>
            </>
          ) : (
            <>
              <NavButton to="/" label="ログイン" />
              <NavButton to="/sign-in" label="アカウント作成" />
            </>
          )}
        </Toolbar>
      </AppBar>

      <Container>
        <Routes>
          {/* ログインとアカウント作成 */}
          <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/sign-in" element={<SignIn />} />

          {/* ログイン後のページ */}
          <Route path="/home" element={isLoggedIn ? <Home /> : <Navigate to="/" />} />
          <Route path="/search" element={isLoggedIn ? <SearchPatient /> : <Navigate to="/" />} />
          <Route path="/add-patient" element={isLoggedIn ? <AddPatient /> : <Navigate to="/" />} />
          <Route path="/add-record" element={isLoggedIn ? <AddRecord /> : <Navigate to="/" />} />
          <Route path="/record/pregnancy" element={isLoggedIn ? <PregnancyRecord /> : <Navigate to="/" />} />
          <Route path="/record/child" element={isLoggedIn ? <ChildRecord /> : <Navigate to="/" />} />
          <Route path="/record/elderly" element={isLoggedIn ? <ElderlyRecord /> : <Navigate to="/" />} />
          <Route path="/record/disability" element={isLoggedIn ? <DisabilityRecord /> : <Navigate to="/" />} />
          <Route path="/record/chronic-disease" element={isLoggedIn ? <ChronicDiseaseRecord /> : <Navigate to="/" />} />
          <Route path="/record/smoking-alcohol" element={isLoggedIn ? <SmokingAlcoholRecord /> : <Navigate to="/" />} />
          <Route path="/patients" element={isLoggedIn ? <PatientList /> : <Navigate to="/" />} />
          <Route path="/patients/:id" element={isLoggedIn ? <PatientDetails /> : <Navigate to="/" />} />
          <Route path="/ocr" element={isLoggedIn ? <OCRApp /> : <Navigate to="/" />} />
          <Route path="/upload-csv" element={isLoggedIn ? <CSVUploader /> : <Navigate to="/" />} /> {/* ← 追加 */}
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
