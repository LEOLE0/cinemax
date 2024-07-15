import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import FilmDetails from './pages/FilmDetails';
import InscriptionConnexion from './pages/InscriptionConnexion';
import PremierePage from './pages/PremierePage';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<InscriptionConnexion />} />
        <Route path="/film/:id" element={<FilmDetails />} />
        <Route path="/premieres" element={<PremierePage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;