import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
} from 'react-native';
import moment from 'moment';

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
  const [date] = useState(moment());
  const [colorIndex] = useState(0);

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View>
          <Text style={styles.label}>Event Name</Text>
          <TextInput
            value={name}
            onChangeText={(text) => setName(text)}
            style={styles.textInput}
          />
        </View>

        <View>
          <Text style={styles.label}>Start Date</Text>
          <View style={[styles.picker, styles.pickerOuterBorder]}>
            <TouchableWithoutFeedback>
              <View style={[styles.pickerContent]}>
                <Text style={styles.pickerText}>
                  {date.format('MMMM DD, YYYY')}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>

        <View style={styles.buttons}>
          <TouchableWithoutFeedback>
            <Text style={[styles.button, styles.buttonText]}>Today</Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <Text style={[styles.button, styles.buttonText]}>Tomorrow</Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <Text style={[styles.button, styles.buttonText]}>+1</Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  );
}

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
    height: 50,
  },
  picker: {
    height: 52,
    backgroundColor: getColor(6, 0.8),
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
    borderColor: getColor(6),
    alignItems: 'center',
  },
  pickerText: {
    fontSize: 18,
    color: 'black',
  },
  buttons: {
    flexDirection: 'row',
  },
  button: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: '#d3d3d3',
    margin: 8,
    borderRadius: 4,
  },
  buttonText: {
    fontSize: 16,
    color: 'gray',
    fontWeight: 'bold',
  },
});
