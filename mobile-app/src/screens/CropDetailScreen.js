// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   RefreshControl,
//   Alert,
// } from 'react-native';
// import { cropsAPI, thermalAPI, analysisAPI } from '../config/api';
// import Card from '../components/Card';
// import Button from '../components/Button';

// const CropDetailScreen = ({ route, navigation }) => {
//   const { cropId } = route.params;
//   const [crop, setCrop] = useState(null);
//   const [thermalData, setThermalData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [analyzing, setAnalyzing] = useState(null);

//   useEffect(() => {
//     fetchCropDetails();
//   }, []);

//   const fetchCropDetails = async () => {
//     try {
//       const [cropRes, thermalRes] = await Promise.all([
//         cropsAPI.getOne(cropId),
//         thermalAPI.getAll({ cropId }),
//       ]);

//       setCrop(cropRes.data.data.crop);
//       setThermalData(thermalRes.data.data.thermalData);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching crop details:', error);
//       Alert.alert('Error', 'Failed to load crop details');
//       setLoading(false);
//     }
//   };

//   const onRefresh = async () => {
//     setRefreshing(true);
//     await fetchCropDetails();
//     setRefreshing(false);
//   };

//   const handleAnalyze = async (thermalId) => {
//     Alert.alert(
//       'Analyze',
//       'This will take 20-30 seconds. Continue?',
//       [
//         { text: 'Cancel', style: 'cancel' },
//         {
//           text: 'Analyze',
//           onPress: async () => {
//             setAnalyzing(thermalId);
//             try {
//               await analysisAPI.analyze(thermalId);
//               Alert.alert('Success', 'Analysis completed!');
//               fetchCropDetails();
//             } catch (error) {
//               Alert.alert('Error', error.response?.data?.message || 'Analysis failed');
//             }
//             setAnalyzing(null);
//           },
//         },
//       ]
//     );
//   };

//   if (loading) {
//     return (
//       <View style={styles.centerContainer}>
//         <Text>Loading...</Text>
//       </View>
//     );
//   }

//   if (!crop) {
//     return (
//       <View style={styles.centerContainer}>
//         <Text>Crop not found</Text>
//       </View>
//     );
//   }

//   return (
//     <ScrollView
//       style={styles.container}
//       refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
//     >
//       <View style={styles.header}>
//         <Text style={styles.cropName}>{crop.cropName}</Text>
//         <Text style={styles.cropType}>{crop.cropType}</Text>
//         <View style={styles.headerStats}>
//           <View style={styles.statItem}>
//             <Text style={styles.statLabel}>Field Size</Text>
//             <Text style={styles.statValue}>{crop.fieldSize} acres</Text>
//           </View>
//           <View style={styles.statItem}>
//             <Text style={styles.statLabel}>Status</Text>
//             <Text style={[styles.statValue, { color: '#16a34a' }]}>{crop.status}</Text>
//           </View>
//         </View>
//       </View>

//       <View style={styles.content}>
//         <Card>
//           <Text style={styles.cardTitle}>Soil NPK Data</Text>
//           <View style={styles.npkGrid}>
//             <View style={[styles.npkCard, { backgroundColor: '#dcfce7' }]}>
//               <Text style={styles.npkLabel}>Nitrogen</Text>
//               <Text style={[styles.npkValue, { color: '#16a34a' }]}>{crop.soilData.N}</Text>
//             </View>
//             <View style={[styles.npkCard, { backgroundColor: '#dbeafe' }]}>
//               <Text style={styles.npkLabel}>Phosphorus</Text>
//               <Text style={[styles.npkValue, { color: '#2563eb' }]}>{crop.soilData.P}</Text>
//             </View>
//             <View style={[styles.npkCard, { backgroundColor: '#f3e8ff' }]}>
//               <Text style={styles.npkLabel}>Potassium</Text>
//               <Text style={[styles.npkValue, { color: '#9333ea' }]}>{crop.soilData.K}</Text>
//             </View>
//             <View style={[styles.npkCard, { backgroundColor: '#fef9c3' }]}>
//               <Text style={styles.npkLabel}>pH</Text>
//               <Text style={[styles.npkValue, { color: '#ca8a04' }]}>{crop.soilData.pH}</Text>
//             </View>
//           </View>
//         </Card>

//         <View style={styles.sectionHeader}>
//           <Text style={styles.sectionTitle}>Thermal Measurements ({thermalData.length})</Text>
//           <Button
//             title="+ Add"
//             onPress={() =>
//               navigation.navigate('AddThermal', { cropId: crop._id, cropName: crop.cropName })
//             }
//             style={styles.addButton}
//           />
//         </View>

