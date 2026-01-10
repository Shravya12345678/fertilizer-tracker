// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
// import { analysisAPI } from '../config/api';
// import Card from '../components/Card';

// export default function AnalysisScreen({ route }) {
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     analysisAPI.analyze(route.params.thermalId)
//       .then(res => setResult(res.data.data))
//       .finally(() => setLoading(false));
//   }, []);

//   if (loading) return <ActivityIndicator size="large" color="#16a34a" style={{flex:1}} />;

//   return (
//     <View style={styles.container}>
//       <Card style={styles.resultCard}>
//         <Text style={styles.score}>{result?.efficiencyScore}%</Text>
//         <Text style={styles.label}>Fertilizer Efficiency</Text>
//       </Card>
//       <Card>
//         <Text style={styles.heading}>AI Recommendation</Text>
//         <Text style={styles.recommendation}>{result?.recommendation}</Text>
//       </Card>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, backgroundColor: '#f3f4f6' },
//   resultCard: { alignItems: 'center', padding: 30, backgroundColor: '#16a34a' },
//   score: { fontSize: 48, fontWeight: 'bold', color: '#fff' },
//   label: { color: '#dcfce7', marginTop: 5 },
//   heading: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
//   recommendation: { color: '#374151', lineHeight: 22 }
// });

// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   RefreshControl,
//   Alert,
// } from 'react-native';
// import { thermalAPI } from '../config/api';
// import Card from '../components/Card';

// const AnalysisScreen = ({ route }) => {
//   const { thermalId } = route.params;
//   const [thermalData, setThermalData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);

//   useEffect(() => {
//     fetchAnalysis();
//   }, []);

//   const fetchAnalysis = async () => {
//     try {
//       const response = await thermalAPI.getOne(thermalId);
//       setThermalData(response.data.data.thermalData);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching analysis:', error);
//       Alert.alert('Error', 'Failed to load analysis results');
//       setLoading(false);
//     }
//   };

//   const onRefresh = async () => {
//     setRefreshing(true);
//     await fetchAnalysis();
//     setRefreshing(false);
//   };

//   if (loading) {
//     return (
//       <View style={styles.centerContainer}>
//         <Text>Loading analysis...</Text>
//       </View>
//     );
//   }

//   if (!thermalData || !thermalData.processed) {
//     return (
//       <View style={styles.centerContainer}>
//         <Text style={styles.emptyText}>No analysis available</Text>
//       </View>
//     );
//   }

//   const { analysis } = thermalData;

//   const getEfficiencyColor = (score) => {
//     if (score >= 75) return '#16a34a';
//     if (score >= 50) return '#ca8a04';
//     return '#ef4444';
//   };

//   return (
//     <ScrollView
//       style={styles.container}
//       refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
//     >
//       <View style={styles.content}>
//         <Card>
//           <Text style={styles.cardTitle}>Analysis Results</Text>
//           <Text style={styles.subtitle}>
//             {thermalData.cropId?.cropName} •{' '}
//             {new Date(thermalData.measurementDate).toLocaleDateString()}
//           </Text>
//         </Card>

//         <Card>
//           <Text style={styles.cardTitle}>Fertilizer Efficiency</Text>
//           <View style={styles.efficiencyContainer}>
//             <Text style={[styles.efficiencyScore, { color: getEfficiencyColor(analysis.efficiencyScore) }]}>
//               {analysis.efficiencyScore}%
//             </Text>
//             <Text style={styles.efficiencyLabel}>Efficiency Score</Text>
//           </View>
//           <View style={styles.progressBar}>
//             <View
//               style={[
//                 styles.progressFill,
//                 {
//                   width: `${analysis.efficiencyScore}%`,
//                   backgroundColor: getEfficiencyColor(analysis.efficiencyScore),
//                 },
//               ]}
//             />
//           </View>
//         </Card>

//         <Card>
//           <Text style={styles.cardTitle}>Thermal Measurements</Text>
//           <View style={styles.thermalGrid}>
//             <View style={[styles.thermalCard, { backgroundColor: '#dbeafe' }]}>
//               <Text style={styles.thermalLabel}>Before</Text>
//               <Text style={[styles.thermalValue, { color: '#2563eb' }]}>
//                 {thermalData.beforeTemp}°C
//               </Text>
//             </View>
//             <View style={[styles.thermalCard, { backgroundColor: '#f3e8ff' }]}>
//               <Text style={styles.thermalLabel}>After</Text>
//               <Text style={[styles.thermalValue, { color: '#9333ea' }]}>
//                 {thermalData.afterTemp}°C
//               </Text>
//             </View>
//             <View style={[styles.thermalCard, { backgroundColor: '#fed7aa' }]}>
//               <Text style={styles.thermalLabel}>Delta</Text>
//               <Text
//                 style={[
//                   styles.thermalValue,
//                   { color: thermalData.thermalDelta < 0 ? '#16a34a' : '#ef4444' },
//                 ]}
//               >
//                 {thermalData.thermalDelta.toFixed(2)}°C
//               </Text>
//             </View>
//           </View>
//         </Card>

