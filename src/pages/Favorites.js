// src/pages/Favorites.js
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getFavorites } from '../api'; // Assurez-vous d'avoir une fonction pour récupérer les favoris

const PageContainer = styled.div`

  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f0f0f0;
  min-height: 100vh;
  padding-top: 140px; /* Pour éviter que la navbar chevauche le contenu */
`;

const FavoritesContainer = styled.div`

  width: 100vw;
  max-width: 1200px;
  height: 60vh;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const MovieCard = styled.div`
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 20px;
  width: 200px;
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

const MovieImage = styled.img`
  width: 100%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const MovieTitle = styled.h3`
  font-family: 'roboto', sans sérif;
  font-size: 1.2rem;
  margin: 10px 0;
  color: #333;
`;

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favoriteMovies = await getFavorites(localStorage.getItem('token'));
        setFavorites(favoriteMovies);
      } catch (error) {
        console.error('Erreur lors de la récupération des films favoris:', error);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <PageContainer>
      <Navbar />
      <h1>Mes Favoris</h1>
      <FavoritesContainer>
        {favorites.map((movie) => (
          <MovieCard key={movie.id}>
            <MovieImage src={movie.image} alt={movie.title} />
            <MovieTitle>{movie.title}</MovieTitle>
            <p>Date de sortie : {movie.date_sortie}</p>
          </MovieCard>
        ))}
      </FavoritesContainer>
      <Footer />
    </PageContainer>
  );
};

export default Favorites;