import React, { useState } from 'react';

function ReservationForm() {
  const [reservation, setReservation] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
    location: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReservation({ ...reservation, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Reservation submitted!');
  };

  return (
    <div style={styles.reservationSection}>
      <h2 style={styles.reservationTitle}>Réservation de cinéma</h2>
      <form style={styles.form} onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="name">Nom</label>
          <input
            style={styles.input}
            type="text"
            id="name"
            name="name"
            value={reservation.name}
            onChange={handleChange}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="email">Email</label>
          <input
            style={styles.input}
            type="email"
            id="email"
            name="email"
            value={reservation.email}
            onChange={handleChange}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="date">Date</label>
          <input
            style={styles.input}
            type="date"
            id="date"
            name="date"
            value={reservation.date}
            onChange={handleChange}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="time">Heure</label>
          <input
            style={styles.input}
            type="time"
            id="time"
            name="time"
            value={reservation.time}
            onChange={handleChange}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="location">Cinéma</label>
          <select
            style={styles.select}
            id="location"
            name="location"
            value={reservation.location}
            onChange={handleChange}
            required
          >
            <option value="">Sélectionnez un cinéma</option>
            <option value="Pathé Saint-Denis">Pathé Saint-Denis</option>
            <option value="Pathé Belle Épine">Pathé Belle Épine</option>
            <option value="Pathé La Villette">Pathé La Villette</option>
          </select>
        </div>
        <button type="submit" style={styles.submitButton}>Réserver</button>
      </form>
    </div>
  );
}

const styles = {
  reservationSection: {
    width: '90%',
    backgroundColor: 'orange',
    padding: '20px',
    marginTop: '20px',
    borderRadius: '10px',
    color: '#333',
  },
  reservationTitle: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '1.5em',
    color: '#002147',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  formGroup: {
    marginBottom: '15px',
    width: '100%',
    maxWidth: '400px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    color: '#002147',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  select: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  submitButton: {
    backgroundColor: '#002147',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  submitButtonHover: {
    backgroundColor: '#004080',
  },
};

export default ReservationForm;
