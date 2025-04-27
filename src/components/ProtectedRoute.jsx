// src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');

  if (!token) {
    // Pas de token -> redirige vers /login
    return <Navigate to="/login" />;
  }

  // Sinon on affiche la page demandée
  return children;
}
