require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');

require('./src/services/googleAuth');

const authRoutes = require('./src/routes/auth');
const solicitudesRoutes = require('./src/routes/solicitudes');
const mailRoutes = require('./src/routes/mail');

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173', credentials: true }));
app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET || 'unSecretSeguroParaDesarrollo',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Cambiar a true en producción con HTTPS
  }));

app.use(passport.initialize());
app.use(passport.session());

console.log(process.env.GMAIL_USER);
console.log('GMAIL_REFRESH_TOKEN:', process.env.GMAIL_REFRESH_TOKEN);

app.use('/api/auth', authRoutes);
app.use('/api/solicitudes', solicitudesRoutes);
app.use('/api/mail', mailRoutes);

/*const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});*/

module.exports = app;