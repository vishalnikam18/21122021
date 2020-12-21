const db = require("../models");
const { favourite } = require("../models");
const Favourite = db.favourite;

const Op = db.Sequelize.Op;
exports.findOne = (req, res) => {
  const id = req.params.id;
  const quid = req.params.qid;
  Favourite.findOne({
    where: { quizeId: quid, userId: id }
  })
    .then(data => {
      res.send(data);


    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

// Update a Favourite by the userId and QuizeId in the request
exports.update = (req, res) => {
  console.log(res,"dfjsh")
  const id = req.params.id;
  const updateedStatus = req.body.status;
  const userid = req.body.userId;

  Favourite.update(
    { status: updateedStatus },
    { where: { quizeId: id, userId: userid } }
  ).then(function (rowsUpdated) {
    res.send(rowsUpdated)
  })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
      });
    });
};

// Create and Save a new fav
exports.create = (req, res) => {
  // Validate request
  if (!req.body.quizid) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a fav
  const favourite = {
    quizeId: req.body.quizid,
    userId: req.body.userid,
    status: req.body.status
  };

  // Save fav in the database
  Favourite.create(favourite)
  console.log(favourite)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
};

//Find All fav of user by userId where status is true
exports.findAll = (req, res) => {
  const user_Id = req.params.id;

  return Favourite.findAll({
    include: ["quizs"],
    where: { userId: user_Id, status: true }
  }).then(data => {
    res.send(data);
  })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

//Find All fav of user by userId
exports.findAllFav = (req, res) => {
  const user_Id = req.params.id;

  return Favourite.findAll({
    include: ["quizs"],
    where: { userId: user_Id }
  }).then(data => {
    res.send(data);
  })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};
