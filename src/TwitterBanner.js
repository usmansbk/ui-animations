import React from 'react';
import {View, ScrollView, Text, StyleSheet} from 'react-native';

export default function Banner() {
  return (
    <View style={styles.container}>
      <View style={styles.banner}>
        <ScrollView
          style={[styles.black, styles.part]}
          contentContainerStyle={styles.content}>
          <Text style={[styles.text, styles.yellowText]}>USMAN</Text>
        </ScrollView>
        <ScrollView
          style={[styles.yellow, styles.part]}
          contentContainerStyle={styles.content}>
          <Text style={[styles.text, styles.blackText]}>USMAN</Text>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  banner: {
    backgroundColor: 'tomato',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: '16%',
  },
  text: {
    fontSize: 50,
    fontWeight: 'bold',
  },
  black: {
    backgroundColor: 'black',
  },
  yellowText: {
    color: 'yellow',
    right: '-51.5%',
  },
  yellow: {
    backgroundColor: 'yellow',
  },
  blackText: {
    left: '-48.5%',
  },
  part: {
    height: '100%',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
});
