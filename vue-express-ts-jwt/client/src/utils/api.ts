import axios from 'axios';

const API_URL = 'http://localhost:5123/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response ? error.response.status : null;

    // Handle authentication errors
    if (status === 401) {
      // Optionally clear token if it's invalid
      localStorage.removeItem('token');
      // You could also redirect to login page here
    }

    return Promise.reject(error);
  }
);

export default api; 