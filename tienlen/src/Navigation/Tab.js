/* eslint-disable prettier/prettier */
import React from 'react';
import { Button, Image, Text, View } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Game from '../component/Game/Index';
import { useNavigation } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color}) => {
          if (route.name === 'Home') {
            return <MaterialIcons name="home" size={26} color={color} />;
          } else if (route.name === 'Settings') {
            return <MaterialIcons name="settings" size={26} color={color} />;
          } else if (route.name === 'Game') {
            return <MaterialIcons name="casino" size={26} color={color} />;
          }
        },
        tabBarInactiveTintColor: 'gray',
        tabBarActiveTintColor: 'tomato',
        headerShown: false,
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Trang chủ',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Game"
        component={Game}
        options={{
          tabBarLabel: 'Game',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Setting',
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

function HomeScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Trang chủ!</Text>
    </View>
  );
}

function SettingsScreen() {
  const navigation = useNavigation();
  const logout = () => {
    navigation.navigate('Login')
  }
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Image 
        source={require('./../public/anh.jpg')}  
        style={{width: 200, height: 200, borderRadius: 400/ 2, marginBottom: 10}} 
      />
      <Button
        onPress={logout}
        title="Đăng xuất"
        color="#841584"
      />
    </View>
  );
}


export default MyTabs;