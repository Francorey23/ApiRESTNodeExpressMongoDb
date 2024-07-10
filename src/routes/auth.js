const express = require("express");
const userSchema = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();
//req tiene la informacion del envio cabecera(token...)
//res forma de dar la respuesta o contestar
router.post("/login", async (req, res) => {
//Desestructuracion para obtener los datos el Json de la peticion
  const { email, password } = req.body;
  console.log(email,password);
  //Usar el modelo con la funcion FindOne(encontrar por email)
  //con una consulta
  const user = await userSchema.findOne({ email });
  //se valida si el usuario de la consulta existe o No
  if (!user) {
    return res.status(400).json({ message: "password or email incorrect" });
  }
  //Se compara la contraseña normal con la almacenada en la BD
  const comparePasword = await bcrypt.compare(password, user.password);
  //valida si la contraseña es correcta o No
  if (!comparePasword) {
    return res.status(400).json({ message: "password or email incorrect" });
  }
  //utilizamos la funcion Json webToken para generar un token con los 
  //datos de nuestro usuario 
  const token = await jwt.sign(user.toObject(), process.env.SECRET_JWT, {
    expiresIn: "1h",
  });
  //con la funcion response (res) estamos retornando el token y un Json con un msj
  return res.json({ message: "login sussefully", token });
});

router.post("/verifyToken", async (req, res) => {
  jwt.verify(req.body.token, process.env.SECRET_JWT,(err,decoded)=>{
    if (err) {
      return res.json({ message: "login sussefully", token });    
    }else{
      return res.json({decoded});
    }
  })
  
 
});


module.exports = router;
