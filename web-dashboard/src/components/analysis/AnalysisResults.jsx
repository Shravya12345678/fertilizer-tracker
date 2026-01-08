// import React from 'react';

// const Placeholder = () => (
//   <div className="p-8">
//     <h2 className="text-2xl font-bold text-gray-800">Coming Soon...</h2>
//     <p className="text-gray-600 mt-2">This component is part of the afternoon mission.</p>
//   </div>
// );

// export default Placeholder;

// src/components/analysis/AnalysisResults.jsx





// import React from 'react';
// import { Sun, Cloud, CloudRain, Wind, Droplets } from 'lucide-react';

// const AnalysisResults = ({ data = [] }) => {
//   // Mapping weather text to icons for a better UI
//   const getWeatherIcon = (condition) => {
//     switch (condition) {
//       case 'Sunny': return <Sun className="text-yellow-500" size={18} />;
//       case 'Cloudy': return <Cloud className="text-gray-400" size={18} />;
//       case 'Rainy': return <CloudRain className="text-blue-500" size={18} />;
//       case 'High Wind': return <Wind className="text-teal-500" size={18} />;
//       case 'Humid': return <Droplets className="text-blue-300" size={18} />;
//       default: return <Sun className="text-yellow-500" size={18} />;
//     }
//   };

//   return (
//     <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
//       <div className="p-6 border-b border-gray-100">
//         <h3 className="text-lg font-bold text-gray-800">Historical Analysis Logs</h3>
//       </div>
//       <div className="overflow-x-auto">
//         <table className="w-full text-left">
//           <thead className="bg-gray-50 text-gray-600 text-xs uppercase font-semibold">
//             <tr>
//               <th className="px-6 py-4">Date</th>
//               <th className="px-6 py-4">Weather</th>
//               <th className="px-6 py-4">Efficiency</th>
//               <th className="px-6 py-4">Diagnosis</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-100">
//             {data.map((item, index) => (
//               <tr key={index} className="hover:bg-gray-50 transition-colors">
//                 <td className="px-6 py-4 text-sm text-gray-700 font-medium">{item.date}</td>
//                 <td className="px-6 py-4">
//                   <div className="flex items-center gap-2 text-sm text-gray-600">
//                     {getWeatherIcon(item.weather)}
//                     {item.weather}
//                   </div>
//                 </td>
//                 <td className="px-6 py-4">
//                   <span className={`px-2 py-1 rounded-full text-xs font-bold ${
//                     item.score > 80 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
//                   }`}>
//                     {item.score.toFixed(1)}%
//                   </span>
//                 </td>
//                 <td className="px-6 py-4 text-sm text-gray-600 italic">
//                   {item.diagnosis}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AnalysisResults;


// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { Sun, Cloud, CloudRain, Wind, Droplets, Loader2 } from 'lucide-react';
// import { thermalAPI } from '../../services/api'; // Ensure this path is correct
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
// import { ArrowLeft } from 'lucide-react';

// const AnalysisResults = () => {
//   const { id } = useParams(); // Get ID from URL
//   const [analysisData, setAnalysisData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//   const fetchDetailedResults = async () => {
//     try {
//       setLoading(true);
//       const response = await thermalAPI.getOne(id);
      
//       // 1. Log to verify (as seen in your image)
//       console.log("API Response received:", response.data);

//       // 2. Access the deep 'thermalData' object
//       const thermalData = response.data?.data?.thermalData;

//       if (thermalData) {
//         const formattedData = [{
//           // Use 'measurementDate' from your console log
//           date: thermalData.measurementDate 
//             ? new Date(thermalData.measurementDate).toLocaleDateString() 
//             : 'N/A',
          
//           // Use 'analysis.efficiencyScore' from your console log
//           score: thermalData.analysis?.efficiencyScore || 0,
          
//           // Your 'environmental' object doesn't have a 'condition' string, 
//           // so we'll default to Sunny for now.
//           weather: thermalData.environmental?.condition || 'Sunny',
          
//           // Join the 'deficiencies' array (e.g., "N_deficient")
//           diagnosis: thermalData.analysis?.deficiencies?.length > 0 
//             ? thermalData.analysis.deficiencies.join(', ') 
//             : 'Analysis complete'
//         }];
        
//         setAnalysisData(formattedData);
//       }
//     } catch (error) {
//       console.error("Fetch Error:", error);
//       toast.error("Failed to load details");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (id) fetchDetailedResults();
// }, [id]);

  

