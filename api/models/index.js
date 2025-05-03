const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const sequelize = new Sequelize('artisans', 'root', 'root', {
  host: 'localhost',
  port: 8889,
  dialect: 'mysql',
  logging: false,
});

const db = {};

fs.readdirSync(__dirname)
  .filter(file => file !== basename && file.endsWith('.js'))
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model; // ← le nom du modèle est pris automatiquement
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db); // ← toutes les associations après création
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
