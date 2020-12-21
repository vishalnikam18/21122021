const db = require("../models");
const User = db.users;
const crypto = require('../crypto');
const jwt = require('jsonwebtoken');


let secret = 'some_secret';
var decodedData = "";
var users;
var token;


//Check Email and Password
exports.check = (req, res) => {
  
  // Create a loginData object
  const loginData = {
       email: req.body.email,
       password : req.body.password
  };

  //Fetching all user details from Database
 this.users= db.sequelize.query("SELECT * FROM `users`",{
    model: db.users,
    mapToModel: true
}).then((data)=>{
    this.count = data.length;

    for (let index = 0; index < data.length; index++) 
{
    decryptPassword = crypto.decrypt(data[index].password);
  

    if(data[index].email==loginData.email && decryptPassword==loginData.password)
    {
      //Creating payload for Token
        var userData = 
        {
            "name": data[index].username,
            "id": data[index].id,
            "email": data[index].email,
            "roleid" : data[index].roleid,
        }
        //Token Creation
        token = jwt.sign(userData,secret, {expiresIn: '3h'});
        console.log("token sended = ",token);
        res.status(200).send({token});
        break;
    }
   
    
}    
if(index > data.length)
{
    
    res.status(404).send("Email or password is incorrect.")
}
}).catch(err => {
    res.status(500).send({
      message:
     err.message || "Email or password is incorrect ."
    });
  });

};


//Verifying the Token and sending back payload to Frontend
exports.verifyToken = (req,res,next) =>
{
  let token1 = req.query.token;
  jwt.verify(token1,secret,(err,tokendata)=>{
    if(err)
    {
      return res.status(400).send("Invalid Request")
    }
    if(tokendata)
    {
      decodedData = tokendata;
      return res.status(200).send(decodedData);
    }
  })
};

//CheckEmail
exports.checkEmail = (req,res)=>{
  console.log(req);
  let e_Email = req.params.mailId;
  console.log(e_Email)
  User.findOne({
    where: {
      email : e_Email
    }
  }) .then((data) => {
    console.log(data);
    if(data==null)
    {
      res.json("EmailID not Exists");
    }
    res.json("Email Exists");
    
  }) 
  .catch((err) => {
    res.json("EmailID not Exists");
  });
}

//Update Password.
exports.updatepassword = (req,res)=>{
    
    const p = req.body.password;
    const passwordEncrypt = crypto.encrypt(p);
    const email = req.body.email;
        User.update(
        { password : passwordEncrypt },
        {  where: {email:email}}
        
        ).then((changed_data, rowsupdated) =>{
          res.json(rowsupdated)
        })
        .catch((error) => {
            res.status(500).send({
              message: "Error updating password"
            });
       });
    
    
}