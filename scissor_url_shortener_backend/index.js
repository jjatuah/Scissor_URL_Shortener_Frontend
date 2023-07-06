const express = require("express");
const Database = require("./dbConnect")
const urlRoute = require("./routes/url.route")
const loginRoute = require("./routes/login.route")
const registerRoute = require("./routes/register.route")
const cors = require("cors");
const cookieParser = require('cookie-parser')
require('dotenv').config();

const app = express()

const PORT = process.env.PORT || 5000


const corsOrigin ={
  origin:'*', //or whatever port your frontend is using
  credentials:true,            
  optionSuccessStatus:200
}
app.use(cors(corsOrigin));



 
// connect to database
Database.connect();

app.use(express.json());
app.use(express.urlencoded());
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))     
app.use(cookieParser()) 



app.use("/", urlRoute);
app.use("/login", loginRoute);
app.use("/register", registerRoute);


app.listen(PORT, () => {
  console.log("App Listening on PORT:", PORT);
})



module.exports = app;