const express = require("express");
const app = express();
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const bcrypt = require("bcryptjs")
require("dotenv").config();
const User = require(`./models/User`);

const bcryptSalt = bcrypt.genSaltSync(10);

app.use(express.json());
app.use(cors({
    credentials : true,
    origin : true,
}));

mongoose.connect(process.env.MONGO_URL)

app.post('/register', async (req,res) => {
    mongoose.connect(process.env.MONGO_URL);
    const {name,email,password} = req.body;
  
    try {
      const userDoc = await User.create({
        name,
        email,
        password:bcrypt.hashSync(password, bcryptSalt),
      });
      res.json(userDoc);
    } catch (e) {
      res.status(422).json(e);
    }
  
  });

app.listen(4000,()=>{
    console.log("App Listening on port 4000")
})