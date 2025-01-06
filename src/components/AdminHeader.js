import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const AdminHeader = () => {
  const location = useLocation();

  const handleLogout = () => {
    // Ajoutez ici votre logique de déconnexion, comme la suppression des tokens
    alert('You have been logged out.');
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

        {/* Barre de recherche */}
        <div className="relative flex-1 mx-6">
          <input
            type="text"
            placeholder="Search ..."
            className="w-full py-2 pl-10 pr-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          <div className="absolute top-1/2 left-3 transform -translate-y-1/2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
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
