const { google } = require('googleapis');
const dotenv = require('dotenv');

dotenv.config();

const auth = new google.auth.GoogleAuth({
  keyFile: process.env.SERVICE_ACCOUNT_JSON, // Ruta al JSON de cuenta de servicio
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

const SHEETS_ID = process.env.SHEETS_ID;

const agregarUsuario = async (id, email, name) => {
  try {
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SHEETS_ID,
      range: 'Usuarios!A2:C2',
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      resource: { values: [[id, email, name]] },
    });
    console.log('Usuario agregado:', response.data);
  } catch (error) {
    console.error('Error al agregar usuario:', error);
  }
};

module.exports = { agregarUsuario };
