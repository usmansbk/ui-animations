import React from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

const HEADER_HEIGHT = 60;
const BUTTON_SIZE = 40;
const colors = {
  dark: '#00342b',
  primary: '#075e54',
  light: '#25d366',
  underlayColor: 'rgba(225, 225, 225, .3)',
};

const Tab = createMaterialTopTabNavigator();

const Component = () => <View style={styles.container} />;

const IconButton = ({name}) => (
  <TouchableHighlight
    style={styles.button}
    onPress={() => null}
    underlayColor={colors.underlayColor}>
    <View>
      <Icon name={name} size={24} color="white" />
    </View>
  </TouchableHighlight>
);

function AppBar() {
  return (
    <View>
      <StatusBar backgroundColor={colors.dark} barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.title}>WhatsApp</Text>
        <View style={styles.icons}>
          <IconButton name="search" />
          <IconButton name="more-vert" />
        </View>
      </View>
    </View>
  );
}

export default function () {
  return (
    <>
      <AppBar />
      <Tab.Navigator initialRouteName="CHATS" backBehavior="initialRoute">
        <Tab.Screen name="CHATS" component={Component} />
        <Tab.Screen name="STATUS" component={Component} />
        <Tab.Screen name="CALLS" component={Component} />
      </Tab.Navigator>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    height: HEADER_HEIGHT,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  icons: {
    flexDirection: 'row',
  },
  button: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 2,
  },
});
