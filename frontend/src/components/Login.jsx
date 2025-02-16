import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Container, Typography, Box } from '@mui/material';
import Cookies from 'js-cookie';
import { API_URL } from '../config';

const Login = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API_URL}/auth/me`, { withCredentials: true })
      .then(response => setUser(response.data.user))
      .catch(error => console.error('Error al verificar sesión:', error));
  }, []);

  const handleLogin = () => {
    window.location.href =  `${API_URL}/auth/google`;
  };

  const handleLogout = () => {
    axios.get(`${API_URL}/auth/logout`, { withCredentials: true })
      .then(() => {
        setUser(null);
        Cookies.remove('token');
      })
      .catch(error => console.error('Error al cerrar sesión:', error));
  };

  const handleContinue = () => {
    navigate('/formulario'); 
  };

  return (
    <Box 
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh', 
        backgroundColor: '#f5f5f5',
      }}
    >
      <Container maxWidth="md" 
        sx={{ 
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: '#f5f5f5', // Fondo gris suave
            borderRadius: '10px',
            padding: '40px' ,
            width: '100%',
            maxWidth: '400px',
            textAlign: 'center',
      }}
      >
        <Box 
          component="img"
          src="/frontend/public/images/header-univalle1.png"
          alt="Equivalencias Univalle"
          sx={{ width: '120%', maxWidth: '600px', marginBottom: 3 }}
        />

      {user ? (
        <>
          <Typography variant="h6">Bienvenido, {user.displayName}</Typography>
          <Button variant="contained" color="primary" onClick={handleContinue} sx={{ mt: 2 }}>
              Continuar con la solicitud
            </Button>
          <Button variant="contained" color="secondary" onClick={handleLogout} sx={{ mt: 2 }}>
            Cerrar Sesión
          </Button>
        </>
      ) : (
        <Button variant="contained" color="primary" onClick={handleLogin} >
          Iniciar sesión con Google
        </Button>
      )}
    </Container>
    </Box>
  );
};

export default Login;
