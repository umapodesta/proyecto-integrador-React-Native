import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Register from './src/Screens/Register';
import Home from './src/Screens/Home';
import Login from './src/Screens/Login';

const Stack = createNativeStackNavigator(); // Definir el Stack

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name="Register" component={Register}/>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name='Login' component={Login}/>
      </Stack.Navigator>

    </NavigationContainer>

)}