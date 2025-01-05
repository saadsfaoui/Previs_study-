/*import React from 'react';
import Header from '../../components/Header';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import styles from './DashboardPage.css';

const DashboardPage = () => {
  // Données pour le graphique en secteurs
  const performanceData = [
    { name: 'Math', value: 400 },
    { name: 'Science', value: 300 },
    { name: 'English', value: 200 },
    { name: 'History', value: 100 },
  ];

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#d84a88'];

  // Données pour le graphique en barres
  const trendData = [
    { name: 'Jan', Predicted: 85, Actual: 75 },
    { name: 'Feb', Predicted: 90, Actual: 80 },
    { name: 'Mar', Predicted: 95, Actual: 85 },
    { name: 'Apr', Predicted: 87, Actual: 70 },
    { name: 'May', Predicted: 88, Actual: 72 },
  ];

  return (
    <div>
      <Header />
      <main className={styles.container}>
        <section className={styles.performance}>
          <div className={styles.chartContainer}>
            <h2>Student Performance</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={performanceData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {performanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className={styles.suggestions}>
            <h2>Personalized Suggestions</h2>
            <div className={styles.card}>
              <h3>Math Score</h3>
              <p className={styles.score}>85</p>
              <p className={styles.percentage}>▲ 85%</p>
            </div>
          </div>
        </section>

        <section className={styles.trends}>
          <h2>Performance Trend Analysis</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={trendData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="Predicted" fill="#8884d8" />
              <Bar dataKey="Actual" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </section>
      </main>
    </div>
  );
};

export default DashboardPage;*/

import React from 'react';
import Header from '../../components/Header';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, LineChart, Line } from 'recharts';
import './DashboardPage.css'

const DashboardPage = () => {
  // Données pour le graphique en anneau
  const performanceData = [
    { name: 'Math', value: 25, color: '#4CAF50' },
    { name: 'Science', value: 20, color: '#FF5722' },
    { name: 'English', value: 30, color: '#3F51B5' },
    { name: 'History', value: 25, color: '#E91E63' },
  ];

  // Données pour le graphique en barres
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
        

        <section className="dashboard-section">
          {/* Performance Scores */}
          <div className="performance-scores">
            <h2>Student Performance</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={performanceData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  fill="#8884d8"
                >
                  {performanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
            <p>October 2023</p>
          </div>

          {/* Personalized Suggestions */}
          <div className="personalized-suggestions">
            <h2>Personalized Suggestions</h2>
            <div className="suggestion-card">
              <h3>Math Score</h3>
              <p>85</p>
              <p style={{ color: 'green' }}>▲ 85%</p>
            </div>
          </div>
        </section>

        

        {/* Performance Trend Analysis */}
        <section className="performance-trends">
          <h2>Performance Trend Analysis</h2>
          <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={clicksData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="clicks" stroke="#8884d8" />
                        </LineChart>
                      </ResponsiveContainer>
        </section>
      </main>
    </div>
  );
};

export default DashboardPage;