// //   useEffect(() => {
// //   const fetchDetailedResults = async () => {
// //     try {
// //       setLoading(true);
// //       // Use getOne to match your api.js
// //       const response = await thermalAPI.getOne(id);
      
// //       // Based on your Dashboard code, we likely need response.data.data
// //       const thermalRecord = response.data.data || response.data;

// //       const formattedData = [{
// //         // Ensure we are using the correct field names from your backend
// //         date: thermalRecord.createdAt ? new Date(thermalRecord.createdAt).toLocaleDateString() : 'N/A',
// //         weather: thermalRecord.environmental?.condition || 'Sunny',
// //         score: thermalRecord.efficiency || 0, 
// //         diagnosis: thermalRecord.diagnosis || 'Analysis pending...'
// //       }];

// //       setAnalysisData(formattedData);
// //     } catch (error) {
// //       console.error("Error fetching analysis:", error);
// //       toast.error("Could not load analysis details");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   if (id) fetchDetailedResults();
// // }, [id]);

//   // useEffect(() => {
//   //   const fetchDetailedResults = async () => {
//   //     try {
//   //       setLoading(true);
//   //       // Fetch the specific thermal record by ID
//   //       const response = await thermalAPI.getById(id);
        
        
//   //       // We put the single result into an array so your .map() still works
//   //       // Note: Map the API fields to what your table expects
//   //       const formattedData = [{
//   //         date: new Date(response.data.createdAt).toLocaleDateString(),
//   //         weather: response.data.environmental?.condition || 'Sunny',
//   //         score: response.data.efficiency || 0,
//   //         diagnosis: response.data.diagnosis || 'No diagnosis available'
//   //       }];

//   //       setAnalysisData(formattedData);
//   //     } catch (error) {
//   //       console.error("Error fetching analysis:", error);
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };

//   //   if (id) fetchDetailedResults();
//   // }, [id]);

//   // const getWeatherIcon = (condition) => {
//   //   switch (condition) {
//   //     case 'Sunny': return <Sun className="text-yellow-500" size={18} />;
//   //     case 'Cloudy': return <Cloud className="text-gray-400" size={18} />;
//   //     case 'Rainy': return <CloudRain className="text-blue-500" size={18} />;
//   //     default: return <Sun className="text-yellow-500" size={18} />;
//   //   }
//   // };

//   if (loading) {
//     return (
//       <div className="flex flex-col items-center justify-center py-20">
//         <Loader2 className="animate-spin text-blue-600 mb-4" size={40} />
//         <p className="text-gray-500 animate-pulse">Retrieving detailed analysis...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
//         <div className="p-6 border-b border-gray-100 flex justify-between items-center">
//           <button 
//           onClick={() => navigate(-1)} 
//           className="flex items-center gap-2 text-gray-500 hover:text-blue-600 mb-4 transition-colors font-medium text-sm"
//           >
//             <ArrowLeft size={16} />
//             Back to Crop Details
//           </button>
          
//           <h3 className="text-lg font-bold text-gray-800">Historical Analysis Logs</h3>
//           <span className="text-xs text-gray-400">ID: {id}</span>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="w-full text-left">
//             <thead className="bg-gray-50 text-gray-600 text-xs uppercase font-semibold">
//               <tr>
//                 <th className="px-6 py-4">Date</th>
                
//                 <th className="px-6 py-4">Efficiency</th>
//                 <th className="px-6 py-4">Diagnosis</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-100">
//               {analysisData.length > 0 ? (
//                 analysisData.map((item, index) => (
//                   <tr key={index} className="hover:bg-gray-50 transition-colors">
//                     <td className="px-6 py-4 text-sm text-gray-700 font-medium">{item.date}</td>
                    
//                     <td className="px-6 py-4">
//                       <span className={`px-2 py-1 rounded-full text-xs font-bold ${
//                         item.score > 80 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
//                       }`}>
//                         {item.score.toFixed(1)}%
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-600 italic">
//                       {item.diagnosis}
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="4" className="px-6 py-10 text-center text-gray-400">
//                     No records found for this analysis.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AnalysisResults;

// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { ArrowLeft, Loader2, Download, Send } from 'lucide-react';
// import { thermalAPI } from '../../services/api';
// import { toast } from 'react-toastify';
// import jsPDF from 'jspdf';
// import autoTable from 'jspdf-autotable';
// import emailjs from '@emailjs/browser';

