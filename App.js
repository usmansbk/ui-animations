import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Swipe from './src/Swipe';

export default function App() {
  return (
    <NavigationContainer>
      <Swipe />
    </NavigationContainer>
  );
}
