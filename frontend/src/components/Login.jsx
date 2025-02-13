import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Container, Typography } from '@mui/material';
import Cookies from 'js-cookie';

const Login = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/auth/me', { withCredentials: true })
      .then(response => setUser(response.data.user))
      .catch(error => console.error('Error al verificar sesión:', error));
  }, []);

  const handleLogin = () => {
    window.location.href = 'http://localhost:3001/auth/google';
  };

  const handleLogout = () => {
    axios.get('http://localhost:3001/auth/logout', { withCredentials: true })
      .then(() => {
        setUser(null);
        Cookies.remove('token');
      })
      .catch(error => console.error('Error al cerrar sesión:', error));
  };

  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 10 }}>
      <Typography variant="h4" gutterBottom>
        Sistema de Equivalencias
      </Typography>
      {user ? (
        <>
          <Typography variant="h6">Bienvenido, {user.displayName}</Typography>
          <Button variant="contained" color="secondary" onClick={handleLogout} sx={{ mt: 2 }}>
            Cerrar Sesión
          </Button>
        </>
      ) : (
        <Button variant="contained" color="primary" onClick={handleLogin}>
          Iniciar sesión con Google
        </Button>
      )}
    </Container>
  );
};

export default Login;
