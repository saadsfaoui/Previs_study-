import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, LineChart, Line } from 'recharts';
import API from '../../services/api';
import './PredictionsPage.css';

const PredictionsPage = () => {
  const [quarterlyData, setQuarterlyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        // Appels API pour récupérer les données
        const userPredictionsResponse = await API.get('/predictions/user');
        const monthlyOverviewResponse = await API.get('/predictions/overview');

        const userPredictions = userPredictionsResponse.data;
        const monthlyPredictions = monthlyOverviewResponse.data;

        // Transformation des données pour le BarChart (Quarterly Performance)
        const subjects = Array.from(new Set(userPredictions.map((pred) => pred.subject)));
        const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];

        const transformedQuarterlyData = quarters.map((quarter) => {
          const quarterData = { name: quarter };
          subjects.forEach((subject) => {
            const prediction = userPredictions.find(
              (pred) => pred.quarter === quarter && pred.subject === subject
            );
            quarterData[subject] = prediction ? Number(prediction.predicted_score) : 0;
          });
          return quarterData;
        });

        // Transformation des données pour le LineChart (Monthly Performance)
        const transformedMonthlyData = monthlyPredictions
          .filter((item) => item.average_score !== null && !isNaN(item.average_score)) // Filtrer les valeurs invalides
          .map((item) => ({
            month: item.month, // Format YYYY-MM
            average_score: Number(item.average_score) || 0, // Assurez-vous que la valeur est un nombre
          }));

        setQuarterlyData(transformedQuarterlyData);
        setMonthlyData(transformedMonthlyData);
      } catch (err) {
        console.error('Erreur lors du chargement des données:', err);
      }
    };

    fetchPredictions();
  }, []);

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
              <YAxis domain={[0, 100]} />
              <Tooltip />
              {quarterlyData.length > 0 &&
                Object.keys(quarterlyData[0])
                  .filter((key) => key !== 'name')
                  .map((key, index) => (
                    <Bar
                      key={index}
                      dataKey={key}
                      fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
                    />
                  ))}
            </BarChart>
          </ResponsiveContainer>
        </section>

        {/* Performance Overview (Monthly Data) */}
        <section className="performance-preferences">
          <h2>Performance Overview (Monthly)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" /> {/* Affiche le mois (YYYY-MM) */}
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Line type="monotone" dataKey="average_score" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </section>
      </main>
    </div>
  );
};

export default PredictionsPage;