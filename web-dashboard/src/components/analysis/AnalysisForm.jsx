


import React, { useState } from 'react';
import { thermalAPI } from '../../services/api';
import { toast } from 'react-toastify';

const AnalysisForm = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    cropType: '',
    measurementDate: new Date().toISOString().split('T')[0],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await thermalAPI.create(formData);
      toast.success("✅ Analysis submitted successfully!");
      setFormData({ ...formData, cropType: '' }); // Reset crop field
    } catch (error) {
      toast.error("❌ Failed to submit analysis.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">New Thermal Analysis</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Crop Type</label>
          <input 
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            placeholder="e.g. Wheat, Corn"
            value={formData.cropType}
            onChange={(e) => setFormData({...formData, cropType: e.target.value})}
            required
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition shadow-lg disabled:bg-gray-400"
        >
          {loading ? 'Processing...' : 'Submit for Analysis'}
        </button>
      </form>
    </div>
  );
};

export default AnalysisForm;