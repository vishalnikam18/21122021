module.exports = (app) => {
  const quizes = require("../controllers/quize.controller");

  var router = require("express").Router();

  // Create a new Quiz
  router.post("/addQuize", quizes.addQuize);

  // Get All Categories
  router.get("/getCategoryName", quizes.getCategoryName);
  
  // Get quize By an Id
  router.get("/:id", quizes.getQuize);
  
  app.use("/api/quizes", router);
};
