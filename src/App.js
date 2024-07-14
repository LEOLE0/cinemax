// src/App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Connexion';
import Register from './components/Inscription';
import HomePage from './pages/HomePage';
import InscriptionConnexion from './pages/InscriptionConnexion';
import PrivateRoute from './components/PrivateRoute';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import GlobalStyles from './components/GlobalStyles';

const App = () => {
  return (
    <>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Mise à jour de la route par défaut */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/inscription-connexion" element={<InscriptionConnexion />} />
        <Route path="/home" element={<HomePage />} /> {/* Modification pour éviter les problèmes avec PrivateRoute */}
        <Route path="/favorites" element={<PrivateRoute component={Favorites} />} />
        <Route path="/profile" element={<PrivateRoute component={Profile} />} />  
      </Routes>
    </>
  );
};

export default App;