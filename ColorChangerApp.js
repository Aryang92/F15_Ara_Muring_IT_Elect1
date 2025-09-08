
// ColorChangerApp.js
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const ColorChangerApp = () => {
  const [backgroundColor, setBackgroundColor] = useState('white');

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={styles.title}>Color Changer App</Text>
      <View style={styles.buttonContainer}>
        <Button 
          title="White" 
          onPress={() => setBackgroundColor('white')} 
        />
        <Button 
          title="Light Blue" 
          onPress={() => setBackgroundColor('#add8e6')} 
        />
        <Button 
          title="Light Green" 
          onPress={() => setBackgroundColor('#90ee90')} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
});

export default ColorChangerApp;
