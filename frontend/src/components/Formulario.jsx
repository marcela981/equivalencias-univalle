import { useState} from 'react';
import { Container, TextField, Button, Typography, Stepper, Step, StepLabel, Box, CircularProgress  } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const steps = ['Información Personal', 'Programa Anterior', 'Plan Actual', 'Solicitud de Equivalencia'];

const fieldGroups = [
  ['nombre', 'apellido', 'cedula', 'codigo', 'correo'],
  ['universidadAnterior', 'facultadAnterior', 'programaAnterior', 'codigoProgramaAnterior'],
  ['facultadActual', 'programaActual', 'codigoProgramaActual'],
  ['materiaNombre', 'materiaCodigo', 'materiaEquivalente', 'codigoMateriaEquivalente']
];

const fieldLabels = {
  nombre: "Nombre",
  apellido: "Apellido",
  cedula: "Cédula",
  codigo: "Código",
  correo: "Correo",
  universidadAnterior: "Universidad Anterior",
  facultadAnterior: "Facultad Anterior",
  programaAnterior: "Programa Anterior",
  codigoProgramaAnterior: "Código del Programa Anterior",
  facultadActual: "Facultad Actual",
  programaActual: "Programa Actual",
  codigoProgramaActual: "Código del Programa Actual",
  materiaNombre: "Nombre de la Materia",
  materiaCodigo: "Código de la Materia",
  materiaEquivalente: "Materia Equivalente",
  codigoMateriaEquivalente: "Código de la Materia Equivalente"
};

const Formulario = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem('equivalenciasForm');
    return savedData ? JSON.parse(savedData) :  Object.fromEntries(
      Object.keys(fieldLabels).map(key => [key, ''])
    );
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (['cedula', 'codigo', 'codigoProgramaAnterior', 'codigoProgramaActual'].includes(name)) {
      if (!/^\d*$/.test(value)) return; // Solo números
    }
    if (['materiaCodigo', 'codigoMateriaEquivalente'].includes(name)) {
      if (!/^[a-zA-Z0-9]*$/.test(value)) return; // Solo alfanuméricos
    }

    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);
    localStorage.setItem('equivalenciasForm', JSON.stringify(newFormData));
  };

  const isStepValid = () => {
    return fieldGroups[activeStep].every(field => formData[field].trim() !== '');
  };

  const handleNext = () => {
    if (isStepValid()) {
      setActiveStep((prevStep) => prevStep + 1);
    } else {
      alert('Por favor, completa todos los campos antes de continuar.');
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleFinalizar = async () => {
    setLoading(true); 
    try {
      localStorage.setItem('ultimaSolicitud', JSON.stringify(formData));
  
      await axios.post('http://localhost:3001/solicitudes/registrar', formData);
  
      localStorage.removeItem('equivalenciasForm'); 
      alert('Solicitud enviada correctamente.');
  
      navigate('/resumen');
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
      alert('Error al enviar la solicitud.');
    } finally {
      setLoading(false); 
    }
  };


  return (
    <Box 
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
        padding: 0,
      }}
    >
      <Container 
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: '#ffffff',
          padding: 4,
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          width: '100%',
          maxWidth: '800px',
          borderRadius: '10px',
        }}
      >
        <img src="/frontend/public/images/header-univalle1.png" alt="Logo" style={{ width: '330px', marginBottom: '-11%' }} />        

        <Typography variant="h4" gutterBottom align="center">
          EQUIVALENCIAS - FACULTAD DE SALUD
        </Typography>

        <Stepper 
        activeStep={activeStep} 
        alternativeLabel 
        sx={{ 
          mb: 3, width: '100%',
            '& .MuiStepIcon-root': {
              color: 'gray',
            },
            '& .Mui-active .MuiStepIcon-root': {
              color: '#ea0101 !important',
            },
            '& .MuiStepLabel-label': {
              fontWeight: 'bold',
            }
          }}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
          {fieldGroups[activeStep].map((field) => (
            <TextField 
              key={field}
              label={fieldLabels[field]} 
              name={field} 
              fullWidth 
              required 
              value={formData[field]}
              onChange={handleChange}
            />
          ))}
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mt: 3 }}>
          {activeStep > 0 && <Button variant="contained" onClick={handleBack} sx={{backgroundColor: '#d20000'}}>Atrás</Button>}
          {activeStep < steps.length - 1 ? (
            <Button variant="contained" color="primary" onClick={handleNext} sx={{backgroundColor: '#d20000'}}>Siguiente</Button>
          ) : (
            <Button variant="contained" color="success" onClick={handleFinalizar} disabled={loading} >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'FINALIZAR Y ENVIAR'}
            </Button>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Formulario;
