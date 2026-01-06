import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cropsAPI, thermalAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { Loader2 } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalCrops: 0,
    activeCrops: 0,
    totalMeasurements: 0,
    processedMeasurements: 0
  });
  const [recentCrops, setRecentCrops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [cropsRes, thermalRes] = await Promise.all([
        cropsAPI.getAll({ limit: 5 }),
        thermalAPI.getAll({ limit: 5 })
      ]);

      const crops = cropsRes.data.data.crops;
      const thermal = thermalRes.data.data.thermalData;

      setRecentCrops(crops);
      setStats({
        totalCrops: cropsRes.data.total,
        activeCrops: crops.filter(c => c.status === 'active').length,
        totalMeasurements: thermalRes.data.total,
        processedMeasurements: thermal.filter(t => t.processed).length
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome back, {user?.username}! 👋
        </h1>
        <p className="text-gray-600 mt-2">
          Here's an overview of your fertilizer efficiency tracking
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Crops</p>
              <p className="text-3xl font-bold text-gray-800">{stats.totalCrops}</p>
            </div>
            <div className="text-4xl">🌾</div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Crops</p>
              <p className="text-3xl font-bold text-green-600">{stats.activeCrops}</p>
            </div>
            <div className="text-4xl">✅</div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Measurements</p>
              <p className="text-3xl font-bold text-gray-800">{stats.totalMeasurements}</p>
            </div>
            <div className="text-4xl">🌡️</div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Analyzed</p>
              <p className="text-3xl font-bold text-blue-600">{stats.processedMeasurements}</p>
            </div>
            <div className="text-4xl">📊</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Link to="/crops" className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
          <h3 className="text-xl font-bold mb-2">Manage Crops</h3>
          <p className="text-green-100">View and manage your crop records</p>
        </Link>
        <Link to="/thermal/new" className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
          <h3 className="text-xl font-bold mb-2">Add Thermal Data</h3>
          <p className="text-blue-100">Record new thermal measurements</p>
        </Link>

        {/* UPDATED: Purple card is now a Link to /analytics */}
        <Link to="/analytics" className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
          <h3 className="text-xl font-bold mb-2">AI Analysis</h3>
          <p className="text-purple-100">Get ML-powered recommendations</p>
        </Link>
      </div>

      {/* Recent  Activity Table */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Crops</h2>
        {recentCrops.length === 0 ? (
          <p className="text-gray-500">No crops yet. Create your first crop!</p>
        ) : (
          <div className="space-y-3">
            {recentCrops.map((crop) => (
              <Link key={crop._id} to={`/crops/${crop._id}`} className="block p-4 border border-gray-200 rounded-lg hover:border-green-500 hover:shadow-md transition">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-gray-800">{crop.cropName}</h3>
                    <p className="text-sm text-gray-600">{crop.cropType} • {crop.fieldSize} acres</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${crop.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {crop.status}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;