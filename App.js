import React from 'react';
import { View } from 'react-native';
//import CounterApp from './CounterApp';
//import ColorChangerApp from './ColorChangerApp';
//import ChatAndCommentApp from './ChatAndCommentApp';
import ChatHead from "./ChatHead";
const App = () => {
  return (
    <View style={{ flex: 1 }}>
     {/* <ColorChangerApp /> */}
      {/*<CounterApp/> */}
     {/* <ChatAndCommentApp/>*/}
       <ChatHead/>
    </View>
  );
};

export default App;
