const express = require('express');
const { agregarUsuario } = require('../services/googleSheets');

const router = express.Router();

router.post('/registrar', async (req, res) => {
  const { id, email, name } = req.body;

  if (!email.endsWith('@correounivalle.edu.co')) {
    return res.status(403).json({ message: 'Correo no autorizado' });
  }

  try {
    await agregarUsuario(id, email, name);
    res.status(200).json({ success: true, message: 'Usuario registrado' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al registrar usuario' });
  }
});

module.exports = router;
