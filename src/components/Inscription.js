// src/components/Inscription.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { register } from '../api'; // Utilisation de l'API pour s'inscrire
import { AuthContext } from '../context/AuthContext';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
`;

const Form = styled.form`
  font-family: 'Poppins', sans-serif;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 600px;
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
  width: 100%;
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

function Inscription() {
  const navigate = useNavigate();
  const { login: loginContext } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }
    try {
      const data = await register(formData);
      loginContext(data.token); // Se connecter automatiquement après l'inscription
      navigate('/home'); // Redirige vers HomePage après une inscription réussie
    } catch (error) {
      console.error("Erreur d'inscription:", error);
      setError("Erreur lors de l'inscription: " + error.message);
    }
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <div style={{ width: '100%' }}>
          <Label htmlFor="nom">Nom</Label>
          <InputGroup>
            <Icon><FaUser /></Icon>
            <Input id="nom" name="nom" value={formData.nom} onChange={handleInputChange} placeholder="Nom" required />
          </InputGroup>
        </div>
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
        
        {error && <ErrorMessage>{error}</ErrorMessage>}

        <ButtonContainer>
          <StyledButton type="submit">Inscription</StyledButton>
          <StyledButton type="button" onClick={() => navigate('/home')}>Annuler</StyledButton>
        </ButtonContainer>
      </Form>
    </FormContainer>
  );
}

export default Inscription;