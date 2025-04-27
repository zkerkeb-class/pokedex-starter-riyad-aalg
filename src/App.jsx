import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import pokemons from './assets/pokemons';
import PokemonCard from './components/PokemonCard/card.jsx';
import Navbar from './components/Navbar.jsx';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem('favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false); // <<< Nouveau état

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleCardClick = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const handleCloseDetail = () => {
    setSelectedPokemon(null);
  };

  const toggleFavorite = (pokemonId) => {
    if (favorites.includes(pokemonId)) {
      setFavorites(favorites.filter(id => id !== pokemonId));
    } else {
      setFavorites([...favorites, pokemonId]);
    }
  };

  // 🔥 Fonction qui décide quels Pokémon afficher
  const displayedPokemons = pokemons.filter((pokemon) => {
    const matchSearch = pokemon.name.french.toLowerCase().includes(searchTerm.toLowerCase());
    const matchFavorite = !showFavoritesOnly || favorites.includes(pokemon.id);
    return matchSearch && matchFavorite;
  });

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      <div className="app-container">
        {selectedPokemon ? (
          <div className="selected-pokemon-detail text-center">
            <h2 className="text-2xl mb-4">{selectedPokemon.name.french}</h2>
            <img src={selectedPokemon.image} alt={selectedPokemon.name.french} className="w-48 mx-auto mb-4" />
            <div className="text-left text-lg">
              <p><strong>Type :</strong> {selectedPokemon.type.join(', ')}</p>
              <p><strong>HP :</strong> {selectedPokemon.base.HP}</p>
              <p><strong>Attack :</strong> {selectedPokemon.base.Attack}</p>
              <p><strong>Defense :</strong> {selectedPokemon.base.Defense}</p>
            </div>
            <button
              onClick={handleCloseDetail}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-6"
            >
              Retour
            </button>
          </div>
        ) : (
          <>
            {/* Lien vers comparateur */}
            <Link 
              to="/compare"
              style={{
                marginBottom: '20px',
                color: 'white',
                fontWeight: 'bold',
                textDecoration: 'none',
                backgroundColor: '#0072ff',
                padding: '10px 20px',
                borderRadius: '15px',
                display: 'inline-block'
              }}
            >
              🔍 Aller au comparateur de Pokémon
            </Link>

            {/* Barre de recherche */}
            <div className="search-container mt-4 flex flex-col items-center">
              <input
                type="text"
                placeholder="Rechercher un Pokémon..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-bar mb-2"
              />

              {/* 🔥 Bouton Voir Favoris */}
              <button
                onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded"
              >
                {showFavoritesOnly ? "Voir Tous les Pokémon" : "⭐ Voir Mes Favoris"}
              </button>
            </div>

            {/* Lien vers gestion */}
            <Link 
              to="/manage"
              style={{ marginBottom: '10px', color: 'white', fontWeight: 'bold', display: 'block', marginTop: '20px' }}
            >
              ➕ Gérer les Pokémon
            </Link>

            {/* Liste de Pokémon */}
            <div className="pokemon-list">
              {displayedPokemons.map((pokemon) => (
                <div
                  key={pokemon.id}
                  className="pokemon-card-container"
                  style={{
                    position: 'relative',
                    cursor: 'pointer',
                    border: favorites.includes(pokemon.id) ? '2px solid gold' : 'none'
                  }}
                  onClick={() => handleCardClick(pokemon)}
                >
                  {/* Carte Pokémon */}
                  <PokemonCard 
                    name={pokemon.name.french} 
                    types={pokemon.type} 
                    image={pokemon.image}
                    attack={pokemon.base.Attack}
                    defense={pokemon.base.Defense}
                    hp={pokemon.base.HP}
                  />

                  {/* Étoile Favori */}
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(pokemon.id);
                    }}
                    style={{
                      position: 'absolute',
                      top: '8px',
                      right: '8px',
                      fontSize: '24px',
                      color: favorites.includes(pokemon.id) ? 'gold' : 'gray',
                      backgroundColor: 'white',
                      borderRadius: '50%',
                      padding: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    ⭐
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
