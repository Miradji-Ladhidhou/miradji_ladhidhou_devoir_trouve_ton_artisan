// Initialisation d'Express, importation des modèles et des dépendances
const express = require('express');
const router = express.Router();
const db = require('../models');
const { Artisan, Specialite, Categorie} = db;
const Sequelize = require('sequelize');

// Route GET /search : recherche d’artisans par nom et/ou par catégorie
router.get('/search', async (req, res) => {
  try {
    const searchQuery = req.query.nom;
    const categorieQuery = req.query.categorie;

    if (!searchQuery && !categorieQuery) {
      return res.status(400).json({ message: 'Le nom ou la catégorie est requis pour la recherche' });
    }

    console.log(`Recherche d'artisan avec le nom : ${searchQuery} et la catégorie : ${categorieQuery}`);

    let searchConditions = {
      where: {},
      attributes: ['id', 'nom', 'note', 'ville', 'a_propos', 'site_web'],
      include: [
        {
          model: Specialite,
          as: 'specialite',
          attributes: ['id', 'nom'],
          include: [
            {
              model: Categorie,
              as: 'categorie',
              attributes: ['nom'],
              where: categorieQuery ? Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('specialite.categorie.nom')), {
                [Sequelize.Op.like]: `%${categorieQuery.toLowerCase()}%`
              }) : undefined
            }
          ]
        }
      ]
    };

    if (searchQuery) {
      searchConditions.where.nom = {
        [Sequelize.Op.like]: `%${searchQuery}%`
      };
    }

    const artisans = await Artisan.findAll(searchConditions);

    if (artisans.length === 0) {
      return res.status(404).json({ message: 'Aucun artisan trouvé avec ces critères' });
    }

    console.log('Artisans trouvés:', artisans);
    res.json(artisans);
  } catch (err) {
    console.error('Erreur lors de la recherche des artisans:', err);
    res.status(500).json({ message: 'Erreur lors de la recherche des artisans', error: err.message });
  }
});

// Route GET /categorie/:categorie : recherche d’artisans par nom de catégorie
router.get('/categorie/:categorie', async (req, res) => {
  try {
    const categorie = req.params.categorie.toLowerCase();

    const artisans = await Artisan.findAll({
      attributes: ['id', 'nom', 'note', 'ville', 'a_propos', 'site_web'],
      include: [
        {
          model: Specialite,
          as: 'specialite',
          required: true,
          include: [
            {
              model: Categorie,
              as: 'categorie',
              required: true,
              where: Sequelize.where(
                Sequelize.fn('LOWER', Sequelize.col('specialite.categorie.nom')),
                {
                  [Sequelize.Op.like]: `%${categorie}%`
                }
              ),
              attributes: ['nom'],
            },
          ],
          attributes: ['nom'],
        },
      ],
    });

    if (artisans.length === 0) {
      return res.status(404).json({ message: `Aucun artisan trouvé dans la catégorie ${categorie}` });
    }

    res.json(artisans);
  } catch (err) {
    console.error('Erreur lors de la récupération des artisans par catégorie:', err);
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

// Route GET / : récupération de tous les artisans avec leurs spécialités et catégories
router.get('/', async (req, res) => {
  try {
    console.log('Début de la récupération des artisans...');
    
    const artisans = await Artisan.findAll({
      attributes: ['id', 'nom', 'note', 'ville' , 'a_propos', 'site_web'],
      include: {
        model: Specialite,
        as: 'specialite', 
        attributes: ['nom'],
        include:{
          model: Categorie,
          as: 'categorie',
          attributes: ['nom']
        }
      }
    });

    console.log('Artisans récupérés:', artisans);
    res.json(artisans);
  } catch (err) {
    console.error('Erreur lors de la récupération des artisans:', err);
    res.status(500).json({ message: 'Erreur lors de la récupération des artisans', error: err.message });
  }
});

// Route GET /:id : récupération d’un artisan spécifique par son ID
router.get('/:id', async (req, res) => {
  try {
    console.log(`Recherche de l'artisan avec l'ID : ${req.params.id}`);

    const artisan = await Artisan.findByPk(req.params.id, {
      attributes: ['id', 'nom', 'note' , 'ville', 'a_propos', 'site_web'],
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
