const express = require('express');
const router = express.Router();
const db = require('../models');
const { Artisan, Specialite } = db;
const Sequelize = require('sequelize');

// Rechercher un artisan par son nom
router.get('/search', async (req, res) => {
  try {
    const searchQuery = req.query.nom; // Récupérer le nom depuis la requête
    if (!searchQuery) {
      return res.status(400).json({ message: 'Le nom est requis pour la recherche' });
    }

    console.log(`Recherche d'artisan avec le nom : ${searchQuery}`);

    // Rechercher les artisans dont le nom contient la chaîne spécifiée
    const artisans = await Artisan.findAll({
      where: {
        nom: {
          [Sequelize.Op.like]: `%${searchQuery}%` // Recherche par nom (partie du nom)
        }
      },
      include: {
        model: Specialite,
        as: 'specialite', 
        attributes: ['nom'] 
      }
    });

    if (artisans.length === 0) {
      return res.status(404).json({ message: 'Aucun artisan trouvé avec ce nom' });
    }

    console.log('Artisans trouvés:', artisans);
    res.json(artisans);
  } catch (err) {
    console.error('Erreur lors de la recherche des artisans:', err);
    res.status(500).json({ message: 'Erreur lors de la recherche des artisans', error: err.message });
  }
});

// Récupérer tous les artisans avec leurs spécialités
router.get('/', async (req, res) => {
  try {
    console.log('Début de la récupération des artisans...');
    
    const artisans = await Artisan.findAll({
      include: {
        model: Specialite,
        as: 'specialite', 
        attributes: ['nom']
      }
    });

    console.log('Artisans récupérés:', artisans);
    res.json(artisans);
  } catch (err) {
    console.error('Erreur lors de la récupération des artisans:', err);
    res.status(500).json({ message: 'Erreur lors de la récupération des artisans', error: err.message });
  }
});

// Récupérer un artisan spécifique par ID avec sa spécialité
router.get('/:id', async (req, res) => {
  try {
    console.log(`Recherche de l'artisan avec l'ID : ${req.params.id}`);

    const artisan = await Artisan.findByPk(req.params.id, {
      include: {
        model: Specialite,
        as: 'specialite', 
        attributes: ['nom']
      }
    });

    if (!artisan) {
      console.log(`Aucun artisan trouvé avec l'ID ${req.params.id}`);
      return res.status(404).json({ message: 'Artisan non trouvé' });
    }

    console.log('Artisan récupéré:', artisan);
    res.json(artisan);
  } catch (err) {
    console.error(`Erreur lors de la récupération de l'artisan avec l'ID ${req.params.id}:`, err);
    res.status(500).json({ message: 'Erreur lors de la récupération de l\'artisan', error: err.message });
  }
});

module.exports = router;
