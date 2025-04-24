import fs from 'fs';
import path from 'path';
import PDFDocument from 'pdfkit';
import Certificate from '../models/Certificate.js';
import Student from '../models/Student.js';

// Crear un certificado en PDF y guardarlo
export const createCertificate = async (req, res) => {
  try {
    const { studentId, type, data } = req.body;
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Estudiante no encontrado' });
    }

    // Directorio de destino
    const uploadsDir = path.join(process.cwd(), 'uploads', 'certificates');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Nombre de archivo
    const filename = `${Date.now()}_${studentId}_${type}.pdf`;
    const filePath = path.join(uploadsDir, filename);

    // Generar PDF
    const doc = new PDFDocument({ size: 'A4', margin: 50 });
    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    // Encabezado
    doc.fontSize(18).text('Certificado Escolar', { align: 'center' });
    doc.moveDown();

    // Datos del estudiante
    doc.fontSize(12).text(`Nombre: ${student.nombres} ${student.apellidos}`);
    doc.text(`RUT/IPE: ${student.runIpe}`);
    doc.text(`Curso: ${student.curso}`);
    doc.text(`Tipo de Certificado: ${type}`);
    doc.text(
      `Fecha de Emisión: ${data.fechaEmision || new Date().toLocaleDateString()}`
    );
    if (data.detalle) {
      doc.moveDown();
      doc.text(`Detalle: ${data.detalle}`);
    }

    // Pie de página
    doc.moveDown();
    doc.text('__________________________', { align: 'right' });
    doc.text('Firma Autoridad', { align: 'right' });

    // Finalizar documento
    doc.end();

    // Esperar a que se guarde
    stream.on('finish', async () => {
      const certificate = await Certificate.create({
        student: studentId,
        type,
        data,
        filePath,
      });
      res.status(201).json(certificate);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Obtener todos los certificados, opcionalmente filtrando por estudiante
export const getCertificates = async (req, res) => {
  try {
    const filter = {};
    if (req.query.student) {
      filter.student = req.query.student;
    }
    const certificates = await Certificate.find(filter).populate('student');
    res.json(certificates);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Descargar el archivo PDF del certificado
export const downloadCertificate = async (req, res) => {
  try {
    const cert = await Certificate.findById(req.params.id);
    if (!cert) {
      return res.status(404).json({ message: 'Certificado no encontrado' });
    }
    const file = cert.filePath;
    res.download(file);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
