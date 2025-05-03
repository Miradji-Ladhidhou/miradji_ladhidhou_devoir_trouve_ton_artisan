const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("artisans", "root", "root", {
  host: "localhost",   
  port: 8889,         
  dialect: "mysql",
  logging: false,      
});

sequelize.authenticate()
  .then(() => {
    console.log('Connexion à la base de données réussie!');
  })
  .catch((err) => {
    console.error('Impossible de se connecter à la base de données:', err);
  });


module.exports = sequelize;
