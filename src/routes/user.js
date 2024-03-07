const express = require("express");
const userSchema = require("../models/users");


const router = express.Router();

//A. Crear un Usuario
//creacion de las rutas
router.post('/users', (req, res)=>{
    //1 res.send("create user");

    const user = userSchema(req.body);
    //creo la variable user.. ella retorna una promesa y le digo
    user
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}));
});//para que funcione las debemos llamar en el archivo y la ruta del servidor

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