import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
// import WhatsApp from './src/WhatsApp';
import Reanimated from './src/LearnReanimated';

export default function App() {
  return (
    <NavigationContainer>
      <Reanimated />
    </NavigationContainer>
  );
}
