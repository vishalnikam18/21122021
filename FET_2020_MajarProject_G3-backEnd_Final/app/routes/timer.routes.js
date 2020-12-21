module.exports = (app) => {
  const que = require("../controllers/timer.controller.js");

  var router = require("express").Router();

  //Retrieve timing
  router.get("/:id", que.findOne);
  
  app.use("/api/timer", router);
};
