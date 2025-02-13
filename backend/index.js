require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
require('./src/services/googleAuth'); // Cargar configuración de Passport
const authRoutes = require('./src/routes/auth');
const solicitudesRoutes = require('./src/routes/solicitudes');

const app = express();
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

// Configurar sesiones
app.use(session({
    secret: process.env.SESSION_SECRET || 'unSecretSeguroParaDesarrollo',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Cambiar a true en producción con HTTPS
  }));

// Inicializar Passport
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);
app.use('/solicitudes', solicitudesRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
