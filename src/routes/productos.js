const express = require('express');
const router = express.Router();
const Producto = require('../models/producto');
const Categoria = require('../models/categoria');

// Crear un producto
router.post('/productos', async (req, res) => {
    try {
        const newProducto = new Producto(req.body);
        const producto = await newProducto.save();
        res.status(201).json(producto);
    } catch (error) {
        res.status(500).json({ error });
    }
});

// Obtener todos los productos
router.get('/productos', async (req, res) => {
    try {
        const productos = await Producto.find().populate('categoria');
        res.json(productos);
    } catch (error) {
        res.status(500).json({ error });
    }
});

// Obtener productos por categoría
router.get('/productos/categoria/:categoriaId', async (req, res) => {
    try {
        const productos = await Producto.find({ categoria: req.params.categoriaId }).populate('categoria');
        res.json(productos);
    } catch (error) {
        res.status(500).json({ error });
    }
});

module.exports = router;
