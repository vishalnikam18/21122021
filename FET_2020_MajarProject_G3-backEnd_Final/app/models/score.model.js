module.exports = (sequelize, Sequelize) => {
    const Score= sequelize.define("score", {
      score: {
        type: Sequelize.INTEGER
      },
        submittedOn:{
          type:Sequelize.DATEONLY,
          allowNull:false,
          defaultValue:Sequelize.NOW
        }
      
    },
    
    {
      timestamps: false
  });
  
    return Score;
  };