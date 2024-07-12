import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import InscriptionConnexion from './pages/InscriptionConnexion';
import HomePage from './pages/HomePage';
import { UserProvider } from './contexts/UserContext';

function App() {
  return (
    <UserProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<InscriptionConnexion />} />
        </Routes>
        <Footer />
      </Router>
    </UserProvider>
  );
}

export default App;