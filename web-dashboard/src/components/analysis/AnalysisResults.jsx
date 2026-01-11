


import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2, Download, Send, ImageIcon } from 'lucide-react';
import { thermalAPI } from '../../services/api';
import { toast } from 'react-toastify';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const AnalysisResults = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await thermalAPI.getOne(id);
        // The API structure usually nests the ML results under 'analysis'
        const thermalData = res.data?.data?.thermalData || res.data?.data;
        setData(thermalData);
      } catch (err) {
        toast.error("Failed to load analysis");
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [id]);

  // Download PDF logic
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Field Analysis Report", 14, 20);
    autoTable(doc, {
      startY: 30,
      body: [
        ["Efficiency Score", `${data?.analysis?.efficiency_score || data?.analysis?.efficiencyScore}%`],
        ["Status", data?.analysis?.deficiency || "Optimal"],
        ["Stress Level", data?.analysis?.stress_level || "Low"]
      ],
    });
    doc.save(`Report_${id.substring(0, 8)}.pdf`);
  };

  if (loading) return (
    <div className="flex justify-center py-20"><Loader2 className="animate-spin text-green-600" /></div>
  );

  // LOGIC: Check both naming conventions (underscore from Python, camelCase from legacy)
  const heatmap = data?.analysis?.heatmap_image || data?.analysis?.heatmapImage;
  const score = data?.analysis?.efficiency_score || data?.analysis?.efficiencyScore;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-600 hover:text-green-600">
          <ArrowLeft size={18} /> Back
        </button>
        <div className="flex gap-2">
          <button onClick={downloadPDF} className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <Download size={16} /> PDF
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {/* ONLY SHOW THIS CARD IF HEATMAP EXISTS */}
        {heatmap && (
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <ImageIcon size={20} className="text-green-600" /> Thermal Map Analysis
            </h3>
            <div className="rounded-xl overflow-hidden border border-gray-100">
              <img src={heatmap} alt="Thermal Map" className="w-full h-auto" />
            </div>
          </div>
        )}

        {/* SUMMARY CARD */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Efficiency Score</p>
              <h2 className="text-4xl font-black text-green-600">{score}%</h2>
            </div>
            <div className={`px-4 py-2 rounded-full font-bold text-sm ${score > 70 ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
              STRESS: {(data?.analysis?.stress_level || 'Normal').toUpperCase()}
            </div>
          </div>

          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-xl">
            <h4 className="font-bold text-green-800 mb-1">AI Recommendation</h4>
            <p className="text-green-700 italic">"{data?.analysis?.recommendations || "No specific action required."}"</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResults;