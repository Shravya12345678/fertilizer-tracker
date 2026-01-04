// import axios from 'axios';

// const API_BASE_URL = 'http://localhost:5000/api';

// const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json'
//   }
// });

// // Request interceptor to add auth token
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Auth APIs
// export const authAPI = {
//   register: (data) => api.post('/auth/register', data),
//   login: (data) => api.post('/auth/login', data),
//   getMe: () => api.get('/auth/me'),
// };

// // Crops APIs
// export const cropsAPI = {
//   getAll: (params) => api.get('/crops', { params }),
//   getOne: (id) => api.get(`/crops/${id}`),
//   create: (data) => api.post('/crops', data),
// };

// // Thermal & Analysis APIs
// export const thermalAPI = {
//   create: (data) => api.post('/thermal', data),
//   getOne: (id) => api.get(`/thermal/${id}`),
//   getAll: (params) => api.get('/thermal', { params }),
// };

// export const analysisAPI = {
//   analyze: (thermalId) => api.post(`/analysis/thermal/${thermalId}`),
// };

// export default api;

import axios from 'axios';

// const API_BASE_URL = 'http://localhost:5000/api';
const API_BASE_URL = "https://fertilizer-backend.onrender.com"
// const API_BASE_URL = process.env.NODE_ENV === 'production' 
//   ? 'https://your-backend-api.onrender.com' // Replace with your live backend URL later
//   : 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth APIs
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
};

// Crops APIs
export const cropsAPI = {
  getAll: (params) => api.get('/crops', { params }),
  getOne: (id) => api.get(`/crops/${id}`),
  create: (data) => api.post('/crops', data),
  delete: (id) => api.delete(`/crops/${id}`), // Added to support CropList.jsx
};

// Thermal & Analysis APIs
export const thermalAPI = {
  create: (data) => api.post('/thermal', data),
  getOne: (id) => api.get(`/thermal/${id}`),
  getById: (id) => api.get(`/thermal/${id}`), // Add this line!
  getAll: (params) => api.get('/thermal', { params }),
};
// export const thermalAPI = {
//   create: (data) => api.post('/thermal', data),
//   getOne: (id) => api.get(`/thermal/${id}`),
//   getAll: (params) => api.get('/thermal', { params }),
// };

export const analysisAPI = {
  analyze: (thermalId) => api.post(`/analysis/thermal/${thermalId}`),
};

export default api;