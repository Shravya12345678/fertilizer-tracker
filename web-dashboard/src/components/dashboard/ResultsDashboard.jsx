// import React, { useEffect, useState } from 'react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
// import { thermalAPI } from '../../services/api';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';

// const ResultsDashboard = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchAnalysisData();
//   }, []);

//   const fetchAnalysisData = async () => {
//     try {
//       const response = await thermalAPI.getAll();
//       // Filter for only processed records
//       const processedData = (response.data?.data || response.data)
//         .filter(item => item.processed)
//         .map(item => ({
//           date: new Date(item.measurementDate).toLocaleDateString(),
//           score: item.analysis.efficiencyScore,
//           stress: item.analysis.stressLevel,
//           delta: Math.abs(item.thermalDelta)
//         }));
//       setData(processedData.reverse()); // Show oldest to newest for the trend
//     } catch (error) {
//       console.error("Error fetching dashboard data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getStressColor = (level) => {
//     if (level === 'low') return '#10b981'; // Green
//     if (level === 'medium') return '#f59e0b'; // Orange
//     return '#ef4444'; // Red
//   };

//   if (loading) return <div className="p-10 text-center">Loading Analytics...</div>;

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold text-gray-800 mb-8">Fertilizer Efficiency Analytics</h1>

//       {/* Summary Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
//         <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500">
//           <p className="text-sm text-gray-500 uppercase font-bold">Avg. Efficiency</p>
//           <h2 className="text-3xl font-bold">
//             {(data.reduce((acc, curr) => acc + curr.score, 0) / data.length || 0).toFixed(1)}%
//           </h2>
//         </div>
//         <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500">
//           <p className="text-sm text-gray-500 uppercase font-bold">Total Analyses</p>
//           <h2 className="text-3xl font-bold">{data.length}</h2>
//         </div>
//         <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-purple-500">
//           <p className="text-sm text-gray-500 uppercase font-bold">Recent Stress</p>
//           <h2 className="text-3xl font-bold capitalize">{data[data.length - 1]?.stress || 'N/A'}</h2>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         {/* Efficiency Trend Line */}
//         <div className="bg-white p-6 rounded-xl shadow-md">
//           <h3 className="text-lg font-semibold mb-4">Efficiency Trend over Time</h3>
//           <div className="h-64">
//             <ResponsiveContainer width="100%" height="100%">
//               <LineChart data={data}>
//                 <CartesianGrid strokeDasharray="3 3" vertical={false} />
//                 <XAxis dataKey="date" />
//                 <YAxis domain={[0, 100]} />
//                 <Tooltip />
//                 <Line type="monotone" dataKey="score" stroke="#10b981" strokeWidth={3} dot={{ r: 6 }} />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Thermal Delta vs Score Bar Chart */}
//         <div className="bg-white p-6 rounded-xl shadow-md">
//           <h3 className="text-lg font-semibold mb-4">Thermal Absorption vs. Stress Level</h3>
//           <div className="h-64">
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={data}>
//                 <XAxis dataKey="date" />
//                 <YAxis />
//                 <Tooltip />
//                 <Bar dataKey="delta">
//                   {data.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={getStressColor(entry.stress)} />
//                   ))}
//                 </Bar>
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ResultsDashboard;





// import React, { useEffect, useState } from 'react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
// import { thermalAPI } from '../../services/api';
// import jsPDF from 'jspdf';
// import autoTable from 'jspdf-autotable';

// const ResultsDashboard = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchAnalysisData();
//   }, []);



//   const fetchAnalysisData = async () => {
//   try {
//     const response = await thermalAPI.getAll();
//     const rawList = response.data?.data?.thermalData || response.data?.data || [];
    
//     const processedItems = rawList
//       .filter(item => item.processed === true)
//       .map(item => ({
//         date: new Date(item.measurementDate).toLocaleDateString(),
//         // IMPORTANT: Pulling data from the 'analysis' object in MongoDB
//         score: item.analysis?.efficiencyScore || 0, 
//         stress: item.analysis?.stressLevel || 'N/A',
//         diagnosis: item.analysis?.deficiencies?.join(', ') || 'Healthy'
//       }));
//     setData(processedItems); // Now 'data' is a simple list the PDF can read
//   } catch (error) {
//     console.error("Fetch Error:", error);
//   }
// };


