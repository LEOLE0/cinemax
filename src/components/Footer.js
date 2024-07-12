import React from 'react';
import styled from 'styled-components';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const FooterContainer = styled.footer`
  background: linear-gradient(90deg, rgba(11, 15, 38, 1) 0%, rgba(33, 37, 55, 1) 100%);
  color: #ffffff;
  text-align: center;
  padding: 50px 20px;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Links = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;

  a {
    color: #ffffff;
    text-decoration: none;
    margin: 0 15px;
    font-size: 18px;
    transition: color 0.3s, transform 0.3s;

    &:hover {
      color: #ff9800;
      transform: scale(1.1);
    }
  }
`;

const SocialIcons = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;

  a {
    color: #ffffff;
    font-size: 24px;
    margin: 0 10px;
    transition: color 0.3s, transform 0.3s;

    &:hover {
      color: #ff9800;
      transform: scale(1.2);
    }
  }
`;

const Address = styled.div`
  margin: 20px 0;
  font-size: 14px;
  color: #bbb;

  p {
    margin: 5px 0;
  }
`;

const Newsletter = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 10px;
  margin: 20px 0;
  width: 100%;
  max-width: 500px;
  text-align: left;

  h3 {
    margin-bottom: 10px;
    font-size: 20px;
    color: #ffffff;
  }

  input[type="email"] {
    width: calc(100% - 120px);
    padding: 10px;
    border: none;
    border-radius: 5px 0 0 5px;
    outline: none;
  }

  button {
    width: 100px;
    padding: 10px;
    background: #ff9800;
    border: none;
    border-radius: 0 5px 5px 0;
    color: #ffffff;
    cursor: pointer;
    transition: background 0.3s;

    &:hover {
      background: #e68900;
    }
  }
`;

const CopyRight = styled.p`
  margin-top: 20px;
  font-size: 14px;
  color: #bbb;
`;

function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <Links>
          <a href="/home">Accueil</a>
          <a href="/movies">Films</a>
          <a href="/about">À propos</a>
          <a href="/contact">Contact</a>
        </Links>
        <SocialIcons>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
        </SocialIcons>
        <Address>
          <p>1234 Cinéma Avenue, Paris, France</p>
          <p>Téléphone : +33 1 23 45 67 89</p>
          <p>Email : contact@cinecinemax.com</p>
        </Address>
        <Newsletter>
          <h3>Abonnez-vous à notre newsletter</h3>
          <div>
            <input type="email" placeholder="Votre adresse email" />
            <button>S'abonner</button>
          </div>
        </Newsletter>
        <CopyRight>
          © Tous droits réservés cinemax 2024
        </CopyRight>
      </FooterContent>
    </FooterContainer>
  );
}

export default Footer;