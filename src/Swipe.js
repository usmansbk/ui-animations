import React from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const colors = {
  background: '#7FACDE',
  gray: '#D4D7D4',
};

class Swipe extends React.Component {
  render() {
    return (
      <View style={[styles.container]}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={colors.background}
        />
        <View style={styles.header}>
          <Text style={styles.title}>Artists</Text>
        </View>
        <View style={styles.cards}></View>
        <View style={styles.row}>
          <Button name="close" />
          <Button name="heart" primary />
        </View>
      </View>
    );
  }
}

const BUTTON_SIZE = 60;
function Button({name, primary}) {
  return (
    <TouchableOpacity style={[styles.button, primary && styles.primaryBtn]}>
      <Icon
        name={name}
        size={BUTTON_SIZE / 2}
        color={primary ? '#fff' : '#000'}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 32,
  },
  button: {
    margin: 8,
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    elevation: 4,
  },
  primaryBtn: {
    backgroundColor: 'tomato',
  },
  cards: {
    flex: 1,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 27,
    color: 'white',
  },
});

export default Swipe;
