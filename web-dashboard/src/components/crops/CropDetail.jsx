// import React from 'react';
// import { useParams, Link } from 'react-router-dom';

// const CropDetail = () => {
//   const { id } = useParams();

//   // Mock data for the "Full Report"
//   const history = [
//     { date: '2025-12-20', efficiency: '94%', health: 'Excellent' },
//     { date: '2025-12-05', efficiency: '88%', health: 'Good' },
//   ];

//   return (
//     <div className="container">
//       <Link to="/crops" style={{ color: 'var(--text-muted)', textDecoration: 'none', marginBottom: '20px', display: 'block' }}>
//         ← Back to Crops
//       </Link>
      
//       <div className="card" style={{ marginBottom: '30px' }}>
//         <h1 style={{ color: 'var(--primary)', marginBottom: '10px' }}>Field Report: Crop #{id}</h1>
//         <p>Location: North Sector | Planting Date: March 2024</p>
//       </div>

//       <h2 style={{ marginBottom: '15px' }}>Analysis History</h2>
//       <div className="card" style={{ padding: '0' }}>
//         <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
//           <thead>
//             <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid var(--border)' }}>
//               <th style={{ padding: '15px' }}>Date</th>
//               <th style={{ padding: '15px' }}>Fertilizer Efficiency</th>
//               <th style={{ padding: '15px' }}>Health Status</th>
//               <th style={{ padding: '15px' }}>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {history.map((item, index) => (
//               <tr key={index} style={{ borderBottom: '1px solid var(--border)' }}>
//                 <td style={{ padding: '15px' }}>{item.date}</td>
//                 <td style={{ padding: '15px', color: 'var(--primary)', fontWeight: 'bold' }}>{item.efficiency}</td>
//                 <td style={{ padding: '15px' }}>{item.health}</td>
//                 <td style={{ padding: '15px' }}>
//                    <button className="btn" style={{ padding: '5px 10px', fontSize: '0.8rem', border: '1px solid var(--border)' }}>
//                      View Map
//                    </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default CropDetail;

// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { cropsAPI, thermalAPI, analysisAPI } from '../../services/api';

// const CropDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [crop, setCrop] = useState(null);
//   const [thermalData, setThermalData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchCropDetails();
//   }, [id]);

//   const fetchCropDetails = async () => {
//     try {
//       const [cropRes, thermalRes] = await Promise.all([
//         cropsAPI.getOne(id),
//         thermalAPI.getAll({ cropId: id })
//       ]);

//       setCrop(cropRes.data.data.crop);
//       setThermalData(thermalRes.data.data.thermalData);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching crop details:', error);
//       setLoading(false);
//     }
//   };

//   const handleAnalyze = async (thermalId) => {
//     if (window.confirm('Analyze this thermal measurement? This may take 30 seconds.')) {
//       try {
//         await analysisAPI.analyze(thermalId);
//         alert('Analysis completed successfully!');
//         fetchCropDetails();
//       } catch (error) {
//         console.error('Error analyzing:', error);
//         alert('Analysis failed: ' + (error.response?.data?.message || 'Unknown error'));
//       }
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-xl">Loading crop details...</div>
//       </div>
//     );
//   }

//   if (!crop) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold text-gray-800 mb-4">Crop not found</h2>
//           <button
//             onClick={() => navigate('/crops')}
//             className="bg-green-600 text-white px-6 py-2 rounded-lg"
//           >
//             Back to Crops
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       <button
//         onClick={() => navigate('/crops')}
//         className="mb-4 text-green-600 hover:text-green-700"
//       >
//         ← Back to Crops
//       </button>

