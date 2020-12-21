const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.roles = require("../models/role.model")(sequelize, Sequelize);
db.users = require("../models/user.model")(sequelize, Sequelize);
db.category=require("../models/category.model.js")(sequelize, Sequelize);
db.type=require("../models/type.model.js")(sequelize, Sequelize);
db.quize=require("../models/quize.model")(sequelize, Sequelize);
db.question=require("../models/question.model")(sequelize, Sequelize);
db.score=require("../models/score.model")(sequelize, Sequelize);
db.favourite=require("../models/favourite.model")(sequelize, Sequelize);
db.status=require("../models/status.model")(sequelize, Sequelize);



db.category.hasMany(db.quize, { as: "quizes" });
db.quize.belongsTo(db.category, {
  foreignKey: "categoryId",
  as: "categorys"
})


db.type.hasMany(db.question, { as: "quistion" });
db.question.belongsTo(db.type, {
  foreignKey: "typeId",
  as: "type"
})


db.quize.hasMany(db.question, { as: "quistions" });
db.question.belongsTo(db.quize, {
  foreignKey: "quizeId",
  as: "quiz"
})

db.quize.hasMany(db.favourite, { as: "fav" });
db.favourite.belongsTo(db.quize, {
  foreignKey: "quizeId",
  as: "quizs",
})

db.users.hasMany(db.favourite, { as: "favs" });
db.favourite.belongsTo(db.users, {
  foreignKey: "userId",
  as: "users",
})

db.quize.hasMany(db.score, { as: "score" });
db.score.belongsTo(db.quize, {
  foreignKey: "quizId",
  as: "quizes",
})
db.users.hasMany(db.score, { as: "scores" });
db.score.belongsTo(db.users, {
  foreignKey: "userId",
  as: "usersc",
})

db.users.hasMany(db.status, { as: "statuses" });
db.status.belongsTo(db.users, {
  foreignKey: "userId",
  as: "userst",
})


db.question.hasMany(db.status, { as: "statuse" });
db.status.belongsTo(db.question, {
  foreignKey: "questionId",
  as: "userqu",
})

db.quize.hasMany(db.status, { as: "statusquiz" });
db.favourite.belongsTo(db.quize, {
  foreignKey: "quizeId",
  as: "quizst",
})


module.exports = db;