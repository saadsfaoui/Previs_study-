import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Header.css'; // Styles associés au header

const Header = () => {
  const navigate = useNavigate(); // Hook pour naviguer entre les routes

  const handleProfileClick = () => {
    navigate('/student/dashboard'); // Redirige vers la page du tableau de bord
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

      {/* Profile Icon */}
      <div className="profile-icon" onClick={handleProfileClick}>
        <div className="circle-icon"></div>
      </div>
    </header>
  );
};

export default Header;

