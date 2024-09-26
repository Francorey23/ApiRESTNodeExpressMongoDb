const express = require('express');
const router = express.Router();
const Categoria = require('../models/categoria');

// Crear una categoría
router.post('/categorias', async (req, res) => {
    try {
        const newCategoria = new Categoria(req.body);
        const categoria = await newCategoria.save();
        res.status(201).json(categoria);
    } catch (error) {
        res.status(500).json({ error });
    }
});

// Obtener todas las categorías
router.get('/categorias', async (req, res) => {
    try {
        const categorias = await Categoria.find();
        res.json(categorias);
    } catch (error) {
        res.status(500).json({ error });
    }
});

// delete a categoria
router.delete("/categorias/:id", (req, res) => {
    const { id } = req.params;
    Categoria
      .findByIdAndDelete({ _id: id })
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  });
  

  
  // update a categoria
  router.put("/categorias/:id", (req, res) => {
    const { id } = req.params;
    const { nombre, icono } = req.body;
    userSchema
      .updateOne({ _id: id }, { $set: { nombre, icono } })
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  });

module.exports = router;