//         {thermalData.length === 0 ? (
//           <Card>
//             <View style={styles.emptyState}>
//               <Text style={styles.emptyEmoji}>🌡️</Text>
//               <Text style={styles.emptyText}>No thermal measurements yet</Text>
//             </View>
//           </Card>
//         ) : (
//           thermalData.map((thermal) => (
//             <Card key={thermal._id}>
//               <View style={styles.thermalCard}>
//                 <View style={{ flex: 1 }}>
//                   <Text style={styles.thermalDate}>
//                     {new Date(thermal.measurementDate).toLocaleDateString()}
//                   </Text>
//                   <View style={styles.thermalStats}>
//                     <Text style={styles.thermalStat}>
//                       Before: {thermal.beforeTemp}°C
//                     </Text>
//                     <Text style={styles.thermalStat}>
//                       After: {thermal.afterTemp}°C
//                     </Text>
//                     <Text
//                       style={[
//                         styles.thermalStat,
//                         { color: thermal.thermalDelta < 0 ? '#16a34a' : '#ef4444' },
//                       ]}
//                     >
//                       Δ {thermal.thermalDelta.toFixed(2)}°C
//                     </Text>
//                   </View>
//                   {thermal.processed && thermal.analysis && (
//                     <View style={styles.analysisPreview}>
//                       <Text style={styles.analysisText}>
//                         Efficiency: {thermal.analysis.efficiencyScore}%
//                       </Text>
//                       <Text style={styles.analysisText}>
//                         {thermal.analysis.deficiencies[0]}
//                       </Text>
//                     </View>
//                   )}
//                 </View>
//                 <View>
//                   {!thermal.processed ? (
//                     <Button
//                       title={analyzing === thermal._id ? 'Analyzing...' : 'Analyze'}
//                       onPress={() => handleAnalyze(thermal._id)}
//                       loading={analyzing === thermal._id}
//                       style={styles.analyzeButton}
//                     />
//                   ) : (
//                     <TouchableOpacity
//                       style={styles.viewButton}
//                       onPress={() =>
//                         navigation.navigate('Analysis', { thermalId: thermal._id })
//                       }
//                     >
//                       <Text style={styles.viewButtonText}>View</Text>
//                     </TouchableOpacity>
//                   )}
//                 </View>
//               </View>
//             </Card>
//           ))
//         )}
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
//   header: {
//     backgroundColor: '#16a34a',
//     padding: 20,
//     paddingTop: 20,
//   },
//   cropName: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   cropType: {
//     fontSize: 16,
//     color: '#dcfce7',
//     marginTop: 4,
//     textTransform: 'capitalize',
//   },
//   headerStats: {
//     flexDirection: 'row',
//     marginTop: 16,
//     gap: 20,
//   },
//   statItem: {
//     flex: 1,
//   },
//   statLabel: {
//     fontSize: 12,
//     color: '#dcfce7',
//   },
//   statValue: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#fff',
//     marginTop: 4,
//   },
//   content: {
//     padding: 20,
//   },
//   cardTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#1f2937',
//     marginBottom: 16,
//   },
//   npkGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     gap: 8,
//   },
//   npkCard: {
//     width: '48%',
//     padding: 16,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   npkLabel: {
//     fontSize: 12,
//     color: '#6b7280',
//   },
//   npkValue: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginTop: 4,
//   },
//   sectionHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginTop: 20,
//     marginBottom: 12,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#1f2937',
//   },
//   addButton: {
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//   },
//   thermalCard: {
//     flexDirection: 'row',
//     gap: 12,
//   },
//   thermalDate: {
//     fontSize: 14,
//     color: '#6b7280',
//     marginBottom: 8,
//   },
//   thermalStats: {
//     flexDirection: 'row',
//     gap: 12,
//     marginBottom: 8,
//   },
//   thermalStat: {
//     fontSize: 12,
//     color: '#1f2937',
//   },
//   analysisPreview: {
//     backgroundColor: '#eff6ff',
//     padding: 8,
//     borderRadius: 6,
//     marginTop: 8,
//   },
//   analysisText: {
//     fontSize: 12,
//     color: '#1e40af',
//   },
//   analyzeButton: {
//     paddingHorizontal: 12,
//     paddingVertical: 8,
//   },
//   viewButton: {
//     backgroundColor: '#16a34a',
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 8,
//   },
//   viewButtonText: {
//     color: '#fff',
//     fontWeight: '600',
//   },
//   emptyState: {
//     alignItems: 'center',
//     paddingVertical: 40,
//   },
//   emptyEmoji: {
//     fontSize: 48,
//     marginBottom: 8,
//   },
//   emptyText: {
//     fontSize: 14,
//     color: '#6b7280',
//   },
// });

// export default CropDetailScreen;

// import React, { useState, useEffect, useCallback } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   RefreshControl,
//   Alert,
//   ActivityIndicator
// } from 'react-native';
// import { cropsAPI, thermalAPI, analysisAPI } from '../config/api';
// import Card from '../components/Card';
// import Button from '../components/Button';

// const CropDetailScreen = ({ route, navigation }) => {
//   // SAFE EXTRACTION: Use ?. to prevent crash if params is undefined
//   const cropId = route.params?.cropId; 
  
//   const [crop, setCrop] = useState(null);
//   const [thermalData, setThermalData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [analyzing, setAnalyzing] = useState(null);

//   const fetchCropDetails = useCallback(async () => {
//     if (!cropId) return;
    
//     setLoading(true);
//     try {
//       // Step 1: Just get the crop first
//       const cropRes = await cropsAPI.getOne(cropId);
//       setCrop(cropRes.data.data.crop || cropRes.data.data);

//       // Step 2: Try to get thermal data, but don't crash if it's empty
//       try {
//         const thermalRes = await api.get(`/thermal/crop/${cropId}`); 
//         setThermalData(thermalRes.data.data || []);
//       } catch (err) {
//         console.log("No thermal data yet or route different, setting to empty.");
//         setThermalData([]);
//       }

//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching crop details:', error);
//       // If we get a 404 here, it means cropsAPI.getOne(cropId) path is wrong
//       Alert.alert('Error', 'Crop not found on server (404)');
//       setLoading(false);
//     }
//   }, [cropId]);

// //   const fetchCropDetails = useCallback(async () => {
// //     if (!cropId) return; // Don't fetch if no ID
    
// //     try {
// //       const [cropRes, thermalRes] = await Promise.all([
// //         cropsAPI.getOne(cropId),
// //         thermalAPI.getOne ? thermalAPI.getOne(cropId) : thermalAPI.getAll({ params: { cropId } }),
// //       ]);