//       {/* Crop Header */}
//       <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg shadow-lg p-8 mb-8 text-white">
//         <h1 className="text-4xl font-bold mb-2">{crop.cropName}</h1>
//         <p className="text-green-100 text-lg">{crop.cropType}</p>
//         <div className="mt-4 grid grid-cols-3 gap-6">
//           <div>
//             <p className="text-green-100 text-sm">Field Size</p>
//             <p className="text-2xl font-bold">{crop.fieldSize} acres</p>
//           </div>
//           <div>
//             <p className="text-green-100 text-sm">Status</p>
//             <p className="text-2xl font-bold">{crop.status}</p>
//           </div>
//           <div>
//             <p className="text-green-100 text-sm">Planted</p>
//             <p className="text-2xl font-bold">
//               {new Date(crop.plantingDate).toLocaleDateString()}
//             </p>
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 gap-8">
//         {/* Soil Data */}
//         <div className="bg-white rounded-lg shadow-lg p-6">
//           <h2 className="text-xl font-bold text-gray-800 mb-4">Soil NPK Data</h2>
//           <div className="grid grid-cols-4 gap-4">
//             <div className="p-4 bg-green-50 rounded-lg">
//               <p className="text-sm text-gray-600">Nitrogen (N)</p>
//               <p className="text-3xl font-bold text-green-600">{crop.soilData.N}</p>
//             </div>
//             <div className="p-4 bg-blue-50 rounded-lg">
//               <p className="text-sm text-gray-600">Phosphorus (P)</p>
//               <p className="text-3xl font-bold text-blue-600">{crop.soilData.P}</p>
//             </div>
//             <div className="p-4 bg-purple-50 rounded-lg">
//               <p className="text-sm text-gray-600">Potassium (K)</p>
//               <p className="text-3xl font-bold text-purple-600">{crop.soilData.K}</p>
//             </div>
//             <div className="p-4 bg-yellow-50 rounded-lg">
//               <p className="text-sm text-gray-600">pH Level</p>
//               <p className="text-3xl font-bold text-yellow-600">{crop.soilData.pH}</p>
//             </div>
//           </div>
//         </div>

//         {/* Thermal Measurements */}
//         <div className="bg-white rounded-lg shadow-lg p-6">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-bold text-gray-800">
//               Thermal Measurements ({thermalData.length})
//             </h2>
//             <button
//               onClick={() => navigate('/thermal/new', { state: { cropId: crop._id } })}
//               className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
//             >
//               + Add Measurement
//             </button>
//           </div>

//           {thermalData.length === 0 ? (
//             <div className="text-center py-12">
//               <div className="text-6xl mb-4">🌡️</div>
//               <p className="text-gray-600 mb-4">No thermal measurements yet</p>
//               <button
//                 onClick={() => navigate('/thermal/new', { state: { cropId: crop._id } })}
//                 className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
//               >
//                 Add First Measurement
//               </button>
//             </div>
//           ) : (
//             <div className="space-y-4">
//               {thermalData.map((thermal) => (
//                 <div
//                   key={thermal._id}
//                   className="border border-gray-200 rounded-lg p-4"
//                 >
//                   <div className="flex justify-between items-start">
//                     <div className="flex-1">
//                       <div className="flex items-center gap-4 mb-2">
//                         <span className="text-sm text-gray-600">
//                           {new Date(thermal.measurementDate).toLocaleDateString()}
//                         </span>
//                         <span className={`px-2 py-1 rounded text-xs font-medium ${
//                           thermal.processed 
//                             ? 'bg-green-100 text-green-800' 
//                             : 'bg-yellow-100 text-yellow-800'
//                         }`}>
//                           {thermal.processed ? '✓ Analyzed' : 'Pending'}
//                         </span>
//                       </div>

//                       <div className="grid grid-cols-3 gap-4 text-sm mb-3">
//                         <div>
//                           <p className="text-gray-600">Before Temp</p>
//                           <p className="font-semibold">{thermal.beforeTemp}°C</p>
//                         </div>
//                         <div>
//                           <p className="text-gray-600">After Temp</p>
//                           <p className="font-semibold">{thermal.afterTemp}°C</p>
//                         </div>
//                         <div>
//                           <p className="text-gray-600">Delta</p>
//                           <p className={`font-semibold ${
//                             thermal.thermalDelta < 0 ? 'text-blue-600' : 'text-red-600'
//                           }`}>
//                             {thermal.thermalDelta.toFixed(2)}°C
//                           </p>
//                         </div>
//                       </div>

//                       {thermal.processed && thermal.analysis && (
//                         <div className="bg-blue-50 rounded p-3 text-sm">
//                           <p className="font-semibold text-blue-900 mb-1">
//                             Efficiency: {thermal.analysis.efficiencyScore}%
//                           </p>
//                           <p className="text-blue-800">
//                             {thermal.analysis.deficiencies.join(', ')}
//                           </p>
//                         </div>
//                       )}
//                     </div>

