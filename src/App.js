import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Connexion';
import Register from './components/Inscription';
import HomePage from './pages/HomePage';
import InscriptionConnexion from './pages/InscriptionConnexion';
import PrivateRoute from './components/PrivateRoute';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import PremierePage from './pages/PremierePage'; // Importer la nouvelle page
import GlobalStyles from './components/GlobalStyles';
import BadBoys from './pages/BadBoys'; // Assurez-vous que le chemin est correct


const App = () => {
  return (
    <>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/inscription-connexion" element={<InscriptionConnexion />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/favorites" element={<PrivateRoute component={Favorites} />} />
        <Route path="/profile" element={<PrivateRoute component={Profile} />} />
        <Route path="/PremierePage" element={<PremierePage />} /> 
        <Route path="/badboys" element={<BadBoys />} />
      </Routes>
    </>
  );
};

export default App;