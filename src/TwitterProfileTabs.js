import React, {useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';

const activeTabColor = '#3498db';
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
  const [activeIndex] = useState(0);

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        <View style={styles.tabs}>
          {tabs.map((tab, index) => {
            return (
              <TouchableNativeFeedback>
                <View>
                  <View style={styles.tab}>
                    <Text
                      style={[
                        styles.label,
                        activeIndex === index ? styles.activeStyle : undefined,
                      ]}>
                      {tab.name}
                    </Text>
                  </View>
                  <Animated.View style={[styles.indicator]} />
                </View>
              </TouchableNativeFeedback>
            );
          })}
        </View>
      </View>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
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
    height: 4,
    backgroundColor: activeTabColor,
  },
  activeStyle: {
    color: activeTabColor,
  },
});
