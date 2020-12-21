module.exports = (sequelize, Sequelize) => {
    const Status = sequelize.define("status", {
        userans: {
            type: Sequelize.STRING
          },
          questatus: {
            type: Sequelize.BOOLEAN
          },

          remainingtime: {
            type: Sequelize.INTEGER
          }
    
      
    },
    
    {
      timestamps: false
  });
  
    return Status;
  };