// // --- ADVICE MAP (Copied from your ResultsDashboard) ---
// const ADVICE_MAP = {
//   'K_deficient': 'Potassium deficiency detected. Recommendation: Apply 50kg/acre of MOP. Potassium helps with water regulation and enzyme activation.',
//   'N_deficient': 'Nitrogen deficiency detected. Recommendation: Apply Urea or Ammonium Nitrate to boost vegetative growth.',
//   'Healthy': 'Crop health is optimal. Maintain current irrigation and nutrient application schedule.',
//   'Normal': 'No immediate deficiencies found. Continue regular monitoring.'
// };

// const AnalysisResults = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [thermalData, setThermalData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchDetailedResults = async () => {
//       try {
//         setLoading(true);
//         const response = await thermalAPI.getOne(id);
//         const data = response.data?.data?.thermalData;
//         if (data) setThermalData(data);
//       } catch (error) {
//         console.error("Fetch Error:", error);
//         toast.error("Failed to load details");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (id) fetchDetailedResults();
//   }, [id]);

//   // --- SHARE REPORT LOGIC (Using your EmailJS credentials) ---
//   const shareReport = () => {
//     if (!thermalData) return;

//     const recipientEmail = prompt("Enter the email address to share this report with:", "your-email@gmail.com");
//     if (!recipientEmail) return;

//     const templateParams = {
//       date: new Date(thermalData.measurementDate).toLocaleDateString(),
//       score: thermalData.analysis?.efficiencyScore.toFixed(1),
//       diagnosis: thermalData.analysis?.deficiencies?.join(', ') || 'Healthy',
//       to_email: recipientEmail
//     };

//     const loadingToast = toast.loading("📧 Sending report to inbox...");

//     emailjs.send(
//         'gmail_service', 
//         'template_ng2riwd', 
//         templateParams, 
//         'Iqcm5ZBJqFLnVYNtq'
//     )
//     .then(() => {
//       toast.success("🚀 Report shared successfully!", { id: loadingToast });
//     })
//     .catch((err) => {
//       toast.error("❌ Failed to send email.", { id: loadingToast });
//       console.error("EmailJS Error:", err);
//     });
//   };

//   // --- DOWNLOAD PDF LOGIC (Using your Green Theme) ---
//   const downloadPDF = () => {
//     if (!thermalData) return;
//     const doc = new jsPDF();
//     const now = new Date();
    
//     doc.setFontSize(20);
//     doc.setTextColor(22, 101, 52); // Your specific green color
//     doc.text('Detailed Analysis Report', 14, 22);
    
//     doc.setFontSize(10);
//     doc.setTextColor(100);
//     doc.text(`Report ID: ${id}`, 14, 30);
//     doc.text(`Generated: ${now.toLocaleDateString()} at ${now.toLocaleTimeString()}`, 14, 35);
    
//     const tableColumn = ["Metric", "Value"];
//     const tableRows = [
//       ["Date", new Date(thermalData.measurementDate).toLocaleDateString()],
//       ["Efficiency Score", `${thermalData.analysis?.efficiencyScore.toFixed(1)}%`],
//       ["Stress Level", (thermalData.analysis?.stressLevel || 'Normal').toUpperCase()],
//       ["Diagnosis", thermalData.analysis?.deficiencies?.join(', ') || 'Healthy'],
//       ["Temperature", `${thermalData.environmental?.temperature}°C`],
//       ["Humidity", `${thermalData.environmental?.humidity}%`]
//     ];

//     autoTable(doc, {
//       startY: 40,
//       head: [tableColumn],
//       body: tableRows,
//       headStyles: { fillColor: [22, 101, 52], fontSize: 11 },
//       alternateRowStyles: { fillColor: [240, 253, 244] },
//     });

//     doc.save(`Analysis_${id.slice(-6)}.pdf`);
//   };

//   if (loading) {
//     return (
//       <div className="flex flex-col items-center justify-center py-20 text-green-700">
//         <Loader2 className="animate-spin mb-4" size={40} />
//         <p className="animate-pulse font-medium">Retrieving detailed analysis...</p>
//       </div>
//     );
//   }

//   const diagnosis = thermalData?.analysis?.deficiencies?.[0] || 'Healthy';

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       {/* Header with Actions */}
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
//         <div>
//           <button 
//             onClick={() => navigate(-1)} 
//             className="flex items-center gap-2 text-gray-500 hover:text-green-600 transition-colors font-medium text-sm mb-2"
//           >
//             <ArrowLeft size={16} />
//             Back to Crop Details
//           </button>
//           <h1 className="text-2xl font-bold text-gray-900">Detailed Analysis</h1>
//         </div>

