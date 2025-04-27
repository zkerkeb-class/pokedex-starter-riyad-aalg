import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar.jsx'; // << Corriger le chemin d'import

export default function Manage() {
  console.log("Page Manage chargée");

  const [pokemons, setPokemons] = useState([]);
  const [newPokemon, setNewPokemon] = useState({
    name: { french: '' },
    type: [],
    base: { HP: '', Attack: '', Defense: '' },
    image: ''
  });

  useEffect(() => {
    fetch('/api/pokemons')
      .then(res => res.json())
      .then(data => setPokemons(data.data));
  }, []);

  const handleAddPokemon = () => {
    fetch('/api/pokemons', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPokemon)
    })
      .then(res => res.json())
      .then(data => {
        setPokemons([...pokemons, data.data]);
        alert('Nouveau Pokémon ajouté !');
      });
  };

  const handleDelete = (id) => {
    fetch(`/api/pokemons/${id}`, { method: 'DELETE' })
      .then(res => res.json())
      .then(() => {
        setPokemons(pokemons.filter(p => p.id !== id));
      });
  };

  return (
    <div style={{ padding: '2rem' }}>
      <Navbar /> {/* Ajoute aussi la barre de navigation */}
      <h2>Ajouter un Pokémon</h2>
      <input placeholder="Nom en français" onChange={e => setNewPokemon({ ...newPokemon, name: { french: e.target.value } })} />
      <input placeholder="Type (séparé par virgule)" onChange={e => setNewPokemon({ ...newPokemon, type: e.target.value.split(',').map(t => t.trim()) })} />
      <input placeholder="HP" onChange={e => setNewPokemon({ ...newPokemon, base: { ...newPokemon.base, HP: parseInt(e.target.value) } })} />
      <input placeholder="Attaque" onChange={e => setNewPokemon({ ...newPokemon, base: { ...newPokemon.base, Attack: parseInt(e.target.value) } })} />
      <input placeholder="Défense" onChange={e => setNewPokemon({ ...newPokemon, base: { ...newPokemon.base, Defense: parseInt(e.target.value) } })} />
      <button onClick={handleAddPokemon}>Ajouter</button>

      <h2>Liste actuelle</h2>
      <ul>
        {pokemons.map(p => (
          <li key={p.id}>
            {p.name.french} ({p.type.join(', ')})
            <button onClick={() => handleDelete(p.id)} style={{ marginLeft: '10px', color: 'red' }}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
