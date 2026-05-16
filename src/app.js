const express = require('express');
const app = express();

app.use(express.json());

const productosRoutes = require('./routes/productos');
app.use('/api/productos', productosRoutes);

module.exports = app;

// Cambios realizados por Samuel Molina - Actividad Clase Mayo