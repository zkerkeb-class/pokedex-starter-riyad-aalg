import { useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import pokemons from '../assets/pokemons'; // Assure-toi que tu as accès aux pokémons

export default function Quiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [resultPokemon, setResultPokemon] = useState(null);

  const questions = [
    {
      question: "Quel est ton environnement préféré ?",
      options: ["Forêt", "Montagne", "Mer", "Ville"]
    },
    {
      question: "Quel trait de caractère te décrit le mieux ?",
      options: ["Courageux", "Calme", "Intelligent", "Amical"]
    },
    {
      question: "Quel est ton type d'énergie ?",
      options: ["Explosif", "Posé", "Créatif", "Leader"]
    }
  ];

  const handleAnswer = (option) => {
    setAnswers([...answers, option]);
    if (step + 1 < questions.length) {
      setStep(step + 1);
    } else {
      calculateResult([...answers, option]);
    }
  };

  const calculateResult = (finalAnswers) => {
    // Simple logique de correspondance pour l'exemple
    let type = '';

if (finalAnswers.includes("Forêt")) type = "Grass";
else if (finalAnswers.includes("Mer")) type = "Water";
else if (finalAnswers.includes("Montagne")) type = "Rock";
else type = "Normal";

if (finalAnswers.includes("Courageux") || finalAnswers.includes("Explosif")) {
  type = "Fire";
} else if (finalAnswers.includes("Calme")) {
  type = "Water";
} else if (finalAnswers.includes("Intelligent") || finalAnswers.includes("Créatif")) {
  type = "Psychic";
} else if (finalAnswers.includes("Amical") || finalAnswers.includes("Leader")) {
  type = "Electric";
}


    // Chercher un Pokémon qui a ce type
    const matchingPokemons = pokemons.filter(pokemon => pokemon.type.includes(type));
    if (matchingPokemons.length > 0) {
      const randomPokemon = matchingPokemons[Math.floor(Math.random() * matchingPokemons.length)];
      setResultPokemon(randomPokemon);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="p-8 text-center">
        <h1 className="text-3xl font-bold mb-6">Quel Pokémon es-tu ?</h1>

        {!resultPokemon ? (
          <>
            <h2 className="text-xl mb-4">{questions[step].question}</h2>
            <div className="flex flex-col items-center gap-4">
              {questions[step].options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(option)}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded w-60"
                >
                  {option}
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center">
            <h2 className="text-2xl mb-4">Ton Pokémon est :</h2>
            <h3 className="text-xl font-bold">{resultPokemon.name.french}</h3>
            <img src={resultPokemon.image} alt={resultPokemon.name.french} className="w-48 my-6" />
            <p><strong>Type :</strong> {resultPokemon.type.join(', ')}</p>
            <p><strong>HP :</strong> {resultPokemon.base.HP}</p>
            <p><strong>Attack :</strong> {resultPokemon.base.Attack}</p>
            <p><strong>Defense :</strong> {resultPokemon.base.Defense}</p>

            <button
              onClick={() => {
                setStep(0);
                setAnswers([]);
                setResultPokemon(null);
              }}
              className="mt-6 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded"
            >
              Recommencer
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
