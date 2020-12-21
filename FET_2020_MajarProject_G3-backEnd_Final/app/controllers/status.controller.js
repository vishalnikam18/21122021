const db = require("../models");

const Status = db.status;
const que = db.question;
exports.create = (req, res) => {
  // Validate request
  if (!req.body.quizeId) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Status
  const status = {
    quizeId: req.body.quizeId,
    userId: req.body.userId,
    userans: req.body.userans,
    questatus: req.body.questatus,
    remainingtime: req.body.remainingtime,
    questionId: req.body.questionId,
  };

  // Save Status in the database
  Status.create(status)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial.",
      });
    });
};
exports.findOne = (req, res) => {
  
  const id = req.params.uid;
  const quid = req.params.qid;
  Status.findAll({
    include: ["userqu"],
    where: { quizeId: quid, userId: id },
  })
    .then((data) => {
      res.send(data);
      console.log(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};
exports.findAll = (req, res) => {
  
  const id = req.params.id;
    
  que
    .findAll({
      where: { quizeId: id },
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

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  
  const quizeId = req.params.qId;
  const userId = req.params.uId;
  
  Status.destroy({
    where: { quizeId: quizeId, userId: userId },
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Tutorials were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials.",
      });
    });
};

exports.update = (req, res) => {
  const remainingtime = req.body.remainingtime;
  const quizeId = req.body.quizeId;
  const userId = req.body.userId;
  joinquery = db.sequelize
    .query(
      "update statuses set remainingtime=" +
        remainingtime +
        " where userId=" +
        userId +
        " and quizeId=" +
        quizeId,
      {}
    )
    .then((data) => {
      
      res.send(data);
    });
  
};

