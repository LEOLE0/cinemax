import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Reservation from './Reservation';

const filmData = {
  1: { title: 'Moi, Moche et Méchant 4', poster: '/Images/movie1.jpg', description: 'Description du film 1', video: '/Videos/film1.mp4' },
  2: { title: 'To the Moon', poster: '/Images/movie2.jpg', description: 'Description du film 2', video: '/Videos/film2.mp4' },
  3: { title: 'Longlegs', poster: '/Images/movie3.jpg', description: 'Description du film 3', video: '/Videos/film3.mp4' },
  4: { title: 'Creation of the Gods', poster: '/Images/movie4.jpg', description: 'Description du film 4', video: '/Videos/film4.mp4' },
  // Ajoutez d'autres films ici
};

const FilmDetails = () => {
  const { id } = useParams();
  const film = filmData[id];

  return (
    <Container>
      <ContentSection>
        <Poster>
          <PosterImage src={film.poster} alt={film.title} />
        </Poster>
        <Details>
          <TitleSection>
            <NewBadge>Nouveau</NewBadge>
            <Title>{film.title}</Title>
          </TitleSection>
          <Rating>👍 1,4K · 12+ · 1h46 · Action/Thriller</Rating>
          <ReleaseDate>Sortie : 03 juil. 2024</ReleaseDate>
          <Cast>Avec Jeanne Michel, Roschdy Zem, Laetitia Eido, de Florent-Emilio Siri</Cast>
          <Description>{film.description}</Description>
          <Actions>
            <ActionButton>➕ Ma liste</ActionButton>
            <ActionButton>👍 Noter</ActionButton>
          </Actions>
        </Details>
        <VideoContainer>
          <Video controls>
            <source src={film.video} type="video/mp4" />
            Votre navigateur ne supporte pas la balise vidéo.
          </Video>
        </VideoContainer>
      </ContentSection>
      <Reservation />
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

const ContentSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 40px;
  background: rgba(20, 20, 20, 0.9);
  border-radius: 10px;
  margin-bottom: 20px;
  width: 100%;
  max-width: 1200px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Poster = styled.div`
  flex: 1;
  margin-right: 20px;

  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 20px;
  }
`;

const PosterImage = styled.img`
  width: 100%;
  border-radius: 10px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const Details = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  margin-right: 20px;

  @media (max-width: 768px) {
    margin-right: 0;
  }
`;

const TitleSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const NewBadge = styled.span`
  background-color: red;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  margin-right: 10px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #ff9800;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const Rating = styled.p`
  font-size: 1rem;
  margin-bottom: 10px;
`;

const ReleaseDate = styled.p`
  font-size: 1rem;
  margin-bottom: 10px;
`;

const Cast = styled.p`
  font-size: 1rem;
  margin-bottom: 20px;
`;

const Description = styled.p`
  font-size: 1rem;
  margin-bottom: 20px;
  line-height: 1.5;
`;

const Actions = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

const ActionButton = styled.button`
  background-color: #ff9800;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: #e68900;
    transform: scale(1.05);
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.5);
  }
`;

const VideoContainer = styled.div`
  flex: 2;
  margin-left: 20px;

  @media (max-width: 768px) {
    margin-left: 0;
    margin-top: 20px;
  }
`;

const Video = styled.video`
  width: 100%;
  border-radius: 10px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

export default FilmDetails;