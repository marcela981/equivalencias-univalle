import { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import axios from 'axios';

const Formulario = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    codigo: '',
    materiaOrigen: '',
    materiaDestino: '',
    argumentos: '',
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:3001/solicitudes/registrar', formData);
      alert('Solicitud enviada correctamente.');
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
      alert('Error al enviar la solicitud.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Solicitud de Equivalencia
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField label="Nombre" name="nombre" fullWidth required onChange={handleChange} />
        <TextField label="Código" name="codigo" fullWidth required onChange={handleChange} />
        <TextField label="Materia Origen" name="materiaOrigen" fullWidth required onChange={handleChange} />
        <TextField label="Materia Destino" name="materiaDestino" fullWidth required onChange={handleChange} />
        <TextField label="Argumentos" name="argumentos" fullWidth multiline rows={3} required onChange={handleChange} />
        <Button type="submit" variant="contained" color="primary">
          Enviar Solicitud
        </Button>
      </Box>
    </Container>
  );
};

export default Formulario;
