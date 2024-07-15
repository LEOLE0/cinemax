import React, { useState } from 'react';
import styled from 'styled-components';

// Importer les images
import img1 from '../Asset/movie&uuid=09F1A3AD-C127-4C59-8AF5-DD949E8FD405.avif';
import img2 from '../Asset/movie&uuid=09F1A3AD-C127-4C59-8AF5-DD949E8FD405.avif';
import img3 from '../Asset/movie&uuid=09F1A3AD-C127-4C59-8AF5-DD949E8FD405.avif';
// Continuez pour toutes les images

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

const Header = styled.header`
  width: 100%;
  max-width: 1200px;
  text-align: center;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 3rem;
  color: #ff9800;
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const SearchBarContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 800px;
  margin-bottom: 20px;
`;

const SearchBar = styled.input`
  flex: 1;
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
  max-width: 1200px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
`;

const MovieCard = styled.div`
  background-color: #1c1c1c;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s;

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
  font-size: 1.2rem;
  padding: 10px;
  text-align: center;
  color: #ff9800;
`;

const PremierePage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const movies = [
    { title: 'Moi, Moche et Méchant 4', img: img1 },
    { title: 'To the Moon', img: img2 },
    { title: 'Creation of the Gods', img: img3 },
    { title: 'Longlegs', img: img1 },
    { title: 'Only the River Flows', img: img2 },
    { title: 'Napoléon', img: img3 },
    { title: 'Movie 7', img: img1 },
    { title: 'Movie 8', img: img2 },
    { title: 'Movie 9', img: img3 },
    { title: 'Movie 10', img: img1 },
    { title: 'Movie 11', img: img2 },
    { title: 'Movie 12', img: img3 },
    { title: 'Movie 13', img: img1 },
    { title: 'Movie 14', img: img2 },
    { title: 'Movie 15', img: img3 },
  ];

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
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
          <MovieCard key={index}>
            <MoviePoster src={movie.img} alt={movie.title} />
            <MovieTitle>{movie.title}</MovieTitle>
          </MovieCard>
        ))}
      </MovieGrid>
    </Container>
  );
};

export default PremierePage;