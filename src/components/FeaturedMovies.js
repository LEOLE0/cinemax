// src/components/FeaturedMovies.js
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FaInfoCircle } from 'react-icons/fa';
import movieImage1 from '../assets/movie-img1.avif';
import movieImage2 from '../assets/movie-img1.avif';
import movieImage3 from '../assets/movie-img1.avif';
import movieImage4 from '../assets/movie-img1.avif';
import backgroundImg from '../assets/darkvador.jpg'; // Assurez-vous de fournir le bon chemin vers votre image de fond

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
  height: 100vh; /* Ajustez cette valeur pour réduire la hauteur de la section */
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)), url(${props => props.$backgroundImage}) center/cover no-repeat;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 0; /* Ajustez le padding pour remonter le titre */
  font-family: 'Poppins', sans-serif;
  overflow: hidden; /* Assurez-vous que les éléments ne débordent pas */
`;

const Gallery = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  perspective: 1200px;
  gap: 20px; /* Espace entre les affiches */
  animation: ${fadeIn} 1s ease-in-out;
`;

const Poster = styled.div`
  width: 200px; /* Réduire la largeur des affiches */
  height: 300px; /* Réduire la hauteur des affiches */
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
  margin-bottom: 100px; /* Ajustez la marge pour remonter le titre */
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

const InfoButton = styled.button`
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
  transition: background 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 1);
  }

  svg {
    color: #333;
    font-size: 18px;
  }
`;

const FeaturedMovies = () => {
  const posters = [
    { src: movieImage1, angle: -30, title: 'Film 1', description: 'Le 1 juin au cinéma' },
    { src: movieImage2, angle: -10, title: 'Film 2', description: 'Le 2 juin au cinéma' },
    { src: movieImage3, angle: 10, title: 'Film 3', description: 'Le 3 juin au cinéma' },
    { src: movieImage4, angle: 30, title: 'Film 4', description: 'Le 4 juin au cinéma' },
  ];

  return (
    <Section $backgroundImage={backgroundImg}>
      <Title>Films Principaux</Title>
      <Gallery>
        {posters.map((poster, index) => (
          <Poster key={index} $poster={poster.src} $angle={poster.angle}>
            <PosterOverlay />
            <MovieDetails>
              <h4>{poster.title}</h4>
              <p>{poster.description}</p>
            </MovieDetails>
            <InfoButton>
              <FaInfoCircle />
            </InfoButton>
          </Poster>
        ))}
      </Gallery>
    </Section>
  );
};

export default FeaturedMovies;