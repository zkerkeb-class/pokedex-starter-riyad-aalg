# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


Description du Projet 

Pokédex ECE 

Ce projet est un Pokédex interactif développé en React.js (frontend) et Express.js (backend), utilisant MongoDB pour stocker les données utilisateurs et pokémons.

Fonctionnalités principales :

🔥 Authentification sécurisée avec JWT (connexion, inscription)

🔥 Gestion des utilisateurs (Login / Register)

🔥 Liste de Pokémons affichée avec recherche par nom

🔥 Ajout et suppression de Pokémons (interface de gestion)

🔥 Système de favoris avec sauvegarde locale

🔥 Quizz de personnalité qui associe un Pokémon selon les réponses



🛠 Instructions d'installation

Prérequis :

Node.js installé sur votre machine

MongoDB en local ou Atlas en ligne

Installation du Backend (API Express) :

cd backend
npm install

➡️ Ensuite, configurez un fichier .env avec :

MONGO_URI=mongodb://localhost:27017/pokedex
JWT_SECRET=VotreCléSecrète

➡️ Puis lancez le serveur backend :

npm start
Le backend tourne sur http://localhost:5000

Installation du Frontend (React)

cd pokedex-starter-riyad-aalg
npm install
npm run dev

➡️ Le frontend sera accessible sur http://localhost:5173


3. 📚 Documentation de l'API

Authentification

Route	Méthode	Description
/login	POST	Connexion d'un utilisateur. Retourne un token JWT
/register	POST	Création d'un nouvel utilisateur

➡️ Body attendu (JSON) :

{
  "username": "monUsername",
  "password": "monPassword"
}

➡️ Réponse (login réussi) :

{
  "message": "Connexion réussie",
  "token": "xxx.JWTtoken.xxx"
}
Gestion des Pokémons

Route	Méthode	Description
/api/pokemons	GET	Récupérer la liste des pokémons
/api/pokemons	POST	Ajouter un nouveau pokémon
/api/pokemons/:id	DELETE	Supprimer un pokémon par son ID

➡️ Body attendu pour ajouter un Pokémon (POST) :

{
  "name": { "french": "Pikachu" },
  "type": ["Electric"],
  "base": { "HP": 35, "Attack": 55, "Defense": 40 },
  "image": "URL ou chemin de l'image"
}

➡️ Réponse (ajout réussi) :

{
  "message": "Pokémon ajouté avec succès",
  "data": { /* données du Pokémon ajouté */ }
}

📢 Remarque importante :

Le token JWT est stocké en local (localStorage) et utilisé pour accéder aux routes protégées sur le frontend (React).

Le backend n’exige pas encore de vérification automatique du JWT dans les requêtes API (protection backend possible en bonus si demandé).


LIEN VIDEO YOUTUBE : 

https://youtu.be/h2XpwwU0ko0