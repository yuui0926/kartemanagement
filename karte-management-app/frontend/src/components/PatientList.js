import React, { useEffect, useState } from 'react';
import { 
  Container, Typography, Paper, Table, TableBody, 
  TableCell, TableContainer, TableHead, TableRow, Button 
} from '@mui/material';
import axios from 'axios';

const PatientList = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetchPatients();
  }, []);

  // 患者データを取得
  const fetchPatients = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/elderly-records');
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  // 患者データを削除
  const deletePatient = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/elderly-records/${id}`);
      setPatients(patients.filter(patient => patient.id !== id));
    } catch (error) {
      console.error('Error deleting patient:', error);
    }
  };

  // 健康状態の判定（group1, group2, group3 の組み合わせで表示）
  const getHealthStatus = (patient) => {
    if (patient.group1) return "自立可能";
    if (patient.group2) return "軽度な支援が必要";
    if (patient.group3) return "介護が必要";
    return "不明";
  };

  return (
    <Container style={{ marginTop: '2rem' }}>
      <Typography variant="h4" component="h2" gutterBottom>
        高齢者の患者リスト
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>名前</TableCell>
              <TableCell>年齢（歳）</TableCell>
              <TableCell>家番号</TableCell>
              <TableCell>先天性疾患・異常</TableCell>
              <TableCell>健康状態</TableCell>
              <TableCell>健康上の問題</TableCell>
              <TableCell>操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.map((patient) => (
              <TableRow key={patient.id}>
                <TableCell>{patient.id}</TableCell>
                <TableCell>{patient.elderly_name || '不明'}</TableCell>
                <TableCell>{patient.age || '不明'}</TableCell>
                <TableCell>{patient.house_number || '不明'}</TableCell>
                <TableCell>{patient.congenital_issues || 'なし'}</TableCell>
                <TableCell>{getHealthStatus(patient)}</TableCell>
                <TableCell>{patient.health_problems || 'なし'}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => deletePatient(patient.id)}
                  >
                    削除
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default PatientList;
