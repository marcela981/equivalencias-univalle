import { useEffect, useState } from 'react';
import { Container, Typography, Card, CardContent } from '@mui/material';
import axios from 'axios';

const Resumen = () => {
  const [solicitudes, setSolicitudes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/solicitudes/todas')
      .then(response => setSolicitudes(response.data))
      .catch(error => console.error('Error al obtener solicitudes:', error));
  }, []);

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Resumen de Solicitudes
      </Typography>
      {solicitudes.map((solicitud, index) => (
        <Card key={index} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">{solicitud.nombre}</Typography>
            <Typography>Código: {solicitud.codigo}</Typography>
            <Typography>Origen: {solicitud.materiaOrigen}</Typography>
            <Typography>Destino: {solicitud.materiaDestino}</Typography>
            <Typography>Argumentos: {solicitud.argumentos}</Typography>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};

export default Resumen;
