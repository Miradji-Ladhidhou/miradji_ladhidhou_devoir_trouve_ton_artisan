import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './scss/App.scss';
import Navbar from './components/footer-header/Navbar';
import Footer from './components/footer-header/Footer';
import Home from './pages/Home';
import ListeArtisans from './pages/ListeArtisans';
import FicheArtisan from './pages/FicheArtisan';


function App() {
  return (
    <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/liste-artisans" element={<ListeArtisans />} />
      <Route path="/artisan/:id" element={<FicheArtisan />} />
    </Routes>
    <Footer />
  </Router>
  );
}

export default App;
