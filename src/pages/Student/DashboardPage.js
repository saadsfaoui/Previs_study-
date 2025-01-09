import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import API from '../../services/api';
import './DashboardPage.css';

const DashboardPage = () => {
  const [subjectsProportion, setSubjectsProportion] = useState([]);
  const [performanceData, setPerformanceData] = useState([]);
  const [averageScore, setAverageScore] = useState(null);

  const transformPerformanceData = (performanceOverTime) => {
    const groupedData = {};

    performanceOverTime.forEach((item) => {
      if (!groupedData[item.date]) {
        groupedData[item.date] = { date: item.date, scores: [] };
      }
      groupedData[item.date].scores.push(item.score);
    });

    return Object.values(groupedData).map((group) => ({
      date: group.date,
      average_score:
        group.scores.reduce((a, b) => a + b, 0) / group.scores.length,
    }));
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await API.get('/dashboard');
        const { overall_performance, subjects_proportion } = response.data;

        const performanceData = transformPerformanceData(
          overall_performance.performance_over_time
        );

        setSubjectsProportion(
          subjects_proportion.map((subject) => ({
            name: subject.name,
            average_score: Number(subject.average_score),
          }))
        );
        setPerformanceData(performanceData);
        setAverageScore(overall_performance.average_score || null);
      } catch (error) {
        console.error('Erreur lors du chargement des données du tableau de bord :', error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div>
      <Header />
      <main className="container">
        {/* Pie Chart : Moyenne des scores par matière */}
        <section className="dashboard-section">
          <div className="performance-scores">
            <h2>Subjects Proportion</h2>
            <ResponsiveContainer width="100%" height={300}>
              {subjectsProportion.length > 0 ? (
                <PieChart>
                  <Pie
                    data={subjectsProportion}
                    dataKey="average_score"
                    nameKey="name"
                    outerRadius={100}
                    fill="#8884d8"
                    label={({ name, percent }) =>
                      `${name} (${(percent * 100).toFixed(0)}%)`
                    }
                  >
                    {subjectsProportion.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={`#${Math.floor(Math.random() * 16777215).toString(
                          16
                        )}`}
                      />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              ) : (
                <p>No data available for Subjects Proportion.</p>
              )}
            </ResponsiveContainer>
          </div>

          <div className="average-score">
            <h3>Average Score</h3>
            <p>
              {averageScore !== null
                ? Number(averageScore).toFixed(2)
                : 'N/A'}
            </p>
          </div>
        </section>

        {/* Line Chart : Tendance des performances */}
        <section className="performance-trends">
          <h2>Performance Trend Analysis</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="average_score"
                stroke="#8884d8"
              />
            </LineChart>
          </ResponsiveContainer>
        </section>
      </main>
    </div>
  );
};

export default DashboardPage;
