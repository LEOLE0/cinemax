// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaHome, FaHeart, FaUser } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';
import logo from '../assets/logo.png'; // Assurez-vous que le chemin est correct

const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background: rgba(11, 15, 38, 1);
  width: 100%;
  position: fixed; /* Navbar fixée en haut de la page */
  top: 0;
  left: 0;
  z-index: 1000;

   @media (max-width: 438px) {
    flex-direction: column;
    width: 100vw;
  }
`;

const Logo = styled.img`
  height: 60px; /* Ajustez la taille du logo selon vos besoins */
`;

const IconsContainer = styled.div`
  display: flex;
  gap: 80px;
`;

const IconLink = styled(Link)`
  color: #ecf0f1;
  font-size: 24px;
  transition: color 0.3s;

  &:hover {
    color: #3498db;
  }
`;



const Navbar = () => {
  const { user } = React.useContext(AuthContext);
  const navigate = useNavigate();

  const handleAccountClick = () => {
    if (user) {
      navigate('/profile'); // Redirige vers la page de profil
    } else {
      navigate('/inscription-connexion'); // Redirige vers la page d'inscription/connexion
    }
  };

  return (
    <NavbarContainer>
      <Logo src={logo} alt="Logo Cinémax" />
      <IconsContainer>
        <IconLink to="/home">
          <FaHome />
        </IconLink>
        <IconLink to="/favorites">
          <FaHeart />
        </IconLink>
        <IconLink as="div" onClick={handleAccountClick}>
          <FaUser />
        </IconLink>
      </IconsContainer>
    </NavbarContainer>
  );
};

export default Navbar;