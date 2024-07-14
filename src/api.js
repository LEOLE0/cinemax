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

export const getProfile = async () => {
  try {
    const response = await api.get('/profile');
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération du profil:', error);
    throw error;
  }
};

// Ajout des nouvelles fonctions pour les favoris
export const getFavorites = async () => {
  try {
    const response = await api.get('/favorites');
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des favoris:', error);
    throw error;
  }
};

export const addFavorite = async (film_id) => {
  try {
    const response = await api.post('/favorites', { film_id });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de l\'ajout aux favoris:', error);
    throw error;
  }
};

export const removeFavorite = async (film_id) => {
  try {
    const response = await api.delete(`/favorites/${film_id}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la suppression des favoris:', error);
    throw error;
  }
};

// Ajout des nouvelles fonctions pour les réservations
export const getReservations = async () => {
  try {
    const response = await api.get('/reservations');
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des réservations:', error);
    throw error;
  }
};

export const addReservation = async (reservationData) => {
  try {
    const response = await api.post('/reservations', reservationData);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de l\'ajout de la réservation:', error);
    throw error;
  }
};

export const removeReservation = async (reservation_id) => {
  try {
    const response = await api.delete(`/reservations/${reservation_id}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la suppression de la réservation:', error);
    throw error;
  }
};

// Ajout de la fonction de mise à jour du profil
export const updateProfile = async (userData) => {
  try {
    const response = await api.put('/profile', userData);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la mise à jour du profil:', error);
    throw error;
  }
};