//         <Card>
//           <Text style={styles.cardTitle}>AI Recommendations</Text>
//           {analysis.recommendations.split('\n').filter(r => r.trim()).map((rec, index) => (
//             <View key={index} style={styles.recommendation}>
//               <Text style={styles.recommendationBullet}>✓</Text>
//               <Text style={styles.recommendationText}>{rec}</Text>
//             </View>
//           ))}
//         </Card>

//         <View style={styles.statusGrid}>
//           <Card style={{ flex: 1, marginRight: 8 }}>
//             <Text style={styles.statusTitle}>Stress Level</Text>
//             <View
//               style={[
//                 styles.statusBadge,
//                 {
//                   backgroundColor:
//                     analysis.stressLevel === 'low'
//                       ? '#dcfce7'
//                       : analysis.stressLevel === 'medium'
//                       ? '#fef9c3'
//                       : '#fee2e2',
//                 },
//               ]}
//             >
//               <Text
//                 style={[
//                   styles.statusText,
//                   {
//                     color:
//                       analysis.stressLevel === 'low'
//                         ? '#16a34a'
//                         : analysis.stressLevel === 'medium'
//                         ? '#ca8a04'
//                         : '#ef4444',
//                   },
//                 ]}
//               >
//                 {analysis.stressLevel.toUpperCase()}
//               </Text>
//             </View>
//           </Card>

//           <Card style={{ flex: 1, marginLeft: 8 }}>
//             <Text style={styles.statusTitle}>Nutrient Status</Text>
//             <View
//               style={[
//                 styles.statusBadge,
//                 {
//                   backgroundColor:
//                     analysis.deficiencies[0] === 'Balanced' ? '#dcfce7' : '#fee2e2',
//                 },
//               ]}
//             >
//               <Text
//                 style={[
//                   styles.statusText,
//                   {
//                     color: analysis.deficiencies[0] === 'Balanced' ? '#16a34a' : '#ef4444',
//                   },
//                 ]}
//               >
//                 {analysis.deficiencies[0].replace('_', ' ')}
//               </Text>
//             </View>
//           </Card>
//         </View>

//         <Card>
//           <Text style={styles.cardTitle}>Environmental Conditions</Text>
//           <View style={styles.envRow}>
//             <Text style={styles.envLabel}>Air Temperature:</Text>
//             <Text style={styles.envValue}>{thermalData.environmental.temperature}°C</Text>
//           </View>
//           <View style={styles.envRow}>
//             <Text style={styles.envLabel}>Humidity:</Text>
//             <Text style={styles.envValue}>{thermalData.environmental.humidity}%</Text>
//           </View>
//           <View style={styles.envRow}>
//             <Text style={styles.envLabel}>Rainfall:</Text>
//             <Text style={styles.envValue}>{thermalData.environmental.rainfall} mm</Text>
//           </View>
//         </Card>

