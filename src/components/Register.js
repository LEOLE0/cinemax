// src/components/Register.js
import React, { useState } from 'react';
import { register } from '../api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    nom_utilisateur: '',
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await register(formData);
      setMessage('Inscription réussie');
      localStorage.setItem('token', data.token);
      navigate('/home');
    } catch (error) {
      setMessage('Erreur lors de l\'inscription');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nom d'utilisateur:</label>
        <input type="text" name="nom_utilisateur" value={formData.nom_utilisateur} onChange={handleChange} required />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </div>
      <div>
        <label>Mot de passe:</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} required />
      </div>
      <button type="submit">S'inscrire</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default Register;