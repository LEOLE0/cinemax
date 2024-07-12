import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { auth } from '../firebase';
import { UserContext } from '../contexts/UserContext';

const backgroundAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(90deg, rgba(11, 15, 38, 1) 0%, rgba(33, 37, 55, 1) 100%);
  animation: ${backgroundAnimation} 10s infinite alternate;
  padding: 20px;
`;

const Form = styled.form`
  font-family: 'Poppins', sans-serif;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
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
  margin-bottom: 20px;
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
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 15px;
  width: 100%;
`;

const StyledButton = styled.button`
  background: ${({ bgColor }) => bgColor || 'transparent'};
  color: ${({ textColor }) => textColor || '#ff9800'};
  padding: ${({ padding }) => padding || '10px 20px'};
  font-size: ${({ fontSize }) => fontSize || '16px'};
  border: 1px solid #ff9800;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s, transform 0.3s, box-shadow 0.3s;
  width: ${({ width }) => width || 'auto'};
  text-align: center;

  &:hover {
    background: ${({ beforeBgColor }) => beforeBgColor || '#ff9800'};
    color: #fff;
    transform: scale(1.05);
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  margin-top: -10px;
`;

const Tabs = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
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
    <>
      
      <FormContainer>
        <Form onSubmit={handleSubmit}>
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

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <ButtonContainer>
            <StyledButton type="submit">Connexion</StyledButton>
          </ButtonContainer>
        </Form>
      </FormContainer>
    </>
  );
}

export default Connexion;