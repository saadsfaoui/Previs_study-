import React from 'react';
import Header from '../../components/Header';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Cell, Legend, LineChart, Line } from 'recharts';
import './PredictionsPage.css'
const PredictionsPage = () => {
  // Données pour Quarterly Performance (Graphique en barres)
  const quarterlyData = [
    { name: 'Q1', Math: 40, Science: 30, English: 20 },
    { name: 'Q2', Math: 35, Science: 25, English: 30 },
    { name: 'Q3', Math: 50, Science: 40, English: 35 },
    { name: 'Q4', Math: 45, Science: 35, English: 40 },
  ];

  // Données pour le graphique circulaire (Contact Rate Analysis)
  const pieData = [
    { name: 'Contact Rate', value: 70 },
    { name: 'Other', value: 30 },
  ];

  // Données pour Engagement Stats (Graphique circulaire)
  const engagementData = [
    { name: 'Opens', value: 60 },
    { name: 'Contacts', value: 40 },
  ];

  // Données pour Clicks Trend (Graphique en ligne)
  const clicksData = [
    { month: 'Jan', clicks: 400 },
    { month: 'Feb', clicks: 500 },
    { month: 'Mar', clicks: 600 },
    { month: 'Apr', clicks: 700 },
    { month: 'May', clicks: 600 },
    { month: 'Jun', clicks: 400 },
  ];

  return (
    <div>
      <Header />
      <main className="container">
       

        {/* Quarterly Performance */}
        <section className="quarterly-performance">
          <h2>Quarterly Performance</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={quarterlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="Math" fill="#8884d8" />
              <Bar dataKey="Science" fill="#82ca9d" />
              <Bar dataKey="English" fill="#ffc658" />
            </BarChart>
          </ResponsiveContainer>
        </section>

        

        {/* Performance Preferences */}
        <section className="performance-preferences">
          <h2>Performance Preferences</h2>
          <div className="charts-container">
            
            {/* Clicks Trend */}
            <ResponsiveContainer width="50%" height={300}>
              <LineChart data={clicksData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="clicks" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>

        
            
          </div>
        </section>
      </main>
    </div>
  );
};

export default PredictionsPage;

