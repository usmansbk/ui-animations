// https://dribbble.com/shots/14796756-CSS-UI-Interactive-Elements?showSimilarShots=true&_=1608623407187

import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  TouchableHighlight,
  View,
} from 'react-native';
import moment from 'moment';

const INPUT_HEIGHT = 50;
const BALL_HEIGHT = 32;
const SMALL_BALL_HEIGHT = 20;

const colors = [
  '46, 204, 112',
  '39, 174, 96',
  '52, 152, 219',
  '155, 89, 182',
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

  const onChangeName = (value) => setName(value);
  const onChangeColor = (newIndex) => setColorIndex(newIndex);
  const setToday = () => setDate(moment());
  const setTomorrow = () => setDate(moment().add(1, 'day'));
  const nextDay = () => setDate(moment(date).add(1, 'day'));

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
              <TouchableWithoutFeedback
                key={index}
                onPress={() => onChangeColor(index)}>
                <View style={styles.ballContainer}>
                  <View
                    style={[
                      styles.ball,
                      {
                        backgroundColor: getColor(index),
                      },
                    ]}
                  />
                  {index === colorIndex && <View style={styles.indicator} />}
                </View>
              </TouchableWithoutFeedback>
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
                <Text style={styles.pickerText}>
                  {date.format('MMMM DD, YYYY')}
                </Text>
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
          <Switch text="Full Day" />
        </View>
      </View>
    </View>
  );
}

const Button = ({text, onPress, colorIndex}) => (
  <TouchableHighlight
    underlayColor={getColor(colorIndex, 0.4)}
    style={styles.button}
    onPress={onPress}>
    <Text style={[styles.buttonText]}>{text}</Text>
  </TouchableHighlight>
);

const Switch = ({text, colorIndex}) => {
  return (
    <View style={styles.switchContainer}>
      <Text style={styles.label}>{text}</Text>
      <View
        style={[
          styles.switchButton,
          {
            backgroundColor: getColor(colorIndex),
          },
        ]}>
        <View
          style={[
            styles.toggle,
            {
              borderColor: getColor(colorIndex),
            },
          ]}
        />
      </View>
    </View>
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
    width: BALL_HEIGHT,
    height: BALL_HEIGHT,
    borderRadius: BALL_HEIGHT / 2,
    backgroundColor: 'white',
    borderWidth: 2,
  },
});