//         <Card>
//           <Text style={styles.cardTitle}>Soil NPK Levels</Text>
//           <View style={styles.npkGrid}>
//             <View style={[styles.npkItem, { backgroundColor: '#dcfce7' }]}>
//               <Text style={styles.npkLabel}>N</Text>
//               <Text style={[styles.npkValue, { color: '#16a34a' }]}>
//                 {thermalData.cropId?.soilData.N}
//               </Text>
//             </View>
//             <View style={[styles.npkItem, { backgroundColor: '#dbeafe' }]}>
//               <Text style={styles.npkLabel}>P</Text>
//               <Text style={[styles.npkValue, { color: '#2563eb' }]}>
//                 {thermalData.cropId?.soilData.P}
//               </Text>
//             </View>
//             <View style={[styles.npkItem, { backgroundColor: '#f3e8ff' }]}>
//               <Text style={styles.npkLabel}>K</Text>
//               <Text style={[styles.npkValue, { color: '#9333ea' }]}>
//                 {thermalData.cropId?.soilData.K}
//               </Text>
//             </View>
//           </View>
//         </Card>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f3f4f6',
//   },
//   centerContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   content: {
//     padding: 20,
//     paddingBottom: 40,
//   },
//   cardTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#1f2937',
//     marginBottom: 12,
//   },
//   subtitle: {
//     fontSize: 14,
//     color: '#6b7280',
//   },
//   efficiencyContainer: {
//     alignItems: 'center',
//     marginVertical: 20,
//   },
//   efficiencyScore: {
//     fontSize: 60,
//     fontWeight: 'bold',
//   },
//   efficiencyLabel: {
//     fontSize: 14,
//     color: '#6b7280',
//     marginTop: 8,
//   },
//   progressBar: {
//     height: 12,
//     backgroundColor: '#e5e7eb',
//     borderRadius: 6,
//     overflow: 'hidden',
//   },
//   progressFill: {
//     height: '100%',
//     borderRadius: 6,
//   },
//   thermalGrid: {
//     flexDirection: 'row',
//     gap: 8,
//   },
//   thermalCard: {
//     flex: 1,
//     padding: 16,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   thermalLabel: {
//     fontSize: 12,
//     color: '#6b7280',
//     marginBottom: 4,
//   },
//   thermalValue: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   recommendation: {
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//     marginBottom: 12,
//     padding: 12,
//     backgroundColor: '#f0fdf4',
//     borderRadius: 8,
//   },
//   recommendationBullet: {
//     color: '#16a34a',
//     fontSize: 16,
//     marginRight: 8,
//   },
//   recommendationText: {
//     flex: 1,
//     fontSize: 14,
//     color: '#1f2937',
//   },
//   statusGrid: {
//     flexDirection: 'row',
//     marginVertical: 8,
//   },
//   statusTitle: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#1f2937',
//     marginBottom: 12,
//   },
//   statusBadge: {
//     padding: 16,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   statusText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   envRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 12,
//   },
//   envLabel: {
//     fontSize: 14,
//     color: '#6b7280',
//   },
//   envValue: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#1f2937',
//   },
//   npkGrid: {
//     flexDirection: 'row',
//     gap: 8,
//   },
//   npkItem: {
//     flex: 1,
//     padding: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   npkLabel: {
//     fontSize: 12,
//     color: '#6b7280',
//   },
//   npkValue: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginTop: 4,
//   },
//   emptyText: {
//     fontSize: 16,
//     color: '#6b7280',
//   },
// });

// export default AnalysisScreen;

// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   RefreshControl,
//   Alert,
// } from 'react-native';
// import Share from 'react-native-share'; // npm install react-native-share
// import RNHTMLtoPDF from 'react-native-html-to-pdf'; // npm install react-native-html-to-pdf
// import { thermalAPI } from '../config/api';
// import Card from '../components/Card';
// import Button from '../components/Button';

// const AnalysisScreen = ({ route }) => {
//   const { thermalId } = route.params;
//   const [thermalData, setThermalData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);

//   useEffect(() => {
//     fetchAnalysis();
//   }, []);

//   const fetchAnalysis = async () => {
//     try {
//       const response = await thermalAPI.getOne(thermalId);
//       setThermalData(response.data.data.thermalData);
//       setLoading(false);
//     } catch (error) {
//       Alert.alert('Error', 'Failed to load analysis results');
//       setLoading(false);
//     }
//   };

//   const handleShare = async () => {
//     const options = {
//       title: 'Crop Analysis Report',
//       message: `Report for ${thermalData.cropId?.cropName}\nEfficiency: ${thermalData.analysis.efficiencyScore}%\nRecommendations: ${thermalData.analysis.recommendations}`,
//     };
//     try {
//       await Share.open(options);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const generatePDF = async () => {
//     const html = `
//       <div style="padding: 20px; font-family: Arial;">
//         <h1 style="color: #16a34a;">Analysis Report</h1>
//         <p><b>Crop:</b> ${thermalData.cropId?.cropName}</p>
//         <p><b>Date:</b> ${new Date(thermalData.measurementDate).toLocaleDateString()}</p>
//         <hr/>
//         <h2>Efficiency Score: ${thermalData.analysis.efficiencyScore}%</h2>
//         <h3>AI Recommendations:</h3>
//         <p>${thermalData.analysis.recommendations}</p>
//       </div>
//     `;
//     try {
//       const file = await RNHTMLtoPDF.convert({
//         html: html,
//         fileName: `Analysis_${thermalData.cropId?.cropName}_${Date.now()}`,
//         base64: true,
//       });
//       Alert.alert('Success', `PDF saved to: ${file.filePath}`);
//     } catch (err) {
//       Alert.alert('Error', 'Failed to generate PDF');
//     }
//   };

