import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';

function ListeArtisans() {
  const { categorie } = useParams();
  const [artisans, setArtisans] = useState([]);

  useEffect(() => {
    // Appel à l'API pour récupérer les artisans selon la catégorie
    // Exemple : `/api/artisans?categorie=batiment`
    // Ici on simule
    setArtisans([]); // Remplacé plus tard par la vraie API
  }, [categorie]);

  return (
    <Container className="my-5">
      <h1 className="mb-4 text-capitalize">Artisans - {categorie}</h1>
      <Row className="g-4">
        {artisans.map((artisan) => (
          <Col key={artisan.id} xs={12} md={6} lg={4}>
            <Card
              className="shadow-sm h-100"
              onClick={() => window.location.href = `/artisans/${artisan.id}`}
              style={{ cursor: 'pointer' }}
            >
              <Card.Body>
                <Card.Title>{artisan.nom}</Card.Title>
                <Card.Text>
                  {Array(artisan.note).fill().map((_, i) => (
                    <FaStar key={i} color="#ffc107" />
                  ))}
                </Card.Text>
                <Card.Text><strong>Spécialité :</strong> {artisan.specialite}</Card.Text>
                <Card.Text><strong>Localisation :</strong> {artisan.localisation}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ListeArtisans;