// //       // Handle different response structures from backend
// //       setCrop(cropRes.data.data.crop || cropRes.data.data);
// //       setThermalData(thermalRes.data.data.thermalData || thermalRes.data.data || []);
// //       setLoading(false);
// //     } catch (error) {
// //       console.error('Error fetching crop details:', error);
// //       Alert.alert('Error', 'Failed to load crop details');
// //       setLoading(false);
// //     }
// //   }, [cropId]);

//   useEffect(() => {
//     if (cropId) {
//       fetchCropDetails();
//     } else {
//       setLoading(false);
//     }
//   }, [cropId, fetchCropDetails]);

//   const onRefresh = async () => {
//     setRefreshing(true);
//     await fetchCropDetails();
//     setRefreshing(false);
//   };

//   const handleAnalyze = async (thermalId) => {
//     Alert.alert(
//       'Analyze',
//       'AI Analysis takes 20-30 seconds. Continue?',
//       [
//         { text: 'Cancel', style: 'cancel' },
//         {
//           text: 'Analyze',
//           onPress: async () => {
//             setAnalyzing(thermalId);
//             try {
//               await analysisAPI.analyze(thermalId);
//               Alert.alert('Success', 'Analysis completed!');
//               fetchCropDetails();
//             } catch (error) {
//               Alert.alert('Error', error.response?.data?.message || 'Analysis failed');
//             }
//             setAnalyzing(null);
//           },
//         },
//       ]
//     );
//   };

//   // FALLBACK: If cropId is missing, don't crash, show error
//   if (!cropId) {
//     return (
//       <View style={styles.centerContainer}>
//         <Text style={{color: 'red'}}>Error: No Crop Selected</Text>
//         <Button title="Go Back" onPress={() => navigation.goBack()} />
//       </View>
//     );
//   }

//   if (loading) {
//     return (
//       <View style={styles.centerContainer}>
//         <ActivityIndicator size="large" color="#16a34a" />
//         <Text style={{marginTop: 10}}>Loading Crop Details...</Text>
//       </View>
//     );
//   }

//   if (!crop) {
//     return (
//       <View style={styles.centerContainer}>
//         <Text>Crop not found</Text>
//         <Button title="Back to Dashboard" onPress={() => navigation.navigate('Dashboard')} />
//       </View>
//     );
//   }

//   return (
//     <ScrollView
//       style={styles.container}
//       refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
//     >
//       <View style={styles.header}>
//         <Text style={styles.cropName}>{crop.cropName}</Text>
//         <Text style={styles.cropType}>{crop.cropType}</Text>
//         <View style={styles.headerStats}>
//           <View style={styles.statItem}>
//             <Text style={styles.statLabel}>Field Size</Text>
//             <Text style={styles.statValue}>{crop.fieldSize} acres</Text>
//           </View>
//           <View style={styles.statItem}>
//             <Text style={styles.statLabel}>Status</Text>
//             <Text style={[styles.statValue, { color: '#dcfce7' }]}>{crop.status || 'Active'}</Text>
//           </View>
//         </View>
//       </View>

//       <View style={styles.content}>
//         <Card>
//           <Text style={styles.cardTitle}>Soil NPK Data</Text>
//           <View style={styles.npkGrid}>
//             <View style={[styles.npkCard, { backgroundColor: '#dcfce7' }]}>
//               <Text style={styles.npkLabel}>Nitrogen</Text>
//               <Text style={[styles.npkValue, { color: '#16a34a' }]}>{crop.soilData?.N || 0}</Text>
//             </View>
//             <View style={[styles.npkCard, { backgroundColor: '#dbeafe' }]}>
//               <Text style={styles.npkLabel}>Phosphorus</Text>
//               <Text style={[styles.npkValue, { color: '#2563eb' }]}>{crop.soilData?.P || 0}</Text>
//             </View>
//             <View style={[styles.npkCard, { backgroundColor: '#f3e8ff' }]}>
//               <Text style={styles.npkLabel}>Potassium</Text>
//               <Text style={[styles.npkValue, { color: '#9333ea' }]}>{crop.soilData?.K || 0}</Text>
//             </View>
//             <View style={[styles.npkCard, { backgroundColor: '#fef9c3' }]}>
//               <Text style={styles.npkLabel}>pH</Text>
//               <Text style={[styles.npkValue, { color: '#ca8a04' }]}>{crop.soilData?.pH || 7.0}</Text>
//             </View>
//           </View>
//         </Card>

//         <View style={styles.sectionHeader}>
//           <Text style={styles.sectionTitle}>Thermal Measurements ({thermalData.length})</Text>
//           <Button
//             title="+ Add"
//             onPress={() =>
//               navigation.navigate('AddThermal', { cropId: crop._id, cropName: crop.cropName })
//             }
//             style={styles.addButton}
//           />
//         </View>