//         <div className="flex gap-3">
//           <button 
//             onClick={shareReport} 
//             className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition shadow-md flex items-center text-sm font-medium"
//           >
//             <Send size={16} className="mr-2" /> Share Report
//           </button>
//           <button 
//             onClick={downloadPDF} 
//             className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition shadow-md flex items-center text-sm font-medium"
//           >
//             <Download size={16} className="mr-2" /> Download PDF
//           </button>
//         </div>
//       </div>

//       {/* Smart Recommendation Card (Added from Dashboard Logic) */}
//       <div className="bg-white border-l-8 border-green-500 p-6 rounded-lg shadow-md mb-8">
//         <div className="flex items-start">
//           <span className="text-3xl mr-4">💡</span>
//           <div>
//             <h3 className="text-lg font-bold text-gray-800">Smart Recommendation</h3>
//             <p className="text-sm text-gray-500 mb-2">Based on this scan's unique data</p>
//             <div className="p-3 bg-green-50 rounded border border-green-100 text-green-800 text-sm">
//               <strong>{diagnosis}:</strong> {ADVICE_MAP[diagnosis] || "Continue monitoring crop health."}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Data Table */}
//       <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
//         <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
//           <h3 className="text-lg font-bold text-gray-800">Historical Analysis Logs</h3>
//           <span className="text-xs text-gray-400 font-mono">ID: {id}</span>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="w-full text-left">
//             <thead className="bg-gray-50 text-gray-600 text-xs uppercase font-semibold">
//               <tr>
//                 <th className="px-8 py-4">Date</th>
//                 <th className="px-8 py-4">Efficiency</th>
//                 <th className="px-8 py-4">Diagnosis</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-100">
//               <tr className="hover:bg-green-50/30 transition-colors">
//                 <td className="px-8 py-6 text-sm text-gray-700 font-medium">
//                   {new Date(thermalData.measurementDate).toLocaleDateString()}
//                 </td>
//                 <td className="px-8 py-6">
//                   <span className={`px-3 py-1 rounded-full text-sm font-bold ${
//                     thermalData.analysis?.efficiencyScore > 80 
//                       ? 'bg-green-100 text-green-700' 
//                       : 'bg-blue-100 text-blue-700'
//                   }`}>
//                     {thermalData.analysis?.efficiencyScore.toFixed(1)}%
//                   </span>
//                 </td>
//                 <td className="px-8 py-6 text-sm text-gray-600 italic">
//                   {thermalData.analysis?.deficiencies?.join(', ') || 'Healthy'}
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AnalysisResults;


// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { 
//   ArrowLeft, 
//   Loader2, 
//   Download, 
//   Send, 
//   Thermometer, 
//   Droplets, 
//   CloudRain, 
//   Zap, 
//   Image as ImageIcon 
// } from 'lucide-react';
// import { thermalAPI } from '../../services/api';
// import { toast } from 'react-toastify';
// import jsPDF from 'jspdf';
// import autoTable from 'jspdf-autotable';
// import emailjs from '@emailjs/browser';

// // --- ADVICE MAP ---
// const ADVICE_MAP = {
//   'K_deficient': 'Potassium deficiency detected. Recommendation: Apply 50kg/acre of MOP. Potassium helps with water regulation and enzyme activation.',
//   'N_deficient': 'Nitrogen deficiency detected. Recommendation: Apply Urea or Ammonium Nitrate to boost vegetative growth.',
//   'Healthy': 'Crop health is optimal. Maintain current irrigation and nutrient application schedule.',
//   'Normal': 'No immediate deficiencies found. Continue regular monitoring.'
// };

// const AnalysisResults = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [thermalData, setThermalData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchDetailedResults = async () => {
//       try {
//         setLoading(true);
//         const response = await thermalAPI.getOne(id);
//         // Extracting data based on your console log
//         const data = response.data?.data?.thermalData;
//         if (data) setThermalData(data);
//       } catch (error) {
//         console.error("Fetch Error:", error);
//         toast.error("Failed to load details");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (id) fetchDetailedResults();
//   }, [id]);

//   const shareReport = () => {
//     if (!thermalData) return;

//     const recipientEmail = prompt("Enter the email address to share this report with:", "your-email@gmail.com");
//     if (!recipientEmail) return;

