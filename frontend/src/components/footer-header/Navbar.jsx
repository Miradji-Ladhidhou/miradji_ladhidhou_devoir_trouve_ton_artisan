// Importation des hooks React et des composants nécessaires
import React, { useRef, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../../image/Logo.png';

// Composant de barre de navigation personnalisée
function CustomNavbar({ onHeightChange }) {
  const navbarRef = useRef(null); // Référence pour obtenir la hauteur de la navbar
  const [searchTerm, setSearchTerm] = useState(''); // État pour le champ de recherche
  const navigate = useNavigate(); // Hook pour la navigation

  // Détecte et transmet la hauteur de la navbar au parent
  useEffect(() => {
    if (navbarRef.current && onHeightChange) {
      onHeightChange(navbarRef.current.offsetHeight);
    }
  }, [onHeightChange]);

  // Gère la soumission du formulaire de recherche
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/liste-artisans?nom=${encodeURIComponent(searchTerm)}`);
      setSearchTerm('');
    }
  };

  // Gère le filtrage par catégorie (en conservant le nom si présent)
  const handleCategoryChange = (categorie) => {
    const queryParams = new URLSearchParams(window.location.search);
    const nom = queryParams.get('nom');
    if (nom) {
      navigate(`/liste-artisans?nom=${encodeURIComponent(nom)}&categorie=${categorie}`);
    } else {
      navigate(`/liste-artisans?categorie=${categorie}`);
    }
  };

  // Structure JSX de la barre de navigation
  return (
    <Navbar ref={navbarRef} expand="lg" className="bg-body-tertiary fixed-top">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          <img src={logo} alt="logo" className="logo" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" />

        <Navbar.Collapse id="navbarScroll">
          <Form className="d-flex me-auto" onSubmit={handleSearch}>
            <Form.Control
              type="search"
              placeholder="Rechercher un artisan"
              className="me-2 recherche"
              aria-label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button type="submit" variant="outline-success">Search</Button>
          </Form>

          <Nav
            className="texteNav my-2 my-lg-0"
            style={{ maxHeight: '250px', paddingLeft: '50px' }}
            navbarScroll
          >
            <Nav.Link onClick={() => handleCategoryChange('batiment')}>BATIMENT</Nav.Link>
            <Nav.Link onClick={() => handleCategoryChange('services')}>SERVICES</Nav.Link>
            <Nav.Link onClick={() => handleCategoryChange('fabrication')}>FABRICATION</Nav.Link>
            <Nav.Link onClick={() => handleCategoryChange('alimentation')}>ALIMENTATION</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
