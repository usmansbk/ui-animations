import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  TextInput,
  Image,
  Animated,
  StatusBar,
  RefreshControl,
  TouchableNativeFeedback,
} from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import data from '../assets/email';

const MIN_VELOCITY = 0.7;

/**
 * Gmail android app search, search header, and FAB animation
 */
export default function Gmail() {
  const listRef = useRef(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  const fabAnimation = useRef(new Animated.Value(0)).current;
  const searchAnimation = useRef(new Animated.Value(0)).current;
  const isAnimating = useRef(false);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <View style={styles.container}>
        <Animated.FlatList
          data={data}
          keyExtractor={({id}) => String(id)}
          ref={listRef}
          style={styles.list}
          contentContainerStyle={styles.contentContainer}
          renderItem={({item}) => <Item {...item} />}
          refreshControl={
            <RefreshControl
              colors={['green']}
              refreshing={false}
              progressViewOffset={SEARCH_BAR_HEIGHT}
            />
          }
          scrollEventThrottle={16}
          onScroll={(e) => {
            const {
              nativeEvent: {
                contentOffset: {y},
                velocity: {y: velocityY},
              },
            } = e;
            scrollY.setValue(y);
            if (y === 0) {
              Animated.timing(fabAnimation, {
                toValue: 0,
                duration: 200,
                useNativeDriver: false,
              }).start();
            } else if (
              Math.abs(velocityY) >= MIN_VELOCITY &&
              !isAnimating.current
            ) {
              isAnimating.current = true;
              Animated.timing(fabAnimation, {
                toValue: velocityY < 0 ? 0 : LARGE_FAB_WIDTH,
                duration: 200,
                useNativeDriver: false,
              }).start(() => {
                isAnimating.current = false;
              });
            }
          }}
          ListHeaderComponent={Header}
          ListFooterComponent={Footer}
        />
        <FAB animation={fabAnimation} />
      </View>
      <View style={styles.footer}>
        <IconButton
          name="email"
          label="Mail"
          focused
          onPress={() => listRef.current.scrollToOffset({y: 0})}
        />
        <IconButton name="video-outline" label="Meet" size={30} />
      </View>
      <Animated.View
        style={[
          styles.searchContainer,
          {
            height: searchAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: ['0%', '100%'],
              extrapolate: 'clamp',
            }),
          },
        ]}
      />
      <SearchBar animation={scrollY} searchAnimation={searchAnimation} />
    </View>
  );
}

const FAB = ({animation = new Animated.Value(0)}) => {
  return (
    <TouchableWithoutFeedback>
      <Animated.ScrollView
        scrollEnabled={false}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.fab}
        style={[
          styles.fabContainer,
          {
            width: animation.interpolate({
              inputRange: [0, LARGE_FAB_WIDTH],
              outputRange: [LARGE_FAB_WIDTH, SMALL_FAB],
              extrapolate: 'clamp',
            }),
            height: animation.interpolate({
              inputRange: [0, LARGE_FAB_WIDTH],
              outputRange: [LARGE_FAB_HEIGHT, SMALL_FAB],
              extrapolate: 'clamp',
            }),
            borderRadius: animation.interpolate({
              inputRange: [0, LARGE_FAB_WIDTH],
              outputRange: [LARGE_FAB_HEIGHT / 2, SMALL_FAB / 2],
              extrapolate: 'clamp',
            }),
          },
        ]}>
        <Animated.View
          style={[
            styles.fabIcon,
            {
              borderRadius: animation.interpolate({
                inputRange: [0, LARGE_FAB_WIDTH],
                outputRange: [LARGE_FAB_HEIGHT / 2, SMALL_FAB / 2],
                extrapolate: 'clamp',
              }),
            },
          ]}>
          <Icon name="pencil-outline" size={24} color={colors.red} />
        </Animated.View>
        <Animated.Text
          style={[
            styles.label,
            styles.fabLabel,
            {
              opacity: animation.interpolate({
                inputRange: [0, SMALL_FAB / 2, LARGE_FAB_WIDTH],
                outputRange: [1, 0, 0],
                extrapolate: 'clamp',
              }),
            },
          ]}>
          Compose
        </Animated.Text>
      </Animated.ScrollView>
    </TouchableWithoutFeedback>
  );
};

