// import React from 'react';
// import { View, Text, TextInput, StyleSheet } from 'react-native';

// const Input = ({ label, error, ...props }) => {
//   return (
//     <View style={styles.container}>
//       {label && <Text style={styles.label}>{label}</Text>}
//       <TextInput
//         style={[styles.input, error && styles.inputError]}
//         placeholderTextColor="#9ca3af"
//         {...props}
//       />
//       {error && <Text style={styles.error}>{error}</Text>}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     marginBottom: 16,
//   },
//   label: {
//     fontSize: 14,
//     fontWeight: '500',
//     color: '#374151',
//     marginBottom: 6,
//   },
//   input: {
//     backgroundColor: '#fff',
//     borderWidth: 1,
//     borderColor: '#d1d5db',
//     borderRadius: 8,
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     fontSize: 16,
//     color: '#1f2937',
//   },
//   inputError: {
//     borderColor: '#ef4444',
//   },
//   error: {
//     color: '#ef4444',
//     fontSize: 12,
//     marginTop: 4,
//   },
// });

// export default Input;

import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const Input = ({ label, error, ...props }) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[styles.input, error && styles.inputError]}
        placeholderTextColor="#9ca3af"
        {...props}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1f2937',
  },
  inputError: {
    borderColor: '#ef4444',
  },
  error: {
    color: '#ef4444',
    fontSize: 12,
    marginTop: 4,
  },
});

export default Input;