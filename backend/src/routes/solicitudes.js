const express = require('express');
const { agregarUsuario } = require('../services/googleSheets');
const { google } = require('googleapis');


const router = express.Router();

router.post('/registrar', async (req, res) => {
  try {
    const { 
      nombre, apellido, cedula, codigo, correo, 
      universidadAnterior, facultadAnterior, programaAnterior, codigoProgramaAnterior, 
      facultadActual, programaActual, codigoProgramaActual, 
      materiaNombre, materiaCodigo, materiaEquivalente, codigoMateriaEquivalente 
    } = req.body;

  if (!correo || typeof correo !== 'string' || !correo.endsWith('@correounivalle.edu.co')) {
    return res.status(403).json({ message: 'Correo no autorizado o inválido' });
  }

    const data = [
      nombre, apellido, cedula, codigo, correo, 
      universidadAnterior, facultadAnterior, programaAnterior, codigoProgramaAnterior, 
      facultadActual, programaActual, codigoProgramaActual, 
      materiaNombre, materiaCodigo, materiaEquivalente, codigoMateriaEquivalente
    ];

    console.log("Datos enviados a Google Sheets:", data);

    await agregarUsuario(data);
    res.status(200).json({ success: true, message: 'Solicitud registrada en Google Sheets' });
  } catch (error) {
    console.error('Error al agregar la solicitud de equivalencia:', error);
    res.status(500).json({ success: false, message: 'Error al registrar solicitud' });
  }
});

router.get('/ultima', async (req, res) => {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: process.env.SERVICE_ACCOUNT_JSON,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SHEETS_ID,
      range: 'A2:P2', // Asumiendo que la última solicitud siempre está en la primera fila de datos
    });

    if (!response.data.values || response.data.values.length === 0) {
      return res.status(404).json({ message: 'No hay solicitudes registradas' });
    }

    const row = response.data.values[0];
    const solicitud = {
      nombre: row[0],
      apellido: row[1],
      cedula: row[2],
      codigo: row[3],
      correo: row[4],
      universidadAnterior: row[5] || '',
      facultadAnterior: row[6] || '',
      programaAnterior: row[7] || '',
      codigoProgramaAnterior: row[8] || '',
      facultadActual: row[9],
      programaActual: row[10],
      codigoProgramaActual: row[11],
      materiaNombre: row[12],
      materiaCodigo: row[13],
      materiaEquivalente: row[14],
      codigoMateriaEquivalente: row[15],
    };

    res.json(solicitud);
  } catch (error) {
    console.error('Error al obtener la última solicitud:', error);
    res.status(500).json({ message: 'Error al recuperar la solicitud' });
  }
});

module.exports = router;
