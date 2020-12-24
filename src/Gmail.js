import React from 'react';
import {FlatList, StyleSheet, View, Text} from 'react-native';
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

const Item = ({name, title, message}) => {
  return (
    <View style={styles.itemContainer}>
      <View></View>
      <View style={styles.itemContent}>
        <Text style={styles.title} numberOfLines={1}>
          {name}
        </Text>
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
  },
  subtitle: {
    color: colors.text,
  },
  itemContainer: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginVertical: 2,
    marginHorizontal: 8,
    borderRadius: 16,
  },
  itemContent: {
    flex: 1,
  },
  itemSubtitle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  subtitleContainer: {
    flex: 1,
    paddingRight: 8,
  },
});
