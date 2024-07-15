import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Home = () => {
  const films = [
    { id: 1, title: 'Moi, Moche et Méchant 4', poster: '/Images/movie1.jpg' },
    { id: 2, title: 'To the Moon', poster: '/Images/movie2.jpg' },
    { id: 3, title: 'Longlegs', poster: '/Images/movie3.jpg' },
    { id: 4, title: 'Creation of the Gods', poster: '/Images/movie4.jpg' },
    // Ajoutez d'autres films ici
  ];

  return (
    <Container>
      <Title>Films en Avant-Première</Title>
      <FilmGrid>
        {films.map(film => (
          <FilmCard key={film.id}>
            <Link to={`/film/${film.id}`}>
              <PosterImage src={film.poster} alt={film.title} />
              <FilmTitle>{film.title}</FilmTitle>
            </Link>
          </FilmCard>
        ))}
      </FilmGrid>
    </Container>
  );
};

const Container = styled.div`
  font-family: 'Poppins', sans-serif;
  color: #fff;
  background-color: #1c1c1c;
  min-height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 20px;
`;

const FilmGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

const FilmCard = styled.div`
  width: 200px;
  text-align: center;
  cursor: pointer;
`;

const PosterImage = styled.img`
  width: 100%;
  border-radius: 10px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const FilmTitle = styled.h2`
  font-size: 1.2rem;
  margin-top: 10px;
  color: #ff9800;
`;

export default Home;