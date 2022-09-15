/* eslint-disable prettier/prettier */
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Danhsachdiem from '../component/Game/Tienlen/Danhsachdiem/Danhsachdiem';
import EmojiHOC from '../component/Game/Tienlen/Emoji/Emoji';
import Header from '../component/Game/Tienlen/Header/Header';
import Home from '../component/Game/Tienlen/Home/Home';
import Lichsu from '../component/Game/Tienlen/Lichsu/Lichsu';
import MyTabs from './Tab';

const Stack = createNativeStackNavigator();
function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="home"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="MyTabs" component={MyTabs} />
        <Stack.Screen
          name="Gametienlen"
          component={Home}
          options={{
            headerShown: true,
            headerTitle: '',
          }}
        />
        <Stack.Screen name="Container" component={Cotainer} />
        <Stack.Screen
          name="Lichsu"
          component={Lichsu}
          options={{
            headerShown: true,
            headerTitle: '',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;

const Cotainer = ({ navigation }) => {
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
