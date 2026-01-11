
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from 'react-native';
import { cropsAPI } from '../config/api';
import Card from '../components/Card';
import Button from '../components/Button';

const CropsScreen = ({ navigation }) => {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

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
      Alert.alert('Error', 'Failed to load crops');
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchCrops();
    setRefreshing(false);
  };

  const handleDelete = (id) => {
    Alert.alert('Delete Crop', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await cropsAPI.delete(id);
            fetchCrops();
            Alert.alert('Success', 'Crop deleted');
          } catch (error) {
            Alert.alert('Error', 'Failed to delete crop');
          }
        },
      },
    ]);
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <Text>Loading crops...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View style={styles.content}>
          <Button
            title="+ Add New Crop"
            onPress={() => navigation.navigate('AddCrop')}
            style={styles.addButton}
          />

          {crops.length === 0 ? (
            <Card>
              <View style={styles.emptyState}>
                <Text style={styles.emptyEmoji}>🌾</Text>
                <Text style={styles.emptyTitle}>No crops yet</Text>
                <Text style={styles.emptyText}>Add your first crop to get started</Text>
              </View>
            </Card>
          ) : (
            crops.map((crop) => (
              <TouchableOpacity
                key={crop._id}
                onPress={() => navigation.navigate('CropDetail', { cropId: crop._id })}
              >
                <Card>
                  <View style={styles.cropHeader}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.cropName}>{crop.cropName}</Text>
                      <Text style={styles.cropType}>{crop.cropType}</Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => handleDelete(crop._id)}
                      style={styles.deleteButton}
                    >
                      <Text style={styles.deleteText}>Delete</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.cropDetails}>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Field Size:</Text>
                      <Text style={styles.detailValue}>{crop.fieldSize} acres</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Status:</Text>
                      <Text style={[styles.detailValue, { color: '#16a34a' }]}>
                        {crop.status}
                      </Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>NPK:</Text>
                      <Text style={styles.detailValue}>
                        N:{crop.soilData.N} P:{crop.soilData.P} K:{crop.soilData.K}
                      </Text>
                    </View>
                  </View>
                </Card>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  addButton: {
    marginBottom: 20,
  },
  cropHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  cropName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  cropType: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
    textTransform: 'capitalize',
  },
  deleteButton: {
    backgroundColor: '#ef4444',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  deleteText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  cropDetails: {
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingTop: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyEmoji: {
    fontSize: 60,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#6b7280',
  },
});

export default CropsScreen;