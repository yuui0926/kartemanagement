import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import axios from 'axios';

const PatientDetails = () => {
  const { id } = useParams(); // URLからIDを取得
  const [patientData, setPatientData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/patients/${id}`);
        setPatientData(response.data);
      } catch (err) {
        setError('患者データの取得に失敗しました。');
      }
    };

    fetchPatientData();
  }, [id]);

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!patientData) {
    return <Typography>データを読み込んでいます...</Typography>;
  }

  return (
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      {/* 基本情報 */}
      <Paper style={{ padding: '2rem', marginBottom: '2rem' }}>
        <Typography variant="h4" gutterBottom>患者の基本情報</Typography>
        <Typography><strong>名前:</strong> {patientData.name}</Typography>
        <Typography><strong>年齢:</strong> {patientData.age}</Typography>
        <Typography><strong>性別:</strong> {patientData.gender}</Typography>
        <Typography><strong>住所:</strong> {patientData.address}</Typography>
      </Paper>

      {/* 妊婦記録 */}
      {patientData.pregnancyRecords && patientData.pregnancyRecords.length > 0 && (
        <Paper style={{ padding: '2rem' }}>
          <Typography variant="h5" gutterBottom>妊婦記録</Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>記録日</TableCell>
                  <TableCell>出産日</TableCell>
                  <TableCell>病院</TableCell>
                  <TableCell>先天性疾患</TableCell>
                  <TableCell>産後検診</TableCell>
                  <TableCell>備考</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {patientData.pregnancyRecords.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>{record.recordDate}</TableCell>
                    <TableCell>{record.deliveryDate}</TableCell>
                    <TableCell>{record.hospital}</TableCell>
                    <TableCell>{record.congenitalIssues}</TableCell>
                    <TableCell>{record.postpartumCheck}</TableCell>
                    <TableCell>{record.notes}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </Container>
  );
};

export default PatientDetails;
