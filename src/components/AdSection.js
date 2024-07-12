import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import AOS from 'aos';
import 'aos/dist/aos.css';
import bgVideo from '../Asset/6363f65c00474db467bed81b_Screen Recording 2022-11-03 at 11018 PM-transcode.mp4'; // Assurez-vous de fournir le bon chemin vers votre vidéo

const Section = styled.section`
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  display: flex;
  color: #ffffff;
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  align-items: center;
  justify-content: center;
`;

const parallax = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
`;

const VideoBackground = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
  animation: ${parallax} 10s infinite;

  &:hover {
    filter: blur(5px) brightness(0.7);
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5); /* Overlay sombre pour améliorer la lisibilité du texte */
  z-index: 0;
`;

const ContentWrapper = styled.div`
  z-index: 1;
  padding: 50px;
  text-align: center;
  margin: auto;
  max-width: 800px;
`;

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-20px);
  }
  60% {
    transform: translateY(-10px);
  }
`;

const fadeInDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Title = styled.h2`
  color: #dedede;
  font-size: 3rem;
  margin-bottom: 30px;
  animation: ${bounce} 2s infinite, ${fadeInDown} 1s ease-in-out 0.5s both;
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Content = styled.p`
  background: rgba(255, 152, 0, 0.8);
  border-radius: 10px;
  color: #ffffff;
  text-align: center;
  padding: 20px;
  font-size: 1.5rem;
  margin-bottom: 30px;
  animation: ${fadeInUp} 1s ease-in-out 1s both;
`;

const pulse = keyframes`
  0% {
    box-shadow: 0 0 10px rgba(0, 123, 255, 0.7);
  }
  50% {
    box-shadow: 0 0 20px rgba(0, 123, 255, 1);
  }
  100% {
    box-shadow: 0 0 10px rgba(0, 123, 255, 0.7);
  }
`;

const GlowButton = styled.a`
  display: inline-block;
  padding: 15px 30px;
  border-radius: 5px;
  background: linear-gradient(45deg, #ff9800, #e68900);
  color: #ffffff;
  font-size: 1.2rem;
  text-decoration: none;
  transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
  animation: ${pulse} 1.5s infinite;

  &:hover {
    background: linear-gradient(45deg, #e68900, #ff9800);
    transform: scale(1.05);
    box-shadow: 0 0 20px rgba(0, 123, 255, 0.7);
  }
`;

const ParticleEffect = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;

  @keyframes move {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(-100%);
    }
  }

  .particle {
    position: absolute;
    bottom: -10px;
    width: 10px;
    height: 10px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 50%;
    animation: move 5s linear infinite;
  }

  .particle:nth-child(1) {
    left: 10%;
    animation-duration: 5s;
    animation-delay: 0s;
  }

  .particle:nth-child(2) {
    left: 20%;
    animation-duration: 7s;
    animation-delay: 1s;
  }

  .particle:nth-child(3) {
    left: 30%;
    animation-duration: 6s;
    animation-delay: 2s;
  }

  .particle:nth-child(4) {
    left: 40%;
    animation-duration: 8s;
    animation-delay: 3s;
  }

  .particle:nth-child(5) {
    left: 50%;
    animation-duration: 6s;
    animation-delay: 4s;
  }

  .particle:nth-child(6) {
    left: 60%;
    animation-duration: 7s;
    animation-delay: 5s;
  }

  .particle:nth-child(7) {
    left: 70%;
    animation-duration: 5s;
    animation-delay: 6s;
  }

  .particle:nth-child(8) {
    left: 80%;
    animation-duration: 6s;
    animation-delay: 7s;
  }

  .particle:nth-child(9) {
    left: 90%;
    animation-duration: 8s;
    animation-delay: 8s;
  }
`;

const AdSection = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <Section>
      <VideoBackground autoPlay loop muted>
        <source src={bgVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </VideoBackground>
      <Overlay />
      <ParticleEffect>
        {[...Array(9)].map((_, i) => (
          <div key={i} className="particle"></div>
        ))}
      </ParticleEffect>
      <ContentWrapper>
        <Title data-aos="fade-down">Découvrez notre nouvelle collection!</Title>
        <Content data-aos="fade-up">
          Nos produits sont conçus pour offrir le meilleur confort et performance. 
          Explorez maintenant et trouvez ce qui vous convient le mieux!
        </Content>
        <GlowButton href="/shop" data-aos="zoom-in">Shop Now</GlowButton>
      </ContentWrapper>
    </Section>
  );
};

export default AdSection;