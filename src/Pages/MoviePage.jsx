import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const movieDetails = {
  1: { title: 'Twisters', description: 'A thrilling storm adventure.', image: '/Images/Elyas.jpg' },
  2: { title: 'Spider-man 2', description: 'The amazing Spider-man returns.', image: '/Images/BadBoys.webp' },
  3: { title: 'MaXXXine', description: 'Horror at its peak.', image: '/Images/2Oppenheimer.jpg' },
  4: { title: 'Deadpool & Wolverine', description: 'A deadly duo.', image: '/Images/4Barbie.jpg' },
  5: { title: 'Garfield: Héros malgré lui', description: 'Garfield’s adventures.', image: '/Images/BlueLock4.webp' },
  6: { title: 'Spider-man 3', description: 'Spider-man faces new challenges.', image: '/Images/5Dune.jpg' },
  7: { title: 'Spider-man Homecoming', description: 'Spider-man returns home.', image: '/Images/6Indiana.jpg' },
  8: { title: 'Spider-man Far From Home', description: 'Spider-man goes global.', image: '/Images/6Mission.jpg' },
};

const MovieContainer = styled.div`
  text-align: center;
  padding: 20px;
  background: linear-gradient(135deg, #1e3c72, #2a5298);
  min-height: 100vh;
  color: white;
`;

const MovieImage = styled.img`
  width: 50%;
  height: auto;
`;

const MovieTitle = styled.h1`
  font-size: 24px;
  margin: 10px 0;
  color: #ffa500;
`;

const MovieDescription = styled.p`
  font-size: 18px;
`;

const MoviePage = () => {
  const { id } = useParams();
  const movie = movieDetails[id];

  if (!movie) {
    return <div>Movie not found</div>;
  }

  return (
    <MovieContainer>
      <MovieImage src={movie.image} alt={movie.title} />
      <MovieTitle>{movie.title}</MovieTitle>
      <MovieDescription>{movie.description}</MovieDescription>
    </MovieContainer>
  );
};

export default MoviePage;
