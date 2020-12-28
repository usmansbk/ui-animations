import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';

const data = Array.from(new Array(50).fill(0).map((_, index) => index + ''));

export default function DraggableFlatList() {
  const renderItem = ({item, index}) => {
    return (
      <View
        style={[
          styles.itemContainer,
          {backgroundColor: getColor(index), height: getRandomHeight()},
        ]}>
        <Text style={styles.text}>{item}</Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  itemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});

const MIN_HEIGHT = 40;
const MAX_HEIGHT = 90;
const DIFF_HEIGHT = MAX_HEIGHT - MIN_HEIGHT;
const getColor = (index) => colors[index % colors.length];
const getRandomHeight = () => Math.random() * DIFF_HEIGHT + MIN_HEIGHT;

const colors = [
  '#3498db',
  '#1abc9c',
  '#2ecc71',
  '#3498db',
  '#34495e',
  '#16a085',
  '#27ae60',
  '#2980b9',
  '#8e44ad',
  '#f1c40f',
  '#e67e22',
  '#e74c3c',
  '#f39c12',
  '#d35400',
];