// const downloadPDF = () => {
//   const doc = new jsPDF();
//   doc.setFontSize(20);
//   doc.setTextColor(16, 185, 129); 
//   doc.text('Fertilizer Efficiency Report', 14, 22);
  
//   doc.setFontSize(10);
//   doc.setTextColor(100);
//   doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 30);
  
//   const tableColumn = ["Date", "Efficiency Score", "Stress Level", "Diagnosis"];
  
//   const tableRows = data.map(item => [
//     item.date,
//     `${(item.score || 0).toFixed(1)}%`, // Added (item.score || 0) so it doesn't crash if empty
//     (item.stress || 'N/A').toUpperCase(),
//     item.diagnosis || 'Healthy'
//   ]);

//   autoTable(doc, {
//     startY: 35,
//     head: [tableColumn],
//     body: tableRows,
//     headStyles: { fillColor: [22, 101, 52], fontSize: 11 },
//     alternateRowStyles: { fillColor: [240, 253, 244] },
//   });

//   doc.save(`Crop_Analysis_Report_${new Date().toISOString().split('T')[0]}.pdf`);
// };

// //   const fetchAnalysisData = async () => {
// //     try {
// //       const response = await thermalAPI.getAll();
// //       const processedData = (response.data?.data || response.data)
// //         .filter(item => item.processed)
// //         .map(item => ({
// //           date: new Date(item.measurementDate).toLocaleDateString(),
// //           score: item.analysis.efficiencyScore,
// //           stress: item.analysis.stressLevel,
// //           delta: Math.abs(item.thermalDelta),
// //           deficiencies: item.analysis.deficiencies.join(', ') || 'None'
// //         }));
// //       setData(processedData.reverse()); 
// //     } catch (error) {
// //       console.error("Error fetching dashboard data:", error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const downloadPDF = () => {
// //     const doc = new jsPDF();
// //     doc.setFontSize(20);
// //     doc.setTextColor(16, 185, 129); // Green
// //     doc.text('Fertilizer Efficiency Report', 14, 22);
    
// //     doc.setFontSize(10);
// //     doc.setTextColor(100);
// //     doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 30);
    
// //     const tableColumn = ["Date", "Efficiency Score", "Stress Level", "Diagnosis"];
// //     const tableRows = data.map(item => [
// //       item.date,
// //       `${item.score.toFixed(1)}%`,
// //       item.stress.toUpperCase(),
// //       item.diagnosis
  
// //     ]);

// //     autoTable(doc, {
// //       startY: 35,
// //       head: [tableColumn],
// //       body: tableRows,
// //       headStyles: { fillColor: [22, 101, 52], fontSize: 11 },
// //       alternateRowStyles: { fillColor: [240, 253, 244] },
// //     });

// //     doc.save(`Crop_Analysis_Report_${new Date().toISOString().split('T')[0]}.pdf`);
// //   };

//   const getStressColor = (level) => {
//     if (level === 'low') return '#10b981';
//     if (level === 'medium') return '#f59e0b';
//     return '#ef4444';
//   };

//   if (loading) return <div className="p-10 text-center">Loading Analytics...</div>;

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-8">
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-3xl font-bold text-gray-800">Fertilizer Efficiency Analytics</h1>
//         <button 
//           onClick={downloadPDF}
//           className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-md flex items-center gap-2"
//         >
//           <span>📥</span> Download PDF Report
//         </button>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
//         <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500">
//           <p className="text-sm text-gray-500 uppercase font-bold">Avg. Efficiency</p>
//           <h2 className="text-3xl font-bold">
//             {(data.reduce((acc, curr) => acc + curr.score, 0) / data.length || 0).toFixed(1)}%
//           </h2>
//         </div>
//         <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500">
//           <p className="text-sm text-gray-500 uppercase font-bold">Total Analyses</p>
//           <h2 className="text-3xl font-bold">{data.length}</h2>
//         </div>
//         <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-purple-500">
//           <p className="text-sm text-gray-500 uppercase font-bold">Recent Stress</p>
//           <h2 className="text-3xl font-bold capitalize">{data[data.length - 1]?.stress || 'N/A'}</h2>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         <div className="bg-white p-6 rounded-xl shadow-md">
//           <h3 className="text-lg font-semibold mb-4">Efficiency Trend over Time</h3>
//           <div className="h-64">
//             <ResponsiveContainer width="100%" height="100%">
//               <LineChart data={data}>
//                 <CartesianGrid strokeDasharray="3 3" vertical={false} />
//                 <XAxis dataKey="date" />
//                 <YAxis domain={[0, 100]} />
//                 <Tooltip />
//                 <Line type="monotone" dataKey="score" stroke="#10b981" strokeWidth={3} dot={{ r: 6 }} />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         <div className="bg-white p-6 rounded-xl shadow-md">
//           <h3 className="text-lg font-semibold mb-4">Thermal Absorption vs. Stress</h3>
//           <div className="h-64">
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={data}>
//                 <XAxis dataKey="date" />
//                 <YAxis />
//                 <Tooltip />
//                 <Bar dataKey="delta">
//                   {data.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={getStressColor(entry.stress)} />
//                   ))}
//                 </Bar>
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ResultsDashboard;


