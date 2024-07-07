// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5001/api', // Utilisez le port configuré pour votre backend
});

// Ajouter des en-têtes par défaut si nécessaire
api.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');

export const getFilms = async () => {
  try {
    const response = await api.get('/film');
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des films:', error);
    throw error;
  }
};

export const createUser = async (userData) => {
  try {
    const response = await api.post('/utilisateur', userData);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la création de l\'utilisateur:', error);
    throw error;
  }
};