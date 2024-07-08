const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5001;

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