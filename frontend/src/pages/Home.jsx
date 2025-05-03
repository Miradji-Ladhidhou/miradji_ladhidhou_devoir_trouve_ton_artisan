// src/pages/Home.jsx
import React, { useState } from 'react';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';
import CustomNavbar from '../components/footer-header/Navbar';

function Home() {
  const [navHeight, setNavHeight] = useState(0);

  const etapes = [
    { numero: 1, texte: "Choisir la catégorie d’artisanat dans le menu." },
    { numero: 2, texte: "Choisir un artisan." },
    { numero: 3, texte: "Le contacter via le formulaire de contact." },
    { numero: 4, texte: "Une réponse sera apportée sous 48h." },
  ];

  const cartes = [
    {
      titre: "Artisan 1",
      items: ["!", "!", "!"],
    },
    {
      titre: "Artisan 2",
      items: ["!", "!", "!"],
    },
    {
      titre: "Artisan 3",
      items: ["!", "!", "!"],
    },
  ];

  const handleClick = (titre) => {
    alert(`Carte cliquée : ${titre}`);
  };

  return (
    <>
      <CustomNavbar onHeightChange={setNavHeight} />

      <Container style={{ paddingTop: `${navHeight + 20}px` }} className="my-5">
        <h1 className="text-center mb-4">Comment trouver mon artisan ?</h1>
        <h2 className="text-center mb-5">Suivez les étapes ci-dessous.</h2>

        {/* les étapes à suivre pour trouver un artisan */}
        <Row className="g-4 mb-5">
          {etapes.map((item, index) => (
            <Col key={index} xs={12} sm={6} md={3}>
              <Card className="text-center shadow-sm h-100" onClick={() => handleClick(item.texte)} style={{ cursor: 'pointer' }}>
                <Card.Body>
                  <h2>{item.numero}</h2>
                  <p>{item.texte}</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Les 3 artisans du mois */}
        <Row className="g-4">
          {cartes.map((carte, index) => (
            <Col key={index} xs={12} md={4}>
              <Card className="shadow-sm h-100" onClick={() => handleClick(carte.titre)} style={{ cursor: 'pointer' }}>
                <Card.Header>{carte.titre}</Card.Header>
                <ListGroup variant="flush">
                  {carte.items.map((item, i) => (
                    <ListGroup.Item key={i}>{item}</ListGroup.Item>
                  ))}
                </ListGroup>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default Home;
