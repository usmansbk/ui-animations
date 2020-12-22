import React from 'react';
import {View, StyleSheet, Text, Image, StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

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
};

const MIN_HEADER_HEIGHT = 60;
const MAX_HEADER_HEIGHT = MIN_HEADER_HEIGHT * 2;

export default function TwitterProfile() {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#836953" barStyle="light-content" />
      <View style={styles.header}>
        <View style={styles.imageHeader}>
          <Image source={user.header} style={styles.image} />
        </View>
        <View style={styles.appBar}>
          <IconButton name="arrow-left" />
          <View style={styles.headerContent}>
            <Text style={styles.title}>{user.fullname}</Text>
            <Text style={styles.subtitle}>{user.tweetsCount} Tweets</Text>
          </View>
          <IconButton name="more-vertical" />
        </View>
      </View>

      <View style={styles.body}>
        <Avatar />
      </View>
    </View>
  );
}

const Avatar = () => {
  return (
    <View style={[styles.avatar]}>
      <Image source={user.avatar} style={styles.avatarImage} />
    </View>
  );
};

const IconButton = ({name}) => (
  <View style={styles.icon}>
    <Icon name={name} color="white" size={24} />
  </View>
);

const ICON_SIZE = 32;
const AVATAR_SIZE = 86;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: MAX_HEADER_HEIGHT,
    backgroundColor: '#836953',
    justifyContent: 'flex-start',
  },
  appBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  icon: {
    backgroundColor: 'rgba(0, 0, 0, .3)',
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
    top: -AVATAR_SIZE / 3,
    left: 8,
    position: 'absolute',
    height: AVATAR_SIZE,
    width: AVATAR_SIZE,
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
});
