module.exports = (sequelize, Sequelize) => {
    const Quize = sequelize.define("quize", {
      quizname: {
        type: Sequelize.STRING
      },
      time: {
        type: Sequelize.INTEGER
      },
      count:{
        type: Sequelize.INTEGER
      }
    },
    
    {
      timestamps: false
  });
  
    return Quize;
  };