//     const templateParams = {
//       date: new Date(thermalData.measurementDate).toLocaleDateString(),
//       score: thermalData.analysis?.efficiencyScore.toFixed(1),
//       diagnosis: thermalData.analysis?.deficiencies?.join(', ') || 'Healthy',
//       to_email: recipientEmail
//     };

//     // Use toast.promise to handle the entire lifecycle automatically
//     toast.promise(
//       emailjs.send(
//       process.env.REACT_APP_EMAILJS_SERVICE_ID,    // instead of 'gmail_service'
//       process.env.REACT_APP_EMAILJS_TEMPLATE_ID,   // instead of 'template_ng2riwd'
//       templateParams, 
//       process.env.REACT_APP_EMAILJS_PUBLIC_KEY     // instead of 'Iqcm5ZBJqFLnVYNtq'
//       ),
//       // emailjs.send(
//       //   'gmail_service', 
//       //   'template_ng2riwd', 
//       //   templateParams, 
//       //   'Iqcm5ZBJqFLnVYNtq'
//       // ),
//       {
//         pending: '📧 Sending report to inbox...',
//         success: {
//           render: '🚀 Report sent successfully!',
//           // This makes the toast disappear after 3 seconds
//           autoClose: 3000 
//         },
//         error: {
//           render: '❌ Failed to send email.',
//           autoClose: 5000
//         }
//       }
//     );
//   };

//   // // --- SHARE REPORT LOGIC ---
//   // const shareReport = () => {
//   //   if (!thermalData) return;

//   //   const recipientEmail = prompt("Enter the email address to share this report with:", "your-email@gmail.com");
//   //   if (!recipientEmail) return;

//   //   const templateParams = {
//   //     date: new Date(thermalData.measurementDate).toLocaleDateString(),
//   //     score: thermalData.analysis?.efficiencyScore.toFixed(1),
//   //     diagnosis: thermalData.analysis?.deficiencies?.join(', ') || 'Healthy',
//   //     to_email: recipientEmail
//   //   };

//   //   const loadingToast = toast.loading("📧 Sending report to inbox...");

//   //   emailjs.send(
//   //       'gmail_service', 
//   //       'template_ng2riwd', 
//   //       templateParams, 
//   //       'Iqcm5ZBJqFLnVYNtq'
//   //   )
//   //   .then(() => {
//   //     toast.success("🚀 Report shared successfully!", { id: loadingToast });
//   //   })
//   //   .catch((err) => {
//   //     toast.error("❌ Failed to send email.", { id: loadingToast });
//   //     console.error("EmailJS Error:", err);
//   //   });
//   // };

//   // --- DOWNLOAD PDF LOGIC ---
//   const downloadPDF = () => {
//     if (!thermalData) return;
//     const doc = new jsPDF();
//     const now = new Date();
    
//     doc.setFontSize(20);
//     doc.setTextColor(22, 101, 52); // Green theme
//     doc.text('Detailed Analysis Report', 14, 22);
    
//     doc.setFontSize(10);
//     doc.setTextColor(100);
//     doc.text(`Report ID: ${id}`, 14, 30);
//     doc.text(`Generated: ${now.toLocaleDateString()} at ${now.toLocaleTimeString()}`, 14, 35);
    
//     const tableColumn = ["Metric", "Value"];
//     const tableRows = [
//       ["Date", new Date(thermalData.measurementDate).toLocaleDateString()],
//       ["Efficiency Score", `${thermalData.analysis?.efficiencyScore.toFixed(1)}%`],
//       ["Stress Level", (thermalData.analysis?.stressLevel || 'Normal').toUpperCase()],
//       ["Diagnosis", thermalData.analysis?.deficiencies?.join(', ') || 'Healthy'],
//       ["Temperature", `${thermalData.environmental?.temperature}°C`],
//       ["Humidity", `${thermalData.environmental?.humidity}%`],
//       ["Rainfall", `${thermalData.environmental?.rainfall}mm`]
//     ];

//     autoTable(doc, {
//       startY: 40,
//       head: [tableColumn],
//       body: tableRows,
//       headStyles: { fillColor: [22, 101, 52], fontSize: 11 },
//       alternateRowStyles: { fillColor: [240, 253, 244] },
//     });

//     doc.save(`Analysis_Report_${id.slice(-6)}.pdf`);
//   };

