import React from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  TouchableHighlight,
  Text,
  Image,
  Dimensions,
  Animated,
  PanResponder,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const {height, width} = Dimensions.get('window');

const colors = {
  background: '#7FACDE',
  gray: '#948F7E',
  text: '#212121',
};
const CARD_HEIGHT = height * 0.55;
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
  state = {
    currentIndex: 0,
  };
  _anim = new Animated.Value(0);
  pan = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_e, gestureState) => {
      this._anim.setValue(gestureState.dx);
    },
    onPanResponderTerminationRequest: () => true,
    onPanResponderRelease: (_, {dx}) => {
      if (Math.abs(dx) > CARD_WIDTH / 2) {
        Animated.timing(this._anim, {
          toValue: dx < 0 ? -CARD_WIDTH : CARD_WIDTH,
          useNativeDriver: false,
          duration: 300,
        }).start(() => {
          this.setState(
            (prev) => ({
              currentIndex: prev.currentIndex + 1,
            }),
            () => {
              this._anim.setValue(0);
            },
          );
        });
      } else {
        Animated.timing(this._anim, {
          toValue: 0,
          useNativeDriver: false,
          duration: 300,
        }).start(() => {
          this._anim.setValue(0);
        });
      }
    },
  });

  render() {
    const {currentIndex} = this.state;
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
            .slice(currentIndex, currentIndex + 3)
            .map(({cover, name, song}, index, arr) => {
              const panHandlers = index === 0 ? this.pan.panHandlers : {};
              const inputRange = [
                (index - 1) * CARD_WIDTH,
                index * CARD_WIDTH,
                (index + 1) * CARD_WIDTH,
              ];
              const styleFirstCard =
                index === 0
                  ? {
                      opacity: this._anim.interpolate({
                        inputRange,
                        outputRange: [0.5, 1, 0.5],
                        extrapolate: 'clamp',
                      }),
                    }
                  : {};
              const transformFirstCard =
                index === 0
                  ? [
                      {
                        translateX: this._anim,
                      },
                      {
                        rotateZ: this._anim.interpolate({
                          inputRange,
                          outputRange: ['-30deg', '0deg', '30deg'],
                          extrapolate: 'clamp',
                        }),
                      },
                    ]
                  : [];

              return (
                <Animated.View
                  {...panHandlers}
                  key={index}
                  style={[
                    styles.card,
                    {
                      height: CARD_HEIGHT - index - 1 * 8,
                      width: CARD_WIDTH - index * 8,
                      transform: [
                        {
                          translateY: index * 10,
                        },
                        ...transformFirstCard,
                      ],
                      elevation: arr.length - index,
                      ...styleFirstCard,
                    },
                  ]}>
                  <Image source={{uri: cover}} style={styles.cover} />
                  <View style={[styles.text]}>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.song}>{song}</Text>
                  </View>
                </Animated.View>
              );
            })
            .reverse()}
        </View>
        <View style={styles.row}>
          <Button anim={this._anim} outputRange={[1.3, 1, 1]} name="close" />
          <Button
            anim={this._anim}
            outputRange={[1, 1, 1.3]}
            name="heart"
            primary
          />
        </View>
      </View>
    );
  }
}

const BUTTON_SIZE = 80;
function Button({name, primary, anim, onPress = () => null, outputRange = []}) {
  return (
    <TouchableHighlight onPress={onPress} style={styles.btnContainer}>
      <Animated.View
        style={[
          styles.button,
          primary && styles.primaryBtn,
          {
            transform: [
              {
                scale: anim.interpolate({
                  inputRange: [-CARD_WIDTH, 0, CARD_WIDTH],
                  outputRange,
                  extrapolate: 'clamp',
                }),
              },
            ],
          },
        ]}>
        <Icon
          name={name}
          size={BUTTON_SIZE / 2}
          color={primary ? '#fff' : '#000'}
        />
      </Animated.View>
    </TouchableHighlight>
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
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    elevation: 4,
  },
  btnContainer: {
    margin: 8,
    marginHorizontal: 16,
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
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
