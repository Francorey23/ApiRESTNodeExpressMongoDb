const express = require("express");
const userSchema = require("../models/users");
const bcrypt = require("bcryptjs");

const router = express.Router();

//A. Crear un Usuario
//creacion de las rutas
router.post("/users", async (req, res) => {
  try {
    // inicializamos el validate para el request si no estan todos los campos del modelo da un error 
    await userSchema.validate(req.body);
    // encriptamos la contraseña que enviamo en el body de la peticion 
    const hashedpassword = await bcrypt.hash(req.body.password, 10);
    //creamos una instancia del modelo de la base de datos para primero poder agregar los valores necesarios 
    const newuser = new userSchema({ ...req.body, password: hashedpassword });
    // guardamos en la base de datos todos los campos por medio de la instacion de la linea 16
    const user = await newuser.save();
    // respuesta de la api 
    res.json(user);
  } catch (error) {
    //si te nemos un error ya sea en el guardado de la linea 18 o el calidated de la linea 12
    res.status(400).json(error);
  }
}); //para que funcione las debemos llamar en el archivo y la ruta del servidor

//B. Recuperar todos los usuarios
//creacion de las rutas
router.get("/users", (req, res) => {
  userSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// C. Obtener un usuario especifio
router.get("/users/:id", (req, res) => {
  const { id } = req.params;
  userSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// delete a user
router.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  userSchema
    .remove({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// update a user
router.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, age, email } = req.body;
  userSchema
    .updateOne({ _id: id }, { $set: { name, age, email } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//exportar router
module.exports = router;
