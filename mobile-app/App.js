// // import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

// // export default function App() {
// //   return (
// //     <View style={styles.container}>
// //       <Text>Open up App.js to start working on your app!</Text>
// //       <StatusBar style="auto" />
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#fff',
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //   },
// // });

// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { StatusBar } from 'expo-status-bar';
// import { AuthProvider, useAuth } from './src/contexts/AuthContext';


// // Screens
// import LoginScreen from './src/screens/LoginScreen';
// import RegisterScreen from './src/screens/RegisterScreen';
// import DashboardScreen from './src/screens/DashboardScreen';
// import CropsScreen from './src/screens/CropsScreen';
// import AddCropScreen from './src/screens/AddCropScreen';
// import CropDetailScreen from './src/screens/CropDetailScreen';
// import AddThermalScreen from './src/screens/AddThermalScreen';
// import AnalysisScreen from './src/screens/AnalysisScreen';

// const Stack = createNativeStackNavigator();

// function AppNavigator() {
//   const { user, loading } = useAuth();

//   if (loading) return null; 

//   return (
//     <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#16a34a' }, headerTintColor: '#fff' }}>
//       {!user ? (
//         <>
//           <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
//           <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
//         </>
//       ) : (
//         <>
//           <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ headerShown: false }} />
//           <Stack.Screen name="Crops" component={CropsScreen} options={{ title: 'My Crops' }} />
//           <Stack.Screen name="AddCrop" component={AddCropScreen} options={{ title: 'Add New Crop' }} />
//           <Stack.Screen name="CropDetail" component={CropDetailScreen} options={{ title: 'Field Details' }} />
//           <Stack.Screen name="AddThermal" component={AddThermalScreen} options={{ title: 'Record Thermal Data' }} />
//           <Stack.Screen name="Analysis" component={AnalysisScreen} options={{ title: 'AI Analysis' }} />
//         </>
//       )}
//     </Stack.Navigator>
//   );
// }

// export default function App() {
//   return (
//     <AuthProvider>
//       <NavigationContainer>
//         <AppNavigator />
//         <StatusBar style="auto" />
//       </NavigationContainer>
//     </AuthProvider>
//   );
// }

// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { StatusBar } from 'expo-status-bar';
// import { AuthProvider, useAuth } from './src/contexts/AuthContext';

// // Screens
// import LoginScreen from './src/screens/LoginScreen';
// import RegisterScreen from './src/screens/RegisterScreen';
// import DashboardScreen from './src/screens/DashboardScreen';
// import CropsScreen from './src/screens/CropsScreen';
// import AddCropScreen from './src/screens/AddCropScreen';
// import CropDetailScreen from './src/screens/CropDetailScreen';
// import AddThermalScreen from './src/screens/AddThermalScreen';
// import AnalysisScreen from './src/screens/AnalysisScreen';

// const Stack = createNativeStackNavigator();

// function AppNavigator() {
//   const { user, loading } = useAuth();

//   if (loading) {
//     return null; // Or a loading screen
//   }

//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerStyle: {
//           backgroundColor: '#16a34a',
//         },
//         headerTintColor: '#fff',
//         headerTitleStyle: {
//           fontWeight: 'bold',
//         },
//       }}
//     >
//       {user ? (
//         <>
//           <Stack.Screen
//             name="Dashboard"
//             component={DashboardScreen}
//             options={{ headerShown: false }}
//           />
//           <Stack.Screen
//             name="Crops"
//             component={CropsScreen}
//             options={{ title: 'My Crops' }}
//           />
//           <Stack.Screen
//             name="AddCrop"
//             component={AddCropScreen}
//             options={{ title: 'Add New Crop' }}
//           />
//           <Stack.Screen
//             name="CropDetail"
//             component={CropDetailScreen}
//             options={{ title: 'Crop Details' }}
//           />
//           <Stack.Screen
//             name="AddThermal"
//             component={AddThermalScreen}
//             options={{ title: 'Add Thermal Data' }}
//           />
//           <Stack.Screen
//             name="Analysis"
//             component={AnalysisScreen}
//             options={{ title: 'Analysis Results' }}
//           />
//         </>
//       ) : (
//         <>
//           <Stack.Screen
//             name="Login"
//             component={LoginScreen}
//             options={{ headerShown: false }}
//           />
//           <Stack.Screen
//             name="Register"
//             component={RegisterScreen}
//             options={{ headerShown: false }}
//           />
//         </>
//       )}
//     </Stack.Navigator>
//   );
// }

// export default function App() {
//   return (
//     <AuthProvider>
//       <NavigationContainer>
//         <StatusBar style="auto" />
//         <AppNavigator />
//       </NavigationContainer>
//     </AuthProvider>
//   );
// }

import React from 'react';
import { View, ActivityIndicator } from 'react-native'; // Added these
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider, useAuth } from './src/contexts/AuthContext';

// Screens
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import CropsScreen from './src/screens/CropsScreen';
import AddCropScreen from './src/screens/AddCropScreen';
import CropDetailScreen from './src/screens/CropDetailScreen';
import AddThermalScreen from './src/screens/AddThermalScreen';
import AnalysisScreen from './src/screens/AnalysisScreen';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  const { user, loading } = useAuth();

  if (loading) {
    // MODIFIED: Added a visible loading spinner
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <ActivityIndicator size="large" color="#16a34a" />
      </View>
    );
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#16a34a' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      {user ? (
        <>
          <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Crops" component={CropsScreen} options={{ title: 'My Crops' }} />
          <Stack.Screen name="AddCrop" component={AddCropScreen} options={{ title: 'Add New Crop' }} />
          <Stack.Screen name="CropDetail" component={CropDetailScreen} options={{ title: 'Crop Details' }} />
          <Stack.Screen name="AddThermal" component={AddThermalScreen} options={{ title: 'Add Thermal Data' }} />
          <Stack.Screen name="Analysis" component={AnalysisScreen} options={{ title: 'Analysis Results' }} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}