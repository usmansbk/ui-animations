import React, {useRef} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  PanResponder,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Tabs from './TwitterProfileTabs';

const {height} = Dimensions.get('window');

const user = {
  fullname: 'Usman Suleiman',
  handle: '@usbkay',
  header: require('../assets/twitter-header.jpeg'),
  avatar: require('../assets/me.jpeg'),
  tweetsCount: '4,141',
  followingCount: 206,
  followersCount: 316,
  location: 'Kaduna, Nigeria',
  link: 'usmansbk.github.io',
  joined: 'November 2012',
  bio: 'Building get-schdlr.com mobile app. React/RN & AWS Enthusiast',
  color: '#836953',
};

const ICON_SIZE = 32;
const NAME_HEIGHT = 18;
const AVATAR_SIZE = 86;
const MIN_AVATAR_SIZE = 50;
const MIN_HEADER_HEIGHT = 60;
const MAX_HEADER_HEIGHT = MIN_HEADER_HEIGHT * 2 + 10;
const BODY_HEIGHT = height * 0.361;
const colors = {
  gray: '#73808a',
  blue: '#00acee',
};

export default function TwitterProfile() {
  const animation = useRef(new Animated.Value(0)).current;
  const scrollY = Animated.diffClamp(animation, -BODY_HEIGHT, BODY_HEIGHT);
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => animation.extractOffset(),
      onPanResponderMove: (_, gestureState) =>
        animation.setValue(-gestureState.dy), // natural scrolling
    }),
  ).current;

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <StatusBar backgroundColor={user.color} barStyle="light-content" />
      <Animated.View
        style={[
          styles.header,
          {
            height: scrollY.interpolate({
              inputRange: [0, MAX_HEADER_HEIGHT - MIN_HEADER_HEIGHT],
              outputRange: [MAX_HEADER_HEIGHT, MIN_HEADER_HEIGHT],
              extrapolate: 'clamp',
            }),
            zIndex: scrollY.interpolate({
              inputRange: [
                0,
                MAX_HEADER_HEIGHT - MIN_HEADER_HEIGHT - 0.99,
                MAX_HEADER_HEIGHT - MIN_HEADER_HEIGHT,
              ],
              outputRange: [0, 0, 1000],
              extrapolate: 'clamp',
            }),
          },
        ]}>
        <Animated.View
          style={[
            styles.imageHeader,
            {
              opacity: scrollY.interpolate({
                inputRange: [0, MAX_HEADER_HEIGHT - MIN_HEADER_HEIGHT],
                outputRange: [1, 0],
                extrapolate: 'clamp',
              }),
              transform: [
                {
                  translateY: scrollY.interpolate({
                    inputRange: [0, MAX_HEADER_HEIGHT - MIN_HEADER_HEIGHT],
                    outputRange: [0, -(MAX_HEADER_HEIGHT - MIN_HEADER_HEIGHT)],
                    extrapolate: 'clamp',
                  }),
                },
              ],
            },
          ]}>
          <Image source={user.header} style={styles.image} />
        </Animated.View>
        <View style={styles.appBar}>
          <IconButton name="arrow-left" />
          <Animated.View
            style={[
              styles.headerContent,
              {
                opacity: scrollY.interpolate({
                  inputRange: [
                    0,
                    MAX_HEADER_HEIGHT -
                      MIN_HEADER_HEIGHT +
                      MIN_AVATAR_SIZE +
                      NAME_HEIGHT -
                      0.99,
                    MAX_HEADER_HEIGHT -
                      MIN_HEADER_HEIGHT +
                      MIN_AVATAR_SIZE +
                      NAME_HEIGHT,
                  ],
                  outputRange: [0, 0, 1],
                  extrapolate: 'clamp',
                }),
              },
            ]}>
            <Text style={styles.title}>{user.fullname}</Text>
            <Text style={styles.subtitle}>{user.tweetsCount} Tweets</Text>
          </Animated.View>
          <IconButton name="more-vertical" />
        </View>
      </Animated.View>

      <Animated.View
        style={[
          styles.body,
          {
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [
                    0,
                    MAX_HEADER_HEIGHT - MIN_HEADER_HEIGHT,
                    BODY_HEIGHT,
                  ],
                  outputRange: [0, 0, -BODY_HEIGHT],
                  extrapolate: 'clamp',
                }),
              },
            ],
          },
        ]}>
        <Avatar animation={scrollY} />
        <View style={styles.bodyHeader}>
          <View style={styles.row}>
            <View style={styles.left} />
            <Button text="Edit profile" />
          </View>
          <Text style={styles.name}>{user.fullname}</Text>
          <Text style={styles.caption}>{user.handle}</Text>
          <Text style={styles.text}>{user.bio}</Text>

          <View style={styles.wrappedRow}>
            <Caption icon="map-pin" text={user.location} />
            <Caption icon="link" text={user.link} link />
            <Caption icon="calendar" text={`Joined ${user.joined}`} />
          </View>

          <View style={styles.statsRow}>
            <StatButton count={user.followingCount} text="Following" />
            <StatButton count={user.followersCount} text="Followers" />
          </View>
        </View>
      </Animated.View>

      <Animated.View
        style={[
          styles.bottom,
          {
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [
                    0,
                    MAX_HEADER_HEIGHT - MIN_HEADER_HEIGHT,
                    BODY_HEIGHT,
                  ],
                  outputRange: [0, 0, -BODY_HEIGHT],
                  extrapolate: 'clamp',
                }),
              },
            ],
          },
        ]}>
        <Tabs />
      </Animated.View>
    </View>
  );
}

