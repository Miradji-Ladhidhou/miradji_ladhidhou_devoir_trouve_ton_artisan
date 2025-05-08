import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import logo from '../image/Logo.png';
import { Helmet } from 'react-helmet-async';

function FicheArtisan() {
  const { id } = useParams();
  const [artisan, setArtisan] = useState(null);

  useEffect(() => {
    axios.get(`https://miradji-ladhidhou-devoir-trouve-ton.onrender.com/api/artisans/${id}`)
      .then(res => setArtisan(res.data))
      .catch(err => console.error('Erreur récupération artisan :', err));
  }, [id]);

  const renderStars = (note) => (
    [...Array(5)].map((_, i) => (
      <span key={i} className={i < note ? 'star filled' : 'star'}>★</span>
    ))
  );

  if (!artisan) return <p>Chargement...</p>;

  return (
    <div className="fiche-artisan">
      <Helmet>
        <title>Fiche artisan</title>
        <meta name="description" content="Profil détaillé de l'artisan" />
      </Helmet>

      <h2>{artisan.nom}</h2>
      <img src={logo} alt={artisan.nom} className="artisan-photo" />
      <p className="stars">{renderStars(artisan.note || 0)}</p>
      <p><strong>Spécialité :</strong> {artisan.specialite?.nom}</p>
      <p><strong>Localisation :</strong> {artisan.ville}</p>
      <p><strong>À propos :</strong> {artisan.a_propos || 'Non renseigné'}</p>
      <p><strong>Site web :</strong> {artisan.site_web ? <Link to={artisan.site_web}>{artisan.site_web}</Link> : 'Non renseigné'}</p>

      <form className="contact-form">
        <h3>Contacter {artisan.nom}</h3>
        <input type="text" placeholder="Votre nom" required />
        <input type="email" placeholder="Votre email" required />
        <input type="text" placeholder="Objet" required />
        <textarea placeholder="Votre message..." required></textarea>
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
}

export default FicheArtisan;
