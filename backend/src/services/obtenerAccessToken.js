const { google } = require("googleapis");
const dotenv = require("dotenv");

dotenv.config();

const obtenerAccessToken = async () => {
  try {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GMAIL_CLIENT_ID,
      process.env.GMAIL_CLIENT_SECRET,
      "https://developers.google.com/oauthplayground"
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.GMAIL_REFRESH_TOKEN,
    });

    const { token } = await oauth2Client.getAccessToken();
    return token;
  } catch (error) {
    console.error("Error al obtener el access token:", error);
    throw new Error("No se pudo obtener el access token");
  }
};

module.exports = obtenerAccessToken;

