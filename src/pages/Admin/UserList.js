import React, { useEffect, useState } from 'react';
import API from '../../services/api';



console.log('Token:', localStorage.getItem('token'));

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Appel API pour récupérer les utilisateurs
    API.get('/users')
      .then((response) => {
        console.log('API Response:', response.data); // Vérifiez les données ici
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
