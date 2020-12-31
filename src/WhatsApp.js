import React from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Dimensions,
} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';

const {width} = Dimensions.get('window');
const HEADER_HEIGHT = 56;
const BUTTON_SIZE = 40;
const TAB_HEIGHT = 48;
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

function TabBar({state, navigation}) {
  return (
    <View style={styles.tabContainer}>
      <AppBar />
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const label = route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };
          if (route.name === 'CAMERA') {
            return (
              <TabIconButton
                key={route.name}
                isFocused={isFocused}
                onPress={onPress}
              />
            );
          }
          return (
            <TabButton
              key={route.name}
              label={label}
              onPress={onPress}
              isFocused={isFocused}
            />
          );
        })}
      </View>
    </View>
  );
}

function TabIconButton({isFocused, onPress}) {
  const activeOpacity = {
    opacity: isFocused ? 1 : 0.5,
  };
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View style={styles.iconTabButton}>
        <Icon name="camera-alt" size={24} color="white" style={activeOpacity} />
      </View>
    </TouchableNativeFeedback>
  );
}

function TabButton({label, onPress, isFocused}) {
  const activeOpacity = {
    opacity: isFocused ? 1 : 0.5,
  };
  return (
    <TouchableNativeFeedback
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={isFocused ? {selected: true} : {}}>
      <View style={styles.tabButton}>
        <Text style={[styles.label, activeOpacity]}>{label}</Text>
      </View>
    </TouchableNativeFeedback>
  );
}

export default function Home() {
  return (
    <Tab.Navigator
      tabBar={(props) => <TabBar {...props} />}
      initialRouteName="CHATS"
      backBehavior="initialRoute">
      <Tab.Screen name="CAMERA" component={Component} />
      <Tab.Screen name="CHATS" component={Component} />
      <Tab.Screen name="STATUS" component={Component} />
      <Tab.Screen name="CALLS" component={Component} />
    </Tab.Navigator>
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
  tabContainer: {
    elevation: 10,
    height: HEADER_HEIGHT + TAB_HEIGHT,
  },
  tabBar: {
    height: TAB_HEIGHT,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: colors.primary,
  },
  tabButton: {
    height: '100%',
    width: (width - width * 0.1) / 3,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconTabButton: {
    width: width * 0.1,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