const SearchBar = ({animation, searchAnimation}) => {
  const textInput = useRef(null);
  const [focused, setFocus] = useState(false);
  const HEIGHT = SEARCH_BAR_HEIGHT + 16;
  const scrollY = Animated.diffClamp(animation, 0, HEIGHT);

  const closeSearch = () => {
    Animated.timing(searchAnimation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start(() => {
      setFocus(false);
      textInput.current.blur();
    });
  };
  const openSearch = () => {
    Animated.timing(searchAnimation, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start(() => {
      setFocus(true);
      textInput.current.focus();
    });
  };

  return (
    <Animated.View
      style={[
        styles.searchBarContainer,
        {
          top: scrollY.interpolate({
            inputRange: [0, HEIGHT],
            outputRange: [0, -HEIGHT],
            extrapolate: 'clamp',
          }),
        },
      ]}>
      <TouchableNativeFeedback onPress={openSearch}>
        <Animated.View
          style={[
            styles.searchBar,
            {
              opacity: searchAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0],
                extrapolate: 'clamp',
              }),
            },
          ]}>
          <Animated.View
            style={[
              styles.button,
              {
                transform: [
                  {
                    translateX: searchAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -8],
                      extrapolate: 'clamp',
                    }),
                  },
                  {
                    translateY: searchAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -8],
                      extrapolate: 'clamp',
                    }),
                  },
                ],
              },
            ]}>
            <Icon name="menu" size={24} />
          </Animated.View>
          <Text style={styles.placeholder}>Search in emails</Text>
          <Animated.View
            style={[
              styles.button,
              {
                transform: [
                  {
                    translateX: searchAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 8],
                      extrapolate: 'clamp',
                    }),
                  },
                  {
                    translateY: searchAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -8],
                      extrapolate: 'clamp',
                    }),
                  },
                ],
              },
            ]}>
            <Image
              source={require('../assets/me.jpeg')}
              style={styles.thumbnail}
            />
          </Animated.View>
        </Animated.View>
      </TouchableNativeFeedback>

      <Animated.View
        pointerEvents={focused ? 'auto' : 'none'}
        style={[
          styles.searchBarOverlay,
          {
            marginHorizontal: searchAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [16, 0],
              extrapolate: 'clamp',
            }),
            marginTop: searchAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [12, 0],
              extrapolate: 'clamp',
            }),
            height: searchAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: ['80%', '100%'],
              extrapolate: 'clamp',
            }),
            opacity: searchAnimation,
          },
        ]}>
        <View style={styles.inputRow}>
          <TouchableNativeFeedback onPress={closeSearch}>
            <Animated.View
              style={[
                styles.button,
                {
                  transform: [
                    {
                      rotateZ: searchAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['180deg', '360deg'],
                        extrapolate: 'clamp',
                      }),
                    },
                  ],
                },
              ]}>
              <Icon name="arrow-left" size={24} />
            </Animated.View>
          </TouchableNativeFeedback>
          <TextInput
            ref={textInput}
            style={styles.textInput}
            placeholder="Search in emails"
            placeholderTextColor={colors.text}
            returnKeyType="search"
            onSubmitEditing={closeSearch}
          />
          <View style={styles.button}>
            <Icon name="microphone" size={24} />
          </View>
        </View>
      </Animated.View>
    </Animated.View>
  );
};

const Header = () => (
  <View style={styles.header}>
    <Text style={styles.headerText}>PRIMARY</Text>
  </View>
);

const Footer = () => <View style={styles.listFooter} />;

