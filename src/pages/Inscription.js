// Inscription.js
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { FaUser, FaEnvelope, FaLock, FaPhone } from 'react-icons/fa';
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

const Row = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

const HalfInputDiv = styled.div`
  flex: 1;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 10px;
  background: #ccc;
  border-radius: 5px;
  margin-bottom: 20px;
  overflow: hidden;

  &::before {
    content: '';
    display: block;
    height: 100%;
    width: ${(props) => props.progress}%;
    background: #ff9800;
    transition: width 0.3s ease;
  }
`;

const PasswordStrength = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: -10px;
  margin-bottom: 20px;
  font-size: 0.8rem;
  color: ${props => props.strengthColor};
`;

const PasswordStrengthIndicator = styled.div`
  width: 20%;
  height: 5px;
  background: ${props => props.strengthColor};
  border-radius: 5px;
  transition: all 0.3s;
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
  const [progress, setProgress] = useState(0);
  const [passwordStrength, setPasswordStrength] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    updateProgress();
    if (name === 'password') {
      checkPasswordStrength(value);
    }
  };

  const updateProgress = () => {
    const filledFields = Object.values(formData).filter(value => value.trim() !== '').length;
    const totalFields = Object.keys(formData).length;
    setProgress((filledFields / totalFields) * 100);
  };

  const checkPasswordStrength = (password) => {
    let strength = 'faible';
    let color = 'red';
    if (password.length > 8 && /[A-Z]/.test(password) && /[0-9]/.test(password)) {
      strength = 'fort';
      color = 'green';
    } else if (password.length > 6 && /[A-Z]/.test(password)) {
      strength = 'moyen';
      color = 'orange';
    }
    setPasswordStrength({ strength, color });
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
      await updateProfile(user, {
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
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <ProgressBar progress={progress} />
        <Row>
          <HalfInputDiv>
            <Label htmlFor="firstName">Prénom</Label>
            <InputGroup>
              <Icon><FaUser /></Icon>
              <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
            </InputGroup>
          </HalfInputDiv>
          <HalfInputDiv>
            <Label htmlFor="lastName">Nom</Label>
            <InputGroup>
              <Icon><FaUser /></Icon>
              <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
            </InputGroup>
          </HalfInputDiv>
        </Row>
        <Row>
          <HalfInputDiv>
            <Label htmlFor="phone">Numéro de téléphone</Label>
            <InputGroup>
              <Icon><FaPhone /></Icon>
              <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} required />
            </InputGroup>
          </HalfInputDiv>
        </Row>
        <Label htmlFor="email">Email</Label>
        <InputGroup>
          <Icon><FaEnvelope /></Icon>
          <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required />
        </InputGroup>

        <Label htmlFor="password">Mot de passe</Label>
        <InputGroup>
          <Icon><FaLock /></Icon>
          <Input id="password" name="password" type="password" value={formData.password} onChange={handleInputChange} required />
        </InputGroup>
        <PasswordStrength strengthColor={passwordStrength.color}>
          <PasswordStrengthIndicator strengthColor={passwordStrength.color} />
          <PasswordStrengthIndicator strengthColor={passwordStrength.color} />
          <PasswordStrengthIndicator strengthColor={passwordStrength.color} />
          <PasswordStrengthIndicator strengthColor={passwordStrength.color} />
          <PasswordStrengthIndicator strengthColor={passwordStrength.color} />
        </PasswordStrength>
        
        <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
        <InputGroup>
          <Icon><FaLock /></Icon>
          <Input id="confirmPassword" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleInputChange} required />
        </InputGroup>

        <ButtonContainer>
          <StyledButtonPrimary 
            bgColor="transparent" 
            textColor="#ff9800" 
            beforeBgColor="#ff9800"
            padding="17px 5rem"
            fontSize="13px"
            width="50%"
            type="submit">Inscription</StyledButtonPrimary>
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

export default Inscription;