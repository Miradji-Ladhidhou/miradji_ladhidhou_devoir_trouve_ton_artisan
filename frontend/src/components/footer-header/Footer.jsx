// Importation des composants nécessaires de React-Bootstrap et du logo
import { Container, Row, Col, Nav } from 'react-bootstrap';
import logo from '../../image/Logo.png';

// Définition du composant Footer
function Footer() {
  return (
    // Balise <footer> avec classes Bootstrap pour le style global
    <footer className="footer text-light py-4 mt-auto">
      <Container>
        <Row className="text-center text-md-start">

          <Col md={4} className="mb-3">
            <img src={logo} alt="logo" className='logo-footer'/>
          </Col>

          <Col md={4} className="mb-3">
            <Nav className="flex-column">
              <h5>Pages légales</h5>
              <Nav.Link href="/DonneesPersonnelles" className="text-light p-0">Données personnelles</Nav.Link>
              <Nav.Link href="/Accessibilite" className="text-light p-0">Accessibilité</Nav.Link>
              <Nav.Link href="/Cookies" className="text-light p-0">Cookies</Nav.Link>
              <Nav.Link href="/MentionLegales" className="text-light p-0">Mentions légales</Nav.Link>
            </Nav>
          </Col>

          <Col md={4} className="mb-3">
            <address>
              <p>101 cours Charlemagne</p>
              <p>CS 20033</p>
              <p>69269 LYON CEDEX 02</p>
              <p>France</p>
            </address>
            tel: <a href='tel:+33 (0)4 26 73 40 00'>+33 (0)4 26 73 40 00</a>
          </Col>

        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
