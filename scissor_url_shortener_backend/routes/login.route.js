const express = require("express");
const bcrypt = require("bcryptjs")
const userModel = require("../models/users.model");
const tokenGenerator = require("../tokenGenerator");
require('dotenv').config();

const loginRoute = express.Router();

loginRoute.post("/", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    //Find User if they exist
    const user = await userModel.findOne({email : email})

    if (user) {
      //verify password
      const isMatch = await bcrypt.compare(password, user.password)

      if (isMatch) {
        //Generate token
        const token = await tokenGenerator(user._id, user.email);

        res.status(200).json({message: "Logged in", token})
      } else {
        res.status(400).send("Invalid Password")
      }
    } else {
      res.status(400).send("Invalid Email")
    }
  } catch (error) {
    res.status(400).send("Unexpected error occurred");
    console.log(error)
  }
})

module.exports = loginRoute; 