// import React, { useState, useEffect } from 'react';
// import { thermalAPI } from '../../services/api'; // Ensure this path is correct
// import jsPDF from 'jspdf';
// import autoTable from 'jspdf-autotable';

// const ResultsDashboard = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchAnalysisData();
//   }, []);

//   const fetchAnalysisData = async () => {
//     try {
//       const response = await thermalAPI.getAll();
      
//       // Look at your screenshot image_b50d65.png: 
//       // We need to find the items marked 'AI PROCESSED'
//       const rawList = response.data?.data?.thermalData || response.data?.data || [];
      
//       const processedItems = rawList
//         .filter(item => item.processed === true)
//         .map(item => ({
//           id: item._id,
//           date: new Date(item.measurementDate).toLocaleDateString(),
//           // Mapping from your AI Results (Efficiency 72.6%, etc.)
//           score: item.analysis?.efficiencyScore || 0,
//           stress: item.analysis?.stressLevel || 'Normal',
//           diagnosis: item.analysis?.deficiencies?.join(', ') || 'Healthy'
//         }));

//       setData(processedItems);
//     } catch (error) {
//       console.error("Error fetching analytics:", error);
//     } finally {
//       // This MUST run even if there is an error to remove the loading screen
//       setLoading(false);
//     }
//   };

//   const downloadPDF = () => {
//     const doc = new jsPDF();
//     doc.setFontSize(20);
//     doc.setTextColor(16, 185, 129); 
//     doc.text('Fertilizer Efficiency Report', 14, 22);
    
//     const tableColumn = ["Date", "Efficiency Score", "Stress Level", "Diagnosis"];
//     const tableRows = data.map(item => [
//       item.date,
//       `${item.score.toFixed(1)}%`,
//       item.stress.toUpperCase(),
//       item.diagnosis
//     ]);

//     autoTable(doc, {
//       startY: 35,
//       head: [tableColumn],
//       body: tableRows,
//       headStyles: { fillColor: [22, 101, 52] },
//     });

//     doc.save(`Report_${new Date().toISOString().split('T')[0]}.pdf`);
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-xl font-bold text-green-700 animate-pulse">
//           Loading Analytics...
//         </div>
//       </div>
//     );
//   }

//   if (data.length === 0) {
//     return (
//       <div className="max-w-7xl mx-auto px-4 py-8 text-center">
//         <h2 className="text-2xl font-bold text-gray-800">No Processed Data Found</h2>
//         <p className="text-gray-600 mt-2">You have measurements, but they haven't been analyzed yet.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-3xl font-bold text-gray-900">Efficiency Analytics</h1>
//         <button 
//           onClick={downloadPDF}
//           className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
//         >
//           Download PDF Report
//         </button>
//       </div>

//       <div className="bg-white shadow rounded-lg overflow-hidden">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Efficiency</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stress</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Diagnosis</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {data.map((item) => (
//               <tr key={item.id}>
//                 <td className="px-6 py-4 whitespace-nowrap">{item.date}</td>
//                 <td className="px-6 py-4 whitespace-nowrap font-bold text-blue-600">{item.score.toFixed(1)}%</td>
//                 <td className="px-6 py-4 whitespace-nowrap">{item.stress}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.diagnosis}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ResultsDashboard;

// import React, { useState, useEffect } from 'react';
// import { thermalAPI } from '../../services/api';
// // import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, YAxis as RechartsYAxis } from 'recharts';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// import jsPDF from 'jspdf';
// import autoTable from 'jspdf-autotable';

// const ResultsDashboard = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchAnalysisData();
//   }, []);

