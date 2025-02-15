import { useEffect, useState } from 'react';
import { Container, Typography, Divider, Box, Paper, Button } from '@mui/material';
import { jsPDF } from 'jspdf';
import axios from 'axios';

const Resumen = () => {
  const [solicitud, setSolicitud] = useState(null);

  useEffect(() => {
    const datosGuardados = localStorage.getItem('ultimaSolicitud');
    if (datosGuardados) {
      setSolicitud(JSON.parse(datosGuardados));
    }
  }, []);

  const generarPDF = () => {
    if (!solicitud) return;

    const doc = new jsPDF();
    doc.setFont("Georgia", "bold");
    doc.text("Resumen de Solicitud de Equivalencia", 20, 20);
    
    let y = 30;
    const agregarTexto = (titulo, valor) => {
      doc.setFont("Georgia", "bold");
      doc.text(`${titulo}:`, 20, y);
      doc.setFont("Georgia", "normal");
      doc.text(valor || "No aplica", 80, y);
      y += 10;
    };

    agregarTexto("Nombre", `${solicitud.nombre} ${solicitud.apellido}`);
    agregarTexto("Cédula", solicitud.cedula);
    agregarTexto("Código", solicitud.codigo);
    agregarTexto("Correo", solicitud.correo);
    y += 5;
    
    doc.setFont("Georgia", "bold");
    doc.text("Programa Anterior", 20, y);
    y += 10;
    agregarTexto("Universidad", solicitud.universidadAnterior);
    agregarTexto("Facultad", solicitud.facultadAnterior);
    agregarTexto("Programa", solicitud.programaAnterior);
    agregarTexto("Código", solicitud.codigoProgramaAnterior);
    y += 5;

    doc.setFont("Georgia", "bold");
    doc.text("Programa Actual", 20, y);
    y += 10;
    agregarTexto("Facultad", solicitud.facultadActual);
    agregarTexto("Programa", solicitud.programaActual);
    agregarTexto("Código", solicitud.codigoProgramaActual);
    y += 5;

    doc.setFont("Georgia", "bold");
    doc.text("Solicitud de Equivalencia", 20, y);
    y += 10;
    agregarTexto("Materia", solicitud.materiaNombre);
    agregarTexto("Código", solicitud.materiaCodigo);
    agregarTexto("Materia Equivalente", solicitud.materiaEquivalente);
    agregarTexto("Código Equivalente", solicitud.codigoMateriaEquivalente);

    doc.save("Resumen_Equivalencia.pdf");
  };

  const enviarCorreo = async () => {
    if (!solicitud) return;

    try {
      await axios.post('http://localhost:3001/enviar-correo', { solicitud }, { withCredentials: true });
      alert("El resumen se ha enviado correctamente al correo.");
    } catch (error) {
      console.error("Error al enviar el correo:", error);
      alert("Hubo un error al enviar el correo.");
    }
  };

  if (!solicitud) {
    return (
      <Container maxWidth="sm" sx={{ mt: 5, textAlign: 'center' }}>
        <Typography variant="h5" color="error">No hay solicitud registrada.</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2, backgroundColor: '#ffffff' }}>

        <img src="../../public/images/header-univalle1.png" alt="Logo" style={{ width: '240px', marginBottom: '-5%' , marginLeft:'35%'}} />

        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
          Resumen de Solicitud de Equivalencia
        </Typography>

        <Divider sx={{ my: 2 }} />

        {/* Información Personal */}
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#000000', mt: 2 }}>
           Información Personal
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mt: 1 }}>
          <Typography><b> Nombre:</b> {solicitud.nombre} {solicitud.apellido}</Typography>
          <Typography><b> Cédula:</b> {solicitud.cedula}</Typography>
          <Typography><b> Código:</b> {solicitud.codigo}</Typography>
          <Typography><b> Correo:</b> {solicitud.correo}</Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Programa Anterior */}
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#000000', mt: 2 }}>
           Programa Anterior
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mt: 1 }}>
          <Typography><b> Universidad:</b> {solicitud.universidadAnterior || 'No aplica'}</Typography>
          <Typography><b> Facultad:</b> {solicitud.facultadAnterior || 'No aplica'}</Typography>
          <Typography><b> Programa:</b> {solicitud.programaAnterior || 'No aplica'}</Typography>
          <Typography><b> Código:</b> {solicitud.codigoProgramaAnterior || 'No aplica'}</Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Programa Actual */}
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#000000', mt: 2 }}>
           Programa Actual
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mt: 1 }}>
          <Typography><b> Facultad:</b> {solicitud.facultadActual}</Typography>
          <Typography><b> Programa:</b> {solicitud.programaActual}</Typography>
          <Typography><b> Código:</b> {solicitud.codigoProgramaActual}</Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Solicitud de Equivalencia */}
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#000000', mt: 2 }}>
           Solicitud de Equivalencia
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mt: 1 }}>
          <Typography><b> Materia:</b> {solicitud.materiaNombre}</Typography>
          <Typography><b> Código:</b> {solicitud.materiaCodigo}</Typography>
          <Typography><b> Materia Equivalente:</b> {solicitud.materiaEquivalente}</Typography>
          <Typography><b> Código Equivalente:</b> {solicitud.codigoMateriaEquivalente}</Typography>
        </Box>
        
        <Divider sx={{ my: 3 }} />

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button variant="contained" color="primary" onClick={generarPDF}>
            Descargar en PDF
          </Button>
          <Button variant="contained" color="secondary" onClick={enviarCorreo}>
            Enviar al Correo
          </Button>
        </Box>

      </Paper>
    </Container>
  );
};

export default Resumen;
