

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { thermalAPI, cropsAPI } from '../config/api'; 
import Input from '../components/Input';
import Button from '../components/Button';

const AddThermalScreen = ({ route, navigation }) => {
  const passedCropId = route.params?.cropId;

  const [crops, setCrops] = useState([]);
  const [loadingCrops, setLoadingCrops] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    cropId: passedCropId || '',
    beforeTemp: '',
    afterTemp: '',
    environmental: {
      temperature: '',
      humidity: '',
      rainfall: '', 
    },
    fertilizer: {
      type: 'NPK',
      amount: '',
      unit: 'kg',
    },
  });

  useEffect(() => {
    const fetchCrops = async () => {
      setLoadingCrops(true);
      try {
        const res = await cropsAPI.getAll();
        const data = res.data.data.crops || res.data.data || [];
        setCrops(data);
        if (!passedCropId && data.length > 0) {
          setFormData(prev => ({ ...prev, cropId: data[0]._id }));
        }
      } catch (err) {
        console.error("Failed to fetch crops", err);
      } finally {
        setLoadingCrops(false);
      }
    };
    fetchCrops();
  }, [passedCropId]);

  const handleSubmit = async () => {
    if (!formData.cropId) {
      Alert.alert("Error", "Please select a crop.");
      return;
    }
    if (!formData.beforeTemp || !formData.afterTemp || !formData.environmental.rainfall) {
      Alert.alert('Error', 'Please enter Temperatures and Rainfall (required).');
      return;
    }

    setLoading(true);
    try {
      const dataToSubmit = {
        ...formData,
        beforeTemp: parseFloat(formData.beforeTemp),
        afterTemp: parseFloat(formData.afterTemp),
        environmental: {
          temperature: parseFloat(formData.environmental.temperature) || 0,
          humidity: parseFloat(formData.environmental.humidity) || 0,
          rainfall: parseFloat(formData.environmental.rainfall) || 0,
        },
        fertilizer: {
          ...formData.fertilizer,
          amount: parseFloat(formData.fertilizer.amount) || 0,
        }
      };

      await thermalAPI.create(dataToSubmit);
      Alert.alert('Success', 'Thermal data added!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', error.response?.data?.message || 'Failed to add data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          
          <Text style={styles.sectionTitle}>Select Crop</Text>
          <View style={styles.pickerWrapper}>
            {loadingCrops ? (
              <ActivityIndicator size="small" color="#16a34a" style={{padding: 15}} />
            ) : (
              <Picker
                selectedValue={formData.cropId}
                onValueChange={(val) => setFormData({ ...formData, cropId: val })}
              >
                <Picker.Item label="Choose a crop..." value="" />
                {crops.map((crop) => (
                  <Picker.Item key={crop._id} label={crop.cropName} value={crop._id} />
                ))}
              </Picker>
            )}
          </View>

          <Text style={styles.sectionTitle}>Temperature Readings</Text>
          <Input
            label="Before Temp (°C) *"
            placeholder="e.g. 32.5"
            value={formData.beforeTemp}
            onChangeText={(text) => setFormData({ ...formData, beforeTemp: text })}
            keyboardType="decimal-pad"
          />
          <Input
            label="After Temp (°C) *"
            placeholder="e.g. 29.1"
            value={formData.afterTemp}
            onChangeText={(text) => setFormData({ ...formData, afterTemp: text })}
            keyboardType="decimal-pad"
          />

          <Text style={styles.sectionTitle}>Environmental Conditions</Text>
          <Input
            label="Air Temperature (°C)"
            placeholder="30"
            value={formData.environmental.temperature}
            onChangeText={(text) => setFormData({
              ...formData, 
              environmental: {...formData.environmental, temperature: text}
            })}
            keyboardType="decimal-pad"
          />
          <Input
            label="Humidity (%)"
            placeholder="65"
            value={formData.environmental.humidity}
            onChangeText={(text) => setFormData({
              ...formData, 
              environmental: {...formData.environmental, humidity: text}
            })}
            keyboardType="decimal-pad"
          />
          <Input
            label="Rainfall (mm) *"
            placeholder="10.0"
            value={formData.environmental.rainfall}
            onChangeText={(text) => setFormData({
              ...formData, 
              environmental: {...formData.environmental, rainfall: text}
            })}
            keyboardType="decimal-pad"
          />

          <Text style={styles.sectionTitle}>Fertilizer Application</Text>
          <Text style={styles.innerLabel}>Type</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={formData.fertilizer.type}
              onValueChange={(v) => setFormData({...formData, fertilizer: {...formData.fertilizer, type: v}})}
            >
              <Picker.Item label="NPK" value="NPK" />
              <Picker.Item label="Urea" value="Urea" />
              <Picker.Item label="Organic" value="Organic" />
              <Picker.Item label="None" value="None" />
            </Picker>
          </View>

          <Input
            label="Amount"
            placeholder="50"
            value={formData.fertilizer.amount}
            onChangeText={(text) => setFormData({
              ...formData, 
              fertilizer: {...formData.fertilizer, amount: text}
            })}
            keyboardType="decimal-pad"
          />

          <Text style={styles.innerLabel}>Unit</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={formData.fertilizer.unit}
              onValueChange={(v) => setFormData({...formData, fertilizer: {...formData.fertilizer, unit: v}})}
            >
              <Picker.Item label="kg" value="kg" />
              <Picker.Item label="tons" value="tons" />
              <Picker.Item label="liters" value="liters" />
            </Picker>
          </View>

          <View style={styles.buttonContainer}>
            <Button title="Save Data" onPress={handleSubmit} loading={loading} />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3f4f6' },
  scrollView: { flex: 1 },
  content: { padding: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1f2937', marginTop: 15, marginBottom: 10 },
  innerLabel: { fontSize: 14, fontWeight: '500', color: '#374151', marginBottom: 6 },
  pickerWrapper: { 
    backgroundColor: '#fff', 
    borderRadius: 8, 
    borderWidth: 1, 
    borderColor: '#d1d5db',
    marginBottom: 15,
    overflow: 'hidden' 
  },
  buttonContainer: { marginTop: 20, marginBottom: 40 },
});

export default AddThermalScreen;