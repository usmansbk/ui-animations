import React from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Text,
  Image,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const {height, width} = Dimensions.get('window');

const colors = {
  background: '#7FACDE',
  gray: '#948F7E',
  text: '#212121',
};
const CARD_HEIGHT = height * 0.5;
const CARD_WIDTH = width * 0.8;

const artists = [
  {
    cover:
      'https://www.mam-e.it/wp-content/uploads/2017/07/mame-musica-coldplay-5-ragioni-per-cui-sono-una-grande-band-2-992x680.jpg',
    name: 'Coldplay',
    song: 'A Head full of Dreams',
  },
  {
    cover:
      'http://images.sxsw.com/ppJwLHRbjGmuYp999AiIHL8mCHc=/0x234:3646x2838/700x/images.sxsw.com/3/7efa23f6-cfc8-47bb-8850-7e9f63c1a2ba/artist-7831',
    name: 'DNCE',
    song: 'Cake by the Ocean',
  },
  {
    cover:
      'https://www.hellomagazine.com/imagenes/celebrities/2018100463063/westlife-confirm-new-music-tour/0-297-850/westlife-t.webp?filter=high',
    name: 'Westlife',
    song: 'Uptown Girl',
  },
  {
    cover:
      'https://e-cdns-images.dzcdn.net/images/cover/d61eaad8f321ea876a5f5c7219aae892/500x500.jpg',
    name: 'Backstreet Boys',
    song: 'Show Me The Meaning Of Being Lonely',
  },
  {
    cover:
      'https://diy-magazine.s3.amazonaws.com/d/diy/Artists/S/Spice_Girls/spice-girls-press.jpeg',
    name: 'Spice Girls',
    song: 'Wannabe',
  },
  {
    cover:
      'https://static.billboard.com/files/media/spice-girls-1996-billboard-650-compressed.jpg',
    name: 'Spice Girls',
    song: 'Viva Forever',
  },
];

class Swipe extends React.Component {
  render() {
    return (
      <View style={[styles.container]}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={colors.background}
        />
        <View style={styles.header}>
          <Text style={styles.title}>Artists</Text>
        </View>
        <View style={styles.cards}>
          {artists
            .slice(0, 3)
            .map((item, index, arr) => {
              return (
                <Card
                  {...item}
                  key={index}
                  index={index}
                  elevation={arr.length - index}
                />
              );
            })
            .reverse()}
        </View>
        <View style={styles.row}>
          <Button name="close" />
          <Button name="heart" primary />
        </View>
      </View>
    );
  }
}

function Card({name, cover, song, index, elevation}) {
  return (
    <View
      style={[
        styles.card,
        {
          height: CARD_HEIGHT - index * 8,
          width: CARD_WIDTH - index * 8,
          transform: [
            {
              translateY: index * 10,
            },
          ],
          elevation,
        },
      ]}>
      <Image source={{uri: cover}} style={styles.cover} />
      <View style={[styles.text]}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.song}>{song}</Text>
      </View>
    </View>
  );
}

const BUTTON_SIZE = 80;
function Button({name, primary}) {
  return (
    <TouchableOpacity style={[styles.button, primary && styles.primaryBtn]}>
      <Icon
        name={name}
        size={BUTTON_SIZE / 2}
        color={primary ? '#fff' : '#000'}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    margin: 8,
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    elevation: 4,
  },
  primaryBtn: {
    backgroundColor: 'tomato',
  },
  cards: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 27,
    color: 'white',
  },
  card: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 8,
    flex: 1,
  },
  cover: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    flex: 1,
  },
  text: {
    padding: 16,
    paddingTop: 10,
  },
  name: {
    fontSize: 24,
    paddingBottom: 10,
    color: colors.text,
    fontFamily: 'Raleway-Light',
  },
  song: {
    color: colors.gray,
    fontFamily: 'Lato-Regular',
  },
});

export default Swipe;
