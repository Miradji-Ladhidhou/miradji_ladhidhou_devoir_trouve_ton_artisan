import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './scss/App.scss';
import Navbar from './components/footer-header/Navbar';
import Footer from './components/footer-header/Footer';
import Home from './pages/Home';
import ListeArtisans from './pages/ListeArtisans';


function App() {
  return (
    <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/artisans" element={<ListeArtisans />} />
    </Routes>
    <Footer />
  </Router>
  );
}

export default App;
