// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const ThermalForm = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({ cropId: '', notes: '' });
//   const [file, setFile] = useState(null);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Saving data:", formData, file);
//     // Logic to send to backend goes here
//     alert("Analysis submitted! Redirecting to dashboard...");
//     navigate('/dashboard');
//   };

//   return (
//     <div className="container" style={{ maxWidth: '600px' }}>
//       <div className="card">
//         <h2 style={{ marginBottom: '20px', color: '#111827' }}>New Thermal Analysis</h2>
//         <form onSubmit={handleSubmit}>
//           <div style={{ marginBottom: '15px' }}>
//             <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Select Crop</label>
//             <select 
//               style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)' }}
//               onChange={(e) => setFormData({...formData, cropId: e.target.value})}
//               required
//             >
//               <option value="">-- Select a field --</option>
//               <option value="1">Main Wheat Field</option>
//               <option value="2">East Potato Plot</option>
//             </select>
//           </div>

//           <div style={{ marginBottom: '15px' }}>
//             <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Thermal Image</label>
//             <input 
//               type="file" 
//               accept="image/*"
//               style={{ width: '100%', padding: '10px', background: '#f9fafb', borderRadius: '8px', border: '1px dashed #d1d5db' }}
//               onChange={(e) => setFile(e.target.files[0])}
//               required
//             />
//           </div>

//           <div style={{ marginBottom: '20px' }}>
//             <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Notes</label>
//             <textarea 
//               rows="3"
//               style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)' }}
//               placeholder="Observation notes..."
//               onChange={(e) => setFormData({...formData, notes: e.target.value})}
//             ></textarea>
//           </div>

//           <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
//             Start Analysis Pipeline
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ThermalForm;

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cropsAPI, thermalAPI } from '../../services/api';
import { toast } from 'react-toastify';
import { Loader2 } from 'lucide-react';

const ThermalForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Initialize state, checking if a cropId was passed from the previous page
  const [formData, setFormData] = useState({
    cropId: location.state?.cropId || '',
    beforeTemp: '',
    afterTemp: '',
    environmental: {
      temperature: '',
      humidity: '',
      rainfall: ''
    },
    fertilizer: {
      type: 'NPK',
      amount: '',
      unit: 'kg'
    }
  });

  useEffect(() => {
    fetchCrops();
  }, []);

  const fetchCrops = async () => {
    try {
      const response = await cropsAPI.getAll();
      // Adjusting to match the common backend response structure: response.data.data.crops
      const cropData = response.data?.data?.crops || response.data || [];
      setCrops(cropData);
    } catch (error) {
      console.error('Error fetching crops:', error);
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    // 1. Your existing API call to save the data
    await thermalAPI.create(formData); 

    // 2. ADD THIS LINE HERE:
    toast.success('✅ Thermal Data Added Successfully!', {
      position: "top-right",
      autoClose: 3000,
      theme: "colored",
    });

    // 3. Navigate back to dashboard or clear form
    navigate('/dashboard'); 
    
  } catch (error) {
    // 4. ADD THIS LINE FOR ERRORS:
    toast.error('❌ Failed to save data. Please check your inputs.');
    console.error(error);
  } finally {
    setLoading(false);
  }
};

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);

  //   try {
  //     await thermalAPI.create(formData);
  //     alert('Thermal data added successfully!');
  //     // Navigate back to the specific crop details page after saving
  //     navigate(`/crops/${formData.cropId}`);
  //   } catch (error) {
  //     console.error('Error creating thermal data:', error);
  //     alert('Failed to add thermal data: ' + (error.response?.data?.message || 'Unknown error'));
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-green-600 hover:text-green-700 font-medium"
      >
        ← Back
      </button>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Add Thermal Measurement
        </h1>
        <p className="text-gray-600 mb-8">
          Record thermal data and environmental conditions for analysis.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Crop Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Crop *
            </label>
            <select
              value={formData.cropId}
              onChange={(e) => setFormData({...formData, cropId: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              required
            >
              <option value="">Choose a crop...</option>
              {crops.map((crop) => (
                <option key={crop._id} value={crop._id}>
                  {crop.cropName} ({crop.cropType})
                </option>
              ))}
            </select>
          </div>

          {/* Temperature Measurements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Before Temperature (°C) *
              </label>
              <input
                type="number"
                step="0.1"
                value={formData.beforeTemp}
                onChange={(e) => setFormData({...formData, beforeTemp: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                placeholder="e.g. 28.5"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                After Temperature (°C) *
              </label>
              <input
                type="number"
                step="0.1"
                value={formData.afterTemp}
                onChange={(e) => setFormData({...formData, afterTemp: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                placeholder="e.g. 26.2"
                required
              />
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Environmental Data */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Environmental Conditions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Air Temp (°C) *
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.environmental.temperature}
                  onChange={(e) => setFormData({
                    ...formData,
                    environmental: {...formData.environmental, temperature: e.target.value}
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                  placeholder="30.0"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Humidity (%) *
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.environmental.humidity}
                  onChange={(e) => setFormData({
                    ...formData,
                    environmental: {...formData.environmental, humidity: e.target.value}
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                  placeholder="65"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rainfall (mm) *
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.environmental.rainfall}
                  onChange={(e) => setFormData({
                    ...formData,
                    environmental: {...formData.environmental, rainfall: e.target.value}
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                  placeholder="10.0"
                  required
                />
              </div>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Fertilizer Data */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Fertilizer Application
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type
                </label>
                <select
                  value={formData.fertilizer.type}
                  onChange={(e) => setFormData({
                    ...formData,
                    fertilizer: {...formData.fertilizer, type: e.target.value}
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                >
                  <option value="NPK">NPK</option>
                  <option value="Urea">Urea</option>
                  <option value="DAP">DAP</option>
                  <option value="MOP">MOP</option>
                  <option value="Organic">Organic</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.fertilizer.amount}
                  onChange={(e) => setFormData({
                    ...formData,
                    fertilizer: {...formData.fertilizer, amount: e.target.value}
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                  placeholder="50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Unit
                </label>
                <select
                  value={formData.fertilizer.unit}
                  onChange={(e) => setFormData({
                    ...formData,
                    fertilizer: {...formData.fertilizer, unit: e.target.value}
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                >
                  <option value="kg">kg</option>
                  <option value="g">g</option>
                  <option value="lbs">lbs</option>
                </select>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row gap-4 pt-4">
            <button 
              type="submit" 
              disabled={loading} 
              className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 font-bold transition-all disabled:bg-green-300 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
            >
              {loading ? (
                <>
                <Loader2 className="animate-spin" size={20} />
                Analyzing & Saving...
                </>
                ) : (
                  'Save Thermal Data'
                  )}
            </button>

            {/* <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 font-bold transition-colors disabled:opacity-50"
            >
              {loading ? 'Saving Measurement...' : 'Save Thermal Data'}
            </button> */}
            
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ThermalForm;