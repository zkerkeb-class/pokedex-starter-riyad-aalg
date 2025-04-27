import { Link, useNavigate } from 'react-router-dom';
import * as jwtDecode from 'jwt-decode';

export default function Navbar() {
  const navigate = useNavigate();
  let username = '';

  const token = localStorage.getItem('token');
  if (token) {
    const decoded = jwtDecode.jwtDecode(token);
    username = decoded.username;
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      {/* Partie Gauche : utilisateur */}
      <div className="text-white text-lg">
        {username ? `Connecté : ${username}` : 'Non connecté'}
      </div>

      {/* Partie Droite : Boutons */}
      <div className="flex space-x-4">
        <Link
          to="/"
          className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Accueil
        </Link>

        <Link
          to="/compare"
          className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Comparateur
        </Link>

        <Link
          to="/manage"
          className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Gestion
        </Link>

        <Link
          to="/quiz"
          className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
        >
          🧠 Quiz
        </Link>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
          Déconnexion
        </button>
      </div>
    </nav>
  );
}
