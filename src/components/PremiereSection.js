import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaHeart } from 'react-icons/fa'; // Importation de l'icône de cœur

// Importer les affiches des films
import premierePoster1 from "../assets/movie-img2.webp";
import premierePoster2 from "../assets/movie-img3.avif";
import premierePoster3 from "../assets/movie-img4.avif";
import premierePoster4 from "../assets/movie-img5.avif";
import premierePoster5 from "../assets/movie-img6.avif";
import premierePoster6 from "../assets/movie-img7.avif";
import premierePoster7 from "../assets/movie-img8.jpeg";
import premierePoster8 from "../assets/movie-img1.avif";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Section = styled.section`
  width: 100%;
  padding: 150px 0;
  background: linear-gradient(135deg, #111 30%, #222 100%);
  color: #fff;
  text-align: center;
  font-family: 'Poppins', sans-serif;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 70px;
  font-weight: 700;
  text-transform: uppercase;
  transition: transform 0.3s ease-in-out, color 0.3s ease-in-out;
  animation: ${fadeIn} 0.8s ease-in-out;
  

  &:hover {
    transform: scale(1.05);
    color: #ff9800;
  }
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 130px;
  font-weight: 500;
  transition: color 0.3s ease-in-out;
  animation: ${fadeIn} 0.8s ease-in-out;

  &:hover {
    color: #ff9800;
  }
`;

const MovieGallery = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 85px;


  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const MoviePoster = styled.div`
  width: 200px;
  height: 300px;
  background-image: url(${props => props.$poster});
  background-size: cover;
  background-position: center;
  border-radius: 15px;
  overflow: hidden;
  position: relative;
  transition: transform 0.5s ease, box-shadow 0.5s ease, filter 0.5s ease;

  &:hover {
    transform: scale(1.1) rotate(5deg);
    box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.7);
    filter: brightness(1.3);
  }

  &:hover::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(1px);
  }
`;

const PosterLabel = styled.div`
  position: absolute;
  top: 15px;
  left: 15px;
  background-color: #e53935;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 12px;
  font-weight: bold;
  z-index: 1;
`;

const MovieTitle = styled.p`
  margin-top: 20px;
  font-size: 18px;
  font-weight: 100;
  
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

const GlowButton = styled.a`
  margin-top: 130px;
  display: inline-block;
  background-color: #ff9800;
  color: #fff;
  padding: 12px 40px;
  border-radius: 5px;
  font-size: 18px;
  text-decoration: none;
  transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 0 10px rgba(0, 123, 255, 0.7);

  &:hover {
    background-color: #0056b3;
    transform: scale(1.05);
    box-shadow: 0 0 20px rgba(0, 123, 255, 0.7);
  }
`;

const PremiereSection = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  const movies = [
    { poster: premierePoster1, label: 'Avant-première', title: 'Moi, Moche et Méchant 4' },
    { poster: premierePoster2, label: 'Avant-première', title: 'To the Moon' },
    { poster: premierePoster3, label: '', title: 'Longlegs' },
    { poster: premierePoster4, label: '', title: 'Creation of the Gods' },
    { poster: premierePoster5, label: '', title: 'Le Ruban Blanc' },
    { poster: premierePoster6, label: '', title: 'Elyas' },
    { poster: premierePoster7, label: '', title: 'Deadpool X Wolwerine' },
    { poster: premierePoster8, label: '', title: 'Bad Boys' },
  ];

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

  return (
    <Section>
      <Container>
        <Title data-aos="fade-up" data-aos-delay="800">Avant-premières et préventes</Title>
        <Subtitle data-aos="fade-down" data-aos-delay="800">
          Découvrez les avant-premières et les nouveautés en exclusivité !
        </Subtitle>
        <MovieGallery>
          {movies.map((movie, index) => (
            <div key={index} data-aos="fade-up" data-aos-delay={`${(index + 1) * 100}`}>
              <MoviePoster $poster={movie.poster}>
                {movie.label && <PosterLabel>{movie.label}</PosterLabel>}
                <HeartButton onClick={() => addToWatchlist(index + 1)}>
                  <FaHeart />
                </HeartButton>
              </MoviePoster>
              <MovieTitle>{movie.title}</MovieTitle>
            </div>
          ))}
        </MovieGallery>
        <GlowButton href="/PremierePage">Toutes les avant-premières et préventes &gt;</GlowButton>
      </Container>
    </Section>
  );
};

export default PremiereSection;