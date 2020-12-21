module.exports = (app) => {
  const mail = require("../controllers/mailnoder.controller.js");

  var router = require("express").Router();

  //Send a mail
  router.post("/", mail.mailsender);

  app.use("/api/mailsend", router);
};
