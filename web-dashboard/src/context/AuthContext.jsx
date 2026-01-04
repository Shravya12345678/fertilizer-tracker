// import React, { createContext, useState, useContext, useEffect } from 'react';
// import { authAPI } from '../services/api';

// const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//   const initAuth = async () => {
//     const token = localStorage.getItem('token');
//     const savedUser = localStorage.getItem('user');

//     if (token && savedUser) {
//       setUser(JSON.parse(savedUser));
//       try {
//         const response = await authAPI.getMe();
//         setUser(response.data.data.user);
//       } catch (error) {
//         console.error('Auth check failed:', error);
//         logout();
//       }
//     }
//     setLoading(false);
//   };
  
//   initAuth();
// }, []);

// //   useEffect(() => {
// //     checkAuth();
// //   }, []);

//   const checkAuth = async () => {
//     const token = localStorage.getItem('token');
//     const savedUser = localStorage.getItem('user');
//     if (token && savedUser) {
//       setUser(JSON.parse(savedUser));
//       try {
//         const response = await authAPI.getMe();
//         setUser(response.data.data.user);
//       } catch (error) {
//         logout();
//       }
//     }
//     setLoading(false);
//   };

//   const login = async (email, password) => {
//     try {
//       const response = await authAPI.login({ email, password });
//       const { token, user } = response.data.data;
//       localStorage.setItem('token', token);
//       localStorage.setItem('user', JSON.stringify(user));
//       setUser(user);
//       return { success: true };
//     } catch (error) {
//       return { success: false, error: error.response?.data?.message || 'Login failed' };
//     }
//   };

//   const register = async (userData) => {
//     try {
//       const response = await authAPI.register(userData);
//       const { token, user } = response.data.data;
//       localStorage.setItem('token', token);
//       localStorage.setItem('user', JSON.stringify(user));
//       setUser(user);
//       return { success: true };
//     } catch (error) {
//       return { success: false, error: error.response?.data?.message || 'Registration failed' };
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, register, logout, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// import React, { createContext, useState, useContext, useEffect } from 'react';
// import { authAPI } from '../services/api';

// const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Define checkAuth outside so it can be reused
//   const checkAuth = async () => {
//     const token = localStorage.getItem('token');
//     const savedUser = localStorage.getItem('user');

//     if (token && savedUser) {
//       setUser(JSON.parse(savedUser));
//       try {
//         const response = await authAPI.getMe();
//         setUser(response.data.data.user);
//       } catch (error) {
//         console.error('Auth check failed:', error);
//         logout(); // Clear session if token is invalid
//       }
//     }
//     setLoading(false);
//   };

//   // Run the check once when the app starts
//   useEffect(() => {
//     checkAuth();
//   }, []);

//   const login = async (email, password) => {
//     try {
//       const response = await authAPI.login({ email, password });
//       const { token, user } = response.data.data;
//       localStorage.setItem('token', token);
//       localStorage.setItem('user', JSON.stringify(user));
//       setUser(user);
//       return { success: true };
//     } catch (error) {
//       return { success: false, error: error.response?.data?.message || 'Login failed' };
//     }
//   };

//   const register = async (userData) => {
//     try {
//       const response = await authAPI.register(userData);
//       const { token, user } = response.data.data;
//       localStorage.setItem('token', token);
//       localStorage.setItem('user', JSON.stringify(user));
//       setUser(user);
//       return { success: true };
//     } catch (error) {
//       return { success: false, error: error.response?.data?.message || 'Registration failed' };
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     setUser(null);
//   };

//   return (
//     // Adding checkAuth here makes it "used" and accessible to other components
//     <AuthContext.Provider value={{ user, login, register, logout, loading, checkAuth }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };


import React, { createContext, useState, useContext, useEffect, useCallback } from 'react'; // Added useCallback
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. Wrap checkAuth in useCallback to stabilize it
  const checkAuth = useCallback(async () => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');

    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
      try {
        const response = await authAPI.getMe();
        setUser(response.data.data.user);
      } catch (error) {
        console.error('Auth check failed:', error);
        logout();
      }
    }
    setLoading(false);
  }, []); // Empty array means this function is created only once

  // 2. Add checkAuth to the dependency array
  useEffect(() => {
    checkAuth();
  }, [checkAuth]); // This satisfies the ESLint rule

  const login = async (email, password) => {
    try {
      const response = await authAPI.login({ email, password });
      const { token, user } = response.data.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Login failed' };
    }
  };

  const register = async (userData) => {
    try {
      const response = await authAPI.register(userData);
      const { token, user } = response.data.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Registration failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};