//   const fetchAnalysisData = async () => {
//     try {
//       const response = await thermalAPI.getAll();
//       const rawList = response.data?.data?.thermalData || [];
      
//       const processedItems = rawList
//         .filter(item => item.processed === true)
//         .map(item => ({
//           id: item._id,
//           date: new Date(item.measurementDate).toLocaleDateString(),
//           score: item.analysis?.efficiencyScore || 0,
//           stress: item.analysis?.stressLevel || 'Normal',
//           diagnosis: item.analysis?.deficiencies?.join(', ') || 'Healthy'
//         }));

//       // Sort by date so the chart flows from left to right (oldest to newest)
//       setData(processedItems.reverse());
//     } catch (error) {
//       console.error("Error fetching analytics:", error);
//     } finally {
//       setLoading(false);
//     }
//   };


//   const downloadPDF = () => {
//   const doc = new jsPDF();
  
//   // Create a precise timestamp for the filename (e.g., 2026-01-02_14-30)
//   const now = new Date();
//   const dateStr = now.toISOString().split('T')[0];
//   const timeStr = `${now.getHours()}-${now.getMinutes().toString().padStart(2, '0')}`;
//   const fullFileName = `Report_${dateStr}_${timeStr}.pdf`;

//   // --- PDF Header ---
//   doc.setFontSize(20);
//   doc.setTextColor(22, 101, 52); // Dark Green
//   doc.text('Fertilizer Efficiency Report', 14, 22);
  
//   doc.setFontSize(10);
//   doc.setTextColor(100);
//   // Include the full date and time inside the report for records
//   doc.text(`Report Generated: ${now.toLocaleDateString()} at ${now.toLocaleTimeString()}`, 14, 30);
  
//   // --- Table Data ---
//   const tableColumn = ["Date", "Efficiency Score", "Stress Level", "Diagnosis"];
//   const tableRows = data.map(item => [
//     item.date,
//     `${item.score.toFixed(1)}%`,
//     item.stress.toUpperCase(),
//     item.diagnosis
//   ]);

//   autoTable(doc, {
//     startY: 35,
//     head: [tableColumn],
//     body: tableRows,
//     headStyles: { fillColor: [22, 101, 52], fontSize: 11 },
//     alternateRowStyles: { fillColor: [240, 253, 244] },
//     margin: { top: 35 },
//   });

//   // Save with the new timestamped name
//   doc.save(fullFileName);
// };

// //   const downloadPDF = () => {
// //     const doc = new jsPDF();
// //     doc.text('Fertilizer Efficiency Report', 14, 22);
    
// //     const tableRows = data.map(item => [
// //       item.date,
// //       `${item.score.toFixed(1)}%`,
// //       item.stress.toUpperCase(),
// //       item.diagnosis
// //     ]);

// //     autoTable(doc, {
// //       startY: 30,
// //       head: [["Date", "Efficiency", "Stress", "Diagnosis"]],
// //       body: tableRows,
// //     });

// //     doc.save('Efficiency_Report.pdf');
// //   };

//   if (loading) return <div className="p-8 text-center">Loading Analytics...</div>;

//   const getStressStyle = (level) => {
//   switch (level?.toUpperCase()) {
//     case 'HIGH': return 'bg-red-100 text-red-800 border-red-200';
//     case 'MEDIUM': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
//     case 'LOW': return 'bg-green-100 text-green-800 border-green-200';
//     default: return 'bg-gray-100 text-gray-800';
//   }
// };

  
//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-3xl font-bold text-gray-900">Efficiency Analytics</h1>
//         <button onClick={downloadPDF} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition shadow-md">
//           Download PDF Report
//         </button>
//       </div>

//       {/* --- TREND CHART SECTION --- */}
//       <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
//         <h3 className="text-lg font-semibold mb-4 text-gray-700">Efficiency Trend Over Time</h3>
//         <div style={{ width: '100%', height: 300 }}>
//           <ResponsiveContainer>
//             <LineChart data={data}>
//               <CartesianGrid strokeDasharray="3 3" vertical={false} />
//               <XAxis dataKey="date" />
//               <YAxis domain={[0, 100]} unit="%" />
//               <Tooltip 
//                 contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
//               />
//               <Line 
//                 type="monotone" 
//                 dataKey="score" 
//                 name="Efficiency Score"
//                 stroke="#10b981" 
//                 strokeWidth={4} 
//                 dot={{ r: 6, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }}
//                 activeDot={{ r: 8 }}
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

