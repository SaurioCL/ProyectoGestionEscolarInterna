import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import studentRoutes from './routes/students.js';

// Carga variables de entorno
dotenv.config();

// Conecta a MongoDB
connectDB();

const app = express();

// Middleware para parsear JSON
app.use(express.json());
app.use('/api/students', studentRoutes);

// Rutas de prueba
app.get('/', (req, res) => {
  res.send('¡API de Gestor Escolar Interno funcionando!');
});

// Aquí luego montarás tus rutas, por ejemplo:
// import studentRoutes from './routes/students.js';
// app.use('/api/students', studentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`)
);
