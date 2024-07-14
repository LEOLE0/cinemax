// src/pages/InscriptionConnexion.js
import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Connexion from '../components/Connexion';
import Inscription from '../components/Inscription';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import backgroundImg from '../assets/kong.jpg';

const backgroundAnimation = keyframes`
  // 0% { background-position: 0% 50%; }
  // 50% { background-position: 100% 50%; }
  // 100% { background-position: 0% 50%; }
`;

const PageContainer = styled.div`

  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background: url(${props => props.$backgroundImage}) center/cover no-repeat;
  // animation: ${backgroundAnimation} 10s infinite alternate;
  margin: 0; /* Supprime la marge blanche autour de la page */
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  // max-width: 1200px;
  padding: 80px;
  margin-top: 100px;
`;

const Tabs = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 0px;
`;

const Tab = styled.button`
  padding: 10px 20px;
  cursor: pointer;
  opacity: 0.6;
  background: white;
  border: none;
  outline: none;
  font-size: 28px;
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  color: rgba(11, 15, 38);
  border-bottom: ${(props) => (props.active ? "4px solid darkblue" : "none")};

  &:hover {
    opacity: 1;
  }
`;

const InscriptionConnexion = () => {
  const [activeTab, setActiveTab] = useState('connexion');

  return (
    <PageContainer $backgroundImage={backgroundImg}>
      <Navbar />
      <ContentContainer>
        <Tabs>
          <Tab active={activeTab === 'connexion'} onClick={() => setActiveTab('connexion')}>
            Connexion
          </Tab>
          <Tab active={activeTab === 'inscription'} onClick={() => setActiveTab('inscription')}>
            Inscription
          </Tab>
        </Tabs>
        {activeTab === 'connexion' ? <Connexion /> : <Inscription />}
      </ContentContainer>
      <Footer />
    </PageContainer>
  );
};

export default InscriptionConnexion;