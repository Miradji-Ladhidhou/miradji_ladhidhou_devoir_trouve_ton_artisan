import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import CustomNavbar from '../components/footer-header/Navbar';
import '../scss/ListeArtisans.scss';

function Home() {
  const [navHeight, setNavHeight] = useState(0);
  const [topArtisans, setTopArtisans] = useState([]);
  const navigate = useNavigate();

  const etapes = [
    { numero: 1, texte: "Choisir la catégorie d’artisanat dans le menu." },
    { numero: 2, texte: "Choisir un artisan." },
    { numero: 3, texte: "Le contacter via le formulaire de contact." },
    { numero: 4, texte: "Une réponse sera apportée sous 48h." },
  ];

  useEffect(() => {
    const fetchArtisans = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/artisans');
        const sorted = response.data
          .sort((a, b) => (b.note || 0) - (a.note || 0))
          .slice(0, 3);
        setTopArtisans(sorted);
      } catch (error) {
        console.error('Erreur lors de la récupération des artisans:', error);
      }
    };
    fetchArtisans();
  }, []);

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

  const handleCardClick = (id) => {
    navigate(`/artisan/${id}`);
  };

  return (
    <>
      <CustomNavbar onHeightChange={setNavHeight} />

      <Helmet>
        <title>Accueil</title>
        <meta name="description" content="Découvrez les meilleurs artisans près de chez vous et suivez les étapes simples pour les contacter." />
      </Helmet>

      <div className="artisans-container" style={{ paddingTop: `${navHeight + 20}px` }}>
        <h1 className="title">Comment trouver mon artisan ?</h1>
        <h2 className="subtitle">Suivez les étapes ci-dessous.</h2>

        <div className="card-grid">
          {etapes.map((item, index) => (
            <div key={index} className="etape-card" >
              <h3>{item.numero}</h3>
              <p>{item.texte}</p>
            </div>
          ))}
        </div>

        <h2 className="title">Nos 3 artisans du mois</h2>

        <div className="card-grid">
          {topArtisans.map((artisan) => (
            <div key={artisan.id} className="artisan-card" style={{ cursor: 'pointer' }} onClick={() => handleCardClick(artisan.id)}>
              <h3>{artisan.nom}</h3>
              <p><strong>Spécialité :</strong> {artisan.specialite?.nom || 'Non renseignée'}</p>
              <p><strong>Localisation :</strong> {artisan.ville || 'Non précisée'}</p>
              <p className="stars">{renderStars(artisan.note || 0)}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
