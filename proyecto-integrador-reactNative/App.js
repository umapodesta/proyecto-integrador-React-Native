import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Register from './src/Screens/Register';
import Home from './src/screens/Home';
import Login from './src/Screens/Login';
import Profile from './src/components/Profile';
import HomeMenu from './src/components/HomeMenu';
import NewPost from './src/screens/NewPost';
import Post from './src/components/Post';

const Stack = createNativeStackNavigator(); // Definir el Stack

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name="Register" component={Register}/>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Profile" component={Profile}/>
        <Stack.Screen name="HomeMenu" component={HomeMenu}/>
        <Stack.Screen name="NewPost" component={NewPost}/>
        <Stack.Screen name="Post" component={Post}/>

      </Stack.Navigator>

    </NavigationContainer>

)}