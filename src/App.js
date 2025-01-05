import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/Admin/LandingPage';
import LoginPage from './pages/Admin/LoginPage';
import RegisterPage from './pages/Admin/RegisterPage';
import UserPage from './pages/Admin/UserPage';
import GroupPage from './pages/Admin/GroupPage';
import RequestPage from './pages/Admin/RequestPage';

import DashboardPage from './pages/Student/DashboardPage';
import SubjectsPage from './pages/Student/SubjectsPage';
import PredictionsPage from './pages/Student/PredictionsPage';
import GroupsPage from './pages/Student/GroupsPage';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Routes pour les administrateurs */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/group" element={<GroupPage />} />
        <Route path="/requests" element={<RequestPage />} />

        {/* Routes pour les étudiants */}
        <Route path="/student/dashboard" element={<DashboardPage />} />
        <Route path="/student/subjects" element={<SubjectsPage />} />
        <Route path="/student/predictions" element={<PredictionsPage />} />
        <Route path="/student/groups" element={<GroupsPage />} />
      </Routes>
    </Router>
  );
};

export default App;


