const db = require("../models");
const Quize = db.quize;

const Op = db.Sequelize.Op;

// Searching Logic
exports.findAll = (req, res) => {
    const quizname = req.query.quizname;
    var condition = quizname ? { quizname: { [Op.like]: `%${quizname}%` } } : null;
  
    Quize.findAll({ where: condition })
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
