import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { gsap } from 'gsap';

// Importez l'image de fond
import backgroundImage from '../assets/NEXFL.jpg';

const movies = [
  { id: 1, title: 'Twisters', image: '/Images/Elyas.jpg', premiere: true },
  { id: 2, title: 'Spider-man 2', image: '/Images/BadBoys.webp', premiere: true },
  { id: 3, title: 'MaXXXine', image: '/Images/2Oppenheimer.jpg', premiere: true },
  { id: 4, title: 'Deadpool & Wolverine', image: '/Images/4Barbie.jpg' },
  { id: 5, title: 'Garfield: Héros malgré lui', image: '/Images/BlueLock4.webp' },
  { id: 6, title: 'Spider-man 3', image: '/Images/5Dune.jpg' },
  { id: 7, title: 'Spider-man Homecoming', image: '/Images/6Indiana.jpg' },
  { id: 8, title: 'Spider-man Far From Home', image: '/Images/6Mission.jpg' },
  { id: 9, title: 'Avatar', image: '/Images/7Avatar.jpg' },
];

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const enterRoom = keyframes`
  from {
    transform: scale(0.7) translateY(200%);
  }
  to {
    transform: scale(1) translateY(0);
  }
`;

const slideIn = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
`;

const BackgroundContainer = styled.div`
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Gallery = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  width: 100%;
  max-width: 1200px;
`;

const TitleContainer = styled.div`
  width: 100%;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 20px 0;
  margin-bottom: 20px;
  animation: ${fadeIn} 1s ease-out;
`;

const Title = styled.h1`
  color: #ffa500;
  margin: 0;
  font-size: 36px;
`;

const MovieCard = styled.div`
  position: relative;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  width: 200px;
  text-align: center;
  text-decoration: none;
  color: white;
  transition: transform 0.3s, box-shadow 0.3s;
  animation: ${fadeIn} 0.5s ease-out, ${enterRoom} 0.7s ease-out;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4); /* Ombre plus prononcée */
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2); /* Ombre initiale */
    transition: opacity 0.3s;
    opacity: 0;
    border-radius: 8px;
    z-index: -1;
  }

  &:hover:before {
    opacity: 1;
  }
`;

const MovieImageWrapper = styled.div`
  overflow: hidden;
  height: 300px;
`;

const MovieImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;

  ${MovieCard}:hover & {
    transform: scale(1.1);
  }
`;

const MovieTitle = styled.h3`
  margin: 10px 0;
  font-size: 18px;
  background-color: #ffa500; /* Orange */
  color: white;
  padding: 5px;
  border-radius: 5px;
  margin: 0;
`;

const PremiereBadge = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: red;
  color: white;
  padding: 5px 10px;
  font-size: 12px;
  font-weight: bold;
  border-radius: 3px;
  z-index: 1;
`;

const SliderContainer = styled.div`
  width: 100%;
  overflow: hidden;
  background-color: red;
  color: white;
  padding: 10px 0;
  position: sticky;
  bottom: 0;
  left: 0;
`;

const SliderText = styled.div`
  display: inline-block;
  white-space: nowrap;
  animation: ${slideIn} 10s linear infinite;
  font-size: 18px;
  font-weight: bold;
`;

const GalleryPage = () => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    if (!clicked) {
      gsap.to('.movie-card:nth-child(n+5)', {
        duration: 1,
        scale: 1.5,
        y: -window.innerHeight,
        ease: 'power4.out',
        stagger: 0.2,
      });
      setClicked(true);
    }
  };

  return (
    <BackgroundContainer>
      <TitleContainer>
        <Title>Avant-premières et préventes</Title>
      </TitleContainer>
      <Gallery>
        {movies.map((movie, index) => (
          <MovieCard key={movie.id} className="movie-card" onClick={index < 4 ? handleClick : undefined}>
            <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <MovieImageWrapper>
                <MovieImage src={movie.image} alt={movie.title} />
                {movie.premiere && <PremiereBadge>En Avant-première</PremiereBadge>}
              </MovieImageWrapper>
              <MovieTitle>{movie.title}</MovieTitle>
            </Link>
          </MovieCard>
        ))}
      </Gallery>
      <SliderContainer>
        <SliderText>
          2 places achetées = 1 place offerte! Profitez-en maintenant!
        </SliderText>
      </SliderContainer>
    </BackgroundContainer>
  );
};

export default GalleryPage;
