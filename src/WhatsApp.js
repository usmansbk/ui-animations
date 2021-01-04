import React from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Dimensions,
  TouchableNativeFeedback,
} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Animated, {Extrapolate} from 'react-native-reanimated';
import {RectButton} from 'react-native-gesture-handler';

const {width} = Dimensions.get('window');
const HEADER_HEIGHT = 56;
const BUTTON_SIZE = 40;
const TAB_BUTTON_WIDTH = (width - width * 0.1) / 3;
const CAMERA_BUTTON_WIDTH = width * 0.1;
const TAB_HEIGHT = 48;
const INDICATOR_HEIGHT = 3;
const FAB_SIZE = 56;
const colors = {
  dark: '#00342b',
  primary: '#075e54',
  light: '#25d366',
  underlayColor: 'rgba(225, 225, 225, .3)',
  gray: '#455A64',
  lightGray: '#f2f2f2',
};

const Tab = createMaterialTopTabNavigator();

const Screen = () => <View style={styles.container} />;

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

function TabBar({state, navigation, position}) {
  const inputRange = state.routes.map((_, i) => i);
  const widthOutputRange = inputRange.map((i) =>
    i === 0 ? CAMERA_BUTTON_WIDTH : TAB_BUTTON_WIDTH,
  );
  const translateXOutputRange = inputRange.map((i) => {
    if (i === 0) {
      return 0;
    } else if (i === 1) {
      return CAMERA_BUTTON_WIDTH;
    } else {
      return TAB_BUTTON_WIDTH * (i - 1) + CAMERA_BUTTON_WIDTH;
    }
  });

  const translateYOutputRange = inputRange.map((i) => {
    if (i === 2) {
      return -FAB_SIZE / 8;
    }
    return FAB_SIZE;
  });

  const elevationOutputRange = inputRange.map((i) => {
    if (i === 2) {
      return 10;
    }
    return 0;
  });

  return (
    <>
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

            const opacity = index === state.index ? 1 : 0.5;

            if (route.name === 'CAMERA') {
              return (
                <View key={route.name}>
                  <TabIconButton
                    isFocused={isFocused}
                    onPress={onPress}
                    opacity={opacity}
                  />
                </View>
              );
            }
            return (
              <View key={route.name}>
                <TabButton
                  label={label}
                  onPress={onPress}
                  isFocused={isFocused}
                  opacity={opacity}
                />
              </View>
            );
          })}
        </View>
        <Animated.View
          style={[
            styles.indicator,
            {
              width: Animated.interpolate(position, {
                inputRange,
                outputRange: widthOutputRange,
                extrapolate: Extrapolate.CLAMP,
              }),
              transform: [
                {
                  translateX: Animated.interpolate(position, {
                    inputRange,
                    outputRange: translateXOutputRange,
                    extrapolate: Extrapolate.CLAMP,
                  }),
                },
              ],
            },
          ]}
        />
      </View>
      <Animated.View
        style={[
          styles.smallfabContainer,
          {
            elevation: Animated.interpolate(position, {
              inputRange,
              outputRange: elevationOutputRange,
              extrapolate: Extrapolate.CLAMP,
            }),
            transform: [
              {
                translateY: Animated.interpolate(position, {
                  inputRange,
                  outputRange: translateYOutputRange,
                  extrapolate: Extrapolate.CLAMP,
                }),
              },
            ],
          },
        ]}>
        <SmallFAB />
      </Animated.View>
      <FAB index={state.index} />
    </>
  );
}

function SmallFAB() {
  return (
    <RectButton style={styles.smallfab}>
      <View>
        <Icon name="edit" size={24} color={colors.gray} />
      </View>
    </RectButton>
  );
}

function FAB({index}) {
  let name;
  if (index === 0) {
    name = 'chat';
  } else if (index === 1) {
    name = 'chat';
  } else if (index === 2) {
    name = 'photo-camera';
  } else if (index === 3) {
    name = 'add-call';
  }
  return (
    <RectButton style={styles.fab}>
      <View>
        <Icon name={name} size={24} color="white" />
      </View>
    </RectButton>
  );
}

function TabIconButton({isFocused, onPress, opacity}) {
  return (
    <TouchableNativeFeedback
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={isFocused ? {selected: true} : {}}>
      <View style={[styles.iconTabButton, {opacity}]}>
        <Icon name="camera-alt" size={24} color="white" />
      </View>
    </TouchableNativeFeedback>
  );
}

function TabButton({label, onPress, isFocused, opacity}) {
  return (
    <TouchableNativeFeedback
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={isFocused ? {selected: true} : {}}>
      <View style={styles.tabButton}>
        <Animated.Text style={[styles.label, {opacity}]}>{label}</Animated.Text>
      </View>
    </TouchableNativeFeedback>
  );
}

export default function Home() {
  return (
    <View style={styles.container}>
      <Tab.Navigator
        tabBar={(props) => <TabBar {...props} />}
        initialRouteName="CHATS"
        backBehavior="initialRoute"
        initialLayout={{width}}>
        <Tab.Screen name="CAMERA" component={Screen} />
        <Tab.Screen name="CHATS" component={Screen} />
        <Tab.Screen name="STATUS" component={Screen} />
        <Tab.Screen name="CALLS" component={Screen} />
      </Tab.Navigator>
    </View>
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
    height: HEADER_HEIGHT + TAB_HEIGHT + INDICATOR_HEIGHT,
    backgroundColor: colors.primary,
  },
  tabBar: {
    height: TAB_HEIGHT,
    width: '100%',
    flexDirection: 'row',
  },
  tabButton: {
    height: '100%',
    width: TAB_BUTTON_WIDTH,
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
  indicator: {
    height: INDICATOR_HEIGHT,
    backgroundColor: 'white',
  },
  fab: {
    width: FAB_SIZE,
    height: FAB_SIZE,
    borderRadius: FAB_SIZE / 2,
    backgroundColor: colors.light,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    right: 0,
    margin: 16,
    elevation: 10,
  },
  smallfabContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    elevation: 10,
    position: 'absolute',
    right: 0,
    bottom: FAB_SIZE,
    marginHorizontal: 20,
    marginVertical: 24,
  },
  smallfab: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lightGray,
  },
});
