// Importation des modules nécessaires pour le serveur Express
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./config/database'); 
const artisans = require('./routes/artisans'); 

const app = express();
const port = 3001; 

// Définition des options CORS autorisant le frontend à communiquer avec le backend
const corsOptions = {
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};

// Application des middlewares globaux avec configuration CORS
app.use(cors(corsOptions));
app.use(bodyParser.json());

// Définition des routes pour les artisans via le préfixe /api/artisans
app.use('/api/artisans', artisans);

// Test de la connexion à la base de données avec Sequelize
sequelize.authenticate()
  .then(() => {
    console.log('Connexion à la base de données réussie!');
  })
  .catch((err) => {
    console.error('Impossible de se connecter à la base de données:', err);
  });

// Lancement du serveur Express
app.listen(port, () => {
  console.log(`Serveur API démarré sur http://localhost:${port}`);
});
