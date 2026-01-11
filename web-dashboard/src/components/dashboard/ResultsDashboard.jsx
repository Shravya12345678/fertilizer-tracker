

import React, { useState, useEffect } from 'react';
import { thermalAPI } from '../../services/api';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { toast } from 'react-toastify';
import emailjs from '@emailjs/browser';

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

      // Sort chronological: oldest to newest for the trend line
      setData(processedItems.reverse());
    } catch (error) {
      console.error("Error fetching analytics:", error);
      toast.error("Failed to load analysis data.");
    } finally {
      setLoading(false);
    }
  };

  const shareReport = () => {
    const latest = data[data.length - 1];
    if (!latest) return;

    const templateParams = {
      date: latest.date,
      score: latest.score.toFixed(1),
      diagnosis: latest.diagnosis,
      to_email: 'your-email@gmail.com' 
    };

    emailjs.send(
        'gmail_service', 
        'template_ng2riwd', 
        templateParams, 
        'Iqcm5ZBJqFLnVYNtq' 
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

  const latestReading = data[data.length - 1];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Efficiency Analytics</h1>
        <div className="flex gap-3">
          <button onClick={shareReport} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition shadow-md flex items-center">
            <span className="mr-2">📧</span> Share Report
          </button>
          <button onClick={downloadPDF} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition shadow-md flex items-center">
            <span className="mr-2">📥</span> Download PDF
          </button>
        </div>
      </div>

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

      {/* --- TREND CHART SECTION (FIXED CONTAINER) --- */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Efficiency Trend Over Time</h3>
        
        {/* FIX: Added a stable height and width to the wrapper div */}
        <div style={{ width: '100%', height: '350px', minHeight: '350px' }}>
          {data.length > 0 ? (
            /* FIX: Explicitly defined width and height for ResponsiveContainer */
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
          ) : (
            <div className="h-full flex items-center justify-center text-gray-400">
              No trend data available to display.
            </div>
          )}
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