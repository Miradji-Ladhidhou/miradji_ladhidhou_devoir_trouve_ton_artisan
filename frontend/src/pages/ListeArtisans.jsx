import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

function ListeArtisans() {
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const nom = queryParams.get('nom');
  const categorie = queryParams.get('categorie');

  const getTitreCategorie = () => {
    if (categorie) {
      const mapping = {
        batiment: 'Bâtiment',
        services: 'Services',
        fabrication: 'Fabrication',
        alimentation: 'Alimentation',
      };
      return mapping[categorie] || 'Liste des Artisans';
    } else if (nom) {
      return `Résultats pour "${nom}"`;
    } else {
      return 'Tous les Artisans';
    }
  };

  useEffect(() => {
    const fetchArtisans = async () => {
      try {
        let url = 'https://miradji-ladhidhou-devoir-trouve-ton.onrender.com/api/artisans';
        if (nom) {
          url += `/search?nom=${encodeURIComponent(nom)}`;
        } else if (categorie) {
          url += `/categorie/${encodeURIComponent(categorie)}`;
        }
        const res = await axios.get(url);
        setArtisans(res.data);
      } catch (err) {
        console.error('Erreur récupération artisans :', err);
        setArtisans([]);
      } finally {
        setLoading(false);
      }
    };
    fetchArtisans();
  }, [nom, categorie]);

  const renderStars = (note) => (
    [...Array(5)].map((_, i) => (
      <span key={i} className={i < note ? 'star filled' : 'star'}>★</span>
    ))
  );

  if (loading) return <p className="loading">Chargement...</p>;

  return (
    <div className="artisans-container">
      <Helmet>
        <title>Liste des artisans</title>
        <meta name="description" content="Trouvez un artisan qualifié dans votre région." />
      </Helmet>

      <h2 className="title">{getTitreCategorie()}</h2>

      {artisans.length === 0 ? (
        <p className="no-result">Aucun artisan trouvé</p>
      ) : (
        <div className="card-grid">
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
