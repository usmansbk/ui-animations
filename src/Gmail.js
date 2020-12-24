import React, {useRef} from 'react';
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
  TouchableNativeFeedback,
} from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import data from '../assets/email';

export default function Gmail() {
  const listRef = useRef(null);
  const scrollY = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <SearchBar animation={scrollY} />
      <Animated.FlatList
        ref={listRef}
        ListHeaderComponent={Header}
        keyExtractor={({id}) => String(id)}
        style={styles.list}
        data={data}
        renderItem={({item}) => <Item {...item} />}
        contentContainerStyle={styles.contentContainer}
        scrollEventThrottle={1}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: scrollY,
                },
              },
            },
          ],
          {useNativeDriver: true},
        )}
      />
      <View style={styles.footer}>
        <IconButton
          name="email"
          label="Mail"
          focused
          onPress={() => listRef.current.scrollToOffset({offset: 0})}
        />
        <IconButton name="video-outline" label="Meet" size={30} />
      </View>
    </View>
  );
}

const SearchBar = ({animation, goBack = () => null}) => {
  const scrollY = Animated.diffClamp(animation, 0, SEARCH_BAR_HEIGHT);
  return (
    <Animated.View
      pointerEvents="auto"
      style={[
        styles.searchBar,
        {
          transform: [
            {
              translateY: scrollY.interpolate({
                inputRange: [0, SEARCH_BAR_HEIGHT],
                outputRange: [0, -SEARCH_BAR_HEIGHT],
                extrapolate: 'clamp',
              }),
            },
          ],
        },
      ]}>
      <TouchableNativeFeedback onPress={goBack}>
        <View style={styles.button}>
          <Icon name="menu" size={24} />
        </View>
      </TouchableNativeFeedback>
      <TextInput
        placeholderTextColor={colors.text}
        placeholder="Search in emails"
        style={styles.textInput}
      />
      <View style={styles.button}>
        <Image source={require('../assets/me.jpeg')} style={styles.thumbnail} />
      </View>
    </Animated.View>
  );
};

const Header = () => (
  <View style={styles.header}>
    <Text style={styles.headerText}>PRIMARY</Text>
  </View>
);

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
  red: '#c5221f',
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
const SEARCH_BAR_HEIGHT = 60;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  list: {
    flexGrow: 1,
  },
  contentContainer: {
    paddingTop: SEARCH_BAR_HEIGHT,
  },
  label: {
    color: colors.red,
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
  searchBar: {
    position: 'absolute',
    height: 48,
    width: '92%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    elevation: 4,
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 4,
    zIndex: 1000,
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
    height: 48,
    width: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
