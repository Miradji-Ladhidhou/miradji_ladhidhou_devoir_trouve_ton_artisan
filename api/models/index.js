// models/index.js
const Sequelize = require('sequelize');
const sequelize = new Sequelize('artisans', 'root', 'root', {
  host: 'localhost',
  port: 8889, // ← très important pour MAMP
  dialect: 'mysql',
  logging: false,
});


const db = {
  sequelize,
  Sequelize,
  Category: require('./categorie')(sequelize, Sequelize.DataTypes),
  Specialite: require('./specialite')(sequelize, Sequelize.DataTypes),
  Artisan: require('./artisan')(sequelize, Sequelize.DataTypes),
};

// Associations
db.Category.associate(db);
db.Specialite.associate(db);
db.Artisan.associate(db);

module.exports = db;
