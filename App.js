// App.js
import React from 'react';
import { View } from 'react-native';
import CounterApp from './CounterApp';
import ColorChangerApp from './ColorChangerApp';

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      {/* Uncomment the component you want to display */}
      <CounterApp />
      {/* <ColorChangerApp /> */}
    </View>
  );
};

export default App;
