const db = require("../models/index");
const categoryy = db.category;

const Op = db.Sequelize.Op;


exports.findAll = (req, res) => {
  const category = req.query.category;
  var condition = category
    ? { category: { [Op.like]: `%${category}%` } }
    : null;

  categoryy
    .findAll({ where: condition })
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
