import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importer useNavigate
import API from '../../services/api'; // Importez votre fichier API configuré avec Axios

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialiser useNavigate

  const handleSubmit = (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    // Envoyer les données au backend
    API.post('/auth/login', { email, password })
      .then((response) => {
        // Stocker le token dans localStorage
        localStorage.setItem('token', response.data.token);

        // Récupérer les informations de l'utilisateur (y compris le rôle)
        const userRole = response.data.user.role; // Exemple : "admin" ou "student"

        console.log('Login successful:', response.data);
        alert('Connexion réussie!');

        // Rediriger en fonction du rôle de l'utilisateur
        if (userRole === 'admin') {
          navigate('/user'); // Rediriger vers la gestion des utilisateurs pour les admins
        } else if (userRole === 'student') {
          navigate('/student/dashboard'); // Rediriger vers le tableau de bord étudiant
        } else {
          alert('Rôle non reconnu.');
        }
      })
      .catch((error) => {
        console.error('Login failed:', error);
        alert('Échec de la connexion. Vérifiez vos informations.');
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm w-full">
        <h2 className="text-2xl font-bold text-center mb-6">Connexion</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Met à jour l'état
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              placeholder="Votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Met à jour l'état
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
          >
            Connexion
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
