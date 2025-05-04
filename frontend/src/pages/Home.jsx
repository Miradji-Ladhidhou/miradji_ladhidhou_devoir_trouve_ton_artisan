// Importation des modules nécessaires
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CustomNavbar from '../components/footer-header/Navbar';
import '../scss/home.scss';

// Composant principal de la page d'accueil
function Home() {
  const [navHeight, setNavHeight] = useState(0); // Gère la hauteur du menu pour le padding top
  const [topArtisans, setTopArtisans] = useState([]); // Stocke les 3 meilleurs artisans
  const navigate = useNavigate(); // Permet la navigation vers la fiche artisan

  // Étapes d'utilisation affichées sur la page
  const etapes = [
    { numero: 1, texte: "Choisir la catégorie d’artisanat dans le menu." },
    { numero: 2, texte: "Choisir un artisan." },
    { numero: 3, texte: "Le contacter via le formulaire de contact." },
    { numero: 4, texte: "Une réponse sera apportée sous 48h." },
  ];

  // Récupère les artisans depuis l'API et sélectionne les 3 mieux notés
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

  // Affiche des étoiles en fonction de la note
  const renderStars = (note) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= note ? 'star filled' : 'star'}>★</span>
      );
    }
    return stars;
  };

  // Redirige vers la fiche d'un artisan
  const handleCardClick = (id) => {
    navigate(`/artisan/${id}`);
  };

  // Rendu du composant Home
  return (
    <>
      <CustomNavbar onHeightChange={setNavHeight} />

      <Container style={{ paddingTop: `${navHeight + 20}px` }} className="my-5">
        <h1 className="text-center mb-4">Comment trouver mon artisan ?</h1>
        <h2 className="text-center mb-5">Suivez les étapes ci-dessous.</h2>

        <Row className="g-4 mb-5">
          {etapes.map((item, index) => (
            <Col key={index} xs={12} sm={6} md={3}>
              <Card className="text-center shadow-sm h-100" style={{ cursor: 'default' }}>
                <Card.Body>
                  <h2>{item.numero}</h2>
                  <p>{item.texte}</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <h2 className="text-center mb-4">Nos 3 artisans du mois</h2>
        <Row className="g-4">
          {topArtisans.map((artisan) => (
            <Col key={artisan.id} xs={12} md={4}>
              <Card
                className="artisan-card h-100"
                style={{ cursor: 'pointer' }}
                onClick={() => handleCardClick(artisan.id)}
              >
                <Card.Img
                  variant="top"
                  src={artisan.photo || '/default-avatar.jpg'}
                  alt=""
                  className="artisan-photo"
                />
                <Card.Body>
                  <h3>{artisan.nom}</h3>
                  <p><strong>Spécialité :</strong> {artisan.specialite?.nom || 'Non renseignée'}</p>
                  <p><strong>Localisation :</strong> {artisan.ville || 'Non précisée'}</p>
                  <p className="stars">{renderStars(artisan.note || 0)}</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default Home;
