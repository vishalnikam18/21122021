const db = require("../models");
const que=db.quize;


//Timer Logic
exports.findOne = (req, res) => {
    const id = req.params.id;
    que.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Tutorial with id=" + id
        });
      });
};
