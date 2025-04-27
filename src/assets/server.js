const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); // autoriser les requêtes depuis React
app.use(express.json());

// Fichier de stockage
const filePath = path.join(__dirname, 'pokemons.json');

// Chargement initial
let pokemons = [];
if (fs.existsSync(filePath)) {
  pokemons = JSON.parse(fs.readFileSync(filePath, 'utf8'));
} else {
  fs.writeFileSync(filePath, JSON.stringify([]));
}

// Fonction d'enregistrement
const savePokemons = () => {
  fs.writeFileSync(filePath, JSON.stringify(pokemons, null, 2));
};

// ✅ GET - Tous les Pokémon
app.get('/api/pokemons', (req, res) => {
  res.status(200).json(pokemons);
});

// ✅ GET - Un Pokémon par ID
app.get('/api/pokemons/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const pokemon = pokemons.find(p => p.id === id);
  if (!pokemon) return res.status(404).json({ error: "Not found" });
  res.json(pokemon);
});

// ✅ POST - Ajouter un Pokémon
app.post('/api/pokemons', (req, res) => {
  const { name, type, base, image } = req.body;
  if (!name?.french || !Array.isArray(type) || !base) {
    return res.status(400).json({ error: "Données invalides" });
  }
  const newPokemon = {
    id: pokemons.length ? pokemons[pokemons.length - 1].id + 1 : 1,
    name,
    type,
    base,
    image: image || null
  };
  pokemons.push(newPokemon);
  savePokemons();
  res.status(201).json(newPokemon);
});

// ✅ PUT - Modifier un Pokémon
app.put('/api/pokemons/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = pokemons.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({ error: "Not found" });

  pokemons[index] = { ...pokemons[index], ...req.body, id }; // garder l'id
  savePokemons();
  res.json(pokemons[index]);
});

// ✅ DELETE - Supprimer un Pokémon
app.delete('/api/pokemons/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = pokemons.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({ error: "Not found" });

  const deleted = pokemons.splice(index, 1)[0];
  savePokemons();
  res.json(deleted);
});

// 🚀 Lancer le serveur
app.listen(PORT, () => {
  console.log(`✅ Serveur Pokémon lancé sur http://localhost:${PORT}`);
});
