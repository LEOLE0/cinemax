import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FaTicketAlt, FaPlus, FaMapMarkerAlt, FaHeart } from 'react-icons/fa';

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

const AddButton = styled.button`
  background-color: #555;
  color: #fff;
  padding: 12px;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  cursor: pointer;
  margin-left: 15px;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #444;
    transform: translateY(-2px);
  }
`;

const BottomSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const LocationButton = styled.button`
  background-color: #ff9900;
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
    background-color: #e68900;
    transform: translateY(-2px);
  }
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

const BookingSection = () => {
  return (
    <BookingContainer>
      <TopSection>
        <BookNowButton>
          <FaTicketAlt />
          Réserver maintenant
        </BookNowButton>
        <AddButton>
          <FaPlus />
        </AddButton>
      </TopSection>
      <BottomSection>
        <LocationButton>
          Où ?
        </LocationButton>
        <Dropdown>
          <option value="">Sélectionnez votre cinéma</option>
        </Dropdown>
        <IconButton>
          <FaMapMarkerAlt />
          Autour de moi
        </IconButton>
        <IconButton>
          <FaHeart />
          Cinémas favoris
        </IconButton>
      </BottomSection>
    </BookingContainer>
  );
};

export default BookingSection;