import React from 'react';
import styled from 'styled-components';
import MainBanner from '../components/MainBanner';
import BookingSection from '../components/BookingSection';
import FeaturedMovies from '../components/FeaturedMovies';
import PremiereSection from '../components/PremiereSection';
import AdSection from '../components/AdSection';
import HelpCenter from '../components/HelpCenter';

const HomePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const HomePage = () => {
  return (
    <HomePageContainer>
      <MainBanner />
      <BookingSection />
      <FeaturedMovies />
      <PremiereSection />
      <AdSection />
      <HelpCenter />
    </HomePageContainer>
  );
};

export default HomePage;