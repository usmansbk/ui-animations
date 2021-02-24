import * as React from 'react';
import {FlatList, Text, StyleSheet, TouchableOpacity, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Gmail from './Gmail';
import DraggableFlatList from './DraggableFlatList';
import InteractiveElements from './InteractiveElements';
import Swipe from './Swipe';
import TwitterProfile from './TwitterProfile';
import WhatsApp from './WhatsApp';

const Stack = createStackNavigator();

const routes = [
  {
    name: 'Gmail',
  },
  {
    name: 'DraggableFlatList',
  },
  {
    name: 'InteractiveElements',
  },
  {
    name: 'Swipe',
  },
  {
    name: 'TwitterProfile',
  },
  {
    name: 'WhatsApp',
  },
];

function Home({navigation}) {
  return (
    <FlatList
      data={routes}
      keyExtractor={(item) => item.name}
      renderItem={({item}) => (
        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.navigate(item.name)}>
          <Text style={styles.text}>{item.name}</Text>
        </TouchableOpacity>
      )}
      ItemSeparatorComponent={() => <View style={styles.divider} />}
    />
  );
}

export default function App() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Gmail" component={Gmail} />
      <Stack.Screen name="DraggableFlatList" component={DraggableFlatList} />
      <Stack.Screen
        name="InteractiveElements"
        component={InteractiveElements}
      />
      <Stack.Screen name="Swipe" component={Swipe} />
      <Stack.Screen name="TwitterProfile" component={TwitterProfile} />
      <Stack.Screen name="WhatsApp" component={WhatsApp} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 16,
  },
  text: {
    fontSize: 20,
    fontFamily: 'Lato-Regular',
  },
  divider: {
    height: 1,
    backgroundColor: '#D4D7D4',
  },
});
