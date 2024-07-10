// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const helmet = require('helmet');
// const { Pool } = require('pg');
// require('dotenv').config();

// const app = express();
// const port = process.env.PORT || 5001;

// const pool = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_DATABASE,
//   password: process.env.DB_PASSWORD,
//   port: process.env.DB_PORT,
// });

// app.use(cors());
// app.use(bodyParser.json());
// app.use(helmet());
// app.use(helmet.contentSecurityPolicy({
//   directives: {
//     defaultSrc: ["'self'"],
//     scriptSrc: ["'self'", "'trusted-scripts.example.com'"],
//     objectSrc: ["'none'"],
//     upgradeInsecureRequests: [],
//   }
// }));

// Exemple de route pour récupérer les films
// app.get('/api/film', async (req, res) => {
//   try {
//     console.log('Requête reçue pour /api/film');
//     const result = await pool.query('SELECT * FROM public.film ORDER BY film_id ASC');
//     console.log('Résultats de la requête:', result.rows);
//     res.json(result.rows);
//   } catch (err) {
//     console.error('Erreur lors de la récupération des films:', err.message);
//     res.status(500).send('Erreur du serveur');
//   }
// });

// app.listen(port, () => {
//   console.log(`Serveur en cours d'exécution sur le port ${port}`);
// });

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const { body, validationResult } = require('express-validator');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5001;
const saltRounds = 10;

// Clé secrète pour les tokens JWT - à stocker dans le fichier .env
const secretKey = process.env.JWT_SECRET;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

app.use(cors());
app.use(bodyParser.json());
app.use(helmet());
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "'trusted-scripts.example.com'"],
    objectSrc: ["'none'"],
    upgradeInsecureRequests: [],
  }
}));

// Route pour l'inscription des utilisateurs
app.post('/api/register', [
  body('email').isEmail().withMessage('Adresse email invalide'),
  body('password')
    .isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères')
    .matches(/\d/).withMessage('Le mot de passe doit contenir au moins un chiffre')
    .matches(/[A-Z]/).withMessage('Le mot de passe doit contenir au moins une lettre majuscule')
    .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('Le mot de passe doit contenir au moins un caractère spécial'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { nom_utilisateur, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const query = 'INSERT INTO public.utilisateur (nom_utilisateur, email, password) VALUES ($1, $2, $3) RETURNING *';
  try {
    const result = await pool.query(query, [nom_utilisateur, email, hashedPassword]);
    const token = jwt.sign({ id: result.rows[0].utilisateur_id }, secretKey, { expiresIn: '1h' });
    res.status(201).json({ token, user: result.rows[0] });
  } catch (err) {
    console.error('Erreur lors de l\'inscription:', err.message);
    res.status(500).send('Erreur du serveur');
  }
});

// Route pour la connexion des utilisateurs
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT * FROM public.utilisateur WHERE email = $1';

  try {
    const result = await pool.query(query, [email]);
    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    const token = jwt.sign({ id: user.utilisateur_id }, secretKey, { expiresIn: '1h' });
    res.json({ token, user });
  } catch (err) {
    console.error('Erreur lors de la connexion:', err.message);
    res.status(500).send('Erreur du serveur');
  }
});

// Middleware pour vérifier les tokens JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(403).json({ message: 'Token requis' });

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token invalide' });
    req.user = user;
    next();
  });
};

// Route protégée d'exemple
app.get('/api/profile', authenticateToken, (req, res) => {
  res.json({ message: 'Profil de l\'utilisateur authentifié', user: req.user });
});

// Exemple de route pour récupérer les films
app.get('/api/film', async (req, res) => {
  try {
    console.log('Requête reçue pour /api/film');
    const result = await pool.query('SELECT * FROM public.film ORDER BY film_id ASC');
    console.log('Résultats de la requête:', result.rows);
    res.json(result.rows);
  } catch (err) {
    console.error('Erreur lors de la récupération des films:', err.message);
    res.status(500).send('Erreur du serveur');
  }
});

app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});