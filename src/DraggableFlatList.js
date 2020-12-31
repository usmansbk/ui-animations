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

const EPSILON = 2;
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
    text: index,
    color: getColor(index),
    height: getRandomHeight(),
  })),
);

/**
 * I got this function from BenAwad code, which he got from StackOverflow
 * https://github.com/benawad/drag-and-drop-flatlist/blob/1_reordering/App.tsx
 */
function immutableMove(arr, from, to) {
  return arr.reduce((prev, current, idx, self) => {
    if (from === to) {
      prev.push(current);
    }
    if (idx === from) {
      return prev;
    }
    if (from < to) {
      prev.push(current);
    }
    if (idx === to) {
      prev.push(self[from]);
    }
    if (from > to) {
      prev.push(current);
    }
    return prev;
  }, []);
}

function shouldMoveNextItem({dy, vy, height, pageY, nextPageY, nextHeight}) {
  if (vy < 0) {
    return pageY + dy <= nextPageY + EPSILON;
  }
  if (vy > 0) {
    return pageY + dy >= nextPageY + nextHeight - height - EPSILON;
  }
  return false;
}

export default class DraggableFlatList extends React.Component {
  state = {
    data: listData,
    activeIndex: null,
  };

  itemRefs = {};
  animations = {};
  offset = 0;
  activeItemDim = null;
  toIndex = null;

  activePositionY = new Animated.Value(0);
  activeHeight = new Animated.Value(0);
  scrollY = new Animated.Value(0);

  _panY = PanResponder.create({
    onMoveShouldSetPanResponder: () => this.state.activeIndex >= 0,
    onPanResponderMove: (_, {dy, vy}) => {
      const {activeIndex, data} = this.state;
      if (activeIndex >= 0) {
        this.scrollY.setValue(dy);
      }

      let moveIndex;
      if (activeIndex === 0) {
        moveIndex = activeIndex + this.offset + 1;
      } else {
        moveIndex = activeIndex + this.offset;
      }

      if (
        activeIndex !== null &&
        moveIndex >= 0 &&
        moveIndex <= data.length - 1
      ) {
        const moveItem = data[moveIndex];
        const moveItemRef = this.itemRefs[moveItem.id];
        const moveAnim = this.animations[moveItem.id];

        moveItemRef.measure((_x, _y, _w, moveHeight, _px, movePageY) => {
          const {height, pageY} = this.activeItemDim;

          if (
            shouldMoveNextItem({
              pageY,
              height,
              nextHeight: moveHeight,
              nextPageY: movePageY,
              dy,
              vy,
            })
          ) {
            this.toIndex = moveIndex;
            let toValue;
            if (vy > 0) {
              this.offset += 1;
              toValue = -height;
            } else if (vy < 0) {
              this.offset -= 1;
              toValue = height;
            }
            if (toValue) {
              Animated.timing(moveAnim, {
                toValue,
                duration: 200,
                useNativeDriver: false,
              }).start(() => {
                moveAnim.flattenOffset();
              });
            }
          }
        });
      }
    },
    onPanResponderTerminationRequest: () => false,
    onPanResponderTerminate: this.reset,
  });

  reset = () => {
    requestAnimationFrame(() => {
      this.setState(
        (state) => {
          const {activeIndex, data} = state;
          const activeItem = data[activeIndex];
          if (activeItem && this.toIndex !== null) {
            const moved = immutableMove(data, activeIndex, this.toIndex);
            return {
              activeIndex: null,
              data: moved,
            };
          }
          return {
            activeIndex: null,
          };
        },
        () => {
          this.toIndex = null;
          this.offset = 0;
          this.scrollY.setValue(0);
          this.activePositionY.setValue(0);
          this.activeHeight.setValue(0);
          Object.values(this.animations).forEach((anim) => anim.setValue(0));
        },
      );
    });
  };

  renderItem = ({item, index}) => {
    const {activeIndex, data} = this.state;
    const activeItem = data[activeIndex];
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
          this.itemRefs[item.id].measure(
            (_x, _y, _width, height, _pageX, pageY) => {
              this.activeHeight.setValue(height);

              this.activeItemDim = {
                pageY,
                height,
              };

              this.setState({activeIndex: index}, () => {
                this.activePositionY.setValue(pageY);
              });
            },
          );
        }}>
        <Animated.View
          onTouchEnd={this.reset}
          ref={(ref) => (this.itemRefs[item.id] = ref)}
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

  renderActiveItem = (index) => {
    const item = this.state.data[index];
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
    const {activeIndex, data} = this.state;

    return (
      <View style={styles.container} {...this._panY.panHandlers}>
        <FlatList
          scrollEnabled={activeIndex === null}
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={this.renderItem}
        />
        {this.renderActiveItem(activeIndex)}
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
