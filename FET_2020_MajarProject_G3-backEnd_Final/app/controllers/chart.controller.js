const db = require("../models");
const Quize = db.quize;

// Retrieve all Quizes from the database.
exports.findAll = (req, res) => {
   
  
    Quize.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving quizes."
        });
      });
};