//         {thermalData.length === 0 ? (
//           <Card>
//             <View style={styles.emptyState}>
//               <Text style={styles.emptyEmoji}>🌡️</Text>
//               <Text style={styles.emptyText}>No thermal measurements yet</Text>
//             </View>
//           </Card>
//         ) : (
//           thermalData.map((thermal) => (
//             <Card key={thermal._id}>
//               <View style={styles.thermalCard}>
//                 <View style={{ flex: 1 }}>
//                   <Text style={styles.thermalDate}>
//                     {new Date(thermal.measurementDate).toLocaleDateString()}
//                   </Text>
//                   <View style={styles.thermalStats}>
//                     <Text style={styles.thermalStat}>Before: {thermal.beforeTemp}°C</Text>
//                     <Text style={styles.thermalStat}>After: {thermal.afterTemp}°C</Text>
//                   </View>
//                   {thermal.processed && thermal.analysis && (
//                     <View style={styles.analysisPreview}>
//                       <Text style={styles.analysisText}>
//                         Efficiency Score: {thermal.analysis.efficiencyScore}%
//                       </Text>
//                     </View>
//                   )}
//                 </View>
//                 <View>
//                   {!thermal.processed ? (
//                     <Button
//                       title={analyzing === thermal._id ? '...' : 'Analyze'}
//                       onPress={() => handleAnalyze(thermal._id)}
//                       loading={analyzing === thermal._id}
//                       style={styles.analyzeButton}
//                     />
//                   ) : (
//                     <TouchableOpacity
//                       style={styles.viewButton}
//                       onPress={() => navigation.navigate('Analysis', { thermalId: thermal._id })}
//                     >
//                       <Text style={styles.viewButtonText}>View</Text>
//                     </TouchableOpacity>
//                   )}
//                 </View>
//               </View>
//             </Card>
//           ))
//         )}
//       </View>
//     </ScrollView>
//   );
// };

// // ... Styles remain the same as your current file ...
// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#f3f4f6' },
//   centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
//   header: { backgroundColor: '#16a34a', padding: 20, paddingTop: 40 },
//   cropName: { fontSize: 28, fontWeight: 'bold', color: '#fff' },
//   cropType: { fontSize: 16, color: '#dcfce7', marginTop: 4, textTransform: 'capitalize' },
//   headerStats: { flexDirection: 'row', marginTop: 16, gap: 20 },
//   statItem: { flex: 1 },
//   statLabel: { fontSize: 12, color: '#dcfce7' },
//   statValue: { fontSize: 18, fontWeight: 'bold', color: '#fff', marginTop: 4 },
//   content: { padding: 20 },
//   cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#1f2937', marginBottom: 16 },
//   npkGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
//   npkCard: { width: '48%', padding: 16, borderRadius: 8, alignItems: 'center' },
//   npkLabel: { fontSize: 12, color: '#6b7280' },
//   npkValue: { fontSize: 24, fontWeight: 'bold', marginTop: 4 },
//   sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, marginBottom: 12 },
//   sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1f2937' },
//   addButton: { paddingHorizontal: 16, paddingVertical: 8 },
//   thermalCard: { flexDirection: 'row', gap: 12 },
//   thermalDate: { fontSize: 14, color: '#6b7280', marginBottom: 8 },
//   thermalStats: { flexDirection: 'row', gap: 12, marginBottom: 8 },
//   thermalStat: { fontSize: 12, color: '#1f2937' },
//   analysisPreview: { backgroundColor: '#eff6ff', padding: 8, borderRadius: 6, marginTop: 8 },
//   analysisText: { fontSize: 12, color: '#1e40af', fontWeight: 'bold' },
//   analyzeButton: { paddingHorizontal: 12, paddingVertical: 8 },
//   viewButton: { backgroundColor: '#16a34a', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8 },
//   viewButtonText: { color: '#fff', fontWeight: '600' },
//   emptyState: { alignItems: 'center', paddingVertical: 40 },
//   emptyEmoji: { fontSize: 48, marginBottom: 8 },
//   emptyText: { fontSize: 14, color: '#6b7280' },
// });

// export default CropDetailScreen;

// import React, { useState, useEffect, useCallback } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   RefreshControl,
//   Alert,
//   ActivityIndicator
// } from 'react-native';
// // Note: We don't need to import 'api' anymore because we use thermalAPI
// import { cropsAPI, thermalAPI, analysisAPI } from '../config/api';
// import Card from '../components/Card';
// import Button from '../components/Button';

// const CropDetailScreen = ({ route, navigation }) => {
//   const cropId = route.params?.cropId; 
  
//   const [crop, setCrop] = useState(null);
//   const [thermalData, setThermalData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [analyzing, setAnalyzing] = useState(null);

//   const fetchCropDetails = useCallback(async () => {
//     if (!cropId) return;
    
//     setLoading(true);
//     try {
//       // 1. Get Crop Details
//       const cropRes = await cropsAPI.getOne(cropId);
//       const cropInfo = cropRes.data.data?.crop || cropRes.data.data;
//       setCrop(cropInfo);

//       // 2. Get Thermal Data (Primary Attempt)
//       let extractedData = [];
//       try {
//         console.log(`Primary Attempt: Fetching thermal for crop ${cropId}`);
//         const thermalRes = await thermalAPI.getByCrop(cropId);
        
//         // Extract from various possible backend structures
//         extractedData = 
//           thermalRes.data.data?.thermalData || 
//           thermalRes.data.data || 
//           thermalRes.data || 
//           [];
//       } catch (primaryErr) {
//         console.log("Primary route failed or 404, moving to fallback...");
//       }

//       // 3. Fallback Attempt (If primary failed or returned empty)
//       if (!Array.isArray(extractedData) || extractedData.length === 0) {
//         console.log("Running Fallback: Searching all thermal records...");
//         try {
//           const fallbackRes = await thermalAPI.getAll();
//           const allData = fallbackRes.data.data?.thermalData || fallbackRes.data.data || [];
          
//           // CRITICAL: Use String() conversion to ensure IDs match regardless of type
//           extractedData = allData.filter(item => {
//             const itemCropId = item.cropId || item.crop;
//             return String(itemCropId) === String(cropId);
//           });
          
//           console.log(`Fallback found ${extractedData.length} records.`);
//         } catch (fallbackErr) {
//           console.error("Fallback search also failed:", fallbackErr.message);
//         }
//       }