//   if (loading) return <View style={styles.centerContainer}><Text>Loading analysis...</Text></View>;
//   if (!thermalData || !thermalData.processed) return <View style={styles.centerContainer}><Text>No analysis available</Text></View>;

//   const { analysis } = thermalData;
//   const getEfficiencyColor = (score) => score >= 75 ? '#16a34a' : score >= 50 ? '#ca8a04' : '#ef4444';

//   return (
//     <ScrollView 
//       style={styles.container} 
//       refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchAnalysis} />}
//     >
//       <View style={styles.content}>
//         <Card>
//           <Text style={styles.cardTitle}>Analysis Results</Text>
//           <Text style={styles.subtitle}>{thermalData.cropId?.cropName} • {new Date(thermalData.measurementDate).toLocaleDateString()}</Text>
//         </Card>

//         <Card>
//           <Text style={styles.cardTitle}>Efficiency Score</Text>
//           <View style={styles.efficiencyContainer}>
//             <Text style={[styles.efficiencyScore, { color: getEfficiencyColor(analysis.efficiencyScore) }]}>{analysis.efficiencyScore}%</Text>
//           </View>
//         </Card>

//         <Card>
//           <Text style={styles.cardTitle}>AI Recommendations</Text>
//           {analysis.recommendations.split('\n').filter(r => r.trim()).map((rec, index) => (
//             <View key={index} style={styles.recommendation}>
//               <Text style={styles.recommendationBullet}>✓</Text>
//               <Text style={styles.recommendationText}>{rec}</Text>
//             </View>
//           ))}
//         </Card>

//         {/* Action Buttons */}
//         <View style={styles.actionRow}>
//           <Button title="Share" onPress={handleShare} variant="secondary" style={styles.flex1} />
//           <View style={{ width: 10 }} />
//           <Button title="Download PDF" onPress={generatePDF} style={styles.flex1} />
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#f3f4f6' },
//   centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
//   content: { padding: 20, paddingBottom: 40 },
//   cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#1f2937', marginBottom: 12 },
//   subtitle: { fontSize: 14, color: '#6b7280' },
//   efficiencyContainer: { alignItems: 'center', marginVertical: 20 },
//   efficiencyScore: { fontSize: 60, fontWeight: 'bold' },
//   recommendation: { flexDirection: 'row', marginBottom: 12, padding: 12, backgroundColor: '#f0fdf4', borderRadius: 8 },
//   recommendationBullet: { color: '#16a34a', fontSize: 16, marginRight: 8 },
//   recommendationText: { flex: 1, fontSize: 14, color: '#1f2937' },
//   actionRow: { flexDirection: 'row', marginTop: 20 },
//   flex1: { flex: 1 }
// });

// export default AnalysisScreen;

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Alert,
  Share, // Native RN Share for text messages
} from 'react-native';
import * as Print from 'expo-print'; // Expo PDF library
import * as Sharing from 'expo-sharing'; // Expo Sharing library
import { thermalAPI } from '../config/api';
import Card from '../components/Card';
import Button from '../components/Button';

