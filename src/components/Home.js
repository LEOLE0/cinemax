// // src/components/Home.js
// import React, { useContext, useEffect, useState } from 'react';
// import { AuthContext } from '../context/AuthContext';
// import { getFilms } from '../api';

// const Home = () => {
//   const { user, logout } = useContext(AuthContext);
//   const [films, setFilms] = useState([]);

//   useEffect(() => {
//     const fetchFilms = async () => {
//       try {
//         const filmsData = await getFilms();
//         setFilms(filmsData);
//       } catch (error) {
//         console.error('Erreur lors de la récupération des films:', error);
//       }
//     };

//     fetchFilms();
//   }, []);

//   return (
//     <div>
//       <h1>Bienvenue, {user ? user.nom_utilisateur : 'Utilisateur'}</h1>
//       <button onClick={logout}>Se déconnecter</button>
//       <h2>Liste des Films</h2>
//       <ul>
//         {films.map(film => (
//           <li key={film.film_id}>
//             {film.titre} - {film.date_sortie}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Home;