//       setThermalData(extractedData);

//     } catch (error) {
//       console.error('Main fetch error:', error);
//       Alert.alert('Error', 'Could not load crop details.');
//     } finally {
//       setLoading(false);
//     }
//   }, [cropId]);

// //   const fetchCropDetails = useCallback(async () => {
// //     if (!cropId) return;
    
// //     setLoading(true);
// //     try {
// //       // Step 1: Get Crop Details
// //       const cropRes = await cropsAPI.getOne(cropId);
// //       // We handle both possible structures: {data: {crop: ...}} or {data: {...}}
// //       const cropInfo = cropRes.data.data?.crop || cropRes.data.data;
// //       setCrop(cropInfo);

// //       // Step 2: Get Thermal Data with Fallback Logic
// //       try {
// //         console.log(`Fetching thermal data for crop: ${cropId}`);
        
// //         // Try the primary route first
// //         let thermalRes = await thermalAPI.getByCrop(cropId);
        
// //         // Extract data safely
// //         // Your backend might return data directly or inside a 'thermalData' array
// //         let extractedData = 
// //           thermalRes.data.data?.thermalData || 
// //           thermalRes.data.data || 
// //           thermalRes.data || 
// //           [];

// //         // FALLBACK: If the list is empty or the route failed, 
// //         // try fetching all and filtering manually
// //         if (!Array.isArray(extractedData) || extractedData.length === 0) {
// //           console.log("Primary route empty, trying fallback search...");
// //           const fallbackRes = await thermalAPI.getAll(); 
// //           const allData = fallbackRes.data.data?.thermalData || fallbackRes.data.data || [];
// //           // Filter only the data belonging to this crop
// //           extractedData = allData.filter(item => (item.cropId === cropId || item.crop === cropId));
// //         }

// //         setThermalData(Array.isArray(extractedData) ? extractedData : []);
        
// //       } catch (err) {
// //         console.log("Thermal route error, setting to empty. Details:", err.message);
// //         setThermalData([]);
// //       }

// //     } catch (error) {
// //       console.error('Error fetching crop details:', error);
// //       Alert.alert('Error', 'Could not load crop details. Please refresh.');
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, [cropId]);

// //   const fetchCropDetails = useCallback(async () => {
// //     if (!cropId) return;
    
// //     setLoading(true);
// //     try {
// //       // Step 1: Get Crop Details
// //       const cropRes = await cropsAPI.getOne(cropId);
// //       setCrop(cropRes.data.data.crop || cropRes.data.data);

// //       // Step 2: Get Thermal Data using the helper from api.js
// //       try {
// //         const thermalRes = await thermalAPI.getByCrop(cropId);
// //         setThermalData(thermalRes.data.data || []);
// //       } catch (err) {
// //         console.log("No thermal data found for this crop yet.");
// //         setThermalData([]);
// //       }

// //       setLoading(false);
// //     } catch (error) {
// //       console.error('Error fetching crop details:', error);
// //       Alert.alert('Error', 'Crop not found or server error (404)');
// //       setLoading(false);
// //     }
// //   }, [cropId]);

//   useEffect(() => {
//     if (cropId) {
//       fetchCropDetails();
//     } else {
//       setLoading(false);
//     }
//   }, [cropId, fetchCropDetails]);

//   const onRefresh = async () => {
//     setRefreshing(true);
//     await fetchCropDetails();
//     setRefreshing(false);
//   };

//   const handleAnalyze = async (thermalId) => {
//     Alert.alert(
//       'Analyze',
//       'AI Analysis takes 20-30 seconds. Continue?',
//       [
//         { text: 'Cancel', style: 'cancel' },
//         {
//           text: 'Analyze',
//           onPress: async () => {
//             setAnalyzing(thermalId);
//             try {
//               await analysisAPI.analyze(thermalId);
//               Alert.alert('Success', 'Analysis completed!');
//               fetchCropDetails();
//             } catch (error) {
//               Alert.alert('Error', error.response?.data?.message || 'Analysis failed');
//             }
//             setAnalyzing(null);
//           },
//         },
//       ]
//     );
//   };

//   if (!cropId) {
//     return (
//       <View style={styles.centerContainer}>
//         <Text style={{color: 'red'}}>Error: No Crop Selected</Text>
//         <Button title="Go Back" onPress={() => navigation.goBack()} />
//       </View>
//     );
//   }

//   if (loading) {
//     return (
//       <View style={styles.centerContainer}>
//         <ActivityIndicator size="large" color="#16a34a" />
//         <Text style={{marginTop: 10}}>Loading Crop Details...</Text>
//       </View>
//     );
//   }

//   if (!crop) {
//     return (
//       <View style={styles.centerContainer}>
//         <Text>Crop not found</Text>
//         <Button title="Back to Dashboard" onPress={() => navigation.navigate('Dashboard')} />
//       </View>
//     );
//   }

//   return (
//     <ScrollView
//       style={styles.container}
//       refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
//     >
//       <View style={styles.header}>
//         <Text style={styles.cropName}>{crop.cropName}</Text>
//         <Text style={styles.cropType}>{crop.cropType}</Text>
//         <View style={styles.headerStats}>
//           <View style={styles.statItem}>
//             <Text style={styles.statLabel}>Field Size</Text>
//             <Text style={styles.statValue}>{crop.fieldSize} acres</Text>
//           </View>
//           <View style={styles.statItem}>
//             <Text style={styles.statLabel}>Status</Text>
//             <Text style={[styles.statValue, { color: '#dcfce7' }]}>{crop.status || 'Active'}</Text>
//           </View>
//         </View>
//       </View>

