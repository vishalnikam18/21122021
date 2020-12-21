const db = require("../models");
const User = db.users;
const crypto = require('../crypto');
const Op = db.Sequelize.Op;
var hash;
var hash1;
var p;
// Create and Save a new User
exports.create = (req, res) => {
   
   if (req.body.fullname) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  User_password = req.body.password;

  //password Encryption
  encrypted_Pass = crypto.encrypt(User_password);
 

  // Create a User
  const user = {
      
    username: req.body.fullName,
    email: req.body.email,
    password : encrypted_Pass,
    roleid : 2

  };
  
  // Save User in the database
  User.create(user)
    .then(data => {
      
      res.json("Registration");
    })
    .catch(err => {
      res.json("Validation error");
    });
};