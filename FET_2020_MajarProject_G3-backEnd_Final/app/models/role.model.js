module.exports = (sequelize, Sequelize) => {

const Role = sequelize.define("role", {
  role: {
    type: Sequelize.STRING
  }
  
},
{
  timestamps : false
});

return Role;
};