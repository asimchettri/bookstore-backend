const express = require("express");
const router = express.Router();
const User = require("./user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');


//importing jwt
const JWT_SECRET = process.env.JWT_SECRET_KEY;

router.post("/admin", async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await User.findOne({ username });
    if (!admin) {
     return res.status(404).send({ message: "Admin not found" });
    }
    if(admin.password !== password){
        res.status(401).send({message:"Invalid password"})
    }

    //jwt
    const token = jwt.sign(
      { id: admin._id, username: admin.username, role: admin.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
    return res.status(200).json({
      message: "Authentication sucessful",
      token: token,
      user: {
        username: admin.username,
        role: admin.role,
      },
    });
  } catch(error){
    console.log("Failed to login in as admin", error);
    res.status(401).send({ message: "failed to login as admin" });
  }
  console.log('JWT_SECRET:', JWT_SECRET);

});

module.exports = router;
