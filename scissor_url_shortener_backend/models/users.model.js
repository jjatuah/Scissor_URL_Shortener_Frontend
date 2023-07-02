const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require('dotenv').config();

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  }
})

//Password Hash
userSchema.pre("save", async function(next){
  if(this.isModified("password")){
    this.password = bcrypt.hashSync(this.password, 10);

    next()
  }
})

//Generate tokens 
// userSchema.methods.generateToken = async function(){
//   try {
//     let generatedToken = jwt.sign({_id : this._id, email: this.email}, process.env.SECRET_KEY);
//     return generatedToken
//   } catch (error) {
//     console.log(error);
//   }
// }

module.exports = mongoose.model("Users", userSchema);