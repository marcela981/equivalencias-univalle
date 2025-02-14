const express = require('express');
const passport = require('passport');

const router = express.Router();

// Iniciar autenticación con Google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Callback después de autenticación

router.get(
  '/google/callback',
  passport.authenticate('google', { 
    successRedirect: 'http://localhost:5173/formulario',
    failureRedirect: '/'
  })
);

// Verificar sesión del usuario
router.get('/me', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ user: req.user });
  } else {
    res.json({ user: null });
  }
});

// Cerrar sesión
router.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('http://localhost:5173');
  });
});

module.exports = router;
