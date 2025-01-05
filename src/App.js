import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/Admin/LandingPage';
import LoginPage from './pages/Admin/LoginPage';
import RegisterPage from './pages/Admin/RegisterPage';
import UserPage from './pages/Admin/UserPage';
import GroupPage from './pages/Admin/GroupPage';
import RequestPage from './pages/Admin/RequestPage';
const App = () => {
  return (
    <Router>
      <Routes>
        {/* Route pour la page d'accueil */}
        <Route path="/" element={<LandingPage />} />
        {/* Route pour la page de connexion */}
        <Route path="/login" element={<LoginPage />} />
        {/* Route pour la page d'inscription */}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/group" element={<GroupPage />} />
        <Route path="/requests" element={<RequestPage />} />
      
      </Routes>


    </Router>
  );
};

export default App;