//   if (loading) {
//     return (
//       <div className="flex flex-col items-center justify-center py-20 text-green-700">
//         <Loader2 className="animate-spin mb-4" size={40} />
//         <p className="animate-pulse font-medium">Retrieving detailed analysis...</p>
//       </div>
//     );
//   }

//   const diagnosis = thermalData?.analysis?.deficiencies?.[0] || 'Healthy';

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       {/* Header with Actions */}
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
//         <div>
//           <button 
//             onClick={() => navigate(-1)} 
//             className="flex items-center gap-2 text-gray-500 hover:text-green-600 transition-colors font-medium text-sm mb-2"
//           >
//             <ArrowLeft size={16} />
//             Back to Crop Details
//           </button>
//           <h1 className="text-2xl font-bold text-gray-900">Analysis Breakdown</h1>
//         </div>

//         <div className="flex gap-3">
//           <button 
//             onClick={shareReport} 
//             className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition shadow-md flex items-center text-sm font-medium"
//           >
//             <Send size={16} className="mr-2" /> Share Report
//           </button>
//           <button 
//             onClick={downloadPDF} 
//             className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition shadow-md flex items-center text-sm font-medium"
//           >
//             <Download size={16} className="mr-2" /> Download PDF
//           </button>
//         </div>
//       </div>

//       {/* --- NEW: VISUAL ANALYSIS GRID --- */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
//         {/* Thermal Scan Card */}
//         <div className="bg-white p-5 rounded-xl shadow-lg border border-gray-100">
//           <h3 className="text-md font-bold text-gray-800 mb-4 flex items-center gap-2">
//             <ImageIcon className="text-green-600" size={18} /> Thermal Visualization
//           </h3>
//           <div className="aspect-video bg-gray-50 rounded-lg overflow-hidden border-2 border-dashed border-gray-200 flex flex-col items-center justify-center relative">
//              {/* If you have a specific image path in your DB, replace the placeholder below */}
//              <div className="text-center p-6">
//                 <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
//                     <Zap className="text-green-600" size={30} />
//                 </div>
//                 <p className="text-gray-500 font-medium">Thermal Data Rendered</p>
//                 <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest">Scan ID: {id.slice(-8)}</p>
//              </div>
//              {/* Gradient overlay to simulate a "thermal" look for the UI */}
//              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-red-500/5 pointer-events-none"></div>
//           </div>
//         </div>

//         {/* Environmental Conditions Card */}
//         <div className="bg-white p-5 rounded-xl shadow-lg border border-gray-100">
//           <h3 className="text-md font-bold text-gray-800 mb-4 flex items-center gap-2">
//             <Thermometer className="text-orange-500" size={18} /> Site Conditions
//           </h3>
//           <div className="grid grid-cols-2 gap-4">
//             <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
//               <span className="text-[10px] font-bold text-orange-600 uppercase">Temperature</span>
//               <p className="text-2xl font-black text-orange-700">{thermalData?.environmental?.temperature}°C</p>
//             </div>
//             <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
//               <span className="text-[10px] font-bold text-blue-600 uppercase">Humidity</span>
//               <p className="text-2xl font-black text-blue-700">{thermalData?.environmental?.humidity}%</p>
//             </div>
//             <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
//               <span className="text-[10px] font-bold text-indigo-600 uppercase">Rainfall</span>
//               <p className="text-2xl font-black text-indigo-700">{thermalData?.environmental?.rainfall}mm</p>
//             </div>
//             <div className="bg-green-50 p-4 rounded-xl border border-green-100">
//               <span className="text-[10px] font-bold text-green-600 uppercase">Efficiency</span>
//               <p className="text-2xl font-black text-green-700">{thermalData?.analysis?.efficiencyScore.toFixed(1)}%</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Smart Recommendation Card */}
//       <div className="bg-white border-l-8 border-green-500 p-6 rounded-lg shadow-md mb-8">
//         <div className="flex items-start">
//           <span className="text-3xl mr-4">💡</span>
//           <div>
//             <h3 className="text-lg font-bold text-gray-800">Smart Recommendation</h3>
//             <p className="text-sm text-gray-500 mb-2">Based on this scan's unique data</p>
//             <div className="p-3 bg-green-50 rounded border border-green-100 text-green-800 text-sm">
//               <strong>{diagnosis}:</strong> {ADVICE_MAP[diagnosis] || "Continue monitoring crop health."}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Historical Data Table */}
//       <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
//         <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
//           <h3 className="text-lg font-bold text-gray-800">Historical Analysis Logs</h3>
//           <span className="text-xs text-gray-400 font-mono">Reference: {id}</span>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="w-full text-left">
//             <thead className="bg-gray-50 text-gray-600 text-xs uppercase font-semibold">
//               <tr>
//                 <th className="px-8 py-4">Date</th>
//                 <th className="px-8 py-4">Efficiency</th>
//                 <th className="px-8 py-4">Diagnosis</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-100">
//               <tr className="hover:bg-green-50/30 transition-colors">
//                 <td className="px-8 py-6 text-sm text-gray-700 font-medium">
//                   {new Date(thermalData.measurementDate).toLocaleDateString()}
//                 </td>
//                 <td className="px-8 py-6">
//                   <span className={`px-3 py-1 rounded-full text-sm font-bold ${
//                     thermalData.analysis?.efficiencyScore > 80 
//                       ? 'bg-green-100 text-green-700' 
//                       : 'bg-blue-100 text-blue-700'
//                   }`}>
//                     {thermalData.analysis?.efficiencyScore.toFixed(1)}%
//                   </span>
//                 </td>
//                 <td className="px-8 py-6 text-sm text-gray-600 italic">
//                   {thermalData.analysis?.deficiencies?.join(', ') || 'Healthy'}
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AnalysisResults;


