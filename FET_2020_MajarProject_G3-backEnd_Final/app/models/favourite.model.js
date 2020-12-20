module.exports = (sequelize, Sequelize) => {
    const Favourite = sequelize.define("favourite", {
       
     status:{
        type: Sequelize.BOOLEAN
      }
    },
    
    {
      timestamps: false
  } );
  
    return Favourite;
  };