import "../../App.css";

export default function PokemonCard({ name, types, image, attack, defense, hp }) {
  return (
    <div className="pokemon-card">
      {/* Nom du Pokémon */}
      <div className="pokemon-name-container">
        <h2 className="pokemon-name">{name}</h2>
      </div>

      {/* Image du Pokémon */}
      <img src={image} alt={name} className="pokemon-image" />

      {/* Types du Pokémon */}
      <div className="pokemon-types-container">
        {types.map((type, index) => (
          <span key={index} className={`pokemon-type ${type}`}>{type}</span>
        ))}
      </div>

      {/* Statistiques */}
      <div className="pokemon-stats-container">
        <p>HP: {hp}</p>
        <p>Attaque: {attack}</p>
        <p>Défense: {defense}</p>
      </div>
    </div>
  );
}
