const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productos');

router.get('/', productosController.obtenerTodos);
router.get('/:id', productosController.obtenerPorId);
router.post('/', productosController.crear);

module.exports = router;
