import React from 'react';
import './scss/App.scss';
import Navbar from './components/footer-header/Navbar';
import Footer from './components/footer-header/Footer';


function App() {
  return (

    <div className="App">
      <Navbar/>
      <h1>Welcome to the React App</h1>
      <Footer/>
    </div>
  );
}

export default App;
