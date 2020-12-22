// https://dribbble.com/shots/14796756-CSS-UI-Interactive-Elements?showSimilarShots=true&_=1608623407187

import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  TouchableHighlight,
  View,
  Animated,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

const INPUT_HEIGHT = 50;
const BALL_HEIGHT = 32;
const SMALL_BALL_HEIGHT = 20;

const colors = [
  '46, 204, 112',
  '39, 174, 96',
  '52, 152, 219',
  '214, 48, 49',
  '142, 68, 173',
  '232, 67, 147',
  '230, 126, 34',
  '241, 196, 15',
  '189, 195, 199',
];

const getColor = (index = 0, opacity = 1) =>
  `rgba(${colors[index]}, ${opacity})`;

export default function InteractiveElements() {
  const [name, setName] = useState("Trader Joe's");
  const [date, setDate] = useState(moment());
  const [colorIndex, setColorIndex] = useState(0);
  const [fullDay, setFullDay] = useState(true);

  const animation = useRef(new Animated.Value(0)).current;
  const textAnimation = useRef(new Animated.Value(1)).current;
  const switchAnimation = useRef(new Animated.Value(fullDay ? 1 : 0)).current;

  const onChangeName = (value) => {
    setName(value);
  };
  const onChangeColor = (newIndex) => {
    setColorIndex(newIndex);
    Animated.timing(animation, {
      toValue: newIndex,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };
  const animateDate = (callback) => {
    Animated.timing(textAnimation, {
      toValue: 0.97,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      callback();
      textAnimation.setValue(1);
    });
  };
  const setToday = () => {
    animateDate(() => setDate(moment()));
  };
  const setTomorrow = () => {
    animateDate(() => setDate(moment().add(1, 'day')));
  };
  const nextDay = () => {
    animateDate(() => setDate(moment(date).add(1, 'day')));
  };
  const toggleFullday = () => {
    const prevValue = fullDay;
    setFullDay((prev) => !prev);
    Animated.timing(switchAnimation, {
      toValue: prevValue ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View>
          <Text style={styles.label}>Event Name</Text>
          <TextInput
            value={name}
            onChangeText={onChangeName}
            style={styles.textInput}
          />
        </View>

        <View style={styles.row}>
          {colors.map((_, index) => {
            return (
              <Ball
                onChangeColor={onChangeColor}
                index={index}
                key={index}
                animation={animation}
              />
            );
          })}
        </View>

        <View>
          <Text style={styles.label}>Start Date</Text>
          <View
            style={[
              styles.picker,
              {
                backgroundColor: getColor(colorIndex, 0.6),
              },
            ]}>
            <TouchableWithoutFeedback>
              <View
                style={[
                  styles.pickerContent,
                  {
                    borderColor: getColor(colorIndex),
                  },
                ]}>
                <View style={styles.buttonRow}>
                  <Animated.Text
                    style={[
                      styles.pickerText,
                      {
                        transform: [
                          {
                            scale: textAnimation,
                          },
                        ],
                      },
                    ]}>
                    {date.format('MMMM DD, YYYY')}
                  </Animated.Text>
                  <Time
                    time={date.format('HH:MM A')}
                    animation={switchAnimation}
                  />
                </View>
                <Icon name="chevron-down" size={20} color="gray" />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>

        <View style={styles.buttons}>
          <View style={styles.buttonRow}>
            <Button text="Today" onPress={setToday} colorIndex={colorIndex} />
            <Button
              text="Tomorrow"
              onPress={setTomorrow}
              colorIndex={colorIndex}
            />
            <Button text="+1" onPress={nextDay} colorIndex={colorIndex} />
          </View>
          <Switch
            text="Full Day"
            value={fullDay}
            onPress={toggleFullday}
            colorIndex={colorIndex}
          />
        </View>
      </View>
    </View>
  );
}

const Ball = ({onChangeColor, index, animation = new Animated.Value(0)}) => {
  return (
    <ScrollView
      key={index}
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.ballContainer}>
      <TouchableWithoutFeedback onPress={() => onChangeColor(index)}>
        <View
          style={[
            styles.ball,
            {
              backgroundColor: getColor(index),
            },
          ]}
        />
      </TouchableWithoutFeedback>
      <Animated.View
        style={[
          styles.indicator,
          {
            transform: [
              {
                translateX: animation.interpolate({
                  inputRange: [index - 1, index, index + 1],
                  outputRange: [-BALL_HEIGHT, 0, BALL_HEIGHT],
                  extrapolate: 'clamp',
                }),
              },
            ],
          },
        ]}
      />
    </ScrollView>
  );
};

const Time = ({time, animation = new Animated.Value(0)}) => {
  return (
    <Animated.View
      style={[
        styles.timeContainer,
        {
          opacity: animation,
        },
      ]}>
      <AnimatedIcon
        style={[
          styles.arrow,
          {
            transform: [
              {
                rotateZ: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '90deg'],
                  extrapolate: 'clamp',
                }),
              },
            ],
          },
        ]}
        color="gray"
        name="arrow-up"
        size={20}
      />
      <Animated.Text
        style={[
          styles.pickerText,
          {
            transform: [
              {
                translateX: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-8, 0],
                  extrapolate: 'clamp',
                }),
              },
            ],
          },
        ]}>
        {time}
      </Animated.Text>
    </Animated.View>
  );
};

