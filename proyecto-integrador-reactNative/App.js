import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/screens/Login';
import Profile from './src/components/Profile';
import NewPost from './src/screens/NewPost';
import Post from './src/components/Post';
import Register from './src/screens/Register';
import SearchUser from './src/screens/SearchUser';
import HomeMenu from './src/components/HomeMenu';


const Stack = createNativeStackNavigator(); // Definir el Stack

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={Login}/>
    <Stack.Screen name="Register" component={Register}/>
    <Stack.Screen name="Profile" component={Profile}/>
    <Stack.Screen name="HomeMenu" component={HomeMenu}/>
    <Stack.Screen name="NewPost" component={NewPost}/>
    <Stack.Screen name="Post" component={Post}/> 
    <Stack.Screen name="SearchUser" component={SearchUser}/>

    </Stack.Navigator>
    </NavigationContainer>

  )  
}