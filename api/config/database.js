const { Sequelize } = require("sequelize");
require("dotenv").config();

// Configuration de la connexion à la base de données en utilisant les variables d'environnement.
const sequelize = new Sequelize(
  process.env.DB_NAME,       
  process.env.DB_USER,      
  process.env.DB_PASSWORD,   
  {

    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT || 'mysql',
    port: process.env.DB_PORT || 3306,
    logging: false,
  }
);

// Vérification de la connexion à la base de données.
sequelize.authenticate()
  .then(() => {
    console.log("Connexion à la base de données réussie !");
  })
  .catch((err) => {
    console.error("Impossible de se connecter à la base de données :", err);
  });

module.exports = sequelize;