//       {/* --- DATA TABLE WITH COLOR-CODED STRESS --- */}
//       <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-100">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Efficiency</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stress Level</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Diagnosis</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {data.map((item) => (
//               <tr key={item.id} className="hover:bg-gray-50 transition">
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.date}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-blue-600">
//                   {item.score.toFixed(1)}%
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <span className={`px-3 py-1 rounded-full border text-xs font-bold shadow-sm ${getStressStyle(item.stress)}`}>
//                     {item.stress.toUpperCase()}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   <span className="bg-gray-100 px-2 py-1 rounded text-gray-700 italic">
//                     {item.diagnosis}
//                   </span>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );

// //   return (
// //     <div className="max-w-7xl mx-auto px-4 py-8">
// //       <div className="flex justify-between items-center mb-8">
// //         <h1 className="text-3xl font-bold text-gray-900">Efficiency Analytics</h1>
// //         <button onClick={downloadPDF} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
// //           Download PDF Report
// //         </button>
// //       </div>

// //       {/* --- TREND CHART SECTION --- */}
// //       <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
// //         <h3 className="text-lg font-semibold mb-4 text-gray-700">Efficiency Trend Over Time</h3>
// //         <div style={{ width: '100%', height: 300 }}>
// //           <ResponsiveContainer>
// //             <LineChart data={data}>
// //               <CartesianGrid strokeDasharray="3 3" vertical={false} />
// //               <XAxis dataKey="date" />
// //               <YAxis domain={[0, 100]} unit="%" />
// //               <Tooltip 
// //                 contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
// //               />
// //               <Line 
// //                 type="monotone" 
// //                 dataKey="score" 
// //                 name="Efficiency Score"
// //                 stroke="#10b981" 
// //                 strokeWidth={4} 
// //                 dot={{ r: 6, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }}
// //                 activeDot={{ r: 8 }}
// //               />
// //             </LineChart>
// //           </ResponsiveContainer>
// //         </div>
// //       </div>

// //       {/* Data Table */}
// //       <div className="bg-white shadow rounded-lg overflow-hidden">
// //         <table className="min-w-full divide-y divide-gray-200">
// //           <thead className="bg-gray-50">
// //             <tr>
// //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
// //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Efficiency</th>
// //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Diagnosis</th>
// //             </tr>
// //           </thead>
// //           <tbody className="bg-white divide-y divide-gray-200">
// //             {data.map((item) => (
// //               <tr key={item.id}>
// //                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.date}</td>
// //                 <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600">{item.score.toFixed(1)}%</td>
// //                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.diagnosis}</td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>
// //     </div>
// //   );
// };

// export default ResultsDashboard;


import React, { useState, useEffect } from 'react';
import { thermalAPI } from '../../services/api';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { toast } from 'react-toastify';
import emailjs from '@emailjs/browser';

// --- 1. ADVICE ENGINE CONFIGURATION ---
const ADVICE_MAP = {
  'K_deficient': 'Potassium deficiency detected. Recommendation: Apply 50kg/acre of MOP. Potassium helps with water regulation and enzyme activation.',
  'N_deficient': 'Nitrogen deficiency detected. Recommendation: Apply Urea or Ammonium Nitrate to boost vegetative growth.',
  'Healthy': 'Crop health is optimal. Maintain current irrigation and nutrient application schedule.',
  'Normal': 'No immediate deficiencies found. Continue regular monitoring.'
};

const ResultsDashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalysisData();
  }, []);

  const fetchAnalysisData = async () => {
    try {
      const response = await thermalAPI.getAll();
      const rawList = response.data?.data?.thermalData || [];
      
      const processedItems = rawList
        .filter(item => item.processed === true)
        .map(item => ({
          id: item._id,
          date: new Date(item.measurementDate).toLocaleDateString(),
          score: item.analysis?.efficiencyScore || 0,
          stress: item.analysis?.stressLevel || 'Normal',
          diagnosis: item.analysis?.deficiencies?.join(', ') || 'Healthy'
        }));

      // Sort by date so the chart flows from left to right (oldest to newest)
      setData(processedItems.reverse());
    } catch (error) {
      console.error("Error fetching analytics:", error);
      toast.error("Failed to load analysis data.");
    } finally {
      setLoading(false);
    }
  };

  const shareReport = () => {
    // 1. Get the latest data point from your state
    const latest = data[data.length - 1];
    if (!latest) return;

    // 2. DEFINE templateParams (This fixes your error!)
    // These keys (date, score, diagnosis) MUST match the {{ }} used in EmailJS
    const templateParams = {
      date: latest.date,
      score: latest.score.toFixed(1),
      diagnosis: latest.diagnosis,
      to_email: 'your-email@gmail.com' // <-- Change this to your real email!
    };

    // 3. SEND the email using the defined params
    emailjs.send(
        'gmail_service', // <--- Paste your Service ID here!
        'template_ng2riwd', //PASTE_TEMPLATE_ID_HERE
        templateParams, 
        'Iqcm5ZBJqFLnVYNtq' //PASTE_PUBLIC_KEY_HERE
    )
    .then(() => {
      toast.success("🚀 Report sent to your inbox!");
    })
    .catch((err) => {
      toast.error("❌ Failed to send email.");
      console.error("EmailJS Error:", err);
    });
  };


  const downloadPDF = () => {
    const doc = new jsPDF();
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    const timeStr = `${now.getHours()}-${now.getMinutes().toString().padStart(2, '0')}`;
    const fullFileName = `Report_${dateStr}_${timeStr}.pdf`;

    doc.setFontSize(20);
    doc.setTextColor(22, 101, 52); 
    doc.text('Fertilizer Efficiency Report', 14, 22);
    
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Report Generated: ${now.toLocaleDateString()} at ${now.toLocaleTimeString()}`, 14, 30);
    
    const tableColumn = ["Date", "Efficiency Score", "Stress Level", "Diagnosis"];
    const tableRows = data.map(item => [
      item.date,
      `${item.score.toFixed(1)}%`,
      item.stress.toUpperCase(),
      item.diagnosis
    ]);

    autoTable(doc, {
      startY: 35,
      head: [tableColumn],
      body: tableRows,
      headStyles: { fillColor: [22, 101, 52], fontSize: 11 },
      alternateRowStyles: { fillColor: [240, 253, 244] },
      margin: { top: 35 },
    });

    doc.save(fullFileName);
  };

  const getStressStyle = (level) => {
    switch (level?.toUpperCase()) {
      case 'HIGH': return 'bg-red-100 text-red-800 border-red-200';
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'LOW': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) return <div className="p-8 text-center text-green-700 font-semibold">Loading Analysis Data...</div>;

  // Get the most recent reading for the Advice Card
  const latestReading = data[data.length - 1];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header with Dual Actions */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Efficiency Analytics</h1>
        <div className="flex gap-3">
          <button 
            onClick={shareReport} 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition shadow-md flex items-center"
          >
            <span className="mr-2">📧</span> Share Report
          </button>
          <button 
            onClick={downloadPDF} 
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition shadow-md flex items-center"
          >
            <span className="mr-2">📥</span> Download PDF
          </button>
        </div>
      </div>

      {/* --- 2. ADVICE ENGINE CARD --- */}
      {latestReading && (
        <div className="bg-white border-l-8 border-green-500 p-6 rounded-lg shadow-md mb-8">
          <div className="flex items-start">
            <span className="text-3xl mr-4">💡</span>
            <div>
              <h3 className="text-lg font-bold text-gray-800">Smart Recommendation</h3>
              <p className="text-sm text-gray-500 mb-2">Based on your latest scan ({latestReading.date})</p>
              <div className="p-3 bg-green-50 rounded border border-green-100 text-green-800 text-sm">
                <strong>{latestReading.diagnosis}:</strong> {ADVICE_MAP[latestReading.diagnosis] || "Continue monitoring crop health."}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- TREND CHART SECTION --- */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Efficiency Trend Over Time</h3>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" />
              <YAxis domain={[0, 100]} unit="%" />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Line 
                type="monotone" 
                dataKey="score" 
                name="Efficiency Score"
                stroke="#10b981" 
                strokeWidth={4} 
                dot={{ r: 6, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* --- DATA TABLE --- */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-100">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Efficiency</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stress Level</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Diagnosis</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-blue-600">
                  {item.score.toFixed(1)}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 rounded-full border text-xs font-bold shadow-sm ${getStressStyle(item.stress)}`}>
                    {item.stress.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className="bg-gray-100 px-2 py-1 rounded text-gray-700 italic">
                    {item.diagnosis}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultsDashboard;