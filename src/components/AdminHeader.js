import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import API from '../services/api'; // Importez votre instance Axios

const AdminHeader = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Hook pour la redirection

  const handleLogout = async () => {
    try {
      // Appel API pour effectuer le logout
      await API.post('/auth/logout'); // Assurez-vous que votre backend a une route POST /logout

      // Suppression des données locales (par exemple, token d'authentification)
      localStorage.removeItem('authToken');

      alert('You have been logged out.');

      // Redirection vers la Landing Page
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error);
      alert('Failed to log out. Please try again.');
    }
  };

  return (
    <header className="bg-gray-100 shadow-md fixed top-0 left-0 w-full z-50">
      <div className="mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo et Titre */}
        <div className="flex items-center space-x-3">
          <img
            src="/images/logo.png" // Remplacez par le chemin de votre logo
            alt="Logo"
            className="h-10 w-10 rounded-full border-2 border-gray-300"
          />
          <h1 className="text-xl font-bold">Admin Panel</h1>
        </div>

        {/* Navigation */}
        <nav className="flex space-x-4 px-4">
          <NavLink
            to="/user"
            className={`text-sm px-4 py-2 rounded ${
              location.pathname === '/user'
                ? 'bg-blue-500 text-white'
                : 'text-gray-700 hover:text-blue-500'
            }`}
          >
            Users
          </NavLink>
          <NavLink
            to="/group"
            className={`text-sm px-4 py-2 rounded ${
              location.pathname === '/group'
                ? 'bg-blue-500 text-white'
                : 'text-gray-700 hover:text-blue-500'
            }`}
          >
            Groups
          </NavLink>
          <NavLink
            to="/requests"
            className={`text-sm px-4 py-2 rounded ${
              location.pathname === '/requests'
                ? 'bg-blue-500 text-white'
                : 'text-gray-700 hover:text-blue-500'
            }`}
          >
            Requests
          </NavLink>
        </nav>

        {/* Bouton de déconnexion */}
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;
