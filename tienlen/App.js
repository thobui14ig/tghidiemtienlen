/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import type { Node } from 'react';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Danhsachdiem from './src/component/Danhsachdiem/Danhsachdiem';
import EmojiHOC from './src/component/Emoji/Emoji';
import Header from './src/component/Header/Header';
import Home from './src/component/Home/Home';
import MainProvider from './src/context/Main.context';

const Stack = createNativeStackNavigator();
const App: () => Node = () => {
  console.log(Stack);
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="home"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen  name="Container" component={Cotainer} />

        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

const Cotainer = () => {
  return (
    <MainProvider>
      <View style={styles.container}>
        <View style={[styles.box1]}>
          <Header />
        </View>
        <View style={[styles.emoji]}>
          <EmojiHOC />
        </View>

        <View style={[styles.box2]}>
          <View>
            <Danhsachdiem />
          </View>
        </View>
      </View>
    </MainProvider>
  )
}

export default App;

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
    height: 100
  }
});
