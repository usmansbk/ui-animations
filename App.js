import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Screens from './src';

export default function App() {
  return (
    <NavigationContainer>
      <Screens />
    </NavigationContainer>
  );
}
