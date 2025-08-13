import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const ColorChangerApp = () => {
  const [backgroundColor, setBackgroundColor] = useState('white');

  // Add this for debugging
  const handlePress = (color) => {
    console.log(`Changing color to: ${color}`);
    setBackgroundColor(color);
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={styles.title}>Color Changer App</Text>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={() => handlePress('white')}
      >
        <Text>Reset to White</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.button}
        onPress={() => handlePress('lightblue')}
      >
        <Text>Light Blue</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.button}
        onPress={() => handlePress('lightgreen')}
      >
        <Text>Light Green</Text>
      </TouchableOpacity>
    </View>
  );
};

// ... rest of the code remains the same