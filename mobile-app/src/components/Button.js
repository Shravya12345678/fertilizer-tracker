// import React from 'react';
// import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';

// const Button = ({ title, onPress, loading, variant = 'primary', disabled, style }) => {
//   const buttonStyle = variant === 'primary' ? styles.primary : styles.secondary;

//   return (
//     <TouchableOpacity
//       style={[styles.button, buttonStyle, disabled && styles.disabled, style]}
//       onPress={onPress}
//       disabled={disabled || loading}
//     >
//       {loading ? (
//         <ActivityIndicator color="#fff" />
//       ) : (
//         <Text style={styles.text}>{title}</Text>
//       )}
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   button: {
//     paddingVertical: 14,
//     paddingHorizontal: 20,
//     borderRadius: 8,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   primary: {
//     backgroundColor: '#16a34a',
//   },
//   secondary: {
//     backgroundColor: '#3b82f6',
//   },
//   disabled: {
//     backgroundColor: '#9ca3af',
//   },
//   text: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });

// export default Button;

import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';

const Button = ({ title, onPress, loading, variant = 'primary', disabled, style }) => {
  const buttonStyle = variant === 'primary' ? styles.primary : styles.secondary;

  return (
    <TouchableOpacity
      style={[styles.button, buttonStyle, disabled && styles.disabled, style]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: '#16a34a',
  },
  secondary: {
    backgroundColor: '#3b82f6',
  },
  disabled: {
    backgroundColor: '#9ca3af',
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Button;