// Importation des dépendances nécessaires
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import logo from '../image/Logo.png';
import { Helmet } from 'react-helmet-async';

// Composant pour afficher la fiche d'un artisan
function FicheArtisan() {
  const { id } = useParams(); // Récupération de l'ID dans l'URL
  const [artisan, setArtisan] = useState(null); // État pour stocker les données de l'artisan

  // Chargement des données de l'artisan au montage du composant
  useEffect(() => {
    const fetchArtisan = async () => {
      try {
        const response = await axios.get(`https://miradji-ladhidhou-devoir-trouve-ton.onrender.com/api/artisans/${id}`);
        setArtisan(response.data);
      } catch (err) {
        console.error('Erreur lors de la récupération de l’artisan :', err);
      }
    };

    fetchArtisan();
  }, [id]);

  // Fonction pour afficher les étoiles de notation
  const renderStars = (note) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= note ? 'star filled' : 'star'}>★</span>
      );
    }
    return stars;
  };
  
  // Affiche un message de chargement pendant la requête
  if (!artisan) return <p>Chargement...</p>;

  // Affichage des informations de l'artisan et formulaire de contact
  return (
    <div className="fiche-artisan">

      <Helmet>
        <title>Fiche artisan</title>
        <meta name="description" content="Découvrez le profil détaillé de nos artisans" />
      </Helmet>
      <h2>{artisan.nom}</h2>
      <img src={logo} alt={artisan.nom} className="artisan-photo" />
      <p className="stars">{renderStars(artisan.note || 0)}</p>
      <p><strong>Spécialité :</strong> {artisan.specialite?.nom}</p>
      <p><strong>Localisation :</strong> {artisan.ville}</p>
      <p><strong>À propos :</strong> {artisan.a_propos || 'Non renseigné'}</p>
      <p><strong>Site web :</strong> <Link>{artisan.site_web || 'Non renseigné'}</Link></p>

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
