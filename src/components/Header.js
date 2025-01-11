import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Header.css';
import API from '../services/api';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false); // État pour gérer l'ouverture du menu hamburger
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/student/dashboard');
  };

  const handleLogout = async () => {
    try {
      await API.post('/auth/logout');
      localStorage.removeItem('token');
      alert('Vous avez été déconnecté.');
      navigate('/');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      alert('Une erreur est survenue lors de la déconnexion.');
    }
  };

  return (
    <header className="headers">
      <div className="header-container">
        {/* Logo Section */}
        <div className="logo">
        <img
            src="/logo.jpg"
            alt="Logo"
            className="h-10 w-10 rounded-full border-2 border-gray-300"
          />
          <h1>UserCentral</h1>
        </div>

        {/* Menu Hamburger pour les petits écrans */}
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <div className={`line ${menuOpen ? 'open' : ''}`}></div>
          <div className={`line ${menuOpen ? 'open' : ''}`}></div>
          <div className={`line ${menuOpen ? 'open' : ''}`}></div>
        </div>

        {/* Navigation Links */}
        <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <NavLink
            to="/student/groups"
            className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
            onClick={() => setMenuOpen(false)}
          >
            Groups
          </NavLink>
          <NavLink
            to="/student/subjects"
            className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
            onClick={() => setMenuOpen(false)}
          >
            Subjects
          </NavLink>
          <NavLink
            to="/student/predictions"
            className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
            onClick={() => setMenuOpen(false)}
          >
            Predictions
          </NavLink>
        </nav>

        {/* Profile Icon & Logout Button */}
        <div className="profile-section">
          <button
            onClick={handleLogout}
            className="logout-btn"
          >
            Logout
          </button>
          <div className="profile-icon" onClick={handleProfileClick}>
            <div className="circle-icon"></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
