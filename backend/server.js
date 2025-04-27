// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/User');

const app = express();
app.use(express.json());
app.use(cors());

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connecté !'))
  .catch(err => console.error('Erreur de connexion MongoDB :', err));

  
  app.post('/register', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Vérifier si l'utilisateur existe déjà
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ error: "Nom d'utilisateur déjà pris" });
      }
  
      // Sinon, créer le nouvel utilisateur
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username, password: hashedPassword });
  
      await newUser.save();
      res.status(201).json({ message: "Utilisateur créé avec succès !" });
    } catch (error) {
      res.status(500).json({ error: "Erreur lors de l'inscription" });
    }
  });
  
  
  

// Route de connexion (authentification)
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ error: "Utilisateur inexistant" });

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).json({ error: "Mot de passe incorrect" });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.json({ token, message: "Authentification réussie !" });
});

// Démarrage du serveur
app.listen(process.env.PORT || 5000, () => {
  console.log(`Serveur démarré sur le port ${process.env.PORT || 5000}`);
});
