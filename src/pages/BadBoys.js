import React from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar'; // Assurez-vous que le chemin est correct
import Footer from '../components/Footer'; // Assurez-vous que le chemin est correct
import ReservationForm from '../components/ReservationForm';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 150px;
  color: white;
  background: linear-gradient(to right, #002147, #004080);
  font-family: 'Poppins', sans-serif;
  min-height: 100vh;
  flex-wrap: wrap;
`;

const ContentSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-bottom: 90px;
  width: 100%;
`;

const Poster = styled.div`
  margin-right: 20px;
`;

const PosterImage = styled.img`
  width: 200px;
  border-radius: 10px;
`;

const Details = styled.div`
  flex: 1;
  margin-right: 20px;
`;

const NewBadge = styled.span`
  display: inline-block;
  background-color: red;
  color: white;
  padding: 2px 8px;
  border-radius: 4px;
  margin-bottom: 10px;
  font-size: 0.8em;
`;

const Title = styled.h1`
  font-size: 2.2em;
  margin: 10px 0;
`;

const Rating = styled.p`
  margin: 10px 0;
  font-size: 1em;
`;

const ReleaseDate = styled.p`
  margin: 10px 0;
  font-size: 1em;
`;

const Cast = styled.p`
  margin: 10px 0;
  font-size: 1em;
`;

const Description = styled.p`
  margin: 10px 0;
  font-size: 1em;
  line-height: 1.4em;
`;

const Actions = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 10px;
`;

const ActionButton = styled.button`
  background-color: orange;
  border: none;
  color: black;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e6b800;
  }
`;

const VideoContainer = styled.div`
  flex: 2;
`;

const Video = styled.video`
  width: 98%;
  max-width: 800px;
  border-radius: 20px;
`;


const BadBoys = () => {
  return (
    <>
      <Navbar />
      <Container>
        <ContentSection>
          <Poster>
            <PosterImage
              src={require('../assets/movie-img1.avif').default}
              alt="BadBoys"
            />
          </Poster>
          <Details>
            <NewBadge>Nouveau</NewBadge>
            <Title>Bad boys</Title>
            <Rating>👍 1,4K · 12+ · 1h46 · Action/Thriller</Rating>
            <ReleaseDate>Sortie : 03 juil. 2024</ReleaseDate>
            <Cast>
              Avec Jeanne Michel, Roschdy Zem, Laetitia Eido, de Florent-Emilio Siri
            </Cast>
            <Description>
              Bad boys, ancien soldat des Forces Spéciales, solitaire et paranoïaque,
              devient garde du corps pour Nour, 13 ans et sa...
            </Description>
            <Actions>
              <ActionButton>➕ Ma liste</ActionButton>
              <ActionButton>👍 Noter</ActionButton>
            </Actions>
          </Details>
          <VideoContainer>
            <Video controls>
              <source src={require('../assets/video.mp4').default} type="video/mp4" />
              Votre navigateur ne supporte pas la balise vidéo.
            </Video>
          </VideoContainer>
        </ContentSection>
        <ReservationForm />
      </Container>
      <Footer />
    </>
  );
};

export default BadBoys;