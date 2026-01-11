

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'https://fertilizer-backend-u25f.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000, 
});

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
};

export const cropsAPI = {
  getAll: () => api.get('/crops'),
  getOne: (id) => api.get(`/crops/${id}`), 
  create: (data) => api.post('/crops', data),
  delete: (id) => api.delete(`/crops/${id}`),
};

export const thermalAPI = {
  // Used by Dashboard and Fallback search
  getAll: (params) => api.get('/thermal', { params }), 
  // Used to save new data
  create: (data) => api.post('/thermal', data),
  // Used to fetch specific records
  getOne: (id) => api.get(`/thermal/${id}`),
  // Specifically for this crop
  getByCrop: (cropId) => api.get(`/thermal/crop/${cropId}`), 
};

export const analysisAPI = {
  analyze: (thermalDataId) => api.post(`/analysis/thermal/${thermalDataId}`),
};

export default api;