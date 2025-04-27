import { useState } from 'react';
import pokemons from '../assets/pokemons';
import PokemonCard from '../components/PokemonCard/card.jsx';
import '../App.css';
import Navbar from '../components/Navbar.jsx'; // << correction du chemin !

function Compare() {
  const [id1, setId1] = useState('');
  const [id2, setId2] = useState('');

  const pokemon1 = pokemons.find(p => p.id == id1);
  const pokemon2 = pokemons.find(p => p.id == id2);

  return (
    <div>
      <Navbar /> {/* Navbar en haut */}

      <div className="app-container">
        <h1>Comparateur de Pokémon</h1>

        <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
          <select onChange={(e) => setId1(e.target.value)} value={id1}>
            <option value="">Choisir Pokémon 1</option>
            {pokemons.map(p => (
              <option key={p.id} value={p.id}>{p.name.french}</option>
            ))}
          </select>

          <select onChange={(e) => setId2(e.target.value)} value={id2}>
            <option value="">Choisir Pokémon 2</option>
            {pokemons.map(p => (
              <option key={p.id} value={p.id}>{p.name.french}</option>
            ))}
          </select>
        </div>

        <div className="pokemon-list">
          {pokemon1 && <PokemonCard 
            name={pokemon1.name.french}
            types={pokemon1.type}
            image={pokemon1.image}
            attack={pokemon1.base.Attack}
            defense={pokemon1.base.Defense}
            hp={pokemon1.base.HP}
          />}
          {pokemon2 && <PokemonCard 
            name={pokemon2.name.french}
            types={pokemon2.type}
            image={pokemon2.image}
            attack={pokemon2.base.Attack}
            defense={pokemon2.base.Defense}
            hp={pokemon2.base.HP}
          />}
        </div>

        {pokemon1 && pokemon2 && (
          <div style={{ marginTop: '30px', background: '#fff', padding: '20px', borderRadius: '12px', color: 'black' }}>
            <h2>Comparaison des stats</h2>
            <p><strong>PV</strong> : {pokemon1.base.HP} vs {pokemon2.base.HP}</p>
            <p><strong>Attaque</strong> : {pokemon1.base.Attack} vs {pokemon2.base.Attack}</p>
            <p><strong>Défense</strong> : {pokemon1.base.Defense} vs {pokemon2.base.Defense}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Compare;
