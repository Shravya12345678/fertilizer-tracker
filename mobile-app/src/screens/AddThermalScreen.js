// import React, { useState } from 'react';
// import { ScrollView, Alert } from 'react-native';
// import { thermalAPI } from '../config/api';
// import Input from '../components/Input';
// import Button from '../components/Button';

// export default function AddThermalScreen({ navigation, route }) {
//   const [tempBefore, setTempBefore] = useState('');
//   const [tempAfter, setTempAfter] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSave = async () => {
//     setLoading(true);
//     try {
//       const res = await thermalAPI.create({ 
//         cropId: route.params.cropId, 
//         tempBefore: parseFloat(tempBefore), 
//         tempAfter: parseFloat(tempAfter) 
//       });
//       // Navigate straight to analysis after saving
//       navigation.navigate('Analysis', { thermalId: res.data.data._id });
//     } catch (err) {
//       Alert.alert("Error", "Check your inputs and try again");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <ScrollView style={{ padding: 20 }}>
//       <Input label="Temperature Before (°C)" keyboardType="numeric" value={tempBefore} onChangeText={setTempBefore} />
//       <Input label="Temperature After (°C)" keyboardType="numeric" value={tempAfter} onChangeText={setTempAfter} />
//       <Button title="Save & Analyze" onPress={handleSave} loading={loading} />
//     </ScrollView>
//   );
// }

// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   KeyboardAvoidingView,
//   Platform,
//   Alert,
// } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import { thermalAPI } from '../config/api';
// import Input from '../components/Input';
// import Button from '../components/Button';

