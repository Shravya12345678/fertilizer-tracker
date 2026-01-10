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
// import { useAuth } from '../contexts/AuthContext';
// import { cropsAPI, thermalAPI } from '../config/api';
// import Card from '../components/Card';

// const DashboardScreen = ({ navigation }) => {
//   const { user, logout } = useAuth();
//   const [stats, setStats] = useState({
//     totalCrops: 0,
//     activeCrops: 0,
//     totalMeasurements: 0,
//     processedMeasurements: 0,
//   });
//   const [recentCrops, setRecentCrops] = useState([]);
//   const [refreshing, setRefreshing] = useState(false);

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   const fetchDashboardData = async () => {
//     try {
//       const [cropsRes, thermalRes] = await Promise.all([
//         cropsAPI.getAll({ limit: 3 }),
//         thermalAPI.getAll({ limit: 5 }),
//       ]);

//       const crops = cropsRes.data.data.crops;
//       const thermal = thermalRes.data.data.thermalData;

//       setRecentCrops(crops);
//       setStats({
//         totalCrops: cropsRes.data.total,
//         activeCrops: crops.filter((c) => c.status === 'active').length,
//         totalMeasurements: thermalRes.data.total,
//         processedMeasurements: thermal.filter((t) => t.processed).length,
//       });
//     } catch (error) {
//       console.error('Error fetching dashboard data:', error);
//       Alert.alert('Error', 'Failed to load dashboard data');
//     }
//   };

//   const onRefresh = async () => {
//     setRefreshing(true);
//     await fetchDashboardData();
//     setRefreshing(false);
//   };

//   const handleLogout = () => {
//     Alert.alert('Logout', 'Are you sure you want to logout?', [
//       { text: 'Cancel', style: 'cancel' },
//       { text: 'Logout', onPress: logout, style: 'destructive' },
//     ]);
//   };

//   return (
//     <ScrollView
//       style={styles.container}
//       refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
//     >
//       <View style={styles.header}>
//         <View>
//           <Text style={styles.greeting}>Welcome back, {user?.username}! 👋</Text>
//           <Text style={styles.subtitle}>Here's your farm overview</Text>
//         </View>
//         <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
//           <Text style={styles.logoutText}>Logout</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Stats Cards */}
//       <View style={styles.statsGrid}>
//         <Card style={styles.statCard}>
//           <Text style={styles.statEmoji}>🌾</Text>
//           <Text style={styles.statValue}>{stats.totalCrops}</Text>
//           <Text style={styles.statLabel}>Total Crops</Text>
//         </Card>

//         <Card style={styles.statCard}>
//           <Text style={styles.statEmoji}>✅</Text>
//           <Text style={[styles.statValue, { color: '#16a34a' }]}>{stats.activeCrops}</Text>
//           <Text style={styles.statLabel}>Active</Text>
//         </Card>

//         <Card style={styles.statCard}>
//           <Text style={styles.statEmoji}>🌡️</Text>
//           <Text style={styles.statValue}>{stats.totalMeasurements}</Text>
//           <Text style={styles.statLabel}>Measurements</Text>
//         </Card>

//         <Card style={styles.statCard}>
//           <Text style={styles.statEmoji}>📊</Text>
//           <Text style={[styles.statValue, { color: '#3b82f6' }]}>
//             {stats.processedMeasurements}
//           </Text>
//           <Text style={styles.statLabel}>Analyzed</Text>
//         </Card>
//       </View>

//       {/* Quick Actions */}
//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Quick Actions</Text>
//         <View style={styles.actionsGrid}>
//           <TouchableOpacity
//             style={[styles.actionCard, { backgroundColor: '#16a34a' }]}
//             onPress={() => navigation.navigate('Crops')}
//           >
//             <Text style={styles.actionEmoji}>🌾</Text>
//             <Text style={styles.actionText}>My Crops</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={[styles.actionCard, { backgroundColor: '#3b82f6' }]}
//             onPress={() => navigation.navigate('AddThermal')}
//           >
//             <Text style={styles.actionEmoji}>🌡️</Text>
//             <Text style={styles.actionText}>Add Data</Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Recent Crops */}
//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Recent Crops</Text>
//         {recentCrops.length === 0 ? (
//           <Card>
//             <Text style={styles.emptyText}>No crops yet. Add your first crop!</Text>
//           </Card>
//         ) : (
//           recentCrops.map((crop) => (
//             <TouchableOpacity
//               key={crop._id}
//               onPress={() => navigation.navigate('CropDetail', { cropId: crop._id })}
//             >
//               <Card>
//                 <View style={styles.cropCard}>
//                   <View>
//                     <Text style={styles.cropName}>{crop.cropName}</Text>
//                     <Text style={styles.cropType}>{crop.cropType}</Text>
//                   </View>
//                   <View style={styles.cropStatus}>
//                     <Text
//                       style={[
//                         styles.statusBadge,
//                         crop.status === 'active'
//                           ? styles.statusActive
//                           : styles.statusInactive,
//                       ]}
//                     >
//                       {crop.status}
//                     </Text>
//                   </View>
//                 </View>
//               </Card>
//             </TouchableOpacity>
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
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'flex-start',
//     padding: 20,
//     paddingTop: 60,
//     backgroundColor: '#fff',
//   },
//   greeting: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#1f2937',
//   },
//   subtitle: {
//     fontSize: 14,
//     color: '#6b7280',
//     marginTop: 4,
//   },
//   logoutButton: {
//     backgroundColor: '#ef4444',
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 8,
//   },
//   logoutText: {
//     color: '#fff',
//     fontWeight: '600',
//     fontSize: 14,
//   },
//   statsGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     padding: 10,
//   },
//   statCard: {
//     width: '48%',
//     margin: '1%',
//     alignItems: 'center',
//     paddingVertical: 20,
//   },
//   statEmoji: {
//     fontSize: 32,
//     marginBottom: 8,
//   },
//   statValue: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#1f2937',
//   },
//   statLabel: {
//     fontSize: 12,
//     color: '#6b7280',
//     marginTop: 4,
//   },
//   section: {
//     padding: 20,
//   },
//   sectionTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#1f2937',
//     marginBottom: 12,
//   },
//   actionsGrid: {
//     flexDirection: 'row',
//     gap: 12,
//   },
//   actionCard: {
//     flex: 1,
//     paddingVertical: 24,
//     borderRadius: 12,
//     alignItems: 'center',
//   },
//   actionEmoji: {
//     fontSize: 32,
//     marginBottom: 8,
//   },
//   actionText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   cropCard: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   cropName: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#1f2937',
//   },
//   cropType: {
//     fontSize: 14,
//     color: '#6b7280',
//     marginTop: 4,
//   },
//   cropStatus: {
//     alignItems: 'flex-end',
//   },
//   statusBadge: {
//     paddingHorizontal: 12,
//     paddingVertical: 4,
//     borderRadius: 12,
//     fontSize: 12,
//     fontWeight: '600',
//     textTransform: 'capitalize',
//   },
//   statusActive: {
//     backgroundColor: '#dcfce7',
//     color: '#16a34a',
//   },
//   statusInactive: {
//     backgroundColor: '#f3f4f6',
//     color: '#6b7280',
//   },
//   emptyText: {
//     textAlign: 'center',
//     color: '#6b7280',
//     fontSize: 14,
//   },
// });

// export default DashboardScreen;

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
// import { useAuth } from '../contexts/AuthContext';
// import { cropsAPI, thermalAPI } from '../config/api';
// import Card from '../components/Card';

// const DashboardScreen = ({ navigation }) => {
//   const { user, logout } = useAuth();
//   const [stats, setStats] = useState({
//     totalCrops: 0,
//     activeCrops: 0,
//     totalMeasurements: 0,
//     processedMeasurements: 0,
//   });
//   const [recentCrops, setRecentCrops] = useState([]);
//   const [refreshing, setRefreshing] = useState(false);

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   const fetchDashboardData = async () => {
//   setLoading(true);
//   try {
//     // We fetch crops and thermal data at the same time
//     const [cropsRes, thermalRes] = await Promise.all([
//       cropsAPI.getAll(),
//       thermalAPI.getAll() // This is the function we just fixed
//     ]);

//     const cropsData = cropsRes.data.data.crops || cropsRes.data.data || [];
//     const thermalData = thermalRes.data.data.thermalData || thermalRes.data.data || [];

//     // Calculate stats for the dashboard cards
//     setStats({
//       totalCrops: cropsData.length,
//       activeAnalyses: thermalData.filter(t => t.processed).length,
//       averageEfficiency: calculateAverageEfficiency(thermalData),
//     });

//     setRecentCrops(cropsData.slice(0, 5)); // Show only top 5
//   } catch (error) {
//     console.error('Error fetching dashboard data:', error);
//     // If it's a 404 here, it's okay, just show 0 stats
//     setStats({ totalCrops: 0, activeAnalyses: 0, averageEfficiency: 0 });
//   } finally {
//     setLoading(false);
//   }
// };

//   // const fetchDashboardData = async () => {
//   //   try {
//   //     const [cropsRes, thermalRes] = await Promise.all([
//   //       cropsAPI.getAll({ limit: 3 }),
//   //       thermalAPI.getAll({ limit: 5 }),
//   //     ]);

//   //     const crops = cropsRes.data.data.crops;
//   //     const thermal = thermalRes.data.data.thermalData;

//   //     setRecentCrops(crops);
//   //     setStats({
//   //       totalCrops: cropsRes.data.total,
//   //       activeCrops: crops.filter((c) => c.status === 'active').length,
//   //       totalMeasurements: thermalRes.data.total,
//   //       processedMeasurements: thermal.filter((t) => t.processed).length,
//   //     });
//   //   } catch (error) {
//   //     console.error('Error fetching dashboard data:', error);
//   //     Alert.alert('Error', 'Failed to load dashboard data');
//   //   }
//   // };

//   const onRefresh = async () => {
//     setRefreshing(true);
//     await fetchDashboardData();
//     setRefreshing(false);
//   };

//   const handleLogout = () => {
//     Alert.alert('Logout', 'Are you sure you want to logout?', [
//       { text: 'Cancel', style: 'cancel' },
//       { text: 'Logout', onPress: logout, style: 'destructive' },
//     ]);
//   };

//   return (
//     <ScrollView
//       style={styles.container}
//       refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
//     >
//       <View style={styles.header}>
//         <View>
//           <Text style={styles.greeting}>Welcome back, {user?.username}! 👋</Text>
//           <Text style={styles.subtitle}>Here's your farm overview</Text>
//         </View>
//         <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
//           <Text style={styles.logoutText}>Logout</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Stats Cards */}
//       <View style={styles.statsGrid}>
//         <Card style={styles.statCard}>
//           <Text style={styles.statEmoji}>🌾</Text>
//           <Text style={styles.statValue}>{stats.totalCrops}</Text>
//           <Text style={styles.statLabel}>Total Crops</Text>
//         </Card>

//         <Card style={styles.statCard}>
//           <Text style={styles.statEmoji}>✅</Text>
//           <Text style={[styles.statValue, { color: '#16a34a' }]}>{stats.activeCrops}</Text>
//           <Text style={styles.statLabel}>Active</Text>
//         </Card>

//         <Card style={styles.statCard}>
//           <Text style={styles.statEmoji}>🌡️</Text>
//           <Text style={styles.statValue}>{stats.totalMeasurements}</Text>
//           <Text style={styles.statLabel}>Measurements</Text>
//         </Card>

//         <Card style={styles.statCard}>
//           <Text style={styles.statEmoji}>📊</Text>
//           <Text style={[styles.statValue, { color: '#3b82f6' }]}>
//             {stats.processedMeasurements}
//           </Text>
//           <Text style={styles.statLabel}>Analyzed</Text>
//         </Card>
//       </View>

//       {/* Quick Actions */}
//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Quick Actions</Text>
//         <View style={styles.actionsGrid}>
//           <TouchableOpacity
//             style={[styles.actionCard, { backgroundColor: '#16a34a' }]}
//             onPress={() => navigation.navigate('Crops')}
//           >
//             <Text style={styles.actionEmoji}>🌾</Text>
//             <Text style={styles.actionText}>My Crops</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={[styles.actionCard, { backgroundColor: '#3b82f6' }]}
//             onPress={() => navigation.navigate('AddThermal')}
//           >
//             <Text style={styles.actionEmoji}>🌡️</Text>
//             <Text style={styles.actionText}>Add Data</Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Recent Crops */}
//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Recent Crops</Text>
//         {recentCrops.length === 0 ? (
//           <Card>
//             <Text style={styles.emptyText}>No crops yet. Add your first crop!</Text>
//           </Card>
//         ) : (
//           recentCrops.map((crop) => (
//             <TouchableOpacity
//               key={crop._id}
//               onPress={() => navigation.navigate('CropDetail', { cropId: crop._id })}
//             >
//               <Card>
//                 <View style={styles.cropCard}>
//                   <View>
//                     <Text style={styles.cropName}>{crop.cropName}</Text>
//                     <Text style={styles.cropType}>{crop.cropType}</Text>
//                   </View>
//                   <View style={styles.cropStatus}>
//                     <Text
//                       style={[
//                         styles.statusBadge,
//                         crop.status === 'active'
//                           ? styles.statusActive
//                           : styles.statusInactive,
//                       ]}
//                     >
//                       {crop.status}
//                     </Text>
//                   </View>
//                 </View>
//               </Card>
//             </TouchableOpacity>
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
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'flex-start',
//     padding: 20,
//     paddingTop: 60,
//     backgroundColor: '#fff',
//   },
//   greeting: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#1f2937',
//   },
//   subtitle: {
//     fontSize: 14,
//     color: '#6b7280',
//     marginTop: 4,
//   },
//   logoutButton: {
//     backgroundColor: '#ef4444',
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 8,
//   },
//   logoutText: {
//     color: '#fff',
//     fontWeight: '600',
//     fontSize: 14,
//   },
//   statsGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     padding: 10,
//   },
//   statCard: {
//     width: '48%',
//     margin: '1%',
//     alignItems: 'center',
//     paddingVertical: 20,
//   },
//   statEmoji: {
//     fontSize: 32,
//     marginBottom: 8,
//   },
//   statValue: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#1f2937',
//   },
//   statLabel: {
//     fontSize: 12,
//     color: '#6b7280',
//     marginTop: 4,
//   },
//   section: {
//     padding: 20,
//   },
//   sectionTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#1f2937',
//     marginBottom: 12,
//   },
//   actionsGrid: {
//     flexDirection: 'row',
//     gap: 12,
//   },
//   actionCard: {
//     flex: 1,
//     paddingVertical: 24,
//     borderRadius: 12,
//     alignItems: 'center',
//   },
//   actionEmoji: {
//     fontSize: 32,
//     marginBottom: 8,
//   },
//   actionText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   cropCard: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   cropName: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#1f2937',
//   },
//   cropType: {
//     fontSize: 14,
//     color: '#6b7280',
//     marginTop: 4,
//   },
//   cropStatus: {
//     alignItems: 'flex-end',
//   },
//   statusBadge: {
//     paddingHorizontal: 12,
//     paddingVertical: 4,
//     borderRadius: 12,
//     fontSize: 12,
//     fontWeight: '600',
//     textTransform: 'capitalize',
//   },
//   statusActive: {
//     backgroundColor: '#dcfce7',
//     color: '#16a34a',
//   },
//   statusInactive: {
//     backgroundColor: '#f3f4f6',
//     color: '#6b7280',
//   },
//   emptyText: {
//     textAlign: 'center',
//     color: '#6b7280',
//     fontSize: 14,
//   },
// });

// export default DashboardScreen;

import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { cropsAPI, thermalAPI } from '../config/api';
import Card from '../components/Card';

const DashboardScreen = ({ navigation }) => {
  const { user, logout } = useAuth();
  
  // 1. Fixed: Added loading state (it was missing in your code)
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  
  // 2. Fixed: Ensured keys here match what the UI renders below
  const [stats, setStats] = useState({
    totalCrops: 0,
    activeCrops: 0,
    totalMeasurements: 0,
    processedMeasurements: 0,
  });
  const [recentCrops, setRecentCrops] = useState([]);

  const fetchDashboardData = async () => {
    try {
      // We fetch both at once to be faster
      const [cropsRes, thermalRes] = await Promise.all([
        cropsAPI.getAll(),
        thermalAPI.getAll()
      ]);

      // Safe data extraction
      const cropsData = cropsRes.data.data?.crops || cropsRes.data.data || [];
      const thermalData = thermalRes.data.data?.thermalData || thermalRes.data.data || [];

      // 3. Fixed: Mapping stats correctly to match your UI Labels
      setStats({
        totalCrops: cropsData.length,
        activeCrops: cropsData.filter(c => c.status === 'active' || c.status === 'Active').length,
        totalMeasurements: thermalData.length,
        processedMeasurements: thermalData.filter(t => t.processed).length,
      });

      // Show top 5 newest crops
      setRecentCrops(cropsData.slice(0, 5));
    } catch (error) {
      console.error('Dashboard Error:', error);
      // If it's a network error, Render is likely just waking up
      if (error.message === 'Network Error') {
        console.log("Server cold start - pull to refresh in 10 seconds");
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchDashboardData();
  }, []);

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', onPress: logout, style: 'destructive' },
    ]);
  };

  // Show a spinner only on the very first load
  if (loading && !refreshing) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#16a34a" />
        <Text style={{marginTop: 10}}>Connecting to Farm Server...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      // REFRESH CONTROL IS HERE - This is the correct spot!
      refreshControl={
        <RefreshControl 
          refreshing={refreshing} 
          onRefresh={onRefresh} 
          colors={['#16a34a']} // Android
          tintColor="#16a34a" // iOS
        />
      }
    >
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, {user?.username}! 👋</Text>
          <Text style={styles.subtitle}>Farm Overview</Text>
        </View>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Stats Cards */}
      <View style={styles.statsGrid}>
        <Card style={styles.statCard}>
          <Text style={styles.statEmoji}>🌾</Text>
          <Text style={styles.statValue}>{stats.totalCrops}</Text>
          <Text style={styles.statLabel}>Total Crops</Text>
        </Card>

        <Card style={styles.statCard}>
          <Text style={styles.statEmoji}>✅</Text>
          <Text style={[styles.statValue, { color: '#16a34a' }]}>{stats.activeCrops}</Text>
          <Text style={styles.statLabel}>Active</Text>
        </Card>

        <Card style={styles.statCard}>
          <Text style={styles.statEmoji}>🌡️</Text>
          <Text style={styles.statValue}>{stats.totalMeasurements}</Text>
          <Text style={styles.statLabel}>Readings</Text>
        </Card>

        <Card style={styles.statCard}>
          <Text style={styles.statEmoji}>📊</Text>
          <Text style={[styles.statValue, { color: '#3b82f6' }]}>
            {stats.processedMeasurements}
          </Text>
          <Text style={styles.statLabel}>Analyzed</Text>
        </Card>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity
            style={[styles.actionCard, { backgroundColor: '#16a34a' }]}
            onPress={() => navigation.navigate('Crops')}
          >
            <Text style={styles.actionEmoji}>🌾</Text>
            <Text style={styles.actionText}>My Crops</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionCard, { backgroundColor: '#3b82f6' }]}
            onPress={() => navigation.navigate('AddThermal')}
          >
            <Text style={styles.actionEmoji}>🌡️</Text>
            <Text style={styles.actionText}>Add Data</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Recent Crops */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Crops</Text>
        {recentCrops.length === 0 ? (
          <Card>
            <Text style={styles.emptyText}>No crops found. Add your first crop!</Text>
          </Card>
        ) : (
          recentCrops.map((crop) => (
            <TouchableOpacity
              key={crop._id}
              onPress={() => navigation.navigate('CropDetail', { cropId: crop._id })}
            >
              <Card>
                <View style={styles.cropCard}>
                  <View>
                    <Text style={styles.cropName}>{crop.cropName}</Text>
                    <Text style={styles.cropType}>{crop.cropType}</Text>
                  </View>
                  <View style={styles.cropStatus}>
                    <Text style={[
                      styles.statusBadge,
                      (crop.status?.toLowerCase() === 'active') ? styles.statusActive : styles.statusInactive
                    ]}>
                      {crop.status}
                    </Text>
                  </View>
                </View>
              </Card>
            </TouchableOpacity>
          ))
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3f4f6' },
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', padding: 20, paddingTop: 60, backgroundColor: '#fff' },
  greeting: { fontSize: 22, fontWeight: 'bold', color: '#1f2937' },
  subtitle: { fontSize: 14, color: '#6b7280', marginTop: 4 },
  logoutButton: { backgroundColor: '#fee2e2', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  logoutText: { color: '#ef4444', fontWeight: '600', fontSize: 12 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', padding: 10 },
  statCard: { width: '46%', margin: '2%', alignItems: 'center', paddingVertical: 15 },
  statEmoji: { fontSize: 24, marginBottom: 5 },
  statValue: { fontSize: 24, fontWeight: 'bold', color: '#1f2937' },
  statLabel: { fontSize: 11, color: '#6b7280' },
  section: { padding: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1f2937', marginBottom: 12 },
  actionsGrid: { flexDirection: 'row', gap: 12 },
  actionCard: { flex: 1, paddingVertical: 20, borderRadius: 12, alignItems: 'center' },
  actionEmoji: { fontSize: 28, marginBottom: 5 },
  actionText: { color: '#fff', fontSize: 14, fontWeight: '600' },
  cropCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cropName: { fontSize: 16, fontWeight: '600', color: '#1f2937' },
  cropType: { fontSize: 13, color: '#6b7280' },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10, fontSize: 10, fontWeight: '600', overflow: 'hidden' },
  statusActive: { backgroundColor: '#dcfce7', color: '#16a34a' },
  statusInactive: { backgroundColor: '#f3f4f6', color: '#6b7280' },
  emptyText: { textAlign: 'center', color: '#6b7280', padding: 10 },
});

export default DashboardScreen;