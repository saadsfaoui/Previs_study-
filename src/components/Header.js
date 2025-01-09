import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Header.css'; // Styles associés au header
import API from '../services/api'; // Importer l'instance Axios pour l'API

const Header = () => {
  const navigate = useNavigate(); // Hook pour naviguer entre les routes

  const handleProfileClick = () => {
    navigate('/student/dashboard'); // Redirige vers la page du tableau de bord
  };

  const handleLogout = async () => {
    try {
      // Optionnel : Appel au backend pour invalider le token
      await API.post('/auth/logout');

      // Supprimer le token du stockage local
      localStorage.removeItem('token');

      alert('Vous avez été déconnecté.');

      // Rediriger vers la page d'accueil (LandingPage)
      navigate('/');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      alert('Une erreur est survenue lors de la déconnexion.');
    }
  };

  return (
    <header className="headers">
      {/* Logo Section */}
      <div className="logo">
        <span className="logo-circle"></span>
        <h1>UserCentral</h1>
      </div>

      {/* Navigation Links */}
      <nav className="nav-links">
        <NavLink
          to="/student/groups"
          className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
        >
          Groups
        </NavLink>
        <NavLink
          to="/student/subjects"
          className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
        >
          Subjects
        </NavLink>
        <NavLink
          to="/student/predictions"
          className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
        >
          Predictions
        </NavLink>
      </nav>

      {/* Profile Icon & Logout Button */}
      <div className="profile-section flex items-center">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mr-4"
        >
          Logout
        </button>
        <div className="profile-icon" onClick={handleProfileClick}>
          <div className="circle-icon"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;
