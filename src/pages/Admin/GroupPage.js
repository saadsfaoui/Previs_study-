import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import AdminHeader from '../../components/AdminHeader';
import API from '../../services/api';

ChartJS.register(ArcElement, Tooltip, Legend);

const GroupPage = () => {
  const [groups, setGroups] = useState([]);
  const [filteredGroups, setFilteredGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [groupResource, setGroupResource] = useState('');
  const [resourceList, setResourceList] = useState([]);
  const [editGroupId, setEditGroupId] = useState(null);

  const fetchGroups = async () => {
    try {
      const response = await API.get('/groups');
      setGroups(response.data);
      setFilteredGroups(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching groups:', error);
      alert('Erreur lors du chargement des groupes.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = groups.filter((group) =>
      group.name.toLowerCase().includes(query)
    );
    setFilteredGroups(filtered);
  };

  const handleAddOrEditGroup = async (e) => {
    e.preventDefault();

    if (groupName && groupDescription) {
      try {
        const groupData = {
          name: groupName,
          description: groupDescription,
          links: resourceList,
        };

        if (editGroupId) {
          await API.put(`/groups/${editGroupId}`, groupData);
          alert('Groupe modifié avec succès');
        } else {
          const response = await API.post('/groups', groupData);
          setGroups([...groups, response.data]);
          alert('Groupe créé avec succès');
        }
        fetchGroups();
        resetForm();
      } catch (error) {
        console.error('Error saving group:', error.response?.data || error);
        alert('Erreur lors de la sauvegarde du groupe.');
      }
    }
  };

  const handleDeleteGroup = async (id) => {
    if (window.confirm('Voulez-vous vraiment supprimer ce groupe ?')) {
      try {
        await API.delete(`/groups/${id}`);
        alert('Groupe supprimé avec succès');
        fetchGroups();
      } catch (error) {
        console.error('Error deleting group:', error);
        alert('Erreur lors de la suppression du groupe.');
      }
    }
  };

  const resetForm = () => {
    setGroupName('');
    setGroupDescription('');
    setResourceList([]);
    setGroupResource('');
    setEditGroupId(null);
  };

  const handleEditGroup = (group) => {
    setGroupName(group.name);
    setGroupDescription(group.description);
    setResourceList(group.links || []);
    setGroupResource('');
    setEditGroupId(group.id);
  };

  const handleAddResource = () => {
    if (groupResource.trim() !== '') {
      setResourceList([...resourceList, groupResource.trim()]);
      setGroupResource('');
    }
  };

  const handleRemoveResource = (index) => {
    setResourceList(resourceList.filter((_, i) => i !== index));
  };

  const groupChartData = {
    labels: ['Groups Created', 'Inactive Groups'],
    datasets: [
      {
        data: [groups.length, 0],
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

  return (
    <div className="min-h-screen bg-gray-100 pt-20">
      <AdminHeader />
      <main className="container mx-auto px-6">
        <h1 className="text-2xl font-bold mb-4">Groups</h1>

        <div className="flex justify-center items-center mb-6">
          <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md w-64">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Created Groups</h3>
            <Doughnut data={groupChartData} options={chartOptions} />
            <div className="mt-4">
              <span className="text-2xl font-bold text-gray-900">{groups.length}</span>
              <p className="text-green-500 text-sm mt-1">+{groups.length}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-md p-6 rounded-lg mb-6">
          <h2 className="text-xl font-bold mb-4">
            {editGroupId ? 'Edit Group' : 'Create a New Group'}
          </h2>
          <form onSubmit={handleAddOrEditGroup} className="flex flex-col gap-4">
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Group Name"
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <textarea
              value={groupDescription}
              onChange={(e) => setGroupDescription(e.target.value)}
              placeholder="Group Description"
              rows="3"
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>

            <div className="flex gap-2 items-center">
              <input
                type="text"
                value={groupResource}
                onChange={(e) => setGroupResource(e.target.value)}
                placeholder="Add Resource"
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={handleAddResource}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Add
              </button>
            </div>

            <ul className="list-disc ml-6 mt-4">
              {resourceList.map((resource, index) => (
                <li key={index} className="flex items-center justify-between">
                  <span>{resource}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveResource(index)}
                    className="text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>

            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4"
            >
              {editGroupId ? 'Save Changes' : 'Create Group'}
            </button>
          </form>
        </div>

        <div className="mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search groups by name"
            className="px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="bg-white shadow-lg p-6 rounded-lg">
  <h2 className="text-xl font-bold mb-4">Existing Groups</h2>
  {loading ? (
    <p>Loading groups...</p>
  ) : filteredGroups.length > 0 ? (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse min-w-[600px]">
        <thead>
          <tr>
            <th className="border-b py-2 px-4 text-left">Group ID</th>
            <th className="border-b py-2 px-4 text-left">Group Name</th>
            <th className="border-b py-2 px-4 text-left">Description</th>
            <th className="border-b py-2 px-4 text-left">Links</th>
            <th className="border-b py-2 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredGroups.map((group) => (
            <tr key={group.id}>
              <td className="border-b py-2 px-4">{group.id}</td>
              <td className="border-b py-2 px-4">{group.name}</td>
              <td className="border-b py-2 px-4">{group.description}</td>
              <td className="border-b py-2 px-4">
                <ul>
                  {group.links?.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline break-all"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </td>
              <td className="border-b py-2 px-4">
                <div className="flex flex-col items-center justify-center gap-2">
                  <button
                    className=" bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded"
                    onClick={() => handleEditGroup(group)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    onClick={() => handleDeleteGroup(group.id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <p>No groups available.</p>
  )}
</div>

      </main>
    </div>
  );
};

export default GroupPage;
