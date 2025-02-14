const { google } = require('googleapis');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const keyFilePath = path.join(process.cwd(), process.env.SERVICE_ACCOUNT_JSON);
console.log("Ruta de la clave de servicio:", keyFilePath);

const auth = new google.auth.GoogleAuth({
  keyFile: keyFilePath,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

const SHEETS_ID = process.env.SHEETS_ID;

const agregarUsuario = async (data) => {
  try {
    if (!Array.isArray(data)) {
      throw new Error("Los datos proporcionados no son un array válido.");
    }

    console.log("Enviando a Google Sheets:", data);

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SHEETS_ID,
      range: 'A1',
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      resource: { values: [data] },
    });

    console.log('Solicitud de equivalencia agregada correctamente:', response.data);
  } catch (error) {
    console.error('Error al agregar la solicitud de equivalencia:', error.response ? error.response.data : error);
  }
};

module.exports = { agregarUsuario };
