import * as React from 'react';
import {FlatList, Text, StyleSheet, TouchableOpacity, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Gmail from './Gmail';
import DraggableFlatList from './DraggableFlatList';
import InteractiveElements from './InteractiveElements';
import Swipe from './Swipe';
import TwitterProfile from './TwitterProfile';
import WhatsApp from './WhatsApp';
import FacebookStories from './FacebookStories';

const Stack = createStackNavigator();

function Home({navigation}) {
  return (
    <FlatList
      data={routes.slice(1)}
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

const routes = [
  {
    name: 'Home',
    component: Home,
  },
  {
    name: 'Gmail',
    component: Gmail,
  },
  {
    name: 'DraggableFlatList',
    component: DraggableFlatList,
  },
  {
    name: 'InteractiveElements',
    component: InteractiveElements,
  },
  {
    name: 'Swipe',
    component: Swipe,
  },
  {
    name: 'TwitterProfile',
    component: TwitterProfile,
  },
  {
    name: 'WhatsApp',
    component: WhatsApp,
  },
  {
    name: 'Stories',
    component: FacebookStories,
  },
];

export default function App() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {routes.map(({name, component}) => (
        <Stack.Screen key={name} name={name} component={component} />
      ))}
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
