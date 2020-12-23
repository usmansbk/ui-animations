import React, {useRef} from 'react';
import {
  Animated,
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableNativeFeedback,
  View,
} from 'react-native';

const activeTabColor = '#3498db';
const inactiveTabColor = '#777777';
const tabs = [
  {
    name: 'Tweets',
    color: '#bdc3c7',
  },
  {
    name: 'Tweets & replies',
    color: '#2ecc71',
  },
  {
    name: 'Media',
    color: '#fd79a8',
  },
  {
    name: 'Likes',
    color: '#a29bfe',
  },
];

const {width} = Dimensions.get('window');

export default function TwitterProfileTabs() {
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollRef = useRef(null);

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        <View style={styles.tabs}>
          {tabs.map((tab, index) => {
            return (
              <TouchableNativeFeedback
                key={index}
                onPress={() =>
                  scrollRef.current.scrollTo({
                    x: width * index,
                  })
                }>
                <View>
                  <View style={styles.tab}>
                    <Animated.Text
                      style={[
                        styles.label,
                        {
                          color: scrollX.interpolate({
                            inputRange: [
                              (index - 1) * width,
                              index * width - width / 2,
                              index * width - width / 2 + 0.99,
                              index * width,
                              index * width + width / 2 - 0.99,
                              index * width + width / 2,
                              (index + 1) * width,
                            ],
                            outputRange: [
                              inactiveTabColor,
                              inactiveTabColor,
                              activeTabColor,
                              activeTabColor,
                              activeTabColor,
                              inactiveTabColor,
                              inactiveTabColor,
                            ],
                            extrapolate: 'clamp',
                          }),
                        },
                      ]}>
                      {tab.name}
                    </Animated.Text>
                  </View>
                  <Animated.View
                    style={[
                      styles.indicator,
                      {
                        width: scrollX.interpolate({
                          inputRange: [
                            (index - 1) * width,
                            index * width,
                            (index + 1) * width,
                          ],
                          outputRange: ['0%', '100%', '0%'],
                          extrapolate: 'clamp',
                        }),
                        left: scrollX.interpolate({
                          inputRange: [
                            (index - 1) * width,
                            index * width,
                            (index + 1) * width,
                          ],
                          outputRange: ['0%', '0%', '100%'],
                          extrapolate: 'clamp',
                        }),
                      },
                    ]}
                  />
                </View>
              </TouchableNativeFeedback>
            );
          })}
        </View>
      </View>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}>
        {tabs.map((tab) => {
          return (
            <View
              key={tab.name}
              style={[
                styles.scrollView,
                {
                  backgroundColor: tab.color,
                },
              ]}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    flexGrow: 1,
    width,
  },
  tabBar: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#6491b1',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  tab: {
    padding: 16,
    paddingHorizontal: 24,
  },
  label: {
    fontWeight: 'bold',
    color: '#777',
  },
  indicator: {
    height: 3,
    backgroundColor: activeTabColor,
  },
  activeStyle: {
    color: activeTabColor,
  },
});
