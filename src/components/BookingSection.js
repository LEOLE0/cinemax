import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaTicketAlt, FaMapMarkerAlt, FaHeart } from 'react-icons/fa';
import Modal from 'react-modal';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

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

const BookingContainer = styled.div`
  position: absolute;
  top: 60%; /* Ajustez cette valeur pour descendre un peu plus */
  left: 50px; /* Ajustez cette valeur pour placer la section au bon endroit */
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.85);
  padding: 20px 40px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
  animation: ${fadeIn} 0.5s ease-in-out;
  backdrop-filter: blur(10px);
`;

const TopSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const BookNowButton = styled.button`
  background-color: #ff9900;
  color: #fff;
  padding: 12px 30px;
  border: none;
  border-radius: 5px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #e68900;
    transform: translateY(-2px);
  }
`;

const BottomSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Dropdown = styled.select`
  padding: 12px;
  border-radius: 5px;
  border: none;
  font-size: 18px;
`;

const IconButton = styled.button`
  background-color: #444;
  color: #fff;
  padding: 12px 20px;
  border: none;
  border-radius: 5px;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #333;
    transform: translateY(-2px);
  }
`;

const cinemas = [
  { id: 1, name: 'Cinépolis' },
  { id: 2, name: 'Cinema 21' },
  { id: 3, name: 'Cinemark' },
  { id: 4, name: 'CGV' },
];

const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    height: '80%',
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
    border: 'none',
    borderRadius: '10px',
    padding: '0',
    overflow: 'hidden', /* Remove overflow to remove grey margin */
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
};

const CloseButton = styled.button`
  background-color: #ff9900;
  color: #fff;
  padding: 8px 40px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease, transform 0.3s ease;
  position: absolute;
  bottom: 20px;
  right: 20px;
  z-index: 1000;

  &:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
  }
`;

const MapWrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`;

const BookingSection = () => {
  const [selectedCinema, setSelectedCinema] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleCinemaChange = (event) => {
    setSelectedCinema(event.target.value);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const scrollToReservationForm = () => {
    const reservationForm = document.getElementById('reservationForm');
    if (reservationForm) {
      reservationForm.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.error("L'élément avec l'ID 'reservationForm' est introuvable.");
    }
  };

  return (
    <BookingContainer>
      <TopSection>
        <BookNowButton onClick={scrollToReservationForm}>
          <FaTicketAlt />
          Réserver maintenant
        </BookNowButton>
      </TopSection>
      <BottomSection>
        <Dropdown value={selectedCinema} onChange={handleCinemaChange}>
          <option value="">Sélectionnez votre cinéma</option>
          {cinemas.map(cinema => (
            <option key={cinema.id} value={cinema.name}>{cinema.name}</option>
          ))}
        </Dropdown>
        <IconButton onClick={() => window.location.href = '/favorites'}>
          <FaHeart />
          Cinémas favoris
        </IconButton>
        <IconButton onClick={openModal}>
          <FaMapMarkerAlt />
          Autour de moi
        </IconButton>
      </BottomSection>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalStyles}
        contentLabel="Carte de géolocalisation"
      >
        <MapWrapper>
          <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[51.505, -0.09]}>
              <Popup>
                Votre position actuelle
              </Popup>
            </Marker>
          </MapContainer>
          <CloseButton onClick={closeModal}>Fermer</CloseButton>
        </MapWrapper>
      </Modal>
    </BookingContainer>
  );
};

export default BookingSection;