import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaQuestionCircle, FaChevronDown } from 'react-icons/fa';

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

const HelpCenterSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1d1f21;
  padding: 50px;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  margin: 50px 20px;
  font-family: 'Poppins', sans-serif;
  overflow: hidden;
`;

const LeftColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  animation: ${fadeIn} 1s ease-in-out;
`;

const RightColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  animation: ${fadeIn} 1.2s ease-in-out;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ff9800;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  margin-bottom: 20px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const Title = styled.h2`
  font-size: 2.5rem;
  color: white;
  margin-bottom: 20px;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #ccc;
  margin-bottom: 20px;
`;

const HelpButton = styled.a`
  background-color: #ff9800;
  color: white;
  padding: 12px 20px;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: bold;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);

  &:hover {
    background-color: #e68900;
    transform: translateY(-3px);
    box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.5);
  }
`;

const FAQContainer = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 20px;
  margin-top: 20px;
  animation: ${fadeIn} 1.6s ease-in-out;
  backdrop-filter: blur(10px);
  overflow: hidden;
`;

const FAQItem = styled.div`
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease, max-height 0.6s ease, padding 0.3s ease;
  max-height: ${({ expanded }) => (expanded ? '200px' : '60px')};
  overflow: hidden;

  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
`;

const FAQQuestion = styled.div`
  font-size: 1.2rem;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: color 0.3s ease;

  &:hover {
    color: #ff9800;
  }
`;

const FAQAnswer = styled.div`
  font-size: 1rem;
  color: #ccc;
  margin-top: 10px;
  line-height: 1.5;
  opacity: ${({ expanded }) => (expanded ? '1' : '0')};
  transition: opacity 0.3s ease;
`;

const HelpCenter = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleFAQ = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  useEffect(() => {
    AOS.init();
  }, []);

  const faqs = [
    {
      question: "Quelles sont les expériences proposées par les cinémas Pathé ?",
      answer: "Les cinémas Pathé proposent des expériences variées telles que la 4DX, IMAX, et ScreenX pour une immersion totale."
    },
    {
      question: "Comment puis-je m'abonner au CinéPass ?",
      answer: "Pour vous abonner au CinéPass, vous pouvez visiter notre site web et choisir l'option d'abonnement qui vous convient."
    },
    {
      question: "Comment puis-je acheter une CinéCarte 5 places ?",
      answer: "Vous pouvez acheter une CinéCarte 5 places en ligne sur notre site web ou directement dans nos cinémas."
    }
  ];

  return (
    <HelpCenterSection>
      <LeftColumn data-aos="fade-right">
        <IconWrapper>
          <FaQuestionCircle size={30} color="white" />
        </IconWrapper>
        <Title>Vous avez une question ?</Title>
        <Subtitle>Accédez à notre Aide en ligne pour trouver la réponse.</Subtitle>
        <HelpButton href="#">
          Accéder au centre d'aide <FaQuestionCircle />
        </HelpButton>
      </LeftColumn>
      <RightColumn data-aos="fade-left">
        <FAQContainer>
          {faqs.map((faq, index) => (
            <FAQItem key={index} expanded={expandedIndex === index} onClick={() => toggleFAQ(index)}>
              <FAQQuestion>
                {faq.question} <FaChevronDown />
              </FAQQuestion>
              <FAQAnswer expanded={expandedIndex === index}>{faq.answer}</FAQAnswer>
            </FAQItem>
          ))}
        </FAQContainer>
      </RightColumn>
    </HelpCenterSection>
  );
};

export default HelpCenter;