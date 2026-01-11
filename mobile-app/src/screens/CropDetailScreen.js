
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