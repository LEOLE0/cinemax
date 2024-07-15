// src/pages/HomePage.js
import React from 'react';
import styled from 'styled-components';
import MainBanner from '../components/MainBanner';
import BookingSection from '../components/BookingSection';
import FeaturedMovies from '../components/FeaturedMovies';
import PremiereSection from '../components/PremiereSection';
import AdSection from '../components/ReservationForm';
import HelpCenter from '../components/HelpCenter';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f0f0f0;
  padding-top: 80px; /* Ajout d'un padding-top pour éviter que la navbar chevauche le contenu */
`;

const HomePage = () => {
  return (
    <PageContainer>
      <Navbar />
      <MainBanner />
      <BookingSection />
      <FeaturedMovies />
      <PremiereSection />
      <AdSection />
      <HelpCenter />
      <Footer />
    </PageContainer>
  );
};

export default HomePage;