import React from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {Easing, stopClock, Value} from 'react-native-reanimated';

const {
  Clock,
  block,
  cond,
  set,
  startClock,
  timing,
  clockRunning,
  debug,
} = Animated;

function runTiming(clock, value, dest) {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0),
  };

  const config = {
    duration: 5000,
    toValue: new Value(0),
    easing: Easing.inOut(Easing.ease),
  };

  return block([
    cond(
      clockRunning(clock),
      [set(config.toValue, dest)],
      [
        set(state.finished, 0),
        set(state.time, 0),
        set(state.position, value),
        set(state.frameTime, 0),
        set(config.toValue, dest),
        startClock(clock),
      ],
    ),
    timing(clock, state, config),
    cond(state.finished, debug('stop clock', stopClock(clock))),
    state.position,
  ]);
}

export default class AnimatedBox extends React.Component {
  clock = new Clock();
  transX = runTiming(this.clock, -120, 120);

  render() {
    return (
      <View style={styles.container}>
        <Animated.View
          style={[styles.box, {transform: [{translateX: this.transX}]}]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: 150,
    height: 150,
    backgroundColor: 'tomato',
  },
});
