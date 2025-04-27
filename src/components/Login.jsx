import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/login', { username, password });
      setMessage(res.data.message);
      localStorage.setItem('token', res.data.token);

      navigate('/dashboard');
    } catch (err) {
      setMessage(err.response?.data?.error || "Erreur de connexion");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 shadow-md rounded-lg bg-white">
      <h1 className="text-2xl mb-4 text-center">Connexion</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          className="block w-full border p-2 mb-2"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          className="block w-full border p-2 mb-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded mt-2"
          disabled={loading}
        >
          {loading ? "Connexion..." : "Se connecter"}
        </button>
      </form>

      {message && (
        <p className={`mt-4 text-center ${message.includes('succès') ? 'text-green-500' : 'text-red-500'}`}>
          {message}
        </p>
      )}

      <div className="mt-4 text-center">
        <p>Pas encore de compte ? <a href="/register" className="text-blue-500 hover:underline">S'inscrire</a></p>
      </div>
    </div>
  );
}
