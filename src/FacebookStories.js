import React from 'react';
import {View, StyleSheet, Image, ScrollView, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
const CARD_WIDTH = width * 0.3;

export default function Stories() {
  const cards = new Array(10).fill(0);
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        {cards.map(() => (
          <Card />
        ))}
      </ScrollView>
    </View>
  );
}

function Card() {
  return (
    <View>
      <Image
        source={{
          uri:
            'https://scontent.fabv2-1.fna.fbcdn.net/v/t1.0-9/156991972_5414546705222924_6334041093859477799_o.jpg?_nc_cat=104&ccb=3&_nc_sid=09cbfe&_nc_eui2=AeHAwE69tugIVql9DTdyzgLPB--DFldHBwAH74MWV0cHAAZeawiPDQblgo6MA7E0dsJOzfHvVCKa0_lHeSSgOVBb&_nc_ohc=DTUc_nbSU5YAX_DuT9-&_nc_ht=scontent.fabv2-1.fna&oh=b8248d9c31f59ca024bf84448f53b03b&oe=606474E0',
        }}
        resizeMode="cover"
        style={styles.card}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: CARD_WIDTH,
    height: '25%',
    margin: 4,
    borderRadius: 16,
  },
  cards: {},
});
