import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import '../scss/ListeArtisans.scss';
import { Link } from 'react-router-dom';

function ListeArtisans() {
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const nom = queryParams.get('nom');
    const categorie = queryParams.get('categorie');

    const fetchArtisans = async () => {
      try {
        let url = 'http://localhost:3001/api/artisans';

        if (nom) {
          url += `/search?nom=${encodeURIComponent(nom)}`;
        } else if (categorie) {
          url += `/categorie/${encodeURIComponent(categorie)}`;
        }

        const response = await axios.get(url);
        setArtisans(response.data);
      } catch (err) {
        console.error('Erreur lors de la récupération des artisans:', err);
        setArtisans([]);
      } finally {
        setLoading(false);
      }
    };

    fetchArtisans();
  }, [location.search]);

  const renderStars = (note) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= note ? 'star filled' : 'star'}>★</span>
      );
    }
    return stars;
  };

  if (loading) return <p className="loading">Chargement...</p>;

  return (
    <div className="artisans-container">
      <h2 className="title">Liste des Artisans</h2>
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
