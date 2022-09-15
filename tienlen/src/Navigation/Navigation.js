/* eslint-disable prettier/prettier */
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Login from '../component/Auth/Login';
import Cotainer from '../component/Game/Tienlen/Container/Container';
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
        <Stack.Screen name="Login" component={Login} />
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
