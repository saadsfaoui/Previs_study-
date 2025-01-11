import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import API from '../services/api'; // Importez votre instance Axios

const AdminHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // État pour gérer l'ouverture/fermeture du menu
  const location = useLocation();
  const navigate = useNavigate();

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
            src="/logo.jpg" // Remplacez par le chemin de votre logo
            alt="Logo"
            className="h-10 w-10 rounded-full border-2 border-gray-300"
          />
          <h1 className="text-xl font-bold">Admin Panel</h1>
        </div>

        {/* Bouton hamburger pour les petits écrans */}
        <button
          className="lg:hidden text-gray-700 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'} // Icône pour ouvrir/fermer
            />
          </svg>
        </button>

        {/* Navigation pour les grands écrans */}
        <nav className="hidden lg:flex space-x-4 px-4">
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
          className="hidden lg:block bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Menu déroulant pour les petits écrans */}
      {isMenuOpen && (
        <div className="lg:hidden bg-gray-100 shadow-md py-2">
          <nav className="flex flex-col space-y-2 px-6">
            <NavLink
              to="/user"
              className={`text-sm px-4 py-2 rounded ${
                location.pathname === '/user'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-700 hover:text-blue-500'
              }`}
              onClick={() => setIsMenuOpen(false)}
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
              onClick={() => setIsMenuOpen(false)}
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
              onClick={() => setIsMenuOpen(false)}
            >
              Requests
            </NavLink>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default AdminHeader;
