// CounterApp.js
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const CounterApp = () => {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Counter App</Text>
      <Text style={styles.count}>Count: {count}</Text>
      <View style={styles.buttonContainer}>
        <Button 
          title="Increment (+1)" 
          onPress={() => setCount(count + 1)} 
        />
        <View style={styles.buttonSpacer} />
        <Button 
          title="Decrement (-1)" 
          onPress={() => setCount(count - 1)} 
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
  count: {
    fontSize: 20,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  buttonSpacer: {
    width: 10, // Adds space between buttons
  },
});

export default CounterApp;