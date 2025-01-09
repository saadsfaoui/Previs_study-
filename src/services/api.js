import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL, // URL du backend
  headers: {
    'Content-Type': 'application/json',
  },
});

// Ajouter un intercepteur pour inclure le token dans les headers
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Récupérer le token depuis le stockage local
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Inclure le token dans le header Authorization
  }
  return config;
});

export default API;
