import React from 'react';
import ReservationForm from '../compenents/ReservationForm';

function Home5() {
  const film = {
    title: 'Mission: Impossible – Dead Reckoning Part One',
    description: 'Tom Cruise revient en tant qu\'Ethan Hunt dans une nouvelle mission pleine de suspense et d\'action, réalisée par Christopher McQuarrie.',
    image: '/Images/6Mission.jpg',
    releaseDate: 'Sortie : 12 juillet 2023',
    cast: 'Avec Tom Cruise, Rebecca Ferguson, Simon Pegg',
    duration: '2h40',
    genre: 'Action/Thriller',
    rating: '👍 4,5K · 13+',
    video: 'https://www.youtube.com/watch?v=video-id'
  };

  return (
    <div style={styles.container}>
      <div style={styles.contentSection}>
        <div style={styles.poster}>
          <img
            src={film.image}
            alt={film.title}
            style={styles.posterImage}
          />
        </div>
        <div style={styles.details}>
          <span style={styles.newBadge}>Nouveau</span>
          <h1 style={styles.title}>{film.title}</h1>
          <p style={styles.rating}>{film.rating} · {film.duration} · {film.genre}</p>
          <p style={styles.releaseDate}>{film.releaseDate}</p>
          <p style={styles.cast}>Avec {film.cast}</p>
          <p style={styles.description}>{film.description}</p>
          <div style={styles.actions}>
            <button style={styles.button}>➕ Ma liste</button>
            <button style={styles.button}>👍 Noter</button>
          </div>
        </div>
        <div style={styles.videoContainer}>
          <video style={styles.video} controls>
            <source src={film.video} type="video/mp4" />
            Votre navigateur ne supporte pas la balise vidéo.
          </video>
        </div>
        </div>
      <ReservationForm/>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    color: 'white',
    background: 'linear-gradient(to right, #002147, #004080)',
    fontFamily: 'Arial, sans-serif',
    minHeight: '100vh',
    flexWrap: 'wrap',
  },
  contentSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: '20px',
    width: '100%',
  },
  poster: {
    marginRight: '20px',
  },
  posterImage: {
    width: '200px',
    borderRadius: '10px',
  },
  details: {
    flex: '1',
    marginRight: '20px',
  },
  newBadge: {
    display: 'inline-block',
    backgroundColor: 'red',
    color: 'white',
    padding: '2px 8px',
    borderRadius: '4px',
    marginBottom: '10px',
    fontSize: '0.8em',
  },
  title: {
    fontSize: '2.2em',
    margin: '10px 0',
  },
  rating: {
    margin: '10px 0',
    fontSize: '1em',
  },
  releaseDate: {
    margin: '10px 0',
    fontSize: '1em',
  },
  cast: {
    margin: '10px 0',
    fontSize: '1em',
  },
  description: {
    margin: '10px 0',
    fontSize: '1em',
    lineHeight: '1.4em',
  },
  actions: {
    marginTop: '20px',
    display: 'flex',
    gap: '10px',
  },
  button: {
    backgroundColor: 'orange',
    border: 'none',
    color: 'black',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#e6b800',
  },
  videoContainer: {
    flex: '2',
  },
  video: {
    width: '98%',
    maxWidth: '800px',
    borderRadius: '20px',
  },
};

export default Home5;
