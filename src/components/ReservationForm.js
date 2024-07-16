import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';

const FormContainer = styled.div`
  background: linear-gradient(105deg, #111 10%, #002 60%);
  padding: 40px;
  width: 60vw;
  margin: 90px auto;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  border-radius: 10px;

 @media (max-width: 768px) {
    width: 90vw;
  }

`;

const FormTitle = styled.h2`
  text-align: center;
  margin-bottom: 30px;
  color: #fff;
  font-size: 2rem;
`;

const FormField = styled.div`
  margin-bottom: 50px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  color: #fff;
  font-weight: bold;
  font-size: 1.5rem;
`;

const Input = styled.input`
  background: #cfcfcf;
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
`;

const SelectContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const SelectCard = styled.div`
  background: #757575;
  color: #fff;
  font-size: 1.2rem;
  padding: 30px;
  border-radius: 5px;
  width: 30%;
  margin: 10px 0;
  text-align: center;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #ff9900;
    color: #fff;
    transform: translateY(-2px);
  }

  &.selected {
    background-color: #ff9900;
    color: #fff;
  }

   @media (max-width: 768px) {
    font-size: 8px;
  }
`;

const TimeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

   @media (max-width: 768px) {
    width: 75vw;
  }
`;

const TimeCard = styled.div`
  background: #757575;
  color: #fff;
  padding: 20px;
  border-radius: 5px;
  width: 22%;
  margin: 10px 0;
  text-align: center;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #ff9900;
    color: #fff;
    transform: translateY(-2px);
  }

  &.selected {
    background-color: #ff9900;
    color: #fff;
  }
`;

const SubmitButton = styled.button`
  background-color: #ff9900; 
  color: #fff;
  padding: 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  width: 20vw;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #ff9900;
    transform: translateY(-2px);
  }
     @media (max-width: 768px) {
    width: 70vw;
  }
`;

const ModalContent = styled.div`
  background-color: #c9c9c9;
  height: 76vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 50px;
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  margin-top: 6%;
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
  margin: 50px 0;
  font-size: 1.4rem;
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
  const [horaires] = useState(['10:00', '14:00', '18:00', '21:00', '23:45']);
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

  const handleSelect = (name, value) => {
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
    setFormData({
      nom: '',
      film: '',
      salle: '',
      horaire: '',
    });
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
        setModalIsOpen(false);
        setFormData({
          nom: '',
          film: '',
          salle: '',
          horaire: '',
        }); // Réinitialiser le formulaire
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
      <FormTitle>Réservez votre Séance MAX</FormTitle>
      <form onSubmit={handleSubmit}>
        <FormField>
          <Label htmlFor="nom">Nom</Label>
          <Input
            type="text"
            id="nom"
            name="nom"
            value={formData.nom}
            onChange={(e) => handleSelect('nom', e.target.value)}
            required
          />
        </FormField>
        <FormField>
          <Label>Film</Label>
          <SelectContainer>
            {films.map((film) => (
              <SelectCard
                key={film.film_id}
                className={formData.film === film.film_id ? 'selected' : ''}
                onClick={() => handleSelect('film', film.film_id)}
              >
                {film.titre}
              </SelectCard>
            ))}
          </SelectContainer>
        </FormField>
        <FormField>
          <Label>Salle</Label>
          <SelectContainer>
            {salles.map((salle) => (
              <SelectCard
                key={salle.salle_id}
                className={formData.salle === salle.salle_id ? 'selected' : ''}
                onClick={() => handleSelect('salle', salle.salle_id)}
              >
                {salle.nom_salle}
              </SelectCard>
            ))}
          </SelectContainer>
        </FormField>
        <FormField>
          <Label>Horaire</Label>
          <TimeContainer>
            {horaires.map((horaire) => (
              <TimeCard
                key={horaire}
                className={formData.horaire === horaire ? 'selected' : ''}
                onClick={() => handleSelect('horaire', horaire)}
              >
                {horaire}
              </TimeCard>
            ))}
          </TimeContainer>
        </FormField>
        <SubmitButton type="submit">Réserver maintenant</SubmitButton>
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