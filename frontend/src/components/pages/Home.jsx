import React from 'react';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';

function Home() {
  const etapes = [
    { numero: 1, texte: "Première étape" },
    { numero: 2, texte: "Deuxième étape" },
    { numero: 3, texte: "Troisième étape" },
    { numero: 4, texte: "Quatrième étape" },
  ];

  const cartes = [
    {
      titre: "Artisan 1",
      items: ["Cras justo odio", "Dapibus ac facilisis in", "Vestibulum at eros"],
    },
    {
      titre: "Artisan 2",
      items: ["Réponse rapide", "Service local", "Note 4.8/5"],
    },
    {
      titre: "Artisan 3",
      items: ["Garantie 10 ans", "Intervention rapide", "Prix compétitifs"],
    },
  ];

  const handleClick = (titre) => {
    alert(`Carte cliquée : ${titre}`);
  };

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Comment trouver mon artisan</h1>
      <h2 className="text-center mb-5">Suivez les étapes ci-dessous</h2>

      {/* Les 4 carrés numérotés */}
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

      {/* Les 3 cartes en dessous */}
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
  );
}

export default Home;