const StatButton = ({count, text}) => (
  <TouchableOpacity>
    <View style={styles.textRow}>
      <Text style={styles.count}>{count}</Text>
      <Text style={styles.caption}>{text}</Text>
    </View>
  </TouchableOpacity>
);

const Caption = ({text, icon, link}) => (
  <TouchableOpacity disabled={!link}>
    <View style={styles.textRow}>
      <Icon
        name={icon}
        size={14}
        color={colors.gray}
        style={styles.captionIcon}
      />
      <Text style={[styles.caption, link ? styles.link : undefined]}>
        {text}
      </Text>
    </View>
  </TouchableOpacity>
);

const Button = ({text}) => (
  <TouchableOpacity style={styles.button}>
    <Text style={styles.buttonText}>{text}</Text>
  </TouchableOpacity>
);

const Avatar = ({animation}) => {
  const size = animation.interpolate({
    inputRange: [0, MAX_HEADER_HEIGHT - MIN_HEADER_HEIGHT],
    outputRange: [AVATAR_SIZE, MIN_AVATAR_SIZE],
    extrapolate: 'clamp',
  });
  const top = animation.interpolate({
    inputRange: [0, MAX_HEADER_HEIGHT - MIN_HEADER_HEIGHT],
    outputRange: [-AVATAR_SIZE / 3, 2],
    extrapolate: 'clamp',
  });
  const left = animation.interpolate({
    inputRange: [0, MAX_HEADER_HEIGHT - MIN_HEADER_HEIGHT],
    outputRange: [8, 24],
    extrapolate: 'clamp',
  });
  return (
    <Animated.View
      style={[
        styles.avatar,
        {
          height: size,
          width: size,
          top,
          left,
        },
      ]}>
      <Image source={user.avatar} style={styles.avatarImage} />
    </Animated.View>
  );
};

const IconButton = ({name}) => (
  <View style={styles.icon}>
    <Icon name={name} color="white" size={24} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: user.color,
    justifyContent: 'flex-start',
  },
  appBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  icon: {
    backgroundColor: 'rgba(0, 0, 0, .4)',
    width: ICON_SIZE,
    height: ICON_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: ICON_SIZE / 2,
  },
  headerContent: {
    flex: 2,
    paddingHorizontal: 32,
    paddingVertical: 4,
  },
  imageHeader: {
    position: 'absolute',
    left: 0,
    height: MAX_HEADER_HEIGHT,
    width: '100%',
  },
  image: {
    flex: 1,
    width: null,
    height: null,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  subtitle: {
    color: 'white',
    fontSize: 16,
  },
  body: {},
  avatar: {
    position: 'absolute',
    borderRadius: AVATAR_SIZE / 2,
    borderColor: 'white',
    borderWidth: 4,
  },
  avatarImage: {
    flex: 1,
    width: null,
    height: null,
    borderRadius: AVATAR_SIZE / 2,
  },
  left: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wrappedRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    padding: 6,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 20,
  },
  buttonText: {
    fontWeight: 'bold',
    color: colors.gray,
  },
  bodyHeader: {
    margin: 12,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 2,
  },
  caption: {
    color: colors.gray,
    fontSize: 15,
  },
  captionIcon: {
    marginRight: 8,
  },
  text: {
    marginVertical: 10,
    lineHeight: 20,
  },
  textRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginVertical: 4,
  },
  link: {
    color: '#1a8dc2',
  },
  statsRow: {
    flexDirection: 'row',
    marginTop: 8,
    marginBottom: 4,
  },
  count: {
    fontWeight: 'bold',
    marginRight: 4,
  },
  bottom: {
    height,
    backgroundColor: 'red',
  },
});
