import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import AdminHeader from '../../components/AdminHeader';
import API from '../../services/api';

ChartJS.register(ArcElement, Tooltip, Legend);

const RequestPage = () => {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('');

  const fetchRequests = async () => {
    try {
      const response = await API.get('/requests');
      setRequests(response.data);
      setFilteredRequests(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching requests:', error);
      alert('Erreur lors du chargement des demandes.');
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await API.put(`/requests/${id}/approve`);
      alert('Demande approuvée avec succès');
      fetchRequests();
    } catch (error) {
      console.error('Error approving request:', error);
      alert("Erreur lors de l'approbation de la demande.");
    }
  };

  const handleReject = async (id) => {
    try {
      await API.put(`/requests/${id}/reject`);
      alert('Demande rejetée avec succès');
      fetchRequests();
    } catch (error) {
      console.error('Error rejecting request:', error);
      alert("Erreur lors du rejet de la demande.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Voulez-vous vraiment supprimer cette demande ?')) {
      try {
        await API.delete(`/requests/${id}`);
        alert('Demande supprimée avec succès');
        fetchRequests();
      } catch (error) {
        console.error('Error deleting request:', error);
        alert('Erreur lors de la suppression de la demande.');
      }
    }
  };

  const handleFilterChange = (e) => {
    const selectedStatus = e.target.value;
    setFilterStatus(selectedStatus);

    if (selectedStatus === '') {
      setFilteredRequests(requests);
    } else {
      const filtered = requests.filter((request) => request.status === selectedStatus);
      setFilteredRequests(filtered);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const requestChartData = {
    labels: ['Pending Requests', 'Processed Requests'],
    datasets: [
      {
        data: [
          requests.filter((req) => req.status === 'pending').length,
          requests.filter((req) => req.status !== 'pending').length,
        ],
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
          label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}`,
        },
      },
    },
    cutout: '70%',
  };

  const calculateDuration = (createdAt) => {
    const createdDate = new Date(createdAt);
    const currentDate = new Date();
    const differenceInDays = Math.floor(
      (currentDate - createdDate) / (1000 * 60 * 60 * 24)
    );

    if (differenceInDays === 0) return 'Today';
    if (differenceInDays === 1) return '1 day ago';
    return `${differenceInDays} days ago`;
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-20">
      <AdminHeader />
      <main className="container mx-auto px-6">
        <h1 className="text-2xl font-bold mb-4">Pending Requests</h1>

        <div className="flex justify-center items-center mb-6">
          <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md w-64">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Pending Requests</h3>
            <Doughnut data={requestChartData} options={chartOptions} />
            <div className="mt-4">
              <span className="text-2xl font-bold text-gray-900">
                {requests.filter((req) => req.status === 'pending').length}
              </span>
              <p className="text-green-500 text-sm mt-1">+10%</p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="filterStatus" className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Status
          </label>
          <select
            id="filterStatus"
            value={filterStatus}
            onChange={handleFilterChange}
            className="px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <div className="bg-white shadow-lg p-6 rounded-lg overflow-auto">
          <h2 className="text-xl font-bold mb-4">Request List</h2>
          {loading ? (
            <p>Chargement des demandes...</p>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border-b py-2 px-4 text-left">Group</th>
                  <th className="border-b py-2 px-4 text-left">Student</th>
                  <th className="border-b py-2 px-4 text-left">Duration</th>
                  <th className="border-b py-2 px-4 text-left">State</th>
                  <th className="border-b py-2 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map((request) => (
                  <tr key={request.id}>
                    <td className="border-b py-2 px-4">{request.group?.name || 'N/A'}</td>
                    <td className="border-b py-2 px-4">{request.user?.name || 'N/A'}</td>
                    <td className="border-b py-2 px-4">{calculateDuration(request.created_at)}</td>
                    <td className="border-b py-2 px-4">
                      <span
                        className={`px-2 py-1 rounded text-white ${
                          request.status === 'pending'
                            ? 'bg-yellow-500'
                            : request.status === 'approved'
                            ? 'bg-green-500'
                            : 'bg-red-500'
                        }`}
                      >
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </span>
                    </td>
                    <td className="border-b py-2 px-4 text-center">
  <div className="flex flex-col items-center justify-center space-y-2">
    <button
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      onClick={() => handleApprove(request.id)}
    >
      Approve
    </button>
    <button
      className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
      onClick={() => handleReject(request.id)}
    >
      Reject
    </button>
    <button
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      onClick={() => handleDelete(request.id)}
    >
      Delete
    </button>
  </div>
</td>

                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
};

export default RequestPage;
