const express = require("express");
const userSchema = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await userSchema.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "password or email incorrect" });
  }
  const comparePasword = await bcrypt.compare(password, user.password);
  if (!comparePasword) {
    return res.status(400).json({ message: "password or email incorrect" });
  }
  const token = await jwt.sign(user.toObject(), process.env.SECRET_JWT, {
    expiresIn: "1h",
  });
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