import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Loader2, 
  Download, 
  Send, 
  Thermometer, 
  Zap, 
  ImageIcon 
} from 'lucide-react';
import { thermalAPI } from '../../services/api';
import { toast } from 'react-toastify';
// import jsPDF from 'jspdf';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import emailjs from '@emailjs/browser';

const AnalysisResults = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [thermalData, setThermalData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetailedResults = async () => {
      try {
        setLoading(true);
        const response = await thermalAPI.getOne(id);
        const data = response.data?.data?.thermalData || response.data?.data;
        if (data) setThermalData(data);
      } catch (error) {
        console.error("Fetch Error:", error);
        toast.error("Failed to load details");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchDetailedResults();
  }, [id]);

  // --- SHARE REPORT LOGIC ---
  const shareReport = () => {
    if (!thermalData) return;

    const recipientEmail = prompt("Enter the email address to share this report with:", "farmer@example.com");
    if (!recipientEmail) return;

    const templateParams = {
      date: new Date(thermalData.measurementDate).toLocaleDateString(),
      score: thermalData.analysis?.efficiencyScore?.toFixed(1) || 'N/A',
      diagnosis: thermalData.analysis?.deficiencies?.join(', ') || 'Healthy',
      to_email: recipientEmail
    };

    toast.promise(
      emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        templateParams, 
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      ),
      {
        pending: '📧 Sending report to inbox...',
        success: '🚀 Report sent successfully!',
        error: '❌ Failed to send email.'
      }
    );
  };

  // --- DOWNLOAD PDF LOGIC ---
  const downloadPDF = () => {
    if (!thermalData) return;
    const doc = new jsPDF();
    const now = new Date();
    
    doc.setFontSize(20);
    doc.setTextColor(22, 101, 52); 
    doc.text('Thermal Analysis Report', 14, 22);
    
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Report ID: ${id}`, 14, 30);
    doc.text(`Generated: ${now.toLocaleDateString()} at ${now.toLocaleTimeString()}`, 14, 35);
    
    const tableColumn = ["Metric", "Value"];
    const tableRows = [
      ["Date", new Date(thermalData.measurementDate).toLocaleDateString()],
      ["Efficiency Score", `${thermalData.analysis?.efficiencyScore?.toFixed(1)}%`],
      ["Stress Level", (thermalData.analysis?.stressLevel || 'Normal').toUpperCase()],
      ["Diagnosis", thermalData.analysis?.deficiencies?.join(', ') || 'Healthy'],
      ["Temperature", `${thermalData.environmental?.temperature}°C`],
      ["Humidity", `${thermalData.environmental?.humidity}%`],
      ["Rainfall", `${thermalData.environmental?.rainfall}mm`]
    ];

    autoTable(doc, {
      startY: 40,
      head: [tableColumn],
      body: tableRows,
      headStyles: { fillColor: [22, 101, 52] },
    });

    // Add heatmap note if present
    if (thermalData.analysis?.heatmapImage) {
      doc.text("Thermal Scan processed and stored in digital records.", 14, doc.lastAutoTable.finalY + 10);
    }

    doc.save(`Fertilizer_Report_${id.slice(-6)}.pdf`);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-green-700">
        <Loader2 className="animate-spin mb-4" size={40} />
        <p className="animate-pulse font-medium">Retrieving detailed analysis...</p>
      </div>
    );
  }

  const diagnosis = thermalData?.analysis?.deficiencies?.[0] || 'Healthy';

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header with Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center gap-2 text-gray-500 hover:text-green-600 transition-colors font-medium text-sm mb-2"
          >
            <ArrowLeft size={16} /> Back to Details
          </button>
          <h1 className="text-2xl font-bold text-gray-900">AI Analysis Breakdown</h1>
        </div>

        <div className="flex gap-3">
          <button 
            onClick={shareReport} 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition shadow-md flex items-center text-sm font-medium"
          >
            <Send size={16} className="mr-2" /> Share
          </button>
          <button 
            onClick={downloadPDF} 
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition shadow-md flex items-center text-sm font-medium"
          >
            <Download size={16} className="mr-2" /> Download PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Heatmap Card */}
        <div className="bg-white p-5 rounded-xl shadow-lg border border-gray-100">
          <h3 className="text-md font-bold text-gray-800 mb-4 flex items-center gap-2">
            <ImageIcon className="text-green-600" size={18} /> Thermal Visualization
          </h3>
          <div className="aspect-video bg-gray-50 rounded-lg overflow-hidden border border-gray-200 flex items-center justify-center mb-4 shadow-inner">
            {thermalData?.analysis?.heatmapImage ? (
              <img 
                src={thermalData.analysis.heatmapImage} 
                alt="Thermal Scan" 
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="text-center p-6 text-gray-400">
                <Zap className="mx-auto mb-2" size={32} />
                <p className="text-sm">Scan rendering unavailable</p>
              </div>
            )}
          </div>
          <div className="grid grid-cols-2 gap-2 text-[10px] font-bold uppercase">
            <div className="flex items-center gap-2 p-2 bg-red-50 text-red-700 rounded border border-red-100">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div> Stress / Hot
            </div>
            <div className="flex items-center gap-2 p-2 bg-green-50 text-green-700 rounded border border-green-100">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div> Healthy / Cool
            </div>
          </div>
        </div>

        {/* Conditions Card */}
        <div className="bg-white p-5 rounded-xl shadow-lg border border-gray-100">
          <h3 className="text-md font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Thermometer className="text-orange-500" size={18} /> Site Conditions
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
              <span className="text-[10px] font-bold text-orange-600 uppercase tracking-wider">Temperature</span>
              <p className="text-2xl font-black text-orange-700">{thermalData?.environmental?.temperature}°C</p>
            </div>
            <div className="bg-green-50 p-4 rounded-xl border border-green-100">
              <span className="text-[10px] font-bold text-green-600 uppercase tracking-wider">Efficiency</span>
              <p className="text-2xl font-black text-green-700">{thermalData?.analysis?.efficiencyScore?.toFixed(1)}%</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Humidity</span>
              <p className="text-2xl font-black text-blue-700">{thermalData?.environmental?.humidity}%</p>
            </div>
            <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
              <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">Stress Level</span>
              <p className="text-xl font-black text-indigo-700 uppercase">{(thermalData?.analysis?.stressLevel || 'low')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* AI Recommendation Section */}
      <div className="bg-white border-l-8 border-green-500 p-6 rounded-lg shadow-md mb-8">
        <div className="flex items-start">
          <span className="text-3xl mr-4">💡</span>
          <div>
            <h3 className="text-lg font-bold text-gray-800">Smart Recommendation</h3>
            <p className="text-sm text-gray-500 mb-3">AI-generated advice based on thermal and soil data:</p>
            <div className="p-4 bg-green-50 rounded border border-green-100 text-green-800 font-medium">
              {thermalData?.analysis?.recommendations || "Continue standard monitoring."}
            </div>
          </div>
        </div>
      </div>

      {/* Historical Data Log */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="p-4 border-b bg-gray-50/50">
          <h3 className="text-md font-bold text-gray-800">Analysis Logs</h3>
        </div>
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
            <tr>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Score</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <tr>
              <td className="px-6 py-4 text-sm font-medium">{new Date(thermalData.measurementDate).toLocaleDateString()}</td>
              <td className="px-6 py-4 text-sm">{thermalData.analysis?.efficiencyScore?.toFixed(1)}%</td>
              <td className="px-6 py-4 text-sm italic text-gray-500">{diagnosis}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AnalysisResults;