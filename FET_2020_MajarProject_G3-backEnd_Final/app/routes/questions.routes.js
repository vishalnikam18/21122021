module.exports = app => {
    const questions = require("../controllers/questions.controller");
  
    var router = require("express").Router();
  
    // Create a new Question
    
    router.post('/addQuestion', questions.addQuestion);
    

    //Retrieve  Question with quizName
    router.get("/getQuizName", questions.getQuizName);
    
    //Get Type of Question
    router.get("/getTypeName", questions.getTypeName);

    //Retrieve all Questions
    router.get("/", questions.findAll);
  
    app.use('/api/questions', router);
  };