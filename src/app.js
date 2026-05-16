const express = require('express');
const cors = require('cors');
const path = require('path'); // Nueva línea: ayuda a manejar rutas de carpetas
const rutasProductos = require('./routes/productos');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// NUEVO: Servir archivos estáticos desde la carpeta 'public'
// Esto permite que el navegador encuentre tu index.html y tus estilos
app.use(express.static(path.join(__dirname, '../public')));

// Rutas de la API
app.use('/api/productos', rutasProductos);

module.exports = app;