const Button = ({text, onPress, colorIndex}) => (
  <TouchableHighlight
    underlayColor={getColor(colorIndex, 0.4)}
    style={styles.button}
    onPress={onPress}>
    <Text style={[styles.buttonText]}>{text}</Text>
  </TouchableHighlight>
);

const Switch = ({text, colorIndex, value, onPress}) => {
  const toggleStyle = {
    left: !value ? 0 : null,
    right: value ? 0 : null,
    borderColor: value ? getColor(colorIndex) : getColor(8),
  };

  const backgroundColorStyle = {
    backgroundColor: value ? getColor(colorIndex) : '#d3d3d3',
  };
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.switchContainer}>
        <Text style={styles.label}>{text}</Text>
        <View style={[styles.switchButton, backgroundColorStyle]}>
          <View style={[styles.toggle, toggleStyle]}>
            <View style={[styles.toggleShadow]} />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: 'white',
  },
  form: {},
  label: {
    fontSize: 18,
    color: 'gray',
  },
  textInput: {
    fontSize: 18,
    color: 'black',
    borderColor: '#d3d3d3',
    borderWidth: 1,
    borderRadius: 8,
    marginVertical: 8,
    paddingHorizontal: 14,
    height: INPUT_HEIGHT,
  },
  picker: {
    height: INPUT_HEIGHT + 2, // 2 is padding
    borderRadius: 8,
    marginVertical: 8,
    padding: 2,
  },
  pickerContent: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingHorizontal: 12,
    borderRadius: 6,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pickerText: {
    fontSize: 18,
    color: 'black',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: '#d3d3d3',
    margin: 8,
    marginHorizontal: 4,
    borderRadius: 4,
  },
  buttonText: {
    fontSize: 16,
    color: 'gray',
    fontWeight: 'bold',
  },
  buttonRow: {
    flexDirection: 'row',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  ball: {
    width: BALL_HEIGHT,
    height: BALL_HEIGHT,
    borderRadius: BALL_HEIGHT / 2,
  },
  ballContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicator: {
    position: 'absolute',
    width: SMALL_BALL_HEIGHT,
    height: SMALL_BALL_HEIGHT,
    borderRadius: SMALL_BALL_HEIGHT / 2,
    backgroundColor: 'white',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  switchButton: {
    justifyContent: 'center',
    marginLeft: 8,
    height: BALL_HEIGHT,
    width: (BALL_HEIGHT - BALL_HEIGHT * 0.1) * 2,
    borderRadius: BALL_HEIGHT / 2,
  },
  toggle: {
    position: 'absolute',
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: BALL_HEIGHT,
    height: BALL_HEIGHT,
    borderRadius: BALL_HEIGHT / 2,
    backgroundColor: 'white',
    borderWidth: 2,
  },
  toggleShadow: {
    borderRadius: (BALL_HEIGHT - 4) / 2,
    width: BALL_HEIGHT - 4,
    height: BALL_HEIGHT - 4,
    backgroundColor: 'white',
    elevation: 4,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrow: {
    marginHorizontal: 4,
  },
});
