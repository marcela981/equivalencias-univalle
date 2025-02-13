import { Typography, Container } from '@mui/material';

const Dashboard = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Dashboard - Bienvenido
      </Typography>
      <Typography>
        Aquí puedes gestionar tus solicitudes de equivalencia.
      </Typography>
    </Container>
  );
};

export default Dashboard;