//       <View style={styles.content}>
//         <Card>
//           <Text style={styles.cardTitle}>Soil NPK Data</Text>
//           <View style={styles.npkGrid}>
//             <View style={[styles.npkCard, { backgroundColor: '#dcfce7' }]}>
//               <Text style={styles.npkLabel}>N</Text>
//               <Text style={[styles.npkValue, { color: '#16a34a' }]}>{crop.soilData?.N || 0}</Text>
//             </View>
//             <View style={[styles.npkCard, { backgroundColor: '#dbeafe' }]}>
//               <Text style={styles.npkLabel}>P</Text>
//               <Text style={[styles.npkValue, { color: '#2563eb' }]}>{crop.soilData?.P || 0}</Text>
//             </View>
//             <View style={[styles.npkCard, { backgroundColor: '#f3e8ff' }]}>
//               <Text style={styles.npkLabel}>K</Text>
//               <Text style={[styles.npkValue, { color: '#9333ea' }]}>{crop.soilData?.K || 0}</Text>
//             </View>
//             <View style={[styles.npkCard, { backgroundColor: '#fef9c3' }]}>
//               <Text style={styles.npkLabel}>pH</Text>
//               <Text style={[styles.npkValue, { color: '#ca8a04' }]}>{crop.soilData?.pH || 7.0}</Text>
//             </View>
//           </View>
//         </Card>

//         <View style={styles.sectionHeader}>
//           <Text style={styles.sectionTitle}>Thermal Readings ({thermalData.length})</Text>
//           <Button
//             title="+ Add"
//             onPress={() =>
//               navigation.navigate('AddThermal', { cropId: crop._id, cropName: crop.cropName })
//             }
//             style={styles.addButton}
//           />
//         </View>

//         {thermalData.length === 0 ? (
//           <Card>
//             <View style={styles.emptyState}>
//               <Text style={styles.emptyEmoji}>🌡️</Text>
//               <Text style={styles.emptyText}>No measurements recorded yet</Text>
//             </View>
//           </Card>
//         ) : (
//           thermalData.map((thermal) => (
//             <Card key={thermal._id}>
//               <View style={styles.thermalCard}>
//                 <View style={{ flex: 1 }}>
//                   <Text style={styles.thermalDate}>
//                     {new Date(thermal.measurementDate).toLocaleDateString()}
//                   </Text>
//                   <View style={styles.thermalStats}>
//                     <Text style={styles.thermalStat}>Before: {thermal.beforeTemp}°C</Text>
//                     <Text style={styles.thermalStat}>After: {thermal.afterTemp}°C</Text>
//                   </View>
//                   {thermal.processed && (
//                     <View style={styles.analysisPreview}>
//                       <Text style={styles.analysisText}>
//                         Efficiency: {thermal.analysis?.efficiencyScore || 0}%
//                       </Text>
//                     </View>
//                   )}
//                 </View>
//                 <View>
//                   {!thermal.processed ? (
//                     <Button
//                       title={analyzing === thermal._id ? '...' : 'Analyze'}
//                       onPress={() => handleAnalyze(thermal._id)}
//                       loading={analyzing === thermal._id}
//                       style={styles.analyzeButton}
//                     />
//                   ) : (
//                     <TouchableOpacity
//                       style={styles.viewButton}
//                       onPress={() => navigation.navigate('Analysis', { thermalId: thermal._id })}
//                     >
//                       <Text style={styles.viewButtonText}>View</Text>
//                     </TouchableOpacity>
//                   )}
//                 </View>
//               </View>
//             </Card>
//           ))
//         )}
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#f3f4f6' },
//   centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
//   header: { backgroundColor: '#16a34a', padding: 20, paddingTop: 40 },
//   cropName: { fontSize: 28, fontWeight: 'bold', color: '#fff' },
//   cropType: { fontSize: 16, color: '#dcfce7', marginTop: 4, textTransform: 'capitalize' },
//   headerStats: { flexDirection: 'row', marginTop: 16, gap: 20 },
//   statItem: { flex: 1 },
//   statLabel: { fontSize: 12, color: '#dcfce7' },
//   statValue: { fontSize: 18, fontWeight: 'bold', color: '#fff', marginTop: 4 },
//   content: { padding: 20 },
//   cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#1f2937', marginBottom: 16 },
//   npkGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
//   npkCard: { width: '48%', padding: 16, borderRadius: 8, alignItems: 'center' },
//   npkLabel: { fontSize: 12, color: '#6b7280' },
//   npkValue: { fontSize: 24, fontWeight: 'bold', marginTop: 4 },
//   sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, marginBottom: 12 },
//   sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1f2937' },
//   addButton: { paddingHorizontal: 16, paddingVertical: 8 },
//   thermalCard: { flexDirection: 'row', gap: 12 },
//   thermalDate: { fontSize: 14, color: '#6b7280', marginBottom: 8 },
//   thermalStats: { flexDirection: 'row', gap: 12, marginBottom: 8 },
//   thermalStat: { fontSize: 12, color: '#1f2937' },
//   analysisPreview: { backgroundColor: '#eff6ff', padding: 8, borderRadius: 6, marginTop: 8 },
//   analysisText: { fontSize: 12, color: '#1e40af', fontWeight: 'bold' },
//   analyzeButton: { paddingHorizontal: 12, paddingVertical: 8 },
//   viewButton: { backgroundColor: '#16a34a', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8 },
//   viewButtonText: { color: '#fff', fontWeight: '600' },
//   emptyState: { alignItems: 'center', paddingVertical: 40 },
//   emptyEmoji: { fontSize: 48, marginBottom: 8 },
//   emptyText: { fontSize: 14, color: '#6b7280' },
// });

