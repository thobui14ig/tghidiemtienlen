/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import {StyleSheet, View} from 'react-native';
import Danhsachdiem from '../Danhsachdiem/Danhsachdiem';
import EmojiHOC from '../Emoji/Emoji';
import Header from '../Header/Header';

const Cotainer = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={[styles.box1]}>
        <Header />
      </View>
      <View style={[styles.emoji]}>
        <EmojiHOC />
      </View>
      <View style={[styles.box2]}>
        <View>
          <Danhsachdiem navigation={navigation} />
        </View>
      </View>
    </View>
  );
};

export default Cotainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#2196F3',
    zIndex: 0,
  },
  box1: {
    // flex: 1,
    height: 70,
    backgroundColor: '#2196F3',
  },
  box2: {
    flex: 15,
    // backgroundColor: '#8BC34A',
  },
  box3: {
    flex: 2,
    // backgroundColor: '#e3aa1a',
  },
  emoji: {
    height: 100,
  },
});
