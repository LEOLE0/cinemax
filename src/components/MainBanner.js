// src/components/MainBanner.js
import React from 'react';
import styled from 'styled-components';
import bannerImage from '../assets/banner.avif'; // Assurez-vous de fournir le bon chemin vers votre image

const BannerContainer = styled.div`
  position: relative;
  width: 100%;
  height: calc(100vh - 80px); /* Ajustez la hauteur selon la taille du header */
@media (max-width: 768px) {
    height: 300px;
  }

`;

const BannerImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const MainBanner = () => {
  return (
    <BannerContainer>
      <BannerImage src={bannerImage} alt="Banner" />
    </BannerContainer>
  );
};

export default MainBanner;