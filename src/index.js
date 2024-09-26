const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config(); //permite crear las variables de entorno
const userRoutes = require("./routes/user"); //llamar al archivo de rutas
const authRoutes = require("./routes/auth"); //llamar al archivo de rutas
const categoriaRoutes = require("./routes/categorias"); 
const productoRoutes = require("./routes/productos");
const consultasRoutes = require("./routes/consultas"); 


const app = express();
const port = process.env.PORT || 9000;
app.use('/uploads', express.static('uploads'));


//para convertir a un tipo de datos al enviar la peticion POST 1
app.use(express.json());
//3 userRoutes la paso al middelware
//aplicaciones web, para referirse a las funciones que tienen acceso al objeto de solicitud
app.use("/api", userRoutes);
app.use("/auth", authRoutes);
app.use("/api", categoriaRoutes);
app.use("/api", productoRoutes);
app.use("/api", consultasRoutes);

//1. route recibe el objeto de la peticion y el obj respuesta,
app.get("/", (req, res) => {
  res.send("Welcome to my App");
});

//2. conexion a mongo El metodo me retorna una promesa puedo verificar la conexion

mongoose

  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Conectando a MongoDB Atlas"))
  .catch((error) => console.error(error)); //verificar la conexión del servidor
//1
app.listen(port, () => console.log("server listening on port", port));
