// // src/components/Login.js
// import React, { useState, useContext } from 'react';
// import { login } from '../api';
// import { AuthContext } from '../context/AuthContext';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });
//   const [message, setMessage] = useState('');
//   const { login: loginContext } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const data = await login(formData);
//       setMessage('Connexion réussie');
//       loginContext(data.token);
//       navigate('/home');
//     } catch (error) {
//       setMessage('Erreur lors de la connexion');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label>Email:</label>
//         <input type="email" name="email" value={formData.email} onChange={handleChange} required />
//       </div>
//       <div>
//         <label>Mot de passe:</label>
//         <input type="password" name="password" value={formData.password} onChange={handleChange} required />
//       </div>
//       <button type="submit">Se connecter</button>
//       {message && <p>{message}</p>}
//     </form>
//   );
// };

// export default Login;