const express = require('express');
const router = express.Router();
const Users = require('../Models/Users')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');
var fetchmyuser= require("../Middleware/fetchmyuser")

//Below code createuser with validation
//Route 1 : for creating user
router.post('/createuser', [

  body('Email', "Please Enter valid Email").isEmail(),
  body('Name', "Please Enter valid Name").isLength({ min: 5 }),
  body('Password', "Please provide min 8 characters").isLength({ min: 8 }),

], async function (req, res) {
  //if there is error while validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  //if user already exist
  let ifexist = await Users.findOne({ Email: req.body.Email })
  if (ifexist) {
    return res.status(500).json({ error: "Sorry user already exist" })
  }
  //creating user below

  const salt = await bcrypt.genSalt(10)
  const becpass = await bcrypt.hash(req.body.Password, salt)
  user = await Users.create({
    Name: req.body.Name,
    Email: req.body.Email,
    Password: becpass,
  })
  // .then(user => res.json(user))
  // .catch(err=>{console.log(err)
  // res.json({error:"Please provide a unique value"})
  // })
  const JWT_Secret = "Thisissecret5435"
  const data = {
    user: {
      id: user.id
    }
  }

  const authToken = jwt.sign(data, JWT_Secret)
  res.json({ authToken })
})


//authenticate a user endpoint, Basically this is login part
//Route 2: for authenticating A User
router.post('/login', [

  body('Email', "Please Enter valid Email").isEmail(),
  body('Password', "Password cannot be blank").exists(),

], async function (req, res) {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {Email,Password}=req.body
  try {
    let user=await Users.findOne({Email})
    if(!user){
      return response.status(500).json("Please provide correct credentials")
    }

    const matchpass= await bcrypt.compare(Password,user.Password)
    if(!matchpass){
      return response.status(500).json("Please provide correct credentials")
    }

    const data = {
      user: {
        id: user.id
      }
    }
  
    const JWT_Secret = "Thisissecret5435"
    const authToken = jwt.sign(data, JWT_Secret)
    res.json({ authToken })
  


  } catch (error) { 
    console.error(error.message);
    res.status(500).send("There occured some issue!!")
  }

})

//Route 3 : Get a Logged in User detail /getuser login required

router.post('/getuser', fetchmyuser ,async function (req, res) {

try{
  userID=req.user.id;
  const user=await Users.findById(userID).select('-Password')
  res.send(user)
} catch (error) {   
  console.error(error.message);
  res.status(500).send("There occured some issue!!")
}
})




module.exports = router


