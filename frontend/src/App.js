import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './scss/main.scss'
import Navbar from './components/footer-header/Navbar';
import Footer from './components/footer-header/Footer';
import Home from './pages/Home';
import ListeArtisans from './pages/ListeArtisans';
import FicheArtisan from './pages/FicheArtisan';
import MentionLegales from './pages/MentionLegales';
import Accessibilite from './pages/Accessibilite';
import Cookies from './pages/Cookies';
import DonneesPersonnelles from './pages/DonneesPersonnelles';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/liste-artisans" element={<ListeArtisans />} />
            <Route path="/artisan/:id" element={<FicheArtisan />} />
            <Route path="/MentionLegales" element={<MentionLegales />} />
            <Route path="/Accessibilite" element={<Accessibilite />} />
            <Route path="/Cookies" element={<Cookies />} />
            <Route path="/DonneesPersonnelles" element={<DonneesPersonnelles />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