//                     <div className="ml-4">
//                       {!thermal.processed ? (
//                         <button
//                           onClick={() => handleAnalyze(thermal._id)}
//                           className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
//                         >
//                           Analyze
//                         </button>
//                       ) : (
//                         <button
//                           onClick={() => navigate(`/analysis/${thermal._id}`)}
//                           className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm"
//                         >
//                           View Results
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CropDetail;



import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { cropsAPI, thermalAPI, analysisAPI } from '../../services/api';
import { toast } from 'react-toastify';
import { Loader2 } from 'lucide-react';

const CropDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [crop, setCrop] = useState(null);
  const [thermalData, setThermalData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [analyzingId, setAnalyzingId] = useState(null);

  useEffect(() => {
    fetchCropDetails();
  }, [id]);

  const fetchCropDetails = async () => {
    try {
      const [cropRes, thermalRes] = await Promise.all([
        cropsAPI.getOne(id),
        thermalAPI.getAll({ cropId: id })
      ]);
      setCrop(cropRes.data.data.crop);
      setThermalData(thermalRes.data.data.thermalData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching crop details:', error);
      toast.error("Could not load crop details.");
      setLoading(false);
    }
  };

  const handleAnalyze = async (thermalId) => {
  setAnalyzingId(thermalId); // Start the spinner for this specific ID
  
  try {
    await analysisAPI.analyze(thermalId);
    toast.success('Analysis completed! Data updated.', { 
      icon: "🚀",
      position: "top-right",
      autoClose: 3000 
    });
    
    // Refresh the UI to turn "PENDING" into "AI PROCESSED"
    await fetchCropDetails(); 
    
  } catch (error) {
    console.error('Error analyzing:', error);
    toast.error('Analysis failed: ' + (error.response?.data?.message || 'Check ML service connection'));
  } finally {
    setAnalyzingId(null); // Stop the spinner
  }
};

  // const handleAnalyze = async (thermalId) => {
  //   if (window.confirm('Analyze this thermal measurement? This will process through the AI model.')) {
  //     try {
  //       await analysisAPI.analyze(thermalId);
  //       toast.success('Analysis completed! Data updated.', { icon: "🚀" });
  //       fetchCropDetails();
  //     } catch (error) {
  //       console.error('Error analyzing:', error);
  //       toast.error('Analysis failed: ' + (error.response?.data?.message || 'Check ML service connection'));
  //     }
  //   }
  // };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
    </div>
  );

  if (!crop) return (
    <div className="text-center mt-20">
      <h2 className="text-2xl font-bold text-gray-800">Crop not found</h2>
      <button onClick={() => navigate('/crops')} className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg">Back to Crops</button>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <button onClick={() => navigate('/crops')} className="mb-4 text-green-600 hover:text-green-700 flex items-center gap-1 font-medium">
        ← Back to Crops
      </button>

      {/* Crop Header Card */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl shadow-lg p-8 mb-8 text-white">
        <h1 className="text-4xl font-bold mb-2">{crop.cropName}</h1>
        <p className="text-green-100 text-lg opacity-90">{crop.cropType}</p>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white/10 p-4 rounded-xl">
            <p className="text-green-100 text-xs uppercase font-bold tracking-wider">Field Size</p>
            <p className="text-xl font-bold">{crop.fieldSize} acres</p>
          </div>
          <div className="bg-white/10 p-4 rounded-xl">
            <p className="text-green-100 text-xs uppercase font-bold tracking-wider">Status</p>
            <p className="text-xl font-bold capitalize">{crop.status}</p>
          </div>
          <div className="bg-white/10 p-4 rounded-xl">
            <p className="text-green-100 text-xs uppercase font-bold tracking-wider">Soil pH</p>
            <p className="text-xl font-bold">{crop.soilData.pH}</p>
          </div>
          <div className="bg-white/10 p-4 rounded-xl">
            <p className="text-green-100 text-xs uppercase font-bold tracking-wider">Planted</p>
            <p className="text-xl font-bold">{new Date(crop.plantingDate).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Soil NPK Summary */}
        <div className="lg:col-span-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Soil Nutrients (NPK)</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <span className="font-medium text-green-800">Nitrogen (N)</span>
              <span className="text-2xl font-bold text-green-600">{crop.soilData.N}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <span className="font-medium text-blue-800">Phosphorus (P)</span>
              <span className="text-2xl font-bold text-blue-600">{crop.soilData.P}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
              <span className="font-medium text-purple-800">Potassium (K)</span>
              <span className="text-2xl font-bold text-purple-600">{crop.soilData.K}</span>
            </div>
          </div>
        </div>

        {/* Thermal Measurement List */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Measurements</h2>
            <button 
              onClick={() => navigate('/thermal/new', { state: { cropId: crop._id } })}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-bold"
            >
              + Add New
            </button>
          </div>

          <div className="space-y-4">
            {thermalData.length === 0 ? (
              <p className="text-center py-10 text-gray-400">No data recorded yet.</p>
            ) : (
              thermalData.map((thermal) => (
                <div key={thermal._id} className="border border-gray-100 rounded-xl p-4 hover:border-green-200 transition-colors bg-gray-50/50">
                  <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="font-bold text-gray-700">{new Date(thermal.measurementDate).toLocaleDateString()}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                          thermal.processed ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {thermal.processed ? 'AI Processed' : 'Pending'}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2 mb-3 text-xs">
                        <div className="bg-white p-2 rounded border border-gray-100">
                          <p className="text-gray-400">Before</p>
                          <p className="font-bold">{thermal.beforeTemp}°C</p>
                        </div>
                        <div className="bg-white p-2 rounded border border-gray-100">
                          <p className="text-gray-400">After</p>
                          <p className="font-bold">{thermal.afterTemp}°C</p>
                        </div>
                        <div className="bg-white p-2 rounded border border-gray-100">
                          <p className="text-gray-400">Delta</p>
                          <p className={`font-bold ${thermal.thermalDelta < 0 ? 'text-blue-600' : 'text-red-600'}`}>
                            {thermal.thermalDelta.toFixed(2)}°C
                          </p>
                        </div>
                      </div>

                      {thermal.processed && thermal.analysis && (
                        <div className="bg-white p-3 rounded-lg border border-blue-100">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-blue-600 text-sm font-bold">Efficiency: {thermal.analysis.efficiencyScore}%</span>
                          </div>
                          <p className="text-xs text-gray-600 italic">{thermal.analysis.deficiencies.join(', ')}</p>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {!thermal.processed ? (

                        <button 
                          onClick={() => handleAnalyze(thermal._id)}
                          disabled={analyzingId === thermal._id}
                          className="w-full md:w-auto bg-blue-600 text-white px-5 py-2 rounded-lg font-bold text-xs hover:bg-blue-700 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                          >
                            {analyzingId === thermal._id ? (
                              <>
                              <Loader2 className="animate-spin" size={14} />
                              <span>Processing AI...</span>
                              </>
                              ) : (
                                "Run AI Analysis"
                                )}
                        </button>

                        // <button 
                        //   onClick={() => handleAnalyze(thermal._id)}
                        //   className="w-full md:w-auto bg-blue-600 text-white px-5 py-2 rounded-lg font-bold text-xs hover:bg-blue-700"
                        // >
                        //   Run AI Analysis
                        // </button>
                      ) : (
                        // <button 
                        //   onClick={() => navigate(`/analysis/${thermal._id}`)}
                        //   className="w-full md:w-auto bg-gray-800 text-white px-5 py-2 rounded-lg font-bold text-xs hover:bg-black"
                        // >
                        //   View Detailed Results
                        // </button>

                        // <button 
                        //  onClick={() => navigate(`/analysis/${thermal._id}`)}
                        //  className="w-full md:w-auto bg-slate-900 text-white px-5 py-2 rounded-lg font-bold text-xs hover:bg-black"
                        // >
                        //   View Detailed Results
                        // </button>

                        <button 
                         onClick={() => navigate(`/analysis/${thermal._id}`)}
                         /* We keep layout classes, but move ALL colors to 'style' below */
                         className="w-full md:w-auto px-5 py-2 rounded-lg font-bold text-xs" 
                         style={{ 
                          backgroundColor: '#1e293b', // Dark Slate (almost black)
                          color: '#ffffff',           // Force text to be pure white
                          border: 'none',             // Remove any default borders
                          cursor: 'pointer',          // Ensure the pointer hand appears
                          display: 'inline-block',
                          transition: 'background-color 0.2s'
                         }}
                        /* This creates the hover effect without using CSS classes */
                         onMouseOver={(e) => e.target.style.backgroundColor = '#000000'}
                         onMouseOut={(e) => e.target.style.backgroundColor = '#1e293b'}
                        >
                          View Detailed Results
                        </button>


                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropDetail;