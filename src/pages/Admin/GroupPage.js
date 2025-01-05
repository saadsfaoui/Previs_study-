import React, { useState } from 'react';
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

const GroupPage = () => {
  // Données pour le graphique Doughnut
  const groupChartData = {
    labels: ['Active Groups', 'Inactive Groups'],
    datasets: [
      {
        data: [300, 100],
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
    cutout: '70%',
  };

  // Gestion des groupes
  const [groups, setGroups] = useState([
    {
      id: '001',
      name: 'Team Alpha',
      description: 'Project Alpha Team',
      resources: ['https://resource1.com', 'https://resource2.com'],
    },
    {
      id: '002',
      name: 'Team Beta',
      description: 'Research Team',
      resources: ['https://beta-resource.com'],
    },
  ]);

  // États pour le formulaire d'ajout/modification
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [groupResource, setGroupResource] = useState('');
  const [resourceList, setResourceList] = useState([]);
  const [editGroupId, setEditGroupId] = useState(null);

  // Ajouter une ressource au tableau de ressources
  const handleAddResource = () => {
    if (groupResource.trim() !== '') {
      setResourceList([...resourceList, groupResource.trim()]);
      setGroupResource('');
    }
  };

  // Supprimer une ressource de la liste
  const handleRemoveResource = (index) => {
    setResourceList(resourceList.filter((_, i) => i !== index));
  };

  // Ajouter ou modifier un groupe
  const handleAddOrEditGroup = (e) => {
    e.preventDefault();

    if (groupName && groupDescription && resourceList.length > 0) {
      if (editGroupId) {
        // Modifier un groupe existant
        const updatedGroups = groups.map((group) =>
          group.id === editGroupId
            ? { ...group, name: groupName, description: groupDescription, resources: resourceList }
            : group
        );
        setGroups(updatedGroups);
        setEditGroupId(null);
      } else {
        // Ajouter un nouveau groupe
        const newGroup = {
          id: (groups.length + 1).toString().padStart(3, '0'),
          name: groupName,
          description: groupDescription,
          resources: resourceList,
        };
        setGroups([...groups, newGroup]);
      }
      // Réinitialiser les champs
      setGroupName('');
      setGroupDescription('');
      setResourceList([]);
    }
  };

  // Pré-remplir le formulaire pour la modification
  const handleEditGroup = (group) => {
    setGroupName(group.name);
    setGroupDescription(group.description);
    setResourceList(group.resources);
    setEditGroupId(group.id);
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-20">
      <AdminHeader />
      <main className="container mx-auto px-6">
        <h1 className="text-2xl font-bold mb-4">Groups</h1>

        {/* Section du graphique */}
        <div className="flex justify-center items-center mb-6">
          <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md w-64">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Created Groups</h3>
            <Doughnut data={groupChartData} options={chartOptions} />
            <div className="mt-4">
              <span className="text-2xl font-bold text-gray-900">300</span>
              <p className="text-red-500 text-sm mt-1">-30%</p>
            </div>
          </div>
        </div>

        {/* Formulaire pour créer ou modifier un groupe */}
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
            <ul className="list-disc ml-6">
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
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              {editGroupId ? 'Save Changes' : 'Create Group'}
            </button>
          </form>
        </div>

        {/* Tableau des groupes */}
        <div className="bg-white shadow-lg p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Existing Groups</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border-b py-2 px-4 text-left">Group ID</th>
                <th className="border-b py-2 px-4 text-left">Group Name</th>
                <th className="border-b py-2 px-4 text-left">Description</th>
                <th className="border-b py-2 px-4 text-left">Resources</th>
                <th className="border-b py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {groups.map((group) => (
                <tr key={group.id}>
                  <td className="border-b py-2 px-4">{group.id}</td>
                  <td className="border-b py-2 px-4">{group.name}</td>
                  <td className="border-b py-2 px-4">{group.description}</td>
                  <td className="border-b py-2 px-4">
                    <ul className="list-disc pl-4">
                      {group.resources.map((resource, index) => (
                        <li key={index}>
                          <a href={resource} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                            {resource}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="border-b py-2 px-4 flex space-x-2">
                  <button
                    className="text-white px-4 py-2 rounded"
                    style={{
                      backgroundColor: '#6366F1', // Violet clair
                      transition: 'background-color 0.3s',
                    }}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = '#4F46E5')} // Couleur hover
                    onMouseLeave={(e) => (e.target.style.backgroundColor = '#6366F1')} 
                    onClick={() => handleEditGroup(group)}// Couleur initiale
                  >
                    Edit
                  </button>

                    <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                      Delete
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

export default GroupPage;
