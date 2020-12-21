const db = require("../models");
const score = db.score;
exports.getMaxScore = (req, res) => {
  
  const id = req.params.id;
  score
    .findOne({
      include: ["usersc"],
      where: { quizeId: id },
      attributes: [
        [db.sequelize.fn("max", db.sequelize.col("score")), "maxscore"],
      ],
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

// Create and Save a new score
exports.setScore = (req, res) => {
  // Validate request
  if (!req.body.quizeId) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a score
  const ScoreData = {
    quizeId: req.body.quizeId,
    userId: req.body.userId,
    score: req.body.score,
  };

  // Save score in the database
  score
    .create(ScoreData)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the ScoreData.",
      });
    });
};
