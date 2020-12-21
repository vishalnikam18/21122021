module.exports = app => {
    const users = require("../controllers/user.controller.js");
    const login = require("../controllers/login.controller.js");
    var router = require("express").Router();
    var jwt =require('jsonwebtoken');
    
    // User Registration Route
    router.post("/", users.create);

    //login Check Route
    router.post("/login",login.check);
  
    //Token Checking Route
    router.get('/userData',login.verifyToken);
    
   //Update Password Route
    router.post('/password',login.updatepassword);
 
    //Check Email Exist or not
    router.get("/emailCheck/:mailId", login.checkEmail);
    
    app.use('/api/user', router);
  };