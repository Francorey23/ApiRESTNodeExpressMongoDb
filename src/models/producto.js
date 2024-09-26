const mongoose = require('mongoose');

const productoSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    categoria: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    }
});

module.exports = mongoose.model('Producto', productoSchema);
