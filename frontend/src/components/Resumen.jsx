import { useEffect, useState } from 'react';
import { Container, Typography, Divider, Box, Paper } from '@mui/material';
import axios from 'axios';

const Resumen = () => {
  const [solicitud, setSolicitud] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/solicitudes/ultima')
      .then(response => setSolicitud(response.data))
      .catch(error => console.error('Error al obtener solicitud:', error));
  }, []);

  if (!solicitud) {
    return (
      <Container maxWidth="sm" sx={{ mt: 5, textAlign: 'center' }}>
        <Typography variant="h5" color="error">No hay solicitud registrada.</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2, backgroundColor: '#ffffff' }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
          Resumen de Solicitud de Equivalencia
        </Typography>

        <Divider sx={{ my: 2 }} />

        {/* Información Personal */}
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#000000', mt: 2 }}>
           Información Personal
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mt: 1 }}>
          <Typography><b> Nombre:</b> {solicitud.nombre} {solicitud.apellido}</Typography>
          <Typography><b> Cédula:</b> {solicitud.cedula}</Typography>
          <Typography><b> Código:</b> {solicitud.codigo}</Typography>
          <Typography><b> Correo:</b> {solicitud.correo}</Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Programa Anterior */}
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#000000', mt: 2 }}>
           Programa Anterior
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mt: 1 }}>
          <Typography><b> Universidad:</b> {solicitud.universidadAnterior || 'No aplica'}</Typography>
          <Typography><b> Facultad:</b> {solicitud.facultadAnterior || 'No aplica'}</Typography>
          <Typography><b> Programa:</b> {solicitud.programaAnterior || 'No aplica'}</Typography>
          <Typography><b> Código:</b> {solicitud.codigoProgramaAnterior || 'No aplica'}</Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Programa Actual */}
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#000000', mt: 2 }}>
           Programa Actual
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mt: 1 }}>
          <Typography><b> Facultad:</b> {solicitud.facultadActual}</Typography>
          <Typography><b> Programa:</b> {solicitud.programaActual}</Typography>
          <Typography><b> Código:</b> {solicitud.codigoProgramaActual}</Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Solicitud de Equivalencia */}
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#000000', mt: 2 }}>
           Solicitud de Equivalencia
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mt: 1 }}>
          <Typography><b> Materia:</b> {solicitud.materiaNombre}</Typography>
          <Typography><b> Código:</b> {solicitud.materiaCodigo}</Typography>
          <Typography><b> Materia Equivalente:</b> {solicitud.materiaEquivalente}</Typography>
          <Typography><b> Código Equivalente:</b> {solicitud.codigoMateriaEquivalente}</Typography>
        </Box>

      </Paper>
    </Container>
  );
};

export default Resumen;
