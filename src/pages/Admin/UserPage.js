import React from 'react';
import AdminHeader from '../../components/AdminHeader';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Enregistrer les composants nécessaires
ChartJS.register(ArcElement, Tooltip, Legend);

const UserPage = () => {
  // Données factices pour le graphique en cercle
  const userChartData = {
    labels: ['Registered Users', 'Remaining Capacity'],
    datasets: [
      {
        data: [1200, 300], // Exemple : 1200 utilisateurs enregistrés et 300 places restantes
        backgroundColor: ['#6366F1', '#E5E7EB'],
        hoverBackgroundColor: ['#4F46E5', '#D1D5DB'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      tooltip: {
        callbacks: {
          label: (tooltipItem) =>
            `${tooltipItem.label}: ${tooltipItem.raw}`,
        },
      },
    },
    cutout: '70%', // Rend le graphique en cercle plus mince
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-20">
      <AdminHeader />
      <main className="container mx-auto px-6">
        <h1 className="text-2xl font-bold mb-4">User Information</h1>
        {/* Graphique en cercle */}
        <div className="flex justify-center mb-6">
          <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg w-64">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Registered Users</h3>
            <Doughnut data={userChartData} options={options} />
            <div className="mt-4">
              <span className="text-2xl font-bold text-gray-900">1200</span>
              <p className="text-green-500 text-sm mt-1">+45%</p>
            </div>
          </div>
        </div>
        {/* Tableau des utilisateurs */}
        <table className="w-full border-collapse bg-white shadow rounded-lg">
          <thead>
            <tr>
              <th className="border-b py-2 px-4 text-left">Username</th>
              <th className="border-b py-2 px-4 text-left">Email</th>
              <th className="border-b py-2 px-4 text-left">Date Added</th>
              <th className="border-b py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-b py-2 px-4">Alice_W</td>
              <td className="border-b py-2 px-4">alice@example.com</td>
              <td className="border-b py-2 px-4">2023-01-15</td>
              <td className="border-b py-2 px-4">
                <button  className="text-white px-4 py-2 rounded"
                      style={{
                        backgroundColor: '#6366F1', // Violet clair pour approuver
                        transition: 'background-color 0.3s', // Transition douce pour le hover
                      }}
                      onMouseEnter={(e) => (e.target.style.backgroundColor = '#4F46E5')} // Couleur hover
                      onMouseLeave={(e) => (e.target.style.backgroundColor = '#6366F1')} 
                    >Block</button>
              </td>
            </tr>
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default UserPage;
