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

  // Charger les données pour tous les groupes, les groupes recommandés et rejoints
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        // Charger tous les groupes
        const allGroupsResponse = await API.get('/groups/search');
        setAllGroups(allGroupsResponse.data);

        // Charger les groupes recommandés et rejoints
        const recommendedJoinedResponse = await API.get('/groups/recommended-joined');
        setRecommendedGroups(recommendedJoinedResponse.data);

        // Extraire les liens des groupes rejoints pour les afficher comme ressources
        const joinedResources = recommendedJoinedResponse.data
          .filter((group) => group.is_joined && group.links && group.links.length > 0)
          .flatMap((group) => group.links);

        // Ajouter ces liens aux ressources partagées
        setSharedResources(joinedResources);
      } catch (err) {
        console.error('Erreur lors du chargement des données:', err);
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

  // Demander à rejoindre un groupe
  const handleRequestJoin = async (groupId) => {
    try {
      await API.post('/requests', { group_id: groupId });
      alert('Request sent successfully. Waiting for approval.');
    } catch (err) {
      console.error('Error sending request to join group:', err);
      alert(err.response?.data.message || 'An error occurred.');
    }
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
        <section className="all-groups">
          <h2>All Groups</h2>
          <div className="group-list">
            {filteredGroups.length > 0 ? (
              filteredGroups.map((group, index) => (
                <div key={index} className="group-card">
                  <h3>{group.name}</h3>
                  <p>{group.description}</p>
                </div>
              ))
            ) : allGroups.length > 0 ? (
              allGroups.map((group, index) => (
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
                {group.is_joined ? (
                  <span className="joined-label">Joined</span>
                ) : (
                  <button
                    className="btn request"
                    onClick={() => handleRequestJoin(group.id)}
                  >
                    Request to Join
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Lister les ressources partagées */}
        <section className="shared-resources">
          <h2>Shared Resources</h2>
          <div className="resource-list">
            {sharedResources.map((link, index) => (
              <div key={index} className="resource-card">
                <a href={link} target="_blank" rel="noopener noreferrer">
                  {link}
                </a>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default GroupsPage;
