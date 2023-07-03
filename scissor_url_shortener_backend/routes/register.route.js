const express = require("express");
const userModel = require("../models/users.model");
const tokenGenerator = require("../tokenGenerator");
require('dotenv').config();

const registerRoute = express.Router();

registerRoute.post("/", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const newUser = await userModel.create({
      email : email,
      password : password
    })

    const token = await tokenGenerator(newUser._id, newUser.email);

    res.status(201).json({message: "Registered", token})
  } catch (error) {
    res.status(500).send(error)
    console.log(error);
  }
})

module.exports = registerRoute; 