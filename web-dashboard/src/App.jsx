
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Auth pages
import Login from './components/auth/Login';
import Register from './components/auth/Register';

// Dashboard & Management pages
import Dashboard from './components/dashboard/Dashboard';
import ResultsDashboard from './components/dashboard/ResultsDashboard';
//import ResultsDashboard from './pages/analytics/ResultsDashboard';
import CropList from './components/crops/CropList';
import CropDetail from './components/crops/CropDetail';
import ThermalForm from './components/thermal/ThermalForm';
import AnalysisResults from './components/analysis/AnalysisResults';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import AnalysisForm from './components/analysis/AnalysisForm';


// Layout
import Navbar from './components/layout/Navbar';

// --- UPDATED PROTECTED ROUTE ---
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        
        <div style={{ fontSize: '1.25rem' }}>Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
  <div>
    <Navbar />
    {/* This pt-16 class in your new CSS will provide the 4rem top padding */}
    <div className="pt-16"> 
      {children}
    </div>
  </div>
  );
};


function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
      <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />

      {/* Protected routes */}
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      
      {/* FIX: Changed path to /analytics and wrapped in ProtectedRoute */}
      <Route path="/analytics" element={<ProtectedRoute><ResultsDashboard /></ProtectedRoute>} />
      
      
      <Route path="/crops" element={<ProtectedRoute><CropList /></ProtectedRoute>} />
      <Route path="/crops/:id" element={<ProtectedRoute><CropDetail /></ProtectedRoute>} />
      <Route path="/thermal/new" element={<ProtectedRoute><ThermalForm /></ProtectedRoute>} />
      <Route path="/analysis/:id" element={<ProtectedRoute><AnalysisResults /></ProtectedRoute>} />
      {/* <Route path="/new-analysis" element={<AnalysisForm />} /> */}

      {/* <Route path="/new-analysis" element={<ProtectedRoute><AnalysisForm /></ProtectedRoute>} /> */}

      {/* Default redirect */}
      <Route path="/" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}



function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        {/* 2. Add ToastContainer here */}
        <ToastContainer 
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;