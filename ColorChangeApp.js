import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ColorChangerApp = () => {
  const [backgroundColor, setBackgroundColor] = useState('white');

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={styles.title}>Color Changer App</Text>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={() => setBackgroundColor('white')}
      >
        <Text>Reset to White</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.button}
        onPress={() => setBackgroundColor('lightblue')}
      >
        <Text>Light Blue</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.button}
        onPress={() => setBackgroundColor('lightgreen')}
      >
        <Text>Light Green</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
});

export default ColorChangerApp;