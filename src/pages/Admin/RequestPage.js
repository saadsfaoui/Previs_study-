import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import AdminHeader from '../../components/AdminHeader';

// Enregistrer les composants nécessaires
ChartJS.register(ArcElement, Tooltip, Legend);

const RequestPage = () => {
  // Données pour le graphique compact des demandes
  const requestChartData = {
    labels: ['Pending Requests', 'Processed Requests'],
    datasets: [
      {
        data: [50, 100], // Exemple de données
        backgroundColor: ['#6366F1', '#E5E7EB'],
        hoverBackgroundColor: ['#4F46E5', '#D1D5DB'],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (tooltipItem) =>
            `${tooltipItem.label}: ${tooltipItem.raw}`,
        },
      },
    },
    cutout: '70%', // Style compact pour le graphique en beignet
  };

  // Données factices pour le tableau
  const requests = [
    {
      course: 'Mathematics',
      student: 'Alice Cooper',
      duration: '2 weeks',
      request: 'Need assistance with homework',
    },
    {
      course: 'Physics',
      student: 'John Smith',
      duration: '1 month',
      request: 'Looking for a study group',
    },
    {
      course: 'Chemistry',
      student: 'Emma Watson',
      duration: '3 weeks',
      request: 'Need clarification on assignments',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 pt-20">
      <AdminHeader />
      <main className="container mx-auto px-6">
        <h1 className="text-2xl font-bold mb-4">Pending Requests</h1>

        {/* Graphique compact */}
        <div className="flex justify-center items-center mb-6">
          <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md w-64">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Pending Requests</h3>
            <Doughnut data={requestChartData} options={chartOptions} />
            <div className="mt-4">
              <span className="text-2xl font-bold text-gray-900">50</span>
              <p className="text-green-500 text-sm mt-1">+10%</p>
            </div>
          </div>
        </div>

        {/* Tableau des demandes */}
        <div className="bg-white shadow-lg p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Request List</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border-b py-2 px-4 text-left">Course</th>
                <th className="border-b py-2 px-4 text-left">Student</th>
                <th className="border-b py-2 px-4 text-left">Duration</th>
                <th className="border-b py-2 px-4 text-left">Request</th>
                <th className="border-b py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request, index) => (
                <tr key={index}>
                  <td className="border-b py-2 px-4">{request.course}</td>
                  <td className="border-b py-2 px-4">{request.student}</td>
                  <td className="border-b py-2 px-4">{request.duration}</td>
                  <td className="border-b py-2 px-4">{request.request}</td>
                  <td className="border-b py-2 px-4 flex space-x-2">
                    <button
                      className="text-white px-4 py-2 rounded"
                      style={{
                        backgroundColor: '#6366F1', // Violet clair pour approuver
                        transition: 'background-color 0.3s', // Transition douce pour le hover
                      }}
                      onMouseEnter={(e) => (e.target.style.backgroundColor = '#4F46E5')} // Couleur hover
                      onMouseLeave={(e) => (e.target.style.backgroundColor = '#6366F1')} // Couleur initiale
                    >
                      Approve
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                     
                      Reject
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default RequestPage;
