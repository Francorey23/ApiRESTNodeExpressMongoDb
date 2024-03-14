const express = require("express");
const userSchema = require("../models/users");
const bcrypt = require("bcryptjs");

const router = express.Router();

//A. Crear un Usuario
//creacion de las rutas
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await userSchema.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "password or email incorrect" });
  }
  

  try {
    res.json({ user });
  } catch (error) {
    //si te nemos un error ya sea en el guardado de la linea 18 o el calidated de la linea 12
    res.status(400).json(error);
  }
}); //para que funcione las debemos llamar en el archivo y la ruta del servidor

//exportar router
module.exports = router;
