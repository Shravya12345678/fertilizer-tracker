// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// // ⚠️ IMPORTANT: Replace with your Render backend URL
// const API_BASE_URL = 'https://fertilizer-backend-u25f.onrender.com/api';

// const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   timeout: 30000, // 30 seconds for ML processing
// });

// // Add auth token to requests
// api.interceptors.request.use(
//   async (config) => {
//     const token = await AsyncStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Handle 401 errors
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (error.response?.status === 401) {
//       await AsyncStorage.removeItem('token');
//       await AsyncStorage.removeItem('user');
//     }
//     return Promise.reject(error);
//   }
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
//   delete: (id) => api.delete(`/crops/${id}`),
// };

// // Thermal Data APIs
// export const thermalAPI = {
//   getAll: (params) => api.get('/thermal', { params }),
//   getOne: (id) => api.get(`/thermal/${id}`),
//   create: (data) => api.post('/thermal', data),
// };

// // Analysis APIs
// export const analysisAPI = {
//   analyze: (thermalDataId) => api.post(`/analysis/thermal/${thermalDataId}`),
// };

// export default api;

// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// // ⚠️ IMPORTANT: Replace with your Render backend URL
// const API_BASE_URL = 'https://fertilizer-backend-u25f.onrender.com/api';

// const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   timeout: 30000, // 30 seconds for ML processing
// });

// // Add auth token to requests
// api.interceptors.request.use(
//   async (config) => {
//     const token = await AsyncStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Handle 401 errors
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (error.response?.status === 401) {
//       await AsyncStorage.removeItem('token');
//       await AsyncStorage.removeItem('user');
//     }
//     return Promise.reject(error);
//   }
// );

// // Auth APIs
// export const authAPI = {
//   register: (data) => api.post('/auth/register', data),
//   login: (data) => api.post('/auth/login', data),
//   getMe: () => api.get('/auth/me'),
// };

// // Crops APIs
// export const cropsAPI = {
//   getAll: () => api.get('/crops'),
//   // Check if your backend uses /crops/:id OR /crop/:id
//   // Most "Finalized PDF" setups use plural:
//   getOne: (id) => api.get(`/crops/${id}`), 
//   create: (data) => api.post('/crops', data),
//   delete: (id) => api.delete(`/crops/${id}`),
// };
// // export const cropsAPI = {
// //   getAll: (params) => api.get('/crops', { params }),
// //   getOne: (id) => api.get(`/crops/${id}`),
// //   create: (data) => api.post('/crops', data),
// //   delete: (id) => api.delete(`/crops/${id}`),
// // };

// // Thermal Data APIs
// export const thermalAPI = {
//   // Fix: Some backends use /thermal/crop/:cropId 
//   // Let's use the most common one from the PDF:
//   create: (data) => api.post('/thermal', data),
//   getOne: (id) => api.get(`/thermal/${id}`),
//   // Add this one just in case the backend uses a list:
//   getByCrop: (cropId) => api.get(`/thermal/crop/${cropId}`), 
// };
// // export const thermalAPI = {
// //   getAll: (params) => api.get('/thermal', { params }),
// //   getOne: (id) => api.get(`/thermal/${id}`),
// //   create: (data) => api.post('/thermal', data),
// // };

// // Analysis APIs
// export const analysisAPI = {
//   analyze: (thermalDataId) => api.post(`/analysis/thermal/${thermalDataId}`),
// };

// export default api;

// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// // ⚠️ IMPORTANT: Verify this is your specific RENDER URL (not the Vercel URL)
// const API_BASE_URL = 'https://fertilizer-backend-u25f.onrender.com/api';

// const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   timeout: 30000, 
// });

// api.interceptors.request.use(
//   async (config) => {
//     const token = await AsyncStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (error.response?.status === 401) {
//       await AsyncStorage.removeItem('token');
//       await AsyncStorage.removeItem('user');
//     }
//     return Promise.reject(error);
//   }
// );

// export const authAPI = {
//   register: (data) => api.post('/auth/register', data),
//   login: (data) => api.post('/auth/login', data),
//   getMe: () => api.get('/auth/me'),
// };

// export const cropsAPI = {
//   getAll: () => api.get('/crops'),
//   getOne: (id) => api.get(`/crops/${id}`), 
//   create: (data) => api.post('/crops', data),
//   delete: (id) => api.delete(`/crops/${id}`),
// };

// export const thermalAPI = {
//   // Update this to accept params like { cropId: '123' }
//   getAll: (params) => api.get('/thermal', { params }), 
  
//   create: (data) => api.post('/thermal', data),
//   getOne: (id) => api.get(`/thermal/${id}`),
  
//   // Add this helper for specific crop filtering
//   getByCrop: (cropId) => api.get(`/thermal/crop/${cropId}`), 
// };

// // export const thermalAPI = {
// //   // Add this line back - the Dashboard needs it!
// //   getAll: (params) => api.get('/thermal', { params }), 
  
// //   create: (data) => api.post('/thermal', data),
// //   getOne: (id) => api.get(`/thermal/${id}`),
// //   getByCrop: (cropId) => api.get(`/thermal/crop/${cropId}`), 
// // };

// // export const thermalAPI = {
// //   create: (data) => api.post('/thermal', data),
// //   getOne: (id) => api.get(`/thermal/${id}`),
// //   // This is the specific route for fetching data for a single crop
// //   getByCrop: (cropId) => api.get(`/thermal/crop/${cropId}`), 
// // };


// export const analysisAPI = {
//   analyze: (thermalDataId) => api.post(`/analysis/thermal/${thermalDataId}`),
// };

// export default api;

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