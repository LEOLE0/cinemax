import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';

const FormContainer = styled.div`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  padding: 20px;
  width: 70%;
  margin: 50px auto;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const FormTitle = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const FormField = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const SubmitButton = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 12px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
  }
`;

const ModalContent = styled.div`
  
  
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 100%;
  justify-content: space-between;
  padding: 50px;

`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

const ModalButton = styled.button`
  background-color: #ff9900;
  color: #fff;
  padding: 10px 70px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  margin: 10px;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
  }
`;

const RecapItem = styled.p`
  margin: 35px 0;
`;

const ReservationForm = () => {
  const [formData, setFormData] = useState({
    nom: '',
    film: '',
    salle: '',
    horaire: '',
  });
  const [films, setFilms] = useState([]);
  const [salles, setSalles] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [recapData, setRecapData] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch films
    fetch('http://localhost:5001/api/films')
      .then((response) => response.json())
      .then((data) => setFilms(data))
      .catch((error) => console.error('Error fetching films:', error));

    // Fetch salles
    fetch('http://localhost:5001/api/salles')
      .then((response) => response.json())
      .then((data) => setSalles(data))
      .catch((error) => console.error('Error fetching salles:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setRecapData(formData);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleConfirm = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/reservation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        closeModal();
        navigate('/profile'); // Redirige vers le profil après la soumission
      } else {
        console.error('Erreur lors de la soumission du formulaire');
      }
    } catch (err) {
      console.error('Erreur lors de la soumission du formulaire:', err);
    }
  };

  return (
    <FormContainer>
      <FormTitle>Formulaire de Réservation</FormTitle>
      <form onSubmit={handleSubmit}>
        <FormField>
          <Label htmlFor="nom">Nom</Label>
          <Input
            type="text"
            id="nom"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            required
          />
        </FormField>
        <FormField>
          <Label htmlFor="film">Film</Label>
          <Select
            id="film"
            name="film"
            value={formData.film}
            onChange={handleChange}
            required
          >
            <option value="">Sélectionnez un film</option>
            {films.map((film) => (
              <option key={film.film_id} value={film.film_id}>
                {film.titre}
              </option>
            ))}
          </Select>
        </FormField>
        <FormField>
          <Label htmlFor="salle">Salle</Label>
          <Select
            id="salle"
            name="salle"
            value={formData.salle}
            onChange={handleChange}
            required
          >
            <option value="">Sélectionnez une salle</option>
            {salles.map((salle) => (
              <option key={salle.salle_id} value={salle.salle_id}>
                {salle.nom_salle}
              </option>
            ))}
          </Select>
        </FormField>
        <FormField>
          <Label htmlFor="horaire">Horaire</Label>
          <Select
            id="horaire"
            name="horaire"
            value={formData.horaire}
            onChange={handleChange}
            required
          >
            <option value="">Sélectionnez un horaire</option>
            <option value="10:00">10:00</option>
            <option value="14:00">14:00</option>
            <option value="18:00">18:00</option>
            <option value="21:00">21:00</option>
            <option value="23:45">23:45</option>
          </Select>
        </FormField>
        <SubmitButton type="submit">Réserver</SubmitButton>
      </form>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            height: '80%',
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            border: 'none',
            borderRadius: '10px',
            padding: '20px',
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
          },
        }}
        contentLabel="Récapitulatif de Réservation"
      >
        {recapData && (
  <ModalContent>
    <div>
      <h2>Récapitulatif de la Réservation</h2>
      <RecapItem><strong>Nom:</strong> {recapData.nom}</RecapItem>
      <RecapItem><strong>Film:</strong> {films.find(film => film.film_id === parseInt(recapData.film))?.titre}</RecapItem>
      <RecapItem><strong>Salle:</strong> {salles.find(salle => salle.salle_id === parseInt(recapData.salle))?.nom_salle}</RecapItem>
      <RecapItem><strong>Horaire:</strong> {recapData.horaire}</RecapItem>
      <RecapItem><strong>Prix:</strong> 10.00 €</RecapItem>
    </div>
    <ModalButtons>
      <ModalButton onClick={handleConfirm}>Payer</ModalButton>
      <ModalButton onClick={closeModal}>Annuler</ModalButton>
    </ModalButtons>
  </ModalContent>
)}
      </Modal>
    </FormContainer>
  );
};

export default ReservationForm;