import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableWithoutFeedback,
  PanResponder,
  FlatList,
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
const getRandomHeight = () =>
  Math.floor(Math.random() * DIFF_HEIGHT + MIN_ITEM_HEIGHT);
const FONT_SIZE = 20;

const listData = Array.from(
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
    data: listData,
    activeItem: null,
    nextItem: null,
  };

  itemRefs = {};

  activePositionY = new Animated.Value(0);
  activeHeight = new Animated.Value(0);
  scrollY = new Animated.Value(0);

  animating = false;
  animations = {};

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

      const {activeItem, data} = this.state;

      const currentIndex = this.currentIndex || activeItem.index;
      const absMoveY = Math.abs(dy);
      const dragY = this.dragY || 0;
      const dragDown = absMoveY - dragY > 0;

      const nextIndex = dragDown ? currentIndex + 1 : currentIndex - 1;

      if (nextIndex >= 0 && nextIndex <= data.length - 1) {
        const nextItemRef = this.itemRefs[nextIndex];
        const activeItemRef = this.itemRefs[activeItem.index];

        nextItemRef.measure((_x, _y, _width, nextHeight) => {
          activeItemRef.measure((_tx, _ty, _twidth, currentHeight) => {
            const nextAnim = this.animations[nextIndex];

            if (
              Math.abs(absMoveY - dragY) >= nextHeight &&
              this.currentIndex !== nextIndex
            ) {
              if (!this.animating) {
                this.animating = true;
                Animated.timing(nextAnim, {
                  toValue: dragDown ? -currentHeight : currentHeight,
                  duration: 200,
                  useNativeDriver: false,
                }).start(() => {
                  this.animating = false;
                  this.currentIndex = nextIndex;
                  this.dragY = absMoveY;
                  nextAnim.flattenOffset();
                });
              }
            }
          });
        });
      }
    },
    onPanResponderTerminate: () => {
      this.reset();
    },
  });

  reset = () => {
    this.setState(
      (state) => {
        if (this.currentIndex && state.activeItem.index !== this.currentIndex) {
          const swapped = [...state.data];
          swapped[state.activeItem.index] = state.data[this.currentIndex];
          swapped[this.currentIndex] = state.activeItem;
          return {
            activeItem: null,
            data: swapped,
          };
        }
        return {
          activeItem: null,
        };
      },
      () => {
        this.scrollY.setValue(0);
        this.activeHeight.setValue(0);
        this.activePositionY.setValue(0);
        Object.values(this.animations).forEach((anim) => anim.setValue(0));
      },
    );
  };

  renderItem = ({item, index}) => {
    const {activeItem} = this.state;
    const activeStyle = {
      opacity: activeItem?.id === item.id ? 0 : 1,
    };
    const animY = new Animated.Value(0);
    this.animations[item.id] = animY;

    const shiftStyle = {
      transform: [
        {
          translateY: animY,
        },
      ],
    };
    return (
      <TouchableWithoutFeedback
        onLayout={() => null}
        onLongPress={() => {
          this.itemRefs[index].measure(
            (_x, _y, _width, height, _pageX, pageY) => {
              this.activeHeight.setValue(height);
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
            shiftStyle,
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
            height: Animated.add(this.activeHeight, 2),
            top: Animated.add(this.activePositionY, -1),
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
    const {activeItem, data} = this.state;

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
