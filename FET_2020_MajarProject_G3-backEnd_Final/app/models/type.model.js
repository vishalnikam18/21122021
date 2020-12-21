module.exports = (sequelize, Sequelize) => {
    const Type = sequelize.define("type", {
      type: {
        type: Sequelize.STRING
      }
      
    },
    
    {
      timestamps: false
  });
  
    return Type;
  };