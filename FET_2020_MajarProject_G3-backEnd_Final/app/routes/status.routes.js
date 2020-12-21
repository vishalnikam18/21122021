module.exports = (app) => {
  const status = require("../controllers/status.controller");

  var router = require("express").Router();

  //Create a new Favurite
  router.post("/", status.create);

  //Retrieve all Favourite
  router.get("/allque/:id", status.findAll);

  // Delete all Favourite
   router.delete("/:qId/:uId", status.deleteAll);
   
   //update status
  router.put("/", status.update);
   
  //get staus by userId and quizeId
  router.get("/:uid/:qid", status.findOne);

  app.use("/api/status", router);
};
