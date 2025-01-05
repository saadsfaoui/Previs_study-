import React, { useState } from 'react';
import Header from '../../components/Header';
import './GroupsPage.css';
import image1 from '../../images/image1.png';
import image2 from '../../images/image2.jpg';
import image3 from '../../images/image3.jpg';

const GroupsPage = () => {
  // Données simulées pour les groupes
  const groups = [
    { name: 'Book Lovers', status: 'Member', joined: 'Jan 2023' },
    { name: 'Tech Innovators', status: 'Admin', joined: 'Mar 2022' },
  ];

  const recommendedGroups = [
    { name: 'Photography Club', description: 'Join fellow enthusiasts in exploring the art of photography.' },
    { name: 'Book Lovers Group', description: 'Dive into discussions about your favorite books and authors.' },
  ];

  const sharedResources = [
    { title: 'Group A', description: 'Access shared documents and presentations.', image: image1 },
    { title: 'Study Team', description: 'Browse through study materials and notes.', image: image2 },
    { title: 'Project X', description: 'Find resources for the upcoming project.', image: image3 },
  ];

  // État pour le terme de recherche
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredGroups, setFilteredGroups] = useState(groups);

  // Fonction de recherche
  const handleSearch = () => {
    const filtered = groups.filter(group =>
      group.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredGroups(filtered);
  };

  return (
    <div>
      <Header />
      <main className="container">
        <h1>Join a Group</h1>
        <div className="join-group">
          <input
            type="text"
            placeholder="Enter group name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn join" onClick={handleSearch}>
            Search a Group
          </button>
        </div>

        <section className="groups">
          <h2>Groups</h2>
          <div className="group-list">
            {filteredGroups.length > 0 ? (
              filteredGroups.map((group, index) => (
                <div key={index} className="group-card">
                  <h3>{group.name}</h3>
                  <p>Status: {group.status}</p>
                  <p>Joined: {group.joined}</p>
                </div>
              ))
            ) : (
              <p>No groups found.</p>
            )}
          </div>
        </section>

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

        <section className="shared-resources">
          <h2>Shared Resources</h2>
          <div className="resource-list">
            {sharedResources.map((resource, index) => (
              <div key={index} className="resource-card">
                <img src={resource.image} alt={resource.title} />
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
