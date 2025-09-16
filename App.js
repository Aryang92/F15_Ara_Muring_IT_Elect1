import React from 'react';
import { View } from 'react-native';
//import CounterApp from './CounterApp';
//import ColorChangerApp from './ColorChangerApp';
import ChatAndCommentApp from './ChatAndCommentApp';

const App = () => {
  return (
    <View style={{ flex: 1 }}>
     {/* <ColorChangerApp /> */}
      {/*<CounterApp/> */}
      <ChatAndCommentApp/>
    </View>
  );
};

export default App;