// const AddThermalScreen = ({ route, navigation }) => {
//   const { cropId, cropName } = route.params;
//   const [formData, setFormData] = useState({
//     cropId: cropId,
//     beforeTemp: '',
//     afterTemp: '',
//     environmental: {
//       temperature: '',
//       humidity: '',
//       rainfall: '',
//     },
//     fertilizer: {
//       type: 'NPK',
//       amount: '',
//       unit: 'kg',
//     },
//   });
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async () => {
//     if (!formData.beforeTemp || !formData.afterTemp) {
//       Alert.alert('Error', 'Please enter before and after temperatures');
//       return;
//     }

//     if (
//       !formData.environmental.temperature ||
//       !formData.environmental.humidity ||
//       !formData.environmental.rainfall
//     ) {
//       Alert.alert('Error', 'Please fill all environmental data');
//       return;
//     }

//     setLoading(true);
//     try {
//       await thermalAPI.create(formData);
//       Alert.alert('Success', 'Thermal data added successfully!');
//       navigation.goBack();
//     } catch (error) {
//       console.error('Error creating thermal data:', error);
//       Alert.alert('Error', error.response?.data?.message || 'Failed to add thermal data');
//     }
//     setLoading(false);
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       style={styles.container}
//     >
//       <ScrollView style={styles.scrollView} keyboardShouldPersistTaps="handled">
//         <View style={styles.content}>
//           <View style={styles.cropInfo}>
//             <Text style={styles.cropLabel}>Recording for:</Text>
//             <Text style={styles.cropName}>{cropName}</Text>
//           </View>

//           <Text style={styles.sectionTitle}>Temperature Readings</Text>

//           <Input
//             label="Before Temperature (°C) *"
//             placeholder="28.5"
//             value={formData.beforeTemp}
//             onChangeText={(text) => setFormData({ ...formData, beforeTemp: text })}
//             keyboardType="decimal-pad"
//           />

//           <Input
//             label="After Temperature (°C) *"
//             placeholder="26.2"
//             value={formData.afterTemp}
//             onChangeText={(text) => setFormData({ ...formData, afterTemp: text })}
//             keyboardType="decimal-pad"
//           />

//           <Text style={styles.sectionTitle}>Environmental Conditions</Text>

//           <Input
//             label="Air Temperature (°C) *"
//             placeholder="30.0"
//             value={formData.environmental.temperature}
//             onChangeText={(text) =>
//               setFormData({
//                 ...formData,
//                 environmental: { ...formData.environmental, temperature: text },
//               })
//             }
//             keyboardType="decimal-pad"
//           />

//           <Input
//             label="Humidity (%) *"
//             placeholder="65.0"
//             value={formData.environmental.humidity}
//             onChangeText={(text) =>
//               setFormData({
//                 ...formData,
//                 environmental: { ...formData.environmental, humidity: text },
//               })
//             }
//             keyboardType="decimal-pad"
//           />

//           <Input
//             label="Rainfall (mm) *"
//             placeholder="100.0"
//             value={formData.environmental.rainfall}
//             onChangeText={(text) =>
//               setFormData({
//                 ...formData,
//                 environmental: { ...formData.environmental, rainfall: text },
//               })
//             }
//             keyboardType="decimal-pad"
//           />

//           <Text style={styles.sectionTitle}>Fertilizer Application</Text>

//           <View style={styles.pickerContainer}>
//             <Text style={styles.label}>Fertilizer Type</Text>
//             <View style={styles.pickerWrapper}>
//               <Picker
//                 selectedValue={formData.fertilizer.type}
//                 onValueChange={(value) =>
//                   setFormData({
//                     ...formData,
//                     fertilizer: { ...formData.fertilizer, type: value },
//                   })
//                 }
//                 style={styles.picker}
//               >
//                 <Picker.Item label="NPK" value="NPK" />
//                 <Picker.Item label="Urea" value="Urea" />
//                 <Picker.Item label="DAP" value="DAP" />
//                 <Picker.Item label="MOP" value="MOP" />
//                 <Picker.Item label="Organic" value="Organic" />
//               </Picker>
//             </View>
//           </View>

//           <Input
//             label="Amount"
//             placeholder="50"
//             value={formData.fertilizer.amount}
//             onChangeText={(text) =>
//               setFormData({
//                 ...formData,
//                 fertilizer: { ...formData.fertilizer, amount: text },
//               })
//             }
//             keyboardType="decimal-pad"
//           />

//           <View style={styles.pickerContainer}>
//             <Text style={styles.label}>Unit</Text>
//             <View style={styles.pickerWrapper}>
//               <Picker
//                 selectedValue={formData.fertilizer.unit}
//                 onValueChange={(value) =>
//                   setFormData({
//                     ...formData,
//                     fertilizer: { ...formData.fertilizer, unit: value },
//                   })
//                 }
//                 style={styles.picker}
//               >
//                 <Picker.Item label="Kilograms (kg)" value="kg" />
//                 <Picker.Item label="Grams (g)" value="g" />
//                 <Picker.Item label="Pounds (lbs)" value="lbs" />
//               </Picker>
//             </View>
//           </View>

//           <View style={styles.buttonContainer}>
//             <Button title="Add Thermal Data" onPress={handleSubmit} loading={loading} />
//             <Button
//               title="Cancel"
//               onPress={() => navigation.goBack()}
//               variant="secondary"
//               style={styles.cancelButton}
//             />
//           </View>
//         </View>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f3f4f6',
//   },
//   scrollView: {
//     flex: 1,
//   },
//   content: {
//     padding: 20,
//   },
//   cropInfo: {
//     backgroundColor: '#dcfce7',
//     padding: 16,
//     borderRadius: 8,
//     marginBottom: 20,
//   },
//   cropLabel: {
//     fontSize: 12,
//     color: '#166534',
//     marginBottom: 4,
//   },
//   cropName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#16a34a',
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#1f2937',
//     marginTop: 8,
//     marginBottom: 16,
//   },
//   pickerContainer: {
//     marginBottom: 16,
//   },
//   label: {
//     fontSize: 14,
//     fontWeight: '500',
//     color: '#374151',
//     marginBottom: 6,
//   },
//   pickerWrapper: {
//     backgroundColor: '#fff',
//     borderWidth: 1,
//     borderColor: '#d1d5db',
//     borderRadius: 8,
//     overflow: 'hidden',
//   },
//   picker: {
//     height: 50,
//   },
//   buttonContainer: {
//     marginTop: 20,
//     marginBottom: 40,
//   },
//   cancelButton: {
//     marginTop: 12,
//   },
// });

// export default AddThermalScreen;

// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   KeyboardAvoidingView,
//   Platform,
//   Alert,
// } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import { thermalAPI } from '../config/api';
// import Input from '../components/Input';
// import Button from '../components/Button';

// const AddThermalScreen = ({ route, navigation }) => {
//   // SAFE EXTRACTION
//   const cropId = route.params?.cropId;
//   const cropName = route.params?.cropName || "Selected Crop";

//   const [formData, setFormData] = useState({
//     cropId: cropId,
//     beforeTemp: '',
//     afterTemp: '',
//     environmental: {
//       temperature: '',
//       humidity: '',
//       rainfall: '',
//     },
//     fertilizer: {
//       type: 'NPK',
//       amount: '',
//       unit: 'kg',
//     },
//   });
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async () => {
//     if (!cropId) {
//       Alert.alert("Error", "No crop ID found. Please go back.");
//       return;
//     }

//     if (!formData.beforeTemp || !formData.afterTemp) {
//       Alert.alert('Error', 'Please enter both temperatures');
//       return;
//     }

//     setLoading(true);
//     try {
//       await thermalAPI.create(formData);
//       Alert.alert('Success', 'Thermal data added!');
//       navigation.goBack();
//     } catch (error) {
//       Alert.alert('Error', error.response?.data?.message || 'Failed to add data');
//     }
//     setLoading(false);
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       style={styles.container}
//     >
//       <ScrollView style={styles.scrollView}>
//         <View style={styles.content}>
//           <View style={styles.cropInfo}>
//             <Text style={styles.cropLabel}>Recording for:</Text>
//             <Text style={styles.cropName}>{cropName}</Text>
//           </View>

//           <Text style={styles.sectionTitle}>Temperature Readings</Text>
//           <Input
//             label="Before Temp (°C)"
//             placeholder="e.g. 32.5"
//             value={formData.beforeTemp}
//             onChangeText={(text) => setFormData({ ...formData, beforeTemp: text })}
//             keyboardType="decimal-pad"
//           />
//           <Input
//             label="After Temp (°C)"
//             placeholder="e.g. 29.1"
//             value={formData.afterTemp}
//             onChangeText={(text) => setFormData({ ...formData, afterTemp: text })}
//             keyboardType="decimal-pad"
//           />

//           <Text style={styles.sectionTitle}>Environmental Conditions</Text>
//           <Input
//             label="Air Temperature (°C)"
//             value={formData.environmental.temperature}
//             onChangeText={(text) => setFormData({...formData, environmental: {...formData.environmental, temperature: text}})}
//             keyboardType="decimal-pad"
//           />
//           <Input
//             label="Humidity (%)"
//             value={formData.environmental.humidity}
//             onChangeText={(text) => setFormData({...formData, environmental: {...formData.environmental, humidity: text}})}
//             keyboardType="decimal-pad"
//           />

//           <View style={styles.buttonContainer}>
//             <Button title="Save Data" onPress={handleSubmit} loading={loading} />
//           </View>
//         </View>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// };

// // ... Styles remain the same ...
// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#f3f4f6' },
//   scrollView: { flex: 1 },
//   content: { padding: 20 },
//   cropInfo: { backgroundColor: '#dcfce7', padding: 16, borderRadius: 8, marginBottom: 20 },
//   cropLabel: { fontSize: 12, color: '#166534', marginBottom: 4 },
//   cropName: { fontSize: 18, fontWeight: 'bold', color: '#16a34a' },
//   sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1f2937', marginTop: 8, marginBottom: 16 },
//   buttonContainer: { marginTop: 20, marginBottom: 40 },
// });

// export default AddThermalScreen;

// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   KeyboardAvoidingView,
//   Platform,
//   Alert,
//   ActivityIndicator
// } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// // Added cropsAPI here to fetch the list
// import { thermalAPI, cropsAPI } from '../config/api'; 
// import Input from '../components/Input';
// import Button from '../components/Button';

// const AddThermalScreen = ({ route, navigation }) => {
//   const passedCropId = route.params?.cropId;
//   const passedCropName = route.params?.cropName;

//   const [crops, setCrops] = useState([]); // To store the list for the dropdown
//   const [loadingCrops, setLoadingCrops] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const [formData, setFormData] = useState({
//     cropId: passedCropId || '', // Initialize with passed ID or empty
//     beforeTemp: '',
//     afterTemp: '',
//     environmental: {
//       temperature: '',
//       humidity: '',
//       rainfall: '0',
//     },
//     fertilizer: {
//       type: 'NPK',
//       amount: '',
//       unit: 'kg',
//     },
//   });

//   // Fetch all crops when the screen opens
//   useEffect(() => {
//     const fetchCrops = async () => {
//       setLoadingCrops(true);
//       try {
//         const res = await cropsAPI.getAll();
//         const data = res.data.data.crops || res.data.data || [];
//         setCrops(data);
        
//         // If no crop was passed, but we have crops, select the first one by default
//         if (!passedCropId && data.length > 0) {
//           setFormData(prev => ({ ...prev, cropId: data[0]._id }));
//         }
//       } catch (err) {
//         console.error("Failed to fetch crops", err);
//       } finally {
//         setLoadingCrops(false);
//       }
//     };
//     fetchCrops();
//   }, [passedCropId]);

//   const handleSubmit = async () => {
//     // 1. Validate Crop Selection
//     if (!formData.cropId) {
//       Alert.alert("Error", "Please select a crop.");
//       return;
//     }

//     // 2. Validate Temperatures
//     if (!formData.beforeTemp || !formData.afterTemp) {
//       Alert.alert('Error', 'Please enter both temperatures');
//       return;
//     }

//     setLoading(true);
//     try {
//       // 3. Clean the data (Convert Strings to Numbers)
//       const dataToSubmit = {
//         ...formData,
//         beforeTemp: parseFloat(formData.beforeTemp),
//         afterTemp: parseFloat(formData.afterTemp),
//         environmental: {
//           temperature: parseFloat(formData.environmental.temperature) || 0,
//           humidity: parseFloat(formData.environmental.humidity) || 0,
//           rainfall: parseFloat(formData.environmental.rainfall) || 0,
//         },
//         fertilizer: {
//           ...formData.fertilizer,
//           amount: parseFloat(formData.fertilizer.amount) || 0,
//         }
//       };

//       // 4. Send cleaned data
//       await thermalAPI.create(dataToSubmit);
      
//       Alert.alert('Success', 'Thermal data added!');
//       navigation.goBack();
//     } catch (error) {
//       console.error('Submission Error:', error.response?.data || error.message);
//       Alert.alert('Error', error.response?.data?.message || 'Failed to add data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // const handleSubmit = async () => {
//   //   if (!formData.cropId) {
//   //     Alert.alert("Error", "Please select a crop.");
//   //     return;
//   //   }

//   //   if (!formData.beforeTemp || !formData.afterTemp) {
//   //     Alert.alert('Error', 'Please enter both temperatures');
//   //     return;
//   //   }

//   //   setLoading(true);
//   //   try {
//   //     await thermalAPI.create(formData);
//   //     Alert.alert('Success', 'Thermal data added!');
//   //     navigation.goBack();
//   //   } catch (error) {
//   //     Alert.alert('Error', error.response?.data?.message || 'Failed to add data');
//   //   }
//   //   setLoading(false);
//   // };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       style={styles.container}
//     >
//       <ScrollView style={styles.scrollView}>
//         <View style={styles.content}>
          
//           <Text style={styles.sectionTitle}>Select Crop</Text>
//           <View style={styles.pickerWrapper}>
//             {loadingCrops ? (
//               <ActivityIndicator size="small" color="#16a34a" style={{padding: 15}} />
//             ) : (
//               <Picker
//                 selectedValue={formData.cropId}
//                 onValueChange={(itemValue) => 
//                   setFormData({ ...formData, cropId: itemValue })
//                 }
//               >
//                 <Picker.Item label="Choose a crop..." value="" />
//                 {crops.map((crop) => (
//                   <Picker.Item key={crop._id} label={crop.cropName} value={crop._id} />
//                 ))}
//               </Picker>
//             )}
//           </View>

//           <Text style={styles.sectionTitle}>Temperature Readings</Text>
//           <Input
//             label="Before Temp (°C)"
//             placeholder="e.g. 32.5"
//             value={formData.beforeTemp}
//             onChangeText={(text) => setFormData({ ...formData, beforeTemp: text })}
//             keyboardType="decimal-pad"
//           />
//           <Input
//             label="After Temp (°C)"
//             placeholder="e.g. 29.1"
//             value={formData.afterTemp}
//             onChangeText={(text) => setFormData({ ...formData, afterTemp: text })}
//             keyboardType="decimal-pad"
//           />

//           <Text style={styles.sectionTitle}>Environmental Conditions</Text>
//           <Input
//             label="Air Temperature (°C)"
//             placeholder="e.g. 30"
//             value={formData.environmental.temperature}
//             onChangeText={(text) => setFormData({
//               ...formData, 
//               environmental: {...formData.environmental, temperature: text}
//             })}
//             keyboardType="decimal-pad"
//           />
//           <Input
//             label="Humidity (%)"
//             placeholder="e.g. 65"
//             value={formData.environmental.humidity}
//             onChangeText={(text) => setFormData({
//               ...formData, 
//               environmental: {...formData.environmental, humidity: text}
//             })}
//             keyboardType="decimal-pad"
//           />

//           <View style={styles.buttonContainer}>
//             <Button title="Save Data" onPress={handleSubmit} loading={loading} />
//           </View>
//         </View>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#f3f4f6' },
//   scrollView: { flex: 1 },
//   content: { padding: 20 },
//   sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#1f2937', marginTop: 15, marginBottom: 10 },
//   pickerWrapper: { 
//     backgroundColor: '#fff', 
//     borderRadius: 8, 
//     borderWidth: 1, 
//     borderColor: '#d1d5db',
//     marginBottom: 10,
//     overflow: 'hidden' 
//   },
//   buttonContainer: { marginTop: 20, marginBottom: 40 },
// });

// export default AddThermalScreen;

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