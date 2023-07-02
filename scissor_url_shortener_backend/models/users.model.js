const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")


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


module.exports = mongoose.model("Users", userSchema);