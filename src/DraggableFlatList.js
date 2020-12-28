import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableWithoutFeedback,
  PanResponder,
  FlatList,
  // Dimensions,
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

// const {height: SCREEN_HEIGHT} = Dimensions.get('window');
const MIN_ITEM_HEIGHT = 40;
const MAX_ITEM_HEIGHT = 90;
const DIFF_HEIGHT = MAX_ITEM_HEIGHT - MIN_ITEM_HEIGHT;
const getColor = (index) => colors[index % colors.length];
const getRandomHeight = () => Math.random() * DIFF_HEIGHT + MIN_ITEM_HEIGHT;
const FONT_SIZE = 20;

const data = Array.from(
  new Array(50).fill(0).map((_, index) => ({
    id: index + '',
    index,
    text: index,
    color: getColor(index),
    height: getRandomHeight(),
  })),
);

export default class DraggableFlatList extends React.Component {
  state = {
    activeItem: null,
  };

  itemRefs = {};
  activePositionY = new Animated.Value(0);
  activeSize = new Animated.ValueXY();
  scrollY = new Animated.Value(0);
  animating = false;

  _panY = PanResponder.create({
    onMoveShouldSetPanResponder: () => {
      if (this.state.activeItem) {
        return true;
      }
      return false;
    },
    onPanResponderMove: (_, {dy}) => {
      if (this.state.activeItem) {
        this.scrollY.setValue(dy);
      }
    },
    onPanResponderRelease: () => this.reset(),
    onPanResponderTerminate: () => this.reset(),
  });

  reset = () => {
    if (!this.animating && this.state.activeItem) {
      this.animating = true;
      Animated.timing(this.scrollY, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start(() => {
        this.setState({activeItem: null}, () => (this.animating = false));
      });
    }
  };

  renderItem = ({item, index}) => {
    const {activeItem} = this.state;
    const activeStyle = {
      opacity: activeItem?.id === item.id ? 0 : 1,
    };

    return (
      <TouchableWithoutFeedback
        onLayout={() => null}
        onLongPress={() => {
          this.itemRefs[index].measure(
            (_x, _y, width, height, _pageX, pageY) => {
              this.activeSize.setValue({
                x: width,
                y: height,
              });
              this.setState({activeItem: item}, () => {
                this.activePositionY.setValue(pageY);
              });
            },
          );
        }}>
        <Animated.View
          onTouchEnd={this.reset}
          ref={(ref) => (this.itemRefs[index] = ref)}
          style={[
            styles.itemContainer,
            {
              backgroundColor: item.color,
              height: item.height,
            },
            activeStyle,
          ]}>
          <Text style={styles.text}>{item.text}</Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  };

  renderActiveItem = (item) => {
    if (!item) {
      return null;
    }
    return (
      <Animated.View
        pointerEvents="none"
        style={[
          styles.itemContainer,
          styles.activeItem,
          {
            backgroundColor: item.color,
            height: Animated.add(this.activeSize.y, 2),
            top: this.activePositionY,
            transform: [
              {
                translateY: this.scrollY,
              },
            ],
          },
        ]}>
        <Text style={styles.text}>{item.text}</Text>
      </Animated.View>
    );
  };

  render() {
    const {activeItem} = this.state;

    return (
      <View style={styles.container} {...this._panY.panHandlers}>
        <FlatList
          scrollEnabled={!activeItem}
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={this.renderItem}
        />
        {this.renderActiveItem(activeItem)}
      </View>
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
    fontSize: FONT_SIZE,
    fontWeight: 'bold',
    color: 'white',
  },
  activeItem: {
    position: 'absolute',
    width: '100%',
    elevation: 32,
  },
});
