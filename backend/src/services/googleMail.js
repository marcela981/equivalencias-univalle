const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");
const { generatePDF } = require("../utils/generatePDF");
const obtenerAccessToken = require("./obtenerAccessToken");

dotenv.config();

const enviarCorreoResumen = async (solicitud) => {
  try {
    if (!solicitud) {
      throw new Error("No se proporcionó la solicitud.");
    }

    console.log("Solicitud recibida para enviar email:", solicitud);

    const { nombre, apellido, correo } = solicitud;

    if (!nombre || !apellido || !correo) {
      throw new Error("Faltan datos necesarios en la solicitud.");
    }

    const pdfPath = path.join(__dirname, "..", "temp", "solicitud_equivalencia.pdf");

    await generatePDF(solicitud, pdfPath);
    console.log("PDF generado correctamente en:", pdfPath);

    // Obtener el token de acceso
    const accessToken = await obtenerAccessToken();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.GMAIL_USER,
        clientId: process.env.GMAIL_CLIENT_ID,
        clientSecret: process.env.GMAIL_CLIENT_SECRET,
        refreshToken: process.env.GMAIL_REFRESH_TOKEN,
        accessToken: accessToken, 
      },
    });

    const mensaje = `
Hola ${nombre} ${apellido},

Aquí tienes el resumen de tu solicitud de equivalencia.
Adjunto encontrarás el resumen de tu solicitud de equivalencia en formato PDF.

INFORMACIÓN PERSONAL
- Cédula: ${solicitud.cedula}
- Código: ${solicitud.codigo}
- Correo: ${solicitud.correo}

PROGRAMA ANTERIOR
- Universidad: ${solicitud.universidadAnterior || 'No aplica'}
- Facultad: ${solicitud.facultadAnterior || 'No aplica'}
- Programa: ${solicitud.programaAnterior || 'No aplica'}
- Código: ${solicitud.codigoProgramaAnterior || 'No aplica'}

PROGRAMA ACTUAL
- Facultad: ${solicitud.facultadActual}
- Programa: ${solicitud.programaActual}
- Código: ${solicitud.codigoProgramaActual}

SOLICITUD DE EQUIVALENCIA
- Materia: ${solicitud.materiaNombre}
- Código: ${solicitud.materiaCodigo}
- Materia Equivalente: ${solicitud.materiaEquivalente}
- Código Equivalente: ${solicitud.codigoMateriaEquivalente}

Si tienes alguna pregunta, no dudes en contactarnos.

Saludos,
Universidad del Valle
`;

    const mailOptions = {
      from: `"Sistema de Equivalencias" <${process.env.GMAIL_USER}>`,
      to: correo,
      subject: "Resumen de tu solicitud de equivalencia",
      text: mensaje,
      attachments: [
        {
          filename: "Resumen_Equivalencia.pdf",
          path: pdfPath,
          contentType: "application/pdf",
        },
      ],
    };

    const result = await transporter.sendMail(mailOptions);
    console.log("Correo enviado correctamente:", result.response);

    fs.unlinkSync(pdfPath);
    console.log("PDF eliminado después del envío.");

    return { success: true, message: "Correo enviado correctamente." };
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    throw new Error("Error al enviar el correo."+ error.message);
  }
};

module.exports = { enviarCorreoResumen };
