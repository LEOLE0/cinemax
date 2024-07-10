// src/api.js
// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'http://localhost:5001/api', // Utilisez le port configuré pour votre backend
// });

// // Ajouter des en-têtes par défaut si nécessaire
// api.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');

// export const getFilms = async () => {
//   try {
//     const response = await api.get('/film');
//     return response.data;
//   } catch (error) {
//     console.error('Erreur lors de la récupération des films:', error);
//     throw error;
//   }
// };

// export const createUser = async (userData) => {
//   try {
//     const response = await api.post('/utilisateur', userData);
//     return response.data;
//   } catch (error) {
//     console.error('Erreur lors de la création de l\'utilisateur:', error);
//     throw error;
//   }
// };

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

// Ajouter les nouvelles fonctions pour l'inscription, la connexion et la récupération du profil
export const register = async (userData) => {
  try {
    const response = await api.post('/register', userData);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    throw error;
  }
};

export const login = async (userData) => {
  try {
    const response = await api.post('/login', userData);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    throw error;
  }
};

export const getProfile = async (token) => {
  try {
    const response = await api.get('/profile', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération du profil:', error);
    throw error;
  }
};