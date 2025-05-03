const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./config/database'); 
const artisans = require('./routes/artisans'); 

const app = express();
const port = 3001; 

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Utilise les routes pour /api/artisans
app.use('/api/artisans', artisans);

// Teste la connexion à la base de données
sequelize.authenticate()
  .then(() => {
    console.log('Connexion à la base de données réussie!');
  })
  .catch((err) => {
    console.error('Impossible de se connecter à la base de données:', err);
  });

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur API démarré sur http://localhost:${port}`);
});
