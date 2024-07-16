import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { FaHeart } from 'react-icons/fa';
import movieImage1 from '../assets/movie-img1.avif';
import movieImage2 from '../assets/movie-img2.webp';
import movieImage3 from '../assets/movie-img3.avif';
import movieImage4 from '../assets/movie-img4.avif';
import backgroundImg from '../assets/darkvador.jpg';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const Section = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)), url(${props => props.$backgroundImage}) center/cover no-repeat;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
  font-family: 'Poppins', sans-serif;
  overflow: hidden;
`;

const Gallery = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  perspective: 1200px;
  gap: 20px;
  animation: ${fadeIn} 1s ease-in-out;
`;

const Poster = styled.div`
  width: 200px;
  height: 300px;
  background-image: url(${props => props.$poster});
  background-size: cover;
  background-position: center;
  transform: rotateY(${props => props.$angle}deg) translateZ(200px);
  transition: transform 0.5s ease, box-shadow 0.5s ease, filter 0.5s ease, opacity 0.5s ease;
  border-radius: 15px;
  overflow: hidden;
  position: relative;
  filter: brightness(0.85);
  opacity: 0.8;

  &:hover {
    transform: rotateY(0deg) translateZ(220px);
    box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.7);
    filter: brightness(1.1);
    opacity: 1;
  }
`;

const Title = styled.h2`
  color: white;
  margin-bottom: 100px;
  font-size: 2.4em;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  font-family: 'Poppins', sans-serif;
`;

const MovieDetails = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 10px 15px;
  font-size: 14px;
  text-align: center;
  opacity: 0;
  transition: opacity 0.3s ease;

  ${Poster}:hover & {
    opacity: 1;
  }
`;

const PosterOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  opacity: 0;
  transition: opacity 0.5s ease;
  border-radius: 15px;

  ${Poster}:hover & {
    opacity: 1;
  }
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

const FeaturedMovies = () => {
  const [films, setFilms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5001/api/films')
      .then((response) => response.json())
      .then((data) => setFilms(data.slice(0, 4)))
      .catch((error) => console.error('Error fetching films:', error));
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

  const posters = [
    { src: movieImage1, angle: -30, route: '/badboys' }, // Ajout de la route
    { src: movieImage2, angle: -10, route: '/film2' },
    { src: movieImage3, angle: 10, route: '/film3' },
    { src: movieImage4, angle: 30, route: '/film4' },
  ];

  return (
    <Section $backgroundImage={backgroundImg}>
      <Title>Films Principaux</Title>
      <Gallery>
        {films.map((film, index) => (
          <Poster
            key={index}
            $poster={posters[index].src}
            $angle={posters[index].angle}
            onClick={() => navigate(posters[index].route)} // Navigation lors du clic
          >
            <PosterOverlay />
            <MovieDetails>
              <h4>{film.titre}</h4>
              <p>{film.date_sortie}</p>
            </MovieDetails>
            <HeartButton onClick={() => addToWatchlist(film.film_id)}>
              <FaHeart />
            </HeartButton>
          </Poster>
        ))}
      </Gallery>
    </Section>
  );
};

export default FeaturedMovies;