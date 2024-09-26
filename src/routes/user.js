const express = require("express");
const userSchema = require("../models/users");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const path = require("path");

const router = express.Router();

// Configuración de Multer para almacenar las imágenes en la carpeta /uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');  // Ruta donde se almacenarán las imágenes
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));  // Genera un nombre único para la imagen
  }
});

const upload = multer({ storage: storage });

// Ruta para crear un usuario con una imagen
router.post('/users', upload.single('image'), async (req, res) => {
  try {
    // Verifica que haya un archivo cargado
    if (!req.file) {
      return res.status(400).json({ error: 'No se ha cargado ninguna imagen' });
    }

    // Hasheamos la contraseña del usuario
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Crear un nuevo usuario con los datos recibidos
    const newUser = new userSchema({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      imageUrl: req.file.path // Guarda la ruta del archivo en la base de datos
    });

    // Guardar el nuevo usuario en la base de datos
    const user = await newUser.save();
    res.status(201).json(user); // Respuesta al cliente
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el usuario' });
  }
});


module.exports = router;
