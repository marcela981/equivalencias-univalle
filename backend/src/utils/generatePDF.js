const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const generatePDF = async (solicitud, filePath) => {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument();
        const stream = fs.createWriteStream(filePath);

        doc.pipe(stream);

        doc.fontSize(18).text("Resumen de Solicitud de Equivalencia", { align: "center" });
        doc.moveDown();

        const agregarTexto = (titulo, valor) => {
            doc.font("Helvetica-Bold").text(`${titulo}:`, { continued: true });
            doc.font("Helvetica").text(` ${valor || "No aplica"}`);
            doc.moveDown();
        };

        //Información Personal
        agregarTexto("Nombre", `${solicitud.nombre} ${solicitud.apellido}`);
        agregarTexto("Cédula", solicitud.cedula);
        agregarTexto("Código", solicitud.codigo);
        agregarTexto("Correo", solicitud.correo);

        //Programa Anterior
        doc.moveDown().fontSize(16).text("Programa Anterior", { underline: true });
        agregarTexto("Universidad", solicitud.universidadAnterior);
        agregarTexto("Facultad", solicitud.facultadAnterior);
        agregarTexto("Programa", solicitud.programaAnterior);
        agregarTexto("Código", solicitud.codigoProgramaAnterior);

        //Programa Actual
        doc.moveDown().fontSize(16).text("Programa Actual", { underline: true });
        agregarTexto("Facultad", solicitud.facultadActual);
        agregarTexto("Programa", solicitud.programaActual);
        agregarTexto("Código", solicitud.codigoProgramaActual);

        //Solicitud de Equivalencia
        doc.moveDown().fontSize(16).text("Solicitud de Equivalencia", { underline: true });
        agregarTexto("Materia", solicitud.materiaNombre);
        agregarTexto("Código", solicitud.materiaCodigo);
        agregarTexto("Materia Equivalente", solicitud.materiaEquivalente);
        agregarTexto("Código Equivalente", solicitud.codigoMateriaEquivalente);

        doc.end();

        stream.on("finish", resolve);
        stream.on("error", reject);
    });
};

module.exports = { generatePDF };
