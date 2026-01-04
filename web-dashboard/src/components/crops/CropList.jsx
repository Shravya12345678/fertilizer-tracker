// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

// const CropList = () => {
//   // Real logic: In the next step we will fetch this from your database!
//   const [crops] = useState([
//     { id: 1, name: 'Main Wheat Field', type: 'Wheat', status: 'Healthy', efficiency: '92%' },
//     { id: 2, name: 'East Potato Plot', type: 'Potato', status: 'Needs Water', efficiency: '78%' }
//   ]);

//   return (
//     <div className="container">
//       <header className="flex-between">
//         <div>
//           <h1 style={{ color: '#111827', fontSize: '2.25rem', marginBottom: '8px' }}>My Crops</h1>
//           <p style={{ color: '#6b7280' }}>Manage and monitor your field performance</p>
//         </div>
//         <Link to="/thermal/new" className="btn btn-primary">
//           + Add Analysis
//         </Link>
//       </header>

//       <div className="grid">
//         {crops.map((crop) => (
//           <div key={crop.id} className="card">
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
//               <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{crop.name}</h3>
//               <span style={{ 
//                 backgroundColor: crop.status === 'Healthy' ? '#dcfce7' : '#fef3c7',
//                 color: crop.status === 'Healthy' ? '#166534' : '#92400e',
//                 padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '600'
//               }}>
//                 {crop.status}
//               </span>
//             </div>
//             <p style={{ margin: '15px 0', color: '#4b5563' }}>Type: <strong>{crop.type}</strong></p>
//             <div style={{ background: '#f9fafb', padding: '12px', borderRadius: '8px', marginBottom: '15px' }}>
//               <span style={{ fontSize: '0.9rem', color: '#6b7280' }}>Efficiency Score: </span>
//               <span style={{ fontWeight: 'bold', color: '#10b981' }}>{crop.efficiency}</span>
//             </div>
//             <Link to={`/crops/${crop.id}`} style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: '500' }}>
//               View Full Report →
//             </Link>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CropList;


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cropsAPI } from '../../services/api';

const CropList = () => {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    cropName: '',
    cropType: 'rice',
    plantingDate: '',
    fieldSize: '',
    soilData: {
      N: '',
      P: '',
      K: '',
      pH: ''
    }
  });

  useEffect(() => {
    fetchCrops();
  }, []);

  const fetchCrops = async () => {
    try {
      const response = await cropsAPI.getAll();
      setCrops(response.data.data.crops);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching crops:', error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await cropsAPI.create(formData);
      setShowForm(false);
      fetchCrops();
      setFormData({
        cropName: '',
        cropType: 'rice',
        plantingDate: '',
        fieldSize: '',
        soilData: { N: '', P: '', K: '', pH: '' }
      });
      alert('Crop created successfully!');
    } catch (error) {
      console.error('Error creating crop:', error);
      alert('Failed to create crop: ' + (error.response?.data?.message || 'Unknown error'));
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this crop?')) {
      try {
        await cropsAPI.delete(id);
        fetchCrops();
        alert('Crop deleted successfully!');
      } catch (error) {
        console.error('Error deleting crop:', error);
        alert('Failed to delete crop');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading crops...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Crops</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
        >
          {showForm ? 'Cancel' : '+ Add New Crop'}
        </button>
      </div>

      {/* Create Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Add New Crop</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Crop Name
              </label>
              <input
                type="text"
                value={formData.cropName}
                onChange={(e) => setFormData({...formData, cropName: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Crop Type
                </label>
                <select
                  value={formData.cropType}
                  onChange={(e) => setFormData({...formData, cropType: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="rice">Rice</option>
                  <option value="wheat">Wheat</option>
                  <option value="maize">Maize</option>
                  <option value="cotton">Cotton</option>
                  <option value="tomato">Tomato</option>
                  <option value="potato">Potato</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Planting Date
                </label>
                <input
                  type="date"
                  value={formData.plantingDate}
                  onChange={(e) => setFormData({...formData, plantingDate: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Field Size (acres)
              </label>
              <input
                type="number"
                step="0.1"
                value={formData.fieldSize}
                onChange={(e) => setFormData({...formData, fieldSize: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nitrogen (N)
                </label>
                <input
                  type="number"
                  value={formData.soilData.N}
                  onChange={(e) => setFormData({
                    ...formData,
                    soilData: {...formData.soilData, N: e.target.value}
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                  min="0"
                  max="200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phosphorus (P)
                </label>
                <input
                  type="number"
                  value={formData.soilData.P}
                  onChange={(e) => setFormData({
                    ...formData,
                    soilData: {...formData.soilData, P: e.target.value}
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                  min="0"
                  max="200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Potassium (K)
                </label>
                <input
                  type="number"
                  value={formData.soilData.K}
                  onChange={(e) => setFormData({
                    ...formData,
                    soilData: {...formData.soilData, K: e.target.value}
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                  min="0"
                  max="300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  pH Level
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.soilData.pH}
                  onChange={(e) => setFormData({
                    ...formData,
                    soilData: {...formData.soilData, pH: e.target.value}
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                  min="3"
                  max="10"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
            >
              Create Crop
            </button>
          </form>
        </div>
      )}

      {/* Crops Grid */}
      {crops.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <div className="text-6xl mb-4">🌾</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            No crops yet
          </h3>
          <p className="text-gray-600 mb-4">
            Start by adding your first crop
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
          >
            Add Crop
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {crops.map((crop) => (
            <div
              key={crop._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="bg-gradient-to-r from-green-500 to-green-600 p-4">
                <h3 className="text-xl font-bold text-white">{crop.cropName}</h3>
                <p className="text-green-100">{crop.cropType}</p>
              </div>

              <div className="p-4">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Field Size</p>
                    <p className="font-semibold">{crop.fieldSize} acres</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <p className="font-semibold text-green-600">{crop.status}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Planted</p>
                    <p className="font-semibold">
                      {new Date(crop.plantingDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Soil NPK</p>
                    <p className="font-semibold">
                      N:{crop.soilData.N} P:{crop.soilData.P} K:{crop.soilData.K}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Link
                    to={`/crops/${crop._id}`}
                    className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => handleDelete(crop._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CropList;