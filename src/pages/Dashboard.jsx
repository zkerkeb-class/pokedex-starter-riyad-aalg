import Navbar from '../components/Navbar.jsx';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as jwtDecode from 'jwt-decode';
import { motion } from 'framer-motion'; // <<< pour animation smooth

export default function Dashboard() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode.jwtDecode(token);
      setUsername(decoded.username);
    }
  }, []);

  const goTo = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div>
      <Navbar />
      <motion.div 
        className="p-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-6">Bienvenue {username} !</h1>
        <p className="mb-10 text-gray-700">Que souhaites-tu faire ?</p>

        <div className="flex flex-wrap justify-center gap-6">
          <button
            onClick={() => goTo('/')}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded shadow-md"
          >
            🏠 Accueil
          </button>

          <button
            onClick={() => goTo('/compare')}
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded shadow-md"
          >
            ⚔️ Comparateur
          </button>

          <button
            onClick={() => goTo('/manage')}
            className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded shadow-md"
          >
            🛠️ Gestion Pokémon
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded shadow-md"
          >
            🚪 Déconnexion
          </button>
        </div>
      </motion.div>
    </div>
  );
}
