module.exports = (app) => {
  const fav = require("../controllers/fav.controller.js");

  var router = require("express").Router();

  //Create a new Favourite
  router.post("/", fav.create);

  //Retrieve all Favourite
  router.get("/:id", fav.findAll);

  // Retrieve all published Favourite
  router.get("/favourite/:id/:qid", fav.findOne);

  // Update Favourite with id
  router.put("/:id", fav.update);

  //get all Fav
  router.get("/favourite/:id", fav.findAllFav);
  
  app.use("/api/fav", router);
};
