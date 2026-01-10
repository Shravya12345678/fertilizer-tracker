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
// import { useAuth } from '../contexts/AuthContext';
// import Input from '../components/Input';
// import Button from '../components/Button';

// const LoginScreen = ({ navigation }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const { login } = useAuth();

//   const handleLogin = async () => {
//     if (!email || !password) {
//       Alert.alert('Error', 'Please fill all fields');
//       return;
//     }

//     setLoading(true);
//     const result = await login(email, password);
//     setLoading(false);

//     if (!result.success) {
//       Alert.alert('Login Failed', result.error);
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       style={styles.container}
//     >
//       <ScrollView contentContainerStyle={styles.scrollContent}>
//         <View style={styles.header}>
//           <Text style={styles.logo}>🌾</Text>
//           <Text style={styles.title}>Fertilizer Tracker</Text>
//           <Text style={styles.subtitle}>Sign in to your account</Text>
//         </View>

//         <View style={styles.form}>
//           <Input
//             label="Email"
//             placeholder="farmer@example.com"
//             value={email}
//             onChangeText={setEmail}
//             keyboardType="email-address"
//             autoCapitalize="none"
//           />

//           <Input
//             label="Password"
//             placeholder="••••••••"
//             value={password}
//             onChangeText={setPassword}
//             secureTextEntry
//           />

//           <Button
//             title="Sign In"
//             onPress={handleLogin}
//             loading={loading}
//             style={styles.button}
//           />

//           <Text style={styles.registerText}>
//             Don't have an account?{' '}
//             <Text
//               style={styles.registerLink}
//               onPress={() => navigation.navigate('Register')}
//             >
//               Register here
//             </Text>
//           </Text>

//           <Text style={styles.demo}>
//             Demo: demo@fertilizer-tracker.com / demo123
//           </Text>
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
//   scrollContent: {
//     flexGrow: 1,
//     justifyContent: 'center',
//     padding: 20,
//   },
//   header: {
//     alignItems: 'center',
//     marginBottom: 40,
//   },
//   logo: {
//     fontSize: 60,
//     marginBottom: 10,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#1f2937',
//     marginBottom: 8,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: '#6b7280',
//   },
//   form: {
//     width: '100%',
//   },
//   button: {
//     marginTop: 8,
//   },
//   registerText: {
//     textAlign: 'center',
//     marginTop: 20,
//     color: '#6b7280',
//     fontSize: 14,
//   },
//   registerLink: {
//     color: '#16a34a',
//     fontWeight: '600',
//   },
//   demo: {
//     textAlign: 'center',
//     marginTop: 20,
//     color: '#9ca3af',
//     fontSize: 12,
//   },
// });

// export default LoginScreen;

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import Input from '../components/Input';
import Button from '../components/Button';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    setLoading(true);
    const result = await login(email, password);
    setLoading(false);

    if (!result.success) {
      Alert.alert('Login Failed', result.error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.logo}>🌾</Text>
          <Text style={styles.title}>Fertilizer Tracker</Text>
          <Text style={styles.subtitle}>Sign in to your account</Text>
        </View>

        <View style={styles.form}>
          <Input
            label="Email"
            placeholder="farmer@example.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Input
            label="Password"
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <Button
            title="Sign In"
            onPress={handleLogin}
            loading={loading}
            style={styles.button}
          />

          <Text style={styles.registerText}>
            Don't have an account?{' '}
            <Text
              style={styles.registerLink}
              onPress={() => navigation.navigate('Register')}
            >
              Register here
            </Text>
          </Text>

          <Text style={styles.demo}>
            Demo: demo@fertilizer-tracker.com / demo123
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    fontSize: 60,
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  form: {
    width: '100%',
  },
  button: {
    marginTop: 8,
  },
  registerText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#6b7280',
    fontSize: 14,
  },
  registerLink: {
    color: '#16a34a',
    fontWeight: '600',
  },
  demo: {
    textAlign: 'center',
    marginTop: 20,
    color: '#9ca3af',
    fontSize: 12,
  },
});

export default LoginScreen;