const AnalysisScreen = ({ route }) => {
  const { thermalId } = route.params;
  const [thermalData, setThermalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchAnalysis();
  }, []);

  const fetchAnalysis = async () => {
    try {
      const response = await thermalAPI.getOne(thermalId);
      setThermalData(response.data.data.thermalData);
      setLoading(false);
    } catch (error) {
      console.error('Fetch error:', error);
      Alert.alert('Error', 'Failed to load analysis results');
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchAnalysis();
    setRefreshing(false);
  };

  // Logic to share a text message summary
  const handleShare = async () => {
    const message = `🌱 Farm Analysis Report for ${thermalData.cropId?.cropName}\n` +
                    `Efficiency Score: ${thermalData.analysis.efficiencyScore}%\n` +
                    `AI Recommendation: ${thermalData.analysis.recommendations.split('\n')[0]}`;
    
    try {
      await Share.share({
        message: message,
      });
    } catch (err) {
      console.log('Sharing error:', err);
    }
  };

  // Logic to generate PDF and open the file share/download menu
  const generatePDF = async () => {
    const htmlContent = `
      <html>
        <head>
          <style>
            body { font-family: 'Helvetica', sans-serif; padding: 20px; color: #333; }
            h1 { color: #16a34a; border-bottom: 2px solid #16a34a; padding-bottom: 10px; }
            .score-box { background: #f0fdf4; padding: 15px; border-radius: 8px; margin: 20px 0; }
            .label { font-weight: bold; color: #666; }
          </style>
        </head>
        <body>
          <h1>Crop Analysis Report</h1>
          <p><span class="label">Crop:</span> ${thermalData.cropId?.cropName || 'N/A'}</p>
          <p><span class="label">Date:</span> ${new Date(thermalData.measurementDate).toLocaleDateString()}</p>
          
          <div class="score-box">
            <h2>Efficiency Score: ${thermalData.analysis.efficiencyScore}%</h2>
            <p><span class="label">Status:</span> ${thermalData.analysis.stressLevel.toUpperCase()} Stress</p>
          </div>

          <h3>AI Recommendations:</h3>
          <p>${thermalData.analysis.recommendations.replace(/\n/g, '<br/>')}</p>
          
          <hr/>
          <p style="font-size: 10px; color: #999;">Generated by Smart Farming AI Mobile App</p>
        </body>
      </html>
    `;

    try {
      // 1. Generate the PDF file
      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      
      // 2. Open the sharing menu for the PDF file
      await Sharing.shareAsync(uri, {
        mimeType: 'application/pdf',
        dialogTitle: 'Download or Share Analysis Report',
        UTI: 'com.adobe.pdf'
      });
    } catch (err) {
      console.error('PDF error:', err);
      Alert.alert('Error', 'Failed to generate and download PDF');
    }
  };

  if (loading) return <View style={styles.centerContainer}><Text>Loading analysis...</Text></View>;
  if (!thermalData || !thermalData.processed) return <View style={styles.centerContainer}><Text>No analysis available</Text></View>;

  const { analysis } = thermalData;
  const getEfficiencyColor = (score) => score >= 75 ? '#16a34a' : score >= 50 ? '#ca8a04' : '#ef4444';

  return (
    <ScrollView 
      style={styles.container} 
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View style={styles.content}>
        <Card>
          <Text style={styles.cardTitle}>Analysis Results</Text>
          <Text style={styles.subtitle}>{thermalData.cropId?.cropName} • {new Date(thermalData.measurementDate).toLocaleDateString()}</Text>
        </Card>

        <Card>
          <Text style={styles.cardTitle}>Efficiency Score</Text>
          <View style={styles.efficiencyContainer}>
            <Text style={[styles.efficiencyScore, { color: getEfficiencyColor(analysis.efficiencyScore) }]}>{analysis.efficiencyScore}%</Text>
            <Text style={styles.efficiencyLabel}>AI Generated Score</Text>
          </View>
        </Card>

        <Card>
          <Text style={styles.cardTitle}>AI Recommendations</Text>
          {analysis.recommendations.split('\n').filter(r => r.trim()).map((rec, index) => (
            <View key={index} style={styles.recommendation}>
              <Text style={styles.recommendationBullet}>✓</Text>
              <Text style={styles.recommendationText}>{rec}</Text>
            </View>
          ))}
        </Card>

        {/* Action Buttons */}
        <View style={styles.actionRow}>
          <Button title="Share Info" onPress={handleShare} variant="secondary" style={styles.flex1} />
          <View style={{ width: 10 }} />
          <Button title="Download PDF" onPress={generatePDF} style={styles.flex1} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3f4f6' },
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  content: { padding: 20, paddingBottom: 40 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#1f2937', marginBottom: 12 },
  subtitle: { fontSize: 14, color: '#6b7280' },
  efficiencyContainer: { alignItems: 'center', marginVertical: 20 },
  efficiencyScore: { fontSize: 60, fontWeight: 'bold' },
  efficiencyLabel: { fontSize: 12, color: '#9ca3af', marginTop: 5 },
  recommendation: { flexDirection: 'row', marginBottom: 12, padding: 12, backgroundColor: '#f0fdf4', borderRadius: 8 },
  recommendationBullet: { color: '#16a34a', fontSize: 16, fontWeight: 'bold', marginRight: 8 },
  recommendationText: { flex: 1, fontSize: 14, color: '#1f2937', lineHeight: 20 },
  actionRow: { flexDirection: 'row', marginTop: 20, marginBottom: 20 },
  flex1: { flex: 1 }
});

export default AnalysisScreen;