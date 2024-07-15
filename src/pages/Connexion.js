import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { auth } from '../firebase';
import { UserContext } from '../contexts/UserContext';

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(90deg, rgba(11, 15, 38, 1) 0%, rgba(33, 37, 55, 1) 100%);
`;

const Form = styled.form`
  font-family: 'Poppins', sans-serif;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 90%;
  max-width: 500px;
  padding: 30px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.18);
`;

const InputGroup = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const Icon = styled.div`
  position: absolute;
  left: 10px;
  color: #bbb;
`;

const Input = styled.input`
  padding: 12px 12px 12px 40px;
  font-size: 16px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.3);
  color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;

  &:hover, &:focus {
    border-color: #ff9800;
    box-shadow: 0 0 8px rgba(255, 152, 0, 0.5);
  }

  &::placeholder {
    color: #bbb;
  }
`;

const Label = styled.label`
  font-weight: 600;
  color: #ffffff;
  align-self: flex-start;
  margin-bottom: 5px;
  &:after {
    content: " *";
    color: red;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 15px;
  width: 100%;
`;

const StyledButtonPrimary = styled.button`
  background: ${({ bgColor }) => bgColor || '#ff9800'};
  color: ${({ textColor }) => textColor || '#fff'};
  padding: ${({ padding }) => padding || '10px 20px'};
  font-size: ${({ fontSize }) => fontSize || '16px'};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s, transform 0.3s, box-shadow 0.3s;
  position: relative;
  overflow: hidden;
  z-index: 1;
  width: ${({ width }) => width || 'auto'};

  &:hover {
    background: ${({ bgColor }) => bgColor || '#ff9800'};
    transform: scale(1.05);
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.5);
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ beforeBgColor }) => beforeBgColor || '#ff9800'};
    transition: transform 0.3s ease;
    z-index: -1;
    transform: scaleX(0);
    transform-origin: left;
  }

  &:hover:before {
    transform: scaleX(1);
  }
`;

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  margin-top: -10px;
`;

function Connexion() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      setUser({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || '',
      });
      navigate('/home'); // Redirige vers HomePage après une connexion réussie
    } catch (error) {
      console.error("Erreur de connexion:", error);
      setError("Erreur lors de la connexion: " + error.message);
    }
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Label htmlFor="email">Email</Label>
        <InputGroup>
          <Icon><FaEnvelope /></Icon>
          <Input id="email" name="email" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </InputGroup>

        <Label htmlFor="password">Mot de passe</Label>
        <InputGroup>
          <Icon><FaLock /></Icon>
          <Input id="password" name="password" type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </InputGroup>

        <ButtonContainer>
          <StyledButtonPrimary 
            bgColor="transparent" 
            textColor="#ff9800" 
            beforeBgColor="#ff9800"
            padding="17px 5rem"
            fontSize="13px"
            width="50%"
            type="submit">Connexion</StyledButtonPrimary>
          <Link to="/" style={{ width: "50%", textDecoration: 'none' }}>
            <StyledButtonPrimary 
              bgColor="transparent" 
              textColor="#ff9800" 
              beforeBgColor="#ff9800"
              padding="17px 5rem"
              fontSize="13px"
              width="100%"
              type="button">Annuler</StyledButtonPrimary>
          </Link>
        </ButtonContainer>
      </Form>
    </FormContainer>
  );
}

export default Connexion;