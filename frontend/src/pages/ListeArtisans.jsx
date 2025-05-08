import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

function ListeArtisans() {
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // Extraction des paramètres de recherche
  const queryParams = new URLSearchParams(location.search);
  const nom = queryParams.get('nom');
  const categorie = queryParams.get('categorie');

  // Fonction pour obtenir un titre dynamique basé sur la catégorie ou le nom
  const getTitreCategorie = () => {
    if (categorie) {
      switch (categorie) {
        case 'batiment':
          return 'Bâtiment';
        case 'services':
          return 'Services';
        case 'fabrication':
          return 'Fabrication';
        case 'alimentation':
          return 'Alimentation';
        default:
          return 'Liste des Artisans';
      }
    } else if (nom) {
      return `Résultats pour "${nom}"`;
    } else {
      return 'Tous les Artisans';
    }
  };

  // Effect pour récupérer les artisans en fonction des paramètres 'nom' ou 'categorie'
  useEffect(() => {
    const fetchArtisans = async () => {
      try {
        let url = 'https://api-mon-artisan.onrender.com/api/artisans';

        // Modifie l'URL en fonction des paramètres de recherche
        if (nom) {
          url += `/search?nom=${encodeURIComponent(nom)}`;
        } else if (categorie) {
          url += `/categorie/${encodeURIComponent(categorie)}`;
        }

        const response = await axios.get(url);
        setArtisans(response.data);  // Met à jour l'état avec les artisans récupérés
      } catch (err) {
        console.error('Erreur lors de la récupération des artisans:', err);
        setArtisans([]);  // Si erreur, vide le tableau des artisans
      } finally {
        setLoading(false);  // Indique que le chargement est terminé
      }
    };

    fetchArtisans();
  }, [nom, categorie]);  // Dépendances : mise à jour lorsque 'nom' ou 'categorie' change

  // Fonction pour afficher les étoiles selon la note de l'artisan
  const renderStars = (note) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= note ? 'star filled' : 'star'}>★</span>
      );
    }
    return (
      <>
        {stars}
        <span className="sr-only"> {note}/5</span>
      </>
    );
  };

  // Affichage si les données sont en train de se charger
  if (loading) return <p className="loading">Chargement...</p>;

  return (
    <div className="artisans-container">

      <Helmet>
        <title>Liste des artisans</title>
        <meta name="description" content="Explorez notre sélection d'artisans professionnels dans diverses catégories. 
        Que vous ayez besoin d'un plombier, électricien ou menuisier, trouvez l'expert qu'il vous faut près de chez vous." />
      </Helmet>

      <h2 className="title">{getTitreCategorie()}</h2>
      
      {/* Si aucun artisan n'est trouvé, affiche un message */}
      {artisans.length === 0 ? (
        <p className="no-result">Aucun artisan trouvé</p>
      ) : (
        <div className="card-grid">
          {/* Affichage de chaque artisan */}
          {artisans.map((artisan) => (
            <Link to={`/artisan/${artisan.id}`} key={artisan.id} className="artisan-card">
              <h3>{artisan.nom}</h3>
              <p><strong>Spécialité :</strong> {artisan.specialite?.nom || 'Non renseignée'}</p>
              <p><strong>Localisation :</strong> {artisan.ville || 'Non précisée'}</p>
              <p className="stars">{renderStars(artisan.note || 0)}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default ListeArtisans;
