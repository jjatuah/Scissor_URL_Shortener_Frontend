const express = require("express");
const userModel = require("../models/users.model");
require('dotenv').config();

const registerRoute = express.Router();

registerRoute.post("/", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const newUser = new userModel.create({
      email : email,
      password : password
    })

    console.log(newUser);
    res.status(200).send("Registered")
  } catch (error) {
    res.status(400)
    console.log(error).send(error);
  }
})

module.exports = registerRoute; 