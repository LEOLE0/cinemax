import React, { useState } from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar'; // Assurez-vous que le chemin est correct
import Footer from '../components/Footer'; // Assurez-vous que le chemin est correct
import ReservationForm from '../components/ReservationForm';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

// Importer l'image et la vidéo
import posterImage from '../assets/movie-img1.avif';
import videoFile from '../assets/video.mp4';

const Container = styled.div`
margin-top: 80px;
padding-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
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
  margin-bottom: 20px;
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

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  background: #333;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 5px;
  color: #fff;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const TextArea = styled.textarea`
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const SubmitButton = styled.button`
  background-color: orange;
  border: none;
  color: black;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e6b800;
  }
`;

const BadBoys = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', comment: '' });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'comments'), formData);
      closeModal();
    } catch (err) {
      console.error("Erreur lors de l'ajout du commentaire:", err);
    }
  };

  return (
    <>
      <Navbar />
      <Container>
        <ContentSection>
          <Poster>
            <PosterImage src={posterImage} alt="BadBoys" />
          </Poster>
          <Details>
            <NewBadge>Nouveau</NewBadge>
            <Title>Bad boys</Title>
            <Rating>👍 1,4K · 12+ · 1h46 · Action/Thriller</Rating>
            <ReleaseDate>Sortie : 03 juil. 2024</ReleaseDate>
            <Cast>Avec Jeanne Michel, Roschdy Zem, Laetitia Eido, de Florent-Emilio Siri</Cast>
            <Description>Bad boys, ancien soldat des Forces Spéciales, solitaire et paranoïaque,
              devient garde du corps pour Nour, 13 ans et sa...
            </Description>
            <Actions>
              <ActionButton>➕ Ma liste</ActionButton>
              <ActionButton onClick={openModal}>👍 Noter</ActionButton>
            </Actions>
          </Details>
          <VideoContainer>
            <Video controls>
              <source src={videoFile} type="video/mp4" />
              Votre navigateur ne supporte pas la balise vidéo.
            </Video>
          </VideoContainer>
        </ContentSection>
        <ReservationForm />
      </Container>
      {isModalOpen && (
        <ModalOverlay>
          <ModalContainer>
            <Form onSubmit={handleSubmit}>
              <Label htmlFor="name">Nom</Label>
              <Input id="name" name="name" type="text" value={formData.name} onChange={handleChange} />
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} />
              <Label htmlFor="comment">Commentaire</Label>
              <TextArea id="comment" name="comment" value={formData.comment} onChange={handleChange} />
              <SubmitButton type="submit">Envoyer</SubmitButton>
            </Form>
            <button onClick={closeModal}>Fermer</button>
          </ModalContainer>
        </ModalOverlay>
      )}
      <Footer />
    </>
  );
};

export default BadBoys;