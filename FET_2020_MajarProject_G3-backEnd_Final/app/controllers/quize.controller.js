const db = require("../models");
const quizes = db.quize;

const Op = db.Sequelize.Op;



//insert

var allQuize;
exports.addQuize = (req, res) => {
  db.sequelize
    .query(
      "insert into quizes(id,quizname,time,count,categoryid) values (?,?,?,?,(select id from categories where category=?))",
      {
        replacements: [
          req.body.id,
          req.body.quizname,
          req.body.time,
          req.body.count,
          req.body.category,
        ],
        type: db.sequelize.QueryTypes.INSERT,
      }
    )
    .then((data) => {
      res.send(data);
      
    })
    .catch((err) => {
    res.send(err);
    });
};

exports.getCategoryName = (req, res) => {
  db.sequelize
    .query("select * from categories", { type: db.sequelize.QueryTypes.SELECT })
    .then((data) => {
      res.send(data);
      
    });
};


exports.getQuize = (req, res) => {
  const id = req.params.id;
  quizes
    .findAll({
      where: { categoryid: id },
    })
    .then((data) => {
      res.send(data);
      
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};


