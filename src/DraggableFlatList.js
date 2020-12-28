import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';

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
const MIN_ITEM_HEIGHT = 40;
const MAX_ITEM_HEIGHT = 90;
const DIFF_HEIGHT = MAX_ITEM_HEIGHT - MIN_ITEM_HEIGHT;
const getColor = (index) => colors[index % colors.length];
const getRandomHeight = () => Math.random() * DIFF_HEIGHT + MIN_ITEM_HEIGHT;

const data = Array.from(
  new Array(50).fill(0).map((_, index) => ({
    id: index + '',
    text: index,
    color: getColor(index),
    height: getRandomHeight(),
  })),
);

export default class DraggableFlatList extends React.Component {
  state = {
    activeItem: null,
  };

  renderItem = ({item}) => {
    const activeStyle = {
      opacity: this.state.activeItem?.id === item.id ? 0 : 1,
    };
    return (
      <TouchableWithoutFeedback
        onLongPress={() => this.setState({activeItem: item})}>
        <View
          style={[
            styles.itemContainer,
            {
              backgroundColor: item.color,
              height: item.height,
            },
            activeStyle,
          ]}>
          <Text style={styles.text}>{item.text}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  renderActiveItem = (item) => {
    return (
      <TouchableWithoutFeedback
        onLongPress={() => this.setState({activeItem: item})}>
        <View
          style={[
            styles.itemContainer,
            styles.activeItem,
            {backgroundColor: item.color, height: item.height + 2},
          ]}>
          <Text style={styles.text}>{item.text}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  render() {
    const {activeItem} = this.state;
    return (
      <Animated.View style={styles.container}>
        <Animated.FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={this.renderItem}
        />
        {!!activeItem && this.renderActiveItem(activeItem)}
      </Animated.View>
    );
  }
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
  activeItem: {
    elevation: 24,
  },
});