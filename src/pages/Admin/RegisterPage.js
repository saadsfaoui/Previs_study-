import React, { useState } from 'react';
import API from '../../services/api'; // Importez votre instance Axios
import { useNavigate } from 'react-router-dom'; // Pour rediriger après l'inscription

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '', // Nouveau champ pour confirmation
  });
  const [error, setError] = useState(null); // État pour afficher les erreurs
  const [successMessage, setSuccessMessage] = useState(null); // Message de succès
  const navigate = useNavigate(); // Pour rediriger

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Réinitialiser les erreurs
    setSuccessMessage(null); // Réinitialiser le message de succès

    if (formData.password !== formData.password_confirmation) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }

    try {
      await API.post('/auth/register', formData); // Appel à l'API backend
      setSuccessMessage('Inscription réussie ! Redirection vers la page de connexion...');
      setTimeout(() => {
        navigate('/login'); // Rediriger vers la page de connexion après 2 secondes
      }, 2000);
    } catch (error) {
      console.error('Registration error:', error.response?.data || error);
      setError(
        error.response?.data?.message || 'Une erreur est survenue. Veuillez réessayer.'
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm w-full">
        <h2 className="text-2xl font-bold text-center mb-6">Inscription</h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        {successMessage && <p className="text-green-500 mb-4 text-center">{successMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
              Nom
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Votre nom"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Votre email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Votre mot de passe"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password_confirmation" className="block text-gray-700 font-bold mb-2">
              Confirmer le mot de passe
            </label>
            <input
              type="password"
              id="password_confirmation"
              value={formData.password_confirmation}
              onChange={handleChange}
              placeholder="Confirmez votre mot de passe"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full"
          >
            Inscription
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
