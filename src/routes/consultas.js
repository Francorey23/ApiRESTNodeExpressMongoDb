const express = require('express');
const router = express.Router();
const Producto = require('../models/producto');

// Encontrar todos los productos de una categoría específica
router.get('/productos/categoria/:categoriaId', async (req, res) => {
    try {
        const productos = await Producto.find({ categoria: req.params.categoriaId }).populate('categoria');
        res.json(productos);
    } catch (error) {
        res.status(500).json({ error });
    }
});

// Encontrar todos los productos junto con su categoría usando aggregate y lookup
router.get('/productos-con-categoria', async (req, res) => {
    try {
        const productos = await Producto.aggregate([
            {
                $lookup: {
                    from: 'categorias',
                    localField: 'categoria',
                    foreignField: '_id',
                    as: 'categoria_info'
                }
            }
        ]);
        res.json(productos);
    } catch (error) {
        res.status(500).json({ error });
    }
});

module.exports = router;
