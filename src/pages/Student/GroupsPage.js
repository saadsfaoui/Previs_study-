import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import API from '../../services/api';
import './GroupsPage.css';

const GroupsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [allGroups, setAllGroups] = useState([]);
  const [filteredGroups, setFilteredGroups] = useState([]);
  const [recommendedGroups, setRecommendedGroups] = useState([]);
  const [sharedResources, setSharedResources] = useState([]);

  // Charger les données pour les groupes et les ressources
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        // Lister tous les groupes
        const allGroupsResponse = await API.get('/groups/search');
        setAllGroups(allGroupsResponse.data);
        setFilteredGroups(allGroupsResponse.data);

        // Lister les groupes recommandés
        const recommendedGroupsResponse = await API.get('/groups/recommended');
        setRecommendedGroups(recommendedGroupsResponse.data);

        // Lister les ressources partagées
        const sharedResourcesResponse = await API.get('/groups/resources');
        setSharedResources(sharedResourcesResponse.data);
      } catch (err) {
        console.error('Erreur lors du chargement des groupes et des ressources:', err);
      }
    };

    fetchGroups();
  }, []);

  // Fonction de recherche
  const handleSearch = () => {
    const filtered = allGroups.filter((group) =>
      group.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredGroups(filtered);
  };

  return (
    <div>
      <Header />
      <main className="container">
        <h1>Groups</h1>

        {/* Recherche des groupes */}
        <div className="join-group">
          <input
            type="text"
            placeholder="Search for a group"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn join" onClick={handleSearch}>
            Search
          </button>
        </div>

        {/* Lister tous les groupes */}
        <section className="groups">
          <h2>All Groups</h2>
          <div className="group-list">
            {filteredGroups.length > 0 ? (
              filteredGroups.map((group, index) => (
                <div key={index} className="group-card">
                  <h3>{group.name}</h3>
                  <p>{group.description}</p>
                </div>
              ))
            ) : (
              <p>No groups found.</p>
            )}
          </div>
        </section>

        {/* Lister les groupes recommandés */}
        <section className="recommended-groups">
          <h2>Recommended Groups</h2>
          <div className="group-list">
            {recommendedGroups.map((group, index) => (
              <div key={index} className="group-card">
                <h3>{group.name}</h3>
                <p>{group.description}</p>
                <button className="btn join">Join</button>
              </div>
            ))}
          </div>
        </section>

        {/* Lister les ressources partagées */}
        <section className="shared-resources">
          <h2>Shared Resources</h2>
          <div className="resource-list">
            {sharedResources.map((resource, index) => (
              <div key={index} className="resource-card">
                <h3>{resource.title}</h3>
                <p>{resource.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default GroupsPage;