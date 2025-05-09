// Importation des modules nécessaires pour le serveur Express
const express = require('express');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const sequelize = require('./config/database'); 
const artisans = require('./routes/artisans'); 


const app = express();
const port = process.env.PORT || 3001;

// Middleware pour servir les fichiers statiques (images, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Configuration de la sécurité avec Helmet
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'", 'data:', 'https://api-mon-artisan.onrender.com'],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      connectSrc: ["'self'", 'https://api-mon-artisan.onrender.com'],
      styleSrc: ["'self'", "'unsafe-inline'"],
      fontSrc: ["'self'", 'https://fonts.googleapis.com', 'https://fonts.gstatic.com'],
    },
  })
);

// Limitation du nombre de requêtes pour éviter les abus
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limite chaque IP à 100 requêtes par fenêtre
});

// Définition des options CORS autorisant le frontend à communiquer avec le backend
const corsOptions = {
  origin: 'https://trouve-ton-artisan-75bn.onrender.com', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};

// Application du middleware de limitation des requêtes
app.use(limiter);

// Application des middlewares globaux avec configuration CORS
app.use(cors(corsOptions));

// Middleware pour parser le JSON dans les requêtes
app.use(express.json()); 


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
  console.log(`Serveur API démarré sur ${port}`);
});
