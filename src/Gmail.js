import React from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
} from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import data from '../assets/email';

export default function Gmail() {
  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={({id}) => String(id)}
        style={styles.list}
        data={data}
        renderItem={({item}) => <Item {...item} />}
      />
      <View style={styles.footer}>
        <IconButton name="email" label="Mail" focused />
        <IconButton name="video-outline" label="Meet" size={30} />
      </View>
    </View>
  );
}

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

const IconButton = ({name, label, focused, size = 24}) => {
  const color = focused ? colors.red : colors.text;
  const focusedStyle = {
    color,
  };
  return (
    <View style={styles.iconButton}>
      <Icon name={name} color={color} size={size} />
      <Text style={[styles.label, focusedStyle]}>{label}</Text>
    </View>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  list: {
    flexGrow: 1,
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
});
