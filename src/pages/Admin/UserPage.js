import React, { useState, useEffect } from 'react';
import AdminHeader from '../../components/AdminHeader';
import API from '../../services/api';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(''); // État pour la recherche
  const [filteredUsers, setFilteredUsers] = useState([]); // État pour les utilisateurs filtrés

  const fetchUsers = async () => {
    try {
      const response = await API.get('/users');
      setUsers(response.data);
      setFilteredUsers(response.data); // Initialiser les utilisateurs filtrés
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      alert('Erreur lors du chargement des utilisateurs.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Fonction pour filtrer les utilisateurs en fonction du nom
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(query)
    );
    setFilteredUsers(filtered);
  };

  const handleBlockUser = async (userId) => {
    try {
      await API.put(`/users/${userId}/block`);
      alert('User blocked successfully');
      fetchUsers();
    } catch (error) {
      console.error('Error blocking user:', error);
      alert('Failed to block user');
    }
  };

  const handleUnblockUser = async (userId) => {
    try {
      await API.put(`/users/${userId}/unblock`);
      alert('User unblocked successfully');
      fetchUsers();
    } catch (error) {
      console.error('Error unblocking user:', error);
      alert('Failed to unblock user');
    }
  };

  const userChartData = {
    labels: ['Registered Users', 'Remaining Capacity'],
    datasets: [
      {
        data: [users.length, 300 - users.length],
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
          label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}`,
        },
      },
    },
    cutout: '70%',
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-20">
      <AdminHeader />
      <main>
        <div className="container mx-auto px-6">
          <h1 className="text-2xl font-bold mb-4">User Information</h1>
          {/* Graphique en cercle */}
          <div className="flex justify-center mb-6">
            <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg w-full max-w-xs">
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                Registered Users
              </h3>
              <Doughnut data={userChartData} options={options} />
              <div className="mt-4">
                <span className="text-2xl font-bold text-gray-900">
                  {users.length}
                </span>
              </div>
            </div>
          </div>

          {/* Zone de recherche */}
          <div className="mb-6">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search by username"
              className="px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Tableau des utilisateurs */}
          <div className="bg-white shadow-lg p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4 text-blue-600">
              Existing Users
            </h2>
            {loading ? (
              <p>Loading users...</p>
            ) : (
              <div className="overflow-auto"> {/* Conteneur avec overflow pour le tableau */}
                <table className="w-full border-collapse bg-white shadow rounded-lg min-w-[600px]">
                  <thead>
                    <tr>
                      <th className="border-b py-2 px-4 text-left">Username</th>
                      <th className="border-b py-2 px-4 text-left">Email</th>
                      <th className="border-b py-2 px-4 text-left">Date Added</th>
                      <th className="border-b py-2 px-4 text-left">Status</th>
                      <th className="border-b py-2 px-4 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="border-b py-2 px-4">{user.name}</td>
                        <td className="border-b py-2 px-4">{user.email}</td>
                        <td className="border-b py-2 px-4">
                          {new Date(user.created_at).toLocaleString()}
                        </td>
                        <td className="border-b py-2 px-4">
                          {user.is_blocked ? (
                            <span className="text-red-500 font-bold">
                              Blocked
                            </span>
                          ) : (
                            <span className="text-green-500 font-bold">
                              Active
                            </span>
                          )}
                        </td>
                        <td className="border-b py-2 px-4 text-center">
                          <button
                            className="text-white px-4 py-2 rounded bg-indigo-500 hover:bg-indigo-600 transition-colors"
                            onClick={() => handleBlockUser(user.id)}
                          >
                            Block
                          </button>
                          <button
                            className="ml-2 text-white px-4 py-2 rounded bg-green-500 hover:bg-green-600 transition-colors"
                            onClick={() => handleUnblockUser(user.id)}
                          >
                            Unblock
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserPage;
