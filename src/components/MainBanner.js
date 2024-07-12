import React from 'react';
import styled from 'styled-components';
import bannerImage from '../Asset/web-visuel-desktop-horizon.avif'; // Assurez-vous de fournir le bon chemin vers votre image

const BannerContainer = styled.div`
  position: relative;
  width: 100%;
  height: calc(100vh - 80px); /* Ajustez la hauteur selon la taille du header */
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