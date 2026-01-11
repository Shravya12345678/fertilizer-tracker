

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker'; 
import { cropsAPI } from '../config/api';
import Input from '../components/Input';
import Button from '../components/Button';

const AddCropScreen = ({ navigation }) => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    cropName: '',
    cropType: 'rice',
    fieldSize: '',
    soilData: { N: '', P: '', K: '', pH: '' },
  });

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) setDate(selectedDate);
  };

  const handleSubmit = async () => {
    if (!formData.cropName || !formData.fieldSize || !formData.soilData.N) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    setLoading(true);
    try {
      await cropsAPI.create({
        ...formData,
        plantingDate: date.toISOString(), // Use selected date
      });
      Alert.alert('Success', 'Crop created successfully!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', error.response?.data?.message || 'Failed to create crop');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView} keyboardShouldPersistTaps="handled">
        <View style={styles.content}>
          <Input
            label="Crop Name *"
            placeholder="e.g., Rice Field A"
            value={formData.cropName}
            onChangeText={(text) => setFormData({ ...formData, cropName: text })}
          />

          <Text style={styles.label}>Planting Date *</Text>
          <TouchableOpacity 
            style={styles.dateSelector} 
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.dateText}>{date.toLocaleDateString()}</Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={onDateChange}
            />
          )}

          <View style={styles.pickerContainer}>
            <Text style={styles.label}>Crop Type *</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={formData.cropType}
                onValueChange={(value) => setFormData({ ...formData, cropType: value })}
                style={styles.picker}
              >
                <Picker.Item label="Rice" value="rice" />
                <Picker.Item label="Wheat" value="wheat" />
                <Picker.Item label="Maize" value="maize" />
                <Picker.Item label="Cotton" value="cotton" />
                <Picker.Item label="Tomato" value="tomato" />
                <Picker.Item label="Potato" value="potato" />
              </Picker>
            </View>
          </View>

          <Input
            label="Field Size (acres) *"
            placeholder="2.5"
            value={formData.fieldSize}
            onChangeText={(text) => setFormData({ ...formData, fieldSize: text })}
            keyboardType="decimal-pad"
          />

          <Text style={styles.sectionTitle}>Soil NPK Data *</Text>
          <Input label="Nitrogen (N)" placeholder="60" value={formData.soilData.N} keyboardType="number-pad" onChangeText={(t) => setFormData({...formData, soilData: {...formData.soilData, N: t}})} />
          <Input label="Phosphorus (P)" placeholder="45" value={formData.soilData.P} keyboardType="number-pad" onChangeText={(t) => setFormData({...formData, soilData: {...formData.soilData, P: t}})} />
          <Input label="Potassium (K)" placeholder="40" value={formData.soilData.K} keyboardType="number-pad" onChangeText={(t) => setFormData({...formData, soilData: {...formData.soilData, K: t}})} />
          <Input label="pH Level" placeholder="6.5" value={formData.soilData.pH} keyboardType="decimal-pad" onChangeText={(t) => setFormData({...formData, soilData: {...formData.soilData, pH: t}})} />

          <View style={styles.buttonContainer}>
            <Button title="Create Crop" onPress={handleSubmit} loading={loading} />
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
  label: { fontSize: 14, fontWeight: '500', color: '#374151', marginBottom: 6 },
  dateSelector: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 15,
    marginBottom: 16,
  },
  dateText: { fontSize: 16, color: '#1f2937' },
  pickerContainer: { marginBottom: 16 },
  pickerWrapper: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#d1d5db', borderRadius: 8, overflow: 'hidden' },
  picker: { height: 50 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1f2937', marginTop: 8, marginBottom: 16 },
  buttonContainer: { marginTop: 20, marginBottom: 30 },
});

export default AddCropScreen;