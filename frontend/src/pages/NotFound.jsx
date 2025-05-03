import React from 'react';
import { Link } from 'react-router-dom';
import '../scss/NotFound.scss'; // Crée ce fichier pour le style

function NotFound() {
  return (
    <div className="not-found-container">
      <img src="/404-image.png" alt="Page non trouvée" className="not-found-image" />
      <h1>Oups ! Cette page n'existe pas.</h1>
      <p>Le lien que vous avez suivi est peut-être incorrect ou la page a été déplacée.</p>
      <Link to="/" className="btn-home">Retour à l'accueil</Link>
    </div>
  );
}

export default NotFound;