const Item = ({name, date, title, message}) => {
  return (
    <TouchableHighlight
      underlayColor={colors.gray}
      onPress={() => null}
      style={styles.itemContainer}>
      <View style={styles.itemRow}>
        <View>
          <Avatar name={name} />
        </View>
        <View style={styles.itemContent}>
          <View style={styles.itemHeader}>
            <Text style={styles.title} numberOfLines={1}>
              {name}
            </Text>
            <Text style={styles.date}>
              {moment(date, 'MM/dd/YYYY').format('D MMM')}
            </Text>
          </View>
          <View style={styles.itemSubtitle}>
            <View style={styles.subtitleContainer}>
              <Text style={styles.subtitle} numberOfLines={1}>
                {title}
              </Text>
              <Text style={styles.subtitle} numberOfLines={1}>
                {message}
              </Text>
            </View>
            <Icon name="star-outline" size={24} color={colors.gray2} />
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const Avatar = ({name}) => {
  return (
    <View
      style={[
        styles.avatar,

        {
          backgroundColor: getColor(name),
        },
      ]}>
      <Text style={styles.initials}>{name[0]}</Text>
    </View>
  );
};

const IconButton = ({name, label, focused, size = 24, onPress}) => {
  const color = focused ? colors.red : colors.text;
  const focusedStyle = {
    color,
  };
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.iconButton}>
        <Icon name={name} color={color} size={size} />
        <Text style={[styles.label, focusedStyle]}>{label}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const colors = {
  red: '#DB4437',
  gray: '#e7e7e7',
  text: '#5d5d5d',
  gray2: '#a2a2a2',
};

const avatarColors = [
  '#bdc3c7',
  '#9b59b6',
  '#f39c12',
  '#1abc9c',
  '#2ecc71',
  '#3498db',
];

const getColor = (name = '') => avatarColors[name.length % avatarColors.length];

const AVATAR_SIZE = 40;
const SEARCH_BAR_HEIGHT = 48;
const BUTTON_SIZE = 48;
const SMALL_FAB = 56;
const LARGE_FAB_HEIGHT = 52;
const LARGE_FAB_WIDTH = LARGE_FAB_HEIGHT * 3;

const styles = StyleSheet.create({
  container: {
    flex: 4,
    backgroundColor: 'white',
  },
  list: {
    flexGrow: 1,
  },
  contentContainer: {
    paddingTop: SEARCH_BAR_HEIGHT + 12,
  },
  label: {
    color: colors.red,
    fontWeight: '600',
  },
  footer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: colors.gray,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  iconButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  title: {
    fontSize: 16,
    color: colors.text,
    flex: 1,
  },
  subtitle: {
    color: colors.text,
  },
  itemContainer: {
    paddingRight: 12,
    paddingVertical: 16,
    marginVertical: 2,
    marginLeft: 4,
    borderRadius: 16,
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
  },
  itemRow: {
    flexDirection: 'row',
  },
  itemContent: {
    flex: 1,
    paddingLeft: 4,
  },
  itemSubtitle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subtitleContainer: {
    flex: 1,
    paddingRight: 8,
  },
  date: {
    fontSize: 12,
    color: colors.text,
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 12,
    marginVertical: 2,
  },
  initials: {
    color: 'white',
    fontSize: AVATAR_SIZE / 2,
  },
  header: {
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  headerText: {
    color: colors.text,
  },
  listFooter: {
    height: 80,
  },
  searchBar: {
    height: SEARCH_BAR_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 4,
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 4,
    marginHorizontal: 16,
    marginTop: 12,
  },
  searchBarOverlay: {
    ...StyleSheet.absoluteFill,
    height: SEARCH_BAR_HEIGHT,
    marginHorizontal: 16,
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderColor: colors.gray,
  },
  searchBarContainer: {
    position: 'absolute',
    width: '100%',
  },
  searchContainer: {
    backgroundColor: 'white',
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
  },
  thumbnail: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
  },
  button: {
    height: BUTTON_SIZE,
    width: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fab: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: SMALL_FAB,
  },
  fabContainer: {
    backgroundColor: 'white',
    elevation: 4,
    position: 'absolute',
    right: 22,
    bottom: 12,
  },
  fabIcon: {
    width: SMALL_FAB,
    height: SMALL_FAB,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  fabLabel: {
    flex: 1,
    fontWeight: '700',
  },
  placeholder: {
    flex: 1,
    color: colors.text,
    fontSize: 16,
    paddingHorizontal: 4,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
