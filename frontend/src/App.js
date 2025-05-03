import React from 'react';
import './scss/App.scss';
import Navbar from './components/footer-header/Navbar';
import Footer from './components/footer-header/Footer';
import Home from './pages/Home';


function App() {
  return (

    <div className="App">
      <Navbar/>
      <Home/>
      <Footer/>
    </div>
  );
}

export default App;
