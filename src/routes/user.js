const express = require("express");
const userSchema = require("../models/users");
const bcrypt = require("bcryptjs");

const router = express.Router();

//A. Crear un Usuario
//creacion de las rutas
router.post('/users', async (req, res)=>{
  /* const newuser = new userSchema(req.body)
  return res.json(newuser.password) */
  try {
    //1 res.send("create user");
    const newuser = new userSchema(req.body)
    await newuser.validate();
    const hashedpassword = await bcrypt.hash(newuser.password, 10)

    const user = await newuser.save({
      ...newuser,
      password: hashedpassword
    })
    res.json(user)
    //creo la variable user.. ella retorna una promesa y le digo
  } catch (error) {
    res.status(400).json(error)
  }
    
   
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