// export default CropDetailScreen;

import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Alert,
  ActivityIndicator
} from 'react-native';
import { cropsAPI, thermalAPI, analysisAPI } from '../config/api';
import Card from '../components/Card';
import Button from '../components/Button';

const CropDetailScreen = ({ route, navigation }) => {
  const cropId = route.params?.cropId; 
  
  const [crop, setCrop] = useState(null);
  const [thermalData, setThermalData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [analyzing, setAnalyzing] = useState(null);

  const fetchCropDetails = useCallback(async () => {
    if (!cropId) return;
    
    setLoading(true);
    try {
      // 1. Get Crop Details
      const cropRes = await cropsAPI.getOne(cropId);
      const cropInfo = cropRes.data.data?.crop || cropRes.data.data;
      setCrop(cropInfo);

      // 2. Get Thermal Data
      let extractedData = [];
      try {
        const thermalRes = await thermalAPI.getByCrop(cropId);
        extractedData = thermalRes.data.data?.thermalData || thermalRes.data.data || thermalRes.data || [];
      } catch (primaryErr) {
        console.log("Primary route unavailable, using fallback...");
      }

      // 3. Fallback Attempt
      if (!Array.isArray(extractedData) || extractedData.length === 0) {
        const fallbackRes = await thermalAPI.getAll();
        const allData = fallbackRes.data.data?.thermalData || fallbackRes.data.data || [];
        
        extractedData = allData.filter(item => {
          const rawItemCropId = item.cropId?._id || item.cropId || item.crop?._id || item.crop;
          return String(rawItemCropId) === String(cropId);
        });
      }

      setThermalData(extractedData);
    } catch (error) {
      console.error('Fetch error:', error);
      // If it's a network error, it's likely the server waking up
      if (error.message === 'Network Error') {
        Alert.alert(
          'Server Waking Up', 
          'The backend is starting up. Please pull down to refresh in a few seconds.'
        );
      } else {
        Alert.alert('Error', 'Could not load data.');
      }
    } finally {
      setLoading(false);
    }
  }, [cropId]);

//   const fetchCropDetails = useCallback(async () => {
//     if (!cropId) return;
    
//     setLoading(true);
//     try {
//       // 1. Get Crop Details
//       const cropRes = await cropsAPI.getOne(cropId);
//       const cropInfo = cropRes.data.data?.crop || cropRes.data.data;
//       setCrop(cropInfo);

//       // 2. Get Thermal Data (Primary Attempt)
//       let extractedData = [];
//       try {
//         console.log(`Primary Attempt: Fetching thermal for crop ${cropId}`);
//         const thermalRes = await thermalAPI.getByCrop(cropId);
        
//         // Handle various possible backend response structures
//         extractedData = 
//           thermalRes.data.data?.thermalData || 
//           thermalRes.data.data || 
//           thermalRes.data || 
//           [];
//       } catch (primaryErr) {
//         console.log("Primary route failed or 404, moving to fallback...");
//       }

//       // 3. Fallback Attempt (Critical fix for "0 records" bug)
//       if (!Array.isArray(extractedData) || extractedData.length === 0) {
//         console.log("Running Fallback: Searching all thermal records...");
//         try {
//           // Fetch all and filter manually
//           const fallbackRes = await thermalAPI.getAll();
//           const allData = fallbackRes.data.data?.thermalData || fallbackRes.data.data || [];
          
//           // SMART FILTER: Check for ID inside objects (populated) or direct strings
//           extractedData = allData.filter(item => {
//             const rawItemCropId = item.cropId?._id || item.cropId || item.crop?._id || item.crop;
//             return String(rawItemCropId) === String(cropId);
//           });
          
//           console.log(`Fallback found ${extractedData.length} records.`);
//         } catch (fallbackErr) {
//           console.error("Fallback search also failed:", fallbackErr.message);
//         }
//       }

//       // Update state with the final list of readings
//       setThermalData(Array.isArray(extractedData) ? extractedData : []);

//     } catch (error) {
//       console.error('Main fetch error:', error);
//       Alert.alert('Error', 'Could not load crop details.');
//     } finally {
//       setLoading(false);
//     }
//   }, [cropId]);

  useEffect(() => {
    if (cropId) {
      fetchCropDetails();
    } else {
      setLoading(false);
    }
  }, [cropId, fetchCropDetails]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchCropDetails();
    setRefreshing(false);
  };

  const handleAnalyze = async (thermalId) => {
    Alert.alert(
      'Analyze',
      'AI Analysis takes 20-30 seconds. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Analyze',
          onPress: async () => {
            setAnalyzing(thermalId);
            try {
              await analysisAPI.analyze(thermalId);
              Alert.alert('Success', 'Analysis completed!');
              // Refresh data to show the new efficiency score
              fetchCropDetails();
            } catch (error) {
              Alert.alert('Error', error.response?.data?.message || 'Analysis failed');
            }
            setAnalyzing(null);
          },
        },
      ]
    );
  };

  if (!cropId) {
    return (
      <View style={styles.centerContainer}>
        <Text style={{color: 'red'}}>Error: No Crop Selected</Text>
        <Button title="Go Back" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#16a34a" />
        <Text style={{marginTop: 10}}>Loading Crop Details...</Text>
      </View>
    );
  }

  if (!crop) {
    return (
      <View style={styles.centerContainer}>
        <Text>Crop not found</Text>
        <Button title="Back to Dashboard" onPress={() => navigation.navigate('Dashboard')} />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View style={styles.header}>
        <Text style={styles.cropName}>{crop.cropName}</Text>
        <Text style={styles.cropType}>{crop.cropType}</Text>
        <View style={styles.headerStats}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Field Size</Text>
            <Text style={styles.statValue}>{crop.fieldSize} acres</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Status</Text>
            <Text style={[styles.statValue, { color: '#dcfce7' }]}>{crop.status || 'Active'}</Text>
          </View>
        </View>
      </View>

      <View style={styles.content}>
        <Card>
          <Text style={styles.cardTitle}>Soil NPK Data</Text>
          <View style={styles.npkGrid}>
            <View style={[styles.npkCard, { backgroundColor: '#dcfce7' }]}>
              <Text style={styles.npkLabel}>N</Text>
              <Text style={[styles.npkValue, { color: '#16a34a' }]}>{crop.soilData?.N || 0}</Text>
            </View>
            <View style={[styles.npkCard, { backgroundColor: '#dbeafe' }]}>
              <Text style={styles.npkLabel}>P</Text>
              <Text style={[styles.npkValue, { color: '#2563eb' }]}>{crop.soilData?.P || 0}</Text>
            </View>
            <View style={[styles.npkCard, { backgroundColor: '#f3e8ff' }]}>
              <Text style={styles.npkLabel}>K</Text>
              <Text style={[styles.npkValue, { color: '#9333ea' }]}>{crop.soilData?.K || 0}</Text>
            </View>
            <View style={[styles.npkCard, { backgroundColor: '#fef9c3' }]}>
              <Text style={styles.npkLabel}>pH</Text>
              <Text style={[styles.npkValue, { color: '#ca8a04' }]}>{crop.soilData?.pH || 7.0}</Text>
            </View>
          </View>
        </Card>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Thermal Readings ({thermalData.length})</Text>
          <Button
            title="+ Add"
            onPress={() =>
              navigation.navigate('AddThermal', { cropId: crop._id, cropName: crop.cropName })
            }
            style={styles.addButton}
          />
        </View>

        {thermalData.length === 0 ? (
          <Card>
            <View style={styles.emptyState}>
              <Text style={styles.emptyEmoji}>🌡️</Text>
              <Text style={styles.emptyText}>No measurements recorded yet</Text>
            </View>
          </Card>
        ) : (
          thermalData.map((thermal) => (
            <Card key={thermal._id}>
              <View style={styles.thermalCard}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.thermalDate}>
                    {new Date(thermal.measurementDate).toLocaleDateString()}
                  </Text>
                  <View style={styles.thermalStats}>
                    <Text style={styles.thermalStat}>Before: {thermal.beforeTemp}°C</Text>
                    <Text style={styles.thermalStat}>After: {thermal.afterTemp}°C</Text>
                  </View>
                  {thermal.processed && (
                    <View style={styles.analysisPreview}>
                      <Text style={styles.analysisText}>
                        Efficiency: {thermal.analysis?.efficiencyScore || 0}%
                      </Text>
                    </View>
                  )}
                </View>
                <View>
                  {!thermal.processed ? (
                    <Button
                      title={analyzing === thermal._id ? '...' : 'Analyze'}
                      onPress={() => handleAnalyze(thermal._id)}
                      loading={analyzing === thermal._id}
                      style={styles.analyzeButton}
                    />
                  ) : (
                    <TouchableOpacity
                      style={styles.viewButton}
                      onPress={() => navigation.navigate('Analysis', { thermalId: thermal._id })}
                    >
                      <Text style={styles.viewButtonText}>View</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </Card>
          ))
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3f4f6' },
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  header: { backgroundColor: '#16a34a', padding: 20, paddingTop: 40 },
  cropName: { fontSize: 28, fontWeight: 'bold', color: '#fff' },
  cropType: { fontSize: 16, color: '#dcfce7', marginTop: 4, textTransform: 'capitalize' },
  headerStats: { flexDirection: 'row', marginTop: 16, gap: 20 },
  statItem: { flex: 1 },
  statLabel: { fontSize: 12, color: '#dcfce7' },
  statValue: { fontSize: 18, fontWeight: 'bold', color: '#fff', marginTop: 4 },
  content: { padding: 20 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#1f2937', marginBottom: 16 },
  npkGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  npkCard: { width: '48%', padding: 16, borderRadius: 8, alignItems: 'center' },
  npkLabel: { fontSize: 12, color: '#6b7280' },
  npkValue: { fontSize: 24, fontWeight: 'bold', marginTop: 4 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, marginBottom: 12 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1f2937' },
  addButton: { paddingHorizontal: 16, paddingVertical: 8 },
  thermalCard: { flexDirection: 'row', gap: 12 },
  thermalDate: { fontSize: 14, color: '#6b7280', marginBottom: 8 },
  thermalStats: { flexDirection: 'row', gap: 12, marginBottom: 8 },
  thermalStat: { fontSize: 12, color: '#1f2937' },
  analysisPreview: { backgroundColor: '#eff6ff', padding: 8, borderRadius: 6, marginTop: 8 },
  analysisText: { fontSize: 12, color: '#1e40af', fontWeight: 'bold' },
  analyzeButton: { paddingHorizontal: 12, paddingVertical: 8 },
  viewButton: { backgroundColor: '#16a34a', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8 },
  viewButtonText: { color: '#fff', fontWeight: '600' },
  emptyState: { alignItems: 'center', paddingVertical: 40 },
  emptyEmoji: { fontSize: 48, marginBottom: 8 },
  emptyText: { fontSize: 14, color: '#6b7280' },
});

export default CropDetailScreen;