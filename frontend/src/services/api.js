import axios from 'axios';

const API = axios.create({
  baseURL: 'https://nourishnet-fr95.onrender.com/api',
});

// Add token to headers if it exists
API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('userInfo'));
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export default API;
