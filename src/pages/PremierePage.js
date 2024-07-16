import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { FaHeart } from 'react-icons/fa';
import Navbar from '../components/Navbar';  // Assurez-vous que le chemin est correct
import Footer from '../components/Footer';  // Assurez-vous que le chemin est correct

// Importer les images (Si nécessaire, sinon récupérer les affiches depuis la base de données)
import img1 from '../assets/movie-img1.avif';
import img2 from '../assets/movie-img2.webp';
import img3 from '../assets/movie-img3.avif';
import img4 from '../assets/movie-img4.avif';
import img5 from '../assets/movie-img5.avif';
import img6 from '../assets/movie-img11.avif';
import img7 from '../assets/movie-img5.avif';
import img8 from '../assets/movie-img8.jpeg';
import img9 from '../assets/movie-img7.avif';
import img10 from '../assets/movie-img9.webp';
import img11 from '../assets/movie-img10.avif';
import img12 from '../assets/movie-img11.avif';
import img13 from '../assets/movie-img12.webp';
import img14 from '../assets/movie-img14.webp';
import img15 from '../assets/movie-img13.jpeg';


const Container = styled.div`
  font-family: 'Poppins', sans-serif;
  color: #fff;
  background-color: #121212;
  min-height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MainContent = styled.div`
  background-color: #121212; 
  color: #fff;
  width: 100%;
  max-width: 1300px;
  margin: 20px auto;
  padding: 0px;
  border-radius: 10px;
`;

const Header = styled.header`
  width: 100%;
  text-align: center;
  margin-bottom: 40px; /* Ajouter plus d'espace en bas */
`;

const Title = styled.h1`
  font-size: 3rem;
  color: #fff; /* Mettre le titre en blanc */
  margin-top: 90px; /* Ajouter plus d'espace en haut pour descendre le titre */
  margin-bottom: 70px;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const SearchBarContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 90px;
`;

const SearchBar = styled.input`
  flex: 1;
  max-width: 800px; /* Limiter la largeur de la barre de recherche */
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #333;
  border-radius: 5px 0 0 5px;
  margin-right: -1px;
  background-color: #222;
  color: #fff;

  &:focus {
    outline: none;
    border-color: #ff9800;
  }
`;

const SearchButton = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  border: 1px solid #333;
  border-radius: 0 5px 5px 0;
  background-color: #ff9800;
  color: #fff;
  cursor: pointer;

  &:hover {
    background-color: #e68900;
  }
`;

const MovieGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 70px; /* Augmenter l'espace entre les posters de films */
`;

const MovieCard = styled.div`
  background-color: #1c1c1c;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s;
  position: relative;

  &:hover {
    transform: scale(1.05);
  }
`;

const MoviePoster = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;

const MovieTitle = styled.h2`
  font-size: 1rem;
  padding: 10px;
  text-align: center;
  font-weight: 100;
  color: #fff; /* Mettre les titres des films en blanc */
`;

const HeartButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(255, 255, 255, 0.7);
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;

  &:hover {
    background: rgba(255, 0, 0, 0.7);
    svg {
      color: #ff0000;
    }
  }

  &:active {
    transform: scale(1.1);
  }

  svg {
    color: #333;
    font-size: 18px;
  }
`;

const PremierePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Fetch movies from the backend
    axios.get('http://localhost:5001/api/films')
      .then(response => {
        setMovies(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des films:', error);
      });
  }, []);

  const addToWatchlist = (filmId) => {
    fetch('http://localhost:5001/api/watchlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify({ film_id: filmId }),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Film ajouté à la watchlist');
        } else {
          console.error('Erreur lors de l\'ajout du film à la watchlist');
        }
      })
      .catch((error) => console.error('Erreur lors de l\'ajout du film à la watchlist:', error));
  };

  const filteredMovies = movies.filter(movie =>
    movie.titre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const moviePosters = [
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    img7,
    img8,
    img9,
    img10,
    img11,
    img12,
    img13,
    img14,
    img15,
    // ... autres images
  ];

  return (
    <>
      <Navbar />
      <Container>
        <MainContent>
          <Header>
            <Title>Avant-premières et préventes</Title>
            <SearchBarContainer>
              <SearchBar
                type="text"
                placeholder="Rechercher un film..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
              <SearchButton>🔍</SearchButton>
            </SearchBarContainer>
          </Header>
          <MovieGrid>
            {filteredMovies.map((movie, index) => (
              <MovieCard key={index} onClick={() => window.location.href = `/film/${movie.film_id}`}>
                <MoviePoster src={moviePosters[index]} alt={movie.titre} />
                <MovieTitle>{movie.titre}</MovieTitle>
                <HeartButton onClick={() => addToWatchlist(movie.film_id)}>
                  <FaHeart />
                </HeartButton>
              </MovieCard>
            ))}
          </MovieGrid>
        </MainContent>
      </Container>
      <Footer />
    </>
  );
};

export default PremierePage;