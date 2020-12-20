module.exports = app => {
    const quizes = require("../controllers/search.controller.js");
  
    var router = require("express").Router();
  
    //Retrieve all Quizes
    router.get("/", quizes.findAll);
  
    app.use('/api/qz', router);
  };