// Importation des modules nécessaires (fs, path, Sequelize)
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

// Initialisation de Sequelize avec les paramètres de connexion à la base de données
const basename = path.basename(__filename);
const sequelize = new Sequelize('artisans', 'root', 'root', {
  host: 'localhost',
  port: 8889,
  dialect: 'mysql',
  logging: false,
});

const db = {};

// Chargement dynamique de tous les fichiers de modèles dans le dossier courant
fs.readdirSync(__dirname)
  .filter(file => file !== basename && file.endsWith('.js'))
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model; 
  });

// Exécution des associations définies entre les modèles (s’il y en a)
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db); 
  }
});

// Ajout de Sequelize et de l’instance sequelize à l’objet db pour pouvoir y accéder ailleurs
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Exportation de l’objet db contenant tous les modèles et l’instance Sequelize
module.exports = db;
