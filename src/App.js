import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/Student/DashboardPage';
import SubjectsPage from './pages/Student/SubjectsPage';
import PredictionsPage from './pages/Student/PredictionsPage';
import GroupsPage from './pages/Student/GroupsPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/student/dashboard" element={<DashboardPage />} />
        <Route path="/student/subjects" element={<SubjectsPage />} />
        <Route path="/student/predictions" element={<PredictionsPage />} />
        <Route path="/student/groups" element={<GroupsPage />} />
      </Routes>
    </Router>
  );
};

export default App;


