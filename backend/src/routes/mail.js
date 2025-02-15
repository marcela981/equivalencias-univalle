const express = require('express');
const { enviarCorreoResumen } = require('../services/googleMail');

const router = express.Router();

router.post('/enviar-correo', async (req, res) => {
    try {
        console.log("Datos recibidos en el backend:", req.body);

        const { solicitud } = req.body;

        if (!solicitud) {
            return res.status(400).json({ error: 'No se proporcionó la solicitud.' });
        }

        await enviarCorreoResumen(solicitud);
        res.status(200).json({ message: 'Correo enviado correctamente con PDF adjunto.' });
    } catch (error) {
        console.error('Error al enviar correo:', error);
        res.status(500).json({ error: 'Error al enviar el correo.' });
    }
});

module.exports = router;
