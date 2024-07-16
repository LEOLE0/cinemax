CINEMAX

CINEMAX est une application web de réservation de films en ligne, permettant aux utilisateurs de s’inscrire, de se connecter, de réserver des films, de consulter les horaires et les salles, et de laisser des avis. Cette application utilise une base de données PostgreSQL pour la gestion des utilisateurs, des films et des réservations, ainsi que Firebase pour la gestion des avis.

Table des Matières

	•	Technologies Utilisées
	•	Installation
	•	Configuration de la Base de Données
	•	Démarrage du Serveur
	•	Scripts Disponibles
	•	Structure du Projet
	•	Fonctionnalités
	•	Charte Graphique
	•	Contributeurs
	•	License

Technologies Utilisées

	•	React.js
	•	Express.js
	•	Node.js
	•	PostgreSQL
	•	Firebase
	•	Styled Components
	•	Axios
	•	JWT pour l’authentification
	•	Helmet pour la sécurité
	•	Leaflet pour la carte interactive

Installation

Prérequis

	•	Node.js
	•	npm
	•	PostgreSQL
	•	Compte Firebase

Étapes

	1.	Clonez le dépôt GitHub : git clone https://github.com/votre-utilisateur/cinemax.git
    2.	Accédez au répertoire du projet : cd cinemax
    3.	Installez les dépendances pour le frontend et le backend : npm install 
    cd backend
    npm install

    Configuration de la Base de Données

	1.	Créez une base de données PostgreSQL et notez les informations de connexion.
	2.	Dans le fichier backend/.env, configurez les variables d’environnement pour PostgreSQL :
    DB_USER=your_db_user
    DB_HOST=your_db_host
    DB_DATABASE=your_db_name
    DB_PASSWORD=your_db_password
    DB_PORT=your_db_port
    JWT_SECRET=your_jwt_secret

	3.	Créez les tables nécessaires en exécutant les scripts SQL fournis.

    Démarrage du Serveur

	1.	Démarrez le serveur backend : cd backend
    node server.js

    2.	Démarrez le serveur frontend : npm start

    Scripts Disponibles

	•	npm start: Démarre le serveur de développement.
	•	npm run build: Génère une version de production de l’application.

     Structure du Projet

cinemax/
├── backend/
│   ├── server.js
│   ├── api.js
│   ├── .env
│   └── ...
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── Navbar.js
│   │   ├── BookingSection.js
│   │   ├── FeaturedMovies.js
│   │   ├── ...
│   ├── pages/
│   │   ├── HomePage.js
│   │   ├── Profile.js
│   │   ├── ...
│   ├── context/
│   │   ├── AuthContext.js
│   ├── App.js
│   ├── index.js
│   └── ...
├── .gitignore
├── package.json
└── README.md


Fonctionnalités

	•	Inscription et Connexion : Les utilisateurs peuvent s’inscrire et se connecter.
	•	Réservation de Films : Les utilisateurs peuvent réserver des films, choisir des salles et des horaires.
	•	Avis : Les utilisateurs peuvent laisser des avis sur les films via Firebase.
	•	Gestion de Profil : Les utilisateurs peuvent gérer leurs informations de profil et voir leurs réservations.
	•	Carte Interactive : Affiche une carte interactive pour trouver des cinémas à proximité.

Charte Graphique

	•	Police principale : Poppins (sans-serif)
	•	Couleurs :
	•	Bleu Nuit : #000033
	•	Gris Très Foncé : #1a1a1a
	•	Jaune Foncé : #FFCC00

Contributeurs

	•	Nom 1 - GitHub
	•	Nom 2 - GitHub
	•	Nom 3 - GitHub

License

Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.

Si vous avez des questions ou des suggestions, n’hésitez pas à ouvrir une issue ou à me contacter directement. Profitez de CINEMAX !