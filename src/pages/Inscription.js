import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FaUser, FaEnvelope, FaLock, FaPhone } from 'react-icons/fa';
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

function Inscription() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;
      await user.updateProfile({
        displayName: `${formData.firstName} ${formData.lastName}`
      });
      setUser({
        uid: user.uid,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email
      });
      navigate('/home'); // Redirige vers HomePage après une inscription réussie
    } catch (error) {
      console.error("Erreur d'inscription:", error);
      alert("Erreur lors de l'inscription: " + error.message);
    }
  };

  return (
    <>
     
      <FormContainer>
        <Form onSubmit={handleSubmit}>
          <Label htmlFor="firstName">Prénom</Label>
          <InputGroup>
            <Icon><FaUser /></Icon>
            <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="Prénom" required />
          </InputGroup>
          <Label htmlFor="lastName">Nom</Label>
          <InputGroup>
            <Icon><FaUser /></Icon>
            <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Nom" required />
          </InputGroup>
          <Label htmlFor="phone">Numéro de téléphone</Label>
          <InputGroup>
            <Icon><FaPhone /></Icon>
            <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} placeholder="Numéro de téléphone" required />
          </InputGroup>

          <Label htmlFor="email">Email</Label>
          <InputGroup>
            <Icon><FaEnvelope /></Icon>
            <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="Email" required />
          </InputGroup>

          <Label htmlFor="password">Mot de passe</Label>
          <InputGroup>
            <Icon><FaLock /></Icon>
            <Input id="password" name="password" type="password" value={formData.password} onChange={handleInputChange} placeholder="Mot de passe" required />
          </InputGroup>
          <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
          <InputGroup>
            <Icon><FaLock /></Icon>
            <Input id="confirmPassword" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleInputChange} placeholder="Confirmer le mot de passe" required />
          </InputGroup>

          <ButtonContainer>
            <StyledButton type="submit">Inscription</StyledButton>
            <Link to="/" style={{ width: "50%", textDecoration: 'none' }}>
              <StyledButton type="button">Annuler</StyledButton>
            </Link>
          </ButtonContainer>
        </Form>
      </FormContainer>
    </>
  );
}

export default Inscription;