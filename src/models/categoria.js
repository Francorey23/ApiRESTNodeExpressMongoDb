const mongoose = require('mongoose');

const categoriaSchema = mongoose.Schema({
    id:{
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    icono:{
        type: String,
        required: false,
    }
});

module.exports = mongoose.model('Categoria', categoriaSchema);
