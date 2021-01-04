import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import WhatsApp from './src/WhatsApp';

export default function App() {
  return (
    <NavigationContainer>
      <WhatsApp />
    </NavigationContainer>
  );
}
