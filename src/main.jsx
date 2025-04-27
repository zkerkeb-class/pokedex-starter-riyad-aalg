import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './index.css';
import App from './App.jsx';
import Compare from './pages/Compare.jsx';
import Manage from './pages/Manage.jsx';
import Login from './components/Login.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx'; // <<< Import du nouveau composant
import Dashboard from './pages/Dashboard.jsx';
import Register from './components/Register.jsx'; // <<< Ajoute cet import
import Quiz from './pages/Quiz.jsx';



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        
        {/* Routes protégées */}
        <Route path="/compare" element={
          <ProtectedRoute>
            <Compare />
          </ProtectedRoute>
        } />
        <Route path="/manage" element={
          <ProtectedRoute>
            <Manage />
          </ProtectedRoute>
        } />
        <Route path="/dashboard" element={
          <ProtectedRoute>
           <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/register" element={<Register />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
