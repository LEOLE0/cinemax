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

  const { nom, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const query = 'INSERT INTO public.utilisateur (nom_utilisateur, email, password) VALUES ($1, $2, $3) RETURNING *';
  try {
    const result = await pool.query(query, [nom, email, hashedPassword]);
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

// Route pour récupérer le profil utilisateur complet
app.get('/api/profile', authenticateToken, async (req, res) => {
  try {
    console.log('ID de l\'utilisateur:', req.user.id);
    const query = 'SELECT utilisateur_id, nom_utilisateur, email FROM public.utilisateur WHERE utilisateur_id = $1';
    const result = await pool.query(query, [req.user.id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    const user = result.rows[0];
    console.log('Données utilisateur:', user);
    res.json({ user });
  } catch (err) {
    console.error('Erreur lors de la récupération du profil:', err.message);
    res.status(500).send('Erreur du serveur');
  }
});

// Route pour récupérer les films
app.get('/api/films', async (req, res) => {
  try {
    const result = await pool.query('SELECT film_id, titre FROM public.film');
    res.json(result.rows);
  } catch (err) {
    console.error('Erreur lors de la récupération des films:', err.message);
    res.status(500).send('Erreur du serveur');
  }
});

// Route pour récupérer les salles
app.get('/api/salles', async (req, res) => {
  try {
    const result = await pool.query('SELECT salle_id, nom_salle FROM public.salle');
    res.json(result.rows);
  } catch (err) {
    console.error('Erreur lors de la récupération des salles:', err.message);
    res.status(500).send('Erreur du serveur');
  }
});

// Route pour récupérer les films favoris de l'utilisateur
app.get('/api/favorites', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT f.* FROM public.film f
       JOIN public.favoris fav ON f.film_id = fav.film_id
       WHERE fav.utilisateur_id = $1`,
      [req.user.id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Erreur lors de la récupération des favoris:', err.message);
    res.status(500).send('Erreur du serveur');
  }
});

// Route pour ajouter un film aux favoris
app.post('/api/favorites', authenticateToken, async (req, res) => {
  const { film_id } = req.body;
  try {
    await pool.query(
      'INSERT INTO public.favoris (utilisateur_id, film_id) VALUES ($1, $2)',
      [req.user.id, film_id]
    );
    res.status(201).send('Film ajouté aux favoris');
  } catch (err) {
    console.error('Erreur lors de l\'ajout aux favoris:', err.message);
    res.status(500).send('Erreur du serveur');
  }
});

// Route pour supprimer un film des favoris
app.delete('/api/favorites/:film_id', authenticateToken, async (req, res) => {
  const { film_id } = req.params;
  try {
    await pool.query(
      'DELETE FROM public.favoris WHERE utilisateur_id = $1 AND film_id = $2',
      [req.user.id, film_id]
    );
    res.status(200).send('Film supprimé des favoris');
  } catch (err) {
    console.error('Erreur lors de la suppression des favoris:', err.message);
    res.status(500).send('Erreur du serveur');
  }
});

// Route pour ajouter une réservation
app.post('/api/reservation', authenticateToken, async (req, res) => {
  const { nom, film, salle, horaire } = req.body;
  const utilisateur_id = req.user.id;

  try {
    const result = await pool.query(
      'INSERT INTO reservation (utilisateur_id, film_id, salle_id, horaire) VALUES ($1, $2, $3, $4) RETURNING *',
      [utilisateur_id, film, salle, horaire]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Erreur lors de l\'ajout de la réservation:', err);
    res.status(500).send('Erreur du serveur');
  }
});

// Route pour récupérer les réservations d'un utilisateur
app.get('/api/reservation', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await pool.query('SELECT * FROM reservation WHERE utilisateur_id = $1', [userId]);
    res.json(result.rows);
  } catch (err) {
    console.error('Erreur lors de la récupération des réservations:', err.message);
    res.status(500).send('Erreur du serveur');
  }
});

// Route pour supprimer une réservation
app.delete('/api/reservation/:reservation_id', authenticateToken, async (req, res) => {
  const { reservation_id } = req.params;
  try {
    await pool.query(
      'DELETE FROM public.reservation WHERE utilisateur_id = $1 AND reservation_id = $2',
      [req.user.id, reservation_id]
    );
    res.status(200).send('Réservation supprimée');
  } catch (err) {
    console.error('Erreur lors de la suppression de la réservation:', err.message);
    res.status(500).send('Erreur du serveur');
  }
});

// Route pour mettre à jour le profil utilisateur
app.put('/api/profile', authenticateToken, [
  body('email').isEmail().withMessage('Adresse email invalide'),
  body('password')
    .optional()
    .isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères')
    .matches(/\d/).withMessage('Le mot de passe doit contenir au moins un chiffre')
    .matches(/[A-Z]/).withMessage('Le mot de passe doit contenir au moins une lettre majuscule')
    .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('Le mot de passe doit contenir au moins un caractère spécial'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  const updates = [];
  const values = [];

  if (email) {
    updates.push('email = $' + (updates.length + 1));
    values.push(email);
  }

  if (password) {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    updates.push('password = $' + (updates.length + 1));
    values.push(hashedPassword);
  }

  if (updates.length === 0) {
    return res.status(400).json({ message: 'Aucune donnée à mettre à jour' });
  }

  values.push(req.user.id);

  const query = `UPDATE public.utilisateur SET ${updates.join(', ')} WHERE utilisateur_id = $${values.length} RETURNING *`;

  try {
    const result = await pool.query(query, values);
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Erreur lors de la mise à jour du profil:', err.message);
    res.status(500).send('Erreur du serveur');
  }
});

app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});